# searchString
## _Javascript tools_

### Fitur
- mencari teks pada _string_, _object_, dan _array_ dengan output _boolean_ 

## Petunjuk

```javascript
import { searchString } from 'https://deno.land/x/aids/dist/aids.bundle.js?source'
// atau bisa dicoba pada console dengan cara
const { searchString } = await import('https://deno.land/x/aids/dist/aids.bundle.js?source')

searchString('bukan').in('dari kalimat ini bukan yang di cari'); // true
searchString('sub').in(['dari kalimat ini bukan yang di cari', 'sub string']); // true

// contoh lengkap dapat dilihat pada testsearcher.js
```


