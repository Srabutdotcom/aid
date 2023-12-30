/**
 * Returns the type of a value.
 * @param {any} d - the value to check
 * @returns {string|number|boolean|symbol|undefined|null|function|Object} - the type of the value
 */
export function whatis(d) {
   if (d === null) return subType(d, 'null');
   const t = typeof d;
   if (t !== 'object') return subType(d, t);
   return subType(d, d?.constructor?.name ?? 'Object');
}

function subType(d, t) {
   class Whatis {
      constructor(d) {
         this.value = d
      }
      valueOf() {
         return t
      }
      subType() {
         switch (t) {
            case 'null':
            case 'undefined':
            case 'boolean':
            case 'string':
            case 'symbol': return ''
            case 'number': {
               if (Number.isInteger(d)) return 'integer'
               if (Number.isNaN(d)) return 'NaN'
               if (d==Infinity) return 'Infinity'
               return 'float'
            }
            case 'function': {
               if (d.constructor.name == 'Function') {
                  if (d.toString().match(/^function/g)?.length) return 'Function'
                  if (d.toString().match(/^class/g)?.length) return 'Class'
                  return 'Arrow'
               } else {
                  return d.constructor.name
               }
            }
            default: return ''
         }
      }
      name() {
         if (t == 'function') return d.name;
         return ''
      }
   }
   //Object.defineProperty(Object.getPrototypeOf(Whatis),'valueOf',{value:function(){return t}})
   return new Whatis(d)
}