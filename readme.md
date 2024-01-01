# Aid
## _Javascript tools_
![https://img.shields.io/github/v/tag/srabutdotcom/aid](https://img.shields.io/github/v/tag/srabutdotcom/aid) [![license](https://img.shields.io/github/license/srabutdotcom/aid
)](https://img.shields.io/github/license/srabutdotcom/aid
) [![download](https://img.shields.io/github/downloads/srabutdotcom/aid/v.1.0.1/total
)](https://img.shields.io/github/downloads/srabutdotcom/aid/v.1.0.1/total
)

### Fitur
- Whatis - identifikasi _variable_ atau _object_.
- Search - mencari string pada _string_, _array_ maupun _object_
- Converter - konversi data
- Fetch - unduh file menggunakan _readable (byte) stream_ termasuk unduh javascript tanpa takut error karena _mime type_ tidak sesuai.

## Petunjuk

```javascript
import * as aid from 'https://deno.land/x/aids/dist/aids.bundle.js?source'

const { whatis } = aid 
whatis('test')=='string' // true
const asyncFunc = whatis(async function as(){}) 
asyncFunc == 'function' // true
asyncFunc.subType() // AsyncFunction
asyncFunc.name() // as
```

Petunjuk lainnya dapat dilihat pada masing - masing direktori.


