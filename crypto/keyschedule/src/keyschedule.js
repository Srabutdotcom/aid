import { concat } from "../../../byte/concat.js";
import { hkdfExpandLabel, hkdfExtract } from "./hkdf.js";

/**
 * 
 * @param {Uint8Array} sharedKey - derived using x25519 using privateKey and publicKey 
 * @param {uint} hashAlgo - 256, 384, or 512
 */
export async function handshakeKey(sharedKey, hashAlgo) {
   const IKM0 = new Uint8Array(hashAlgo / 8)
   const salt0 = new Uint8Array(0);
   const earlySecret = await hkdfExtract(hashAlgo, salt0, IKM0)
   const emptyHash = new Uint8Array(await crypto.subtle.digest(`SHA-${hashAlgo}`, salt0));
   const derivedSecret = await hkdfExpandLabel(hashAlgo, earlySecret, 'derived', emptyHash, hashAlgo / 8)// in hkdfexpandlabel has include tls13
   const handshakeSecret = await hkdfExtract(hashAlgo, derivedSecret, sharedKey);
   return handshakeSecret
}

/**
 * 
 * @param {Uint8Array} clientHello - clientHello message without first 5 bytes header
 * @param {Uint8Array} serverHello - serverHello message without first 5 bytes header
 * @param {Uint8Array} handshakeKey - derived using function handshakeKey
 * @param {uint} hashAlgo - 256, 384, or 512
 * @param {uint} encryptLength - depend on cipher used if aes128gcm it is 16 if eas256gcm it is 32
 * @param {true|'c'} client - for client or server
 * @returns 
 */
export async function derivedKey(clientHello, serverHello, handshakeKey, hashAlgo, encryptLength, client) {
   const salt0 = new Uint8Array(0);
   const helloHash = new Uint8Array(await crypto.subtle.digest(`SHA-${hashAlgo}`, concat(clientHello, serverHello)))
   let label = 'hs trafic'
   if (client == true || client == 'c') {
      label = 'c ' + label;
   } else {
      label = 's ' + label;
   }
   const derivedSecret = await hkdfExpandLabel(hashAlgo, handshakeKey, label, helloHash, hashAlgo / 8);
   const key = await hkdfExpandLabel(hashAlgo, derivedSecret, 'key', salt0, encryptLength);
   const iv = await hkdfExpandLabel(hashAlgo, derivedSecret, 'iv', salt0, 12);

   return {
      key,
      iv
   }
}

//`esbuild ./keyschedule.js --bundle --format=esm --target=esnext --outfile=../../dist/keyschedule.js`