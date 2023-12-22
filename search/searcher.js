import { whatis } from '../whatis/whatis.js';

function searchInObject(str, Obj){
   for (const key in Obj){
      if(key.includes(str))return true;
      if(Obj[key].includes(str))return true;
   }
   return false
}


const incaseType ={
   'string': (str,Str)=>Str.includes(str),
   'array': (str,Arr)=>Arr.some(arr=>arr.includes(str)),
   'Object': searchInObject
}

export function searchString(substring){
   return {
      in: function (data){
         const t = whatis(data);
         return incaseType[t]?.(substring, data)??false
      }
   }
}