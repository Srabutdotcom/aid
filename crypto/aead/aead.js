export class Aead { //*AESGCM
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
   async decrypt(data) {
      await this.importKey();
      const output = await self.crypto.subtle.decrypt(this.algo, this.cryptoKey, data);
      return new Uint8Array(output);
   }
}

//`esbuild ./aead.js --bundle --format=esm --target=esnext --outfile=../dist/aead.js`