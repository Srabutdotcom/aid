import * as x25519 from "@stablelib/x25519"
import { Uint16BE } from '../../../byte/set.js';
import { concat } from '../../../byte/concat.js';
import { Record } from '../../tools/tls13parser.js';
import { ClientHelloRecord, ServerHelloRecord } from '../../tools/tls13def.js'

const enc = new TextEncoder
const salt0 = new Uint8Array(0)

export const emptyHashs = Object.freeze({
   256: new Uint8Array(await crypto.subtle.digest(`SHA-256`, salt0)),
   384: new Uint8Array(await crypto.subtle.digest(`SHA-384`, salt0)),
   512: new Uint8Array(await crypto.subtle.digest(`SHA-512`, salt0)),
})

export class Secret {
   emptyHash;
   IKM0
   secret
   shaBit // i.e. SHA-Bit --> SHA-256
   shaLength // will determine key length
   sharedSecret
   keys = {
      privateKey: undefined,
      publicKey: undefined
   }
   clientMsg
   serverMsg
   constructor(clientHello, serverHello, client = false) {
      const clientSide = ((clientHello instanceof ClientHelloRecord) && client) ? true : false
      if (clientSide) {
         if (serverHello.constructor.name!=='Record') throw TypeError(`expected type Record for serverHello`)
         this.keys.privateKey = (clientHello instanceof ClientHelloRecord) ? clientHello.keys.privateKey : clientHello.Handshake.ClientHello.extensions.key_share.data.find(e => e.name.includes('x25519')).key;
         this.keys.publicKey = serverHello.Handshake.ServerHello.extensions.key_share.data.key;
         this.clientMsg = (clientHello instanceof ClientHelloRecord) ? clientHello.handshake : clientHello.message;
         this.serverMsg = serverHello.message;
      } else {
         if (clientHello.constructor.name!=='Record') throw TypeError(`expected type Record for clientHello`)
            this.keys.privateKey = (serverHello instanceof ServerHelloRecord) ? serverHello.keys.privateKey : serverHello.Handshake.ServerHello.extensions.key_share.data.key;
         this.keys.publicKey = clientHello.Handshake.ClientHello.extensions.key_share.data.find(e => e.name.includes('x25519')).key;
         this.clientMsg = clientHello.message;
         this.serverMsg = serverHello.handshake;
      }
      const [tls, aes, encryptAlgo, gcm, hash] = serverHello.Handshake.ServerHello.cipher_suite.split('_');
      this.sharedSecret = x25519.sharedKey(serverPrivateKey, clientPublicKey);
      this.shaBit = +hash.match(/(.{3})$/g)[0]
      this.shaLength = this.shaBit / 8;
      this.emptyHash = emptyHashs[this.shaBit];
      this.IKM0 = new Uint8Array(this.shaLength);
   }
   async earlySecret() {
      return await this.hkdfExtract(salt0, this.IKM0);
   }
   async hkdfExtract(key, info) {
      if (key.length == 0) key = new Uint8Array(this.shaLength)
      const baseKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-" + this.shaBit }, false, ["sign"])
      const derivedKey = await crypto.subtle.sign({ name: "HMAC" }, baseKey, info)
      return new Uint8Array(derivedKey)
   }
   HkdfLabel(Label, Context) {
      if (typeof Label !== 'string') throw TypeError('Expected string for Label');
      if (Context instanceof Uint8Array !== true) throw TypeError(`Expected Uint8Array for Context`);
      const label = `tls13 ${Label}`;
      const encodedLabel = enc.encode(label);
      return concat(
         Uint16BE(this.shaLength),// Hash.length 
         new Uint8Array([encodedLabel.length]),// label length
         encodedLabel, // label in Uint8Array
         new Uint8Array([Context.length]),// Context length
         Context
      )
   }
   // LINK - https://en.wikipedia.org/wiki/HKDF#HKDF-Expand
   async hkdfExpand(secret, info, length = this.shaLength) {
      let t = new Uint8Array(0);
      let okm = new Uint8Array(0);
      let i = 0;
      while (okm.length < length) {
         i++;
         const counterBytes = new Uint8Array([i]);
         const input = concat(t, info, counterBytes)
         t = await this.hkdfExtract(secret, input)
         okm = concat(okm, t)
      }
      return okm.slice(0, length);
   }
   async hkdfExpandLabel(secret, Label, Context, Length = this.shaLength) {
      return await this.hkdfExpand(secret, this.HkdfLabel(Label, Context), Length)
   }
   async deriveSecret(secret, Label, Messages, Length = this.shaLength) {
      const transcriptHash = new Uint8Array(await crypto.subtle.digest(`SHA-${this.shaBit}`, Messages));
      return await this.hkdfExpandLabel(secret, Label, transcriptHash, Length)
   }
   async handshakeSecret() {
      let secret = await this.earlySecret();
      secret = await this.deriveSecret(secret, 'derived', salt0)
      secret = await this.hkdfExtract(secret, this.sharedSecret);
      const Label = clientSide ? 'c hs traffic' : 's hs traffic';
      this.secret = await this.deriveSecret(secret, Label, concat(this.clientMsg, this.serverMsg));
      const key = await this.deriveSecret(this.secret, 'key', salt0);
      const iv = await this.deriveSecret(this.secret, 'iv', salt0, 12);
      return {
         key,
         iv
      }
   }
}

//`esbuild ./secret.js --bundle --format=esm --target=esnext --outfile=../../dist/secret.js`
