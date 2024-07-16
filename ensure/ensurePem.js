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
   '(RSA )?PRIVATE KEY': '(RSA )?PRIVATE KEY',
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

const RSAPrivateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAKj34GkxFhD90vcNLYLInFEX6Ppy1tPf9Cnzj4p4WGeKLs1Pt8Qu
KUpRKfFLfRYC9AIKjbJTWit+CqvjWYzvQwECAwEAAQJAIJLixBy2qpFoS4DSmoEm
o3qGy0t6z09AIJtH+5OeRV1be+N4cDYJKffGzDa88vQENZiRm0GRq6a+HPGQMd2k
TQIhAKMSvzIBnni7ot/OSie2TmJLY4SwTQAevXysE2RbFDYdAiEBCUEaRQnMnbp7
9mxDXDf6AU0cN/RPBjb9qSHDcWZHGzUCIG2Es59z8ugGrDY+pxLQnwfotadxd+Uy
v/Ow5T0q5gIJAiEAyS4RaI9YG8EWx/2w0T67ZUVAw8eOMB6BIUg0Xcu+3okCIBOs
/5OiPgoTdSy7bcF9IGpSE8ZgGKzgYQVZeN97YE00
-----END RSA PRIVATE KEY-----`

const CertificatePem = `-----BEGIN CERTIFICATE-----
MIIFtTCCA52gAwIBAgIJAO0cq2lJPZZJMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTQwMzEyMTc0NzU5WhcNMTkwMzEyMTc0NzU5WjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIIC
CgKCAgEAsgzs6vN2sveHVraXV0zdoVyhWUHWNQ0xnhHTPhjt5ggHmSvrUxvUpXfK
WCP9gZo59Q7dx0ydjqBsdooXComVP4kGDjulvOHWgvcVmwTsL0bAMqmsCyyJKM6J
Wqi8E+CPTOpMBWdapUxvwaSmop8geiTtnX0aV4zGXwsz2mwdogbounQjMB/Ew7vv
8XtqwXSpnR7kM5HPfM7wb9F8MjlRuna6Nt2V7i0oUr+EEt6fIYEVZFiHTSUzDLaz
2eClJeCNdvyqaeGCCqs+LunMq3kZjO9ahtS2+1qZxfBzac/0KXRYnLa0kGQHZbw0
ecgdZC9YpqqMeTeSnJPPX4/TQt54qVLQXM3+h8xvwt3lItcJPZR0v+0yQe5QEwPL
4c5UF81jfGrYfEzmGth6KRImRMdFLF9+F7ozAgGqCLQt3eV2YMXIBYfZS9L/lO/Q
3m4MGARZXUE3jlkcfFlcbnA0uwMBSjdNUsw4zHjVwk6aG5CwYFYVHG9n5v4qCxKV
ENRinzgGRnwkNyADecvbcQ30/UOuhU5YBnfFSYrrhq/fyCbpneuxk2EouL3pk/GA
7mGzqhjPYzaaNGVZ8n+Yys0kxuP9XDOUEDkjXpa/SzeZEk9FXMlLc7Wydj/7ES4r
6SYCs4KMr+p7CjFg/a7IdepLQ3txrZecrBxoG5mBDYgCJCfLBu0CAwEAAaOBpzCB
pDAdBgNVHQ4EFgQUWQI/JOoU+RrUPUED63dMfd2JMFkwdQYDVR0jBG4wbIAUWQI/
JOoU+RrUPUED63dMfd2JMFmhSaRHMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIEwpT
b21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGSCCQDt
HKtpST2WSTAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBBQUAA4ICAQBwGbAmiLHE
jubdLeMygwrV8VjlOVxV41wvRi6y1B5Bdvh71HPoOZdvuiZOogzxB22Tzon6Uv5q
8uuAy37rHLlQTOqLwdLJOu/ijMirAkh13gQWt4oZGUDikyiI4PMNo/hr6XoZWUfU
fwmcAzoEMln8HyISluTau1mtQIDgvGprU472GqC4AC7bYeED+ChCevc7Ytjl4zte
/tw8u3nqrkESYBIA2yEgyFAr1pRwJPM/T1U6Ehalp1ZTeQcAXEa7IC6ht2NlN1FC
fk2KQmrk4Z3jaSVv8GxshA354W+UEpti0o6Fv+2ozkAaQ1/xjiNwBTHtgJ1/AG1j
bDYcCFfmYmND0RFjvVu7ma+UNdKQ+t1o7ip4tHQUTEFvdqoaCLN09PcTVgvm71Lr
s8IOldiMgiCjQK3e0jwXx78tXs/msMzVI+9AR9aNzo0Y42C97ctlGu3+v07Zp+x4
6w1rg3eklJM02davNWK2EUSetn9EWsIJXU34Bj7mnI/2DFo292GVNw1kT5Bf4IvA
T74gsJLB6wacN4Ue6zPtIvrK93DABAfRUmrAWmH8+7MJolSC/rabJF3E2CeBTYqZ
R5M5azDV1CIhIeOTiPA/mq5fL1UrgVbB+IATIsUAQfuWivDyoeu96LB/QswyHAWG
8k2fPbA2QVWJpcnryesCy3qtzwbHSYbshQ==
-----END CERTIFICATE-----`

const RSAPublicKeyPem = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA+xGZ/wcz9ugFpP07Nspo6U17l0YhFiFpxxU4pTk3Lifz9R3zsIsu
ERwta7+fWIfxOo208ett/jhskiVodSEt3QBGh4XBipyWopKwZ93HHaDVZAALi/2A
+xTBtWdEo7XGUujKDvC2/aZKukfjpOiUI8AhLAfjmlcD/UZ1QPh0mHsglRNCmpCw
mwSXA9VNmhz+PiB+Dml4WWnKW/VHo2ujTXxq7+efMU4H2fny3Se3KYOsFPFGZ1TN
QSYlFuShWrHPtiLmUdPoP6CV2mML1tk+l7DIIqXrQhLUKDACeM5roMx0kLhUWB8P
+0uj1CNlNN4JRZlC7xFfqiMbFRU9Z4N6YwIDAQAB
-----END RSA PUBLIC KEY-----`

const PrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCoknaik3X9AwXf
1nb/BfHlR4RBcij+Ri2RzxZfdcTuhcIL4XLrgwaz/Skx3R/UjU3eoxneBjcGeA7X
QX75aXMS2FKrfQEJ6mp9AVQTowPC5VkAp8L8vk/cBrckZFHQsm9bHnLirJ6LYhWK
sLbvgpJo+P4OMG4P/GeQVwaWwLxaZNSs0sEjVRuy0vbWCO4jJwnmZpPMxU0sRCRN
xod3n6DJ0XhwCP/CxhlFVHjoM/nX/HGlPWkwG05BFBH4J9Zy4SNNNg6CDjIsl56R
2Fu8d/RHtIB/UPhIEoV6t5rWkJx4SP76OwjiXl9IGiDWpb6uu2/OQctZRBezxvCZ
O4lgzKFXAgMBAAECggEAYK4XsmhmbCTWsqka+GqdcIVS2gIydpsjOZQO3dL6jl5S
i2PS+DXem04f2URcJBiix4S9qjPgTSqAQH6E52DOKcm9qDL6bIhwaJ9hbB27Y4UM
Ra7xyukPfj6vvQR4U/xyl0zgURb1mzU266MsWDOH6wKbGuI1zZ9SelsfIUkK/cAV
s6Ao4kzCCQWZMQ/GkYxtQXg/tdPtI2Ueexon0Xtr4bc50XefEFvpKNi3ZqX7fRHV
e2bvnzKH6TN6DlEBruIdRwLsfmFXMIXU98D1OYokaaeVeHH5iZ2nXrlGGw72RfcQ
awrEHvMTTUhzg5LnMw30Smq1ogPanhLtbofPqIQJwQKBgQDfxKZ7lFle+tiMEKmU
87uiRavAHrmQNipqBcbtadJqqQtvGOCxwSg9phh2YnwxRSyw1oBpg4ogvg1QbhqV
UNfB8b/M2kpPRpGZpjCvi6En8GzK6K4e/UQJ4i0l7tPT9tt3TynbMwb3xFcEnFEX
IxfcWnlbC5tm5Sea6b4BzwK84QKBgQDA2nvqHNsqU9HyCX61R5Bo2QLnsI4CgUBk
z2hhc4bteb//mKCWeVvPNRu9AFhNEJzix0/EEkCVhbpIKE1DUCzBPWI/4CkH1bRc
RBE7/7I3pcMBbV22OdGoISmUf6IFZSyQuBoShLDBH3CVmqdmto9b5nwYaTgdycvt
xpyQvdKtNwKBgHFzF2EyXnlcPqwMyp29URU9s41NRpGKFMj6MtgtvcPb/vMNruYQ
Y2GWM3LaDdNBGh5yMlrMmRxunvt3Rz0K5sjq025+AgzdX3aCHs7xwPwp1k6t15HY
oEVOictgob8mujBsT3FWFqNJxUCOLELJxRAwQrTZVqm9Zu4Qsgfit6WhAoGBAKWx
UbOUNU0JlSDBvaacpNsgUFmlnG1UhXHXrVPFAVE5QJeml5qRDCtb8sgQ6szTkCdb
nRHVqL2Olrz2O2OxF7KzPZ2pxzbfCkYXiUMmbgVXmtK4F0LALHyqeWIHwrml8oMo
WeY9MOvMSluO83LRORx5S3dht4AIZ/iTouLM5JxDAoGAcAnam49TeCFZuOu5/QCb
GYyAntOQL/nunSbuHoNvC+bBrcUX2BfDkalkzlm/YRJgmqSQ7Ih3fbp4i5NCVtpM
1dafoyed5UqY0F7Vou7JJE57tlKieKPhQOMTSl2Q5WMvby+owRb0Sx325xQvoslH
QM9+y6wy6YMdNweC+JkcZVo=
-----END PRIVATE KEY-----`

const PublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnD6sFeCJf9bR7PH/YisP
wCePMUltELq/hp/Dm409XU/yEbgBTI/wMUnH+2juOTYeCirOB10bc/QrFVhaLV3g
HWyvSL+Wv0ufdWeZiLXAnICNddiJCQvOU+5seNUoPw4QKvFAQgZLogsjWm2uajJS
nSGskVCt48gaWVrIiO4OQZVkSTxXrUNknenXJ9b2bXam/Bt1ya1E1t1/b/ITZ/03
WQjfGwXgctqYytvAHC3v541s9o53J2uWn/pOBJc2058Ad5WyzqPRHzA1gbl+XinK
s85X5U5PAwJiVCsSyCFkNGwJmmuCPtrHipwZi5ax5jfrb71Plilj2VOXdrR2zU7F
OQIDAQAB
-----END PUBLIC KEY-----`

console.assert(RSAPrivateKeyPem == ensuraRSAPrivateKeyPem(RSAPrivateKeyPem), { type: 'RSA Private Key', message: 'Expected PEM format' })
console.assert(CertificatePem == ensureCertificate(CertificatePem), { type: 'Certificate', message: 'Expected PEM format' })
console.assert(RSAPublicKeyPem == ensureRSAPublicKeyPem(RSAPublicKeyPem), { type: 'RSA Public Key', message: 'Expected PEM format' })
console.assert(PrivateKeyPem == ensurePrivateKey(PrivateKeyPem), { type: 'Private Key', message: 'Expected PEM format' })
console.assert(PublicKeyPem == ensurePublicKey(PublicKeyPem), { type: 'Public Key', message: 'Expected PEM format' })
console.assert(RSAPrivateKeyPem == ensurePem(RSAPrivateKeyPem, pemTypes["(RSA )?PRIVATE KEY"]), { type: 'all Private Key', message: 'Expected all types of Private Key'})
console.assert(PrivateKeyPem == ensurePem(PrivateKeyPem, pemTypes["(RSA )?PRIVATE KEY"]), { type: 'all Private Key', message: 'Expected all types of Private Key'})