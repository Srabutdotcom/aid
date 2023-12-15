/**
 * Returns the type of a value.
 * @param {any} d - the value to check
 * @returns {string|number|boolean|symbol|undefined|null|function|Object} - the type of the value
 */
export function whatis(d) {
   if (d === null) return 'null';
   const t = typeof d;
   if (t !== 'object') return t;
   return d?.constructor?.name ?? 'Object';
}