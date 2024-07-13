/**
 * 
 * @param {Uint8Array} data 
 * @param {uint} pos 
 * @param {uint} length 
 * @returns {uint} The unsigned integer value, or throws an error if the provided data is not a byte array,
       the position is out of bounds, or the length is less than 1.
 */
export function getUint8BE(data, pos = 0, length = 1) {

   if (!(data instanceof Uint8Array)) {
      throw new TypeError("Input data must be a byte array");
   }

   if (pos < 0 || pos >= data.length) {
      throw new TypeError("Position is out of bounds");
   }

   if (length < 1) {
      throw new TypeError("Length must be at least 1");
   }

   if (pos + length > data.length) {
      throw TypeError(`length is beyond data.length`)
   }

   // Use a loop to handle bytes of any length
   let output = 0;
   for (let i = pos; i < pos + length; i++) {
      output = (output << 8) | data[i];
   }

   return output;
}

export function getUint8(data, pos) {
   return getUint8BE(data, pos, 1);
}

export function getUint16(data, pos) {
   return getUint8BE(data, pos, 2);
}

export function getUint24(data, pos) {
   return getUint8BE(data, pos, 3);
}

export function getUint32(data, pos) {
   return getUint8BE(data, pos, 4);
}