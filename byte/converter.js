export function hexStrtoBytes(hexString) {
   const pairs = [];
   for (let i = 0; i < hexString.length; i += 2) {
      const pair = hexString.slice(i, i + 2);
      pairs.push(Number('0x' + pair));
   }
   return new Uint8Array(pairs);
}

export function hexArrayStrtoBytes(hexArrayStr) {
   const hexArray = hexArrayStr.split(/\s/).filter(e => e.length > 0).map(e => Number('0x' + e));
   return new Uint8Array(hexArray)
}

export function hexArrStrToBase64Url(hexArrStr){
   const arr = hexArrStr.split(/\s/).filter(e=>e.length).map(e=>Number('0x'+e))
   let str = '';
 
   for (const charCode of arr) {
     str += String.fromCharCode(charCode);
   }
 
   const base64String = btoa(str);
 
   return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/* const m = `b4 bb 49 8f 82 79 30 3d 98 08 36 39 9b 36 c6 98 8c
0c 68 de 55 e1 bd b8 26 d3 90 1a 24 61 ea fd 2d e4 9a 91 d0 15 ab
bc 9a 95 13 7a ce 6c 1a f1 9e aa 6a f9 8c 7c ed 43 12 09 98 e1 87
a8 0e e0 cc b0 52 4b 1b 01 8c 3e 0b 63 26 4d 44 9a 6d 38 e2 2a 5f
da 43 08 46 74 80 30 53 0e f0 46 1c 8c a9 d9 ef bf ae 8e a6 d1 d0
3e 2b d1 93 ef f0 ab 9a 80 02 c4 74 28 a6 d3 5a 8d 88 d7 9f 7f 1e
3f`

const b64 = hexArrStrToBase64Url(m); */

