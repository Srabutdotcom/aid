# whatis
## _Javascript tools_

### Fitur
- Javascript wrapper untuk setiap value dengan output tipe variable, _subType_, dan _name_ 

## Petunjuk

```javascript
import { whatis } from 'https://deno.land/x/aids/dist/aids.bundle.js?source'
// atau bisa dicoba pada console dengan cara
const { whatis } = await import('https://deno.land/x/aids/dist/aids.bundle.js?source')
const str = whatis('contoh');
whatis(10)=='number' // true
whatis(()=>{})=='function' // true

// contoh lengkap dapat dilihat pada testwhatis.js
```


