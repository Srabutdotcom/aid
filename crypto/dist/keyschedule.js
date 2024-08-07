// ../../../byte/concat.js
function concat(...bs) {
  const l = bs.reduce((ac, ar) => ac + (ar?.length ?? 0), 0);
  const r = new Uint8Array(l);
  let o = 0;
  for (const e of bs) {
    r.set(e, o);
    o += e?.length;
  }
  return r;
}

// hkdf.js
var enc = new TextEncoder();
async function hkdfExpand(secret, info, length, hashAlgo) {
  let t = new Uint8Array(0);
  let okm = new Uint8Array(0);
  let i = 0;
  while (okm.length < length) {
    i++;
    const counterBytes = new Uint8Array([i]);
    const input = concat(t, info, counterBytes);
    t = await hkdfExtract(secret, input, hashAlgo);
    okm = concat(okm, t);
  }
  return okm.slice(0, length);
}
async function hkdfExtract(key, info, algo) {
  if (key.length == 0)
    key = new Uint8Array(algo / 8);
  const baseKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-" + algo }, false, ["sign"]);
  const derivedKey2 = await crypto.subtle.sign({ name: "HMAC" }, baseKey, info);
  return new Uint8Array(derivedKey2);
}
async function hkdfExpandLabel(secret, label, context, length, hashAlgo) {
  const hkdfLabel = new Uint8Array(2 + 1 + 6 + label.length + 1 + context.length);
  let offset = 0;
  hkdfLabel[offset++] = length >> 8 & 255;
  hkdfLabel[offset++] = length & 255;
  const prefixLabel = "tls13 " + label;
  hkdfLabel[offset++] = prefixLabel.length;
  hkdfLabel.set(enc.encode(prefixLabel), offset);
  offset += prefixLabel.length;
  hkdfLabel[offset++] = context.length;
  hkdfLabel.set(context, offset);
  return await hkdfExpand(secret, hkdfLabel, length, hashAlgo);
}

// keyschedule.js
var salt0 = new Uint8Array(0);
var emptyHashs = Object.freeze({
  256: new Uint8Array(await crypto.subtle.digest(`SHA-256`, salt0)),
  384: new Uint8Array(await crypto.subtle.digest(`SHA-384`, salt0)),
  512: new Uint8Array(await crypto.subtle.digest(`SHA-512`, salt0))
});
async function earlySecret(hashAlgo) {
  const IKM0 = new Uint8Array(hashAlgo / 8);
  return await hkdfExtract(salt0, IKM0, hashAlgo);
}
async function handshakeKey(sharedKey, hashAlgo) {
  const early_secret = await earlySecret(hashAlgo);
  const derivedSecret = await hkdfExpandLabel(early_secret, "derived", emptyHashs[hashAlgo], hashAlgo / 8, hashAlgo);
  const handshakeSecret = await hkdfExtract(derivedSecret, sharedKey, hashAlgo);
  return handshakeSecret;
}
async function derivedKey(clientHello, serverHello, handshakeKey2, hashAlgo, encryptLength, client) {
  const helloHash = new Uint8Array(await crypto.subtle.digest(`SHA-${hashAlgo}`, concat(clientHello, serverHello)));
  let label = "hs traffic";
  if (client == true || client == "c") {
    label = "c " + label;
  } else {
    label = "s " + label;
  }
  const derivedSecret = await hkdfExpandLabel(handshakeKey2, label, helloHash, hashAlgo / 8, hashAlgo);
  const key = await hkdfExpandLabel(derivedSecret, "key", salt0, encryptLength, hashAlgo);
  const iv = await hkdfExpandLabel(derivedSecret, "iv", salt0, 12, hashAlgo);
  return {
    key,
    iv,
    derivedSecret,
    hashAlgo
  };
}
async function finishedKey(baseKey, hashAlgo) {
  return await hkdfExpandLabel(baseKey, "finished", emptyHashs[hashAlgo], hashAlgo / 8, hashAlgo);
}
async function verifyData(baseKey, client, server, encryext, cert, certverfy, hashAlgo) {
  const finKey = await finishedKey(baseKey, hashAlgo);
  const handshakeContx = concat(client, server, encryext, cert, certverfy);
  const transHash = await crypto.subtle.digest(`SHA-${hashAlgo}`, handshakeContx);
  return await hkdfExtract(finKey, new Uint8Array(transHash), hashAlgo);
}
export {
  derivedKey,
  earlySecret,
  emptyHashs,
  finishedKey,
  handshakeKey,
  verifyData
};
