# Aids
## _Javascript tools_

Aids merupakan kumpulan tools untuk mempermudah pengolahan javascript pada sisi _client_ maupun _server deno_. Beberapa tools yang sudah kami buat yaitu:
- Whatis - untuk identifikasi _variable_ atau _object_.
- Search - untuk mencari string pada _string_, _array_ maupun _object_
- Converter - untuk konversi 

## Petunjuk

```js client
import { whatis, searchString, encoder, decoder, bufferToBase64URLString, base64url_to_string } from 'https://deno.land/x/aids@v.1.0.0/dist/aids.bundle.js?source'

whatis('test')=='string' // true
const asyncFunc = whatis(async function as(){}) 
asyncFunc == 'function' // true
asyncFunc.subType() // AsyncFunction
asyncFunc.name() // as
```
Lebih lengkap dapat dilihat pada folder _/whatis/testwhatis.js_

## License
MIT


