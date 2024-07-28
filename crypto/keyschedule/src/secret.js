// deno-lint-ignore-file no-unused-vars
import * as x25519 from "@stablelib/x25519"
import { Uint16BE } from '../../../byte/set.js';
import { concat } from '../../../byte/concat.js';
import { Record, Handshake } from '../../tools/tls13parser.js';
import {
   ClientHelloRecord, ServerHelloRecord, Handshake as HandshakeDef, CertificateVerify,
   SignatureScheme, Finished, EncryptedExtensions
} from '../../tools/tls13def.js'
import { TLSCiphertext } from "../../tools/tls13def.js";
//import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";// NOTE just to compare

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
   secrets = {}
   shaBit // i.e. SHA-Bit --> SHA-256
   shaLength // will determine key length
   keyLength
   _earlySecret
   sharedSecret
   keys = {
      privateKey: undefined,
      publicKey: undefined
   }
   clientMsg // handshake
   serverMsg // handshake
   extensionsMsg = new HandshakeDef(new EncryptedExtensions(new Uint8Array(0)));// handshake
   certificateMsg // handshake
   certificateVerifyMsg // handshake
   finishedMsg // handshake
   transcriptMsg
   clientSide
   key = { server: undefined, client: undefined }
   iv = { server: undefined, client: undefined }
   aead = { server: undefined, client: undefined } // Aead class
   constructor(clientHello, serverHello, client = false) {
      this.clientSide = (check(clientHello).isInstanceOf(ClientHelloRecord) || client) ? true : false
      if (this.clientSide) {
         if (check(serverHello).isInstanceOf(Record) == false) throw TypeError(`expected type Record for serverHello`)
         this.keys.privateKey = clientHello.keys.privateKey ?? clientHello.keys.secretKey;
         this.keys.publicKey = serverHello.Handshake.ServerHello.extensions.key_share.data.key;
         this.clientMsg = check(clientHello).isInstanceOf(ClientHelloRecord) ? clientHello.handshake : clientHello.message;
         this.serverMsg = serverHello.message;
      } else {
         if (check(clientHello).isInstanceOf(Record) == false) throw TypeError(`expected type Record for clientHello`)
         this.keys.privateKey = serverHello.keys.privateKey ?? serverHello.keys.secretKey;
         this.keys.publicKey = clientHello.Handshake.ClientHello.extensions.key_share.data.find(e => e.name.includes('x25519')).key;
         this.clientMsg = clientHello.message;
         this.serverMsg = check(serverHello).isInstanceOf(ServerHelloRecord) ? serverHello.handshake : serverHello.message;
      }
      const { encryptAlgo, hash } = parseCipher(serverHello);
      this.sharedSecret = x25519.sharedKey(this.keys.privateKey, this.keys.publicKey);
      this.shaBit = +hash.match(/(.{3})$/g)[0]
      this.shaLength = this.shaBit / 8;
      this.keyLength = encryptAlgo / 8;
      this.emptyHash = emptyHashs[this.shaBit];
      this.IKM0 = new Uint8Array(this.shaLength);
   }
   async earlySecret() {
      if (this._earlySecret) return this._earlySecret;
      this._earlySecret = await this.hkdfExtract(salt0, this.IKM0);
      return this._earlySecret
   }
   async hkdfExtract(key, info) {
      if (key.length == 0) key = new Uint8Array(this.shaLength)
      const baseKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-" + this.shaBit }, false, ["sign", "verify"])
      const derivedKey = await crypto.subtle.sign({ name: "HMAC" }, baseKey, info)
      return new Uint8Array(derivedKey)
   }
   HkdfLabel(Label, Context, Length) {
      if (typeof Label !== 'string') throw TypeError('Expected string for Label');
      if (Context instanceof Uint8Array !== true) throw TypeError(`Expected Uint8Array for Context`);
      const label = `tls13 ${Label}`;
      const encodedLabel = enc.encode(label);
      return concat(
         Uint16BE(Length),// Hash.length 
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
      return await this.hkdfExpand(secret, this.HkdfLabel(Label, Context, Length), Length)
   }
   async deriveSecret(secret, Label, Messages, Length = this.shaLength) {
      const transcriptHash = new Uint8Array(await crypto.subtle.digest(`SHA-${this.shaBit}`, Messages));
      return await this.hkdfExpandLabel(secret, Label, transcriptHash, Length)
   }
   async handshakeSecret() {
      const earlySecret = await this.earlySecret();
      this.secrets['derived'] = await this.deriveSecret(earlySecret, 'derived', salt0)
      this.secrets['handshake'] = await this.hkdfExtract(this.secrets['derived'], this.sharedSecret);

      this.transcriptMsg = concat(this.clientMsg, this.serverMsg)
      this.secrets['c hs traffic'] = await this.deriveSecret(this.secrets['handshake'], 'c hs traffic', this.transcriptMsg);
      this.secrets['s hs traffic'] = await this.deriveSecret(this.secrets['handshake'], 's hs traffic', this.transcriptMsg);

      this.secrets['derived'] = await this.deriveSecret(this.secrets['handshake'], 'derived', salt0);
      this.secrets['master'] = await this.hkdfExtract(this.secrets['derived'], this.IKM0);

      this.key.server = await this.hkdfExpandLabel(this.secrets['s hs traffic'], 'key', salt0, this.keyLength);
      this.iv.server = await this.hkdfExpandLabel(this.secrets['s hs traffic'], 'iv', salt0, 12);

      this.key.client = await this.hkdfExpandLabel(this.secrets['c hs traffic'], 'key', salt0, this.keyLength);
      this.iv.client = await this.hkdfExpandLabel(this.secrets['c hs traffic'], 'iv', salt0, 12);

      this.aead.server = new Aead(this.key.server, this.iv.server);
      this.aead.client = new Aead(this.key.client, this.iv.client);

      // add extensions
      this.transcriptMsg = concat(this.transcriptMsg, this.extensionsMsg)
      return true;
   }
   async certificateVerify(privateKey, certificate) {
      this.certificateMsg = certificate
      this.transcriptMsg = concat(this.transcriptMsg, this.certificateMsg)
      const transcriptHash = await crypto.subtle.digest(`SHA-${this.shaBit}`, this.transcriptMsg);
      // Create the context string
      const context = enc.encode('TLS 1.3, server CertificateVerify');// NOTE context for server side
      // Create the data to be signed
      const space64from32 = enc.encode(String.fromCharCode(32).repeat(64)) // 64 space characters
      const data2Sign = concat(context, space64from32, new Uint8Array([0]), new Uint8Array(transcriptHash));

      const sign = await crypto.subtle.sign({
         name: privateKey.algorithm.name,
         saltLength: this.shaLength
      },
         privateKey,
         data2Sign)
      // NOTE - how about ECDSA key
      const certificate_verify = new CertificateVerify(SignatureScheme['rsa_pss_rsae_sha' + this.shaBit], new Uint8Array(sign))
      this.certificateVerifyMsg = new HandshakeDef(certificate_verify)
      return this.certificateVerifyMsg
   }
   async finished() {//LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.4.4
      const finished_key = await this.hkdfExpandLabel(this.secrets['s hs traffic'], "finished", salt0);
      if (this.certificateVerifyMsg) this.transcriptMsg = concat(this.transcriptMsg, this.certificateVerifyMsg);
      const transcriptHash = await crypto.subtle.digest(`SHA-${this.shaBit}`, this.transcriptMsg);
      const verify_data = await this.hkdfExtract(finished_key, new Uint8Array(transcriptHash));
      //const vd = hmac(`sha${this.shaBit}`, finished_key, this.transcriptMsg); debugger;
      this.finishedMsg = new HandshakeDef(
         new Finished(verify_data)
      );
      return this.finishedMsg
   }
   async encrypt() {
      const handshakeMsg = concat(this.extensionsMsg, this.certificateMsg, this.certificateVerifyMsg, this.finishedMsg, new Uint8Array([0x16]));//NOTE 0x16 is handshake record
      const header = concat(new Uint8Array([23, 3, 3]), Uint16BE(handshakeMsg.length + this.keyLength));
      const encrypted = await this.aead[this.clientSide ? 'client' : 'server'].encrypt(handshakeMsg, header);
      return new TLSCiphertext(encrypted);
   }
   async decrypt(msg, add) {
      add = add ?? concat(new Uint8Array([23, 3, 3]), Uint16BE(msg.length))
      const decrypt = await this.aead[this.clientSide ? 'server' : 'client'].decrypt(msg, add);
      return decrypt
   }
}

class Aead { //*AESGCM
   /**
    * 
    * @param {Uint8Array} key 
    * @param {Uint8Array} ivInit 
    * @param {Uint8Array} recdata - record header
    * @param {uint} seq - sequential record
    */
   constructor(key, ivInit, recdata, seq = 0) {
      this.seq = seq;
      this.key = key;
      this.iv = ivInit;
      this.algo = {
         name: "AES-GCM",
         iv: this.iv,
         additionalData: recdata,
         //tagLength: 128 //*by default is 128
      }
   }
   buildIV() {
      for (let i = 0; i < 8; i++) {
         this.iv[this.iv.length - 1 - i] ^= ((this.seq >> (i * 8)) & 0xFF);
      }
      this.seq++;
   }
   async importKey() {
      if (this.cryptoKey) return
      this.cryptoKey = await self.crypto.subtle.importKey('raw', this.key, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt'])
   }
   async encrypt(uint8, ad) {
      await this.importKey();
      this.algo = {
         name: "AES-GCM",
         iv: this.iv,
         additionalData: ad,
         //tagLength: 128 //*by default is 128
      }
      const output = await self.crypto.subtle.encrypt(this.algo, this.cryptoKey, uint8);
      this.buildIV()
      return new Uint8Array(output);
   }
   async decrypt(data, add) {
      await this.importKey();
      this.algo.additionalData = add;
      const output = await self.crypto.subtle.decrypt(this.algo, this.cryptoKey, data);
      return new Uint8Array(output);
   }
}

function check(obj) {
   return {
      isInstanceOf(cls) {
         return obj instanceof cls || obj?.constructor.name == cls.name
      }
   }
}

function parseCipher(serverHello) {
   if (check(serverHello).isInstanceOf(Record)) {
      const [tls, aes, encryptAlgo, gcm, hash] = serverHello.Handshake.ServerHello.cipher_suite.split('_');
      return {
         encryptAlgo, hash
      }
   }
   if (check(serverHello).isInstanceOf(ServerHelloRecord)) {
      const handshake = Handshake(serverHello.handshake);
      const [tls, aes, encryptAlgo, gcm, hash] = handshake.ServerHello.cipher_suite.split('_');
      return {
         encryptAlgo, hash
      }
   }
}

//`esbuild ./secret.js --bundle --format=esm --target=esnext --outfile=../../dist/secret.js`
