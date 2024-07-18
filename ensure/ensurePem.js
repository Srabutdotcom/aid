export const pemTypes = Object.freeze({
   'RSA PRIVATE KEY': 'RSA PRIVATE KEY',
   'CERTIFICATE': 'CERTIFICATE',
   'RSA PUBLIC KEY': 'RSA PUBLIC KEY',
   'DSA PRIVATE KEY': 'DSA PRIVATE KEY',
   'PUBLIC KEY': 'PUBLIC KEY',
   'PRIVATE KEY': 'PRIVATE KEY',
   'PKCS7': 'PKCS7',
   'NEW CERTIFICATE REQUEST': 'NEW CERTIFICATE REQUEST',
   'CERTIFICATE REQUEST': 'CERTIFICATE REQUEST',
   'X509 CRL': 'X509 CRL',
   'EC PRIVATE KEY':'EC PRIVATE KEY',
   '(RSA |EC )?PRIVATE KEY': '(RSA |EC )?PRIVATE KEY',
   '(RSA )?PUBLIC KEY' : '(RSA )?PUBLIC KEY'
})

export function ensurePem(pem, type) {
   pem = ensureString(pem)
   type = ensurePemType(type)
   const test = pemRegex(type).test(pem);
   if (test == false) throw TypeError(`Expected PEM format ${type}`)
   return pem
}

export function ensuraRSAPrivateKeyPem(pem) {
   return ensurePem(pem, pemTypes["RSA PRIVATE KEY"])
}

export function ensureCertificate(pem) {
   return ensurePem(pem, pemTypes.CERTIFICATE)
}

export function ensureRSAPublicKeyPem(pem) {
   return ensurePem(pem, pemTypes["RSA PUBLIC KEY"])
}

export function ensureDSAPrivateKeyPem(pem){
   return ensurePem(pem, pemTypes["DSA PRIVATE KEY"])
}

export function ensurePublicKey(pem){
   return ensurePem(pem, pemTypes["PUBLIC KEY"])
}

export function ensurePrivateKey(pem){
   return ensurePem(pem, pemTypes["PRIVATE KEY"])
}

export function ensurePKCS7(pem){
   return ensurePem(pem, pemTypes.PKCS7);
}

export function ensureNewCertificateRequest(pem){
   return ensurePem(pem, pemTypes["NEW CERTIFICATE REQUEST"])
}

export function ensureCertificateRequest(pem){
   return ensurePem(pem, pemTypes["CERTIFICATE REQUEST"])
}

export function ensureX509CRL(pem){
   return ensurePem(pem, pemTypes["X509 CRL"])
}

function pemRegex(pemType) {
   return new RegExp(`^(-----BEGIN ${pemType}-----\r?\n?(?:[A-Za-z0-9+/=]+\r?\n?)*-----END ${pemType}-----)\r?\n?$`)
}

function ensurePemType(type) {
   const isTrue = Object.prototype.hasOwnProperty.call(pemTypes, type)
   if (!isTrue) throw TypeError(`Unexpected PEM type : ${type}`);
   return type
}

export function ensureString(string) {
   if (typeof string !== 'string') throw TypeError(`Expected string but got ${typeof string}`);
   return string
}


