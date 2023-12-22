import { searchString } from './searcher.js'

const str = 'dari kalimat ini bukan yang di cari'
const arr = [
   'ada yang di cari',
   'bukan yang di cari',
   'lain lagi'
]

const obj = {
   ada: 'yang di cari',
   bukan: 'yang di ingini',
   lalu : 'apa ya?'
}

const a = searchString('bukan').in(str);
const b = searchString('bukan').in(arr);
const c = searchString('bukan').in(obj)
const d = searchString('ogah').in(obj);

debugger;