/* esm.sh - buffer-from@1.1.2 */
import { Buffer as __Buffer$ } from "node:buffer";
var s = Object.create;
var i = Object.defineProperty;
var p = Object.getOwnPropertyDescriptor;
var B = Object.getOwnPropertyNames;
var c = Object.getPrototypeOf, w = Object.prototype.hasOwnProperty;
var y = (f, r) => () => (r || f((r = { exports: {} }).exports, r), r.exports);
var d = (f, r, o, e) => {
  if (r && typeof r == "object" || typeof r == "function") {
    for (let n of B(r)) {
      !w.call(f, n) && n !== o &&
        i(f, n, {
          get: () => r[n],
          enumerable: !(e = p(r, n)) || e.enumerable,
        });
    }
  }
  return f;
};
var E = (
  f,
  r,
  o,
) => (o = f != null ? s(c(f)) : {},
  d(
    r || !f || !f.__esModule
      ? i(o, "default", { value: f, enumerable: !0 })
      : o,
    f,
  ));
var a = y((h, m) => {
  var l = Object.prototype.toString,
    u = typeof __Buffer$ < "u" && typeof __Buffer$.alloc == "function" &&
      typeof __Buffer$.allocUnsafe == "function" &&
      typeof __Buffer$.from == "function";
  function A(f) {
    return l.call(f).slice(8, -1) === "ArrayBuffer";
  }
  function g(f, r, o) {
    r >>>= 0;
    var e = f.byteLength - r;
    if (e < 0) {
      throw new RangeError("'offset' is out of bounds");
    }
    if (o === void 0) {
      o = e;
    } else if (o >>>= 0, o > e) {
      throw new RangeError("'length' is out of bounds");
    }
    return u
      ? __Buffer$.from(f.slice(r, r + o))
      : new __Buffer$(new Uint8Array(f.slice(r, r + o)));
  }
  function x(f, r) {
    if (
      (typeof r != "string" || r === "") && (r = "utf8"),
        !__Buffer$.isEncoding(r)
    ) {
      throw new TypeError('"encoding" must be a valid string encoding');
    }
    return u ? __Buffer$.from(f, r) : new __Buffer$(f, r);
  }
  function S(f, r, o) {
    if (typeof f == "number") {
      throw new TypeError('"value" argument must not be a number');
    }
    return A(f)
      ? g(f, r, o)
      : typeof f == "string"
      ? x(f, r)
      : u
      ? __Buffer$.from(f)
      : new __Buffer$(f);
  }
  m.exports = S;
});
var t = E(a()), L = t.default ?? t;
export { L as default };
//# sourceMappingURL=buffer-from.mjs.map
