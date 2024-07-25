var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require3() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/browser.js
var require_browser = __commonJS({
  "../../../../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BrowserRandomSource = void 0;
    var QUOTA = 65536;
    var BrowserRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        const browserCrypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (browserCrypto && browserCrypto.getRandomValues !== void 0) {
          this._crypto = browserCrypto;
          this.isAvailable = true;
          this.isInstantiated = true;
        }
      }
      randomBytes(length) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Browser random byte generator is not available.");
        }
        const out = new Uint8Array(length);
        for (let i = 0; i < out.length; i += QUOTA) {
          this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, QUOTA)));
        }
        return out;
      }
    };
    exports.BrowserRandomSource = BrowserRandomSource;
  }
});

// ../../../../../../node_modules/.deno/@stablelib+wipe@1.0.1/node_modules/@stablelib/wipe/lib/wipe.js
var require_wipe = __commonJS({
  "../../../../../../node_modules/.deno/@stablelib+wipe@1.0.1/node_modules/@stablelib/wipe/lib/wipe.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function wipe(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = 0;
      }
      return array;
    }
    exports.wipe = wipe;
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
  }
});

// ../../../../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/node.js
var require_node = __commonJS({
  "../../../../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeRandomSource = void 0;
    var wipe_1 = require_wipe();
    var NodeRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        if (typeof __require !== "undefined") {
          const nodeCrypto = require_crypto();
          if (nodeCrypto && nodeCrypto.randomBytes) {
            this._crypto = nodeCrypto;
            this.isAvailable = true;
            this.isInstantiated = true;
          }
        }
      }
      randomBytes(length) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Node.js random byte generator is not available.");
        }
        let buffer = this._crypto.randomBytes(length);
        if (buffer.length !== length) {
          throw new Error("NodeRandomSource: got fewer bytes than requested");
        }
        const out = new Uint8Array(length);
        for (let i = 0; i < out.length; i++) {
          out[i] = buffer[i];
        }
        (0, wipe_1.wipe)(buffer);
        return out;
      }
    };
    exports.NodeRandomSource = NodeRandomSource;
  }
});

// ../../../../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/system.js
var require_system = __commonJS({
  "../../../../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/system.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SystemRandomSource = void 0;
    var browser_1 = require_browser();
    var node_1 = require_node();
    var SystemRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.name = "";
        this._source = new browser_1.BrowserRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Browser";
          return;
        }
        this._source = new node_1.NodeRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Node";
          return;
        }
      }
      randomBytes(length) {
        if (!this.isAvailable) {
          throw new Error("System random byte generator is not available.");
        }
        return this._source.randomBytes(length);
      }
    };
    exports.SystemRandomSource = SystemRandomSource;
  }
});

// ../../../../../../node_modules/.deno/@stablelib+int@1.0.1/node_modules/@stablelib/int/lib/int.js
var require_int = __commonJS({
  "../../../../../../node_modules/.deno/@stablelib+int@1.0.1/node_modules/@stablelib/int/lib/int.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function imulShim(a, b) {
      var ah = a >>> 16 & 65535, al = a & 65535;
      var bh = b >>> 16 & 65535, bl = b & 65535;
      return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    }
    exports.mul = Math.imul || imulShim;
    function add(a, b) {
      return a + b | 0;
    }
    exports.add = add;
    function sub(a, b) {
      return a - b | 0;
    }
    exports.sub = sub;
    function rotl(x, n) {
      return x << n | x >>> 32 - n;
    }
    exports.rotl = rotl;
    function rotr(x, n) {
      return x << 32 - n | x >>> n;
    }
    exports.rotr = rotr;
    function isIntegerShim(n) {
      return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
    }
    exports.isInteger = Number.isInteger || isIntegerShim;
    exports.MAX_SAFE_INTEGER = 9007199254740991;
    exports.isSafeInteger = function(n) {
      return exports.isInteger(n) && (n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER);
    };
  }
});

// ../../../../../../node_modules/.deno/@stablelib+binary@1.0.1/node_modules/@stablelib/binary/lib/binary.js
var require_binary = __commonJS({
  "../../../../../../node_modules/.deno/@stablelib+binary@1.0.1/node_modules/@stablelib/binary/lib/binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var int_1 = require_int();
    function readInt16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
    }
    exports.readInt16BE = readInt16BE;
    function readUint16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
    }
    exports.readUint16BE = readUint16BE;
    function readInt16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
    }
    exports.readInt16LE = readInt16LE;
    function readUint16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint16LE = readUint16LE;
    function writeUint16BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 8;
      out[offset + 1] = value >>> 0;
      return out;
    }
    exports.writeUint16BE = writeUint16BE;
    exports.writeInt16BE = writeUint16BE;
    function writeUint16LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      return out;
    }
    exports.writeUint16LE = writeUint16LE;
    exports.writeInt16LE = writeUint16LE;
    function readInt32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
    }
    exports.readInt32BE = readInt32BE;
    function readUint32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
    }
    exports.readUint32BE = readUint32BE;
    function readInt32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
    }
    exports.readInt32LE = readInt32LE;
    function readUint32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint32LE = readUint32LE;
    function writeUint32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 24;
      out[offset + 1] = value >>> 16;
      out[offset + 2] = value >>> 8;
      out[offset + 3] = value >>> 0;
      return out;
    }
    exports.writeUint32BE = writeUint32BE;
    exports.writeInt32BE = writeUint32BE;
    function writeUint32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      out[offset + 2] = value >>> 16;
      out[offset + 3] = value >>> 24;
      return out;
    }
    exports.writeUint32LE = writeUint32LE;
    exports.writeInt32LE = writeUint32LE;
    function readInt64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi = readInt32BE(array, offset);
      var lo = readInt32BE(array, offset + 4);
      return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64BE = readInt64BE;
    function readUint64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi = readUint32BE(array, offset);
      var lo = readUint32BE(array, offset + 4);
      return hi * 4294967296 + lo;
    }
    exports.readUint64BE = readUint64BE;
    function readInt64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readInt32LE(array, offset);
      var hi = readInt32LE(array, offset + 4);
      return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64LE = readInt64LE;
    function readUint64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readUint32LE(array, offset);
      var hi = readUint32LE(array, offset + 4);
      return hi * 4294967296 + lo;
    }
    exports.readUint64LE = readUint64LE;
    function writeUint64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32BE(value / 4294967296 >>> 0, out, offset);
      writeUint32BE(value >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64BE = writeUint64BE;
    exports.writeInt64BE = writeUint64BE;
    function writeUint64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32LE(value >>> 0, out, offset);
      writeUint32LE(value / 4294967296 >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64LE = writeUint64LE;
    exports.writeInt64LE = writeUint64LE;
    function readUintBE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintBE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintBE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
        result += array[i] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintBE = readUintBE;
    function readUintLE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintLE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintLE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i = offset; i < offset + bitLength / 8; i++) {
        result += array[i] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintLE = readUintLE;
    function writeUintBE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintBE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintBE value must be an integer");
      }
      var div = 1;
      for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
        out[i] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintBE = writeUintBE;
    function writeUintLE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintLE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintLE value must be an integer");
      }
      var div = 1;
      for (var i = offset; i < offset + bitLength / 8; i++) {
        out[i] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintLE = writeUintLE;
    function readFloat32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset);
    }
    exports.readFloat32BE = readFloat32BE;
    function readFloat32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset, true);
    }
    exports.readFloat32LE = readFloat32LE;
    function readFloat64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset);
    }
    exports.readFloat64BE = readFloat64BE;
    function readFloat64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset, true);
    }
    exports.readFloat64LE = readFloat64LE;
    function writeFloat32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value);
      return out;
    }
    exports.writeFloat32BE = writeFloat32BE;
    function writeFloat32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value, true);
      return out;
    }
    exports.writeFloat32LE = writeFloat32LE;
    function writeFloat64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value);
      return out;
    }
    exports.writeFloat64BE = writeFloat64BE;
    function writeFloat64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value, true);
      return out;
    }
    exports.writeFloat64LE = writeFloat64LE;
  }
});

// ../../../../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/random.js
var require_random = __commonJS({
  "../../../../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/random.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomStringForEntropy = exports.randomString = exports.randomUint32 = exports.randomBytes = exports.defaultRandomSource = void 0;
    var system_1 = require_system();
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.defaultRandomSource = new system_1.SystemRandomSource();
    function randomBytes(length, prng = exports.defaultRandomSource) {
      return prng.randomBytes(length);
    }
    exports.randomBytes = randomBytes;
    function randomUint32(prng = exports.defaultRandomSource) {
      const buf = randomBytes(4, prng);
      const result = (0, binary_1.readUint32LE)(buf);
      (0, wipe_1.wipe)(buf);
      return result;
    }
    exports.randomUint32 = randomUint32;
    var ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    function randomString(length, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      if (charset.length < 2) {
        throw new Error("randomString charset is too short");
      }
      if (charset.length > 256) {
        throw new Error("randomString charset is too long");
      }
      let out = "";
      const charsLen = charset.length;
      const maxByte = 256 - 256 % charsLen;
      while (length > 0) {
        const buf = randomBytes(Math.ceil(length * 256 / maxByte), prng);
        for (let i = 0; i < buf.length && length > 0; i++) {
          const randomByte = buf[i];
          if (randomByte < maxByte) {
            out += charset.charAt(randomByte % charsLen);
            length--;
          }
        }
        (0, wipe_1.wipe)(buf);
      }
      return out;
    }
    exports.randomString = randomString;
    function randomStringForEntropy(bits, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      const length = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
      return randomString(length, charset, prng);
    }
    exports.randomStringForEntropy = randomStringForEntropy;
  }
});

// ../../../../../../node_modules/.deno/@stablelib+x25519@1.0.3/node_modules/@stablelib/x25519/lib/x25519.js
var require_x25519 = __commonJS({
  "../../../../../../node_modules/.deno/@stablelib+x25519@1.0.3/node_modules/@stablelib/x25519/lib/x25519.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sharedKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.scalarMultBase = exports.scalarMult = exports.SHARED_KEY_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = void 0;
    var random_1 = require_random();
    var wipe_1 = require_wipe();
    exports.PUBLIC_KEY_LENGTH = 32;
    exports.SECRET_KEY_LENGTH = 32;
    exports.SHARED_KEY_LENGTH = 32;
    function gf(init) {
      const r = new Float64Array(16);
      if (init) {
        for (let i = 0; i < init.length; i++) {
          r[i] = init[i];
        }
      }
      return r;
    }
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var _121665 = gf([56129, 1]);
    function car25519(o) {
      let c = 1;
      for (let i = 0; i < 16; i++) {
        let v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
      }
      o[0] += c - 1 + 37 * (c - 1);
    }
    function sel25519(p, q, b) {
      const c = ~(b - 1);
      for (let i = 0; i < 16; i++) {
        const t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
      }
    }
    function pack25519(o, n) {
      const m = gf();
      const t = gf();
      for (let i = 0; i < 16; i++) {
        t[i] = n[i];
      }
      car25519(t);
      car25519(t);
      car25519(t);
      for (let j = 0; j < 2; j++) {
        m[0] = t[0] - 65517;
        for (let i = 1; i < 15; i++) {
          m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
          m[i - 1] &= 65535;
        }
        m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
        const b = m[15] >> 16 & 1;
        m[14] &= 65535;
        sel25519(t, m, 1 - b);
      }
      for (let i = 0; i < 16; i++) {
        o[2 * i] = t[i] & 255;
        o[2 * i + 1] = t[i] >> 8;
      }
    }
    function unpack25519(o, n) {
      for (let i = 0; i < 16; i++) {
        o[i] = n[2 * i] + (n[2 * i + 1] << 8);
      }
      o[15] &= 32767;
    }
    function add(o, a, b) {
      for (let i = 0; i < 16; i++) {
        o[i] = a[i] + b[i];
      }
    }
    function sub(o, a, b) {
      for (let i = 0; i < 16; i++) {
        o[i] = a[i] - b[i];
      }
    }
    function mul(o, a, b) {
      let v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
      v = a[0];
      t0 += v * b0;
      t1 += v * b1;
      t2 += v * b2;
      t3 += v * b3;
      t4 += v * b4;
      t5 += v * b5;
      t6 += v * b6;
      t7 += v * b7;
      t8 += v * b8;
      t9 += v * b9;
      t10 += v * b10;
      t11 += v * b11;
      t12 += v * b12;
      t13 += v * b13;
      t14 += v * b14;
      t15 += v * b15;
      v = a[1];
      t1 += v * b0;
      t2 += v * b1;
      t3 += v * b2;
      t4 += v * b3;
      t5 += v * b4;
      t6 += v * b5;
      t7 += v * b6;
      t8 += v * b7;
      t9 += v * b8;
      t10 += v * b9;
      t11 += v * b10;
      t12 += v * b11;
      t13 += v * b12;
      t14 += v * b13;
      t15 += v * b14;
      t16 += v * b15;
      v = a[2];
      t2 += v * b0;
      t3 += v * b1;
      t4 += v * b2;
      t5 += v * b3;
      t6 += v * b4;
      t7 += v * b5;
      t8 += v * b6;
      t9 += v * b7;
      t10 += v * b8;
      t11 += v * b9;
      t12 += v * b10;
      t13 += v * b11;
      t14 += v * b12;
      t15 += v * b13;
      t16 += v * b14;
      t17 += v * b15;
      v = a[3];
      t3 += v * b0;
      t4 += v * b1;
      t5 += v * b2;
      t6 += v * b3;
      t7 += v * b4;
      t8 += v * b5;
      t9 += v * b6;
      t10 += v * b7;
      t11 += v * b8;
      t12 += v * b9;
      t13 += v * b10;
      t14 += v * b11;
      t15 += v * b12;
      t16 += v * b13;
      t17 += v * b14;
      t18 += v * b15;
      v = a[4];
      t4 += v * b0;
      t5 += v * b1;
      t6 += v * b2;
      t7 += v * b3;
      t8 += v * b4;
      t9 += v * b5;
      t10 += v * b6;
      t11 += v * b7;
      t12 += v * b8;
      t13 += v * b9;
      t14 += v * b10;
      t15 += v * b11;
      t16 += v * b12;
      t17 += v * b13;
      t18 += v * b14;
      t19 += v * b15;
      v = a[5];
      t5 += v * b0;
      t6 += v * b1;
      t7 += v * b2;
      t8 += v * b3;
      t9 += v * b4;
      t10 += v * b5;
      t11 += v * b6;
      t12 += v * b7;
      t13 += v * b8;
      t14 += v * b9;
      t15 += v * b10;
      t16 += v * b11;
      t17 += v * b12;
      t18 += v * b13;
      t19 += v * b14;
      t20 += v * b15;
      v = a[6];
      t6 += v * b0;
      t7 += v * b1;
      t8 += v * b2;
      t9 += v * b3;
      t10 += v * b4;
      t11 += v * b5;
      t12 += v * b6;
      t13 += v * b7;
      t14 += v * b8;
      t15 += v * b9;
      t16 += v * b10;
      t17 += v * b11;
      t18 += v * b12;
      t19 += v * b13;
      t20 += v * b14;
      t21 += v * b15;
      v = a[7];
      t7 += v * b0;
      t8 += v * b1;
      t9 += v * b2;
      t10 += v * b3;
      t11 += v * b4;
      t12 += v * b5;
      t13 += v * b6;
      t14 += v * b7;
      t15 += v * b8;
      t16 += v * b9;
      t17 += v * b10;
      t18 += v * b11;
      t19 += v * b12;
      t20 += v * b13;
      t21 += v * b14;
      t22 += v * b15;
      v = a[8];
      t8 += v * b0;
      t9 += v * b1;
      t10 += v * b2;
      t11 += v * b3;
      t12 += v * b4;
      t13 += v * b5;
      t14 += v * b6;
      t15 += v * b7;
      t16 += v * b8;
      t17 += v * b9;
      t18 += v * b10;
      t19 += v * b11;
      t20 += v * b12;
      t21 += v * b13;
      t22 += v * b14;
      t23 += v * b15;
      v = a[9];
      t9 += v * b0;
      t10 += v * b1;
      t11 += v * b2;
      t12 += v * b3;
      t13 += v * b4;
      t14 += v * b5;
      t15 += v * b6;
      t16 += v * b7;
      t17 += v * b8;
      t18 += v * b9;
      t19 += v * b10;
      t20 += v * b11;
      t21 += v * b12;
      t22 += v * b13;
      t23 += v * b14;
      t24 += v * b15;
      v = a[10];
      t10 += v * b0;
      t11 += v * b1;
      t12 += v * b2;
      t13 += v * b3;
      t14 += v * b4;
      t15 += v * b5;
      t16 += v * b6;
      t17 += v * b7;
      t18 += v * b8;
      t19 += v * b9;
      t20 += v * b10;
      t21 += v * b11;
      t22 += v * b12;
      t23 += v * b13;
      t24 += v * b14;
      t25 += v * b15;
      v = a[11];
      t11 += v * b0;
      t12 += v * b1;
      t13 += v * b2;
      t14 += v * b3;
      t15 += v * b4;
      t16 += v * b5;
      t17 += v * b6;
      t18 += v * b7;
      t19 += v * b8;
      t20 += v * b9;
      t21 += v * b10;
      t22 += v * b11;
      t23 += v * b12;
      t24 += v * b13;
      t25 += v * b14;
      t26 += v * b15;
      v = a[12];
      t12 += v * b0;
      t13 += v * b1;
      t14 += v * b2;
      t15 += v * b3;
      t16 += v * b4;
      t17 += v * b5;
      t18 += v * b6;
      t19 += v * b7;
      t20 += v * b8;
      t21 += v * b9;
      t22 += v * b10;
      t23 += v * b11;
      t24 += v * b12;
      t25 += v * b13;
      t26 += v * b14;
      t27 += v * b15;
      v = a[13];
      t13 += v * b0;
      t14 += v * b1;
      t15 += v * b2;
      t16 += v * b3;
      t17 += v * b4;
      t18 += v * b5;
      t19 += v * b6;
      t20 += v * b7;
      t21 += v * b8;
      t22 += v * b9;
      t23 += v * b10;
      t24 += v * b11;
      t25 += v * b12;
      t26 += v * b13;
      t27 += v * b14;
      t28 += v * b15;
      v = a[14];
      t14 += v * b0;
      t15 += v * b1;
      t16 += v * b2;
      t17 += v * b3;
      t18 += v * b4;
      t19 += v * b5;
      t20 += v * b6;
      t21 += v * b7;
      t22 += v * b8;
      t23 += v * b9;
      t24 += v * b10;
      t25 += v * b11;
      t26 += v * b12;
      t27 += v * b13;
      t28 += v * b14;
      t29 += v * b15;
      v = a[15];
      t15 += v * b0;
      t16 += v * b1;
      t17 += v * b2;
      t18 += v * b3;
      t19 += v * b4;
      t20 += v * b5;
      t21 += v * b6;
      t22 += v * b7;
      t23 += v * b8;
      t24 += v * b9;
      t25 += v * b10;
      t26 += v * b11;
      t27 += v * b12;
      t28 += v * b13;
      t29 += v * b14;
      t30 += v * b15;
      t0 += 38 * t16;
      t1 += 38 * t17;
      t2 += 38 * t18;
      t3 += 38 * t19;
      t4 += 38 * t20;
      t5 += 38 * t21;
      t6 += 38 * t22;
      t7 += 38 * t23;
      t8 += 38 * t24;
      t9 += 38 * t25;
      t10 += 38 * t26;
      t11 += 38 * t27;
      t12 += 38 * t28;
      t13 += 38 * t29;
      t14 += 38 * t30;
      c = 1;
      v = t0 + c + 65535;
      c = Math.floor(v / 65536);
      t0 = v - c * 65536;
      v = t1 + c + 65535;
      c = Math.floor(v / 65536);
      t1 = v - c * 65536;
      v = t2 + c + 65535;
      c = Math.floor(v / 65536);
      t2 = v - c * 65536;
      v = t3 + c + 65535;
      c = Math.floor(v / 65536);
      t3 = v - c * 65536;
      v = t4 + c + 65535;
      c = Math.floor(v / 65536);
      t4 = v - c * 65536;
      v = t5 + c + 65535;
      c = Math.floor(v / 65536);
      t5 = v - c * 65536;
      v = t6 + c + 65535;
      c = Math.floor(v / 65536);
      t6 = v - c * 65536;
      v = t7 + c + 65535;
      c = Math.floor(v / 65536);
      t7 = v - c * 65536;
      v = t8 + c + 65535;
      c = Math.floor(v / 65536);
      t8 = v - c * 65536;
      v = t9 + c + 65535;
      c = Math.floor(v / 65536);
      t9 = v - c * 65536;
      v = t10 + c + 65535;
      c = Math.floor(v / 65536);
      t10 = v - c * 65536;
      v = t11 + c + 65535;
      c = Math.floor(v / 65536);
      t11 = v - c * 65536;
      v = t12 + c + 65535;
      c = Math.floor(v / 65536);
      t12 = v - c * 65536;
      v = t13 + c + 65535;
      c = Math.floor(v / 65536);
      t13 = v - c * 65536;
      v = t14 + c + 65535;
      c = Math.floor(v / 65536);
      t14 = v - c * 65536;
      v = t15 + c + 65535;
      c = Math.floor(v / 65536);
      t15 = v - c * 65536;
      t0 += c - 1 + 37 * (c - 1);
      c = 1;
      v = t0 + c + 65535;
      c = Math.floor(v / 65536);
      t0 = v - c * 65536;
      v = t1 + c + 65535;
      c = Math.floor(v / 65536);
      t1 = v - c * 65536;
      v = t2 + c + 65535;
      c = Math.floor(v / 65536);
      t2 = v - c * 65536;
      v = t3 + c + 65535;
      c = Math.floor(v / 65536);
      t3 = v - c * 65536;
      v = t4 + c + 65535;
      c = Math.floor(v / 65536);
      t4 = v - c * 65536;
      v = t5 + c + 65535;
      c = Math.floor(v / 65536);
      t5 = v - c * 65536;
      v = t6 + c + 65535;
      c = Math.floor(v / 65536);
      t6 = v - c * 65536;
      v = t7 + c + 65535;
      c = Math.floor(v / 65536);
      t7 = v - c * 65536;
      v = t8 + c + 65535;
      c = Math.floor(v / 65536);
      t8 = v - c * 65536;
      v = t9 + c + 65535;
      c = Math.floor(v / 65536);
      t9 = v - c * 65536;
      v = t10 + c + 65535;
      c = Math.floor(v / 65536);
      t10 = v - c * 65536;
      v = t11 + c + 65535;
      c = Math.floor(v / 65536);
      t11 = v - c * 65536;
      v = t12 + c + 65535;
      c = Math.floor(v / 65536);
      t12 = v - c * 65536;
      v = t13 + c + 65535;
      c = Math.floor(v / 65536);
      t13 = v - c * 65536;
      v = t14 + c + 65535;
      c = Math.floor(v / 65536);
      t14 = v - c * 65536;
      v = t15 + c + 65535;
      c = Math.floor(v / 65536);
      t15 = v - c * 65536;
      t0 += c - 1 + 37 * (c - 1);
      o[0] = t0;
      o[1] = t1;
      o[2] = t2;
      o[3] = t3;
      o[4] = t4;
      o[5] = t5;
      o[6] = t6;
      o[7] = t7;
      o[8] = t8;
      o[9] = t9;
      o[10] = t10;
      o[11] = t11;
      o[12] = t12;
      o[13] = t13;
      o[14] = t14;
      o[15] = t15;
    }
    function square(o, a) {
      mul(o, a, a);
    }
    function inv25519(o, inp) {
      const c = gf();
      for (let i = 0; i < 16; i++) {
        c[i] = inp[i];
      }
      for (let i = 253; i >= 0; i--) {
        square(c, c);
        if (i !== 2 && i !== 4) {
          mul(c, c, inp);
        }
      }
      for (let i = 0; i < 16; i++) {
        o[i] = c[i];
      }
    }
    function scalarMult(n, p) {
      const z = new Uint8Array(32);
      const x = new Float64Array(80);
      const a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
      for (let i = 0; i < 31; i++) {
        z[i] = n[i];
      }
      z[31] = n[31] & 127 | 64;
      z[0] &= 248;
      unpack25519(x, p);
      for (let i = 0; i < 16; i++) {
        b[i] = x[i];
      }
      a[0] = d[0] = 1;
      for (let i = 254; i >= 0; --i) {
        const r = z[i >>> 3] >>> (i & 7) & 1;
        sel25519(a, b, r);
        sel25519(c, d, r);
        add(e, a, c);
        sub(a, a, c);
        add(c, b, d);
        sub(b, b, d);
        square(d, e);
        square(f, a);
        mul(a, c, a);
        mul(c, b, e);
        add(e, a, c);
        sub(a, a, c);
        square(b, a);
        sub(c, d, f);
        mul(a, c, _121665);
        add(a, a, d);
        mul(c, c, a);
        mul(a, d, f);
        mul(d, b, x);
        square(b, e);
        sel25519(a, b, r);
        sel25519(c, d, r);
      }
      for (let i = 0; i < 16; i++) {
        x[i + 16] = a[i];
        x[i + 32] = c[i];
        x[i + 48] = b[i];
        x[i + 64] = d[i];
      }
      const x32 = x.subarray(32);
      const x16 = x.subarray(16);
      inv25519(x32, x32);
      mul(x16, x16, x32);
      const q = new Uint8Array(32);
      pack25519(q, x16);
      return q;
    }
    exports.scalarMult = scalarMult;
    function scalarMultBase(n) {
      return scalarMult(n, _9);
    }
    exports.scalarMultBase = scalarMultBase;
    function generateKeyPairFromSeed(seed) {
      if (seed.length !== exports.SECRET_KEY_LENGTH) {
        throw new Error(`x25519: seed must be ${exports.SECRET_KEY_LENGTH} bytes`);
      }
      const secretKey = new Uint8Array(seed);
      const publicKey = scalarMultBase(secretKey);
      return {
        publicKey,
        secretKey
      };
    }
    exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
    function generateKeyPair(prng) {
      const seed = (0, random_1.randomBytes)(32, prng);
      const result = generateKeyPairFromSeed(seed);
      (0, wipe_1.wipe)(seed);
      return result;
    }
    exports.generateKeyPair = generateKeyPair;
    function sharedKey2(mySecretKey, theirPublicKey, rejectZero = false) {
      if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect secret key length");
      }
      if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect public key length");
      }
      const result = scalarMult(mySecretKey, theirPublicKey);
      if (rejectZero) {
        let zeros = 0;
        for (let i = 0; i < result.length; i++) {
          zeros |= result[i];
        }
        if (zeros === 0) {
          throw new Error("X25519: invalid shared key");
        }
      }
      return result;
    }
    exports.sharedKey = sharedKey2;
  }
});

// secret.js
var x255193 = __toESM(require_x25519());

// ../../../byte/set.js
function Uint8BE(_integer, _bytes) {
  const integer = ensureUint(_integer);
  const bytes = _bytes ?? maxBytes(integer);
  const upper = 2 ** (8 * bytes) - 1;
  if (integer > upper)
    return TypeError(`integer can't be more than ${upper} `);
  const uint8 = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i++) {
    const index = bytes - 1 - i;
    const shiftAmount = index * 8;
    uint8[i] = integer >> shiftAmount & 255;
  }
  return uint8;
}
function Uint16BE(_int) {
  return Uint8BE(_int, 2);
}
function maxBytes(_integer) {
  const integer = ensureInteger(_integer);
  let b = 1;
  while (true) {
    if (2 ** (b * 8) > integer)
      return b;
    b++;
  }
}
function ensureInteger(integer) {
  const _integer = +Number(integer).toFixed(0);
  const pass = Number.isInteger(_integer);
  if (!pass)
    throw TypeError(`expected integer`);
  return _integer;
}
function ensureUint(integer) {
  const pass = ensureInteger(integer);
  if (pass < 0)
    throw TypeError(`expected positive integer`);
  return pass;
}

// ../../../byte/concat.js
function concat(...bs) {
  const l = bs.reduce((ac, ar) => ac + (ar?.length ?? 0), 0);
  const r = new Uint8Array(l);
  let o = 0;
  for (const e of bs) {
    r.set(e, o);
    o += e?.length;
  }
  return r;
}

// ../../../../tls13parser/dist/tls13parser.js
function getUint8BE(data, pos = 0, length = 1) {
  if (!(data instanceof Uint8Array)) {
    throw new TypeError("Input data must be a byte array");
  }
  if (pos < 0 || pos >= data.length) {
    throw new TypeError("Position is out of bounds");
  }
  if (length < 1) {
    throw new TypeError("Length must be at least 1");
  }
  if (pos + length > data.length) {
    throw TypeError(`length is beyond data.length`);
  }
  let output = 0;
  for (let i = pos; i < pos + length; i++) {
    output = output << 8 | data[i];
  }
  return output;
}
function getUint8(data, pos) {
  return getUint8BE(data, pos, 1);
}
function getUint16(data, pos) {
  return getUint8BE(data, pos, 2);
}
function getUint24(data, pos) {
  return getUint8BE(data, pos, 3);
}
function getUint32(data, pos) {
  return getUint8BE(data, pos, 4);
}
var Uint8View = class extends Uint8Array {
  #pos = 0;
  constructor(uint8Array, pos = 0) {
    super(uint8Array);
    this.#pos = pos;
  }
  uint8() {
    const out = getUint8(this, this.#pos);
    this.#pos++;
    return out;
  }
  uint16() {
    const out = getUint16(this, this.#pos);
    this.#pos += 2;
    return out;
  }
  uint24() {
    const out = getUint24(this, this.#pos);
    this.#pos += 3;
    return out;
  }
  uint32() {
    const out = getUint32(this, this.#pos);
    this.#pos += 4;
    return out;
  }
  /**
   * return a section of Uint8Array with specified length, the position is already defined in Uint8View
   * @param {uint} length 
   * @returns {Uint8Array}
   */
  slice(length) {
    const copy = new Uint8Array(this.buffer);
    const out = length !== void 0 ? copy.slice(this.#pos, this.#pos + length) : copy.slice(this.#pos);
    return out;
  }
  sliceMovePos(length) {
    const o = this.slice(length);
    this.#pos += length;
    return o;
  }
  get pos() {
    return this.#pos;
  }
  posAdd(uint) {
    this.#pos += uint;
  }
};
function ensureUint8View(value, pos) {
  if (value instanceof Uint8View == false)
    return new Uint8View(value, pos);
  return value;
}
function uinToHex(uint, length) {
  return Number(uint).toString(16).padStart(length + 2, `0x` + "0".repeat(length));
}
var dec = new TextDecoder();
var extsfull = {
  0: { name: "server_name", tls13: "CH, EE, CR", ref: "[RFC6066][RFC9261]" },
  1: {
    name: "max_fragment_length",
    tls13: "CH, EE",
    ref: "[RFC6066][RFC8449]"
  },
  2: { name: "client_certificate_url", tls13: "-", ref: "[RFC6066]" },
  3: { name: "trusted_ca_keys", tls13: "-", ref: "[RFC6066]" },
  4: {
    name: "truncated_hmac",
    tls13: "-",
    ref: "[RFC6066][IESG Action 2018-08-16]"
  },
  5: { name: "status_request", tls13: "CH, CR, CT", ref: "[RFC6066]" },
  6: { name: "user_mapping", tls13: "-", ref: "[RFC4681]" },
  7: { name: "client_authz", tls13: "-", ref: "[RFC5878]" },
  8: { name: "server_authz", tls13: "-", ref: "[RFC5878]" },
  9: { name: "cert_type", tls13: "-", ref: "[RFC6091]" },
  10: { name: "supported_groups", tls13: "CH, EE", ref: "[RFC8422][RFC7919]" },
  11: { name: "ec_point_formats", tls13: "-", ref: "[RFC8422]" },
  12: { name: "srp", tls13: "-", ref: "[RFC5054]" },
  13: { name: "signature_algorithms", tls13: "CH, CR", ref: "[RFC8446]" },
  14: { name: "use_srtp", tls13: "CH, EE", ref: "[RFC5764]" },
  15: { name: "heartbeat", tls13: "CH, EE", ref: "[RFC6520]" },
  16: {
    name: "application_layer_protocol_negotiation",
    tls13: "CH, EE",
    ref: "[RFC7301]"
  },
  17: { name: "status_request_v2", tls13: "-", ref: "[RFC6961]" },
  18: {
    name: "signed_certificate_timestamp",
    tls13: "CH, CR, CT",
    ref: "[RFC6962]"
  },
  19: { name: "client_certificate_type", tls13: "CH, EE", ref: "[RFC7250]" },
  20: { name: "server_certificate_type", tls13: "CH, EE", ref: "[RFC7250]" },
  21: { name: "padding", tls13: "CH", ref: "[RFC7685]" },
  22: { name: "encrypt_then_mac", tls13: "-", ref: "[RFC7366]" },
  23: { name: "extended_master_secret", tls13: "-", ref: "[RFC7627]" },
  24: { name: "token_binding", tls13: "-", ref: "[RFC8472]" },
  25: { name: "cached_info", tls13: "-", ref: "[RFC7924]" },
  26: { name: "tls_lts", tls13: "-", ref: "[draft-gutmann-tls-lts]" },
  27: { name: "compress_certificate", tls13: "CH, CR", ref: "[RFC8879]" },
  28: { name: "record_size_limit", tls13: "CH, EE", ref: "[RFC8449]" },
  29: { name: "pwd_protect", tls13: "CH", ref: "[RFC8492]" },
  30: { name: "pwd_clear", tls13: "CH", ref: "[RFC8492]" },
  31: { name: "password_salt", tls13: "CH, SH, HRR", ref: "[RFC8492]" },
  32: { name: "ticket_pinning", tls13: "CH, EE", ref: "[RFC8672]" },
  33: { name: "tls_cert_with_extern_psk", tls13: "CH, SH", ref: "[RFC8773]" },
  34: { name: "delegated_credential", tls13: "CH, CR, CT", ref: "[RFC9345]" },
  35: { name: "session_ticket", tls13: "-", ref: "[RFC5077][RFC8447]" },
  36: { name: "TLMSP", tls13: "-", ref: "[ETSI TS 103 523-2]" },
  37: { name: "TLMSP_proxying", tls13: "-", ref: "[ETSI TS 103 523-2]" },
  38: { name: "TLMSP_delegate", tls13: "-", ref: "[ETSI TS 103 523-2]" },
  39: { name: "supported_ekt_ciphers", tls13: "CH, EE", ref: "[RFC8870]" },
  41: { name: "pre_shared_key", tls13: "CH, SH", ref: "[RFC8446]" },
  42: { name: "early_data", tls13: "CH, EE, NST", ref: "[RFC8446]" },
  43: { name: "supported_versions", tls13: "CH, SH, HRR", ref: "[RFC8446]" },
  44: { name: "cookie", tls13: "CH, HRR", ref: "[RFC8446]" },
  45: { name: "psk_key_exchange_modes", tls13: "CH", ref: "[RFC8446]" },
  47: { name: "certificate_authorities", tls13: "CH, CR", ref: "[RFC8446]" },
  48: { name: "oid_filters", tls13: "CR", ref: "[RFC8446]" },
  49: { name: "post_handshake_auth", tls13: "CH", ref: "[RFC8446]" },
  50: { name: "signature_algorithms_cert", tls13: "CH, CR", ref: "[RFC8446]" },
  51: { name: "key_share", tls13: "CH, SH, HRR", ref: "[RFC8446]" },
  52: { name: "transparency_info", tls13: "CH, CR, CT", ref: "[RFC9162]" },
  53: { name: "connection_id_deprecated", tls13: "-", ref: "[RFC9146]" },
  54: { name: "connection_id", tls13: "CH, SH", ref: "[RFC9146]" },
  55: { name: "external_id_hash", tls13: "CH, EE", ref: "[RFC8844]" },
  56: { name: "external_session_id", tls13: "CH, EE", ref: "[RFC8844]" },
  57: { name: "quic_transport_parameters", tls13: "CH, EE", ref: "[RFC9001]" },
  58: { name: "ticket_request", tls13: "CH, EE", ref: "[RFC9149]" },
  59: {
    name: "dnssec_chain",
    tls13: "CH, CT",
    ref: "[RFC9102][RFC Errata 6860]"
  },
  60: {
    name: "sequence_number_encryption_algorithms",
    tls13: "CH, HRR, SH",
    ref: "[draft-pismenny-tls-dtls-plaintext-sequence-number-01]"
  },
  61: { name: "rrc", tls13: "CH, SH", ref: "[draft-ietf-tls-dtls-rrc-10]" },
  64768: {
    name: "ech_outer_extensions",
    tls13: "CH [2]",
    ref: "[draft-ietf-tls-esni-17]"
  },
  65037: {
    name: "encrypted_client_hello",
    tls13: "CH, HRR, EE",
    ref: "[draft-ietf-tls-esni-17]"
  },
  65281: { name: "renegotiation_info", tls13: "-", ref: "[RFC5746]" }
};
var functions = {
  0: server_name,
  1: max_fragment_length,
  10: supported_groups,
  13: signature_algorithms,
  28: record_size_limit,
  43: supported_versions,
  44: cookie,
  51: key_share
};
function extsBase(code, length, value) {
  const id = extsfull[code] ?? code;
  const data = functions[code] ? functions[code](value, length) : baseExt(value, length);
  return {
    id,
    data,
    length
  };
}
function baseExt(value, length) {
  const sliced = value.sliceMovePos(length);
  return sliced;
}
function server_name(value) {
  const server_name_list = [];
  const payloadLength = value.uint16();
  const end = value.pos + payloadLength;
  while (true) {
    const typeCode = value.uint8();
    const hostType = typeCode == 0 ? "0-hostname" : `${typeCode}-unknown`;
    const payloadLength2 = value.uint16();
    const hostNameBytes = value.sliceMovePos(payloadLength2);
    server_name_list.push({
      type: hostType,
      name: dec.decode(hostNameBytes)
    });
    if (value.pos >= end)
      break;
  }
  return server_name_list;
}
function max_fragment_length(value) {
  const types2 = Object.freeze({
    1: 2 ** 9,
    2: 2 ** 10,
    3: 2 ** 11,
    4: 2 ** 12
  });
  const typeCode = value.uint8();
  if (typeCode < 1 || typeCode > 4) {
    throw TypeError(`Expected code between 1 to 4 but got ${typeCode}`);
  }
  return types2[typeCode];
}
function record_size_limit(value) {
  return value.uint16();
}
function supported_groups(value) {
  const supportedGroups = [];
  const payloadLength = value.uint16();
  const end = value.pos + payloadLength;
  while (true) {
    const code = value.uint16();
    const group = namedGroup[code] ?? "unknown";
    supportedGroups.push(`${uinToHex(code, 4)}-${group}`);
    if (value.pos >= end)
      break;
  }
  return supportedGroups;
}
function signature_algorithms(value) {
  const signatureAlgoritm = [];
  const payloadLength = value.uint16();
  const end = value.pos + payloadLength;
  while (true) {
    const code = value.uint16();
    const algo = SignatureScheme[code] ?? "unknown";
    signatureAlgoritm.push(`${uinToHex(code, 4)}-${algo}`);
    if (value.pos >= end)
      break;
  }
  return signatureAlgoritm;
}
function supported_versions(value, length) {
  const isOdd = (length & 1) !== 0;
  if (isOdd) {
    const versions = [];
    const len = value.uint8();
    const end = value.pos + len;
    while (true) {
      const code2 = value.uint16();
      if (code2 < 771)
        throw TypeError(`at least TLS 1.2-0x0303`);
      versions.push(`${uinToHex(code2, 4)}-${tlsversions[code2]}`);
      if (value.pos >= end)
        break;
    }
    return versions;
  }
  const code = value.uint16();
  return `${uinToHex(code, 4)}-${tlsversions[code]}`;
}
function cookie(value) {
  const len = value.uint16();
  const _cookie = value.sliceMovePos(len);
  return _cookie;
}
function key_share(value) {
  if (value.type == "client_hello")
    return keyShareClientHello(value);
  return keyShareEntry(value);
}
function keyShareClientHello(value) {
  const payloadLength = value.uint16();
  const end = value.pos + payloadLength;
  const _keyShare = [];
  while (true) {
    _keyShare.push(keyShareEntry(value));
    if (value.pos >= end)
      break;
  }
  return _keyShare;
}
function keyShareEntry(value) {
  const group = value.uint16();
  const keyLength = value.uint16();
  const keyShare = value.sliceMovePos(keyLength);
  return {
    name: `${group}-${namedGroup[group] ?? "unknown"}`,
    key: keyShare
  };
}
var tlsversions = Object.freeze({
  768: "SSL 3.0",
  769: "TLS 1.0",
  770: "TLS 1.1",
  771: "TLS 1.2",
  772: "TLS 1.3"
});
var namedGroup = Object.freeze({
  /* Elliptic Curve Groups (ECDHE) */
  23: "secp256r1",
  24: "secp384r1",
  25: "secp521r1",
  29: "x25519",
  30: "x448",
  /* Finite Field Groups (DHE) */
  256: "ffdhe2048",
  257: "ffdhe3072",
  258: "ffdhe4096",
  259: "ffdhe6144",
  260: "ffdhe8192"
  /*0xFFFF-16 bytes-max*/
});
var SignatureScheme = Object.freeze({
  /* RSASSA-PKCS1-v1_5 algorithms */
  1025: "rsa_pkcs1_sha256",
  1281: "rsa_pkcs1_sha384",
  1537: "rsa_pkcs1_sha512",
  /* ECDSA algorithms */
  1027: "ecdsa_secp256r1_sha256",
  1283: "ecdsa_secp384r1_sha384",
  1539: "ecdsa_secp521r1_sha512",
  /* RSASSA-PSS algorithms with public key OID rsaEncryption */
  2052: "rsa_pss_rsae_sha256",
  2053: "rsa_pss_rsae_sha384",
  2054: "rsa_pss_rsae_sha512",
  /* EdDSA algorithms */
  2055: "ed25519",
  2056: "ed448",
  /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
  2057: "rsa_pss_pss_sha256",
  2058: "rsa_pss_pss_sha384",
  2059: "rsa_pss_pss_sha512",
  /* Legacy algorithms */
  513: "rsa_pkcs1_sha1",
  515: "ecdsa_sha1"
  /*0xFFFF - 16 bytes - max*/
});
var dec2 = new TextDecoder();
var namedGroup2 = Object.freeze({
  /* Elliptic Curve Groups (ECDHE) */
  23: "secp256r1",
  24: "secp384r1",
  25: "secp521r1",
  29: "x25519",
  30: "x448",
  /* Finite Field Groups (DHE) */
  256: "ffdhe2048",
  257: "ffdhe3072",
  258: "ffdhe4096",
  259: "ffdhe6144",
  260: "ffdhe8192"
  /*0xFFFF-16 bytes-max*/
});
var handShakes = Object.freeze({
  0: "HelloRequest",
  //RESERVED
  1: ClientHello,
  2: ServerHello,
  4: NewSessionTicket,
  8: EncryptedExtensions,
  //(TLS 1.3 only)
  11: Certificate,
  12: "ServerKeyExchange",
  //RESERVED
  13: CertificateRequest,
  14: "ServerHelloDone",
  //RESERVED
  15: CertificateVerify,
  16: "ClientKeyExchange",
  //RESERVED
  20: Finished
});
function Handshake(_value, length) {
  const value = ensureUint8View(_value);
  const typeCode = value.uint8();
  const typeFunc = handShakes[typeCode];
  if (!typeFunc || typeof typeCode == "string") {
    throw TypeError(`Unexpected type of record value ${typeCode}`);
  }
  const payloadLength = value.uint24();
  return {
    length: payloadLength,
    [typeFunc.name]: typeFunc(value, payloadLength),
    value
  };
}
var cipherEnums = Object.freeze({
  4865: "TLS_AES_128_GCM_SHA256",
  4866: "TLS_AES_256_GCM_SHA384",
  4867: "TLS_CHACHA20_POLY1305_SHA256",
  4868: "TLS_AES_128_CCM_SHA256",
  4869: "TLS_AES_128_CCM_8_SHA256"
});
function sessionId(value) {
  const length = value.uint8();
  if (length == 0)
    return;
  const _sessionId = value.sliceMovePos(length);
  return _sessionId;
}
function extension(value) {
  const length = value.uint16();
  if (length == 0)
    throw TypeError(`must have extension`);
  const exts = {
    length
  };
  const end = length + value.pos;
  while (true) {
    const typeCode = value.uint16();
    const typeFull = extsfull[typeCode] ?? { name: typeCode };
    const length2 = value.uint16();
    exts[typeFull.name] = extsBase(typeCode, length2, value);
    if (value.pos >= end)
      break;
  }
  return exts;
}
function ServerHello(value, length) {
  value.type = "server_hello";
  const versionCode = value.uint16();
  if (versionCode !== 771) {
    throw TypeError(
      `Expected protocolVersion 0x0303 but got ${uinToHex(versionCode, 4)}`
    );
  }
  const version = `${uinToHex(versionCode, 4)}-TLS 1.2 (legacy protocol version)`;
  const random = value.sliceMovePos(32);
  const session_id = sessionId(value);
  const cipherCode = value.uint16();
  const cipher_suite = `${uinToHex(cipherCode, 4)}-${cipherEnums[cipherCode]}`;
  const compression_method = value.uint8();
  const extensions = extension(value);
  return {
    length,
    version,
    random,
    session_id,
    cipher_suite,
    compression_method,
    extensions
  };
}
function ClientHello(value, length) {
  value.type = "client_hello";
  const versionCode = value.uint16();
  if (versionCode !== 771) {
    throw TypeError(
      `Expected protocolVersion 0x0303 but got ${uinToHex(versionCode, 4)}`
    );
  }
  const version = `${uinToHex(versionCode, 4)}-TLS 1.2 (legacy protocol version)`;
  const random = value.sliceMovePos(32);
  const session_id = sessionId(value);
  const cipher_suites = cipherSuites(value);
  const compression_methods = compression2(value);
  const extensions = extension(value);
  return {
    length,
    version,
    random,
    session_id,
    cipher_suites,
    compression_methods,
    extensions
  };
  function cipherSuites(value2) {
    const ciphers2 = [];
    const length2 = value2.uint16();
    if (length2 == 0)
      throw TypeError(`at least one cipherSuite list`);
    const end = value2.pos + length2;
    while (true) {
      const code = value2.uint16();
      ciphers2.push(
        code
        //`${uinToHex(code, 4)}-${desc}`,
      );
      if (value2.pos >= end)
        break;
    }
    return ciphers2;
  }
  function compression2(value2) {
    const length2 = value2.uint8();
    if (length2 == 0)
      throw TypeError(`compression must have 1 length`);
    const code = value2.uint8();
    if (code !== 0) {
      throw TypeError(`expected compression code 0 but got ${code}`);
    }
    return `${uinToHex(code, 2)}-No Compression`;
  }
}
function NewSessionTicket(value, length) {
  const ticket_lifetime = value.uint32();
  const ticket_age_add = value.uint32();
  const ticket_nonceLen = value.uint8();
  const ticket_nonce = value.sliceMovePos(ticket_nonceLen);
  const ticketLen = value.uint16();
  const ticket = value.sliceMovePos(ticketLen);
  const extsLen = value.uint16();
  const extentions = value.sliceMovePos(extsLen);
  return {
    ticket_lifetime,
    ticket_age_add,
    ticket_nonce,
    ticket,
    extentions
  };
}
function EncryptedExtensions(value, length) {
  const len = value.uint16();
  return value.sliceMovePos(len);
}
function Certificate(value, length) {
  let len = value.uint8();
  const certificate_request_context = value.sliceMovePos(len);
  len = value.uint24();
  const certificate_list = CertificateEntry(value, len);
  return {
    certificate_request_context,
    certificate_list
    //FIXME - 
  };
}
function CertificateEntry(value, length) {
  let len = value.uint24();
  const certificate = value.sliceMovePos(len);
  len = value.uint16();
  const extensions = value.sliceMovePos(len);
  return {
    certificate,
    extensions
  };
}
function CertificateRequest(value, length) {
  let len = value.uint8();
  const certificate_request_context = value.sliceMovePos(len);
  len = value.uint16();
  const extensions = value.sliceMovePos(len);
  return {
    certificate_request_context,
    extensions
  };
}
function CertificateVerify(value, length) {
  const sigCode = value.uint16();
  const signatureAlgoritm = `${uinToHex(sigCode, 4)}-${SignatureScheme[sigCode]}`;
  const len = value.uint16();
  const signature = value.sliceMovePos(len);
  return {
    signatureAlgoritm,
    signature
  };
}
function Finished(value, length) {
  const verify_data = value.sliceMovePos(length);
  return {
    verify_data
  };
}
function Alert(value, length) {
  const levelCode = value.uint8();
  const desCode = value.uint8();
  return {
    level: `${levelCode}-${levels[levelCode]}`,
    description: `${desCode}-${descriptions[desCode]}`
  };
}
var descriptions = {
  0: "close_notify",
  10: "unexpected_message",
  20: "bad_record_mac",
  21: "decryption_failed_RESERVED",
  22: "record_overflow",
  30: "decompression_failure_RESERVED",
  40: "handshake_failure",
  41: "no_certificate_RESERVED",
  42: "bad_certificate",
  43: "unsupported_certificate",
  44: "certificate_revoked",
  45: "certificate_expired",
  46: "certificate_unknown",
  47: "illegal_parameter",
  48: "unknown_ca",
  49: "access_denied",
  50: "decode_error",
  51: "decrypt_error",
  60: "export_restriction_RESERVED",
  70: "protocol_version",
  71: "insufficient_security",
  80: "internal_error",
  86: "inappropriate_fallback",
  90: "user_canceled",
  100: "no_renegotiation_RESERVED",
  109: "missing_extension",
  110: "unsupported_extension",
  111: "certificate_unobtainable_RESERVED",
  112: "unrecognized_name",
  113: "bad_certificate_status_response",
  114: "bad_certificate_hash_value_RESERVED",
  115: "unknown_psk_identity",
  116: "certificate_required",
  120: "no_application_protocol"
  /*255*/
};
var levels = Object.freeze({
  1: "warning",
  2: "fatal"
  /*255*/
});
function Heartbeat(value, length) {
  const typeCode = value.uint8();
  if (!typeCode)
    throw TypeError(`unexpected heartbeat type ${typeCode}`);
  const type = types[typeCode];
  const payloadLength = value.uint16();
  const message = value.slice(payloadLength);
  const paddingLength = length - payloadLength - 3;
  if (paddingLength < 16)
    throw TypeError(`padding length must be at least 16 bytes`);
  return {
    type,
    message
  };
}
var types = Object.freeze({
  1: "request",
  2: "response"
  /*255:max value*/
});
var Record = class {
  // TLSPlainText
  #value;
  constructor(value, pos) {
    this.#value = ensureUint8View(value, pos);
    this.pos = this.#value.pos;
    const typeCode = this.#value.uint8();
    this.type = records[typeCode]?.name;
    if (!this.type)
      throw TypeError(`Unexpected type of record value ${typeCode}`);
    this.version = this.#value.uint16();
    this.version = `${uinToHex(this.version, 4)}-TLS 1.x (legacy record version)`;
    this.length = this.#value.uint16();
    this[this.type] = records[typeCode](this.value, this.length);
  }
  get value() {
    return this.#value;
  }
  get header() {
    return Uint8Array.from(this.value).slice(this.pos, this.pos + 5);
  }
  get message() {
    return Uint8Array.from(this.value).slice(this.pos + 5, this.pos + 5 + this.length);
  }
};
function Invalid(value, length) {
  return `Invalid`;
}
function ChangeCipherSpec(value, length) {
  const code = value.uint8();
  if (code !== 1)
    throw TypeError(`unexpected value in ChangeCipherSpec`);
  return code;
}
function Application(value, length) {
  const data = value.sliceMovePos(length);
  return data;
}
var records = Object.freeze({
  //this.prototype.ContentTypes = {
  0: Invalid,
  20: ChangeCipherSpec,
  21: Alert,
  22: Handshake,
  23: Application,
  24: Heartbeat
  /* 255: 'Default' */
});

// ../../../../TLS13Def/dist/tls13def.js
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x)(function(x) {
  if (typeof __require !== "undefined")
    return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS2 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_browser2 = __commonJS2({
  "../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BrowserRandomSource = void 0;
    var QUOTA = 65536;
    var BrowserRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        const browserCrypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (browserCrypto && browserCrypto.getRandomValues !== void 0) {
          this._crypto = browserCrypto;
          this.isAvailable = true;
          this.isInstantiated = true;
        }
      }
      randomBytes(length) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Browser random byte generator is not available.");
        }
        const out = new Uint8Array(length);
        for (let i = 0; i < out.length; i += QUOTA) {
          this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, QUOTA)));
        }
        return out;
      }
    };
    exports.BrowserRandomSource = BrowserRandomSource;
  }
});
var require_wipe2 = __commonJS2({
  "../../../node_modules/.deno/@stablelib+wipe@1.0.1/node_modules/@stablelib/wipe/lib/wipe.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function wipe(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = 0;
      }
      return array;
    }
    exports.wipe = wipe;
  }
});
var require_crypto2 = __commonJS2({
  "(disabled):crypto"() {
  }
});
var require_node2 = __commonJS2({
  "../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeRandomSource = void 0;
    var wipe_1 = require_wipe2();
    var NodeRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        if (typeof __require2 !== "undefined") {
          const nodeCrypto = require_crypto2();
          if (nodeCrypto && nodeCrypto.randomBytes) {
            this._crypto = nodeCrypto;
            this.isAvailable = true;
            this.isInstantiated = true;
          }
        }
      }
      randomBytes(length) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Node.js random byte generator is not available.");
        }
        let buffer = this._crypto.randomBytes(length);
        if (buffer.length !== length) {
          throw new Error("NodeRandomSource: got fewer bytes than requested");
        }
        const out = new Uint8Array(length);
        for (let i = 0; i < out.length; i++) {
          out[i] = buffer[i];
        }
        (0, wipe_1.wipe)(buffer);
        return out;
      }
    };
    exports.NodeRandomSource = NodeRandomSource;
  }
});
var require_system2 = __commonJS2({
  "../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/source/system.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SystemRandomSource = void 0;
    var browser_1 = require_browser2();
    var node_1 = require_node2();
    var SystemRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.name = "";
        this._source = new browser_1.BrowserRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Browser";
          return;
        }
        this._source = new node_1.NodeRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Node";
          return;
        }
      }
      randomBytes(length) {
        if (!this.isAvailable) {
          throw new Error("System random byte generator is not available.");
        }
        return this._source.randomBytes(length);
      }
    };
    exports.SystemRandomSource = SystemRandomSource;
  }
});
var require_int2 = __commonJS2({
  "../../../node_modules/.deno/@stablelib+int@1.0.1/node_modules/@stablelib/int/lib/int.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function imulShim(a, b) {
      var ah = a >>> 16 & 65535, al = a & 65535;
      var bh = b >>> 16 & 65535, bl = b & 65535;
      return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    }
    exports.mul = Math.imul || imulShim;
    function add(a, b) {
      return a + b | 0;
    }
    exports.add = add;
    function sub(a, b) {
      return a - b | 0;
    }
    exports.sub = sub;
    function rotl(x, n) {
      return x << n | x >>> 32 - n;
    }
    exports.rotl = rotl;
    function rotr(x, n) {
      return x << 32 - n | x >>> n;
    }
    exports.rotr = rotr;
    function isIntegerShim(n) {
      return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
    }
    exports.isInteger = Number.isInteger || isIntegerShim;
    exports.MAX_SAFE_INTEGER = 9007199254740991;
    exports.isSafeInteger = function(n) {
      return exports.isInteger(n) && (n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER);
    };
  }
});
var require_binary2 = __commonJS2({
  "../../../node_modules/.deno/@stablelib+binary@1.0.1/node_modules/@stablelib/binary/lib/binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var int_1 = require_int2();
    function readInt16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
    }
    exports.readInt16BE = readInt16BE;
    function readUint16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
    }
    exports.readUint16BE = readUint16BE;
    function readInt16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
    }
    exports.readInt16LE = readInt16LE;
    function readUint16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint16LE = readUint16LE;
    function writeUint16BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 8;
      out[offset + 1] = value >>> 0;
      return out;
    }
    exports.writeUint16BE = writeUint16BE;
    exports.writeInt16BE = writeUint16BE;
    function writeUint16LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      return out;
    }
    exports.writeUint16LE = writeUint16LE;
    exports.writeInt16LE = writeUint16LE;
    function readInt32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
    }
    exports.readInt32BE = readInt32BE;
    function readUint32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
    }
    exports.readUint32BE = readUint32BE;
    function readInt32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
    }
    exports.readInt32LE = readInt32LE;
    function readUint32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint32LE = readUint32LE;
    function writeUint32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 24;
      out[offset + 1] = value >>> 16;
      out[offset + 2] = value >>> 8;
      out[offset + 3] = value >>> 0;
      return out;
    }
    exports.writeUint32BE = writeUint32BE;
    exports.writeInt32BE = writeUint32BE;
    function writeUint32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      out[offset + 2] = value >>> 16;
      out[offset + 3] = value >>> 24;
      return out;
    }
    exports.writeUint32LE = writeUint32LE;
    exports.writeInt32LE = writeUint32LE;
    function readInt64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi = readInt32BE(array, offset);
      var lo = readInt32BE(array, offset + 4);
      return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64BE = readInt64BE;
    function readUint64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi = readUint32BE(array, offset);
      var lo = readUint32BE(array, offset + 4);
      return hi * 4294967296 + lo;
    }
    exports.readUint64BE = readUint64BE;
    function readInt64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readInt32LE(array, offset);
      var hi = readInt32LE(array, offset + 4);
      return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64LE = readInt64LE;
    function readUint64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readUint32LE(array, offset);
      var hi = readUint32LE(array, offset + 4);
      return hi * 4294967296 + lo;
    }
    exports.readUint64LE = readUint64LE;
    function writeUint64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32BE(value / 4294967296 >>> 0, out, offset);
      writeUint32BE(value >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64BE = writeUint64BE;
    exports.writeInt64BE = writeUint64BE;
    function writeUint64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32LE(value >>> 0, out, offset);
      writeUint32LE(value / 4294967296 >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64LE = writeUint64LE;
    exports.writeInt64LE = writeUint64LE;
    function readUintBE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintBE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintBE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
        result += array[i] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintBE = readUintBE;
    function readUintLE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintLE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintLE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i = offset; i < offset + bitLength / 8; i++) {
        result += array[i] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintLE = readUintLE;
    function writeUintBE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintBE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintBE value must be an integer");
      }
      var div = 1;
      for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
        out[i] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintBE = writeUintBE;
    function writeUintLE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintLE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintLE value must be an integer");
      }
      var div = 1;
      for (var i = offset; i < offset + bitLength / 8; i++) {
        out[i] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintLE = writeUintLE;
    function readFloat32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset);
    }
    exports.readFloat32BE = readFloat32BE;
    function readFloat32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset, true);
    }
    exports.readFloat32LE = readFloat32LE;
    function readFloat64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset);
    }
    exports.readFloat64BE = readFloat64BE;
    function readFloat64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset, true);
    }
    exports.readFloat64LE = readFloat64LE;
    function writeFloat32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value);
      return out;
    }
    exports.writeFloat32BE = writeFloat32BE;
    function writeFloat32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value, true);
      return out;
    }
    exports.writeFloat32LE = writeFloat32LE;
    function writeFloat64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value);
      return out;
    }
    exports.writeFloat64BE = writeFloat64BE;
    function writeFloat64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value, true);
      return out;
    }
    exports.writeFloat64LE = writeFloat64LE;
  }
});
var require_random2 = __commonJS2({
  "../../../node_modules/.deno/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/random.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomStringForEntropy = exports.randomString = exports.randomUint32 = exports.randomBytes = exports.defaultRandomSource = void 0;
    var system_1 = require_system2();
    var binary_1 = require_binary2();
    var wipe_1 = require_wipe2();
    exports.defaultRandomSource = new system_1.SystemRandomSource();
    function randomBytes(length, prng = exports.defaultRandomSource) {
      return prng.randomBytes(length);
    }
    exports.randomBytes = randomBytes;
    function randomUint32(prng = exports.defaultRandomSource) {
      const buf = randomBytes(4, prng);
      const result = (0, binary_1.readUint32LE)(buf);
      (0, wipe_1.wipe)(buf);
      return result;
    }
    exports.randomUint32 = randomUint32;
    var ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    function randomString(length, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      if (charset.length < 2) {
        throw new Error("randomString charset is too short");
      }
      if (charset.length > 256) {
        throw new Error("randomString charset is too long");
      }
      let out = "";
      const charsLen = charset.length;
      const maxByte = 256 - 256 % charsLen;
      while (length > 0) {
        const buf = randomBytes(Math.ceil(length * 256 / maxByte), prng);
        for (let i = 0; i < buf.length && length > 0; i++) {
          const randomByte = buf[i];
          if (randomByte < maxByte) {
            out += charset.charAt(randomByte % charsLen);
            length--;
          }
        }
        (0, wipe_1.wipe)(buf);
      }
      return out;
    }
    exports.randomString = randomString;
    function randomStringForEntropy(bits, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      const length = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
      return randomString(length, charset, prng);
    }
    exports.randomStringForEntropy = randomStringForEntropy;
  }
});
var require_x255192 = __commonJS2({
  "../../../node_modules/.deno/@stablelib+x25519@1.0.3/node_modules/@stablelib/x25519/lib/x25519.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sharedKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.scalarMultBase = exports.scalarMult = exports.SHARED_KEY_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = void 0;
    var random_1 = require_random2();
    var wipe_1 = require_wipe2();
    exports.PUBLIC_KEY_LENGTH = 32;
    exports.SECRET_KEY_LENGTH = 32;
    exports.SHARED_KEY_LENGTH = 32;
    function gf(init) {
      const r = new Float64Array(16);
      if (init) {
        for (let i = 0; i < init.length; i++) {
          r[i] = init[i];
        }
      }
      return r;
    }
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var _121665 = gf([56129, 1]);
    function car25519(o) {
      let c = 1;
      for (let i = 0; i < 16; i++) {
        let v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
      }
      o[0] += c - 1 + 37 * (c - 1);
    }
    function sel25519(p, q, b) {
      const c = ~(b - 1);
      for (let i = 0; i < 16; i++) {
        const t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
      }
    }
    function pack25519(o, n) {
      const m = gf();
      const t = gf();
      for (let i = 0; i < 16; i++) {
        t[i] = n[i];
      }
      car25519(t);
      car25519(t);
      car25519(t);
      for (let j = 0; j < 2; j++) {
        m[0] = t[0] - 65517;
        for (let i = 1; i < 15; i++) {
          m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
          m[i - 1] &= 65535;
        }
        m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
        const b = m[15] >> 16 & 1;
        m[14] &= 65535;
        sel25519(t, m, 1 - b);
      }
      for (let i = 0; i < 16; i++) {
        o[2 * i] = t[i] & 255;
        o[2 * i + 1] = t[i] >> 8;
      }
    }
    function unpack25519(o, n) {
      for (let i = 0; i < 16; i++) {
        o[i] = n[2 * i] + (n[2 * i + 1] << 8);
      }
      o[15] &= 32767;
    }
    function add(o, a, b) {
      for (let i = 0; i < 16; i++) {
        o[i] = a[i] + b[i];
      }
    }
    function sub(o, a, b) {
      for (let i = 0; i < 16; i++) {
        o[i] = a[i] - b[i];
      }
    }
    function mul(o, a, b) {
      let v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
      v = a[0];
      t0 += v * b0;
      t1 += v * b1;
      t2 += v * b2;
      t3 += v * b3;
      t4 += v * b4;
      t5 += v * b5;
      t6 += v * b6;
      t7 += v * b7;
      t8 += v * b8;
      t9 += v * b9;
      t10 += v * b10;
      t11 += v * b11;
      t12 += v * b12;
      t13 += v * b13;
      t14 += v * b14;
      t15 += v * b15;
      v = a[1];
      t1 += v * b0;
      t2 += v * b1;
      t3 += v * b2;
      t4 += v * b3;
      t5 += v * b4;
      t6 += v * b5;
      t7 += v * b6;
      t8 += v * b7;
      t9 += v * b8;
      t10 += v * b9;
      t11 += v * b10;
      t12 += v * b11;
      t13 += v * b12;
      t14 += v * b13;
      t15 += v * b14;
      t16 += v * b15;
      v = a[2];
      t2 += v * b0;
      t3 += v * b1;
      t4 += v * b2;
      t5 += v * b3;
      t6 += v * b4;
      t7 += v * b5;
      t8 += v * b6;
      t9 += v * b7;
      t10 += v * b8;
      t11 += v * b9;
      t12 += v * b10;
      t13 += v * b11;
      t14 += v * b12;
      t15 += v * b13;
      t16 += v * b14;
      t17 += v * b15;
      v = a[3];
      t3 += v * b0;
      t4 += v * b1;
      t5 += v * b2;
      t6 += v * b3;
      t7 += v * b4;
      t8 += v * b5;
      t9 += v * b6;
      t10 += v * b7;
      t11 += v * b8;
      t12 += v * b9;
      t13 += v * b10;
      t14 += v * b11;
      t15 += v * b12;
      t16 += v * b13;
      t17 += v * b14;
      t18 += v * b15;
      v = a[4];
      t4 += v * b0;
      t5 += v * b1;
      t6 += v * b2;
      t7 += v * b3;
      t8 += v * b4;
      t9 += v * b5;
      t10 += v * b6;
      t11 += v * b7;
      t12 += v * b8;
      t13 += v * b9;
      t14 += v * b10;
      t15 += v * b11;
      t16 += v * b12;
      t17 += v * b13;
      t18 += v * b14;
      t19 += v * b15;
      v = a[5];
      t5 += v * b0;
      t6 += v * b1;
      t7 += v * b2;
      t8 += v * b3;
      t9 += v * b4;
      t10 += v * b5;
      t11 += v * b6;
      t12 += v * b7;
      t13 += v * b8;
      t14 += v * b9;
      t15 += v * b10;
      t16 += v * b11;
      t17 += v * b12;
      t18 += v * b13;
      t19 += v * b14;
      t20 += v * b15;
      v = a[6];
      t6 += v * b0;
      t7 += v * b1;
      t8 += v * b2;
      t9 += v * b3;
      t10 += v * b4;
      t11 += v * b5;
      t12 += v * b6;
      t13 += v * b7;
      t14 += v * b8;
      t15 += v * b9;
      t16 += v * b10;
      t17 += v * b11;
      t18 += v * b12;
      t19 += v * b13;
      t20 += v * b14;
      t21 += v * b15;
      v = a[7];
      t7 += v * b0;
      t8 += v * b1;
      t9 += v * b2;
      t10 += v * b3;
      t11 += v * b4;
      t12 += v * b5;
      t13 += v * b6;
      t14 += v * b7;
      t15 += v * b8;
      t16 += v * b9;
      t17 += v * b10;
      t18 += v * b11;
      t19 += v * b12;
      t20 += v * b13;
      t21 += v * b14;
      t22 += v * b15;
      v = a[8];
      t8 += v * b0;
      t9 += v * b1;
      t10 += v * b2;
      t11 += v * b3;
      t12 += v * b4;
      t13 += v * b5;
      t14 += v * b6;
      t15 += v * b7;
      t16 += v * b8;
      t17 += v * b9;
      t18 += v * b10;
      t19 += v * b11;
      t20 += v * b12;
      t21 += v * b13;
      t22 += v * b14;
      t23 += v * b15;
      v = a[9];
      t9 += v * b0;
      t10 += v * b1;
      t11 += v * b2;
      t12 += v * b3;
      t13 += v * b4;
      t14 += v * b5;
      t15 += v * b6;
      t16 += v * b7;
      t17 += v * b8;
      t18 += v * b9;
      t19 += v * b10;
      t20 += v * b11;
      t21 += v * b12;
      t22 += v * b13;
      t23 += v * b14;
      t24 += v * b15;
      v = a[10];
      t10 += v * b0;
      t11 += v * b1;
      t12 += v * b2;
      t13 += v * b3;
      t14 += v * b4;
      t15 += v * b5;
      t16 += v * b6;
      t17 += v * b7;
      t18 += v * b8;
      t19 += v * b9;
      t20 += v * b10;
      t21 += v * b11;
      t22 += v * b12;
      t23 += v * b13;
      t24 += v * b14;
      t25 += v * b15;
      v = a[11];
      t11 += v * b0;
      t12 += v * b1;
      t13 += v * b2;
      t14 += v * b3;
      t15 += v * b4;
      t16 += v * b5;
      t17 += v * b6;
      t18 += v * b7;
      t19 += v * b8;
      t20 += v * b9;
      t21 += v * b10;
      t22 += v * b11;
      t23 += v * b12;
      t24 += v * b13;
      t25 += v * b14;
      t26 += v * b15;
      v = a[12];
      t12 += v * b0;
      t13 += v * b1;
      t14 += v * b2;
      t15 += v * b3;
      t16 += v * b4;
      t17 += v * b5;
      t18 += v * b6;
      t19 += v * b7;
      t20 += v * b8;
      t21 += v * b9;
      t22 += v * b10;
      t23 += v * b11;
      t24 += v * b12;
      t25 += v * b13;
      t26 += v * b14;
      t27 += v * b15;
      v = a[13];
      t13 += v * b0;
      t14 += v * b1;
      t15 += v * b2;
      t16 += v * b3;
      t17 += v * b4;
      t18 += v * b5;
      t19 += v * b6;
      t20 += v * b7;
      t21 += v * b8;
      t22 += v * b9;
      t23 += v * b10;
      t24 += v * b11;
      t25 += v * b12;
      t26 += v * b13;
      t27 += v * b14;
      t28 += v * b15;
      v = a[14];
      t14 += v * b0;
      t15 += v * b1;
      t16 += v * b2;
      t17 += v * b3;
      t18 += v * b4;
      t19 += v * b5;
      t20 += v * b6;
      t21 += v * b7;
      t22 += v * b8;
      t23 += v * b9;
      t24 += v * b10;
      t25 += v * b11;
      t26 += v * b12;
      t27 += v * b13;
      t28 += v * b14;
      t29 += v * b15;
      v = a[15];
      t15 += v * b0;
      t16 += v * b1;
      t17 += v * b2;
      t18 += v * b3;
      t19 += v * b4;
      t20 += v * b5;
      t21 += v * b6;
      t22 += v * b7;
      t23 += v * b8;
      t24 += v * b9;
      t25 += v * b10;
      t26 += v * b11;
      t27 += v * b12;
      t28 += v * b13;
      t29 += v * b14;
      t30 += v * b15;
      t0 += 38 * t16;
      t1 += 38 * t17;
      t2 += 38 * t18;
      t3 += 38 * t19;
      t4 += 38 * t20;
      t5 += 38 * t21;
      t6 += 38 * t22;
      t7 += 38 * t23;
      t8 += 38 * t24;
      t9 += 38 * t25;
      t10 += 38 * t26;
      t11 += 38 * t27;
      t12 += 38 * t28;
      t13 += 38 * t29;
      t14 += 38 * t30;
      c = 1;
      v = t0 + c + 65535;
      c = Math.floor(v / 65536);
      t0 = v - c * 65536;
      v = t1 + c + 65535;
      c = Math.floor(v / 65536);
      t1 = v - c * 65536;
      v = t2 + c + 65535;
      c = Math.floor(v / 65536);
      t2 = v - c * 65536;
      v = t3 + c + 65535;
      c = Math.floor(v / 65536);
      t3 = v - c * 65536;
      v = t4 + c + 65535;
      c = Math.floor(v / 65536);
      t4 = v - c * 65536;
      v = t5 + c + 65535;
      c = Math.floor(v / 65536);
      t5 = v - c * 65536;
      v = t6 + c + 65535;
      c = Math.floor(v / 65536);
      t6 = v - c * 65536;
      v = t7 + c + 65535;
      c = Math.floor(v / 65536);
      t7 = v - c * 65536;
      v = t8 + c + 65535;
      c = Math.floor(v / 65536);
      t8 = v - c * 65536;
      v = t9 + c + 65535;
      c = Math.floor(v / 65536);
      t9 = v - c * 65536;
      v = t10 + c + 65535;
      c = Math.floor(v / 65536);
      t10 = v - c * 65536;
      v = t11 + c + 65535;
      c = Math.floor(v / 65536);
      t11 = v - c * 65536;
      v = t12 + c + 65535;
      c = Math.floor(v / 65536);
      t12 = v - c * 65536;
      v = t13 + c + 65535;
      c = Math.floor(v / 65536);
      t13 = v - c * 65536;
      v = t14 + c + 65535;
      c = Math.floor(v / 65536);
      t14 = v - c * 65536;
      v = t15 + c + 65535;
      c = Math.floor(v / 65536);
      t15 = v - c * 65536;
      t0 += c - 1 + 37 * (c - 1);
      c = 1;
      v = t0 + c + 65535;
      c = Math.floor(v / 65536);
      t0 = v - c * 65536;
      v = t1 + c + 65535;
      c = Math.floor(v / 65536);
      t1 = v - c * 65536;
      v = t2 + c + 65535;
      c = Math.floor(v / 65536);
      t2 = v - c * 65536;
      v = t3 + c + 65535;
      c = Math.floor(v / 65536);
      t3 = v - c * 65536;
      v = t4 + c + 65535;
      c = Math.floor(v / 65536);
      t4 = v - c * 65536;
      v = t5 + c + 65535;
      c = Math.floor(v / 65536);
      t5 = v - c * 65536;
      v = t6 + c + 65535;
      c = Math.floor(v / 65536);
      t6 = v - c * 65536;
      v = t7 + c + 65535;
      c = Math.floor(v / 65536);
      t7 = v - c * 65536;
      v = t8 + c + 65535;
      c = Math.floor(v / 65536);
      t8 = v - c * 65536;
      v = t9 + c + 65535;
      c = Math.floor(v / 65536);
      t9 = v - c * 65536;
      v = t10 + c + 65535;
      c = Math.floor(v / 65536);
      t10 = v - c * 65536;
      v = t11 + c + 65535;
      c = Math.floor(v / 65536);
      t11 = v - c * 65536;
      v = t12 + c + 65535;
      c = Math.floor(v / 65536);
      t12 = v - c * 65536;
      v = t13 + c + 65535;
      c = Math.floor(v / 65536);
      t13 = v - c * 65536;
      v = t14 + c + 65535;
      c = Math.floor(v / 65536);
      t14 = v - c * 65536;
      v = t15 + c + 65535;
      c = Math.floor(v / 65536);
      t15 = v - c * 65536;
      t0 += c - 1 + 37 * (c - 1);
      o[0] = t0;
      o[1] = t1;
      o[2] = t2;
      o[3] = t3;
      o[4] = t4;
      o[5] = t5;
      o[6] = t6;
      o[7] = t7;
      o[8] = t8;
      o[9] = t9;
      o[10] = t10;
      o[11] = t11;
      o[12] = t12;
      o[13] = t13;
      o[14] = t14;
      o[15] = t15;
    }
    function square(o, a) {
      mul(o, a, a);
    }
    function inv25519(o, inp) {
      const c = gf();
      for (let i = 0; i < 16; i++) {
        c[i] = inp[i];
      }
      for (let i = 253; i >= 0; i--) {
        square(c, c);
        if (i !== 2 && i !== 4) {
          mul(c, c, inp);
        }
      }
      for (let i = 0; i < 16; i++) {
        o[i] = c[i];
      }
    }
    function scalarMult(n, p) {
      const z = new Uint8Array(32);
      const x = new Float64Array(80);
      const a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
      for (let i = 0; i < 31; i++) {
        z[i] = n[i];
      }
      z[31] = n[31] & 127 | 64;
      z[0] &= 248;
      unpack25519(x, p);
      for (let i = 0; i < 16; i++) {
        b[i] = x[i];
      }
      a[0] = d[0] = 1;
      for (let i = 254; i >= 0; --i) {
        const r = z[i >>> 3] >>> (i & 7) & 1;
        sel25519(a, b, r);
        sel25519(c, d, r);
        add(e, a, c);
        sub(a, a, c);
        add(c, b, d);
        sub(b, b, d);
        square(d, e);
        square(f, a);
        mul(a, c, a);
        mul(c, b, e);
        add(e, a, c);
        sub(a, a, c);
        square(b, a);
        sub(c, d, f);
        mul(a, c, _121665);
        add(a, a, d);
        mul(c, c, a);
        mul(a, d, f);
        mul(d, b, x);
        square(b, e);
        sel25519(a, b, r);
        sel25519(c, d, r);
      }
      for (let i = 0; i < 16; i++) {
        x[i + 16] = a[i];
        x[i + 32] = c[i];
        x[i + 48] = b[i];
        x[i + 64] = d[i];
      }
      const x32 = x.subarray(32);
      const x16 = x.subarray(16);
      inv25519(x32, x32);
      mul(x16, x16, x32);
      const q = new Uint8Array(32);
      pack25519(q, x16);
      return q;
    }
    exports.scalarMult = scalarMult;
    function scalarMultBase(n) {
      return scalarMult(n, _9);
    }
    exports.scalarMultBase = scalarMultBase;
    function generateKeyPairFromSeed(seed) {
      if (seed.length !== exports.SECRET_KEY_LENGTH) {
        throw new Error(`x25519: seed must be ${exports.SECRET_KEY_LENGTH} bytes`);
      }
      const secretKey = new Uint8Array(seed);
      const publicKey = scalarMultBase(secretKey);
      return {
        publicKey,
        secretKey
      };
    }
    exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
    function generateKeyPair3(prng) {
      const seed = (0, random_1.randomBytes)(32, prng);
      const result = generateKeyPairFromSeed(seed);
      (0, wipe_1.wipe)(seed);
      return result;
    }
    exports.generateKeyPair = generateKeyPair3;
    function sharedKey2(mySecretKey, theirPublicKey, rejectZero = false) {
      if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect secret key length");
      }
      if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect public key length");
      }
      const result = scalarMult(mySecretKey, theirPublicKey);
      if (rejectZero) {
        let zeros = 0;
        for (let i = 0; i < result.length; i++) {
          zeros |= result[i];
        }
        if (zeros === 0) {
          throw new Error("X25519: invalid shared key");
        }
      }
      return result;
    }
    exports.sharedKey = sharedKey2;
  }
});
var enc = new TextEncoder();
var dec3 = new TextDecoder();
function Uint8BE2(_integer, _bytes) {
  const integer = ensureUint2(_integer);
  const bytes = _bytes ?? maxBytes2(integer);
  const upper = 2 ** (8 * bytes) - 1;
  if (integer > upper)
    return TypeError(`integer can't be more than ${upper} `);
  const uint8 = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i++) {
    const index = bytes - 1 - i;
    const shiftAmount = index * 8;
    uint8[i] = integer >> shiftAmount & 255;
  }
  return uint8;
}
function Uint16BE2(_int) {
  return Uint8BE2(_int, 2);
}
function Uint24BE(_int) {
  return Uint8BE2(_int, 3);
}
function maxBytes2(_integer) {
  const integer = ensureInteger2(_integer);
  let b = 1;
  while (true) {
    if (2 ** (b * 8) > integer)
      return b;
    b++;
  }
}
function ensureInteger2(integer) {
  const _integer = +Number(integer).toFixed(0);
  const pass = Number.isInteger(_integer);
  if (!pass)
    throw TypeError(`expected integer`);
  return _integer;
}
function ensureUint2(integer) {
  const pass = ensureInteger2(integer);
  if (pass < 0)
    throw TypeError(`expected positive integer`);
  return pass;
}
function mergeUint8(...arrays) {
  const totalLength = arrays.reduce((acc, arr) => acc + arr?.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr?.length;
  }
  return result;
}
function getUint8BE2(data, pos = 0, length = 1) {
  if (!(data instanceof Uint8Array)) {
    throw new TypeError("Input data must be a byte array");
  }
  if (pos < 0 || pos >= data.length) {
    throw new TypeError("Position is out of bounds");
  }
  if (length < 1) {
    throw new TypeError("Length must be at least 1");
  }
  if (pos + length > data.length) {
    throw TypeError(`length is beyond data.length`);
  }
  let output = 0;
  for (let i = pos; i < pos + length; i++) {
    output = output << 8 | data[i];
  }
  return output;
}
function getUint162(data, pos) {
  return getUint8BE2(data, pos, 2);
}
var Struct = class extends Uint8Array {
  #struct;
  constructor(...array) {
    if (!array || !array.length) {
      super();
    } else if (array.some((e) => e instanceof Uint8Array == false)) {
      throw TypeError(`all arguments must be Uint8Array`);
    } else {
      super(mergeUint8(...array));
    }
    this.#struct = array;
  }
  struct() {
    return this.#struct;
  }
};
var FixedVector = class extends Uint8Array {
  constructor(uint8s, length) {
    if (uint8s instanceof Uint8Array == false)
      throw TypeError(`all arguments must be Uint8Array`);
    if (typeof length !== "number")
      throw TypeError(`argument 2 must be a number`);
    if (uint8s.length !== length)
      throw TypeError(`Expected value with length is ${length}`);
    super(uint8s.buffer);
  }
};
var VariableVector = class extends Uint8Array {
  #uint8s;
  constructor(uint8s, min, max) {
    if (uint8s instanceof Uint8Array == false)
      throw TypeError(`all arguments must be Uint8Array`);
    if (typeof min !== "number")
      throw TypeError(`argument 2 must be a number`);
    if (typeof max !== "number")
      throw TypeError(`argument 3 must be a number`);
    if (uint8s.length < min)
      throw TypeError(`value should have a min length of ${min}`);
    if (uint8s.length > max)
      throw TypeError(`value should have a max length of ${max}`);
    const length = Uint8BE2(uint8s.length, maxBytes2(max));
    super(mergeUint8(length, uint8s));
    this.#uint8s = uint8s;
  }
  uint8s() {
    return this.#uint8s;
  }
};
var Uint8 = class extends Uint8Array {
  constructor(integer) {
    super(Uint8BE2(integer, 1).buffer);
  }
};
var Uint16 = class extends Uint8Array {
  constructor(integer) {
    super(Uint16BE2(integer).buffer);
  }
};
var Uint24 = class extends Uint8Array {
  constructor(integer) {
    super(Uint24BE(integer).buffer);
  }
};
var AlertLevel = class {
  static Warning = new Uint8(1);
  static Fatal = new Uint8(2);
  static Max = new Uint8(255);
};
var AlertDescription = class {
  static close_notify = new Uint8(0);
  static unexpected_message = new Uint8(10);
  static bad_record_mac = new Uint8(20);
  static decryption_failed_RESERVED = new Uint8(21);
  static record_overflow = new Uint8(22);
  static decompression_failure_RESERVED = new Uint8(30);
  static handshake_failure = new Uint8(40);
  static no_certificate_RESERVED = new Uint8(41);
  static bad_certificate = new Uint8(42);
  static unsupported_certificate = new Uint8(43);
  static certificate_revoked = new Uint8(44);
  static certificate_expired = new Uint8(45);
  static certificate_unknown = new Uint8(46);
  static illegal_parameter = new Uint8(47);
  static unknown_ca = new Uint8(48);
  static access_denied = new Uint8(49);
  static decode_error = new Uint8(50);
  static decrypt_error = new Uint8(51);
  static export_restriction_RESERVED = new Uint8(60);
  static protocol_version = new Uint8(70);
  static insufficient_security = new Uint8(71);
  static internal_error = new Uint8(80);
  static inappropriate_fallback = new Uint8(86);
  static user_canceled = new Uint8(90);
  static no_renegotiation_RESERVED = new Uint8(100);
  static missing_extension = new Uint8(109);
  static unsupported_extension = new Uint8(110);
  static certificate_unobtainable_RESERVED = new Uint8(111);
  static unrecognized_name = new Uint8(112);
  static bad_certificate_status_response = new Uint8(113);
  static bad_certificate_hash_value_RESERVED = new Uint8(114);
  static unknown_psk_identity = new Uint8(115);
  static certificate_required = new Uint8(116);
  static no_application_protocol = new Uint8(120);
  static Max = new Uint8(255);
};
var ProtocolVersion = class extends Uint8Array {
  constructor(version = 3) {
    super([3, version]);
  }
};
var Random = class extends FixedVector {
  constructor() {
    const rnd32 = crypto.getRandomValues(new Uint8Array(32));
    super(rnd32, 32);
  }
};
var protocolVersion = new ProtocolVersion();
var CipherSuite = class extends Uint8Array {
  constructor(a = 19, b = 1) {
    if (a !== 19)
      throw TypeError(`Unsupported cipher`);
    if ([1, 2].includes(b) == false)
      throw TypeError(`Unsupported cipher`);
    super([a, b]);
  }
  toString() {
    if (this.at(1) == 1)
      return "TLS_AES_128_GCM_SHA256";
    if (this.at(1) == 2)
      return "TLS_AES_256_GCM_SHA384";
  }
};
var ciphers = [new CipherSuite(19, 1), new CipherSuite(19, 2)];
var CipherSuites = class extends VariableVector {
  constructor() {
    const uint8s = mergeUint8(...ciphers);
    super(uint8s, 2, 65534);
    this.ciphers = ciphers;
  }
};
var SessionId = class extends VariableVector {
  constructor() {
    const uuid = crypto.randomUUID().replaceAll("-", "");
    const sessionId2 = new Uint8Array(Array.from(uuid, (e) => e.charCodeAt(0)));
    super(sessionId2, 0, 32);
  }
};
var Compression = class extends VariableVector {
  constructor() {
    super(new Uint8(0), 1, 255);
  }
};
var compression = new Compression();
var ExtensionType = class {
  // FIXED it should be 2 bytes length instead of 1 bytes.
  static server_name = new Uint16(0);
  /* RFC 6066 */
  static max_fragment_length = new Uint16(1);
  /* RFC 6066 */
  static status_request = new Uint16(5);
  /* RFC 6066 */
  static supported_groups = new Uint16(10);
  /* RFC 8422, 7919 */
  static signature_algorithms = new Uint16(13);
  /* RFC 8446 */
  static use_srtp = new Uint16(14);
  /* RFC 5764 */
  static heartbeat = new Uint16(15);
  /* RFC 6520 */
  static application_layer_protocol_negotiation = new Uint16(16);
  /* RFC 7301 */
  static signed_certificate_timestamp = new Uint16(18);
  /* RFC 6962 */
  static client_certificate_type = new Uint16(19);
  /* RFC 7250 */
  static server_certificate_type = new Uint16(20);
  /* RFC 7250 */
  static padding = new Uint16(21);
  /* RFC 7685 */
  static session_ticket = new Uint16(35);
  /* [RFC5077][RFC8447] */
  static pre_shared_key = new Uint16(41);
  /* RFC 8446 */
  static early_data = new Uint16(42);
  /* RFC 8446 */
  static supported_versions = new Uint16(43);
  /* RFC 8446 */
  static cookie = new Uint16(44);
  /* RFC 8446 */
  static psk_key_exchange_modes = new Uint16(45);
  /* RFC 8446 */
  static RESERVED = new Uint16(46);
  /* Used but never assigned */
  static certificate_authorities = new Uint16(47);
  /* RFC 8446 */
  static oid_filters = new Uint16(48);
  /* RFC 8446 */
  static post_handshake_auth = new Uint16(49);
  /* RFC 8446 */
  static signature_algorithms_cert = new Uint16(50);
  /* RFC 8446 */
  static key_share = new Uint16(51);
  /* RFC 8446 */
  static Max = new Uint16(65535);
};
var Extension = class extends Struct {
  constructor(extensionType, extension_data) {
    const extDataVector = new VariableVector(extension_data, 0, 2 ** 16 - 1);
    super(extensionType, extDataVector);
  }
};
var ClientHello2 = class extends Struct {
  type = HandshakeType.client_hello;
  /**
   * 
   * @param {string} SNI 
   */
  constructor(SNI, keyShareEntries) {
    const random = new Random();
    const sessionId2 = new SessionId();
    const compression2 = new Compression();
    const cipherSuites = new CipherSuites();
    const extensions = [
      new Extension(ExtensionType.server_name, new ServerNameList(new ServerName(SNI))),
      new Extension(ExtensionType.supported_groups, new NamedGroupList()),
      new Extension(ExtensionType.signature_algorithms, new SignatureSchemeList()),
      new Extension(ExtensionType.supported_versions, new SupportedVersions("client")),
      new Extension(ExtensionType.psk_key_exchange_modes, new PskKeyExchangeModes()),
      new Extension(ExtensionType.key_share, new KeyShareClientHello(keyShareEntries))
    ];
    const ExtensionVector = new VariableVector(mergeUint8(...extensions), 8, 2 ** 16 - 1);
    super(
      protocolVersion,
      random,
      sessionId2,
      cipherSuites,
      compression2,
      ExtensionVector
    );
  }
};
var ServerHello2 = class extends Struct {
  type = HandshakeType.server_hello;
  constructor(sessionId2, cipherSuites, keyShareEntry2) {
    const random = new Random();
    const session_id = new VariableVector(sessionId2, 0, 32);
    const compression2 = new Uint8(0);
    const cipherSuite = new Uint16(cipherSuites.find((e) => ciphers.map((f) => getUint162(f) == e)));
    const extensions = [
      new Extension(ExtensionType.supported_versions, new SupportedVersions()),
      new Extension(ExtensionType.key_share, new KeyShareServerHello(keyShareEntry2))
    ];
    const ExtensionVector = new VariableVector(mergeUint8(...extensions), 8, 2 ** 16 - 1);
    super(
      protocolVersion,
      random,
      session_id,
      cipherSuite,
      compression2,
      ExtensionVector
    );
    this.random = random;
    this.session_id = session_id;
    this.compression = compression2;
    this.cipherSuite = cipherSuite;
    this.extensions = extensions;
  }
};
var ServerName = class extends Struct {
  constructor(hostname) {
    const hostnameUint8 = typeof hostname == "string" ? enc.encode(hostname) : hostname;
    const NameType = new Uint8(0);
    const hostnames = new VariableVector(hostnameUint8, 1, 65535);
    super(NameType, hostnames);
  }
};
var ServerNameList = class extends Struct {
  constructor(server_name_list) {
    const ServerNameVector = new VariableVector(server_name_list, 1, 2 ** 16 - 1);
    super(ServerNameVector);
  }
};
var ECPointFormat = {
  uncompressed: new Uint8(0),
  deprecated: new Uint8(1),
  deprecated2: new Uint8(2),
  Max: new Uint8(255)
};
var KeyShareEntry = class extends Struct {
  constructor(group, key_exchange) {
    const namedGroup3 = group;
    const key_exchangeVector = new VariableVector(key_exchange, 1, 2 ** 16 - 1);
    super(namedGroup3, key_exchangeVector);
  }
};
var KeyShareClientHello = class extends Struct {
  constructor(clientShares) {
    const KeyShareEntry2 = new VariableVector(clientShares, 0, 2 ** 16 - 1);
    super(KeyShareEntry2);
  }
};
var KeyShareServerHello = class extends Struct {
  constructor(server_share) {
    const keyShareEntry2 = server_share;
    super(keyShareEntry2);
  }
};
var PskKeyExchangeMode = class {
  static psk_ke = new Uint8(0);
  static psk_dhe_ke = new Uint8(1);
  static Max = new Uint8(255);
};
var PskKeyExchangeModes = class extends Struct {
  /**
   * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.9
   * psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
     client and server MUST supply "key_share" values as described in
     Section 4.2.8.
   */
  constructor(ke_modes = PskKeyExchangeMode.psk_dhe_ke) {
    const pskKeyExchangeMode = new VariableVector(ke_modes, 1, 255);
    super(pskKeyExchangeMode);
  }
};
var SupportedVersions = class extends Struct {
  constructor(client) {
    const tls13 = new ProtocolVersion(4);
    const versions = client ? new VariableVector(tls13, 2, 254) : tls13;
    super(versions);
  }
};
var SignatureScheme2 = class {
  /* RSASSA-PKCS1-v1_5 algorithms */
  /* rsa_pkcs1_sha256(0x0401),
  rsa_pkcs1_sha384(0x0501),
  rsa_pkcs1_sha512(0x0601), */
  /* ECDSA algorithms */
  static ecdsa_secp256r1_sha256 = new Uint8Array([4, 3]);
  static ecdsa_secp384r1_sha384 = new Uint8Array([5, 3]);
  static ecdsa_secp521r1_sha512 = new Uint8Array([6, 3]);
  /* RSASSA-PSS algorithms with public key OID rsaEncryption */
  static rsa_pss_rsae_sha256 = new Uint8Array([8, 4]);
  static rsa_pss_rsae_sha384 = new Uint8Array([8, 5]);
  static rsa_pss_rsae_sha512 = new Uint8Array([8, 6]);
  /* EdDSA algorithms */
  /* ed25519(0x0807),
  ed448(0x0808), */
  /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
  static rsa_pss_pss_sha256 = new Uint8Array([8, 9]);
  static rsa_pss_pss_sha384 = new Uint8Array([8, 10]);
  static rsa_pss_pss_sha512 = new Uint8Array([8, 11]);
  /* Legacy algorithms */
  /* rsa_pkcs1_sha1(0x0201),
  ecdsa_sha1(0x0203), */
  /* Reserved Code Points */
  /* obsolete_RESERVED(0x0000..0x0200),
  dsa_sha1_RESERVED(0x0202),
  obsolete_RESERVED(0x0204..0x0400),
  dsa_sha256_RESERVED(0x0402),
  obsolete_RESERVED(0x0404..0x0500),
  dsa_sha384_RESERVED(0x0502),
  obsolete_RESERVED(0x0504..0x0600),
  dsa_sha512_RESERVED(0x0602),
  obsolete_RESERVED(0x0604..0x06FF),
  private_use(0xFE00..0xFFFF), */
  static Max = new Uint8Array([255, 255]);
};
var SignatureSchemeList = class extends Struct {
  constructor() {
    const supported_signature_algorithms = mergeUint8(
      SignatureScheme2.ecdsa_secp256r1_sha256,
      SignatureScheme2.ecdsa_secp384r1_sha384,
      SignatureScheme2.ecdsa_secp521r1_sha512,
      SignatureScheme2.rsa_pss_rsae_sha256,
      SignatureScheme2.rsa_pss_rsae_sha384,
      SignatureScheme2.rsa_pss_rsae_sha512,
      SignatureScheme2.rsa_pss_pss_sha256,
      SignatureScheme2.rsa_pss_pss_sha384,
      SignatureScheme2.rsa_pss_pss_sha512
    );
    const signatureScheme = new VariableVector(supported_signature_algorithms, 2, 65534);
    super(signatureScheme);
  }
};
var NamedGroup = class {
  /* unallocated_RESERVED(0x0000), */
  /* Elliptic Curve Groups (ECDHE) */
  //obsolete_RESERVED(0x0001..0x0016),
  static secp256r1 = new Uint8Array([0, 23]);
  static secp384r1 = new Uint8Array([0, 24]);
  static secp521r1 = new Uint8Array([0, 25]);
  //obsolete_RESERVED(0x001A..0x001C),
  static x25519 = new Uint8Array([0, 29]);
  static x448 = new Uint8Array([0, 30]);
  /* Finite Field Groups (DHE) */
  static ffdhe2048 = new Uint8Array([1, 0]);
  static ffdhe3072 = new Uint8Array([1, 1]);
  static ffdhe4096 = new Uint8Array([1, 2]);
  static ffdhe6144 = new Uint8Array([1, 3]);
  static ffdhe8192 = new Uint8Array([1, 4]);
  /* Reserved Code Points */
  /* ffdhe_private_use(0x01FC..0x01FF),
  ecdhe_private_use(0xFE00..0xFEFF),
  obsolete_RESERVED(0xFF01..0xFF02), */
  static Max = new Uint8Array([255, 255]);
};
var NamedGroupList = class extends Struct {
  constructor() {
    const named_group_list = [
      NamedGroup.secp256r1,
      NamedGroup.secp384r1,
      NamedGroup.secp521r1,
      NamedGroup.x25519
    ];
    const namedGroup3 = new VariableVector(
      mergeUint8(...named_group_list),
      2,
      65534
    );
    super(namedGroup3);
  }
};
var ContentType = class {
  static Invalid = new Uint8(0);
  static ChangeCipherSpec = new Uint8(20);
  static Alert = new Uint8(21);
  static Handshake = new Uint8(22);
  static Application = new Uint8(23);
  static Heartbeat = new Uint8(24);
  /* RFC 6520 */
  static Max = new Uint8(255);
};
var TLSPlaintext = class extends Struct {
  constructor(fragment) {
    const length = new Uint16(fragment.length);
    super(
      fragment.type,
      protocolVersion,
      //*uint16
      length,
      //*uint16
      fragment
    );
  }
};
var TLSCiphertext = class extends Struct {
  constructor(encryptedRecord) {
    const length = new Uint16(encryptedRecord.length);
    super(
      ContentType.Application,
      /* 23 */
      protocolVersion,
      /* TLS v1.2 */
      length,
      //*uint16
      encryptedRecord
    );
  }
};
var HandshakeType = class {
  static hello_request_RESERVED = new Uint8(0);
  static client_hello = new Uint8(1);
  //*Key Exchange
  static server_hello = new Uint8(2);
  //*Key Exchange
  static hello_verify_request_RESERVED = new Uint8(3);
  static new_session_ticket = new Uint8(4);
  //*Ticket Establishment
  static end_of_early_data = new Uint8(5);
  //*Updating Keys
  static hello_retry_request_RESERVED = new Uint8(6);
  static encrypted_extensions = new Uint8(8);
  //*Server Parameters Messages
  static certificate = new Uint8(11);
  //*Authentication Messages
  static server_key_exchange_RESERVED = new Uint8(12);
  static certificate_request = new Uint8(13);
  //*Server Parameters Messages
  static server_hello_done_RESERVED = new Uint8(14);
  static certificate_verify = new Uint8(15);
  //*Authentication Messages
  static client_key_exchange_RESERVED = new Uint8(16);
  static finished = new Uint8(20);
  //*Authentication Messages
  static certificate_url_RESERVED = new Uint8(21);
  static certificate_status_RESERVED = new Uint8(22);
  static supplemental_data_RESERVED = new Uint8(23);
  static key_update = new Uint8(24);
  //*Updating Keys
  static message_hash = new Uint8(254);
  static Max = new Uint8(255);
};
var Handshake2 = class extends Struct {
  type = ContentType.Handshake;
  constructor(handshakeMsg) {
    const length = new Uint24(handshakeMsg.length);
    super(
      handshakeMsg.type,
      length,
      //*uint24 
      handshakeMsg
    );
  }
};
var CertificateType = class {
  static X509 = new Uint8(0);
  static OpenPGP = new Uint8(1);
  static RawPublicKey = new Uint8(2);
  /* From RFC 7250 ASN.1_subjectPublicKeyInfo */
  static Max = new Uint8(255);
};
var CertificateVerify2 = class extends Struct {
  type = HandshakeType.certificate_verify;
  constructor(algorithm, signature) {
    const SignatureScheme22 = algorithm;
    const signatureVector = new VariableVector(signature, 0, 2 ** 16 - 1);
    super(
      SignatureScheme22,
      signatureVector
    );
  }
};
var Finished2 = class extends Struct {
  type = HandshakeType.finished;
  constructor(verifyData) {
    super(verifyData);
  }
};
var KeyUpdateRequest = class {
  static update_not_requested = new Uint8(0);
  static update_requested = new Uint8(1);
  static Max = new Uint8(255);
};
var x25519 = __toESM2(require_x255192());
var ClientHelloRecord = class {
  constructor(hostname = "localhost") {
    this.keys = x25519.generateKeyPair();
    this.keyShareEntry = new KeyShareEntry(NamedGroup.x25519, this.keys.publicKey);
    this.clientHello = new ClientHello2(hostname, this.keyShareEntry);
    this.handshake = new Handshake2(this.clientHello);
    this.record = new TLSPlaintext(this.handshake);
  }
};
var x255192 = __toESM2(require_x255192());
var ServerHelloRecord = class {
  constructor(sessionId2, cipherSuite) {
    this.keys = x255192.generateKeyPair();
    this.keyShareEntry = new KeyShareEntry(NamedGroup.x25519, this.keys.publicKey);
    this.serverHello = new ServerHello2(sessionId2, cipherSuite, this.keyShareEntry);
    this.handshake = new Handshake2(this.serverHello);
    this.record = new TLSPlaintext(this.handshake);
  }
};

// secret.js
var enc2 = new TextEncoder();
var salt0 = new Uint8Array(0);
var emptyHashs = Object.freeze({
  256: new Uint8Array(await crypto.subtle.digest(`SHA-256`, salt0)),
  384: new Uint8Array(await crypto.subtle.digest(`SHA-384`, salt0)),
  512: new Uint8Array(await crypto.subtle.digest(`SHA-512`, salt0))
});
var Secret = class {
  emptyHash;
  IKM0;
  secret;
  secrets = {};
  shaBit;
  // i.e. SHA-Bit --> SHA-256
  shaLength;
  // will determine key length
  keyLength;
  _earlySecret;
  sharedSecret;
  keys = {
    privateKey: void 0,
    publicKey: void 0
  };
  clientMsg;
  // handshake
  serverMsg;
  // handshake
  extensionsMsg;
  // handshake
  certificateMsg;
  // handshake
  certificateVerifyMsg;
  // handshake
  finishedMsg;
  // handshake
  clientSide;
  aead;
  // Aead class
  constructor(clientHello, serverHello, client = false) {
    this.clientSide = check(clientHello).isInstanceOf(ClientHelloRecord) || client ? true : false;
    if (this.clientSide) {
      if (check(serverHello).isInstanceOf(Record) == false)
        throw TypeError(`expected type Record for serverHello`);
      this.keys.privateKey = clientHello.keys.privateKey ?? clientHello.keys.secretKey;
      this.keys.publicKey = serverHello.Handshake.ServerHello.extensions.key_share.data.key;
      this.clientMsg = check(clientHello).isInstanceOf(ClientHelloRecord) ? clientHello.handshake : clientHello.message;
      this.serverMsg = serverHello.message;
    } else {
      if (check(clientHello).isInstanceOf(Record) == false)
        throw TypeError(`expected type Record for clientHello`);
      this.keys.privateKey = serverHello.keys.privateKey ?? serverHello.keys.secretKey;
      this.keys.publicKey = clientHello.Handshake.ClientHello.extensions.key_share.data.find((e) => e.name.includes("x25519")).key;
      this.clientMsg = clientHello.message;
      this.serverMsg = check(serverHello).isInstanceOf(ServerHelloRecord) ? serverHello.handshake : serverHello.message;
    }
    const { encryptAlgo, hash } = parseCipher(serverHello);
    this.sharedSecret = x255193.sharedKey(this.keys.privateKey, this.keys.publicKey);
    this.shaBit = +hash.match(/(.{3})$/g)[0];
    this.shaLength = this.shaBit / 8;
    this.keyLength = encryptAlgo / 8;
    this.emptyHash = emptyHashs[this.shaBit];
    this.IKM0 = new Uint8Array(this.shaLength);
  }
  async earlySecret() {
    if (this._earlySecret)
      return this._earlySecret;
    this._earlySecret = await this.hkdfExtract(salt0, this.IKM0);
    return this._earlySecret;
  }
  async hkdfExtract(key, info) {
    if (key.length == 0)
      key = new Uint8Array(this.shaLength);
    const baseKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-" + this.shaBit }, false, ["sign"]);
    const derivedKey = await crypto.subtle.sign({ name: "HMAC" }, baseKey, info);
    return new Uint8Array(derivedKey);
  }
  HkdfLabel(Label, Context, Length) {
    if (typeof Label !== "string")
      throw TypeError("Expected string for Label");
    if (Context instanceof Uint8Array !== true)
      throw TypeError(`Expected Uint8Array for Context`);
    const label = `tls13 ${Label}`;
    const encodedLabel = enc2.encode(label);
    return concat(
      Uint16BE(Length),
      // Hash.length 
      new Uint8Array([encodedLabel.length]),
      // label length
      encodedLabel,
      // label in Uint8Array
      new Uint8Array([Context.length]),
      // Context length
      Context
    );
  }
  // LINK - https://en.wikipedia.org/wiki/HKDF#HKDF-Expand
  async hkdfExpand(secret, info, length = this.shaLength) {
    let t = new Uint8Array(0);
    let okm = new Uint8Array(0);
    let i = 0;
    while (okm.length < length) {
      i++;
      const counterBytes = new Uint8Array([i]);
      const input = concat(t, info, counterBytes);
      t = await this.hkdfExtract(secret, input);
      okm = concat(okm, t);
    }
    return okm.slice(0, length);
  }
  async hkdfExpandLabel(secret, Label, Context, Length = this.shaLength) {
    return await this.hkdfExpand(secret, this.HkdfLabel(Label, Context, Length), Length);
  }
  async deriveSecret(secret, Label, Messages, Length = this.shaLength) {
    const transcriptHash = new Uint8Array(await crypto.subtle.digest(`SHA-${this.shaBit}`, Messages));
    return await this.hkdfExpandLabel(secret, Label, transcriptHash, Length);
  }
  async handshakeSecret() {
    let earlySecret = await this.earlySecret();
    this.secrets["derived"] = await this.deriveSecret(earlySecret, "derived", salt0);
    this.secrets["handshake"] = await this.hkdfExtract(this.secrets["derived"], this.sharedSecret);
    this.transcriptMsg = concat(this.clientMsg, this.serverMsg);
    this.secrets["c hs traffic"] = await this.deriveSecret(this.secrets["handshake"], "c hs traffic", this.transcriptMsg);
    this.secrets["s hs traffic"] = await this.deriveSecret(this.secrets["handshake"], "s hs traffic", this.transcriptMsg);
    this.secrets["derived"] = await this.deriveSecret(this.secrets["handshake"], "derived", salt0);
    this.secrets["master"] = await this.hkdfExtract(this.secrets["derived"], this.IKM0);
    const key = await this.hkdfExpandLabel(this.secret, "key", salt0, this.keyLength);
    const iv = await this.hkdfExpandLabel(this.secret, "iv", salt0, 12);
    this.aead = new Aead(key, iv);
    return this.aead;
  }
  async certificateVerify(privateKey, extensions, certificate) {
    this.extensions = extensions;
    this.certificate = certificate;
    this.transcriptMsg = concat(this.transcriptMsg, extensions, certificate);
    const transcriptHash = await crypto.subtle.digest(`SHA-${this.shaBit}`, this.transcriptMsg);
    const context = enc2.encode("TLS 1.3, server CertificateVerify");
    const space64from32 = enc2.encode(String.fromCharCode(32).repeat(64));
    const data2Sign = concat(context, space64from32, new Uint8Array([0]), new Uint8Array(transcriptHash));
    const sign = await crypto.subtle.sign(
      {
        name: privateKey.algorithm.name,
        saltLength: this.shaLength
      },
      privateKey,
      data2Sign
    );
    const certificate_verify = new CertificateVerify2(SignatureScheme2["rsa_pss_rsae_sha" + this.shaBit], new Uint8Array(sign));
    this.certificate_verify = new Handshake2(certificate_verify);
    return this.certificate_verify;
  }
  async finished() {
    const finished_key = await this.hkdfExpandLabel(this.secret, "finished", salt0);
    this.transcriptMsg = concat(this.transcriptMsg, this.certificate_verify);
    const transcriptHash = await crypto.subtle.digest(`SHA-${this.shaBit}`, this.transcriptMsg);
    const verify_data = await this.hkdfExtract(finished_key, new Uint8Array(transcriptHash));
    this.finishedMsg = new Handshake2(
      new Finished2(verify_data)
    );
    return this.finishedMsg;
  }
  async encrypt() {
    const handshakeMsg = concat(this.extensions, this.certificate, this.certificate_verify, this.finishedMsg);
    const header = concat(new Uint8Array([23, 3, 3], Uint16BE(handshakeMsg.length)));
    const encrypted = await this.aead.encrypt(handshakeMsg, header);
    return new TLSCiphertext(encrypted);
  }
};
var Aead = class {
  //*AESGCM
  /**
   * 
   * @param {Uint8Array} key 
   * @param {Uint8Array} ivInit 
   * @param {Uint8Array} recdata - record header
   * @param {uint} seq - sequential record
   */
  constructor(key, ivInit, recdata, seq = 0) {
    this.seq = seq;
    this.key = key;
    this.iv = ivInit;
    this.algo = {
      name: "AES-GCM",
      iv: this.iv,
      additionalData: recdata
      //tagLength: 128 //*by default is 128
    };
  }
  buildIV() {
    for (let i = 0; i < 8; i++) {
      this.iv[this.iv.length - 1 - i] ^= this.seq >> i * 8 & 255;
    }
    this.seq++;
  }
  async importKey() {
    if (this.cryptoKey)
      return;
    this.cryptoKey = await self.crypto.subtle.importKey("raw", this.key, { name: "AES-GCM" }, true, ["encrypt", "decrypt"]);
  }
  async encrypt(uint8, ad) {
    await this.importKey();
    this.algo = {
      name: "AES-GCM",
      iv: this.iv,
      additionalData: ad
      //tagLength: 128 //*by default is 128
    };
    const output = await self.crypto.subtle.encrypt(this.algo, this.cryptoKey, uint8);
    this.buildIV();
    return new Uint8Array(output);
  }
  async decrypt(data) {
    await this.importKey();
    const output = await self.crypto.subtle.decrypt(this.algo, this.cryptoKey, data);
    return new Uint8Array(output);
  }
};
function check(obj) {
  return {
    isInstanceOf(cls) {
      return obj instanceof cls || obj?.constructor.name == cls.name;
    }
  };
}
function parseCipher(serverHello) {
  if (check(serverHello).isInstanceOf(Record)) {
    const [tls, aes, encryptAlgo, gcm, hash] = serverHello.Handshake.ServerHello.cipher_suite.split("_");
    return {
      encryptAlgo,
      hash
    };
  }
  if (check(serverHello).isInstanceOf(ServerHelloRecord)) {
    const handshake = Handshake(serverHello.handshake);
    const [tls, aes, encryptAlgo, gcm, hash] = handshake.ServerHello.cipher_suite.split("_");
    return {
      encryptAlgo,
      hash
    };
  }
}
export {
  Secret,
  emptyHashs
};
