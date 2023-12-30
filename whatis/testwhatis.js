import { whatis } from './whatis.js'

const num = whatis(10); // Number
const str = whatis("Hello, world!"); // String
const isLogged = whatis(true); // Boolean
const x = whatis(undefined); // Undefined
const y = whatis(null); // Null 
const sym = whatis(Symbol('foo')); // Symbol
const int = whatis(1.0); // integer
const float = whatis(1.1); // float
const object = whatis({}); // Object
const array = whatis([]); // Array
const func = whatis(function name(){}); // Function
const arrowFunc = whatis(()=>{}); // Arrow Function
const date = whatis(Date); // Date
const cls = whatis(class name{}); // Class
const generatorFunc = whatis(function* gen(){}); // Generator
const asyncFunc = whatis(async function as(){}); // async function
const asyncGenFunc = whatis(async function* gen(){}); // async generator function
const nan = whatis(NaN); // NaN
const infinity = whatis(Infinity); // Infinity
const bigint1 = whatis(12345n); // bigint
const bigint2 = whatis(BigInt(12456789)); // bigint2
const Str = whatis(String('example')); // String
const Num = whatis(Number(1.5e5));// Number
const regex = whatis(/a-z/); // Regex
const json = whatis(JSON); // JSON
const math = whatis(Math); // Math
const win = whatis(window); // window
const globthis = whatis(globalThis); // globalThis

console.log(gV(num)); // "number"
console.log(gV(str)); // "string"
console.log(gV(isLogged)); // "boolean"
console.log(gV(x)); // "undefined"
console.log(gV(y)); // "null" (a known quirk in JavaScript)
console.log(gV(sym)); // "symbol"
console.log(gV(int)); // "integer"
console.log(gV(float)); // "float"
console.log(gV(object)); // "object"
console.log(gV(array)); // "array"
console.log(gV(func)); // "function"
console.log(gV(arrowFunc)); // "arrow function"
console.log(gV(date)); // "date"
console.log(gV(cls)); // "class"
console.log(gV(generatorFunc)); // "generator function"
console.log(gV(asyncFunc)); // "async function"
console.log(gV(asyncGenFunc)); // "async generator function"
console.log(gV(nan)); // "nan"
console.log(gV(infinity)); // "infinity"
console.log(gV(bigint1)); // "bigint 1"
console.log(gV(bigint2)); // "bigint 2"
console.log(gV(Str)); // "String"
console.log(gV(Num)); // "Number"
console.log(gV(regex)); // "Regex"
console.log(gV(json)); // "JSON"
console.log(gV(math)); // "Math"
console.log(gV(win)); // "window"
console.log(gV(globthis)); // globalThis

function gV(data){
   const vOf = data.valueOf();
   const sType = data.subType();
   const name = data.name();
   return `valueOf: ${vOf} subType: ${sType} name: ${name}`;
}

debugger;