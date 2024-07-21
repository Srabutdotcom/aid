import { concat } from "../../../byte/concat.js";
import { hkdfExpandLabel, hkdfExtract } from "./hkdf.js";

const salt0 = new Uint8Array(0)

export const emptyHashs = Object.freeze({
   256: new Uint8Array(await crypto.subtle.digest(`SHA-256`, salt0)),
   384: new Uint8Array(await crypto.subtle.digest(`SHA-384`, salt0)),
   512: new Uint8Array(await crypto.subtle.digest(`SHA-512`, salt0)),
})

export async function earlySecret(hashAlgo){
   const IKM0 = new Uint8Array(hashAlgo / 8);
   return await hkdfExtract(salt0, IKM0, hashAlgo)
}

/**
 * 
 * @param {Uint8Array} sharedKey - derived using x25519 using privateKey and publicKey 
 * @param {uint} hashAlgo - 256, 384, or 512
 */
export async function handshakeKey(sharedKey, hashAlgo) {
   const early_secret = await earlySecret(hashAlgo)
   const derivedSecret = await hkdfExpandLabel(early_secret, 'derived', emptyHashs[hashAlgo], hashAlgo / 8, hashAlgo)// in hkdfexpandlabel has include tls13
   const handshakeSecret = await hkdfExtract(derivedSecret, sharedKey, hashAlgo);
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
   const helloHash = new Uint8Array(await crypto.subtle.digest(`SHA-${hashAlgo}`, concat(clientHello, serverHello)))
   let label = 'hs traffic'
   if (client == true || client == 'c') {
      label = 'c ' + label;
   } else {
      label = 's ' + label;
   }
   const derivedSecret = await hkdfExpandLabel(handshakeKey, label, helloHash, hashAlgo / 8, hashAlgo);
   const key = await hkdfExpandLabel(derivedSecret, 'key', salt0, encryptLength, hashAlgo);
   const iv = await hkdfExpandLabel(derivedSecret, 'iv', salt0, 12, hashAlgo);

   return {
      key,
      iv,
      derivedSecret,
      hashAlgo
   }
}

export async function finishedKey(baseKey, hashAlgo){
   return await hkdfExpandLabel(baseKey, 'finished', emptyHashs[hashAlgo], hashAlgo / 8, hashAlgo)
}

export async function verifyData(baseKey, client, server, encryext, cert, certverfy, hashAlgo){
   const finKey = await finishedKey(baseKey, hashAlgo);
   const handshakeContx = concat(client,server,encryext,cert,certverfy);
   const transHash = await crypto.subtle.digest(`SHA-${hashAlgo}`, handshakeContx);
   return await hkdfExtract(finKey, new Uint8Array(transHash), hashAlgo)//await crypto.subtle.sign({    name:'HMAC'   }, finKey, transHash)
}

//`esbuild ./keyschedule.js --bundle --format=esm --target=esnext --outfile=../../dist/keyschedule.js`