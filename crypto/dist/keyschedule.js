// deno-lint-ignore-file no-var
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
async function hkdfExpand(algo, secret, info, length) {
  let t = new Uint8Array(0);
  let okm = new Uint8Array(0);
  let i = 0;
  while (okm.length < length) {
    i++;
    const counterBytes = new Uint8Array([i]);
    const input = concat(t, info, counterBytes);
    t = await hkdfExtract(algo, secret, input);
    okm = concat(okm, t);
  }
  return okm.slice(0, length);
}
async function hkdfExtract(algo, key, info) {
  if (key.length == 0)
    key = new Uint8Array(algo / 8);
  const baseKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-" + algo }, false, ["sign"]);
  const derivedKey2 = await crypto.subtle.sign(
    {
      name: "HMAC"
    },
    baseKey,
    info
  );
  return new Uint8Array(derivedKey2);
}
async function hkdfExpandLabel(algo, secret, label, context, length) {
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
  return await hkdfExpand(algo, secret, hkdfLabel, length);
}

// keyschedule.js
async function handshakeKey(sharedKey, hashAlgo) {
  const IKM0 = new Uint8Array(hashAlgo / 8);
  const salt0 = new Uint8Array(0);
  const earlySecret = await hkdfExtract(hashAlgo, salt0, IKM0);
  const emptyHash = new Uint8Array(await crypto.subtle.digest(`SHA-${hashAlgo}`, salt0));
  const derivedSecret = await hkdfExpandLabel(hashAlgo, earlySecret, "derived", emptyHash, hashAlgo / 8);
  const handshakeSecret = await hkdfExtract(hashAlgo, derivedSecret, sharedKey);
  return handshakeSecret;
}
async function derivedKey(clientHello, serverHello, handshakeKey2, hashAlgo, encryptLength, client) {
  const salt0 = new Uint8Array(0);
  const helloHash = new Uint8Array(await crypto.subtle.digest(`SHA-${hashAlgo}`, concat(clientHello, serverHello)));
  let label = "hs trafic";
  if (client == true || client == "c") {
    label = "c " + label;
  } else {
    label = "s " + label;
  }
  const derivedSecret = await hkdfExpandLabel(hashAlgo, handshakeKey2, label, helloHash, hashAlgo / 8);
  const key = await hkdfExpandLabel(hashAlgo, derivedSecret, "key", salt0, encryptLength);
  const iv = await hkdfExpandLabel(hashAlgo, derivedSecret, "iv", salt0, 12);
  return {
    key,
    iv
  };
}
export {
  derivedKey,
  handshakeKey
};
