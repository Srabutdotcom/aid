/**
 * Concate two or more Uint8Array to one Uint8Array
 * @param  {...Uint8Array} bs Uint8Array
 * @returns 
 */
export function concat(...bs) {
   const l = bs.reduce((ac, ar) => ac + (ar?.length ?? 0) , 0);
   const r = new Uint8Array(l);
   let o = 0;
   for (const e of bs) {
      r.set(e, o);
      o += e?.length;
   }
   return r;
}
/**
 * test
 */

/* const a = crypto.getRandomValues(new Uint8Array(8));
const b = crypto.getRandomValues(new Uint8Array(10));
const c = crypto.getRandomValues(new Uint8Array(12));

const con = concat(a,b,c); */
