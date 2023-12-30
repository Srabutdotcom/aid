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

const regex = /(?<tagString>[`](?:(?=([\\])?)\1.)*?[`])|(?<string>["'](?:(?=([\\])?)\1.)*?["'])|(?<comment>^\s*\/\/.*$|^\/[*][\s\S]*[*]\/$)|(?<regex>[/](?<=[/]).*(?=[/])[/][dgimsuy]*)|(?<word>[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*)|(?<number>\d[\d._]*([eE][+/-]?)?\d+|\d[oOxXbB][\d_a-fA-F]*n?|\d[\d_]*n?)|(?<operator>(?<increment>[+]{2})|(?<decrement>[--]{2})|(?<aritmaticAssignment>[+\-*/%]=)|(?<exponentAssignment>[*]{2}=)|(?<aritmatic>[*]{2}|[+\-*/%])|(?<strictEquality>[=]{3})|(?<arrow>[=][>])|(?<equalTo>[=]{2})|(?<assignment>[=])|(?<strictNonEquality>![=]{2})|(?<notEqualTo>!=)|(?<nullishAssigment>[?]{2}=)|(?<nullish>[?]{2})|(?<greaterThanOrEqualTo>>=)|(?<unsignedRightShiftAssignment>[>]{3}=)|(?<unsignedRightShift>[>]{3})|(?<shiftAssignment>[><]{2}=)|(?<shift>[><]{2})|(?<greaterThan>>)|(?<lessThanOrEqualTo><=)|(?<lessThan><)|(?<logicalAssigment>[&|]{2}=)|(?<logical>[&|]{2})|(?<optionalChaining>[?][.])|(?<computedMemberAccess>(?<=(\w|[?][.])\s*)[\[])|(?<bitwiseAssignment>[&|^]=)|(?<bitwise>[&|^~])|(?<Not>[!]+)|(?<spread>[.]{3})|(?<braces>[}{)(\]\[])|(?<memberAccess>[.])|(?<questionMark>[?])|(?<comma>[,])|(?<colon>[:])|(?<hash>[#])|(?<backSlash>[\\])|(?<end>[;]+))/dgu;

function chunker(script) { return [...script.matchAll(regex)] }