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