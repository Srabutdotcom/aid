// Implement HKDF-Expand in JavaScript

import { concat } from "../../../byte/concat.js";

const enc = new TextEncoder

// LINK - https://en.wikipedia.org/wiki/HKDF#HKDF-Expand
export async function hkdfExpand(algo, secret, info, length) {

   let t = new Uint8Array(0);
   let okm = new Uint8Array(0);
   let i = 0;

   while (okm.length < length) {
      i++;
      const counterBytes = new Uint8Array([i]);

      const input = concat(t, info, counterBytes)// new Uint8Array([...t, ...info, ...counterBytes]);

      t = await hkdfExtract(algo, secret, input)

      okm = concat(okm, t)//new Uint8Array([...okm, ...t]);
   }

   return okm.slice(0, length);
}

export async function hkdfExtract(algo, key, info) {
   if (key.length == 0) key = new Uint8Array(algo / 8)
   const baseKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-" + algo }, false, ["sign"])
   const derivedKey = await crypto.subtle.sign({ name: "HMAC" }, baseKey, info)
   return new Uint8Array(derivedKey)
}

// Implement HKDF-Expand-Label in JavaScript
export async function hkdfExpandLabel(algo, secret, label, context, length) {

   // Construct the HKDF label
   const hkdfLabel = new Uint8Array(2 + 1 + 6 + label.length + 1 + context.length);
   let offset = 0;

   // Encode the length (16-bit big-endian)
   hkdfLabel[offset++] = (length >> 8) & 0xff;
   hkdfLabel[offset++] = length & 0xff;

   // Add the "tls13" prefix and label
   const prefixLabel = "tls13 " + label
   hkdfLabel[offset++] = prefixLabel.length
   hkdfLabel.set(enc.encode(prefixLabel), offset);
   offset += prefixLabel.length;

   // Add the context
   hkdfLabel[offset++] = context.length;
   hkdfLabel.set(context, offset);

   return await hkdfExpand(algo, secret, hkdfLabel, length)
}