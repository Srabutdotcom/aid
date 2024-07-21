import { TLSCiphertext, TLSInnerPlaintext, TLSPlaintext, ContentType } from "./tls13def.js";

export class EncryptObject {
   constructor(handshake) {
      this.handshake = handshake;
      this.handshake.type = ContentType.Application
      this.record = new TLSPlaintext(this.handshake);
      this.tlsInnerPlainText = new TLSInnerPlaintext(this.handshake, ContentType.Handshake)
   }
   header() { return Uint8Array.from(this.record).slice(0, 5) }
   async encrypt(aead) {
      if (this.encrypted) return this.encrypted
      this.encrypted = await aead.encrypt(this.tlsInnerPlainText, this.header())
      const test = await aead.decrypt(this.encrypted)
      return this.encrypted
   }
   async cipherText(aead) {
      if (this.tlsCipherText) return this.tlsCipherText
      if (this.encrypted) return this.#cipherText()
      await this.encrypt(aead);
      return this.#cipherText()
   }

   #cipherText(){
      this.tlsCipherText = new TLSCiphertext(this.encrypted)
      return this.tlsCipherText
   }
}