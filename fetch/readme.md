# Fetch
## _Javascript tools_

### Fitur
- fetchStream - unduh file menggunakan stream, _live update and progress to element_.
- fetchByteStream - unduh file menggunakan byte stream , _live update and progress to element_.
- importJs - unduh javascript tanpa takut _error_ karena _mime type_ dianggap text.

## Petunjuk

```javascript
import { importJs, fetchStream, fetchByteStream } from 'https://deno.land/x/aids/dist/aids.bundle.js?source'

// import whatis
const { whatis } = await importJs('https://raw.githubusercontent.com/Srabutdotcom/aid/master/whatis/whatis.js')
// import image and update to img element and progress element
fetchStream('https://picsum.photos/200/300',/* imgElement, progressElement */)
// atau menggunakan fetchByteStream
fetchByteStream('https://picsum.photos/200/300',/* imgElement, progressElement */)
```


