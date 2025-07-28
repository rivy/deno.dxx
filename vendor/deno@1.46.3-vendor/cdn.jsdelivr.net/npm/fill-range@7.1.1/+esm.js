/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/fill-range@7.1.1/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import t from "/npm/to-regex-range@5.0.1/+esm";
function r(t) {
  return t && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var e = "undefined" != typeof global
    ? global
    : "undefined" != typeof self
    ? self
    : "undefined" != typeof window
    ? window
    : {},
  n = [],
  i = [],
  o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
  u = !1;
function f() {
  u = !0;
  for (
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      r = 0;
    r < 64;
    ++r
  ) n[r] = t[r], i[t.charCodeAt(r)] = r;
  i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
}
function s(t, r, e) {
  for (var i, o, u = [], f = r; f < e; f += 3) {
    i = (t[f] << 16) + (t[f + 1] << 8) + t[f + 2],
      u.push(
        n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o],
      );
  }
  return u.join("");
}
function a(t) {
  var r;
  u || f();
  for (
    var e = t.length, i = e % 3, o = "", a = [], h = 16383, c = 0, l = e - i;
    c < l;
    c += h
  ) a.push(s(t, c, c + h > l ? l : c + h));
  return 1 === i
    ? (r = t[e - 1], o += n[r >> 2], o += n[r << 4 & 63], o += "==")
    : 2 === i &&
      (r = (t[e - 2] << 8) + t[e - 1],
        o += n[r >> 10],
        o += n[r >> 4 & 63],
        o += n[r << 2 & 63],
        o += "="),
    a.push(o),
    a.join("");
}
function h(t, r, e, n, i) {
  var o,
    u,
    f = 8 * i - n - 1,
    s = (1 << f) - 1,
    a = s >> 1,
    h = -7,
    c = e ? i - 1 : 0,
    l = e ? -1 : 1,
    p = t[r + c];
  for (
    c += l, o = p & (1 << -h) - 1, p >>= -h, h += f;
    h > 0;
    o = 256 * o + t[r + c], c += l, h -= 8
  );
  for (
    u = o & (1 << -h) - 1, o >>= -h, h += n;
    h > 0;
    u = 256 * u + t[r + c], c += l, h -= 8
  );
  if (0 === o) o = 1 - a;
  else {
    if (o === s) return u ? NaN : 1 / 0 * (p ? -1 : 1);
    u += Math.pow(2, n), o -= a;
  }
  return (p ? -1 : 1) * u * Math.pow(2, o - n);
}
function c(t, r, e, n, i, o) {
  var u,
    f,
    s,
    a = 8 * o - i - 1,
    h = (1 << a) - 1,
    c = h >> 1,
    l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    p = n ? 0 : o - 1,
    g = n ? 1 : -1,
    y = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;
  for (
    r = Math.abs(r),
      isNaN(r) || r === 1 / 0
        ? (f = isNaN(r) ? 1 : 0, u = h)
        : (u = Math.floor(Math.log(r) / Math.LN2),
          r * (s = Math.pow(2, -u)) < 1 && (u--, s *= 2),
          (r += u + c >= 1 ? l / s : l * Math.pow(2, 1 - c)) * s >= 2 &&
          (u++, s /= 2),
          u + c >= h
            ? (f = 0, u = h)
            : u + c >= 1
            ? (f = (r * s - 1) * Math.pow(2, i), u += c)
            : (f = r * Math.pow(2, c - 1) * Math.pow(2, i), u = 0));
    i >= 8;
    t[e + p] = 255 & f, p += g, f /= 256, i -= 8
  );
  for (
    u = u << i | f, a += i;
    a > 0;
    t[e + p] = 255 & u, p += g, u /= 256, a -= 8
  );
  t[e + p - g] |= 128 * y;
}
var l = {}.toString,
  p = Array.isArray || function (t) {
    return "[object Array]" == l.call(t);
  };
function g() {
  return d.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function y(t, r) {
  if (g() < r) throw new RangeError("Invalid typed array length");
  return d.TYPED_ARRAY_SUPPORT
    ? (t = new Uint8Array(r)).__proto__ = d.prototype
    : (null === t && (t = new d(r)), t.length = r),
    t;
}
function d(t, r, e) {
  if (!(d.TYPED_ARRAY_SUPPORT || this instanceof d)) return new d(t, r, e);
  if ("number" == typeof t) {
    if ("string" == typeof r) {
      throw new Error(
        "If encoding is specified then the first argument must be a string",
      );
    }
    return m(this, t);
  }
  return w(this, t, r, e);
}
function w(t, r, e, n) {
  if ("number" == typeof r) {
    throw new TypeError('"value" argument must not be a number');
  }
  return "undefined" != typeof ArrayBuffer && r instanceof ArrayBuffer
    ? function (t, r, e, n) {
      if (r.byteLength, e < 0 || r.byteLength < e) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (r.byteLength < e + (n || 0)) {
        throw new RangeError("'length' is out of bounds");
      }
      r = void 0 === e && void 0 === n
        ? new Uint8Array(r)
        : void 0 === n
        ? new Uint8Array(r, e)
        : new Uint8Array(r, e, n);
      d.TYPED_ARRAY_SUPPORT ? (t = r).__proto__ = d.prototype : t = b(t, r);
      return t;
    }(t, r, e, n)
    : "string" == typeof r
    ? function (t, r, e) {
      "string" == typeof e && "" !== e || (e = "utf8");
      if (!d.isEncoding(e)) {
        throw new TypeError(
          '"encoding" must be a valid string encoding',
        );
      }
      var n = 0 | R(r, e);
      t = y(t, n);
      var i = t.write(r, e);
      i !== n && (t = t.slice(0, i));
      return t;
    }(t, r, e)
    : function (t, r) {
      if (A(r)) {
        var e = 0 | E(r.length);
        return 0 === (t = y(t, e)).length || r.copy(t, 0, 0, e), t;
      }
      if (r) {
        if (
          "undefined" != typeof ArrayBuffer &&
            r.buffer instanceof ArrayBuffer || "length" in r
        ) {
          return "number" != typeof r.length || (n = r.length) != n
            ? y(t, 0)
            : b(t, r);
        }
        if ("Buffer" === r.type && p(r.data)) return b(t, r.data);
      }
      var n;
      throw new TypeError(
        "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.",
      );
    }(t, r);
}
function v(t) {
  if ("number" != typeof t) {
    throw new TypeError('"size" argument must be a number');
  }
  if (t < 0) throw new RangeError('"size" argument must not be negative');
}
function m(t, r) {
  if (v(r), t = y(t, r < 0 ? 0 : 0 | E(r)), !d.TYPED_ARRAY_SUPPORT) {
    for (var e = 0; e < r; ++e) {
      t[e] = 0;
    }
  }
  return t;
}
function b(t, r) {
  var e = r.length < 0 ? 0 : 0 | E(r.length);
  t = y(t, e);
  for (var n = 0; n < e; n += 1) t[n] = 255 & r[n];
  return t;
}
function E(t) {
  if (t >= g()) {
    throw new RangeError(
      "Attempt to allocate Buffer larger than maximum size: 0x" +
        g().toString(16) + " bytes",
    );
  }
  return 0 | t;
}
function A(t) {
  return !(null == t || !t._isBuffer);
}
function R(t, r) {
  if (A(t)) return t.length;
  if (
    "undefined" != typeof ArrayBuffer &&
    "function" == typeof ArrayBuffer.isView &&
    (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
  ) return t.byteLength;
  "string" != typeof t && (t = "" + t);
  var e = t.length;
  if (0 === e) return 0;
  for (var n = !1;;) {
    switch (r) {
      case "ascii":
      case "latin1":
      case "binary":
        return e;
      case "utf8":
      case "utf-8":
      case void 0:
        return K(t).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return 2 * e;
      case "hex":
        return e >>> 1;
      case "base64":
        return Q(t).length;
      default:
        if (n) return K(t).length;
        r = ("" + r).toLowerCase(), n = !0;
    }
  }
}
function T(t, r, e) {
  var n = !1;
  if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
  if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
  if ((e >>>= 0) <= (r >>>= 0)) return "";
  for (t || (t = "utf8");;) {
    switch (t) {
      case "hex":
        return L(this, r, e);
      case "utf8":
      case "utf-8":
        return Y(this, r, e);
      case "ascii":
        return M(this, r, e);
      case "latin1":
      case "binary":
        return N(this, r, e);
      case "base64":
        return D(this, r, e);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return z(this, r, e);
      default:
        if (n) throw new TypeError("Unknown encoding: " + t);
        t = (t + "").toLowerCase(), n = !0;
    }
  }
}
function _(t, r, e) {
  var n = t[r];
  t[r] = t[e], t[e] = n;
}
function P(t, r, e, n, i) {
  if (0 === t.length) return -1;
  if (
    "string" == typeof e
      ? (n = e, e = 0)
      : e > 2147483647
      ? e = 2147483647
      : e < -2147483648 && (e = -2147483648),
      e = +e,
      isNaN(e) && (e = i ? 0 : t.length - 1),
      e < 0 && (e = t.length + e),
      e >= t.length
  ) {
    if (i) return -1;
    e = t.length - 1;
  } else if (e < 0) {
    if (!i) return -1;
    e = 0;
  }
  if ("string" == typeof r && (r = d.from(r, n)), A(r)) {
    return 0 === r.length ? -1 : S(t, r, e, n, i);
  }
  if ("number" == typeof r) {
    return r &= 255,
      d.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf
        ? i
          ? Uint8Array.prototype.indexOf.call(t, r, e)
          : Uint8Array.prototype.lastIndexOf.call(t, r, e)
        : S(t, [r], e, n, i);
  }
  throw new TypeError("val must be string, number or Buffer");
}
function S(t, r, e, n, i) {
  var o, u = 1, f = t.length, s = r.length;
  if (
    void 0 !== n &&
    ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n ||
      "utf16le" === n || "utf-16le" === n)
  ) {
    if (t.length < 2 || r.length < 2) return -1;
    u = 2, f /= 2, s /= 2, e /= 2;
  }
  function a(t, r) {
    return 1 === u ? t[r] : t.readUInt16BE(r * u);
  }
  if (i) {
    var h = -1;
    for (o = e; o < f; o++) {
      if (a(t, o) === a(r, -1 === h ? 0 : o - h)) {
        if (-1 === h && (h = o), o - h + 1 === s) {
          return h * u;
        }
      } else -1 !== h && (o -= o - h), h = -1;
    }
  } else {for (e + s > f && (e = f - s), o = e; o >= 0; o--) {
      for (var c = !0, l = 0; l < s; l++) {
        if (a(t, o + l) !== a(r, l)) {
          c = !1;
          break;
        }
      }
      if (c) return o;
    }}
  return -1;
}
function O(t, r, e, n) {
  e = Number(e) || 0;
  var i = t.length - e;
  n ? (n = Number(n)) > i && (n = i) : n = i;
  var o = r.length;
  if (o % 2 != 0) throw new TypeError("Invalid hex string");
  n > o / 2 && (n = o / 2);
  for (var u = 0; u < n; ++u) {
    var f = parseInt(r.substr(2 * u, 2), 16);
    if (isNaN(f)) return u;
    t[e + u] = f;
  }
  return u;
}
function U(t, r, e, n) {
  return W(K(r, t.length - e), t, e, n);
}
function B(t, r, e, n) {
  return W(
    function (t) {
      for (var r = [], e = 0; e < t.length; ++e) r.push(255 & t.charCodeAt(e));
      return r;
    }(r),
    t,
    e,
    n,
  );
}
function x(t, r, e, n) {
  return B(t, r, e, n);
}
function j(t, r, e, n) {
  return W(Q(r), t, e, n);
}
function I(t, r, e, n) {
  return W(
    function (t, r) {
      for (
        var e, n, i, o = [], u = 0;
        u < t.length && !((r -= 2) < 0);
        ++u
      ) n = (e = t.charCodeAt(u)) >> 8, i = e % 256, o.push(i), o.push(n);
      return o;
    }(r, t.length - e),
    t,
    e,
    n,
  );
}
function D(t, r, e) {
  return 0 === r && e === t.length ? a(t) : a(t.slice(r, e));
}
function Y(t, r, e) {
  e = Math.min(t.length, e);
  for (var n = [], i = r; i < e;) {
    var o,
      u,
      f,
      s,
      a = t[i],
      h = null,
      c = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
    if (i + c <= e) {
      switch (c) {
        case 1:
          a < 128 && (h = a);
          break;
        case 2:
          128 == (192 & (o = t[i + 1])) && (s = (31 & a) << 6 | 63 & o) > 127 &&
            (h = s);
          break;
        case 3:
          o = t[i + 1],
            u = t[i + 2],
            128 == (192 & o) && 128 == (192 & u) &&
            (s = (15 & a) << 12 | (63 & o) << 6 | 63 & u) > 2047 &&
            (s < 55296 || s > 57343) && (h = s);
          break;
        case 4:
          o = t[i + 1],
            u = t[i + 2],
            f = t[i + 3],
            128 == (192 & o) && 128 == (192 & u) && 128 == (192 & f) &&
            (s = (15 & a) << 18 | (63 & o) << 12 | (63 & u) << 6 | 63 & f) >
              65535 &&
            s < 1114112 && (h = s);
      }
    }
    null === h ? (h = 65533, c = 1) : h > 65535 &&
      (h -= 65536, n.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h),
      n.push(h),
      i += c;
  }
  return function (t) {
    var r = t.length;
    if (r <= C) return String.fromCharCode.apply(String, t);
    var e = "", n = 0;
    for (; n < r;) e += String.fromCharCode.apply(String, t.slice(n, n += C));
    return e;
  }(n);
}
d.TYPED_ARRAY_SUPPORT = void 0 === e.TYPED_ARRAY_SUPPORT ||
  e.TYPED_ARRAY_SUPPORT,
  g(),
  d.poolSize = 8192,
  d._augment = function (t) {
    return t.__proto__ = d.prototype, t;
  },
  d.from = function (t, r, e) {
    return w(null, t, r, e);
  },
  d.TYPED_ARRAY_SUPPORT &&
  (d.prototype.__proto__ = Uint8Array.prototype,
    d.__proto__ = Uint8Array,
    "undefined" != typeof Symbol && Symbol.species && d[Symbol.species]),
  d.alloc = function (t, r, e) {
    return function (t, r, e, n) {
      return v(r),
        r <= 0
          ? y(t, r)
          : void 0 !== e
          ? "string" == typeof n ? y(t, r).fill(e, n) : y(t, r).fill(e)
          : y(t, r);
    }(null, t, r, e);
  },
  d.allocUnsafe = function (t) {
    return m(null, t);
  },
  d.allocUnsafeSlow = function (t) {
    return m(null, t);
  },
  d.isBuffer = function (t) {
    return null != t && (!!t._isBuffer || X(t) || function (t) {
      return "function" == typeof t.readFloatLE &&
        "function" == typeof t.slice && X(t.slice(0, 0));
    }(t));
  },
  d.compare = function (t, r) {
    if (!A(t) || !A(r)) throw new TypeError("Arguments must be Buffers");
    if (t === r) return 0;
    for (
      var e = t.length, n = r.length, i = 0, o = Math.min(e, n);
      i < o;
      ++i
    ) {
      if (t[i] !== r[i]) {
        e = t[i], n = r[i];
        break;
      }
    }
    return e < n ? -1 : n < e ? 1 : 0;
  },
  d.isEncoding = function (t) {
    switch (String(t).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  },
  d.concat = function (t, r) {
    if (!p(t)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (0 === t.length) return d.alloc(0);
    var e;
    if (void 0 === r) {for (r = 0, e = 0; e < t.length; ++e) {
        r += t[e].length;
      }}
    var n = d.allocUnsafe(r), i = 0;
    for (e = 0; e < t.length; ++e) {
      var o = t[e];
      if (!A(o)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      o.copy(n, i), i += o.length;
    }
    return n;
  },
  d.byteLength = R,
  d.prototype._isBuffer = !0,
  d.prototype.swap16 = function () {
    var t = this.length;
    if (t % 2 != 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (var r = 0; r < t; r += 2) _(this, r, r + 1);
    return this;
  },
  d.prototype.swap32 = function () {
    var t = this.length;
    if (t % 4 != 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (var r = 0; r < t; r += 4) _(this, r, r + 3), _(this, r + 1, r + 2);
    return this;
  },
  d.prototype.swap64 = function () {
    var t = this.length;
    if (t % 8 != 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (var r = 0; r < t; r += 8) {
      _(this, r, r + 7),
        _(this, r + 1, r + 6),
        _(this, r + 2, r + 5),
        _(this, r + 3, r + 4);
    }
    return this;
  },
  d.prototype.toString = function () {
    var t = 0 | this.length;
    return 0 === t
      ? ""
      : 0 === arguments.length
      ? Y(this, 0, t)
      : T.apply(this, arguments);
  },
  d.prototype.equals = function (t) {
    if (!A(t)) throw new TypeError("Argument must be a Buffer");
    return this === t || 0 === d.compare(this, t);
  },
  d.prototype.inspect = function () {
    var t = "";
    return this.length > 0 &&
      (t = this.toString("hex", 0, 50).match(/.{2}/g).join(" "),
        this.length > 50 && (t += " ... ")),
      "<Buffer " + t + ">";
  },
  d.prototype.compare = function (t, r, e, n, i) {
    if (!A(t)) throw new TypeError("Argument must be a Buffer");
    if (
      void 0 === r && (r = 0),
        void 0 === e && (e = t ? t.length : 0),
        void 0 === n && (n = 0),
        void 0 === i && (i = this.length),
        r < 0 || e > t.length || n < 0 || i > this.length
    ) throw new RangeError("out of range index");
    if (n >= i && r >= e) return 0;
    if (n >= i) return -1;
    if (r >= e) return 1;
    if (this === t) return 0;
    for (
      var o = (i >>>= 0) - (n >>>= 0),
        u = (e >>>= 0) - (r >>>= 0),
        f = Math.min(o, u),
        s = this.slice(n, i),
        a = t.slice(r, e),
        h = 0;
      h < f;
      ++h
    ) {
      if (s[h] !== a[h]) {
        o = s[h], u = a[h];
        break;
      }
    }
    return o < u ? -1 : u < o ? 1 : 0;
  },
  d.prototype.includes = function (t, r, e) {
    return -1 !== this.indexOf(t, r, e);
  },
  d.prototype.indexOf = function (t, r, e) {
    return P(this, t, r, e, !0);
  },
  d.prototype.lastIndexOf = function (t, r, e) {
    return P(this, t, r, e, !1);
  },
  d.prototype.write = function (t, r, e, n) {
    if (void 0 === r) n = "utf8", e = this.length, r = 0;
    else if (void 0 === e && "string" == typeof r) {
      n = r, e = this.length, r = 0;
    } else {
      if (!isFinite(r)) {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported",
        );
      }
      r |= 0,
        isFinite(e)
          ? (e |= 0, void 0 === n && (n = "utf8"))
          : (n = e, e = void 0);
    }
    var i = this.length - r;
    if (
      (void 0 === e || e > i) && (e = i),
        t.length > 0 && (e < 0 || r < 0) || r > this.length
    ) throw new RangeError("Attempt to write outside buffer bounds");
    n || (n = "utf8");
    for (var o = !1;;) {
      switch (n) {
        case "hex":
          return O(this, t, r, e);
        case "utf8":
        case "utf-8":
          return U(this, t, r, e);
        case "ascii":
          return B(this, t, r, e);
        case "latin1":
        case "binary":
          return x(this, t, r, e);
        case "base64":
          return j(this, t, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return I(this, t, r, e);
        default:
          if (o) throw new TypeError("Unknown encoding: " + n);
          n = ("" + n).toLowerCase(), o = !0;
      }
    }
  },
  d.prototype.toJSON = function () {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0),
    };
  };
var C = 4096;
function M(t, r, e) {
  var n = "";
  e = Math.min(t.length, e);
  for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
  return n;
}
function N(t, r, e) {
  var n = "";
  e = Math.min(t.length, e);
  for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
  return n;
}
function L(t, r, e) {
  var n = t.length;
  (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
  for (var i = "", o = r; o < e; ++o) i += q(t[o]);
  return i;
}
function z(t, r, e) {
  for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2) {
    i += String.fromCharCode(n[o] + 256 * n[o + 1]);
  }
  return i;
}
function k(t, r, e) {
  if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
  if (t + r > e) throw new RangeError("Trying to access beyond buffer length");
}
function $(t, r, e, n, i, o) {
  if (!A(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (r > i || r < o) throw new RangeError('"value" argument is out of bounds');
  if (e + n > t.length) throw new RangeError("Index out of range");
}
function F(t, r, e, n) {
  r < 0 && (r = 65535 + r + 1);
  for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i) {
    t[e + i] = (r & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i);
  }
}
function J(t, r, e, n) {
  r < 0 && (r = 4294967295 + r + 1);
  for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i) {
    t[e + i] = r >>> 8 * (n ? i : 3 - i) & 255;
  }
}
function H(t, r, e, n, i, o) {
  if (e + n > t.length) throw new RangeError("Index out of range");
  if (e < 0) throw new RangeError("Index out of range");
}
function G(t, r, e, n, i) {
  return i || H(t, 0, e, 4), c(t, r, e, n, 23, 4), e + 4;
}
function Z(t, r, e, n, i) {
  return i || H(t, 0, e, 8), c(t, r, e, n, 52, 8), e + 8;
}
d.prototype.slice = function (t, r) {
  var e, n = this.length;
  if (
    (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
      (r = void 0 === r ? n : ~~r) < 0
        ? (r += n) < 0 && (r = 0)
        : r > n && (r = n),
      r < t && (r = t),
      d.TYPED_ARRAY_SUPPORT
  ) (e = this.subarray(t, r)).__proto__ = d.prototype;
  else {
    var i = r - t;
    e = new d(i, void 0);
    for (var o = 0; o < i; ++o) e[o] = this[o + t];
  }
  return e;
},
  d.prototype.readUIntLE = function (t, r, e) {
    t |= 0, r |= 0, e || k(t, r, this.length);
    for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) {
      n += this[t + o] * i;
    }
    return n;
  },
  d.prototype.readUIntBE = function (t, r, e) {
    t |= 0, r |= 0, e || k(t, r, this.length);
    for (var n = this[t + --r], i = 1; r > 0 && (i *= 256);) {
      n += this[t + --r] * i;
    }
    return n;
  },
  d.prototype.readUInt8 = function (t, r) {
    return r || k(t, 1, this.length), this[t];
  },
  d.prototype.readUInt16LE = function (t, r) {
    return r || k(t, 2, this.length), this[t] | this[t + 1] << 8;
  },
  d.prototype.readUInt16BE = function (t, r) {
    return r || k(t, 2, this.length), this[t] << 8 | this[t + 1];
  },
  d.prototype.readUInt32LE = function (t, r) {
    return r || k(t, 4, this.length),
      (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
  },
  d.prototype.readUInt32BE = function (t, r) {
    return r || k(t, 4, this.length),
      16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
  },
  d.prototype.readIntLE = function (t, r, e) {
    t |= 0, r |= 0, e || k(t, r, this.length);
    for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) {
      n += this[t + o] * i;
    }
    return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n;
  },
  d.prototype.readIntBE = function (t, r, e) {
    t |= 0, r |= 0, e || k(t, r, this.length);
    for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) {
      o += this[t + --n] * i;
    }
    return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o;
  },
  d.prototype.readInt8 = function (t, r) {
    return r || k(t, 1, this.length),
      128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
  },
  d.prototype.readInt16LE = function (t, r) {
    r || k(t, 2, this.length);
    var e = this[t] | this[t + 1] << 8;
    return 32768 & e ? 4294901760 | e : e;
  },
  d.prototype.readInt16BE = function (t, r) {
    r || k(t, 2, this.length);
    var e = this[t + 1] | this[t] << 8;
    return 32768 & e ? 4294901760 | e : e;
  },
  d.prototype.readInt32LE = function (t, r) {
    return r || k(t, 4, this.length),
      this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
  },
  d.prototype.readInt32BE = function (t, r) {
    return r || k(t, 4, this.length),
      this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
  },
  d.prototype.readFloatLE = function (t, r) {
    return r || k(t, 4, this.length), h(this, t, !0, 23, 4);
  },
  d.prototype.readFloatBE = function (t, r) {
    return r || k(t, 4, this.length), h(this, t, !1, 23, 4);
  },
  d.prototype.readDoubleLE = function (t, r) {
    return r || k(t, 8, this.length), h(this, t, !0, 52, 8);
  },
  d.prototype.readDoubleBE = function (t, r) {
    return r || k(t, 8, this.length), h(this, t, !1, 52, 8);
  },
  d.prototype.writeUIntLE = function (t, r, e, n) {
    (t = +t, r |= 0, e |= 0, n) || $(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
    var i = 1, o = 0;
    for (this[r] = 255 & t; ++o < e && (i *= 256);) this[r + o] = t / i & 255;
    return r + e;
  },
  d.prototype.writeUIntBE = function (t, r, e, n) {
    (t = +t, r |= 0, e |= 0, n) || $(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
    var i = e - 1, o = 1;
    for (this[r + i] = 255 & t; --i >= 0 && (o *= 256);) {
      this[r + i] = t / o & 255;
    }
    return r + e;
  },
  d.prototype.writeUInt8 = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 1, 255, 0),
      d.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
      this[r] = 255 & t,
      r + 1;
  },
  d.prototype.writeUInt16LE = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 2, 65535, 0),
      d.TYPED_ARRAY_SUPPORT
        ? (this[r] = 255 & t, this[r + 1] = t >>> 8)
        : F(this, t, r, !0),
      r + 2;
  },
  d.prototype.writeUInt16BE = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 2, 65535, 0),
      d.TYPED_ARRAY_SUPPORT
        ? (this[r] = t >>> 8, this[r + 1] = 255 & t)
        : F(this, t, r, !1),
      r + 2;
  },
  d.prototype.writeUInt32LE = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 4, 4294967295, 0),
      d.TYPED_ARRAY_SUPPORT
        ? (this[r + 3] = t >>> 24,
          this[r + 2] = t >>> 16,
          this[r + 1] = t >>> 8,
          this[r] = 255 & t)
        : J(this, t, r, !0),
      r + 4;
  },
  d.prototype.writeUInt32BE = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 4, 4294967295, 0),
      d.TYPED_ARRAY_SUPPORT
        ? (this[r] = t >>> 24,
          this[r + 1] = t >>> 16,
          this[r + 2] = t >>> 8,
          this[r + 3] = 255 & t)
        : J(this, t, r, !1),
      r + 4;
  },
  d.prototype.writeIntLE = function (t, r, e, n) {
    if (t = +t, r |= 0, !n) {
      var i = Math.pow(2, 8 * e - 1);
      $(this, t, r, e, i - 1, -i);
    }
    var o = 0, u = 1, f = 0;
    for (this[r] = 255 & t; ++o < e && (u *= 256);) {
      t < 0 && 0 === f && 0 !== this[r + o - 1] && (f = 1),
        this[r + o] = (t / u | 0) - f & 255;
    }
    return r + e;
  },
  d.prototype.writeIntBE = function (t, r, e, n) {
    if (t = +t, r |= 0, !n) {
      var i = Math.pow(2, 8 * e - 1);
      $(this, t, r, e, i - 1, -i);
    }
    var o = e - 1, u = 1, f = 0;
    for (this[r + o] = 255 & t; --o >= 0 && (u *= 256);) {
      t < 0 && 0 === f && 0 !== this[r + o + 1] && (f = 1),
        this[r + o] = (t / u | 0) - f & 255;
    }
    return r + e;
  },
  d.prototype.writeInt8 = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 1, 127, -128),
      d.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
      t < 0 && (t = 255 + t + 1),
      this[r] = 255 & t,
      r + 1;
  },
  d.prototype.writeInt16LE = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 2, 32767, -32768),
      d.TYPED_ARRAY_SUPPORT
        ? (this[r] = 255 & t, this[r + 1] = t >>> 8)
        : F(this, t, r, !0),
      r + 2;
  },
  d.prototype.writeInt16BE = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 2, 32767, -32768),
      d.TYPED_ARRAY_SUPPORT
        ? (this[r] = t >>> 8, this[r + 1] = 255 & t)
        : F(this, t, r, !1),
      r + 2;
  },
  d.prototype.writeInt32LE = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 4, 2147483647, -2147483648),
      d.TYPED_ARRAY_SUPPORT
        ? (this[r] = 255 & t,
          this[r + 1] = t >>> 8,
          this[r + 2] = t >>> 16,
          this[r + 3] = t >>> 24)
        : J(this, t, r, !0),
      r + 4;
  },
  d.prototype.writeInt32BE = function (t, r, e) {
    return t = +t,
      r |= 0,
      e || $(this, t, r, 4, 2147483647, -2147483648),
      t < 0 && (t = 4294967295 + t + 1),
      d.TYPED_ARRAY_SUPPORT
        ? (this[r] = t >>> 24,
          this[r + 1] = t >>> 16,
          this[r + 2] = t >>> 8,
          this[r + 3] = 255 & t)
        : J(this, t, r, !1),
      r + 4;
  },
  d.prototype.writeFloatLE = function (t, r, e) {
    return G(this, t, r, !0, e);
  },
  d.prototype.writeFloatBE = function (t, r, e) {
    return G(this, t, r, !1, e);
  },
  d.prototype.writeDoubleLE = function (t, r, e) {
    return Z(this, t, r, !0, e);
  },
  d.prototype.writeDoubleBE = function (t, r, e) {
    return Z(this, t, r, !1, e);
  },
  d.prototype.copy = function (t, r, e, n) {
    if (
      e || (e = 0),
        n || 0 === n || (n = this.length),
        r >= t.length && (r = t.length),
        r || (r = 0),
        n > 0 && n < e && (n = e),
        n === e
    ) return 0;
    if (0 === t.length || 0 === this.length) return 0;
    if (r < 0) throw new RangeError("targetStart out of bounds");
    if (e < 0 || e >= this.length) {
      throw new RangeError("sourceStart out of bounds");
    }
    if (n < 0) throw new RangeError("sourceEnd out of bounds");
    n > this.length && (n = this.length),
      t.length - r < n - e && (n = t.length - r + e);
    var i, o = n - e;
    if (this === t && e < r && r < n) {
      for (i = o - 1; i >= 0; --i) t[i + r] = this[i + e];
    } else if (o < 1e3 || !d.TYPED_ARRAY_SUPPORT) {
      for (i = 0; i < o; ++i) t[i + r] = this[i + e];
    } else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), r);
    return o;
  },
  d.prototype.fill = function (t, r, e, n) {
    if ("string" == typeof t) {
      if (
        "string" == typeof r
          ? (n = r, r = 0, e = this.length)
          : "string" == typeof e && (n = e, e = this.length), 1 === t.length
      ) {
        var i = t.charCodeAt(0);
        i < 256 && (t = i);
      }
      if (void 0 !== n && "string" != typeof n) {
        throw new TypeError("encoding must be a string");
      }
      if ("string" == typeof n && !d.isEncoding(n)) {
        throw new TypeError("Unknown encoding: " + n);
      }
    } else "number" == typeof t && (t &= 255);
    if (r < 0 || this.length < r || this.length < e) {
      throw new RangeError("Out of range index");
    }
    if (e <= r) return this;
    var o;
    if (
      r >>>= 0,
        e = void 0 === e ? this.length : e >>> 0,
        t || (t = 0),
        "number" == typeof t
    ) { for (o = r; o < e; ++o) this[o] = t; } else {
      var u = A(t) ? t : K(new d(t, n).toString()), f = u.length;
      for (o = 0; o < e - r; ++o) this[o + r] = u[o % f];
    }
    return this;
  };
var V = /[^+\/0-9A-Za-z-_]/g;
function q(t) {
  return t < 16 ? "0" + t.toString(16) : t.toString(16);
}
function K(t, r) {
  var e;
  r = r || 1 / 0;
  for (var n = t.length, i = null, o = [], u = 0; u < n; ++u) {
    if ((e = t.charCodeAt(u)) > 55295 && e < 57344) {
      if (!i) {
        if (e > 56319) {
          (r -= 3) > -1 && o.push(239, 191, 189);
          continue;
        }
        if (u + 1 === n) {
          (r -= 3) > -1 && o.push(239, 191, 189);
          continue;
        }
        i = e;
        continue;
      }
      if (e < 56320) {
        (r -= 3) > -1 && o.push(239, 191, 189), i = e;
        continue;
      }
      e = 65536 + (i - 55296 << 10 | e - 56320);
    } else i && (r -= 3) > -1 && o.push(239, 191, 189);
    if (i = null, e < 128) {
      if ((r -= 1) < 0) break;
      o.push(e);
    } else if (e < 2048) {
      if ((r -= 2) < 0) break;
      o.push(e >> 6 | 192, 63 & e | 128);
    } else if (e < 65536) {
      if ((r -= 3) < 0) break;
      o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128);
    } else {
      if (!(e < 1114112)) throw new Error("Invalid code point");
      if ((r -= 4) < 0) break;
      o.push(
        e >> 18 | 240,
        e >> 12 & 63 | 128,
        e >> 6 & 63 | 128,
        63 & e | 128,
      );
    }
  }
  return o;
}
function Q(t) {
  return function (t) {
    var r, e, n, s, a, h;
    u || f();
    var c = t.length;
    if (c % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    a = "=" === t[c - 2] ? 2 : "=" === t[c - 1] ? 1 : 0,
      h = new o(3 * c / 4 - a),
      n = a > 0 ? c - 4 : c;
    var l = 0;
    for (r = 0, e = 0; r < n; r += 4, e += 3) {
      s = i[t.charCodeAt(r)] << 18 | i[t.charCodeAt(r + 1)] << 12 |
        i[t.charCodeAt(r + 2)] << 6 | i[t.charCodeAt(r + 3)],
        h[l++] = s >> 16 & 255,
        h[l++] = s >> 8 & 255,
        h[l++] = 255 & s;
    }
    return 2 === a
      ? (s = i[t.charCodeAt(r)] << 2 | i[t.charCodeAt(r + 1)] >> 4,
        h[l++] = 255 & s)
      : 1 === a &&
        (s = i[t.charCodeAt(r)] << 10 | i[t.charCodeAt(r + 1)] << 4 |
          i[t.charCodeAt(r + 2)] >> 2,
          h[l++] = s >> 8 & 255,
          h[l++] = 255 & s),
      h;
  }(function (t) {
    if (
      (t = function (t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      }(t).replace(V, "")).length < 2
    ) return "";
    for (; t.length % 4 != 0;) t += "=";
    return t;
  }(t));
}
function W(t, r, e, n) {
  for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i) {
    r[i + e] = t[i];
  }
  return i;
}
function X(t) {
  return !!t.constructor && "function" == typeof t.constructor.isBuffer &&
    t.constructor.isBuffer(t);
}
function tt() {
  throw new Error("setTimeout has not been defined");
}
function rt() {
  throw new Error("clearTimeout has not been defined");
}
var et = tt, nt = rt;
function it(t) {
  if (et === setTimeout) return setTimeout(t, 0);
  if ((et === tt || !et) && setTimeout) {
    return et = setTimeout, setTimeout(t, 0);
  }
  try {
    return et(t, 0);
  } catch (r) {
    try {
      return et.call(null, t, 0);
    } catch (r) {
      return et.call(this, t, 0);
    }
  }
}
"function" == typeof e.setTimeout && (et = setTimeout),
  "function" == typeof e.clearTimeout && (nt = clearTimeout);
var ot, ut = [], ft = !1, st = -1;
function at() {
  ft && ot &&
    (ft = !1, ot.length ? ut = ot.concat(ut) : st = -1, ut.length && ht());
}
function ht() {
  if (!ft) {
    var t = it(at);
    ft = !0;
    for (var r = ut.length; r;) {
      for (ot = ut, ut = []; ++st < r;) ot && ot[st].run();
      st = -1, r = ut.length;
    }
    ot = null,
      ft = !1,
      function (t) {
        if (nt === clearTimeout) return clearTimeout(t);
        if ((nt === rt || !nt) && clearTimeout) {
          return nt = clearTimeout, clearTimeout(t);
        }
        try {
          return nt(t);
        } catch (r) {
          try {
            return nt.call(null, t);
          } catch (r) {
            return nt.call(this, t);
          }
        }
      }(t);
  }
}
function ct(t, r) {
  this.fun = t, this.array = r;
}
ct.prototype.run = function () {
  this.fun.apply(null, this.array);
};
function lt() {}
var pt = lt, gt = lt, yt = lt, dt = lt, wt = lt, vt = lt, mt = lt;
var bt = e.performance || {},
  Et = bt.now || bt.mozNow || bt.msNow || bt.oNow || bt.webkitNow ||
    function () {
      return (new Date()).getTime();
    };
var At = new Date();
var Rt = {
    nextTick: function (t) {
      var r = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var e = 1; e < arguments.length; e++) r[e - 1] = arguments[e];
      }
      ut.push(new ct(t, r)), 1 !== ut.length || ft || it(ht);
    },
    title: "browser",
    browser: !0,
    env: {},
    argv: [],
    version: "",
    versions: {},
    on: pt,
    addListener: gt,
    once: yt,
    off: dt,
    removeListener: wt,
    removeAllListeners: vt,
    emit: mt,
    binding: function (t) {
      throw new Error("process.binding is not supported");
    },
    cwd: function () {
      return "/";
    },
    chdir: function (t) {
      throw new Error("process.chdir is not supported");
    },
    umask: function () {
      return 0;
    },
    hrtime: function (t) {
      var r = .001 * Et.call(bt),
        e = Math.floor(r),
        n = Math.floor(r % 1 * 1e9);
      return t && (e -= t[0], (n -= t[1]) < 0 && (e--, n += 1e9)), [e, n];
    },
    platform: "browser",
    release: {},
    config: {},
    uptime: function () {
      return (new Date() - At) / 1e3;
    },
  },
  Tt = "function" == typeof Object.create
    ? function (t, r) {
      t.super_ = r,
        t.prototype = Object.create(r.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        });
    }
    : function (t, r) {
      t.super_ = r;
      var e = function () {};
      e.prototype = r.prototype,
        t.prototype = new e(),
        t.prototype.constructor = t;
    },
  _t = Object.getOwnPropertyDescriptors || function (t) {
    for (var r = Object.keys(t), e = {}, n = 0; n < r.length; n++) {
      e[r[n]] = Object.getOwnPropertyDescriptor(t, r[n]);
    }
    return e;
  },
  Pt = /%[sdj%]/g;
function St(t) {
  if (!Ft(t)) {
    for (var r = [], e = 0; e < arguments.length; e++) r.push(jt(arguments[e]));
    return r.join(" ");
  }
  e = 1;
  for (
    var n = arguments,
      i = n.length,
      o = String(t).replace(Pt, function (t) {
        if ("%%" === t) return "%";
        if (e >= i) return t;
        switch (t) {
          case "%s":
            return String(n[e++]);
          case "%d":
            return Number(n[e++]);
          case "%j":
            try {
              return JSON.stringify(n[e++]);
            } catch (t) {
              return "[Circular]";
            }
          default:
            return t;
        }
      }),
      u = n[e];
    e < i;
    u = n[++e]
  ) zt(u) || !Zt(u) ? o += " " + u : o += " " + jt(u);
  return o;
}
function Ot(t, r) {
  if (Ht(e.process)) {
    return function () {
      return Ot(t, r).apply(this, arguments);
    };
  }
  if (!0 === Rt.noDeprecation) return t;
  var n = !1;
  return function () {
    if (!n) {
      if (Rt.throwDeprecation) throw new Error(r);
      Rt.traceDeprecation ? console.trace(r) : console.error(r), n = !0;
    }
    return t.apply(this, arguments);
  };
}
var Ut, Bt = {};
function xt(t) {
  if (
    Ht(Ut) && (Ut = Rt.env.NODE_DEBUG || ""), t = t.toUpperCase(), !Bt[t]
  ) {
    if (new RegExp("\\b" + t + "\\b", "i").test(Ut)) {
      Bt[t] = function () {
        var r = St.apply(null, arguments);
        console.error("%s %d: %s", t, 0, r);
      };
    } else Bt[t] = function () {};
  }
  return Bt[t];
}
function jt(t, r) {
  var e = { seen: [], stylize: Dt };
  return arguments.length >= 3 && (e.depth = arguments[2]),
    arguments.length >= 4 && (e.colors = arguments[3]),
    Lt(r) ? e.showHidden = r : r && nr(e, r),
    Ht(e.showHidden) && (e.showHidden = !1),
    Ht(e.depth) && (e.depth = 2),
    Ht(e.colors) && (e.colors = !1),
    Ht(e.customInspect) && (e.customInspect = !0),
    e.colors && (e.stylize = It),
    Yt(e, t, e.depth);
}
function It(t, r) {
  var e = jt.styles[r];
  return e
    ? "[" + jt.colors[e][0] + "m" + t + "[" + jt.colors[e][1] + "m"
    : t;
}
function Dt(t, r) {
  return t;
}
function Yt(t, r, e) {
  if (
    t.customInspect && r && Kt(r.inspect) && r.inspect !== jt &&
    (!r.constructor || r.constructor.prototype !== r)
  ) {
    var n = r.inspect(e, t);
    return Ft(n) || (n = Yt(t, n, e)), n;
  }
  var i = function (t, r) {
    if (Ht(r)) return t.stylize("undefined", "undefined");
    if (Ft(r)) {
      var e = "'" +
        JSON.stringify(r).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(
          /\\"/g,
          '"',
        ) + "'";
      return t.stylize(e, "string");
    }
    if ($t(r)) return t.stylize("" + r, "number");
    if (Lt(r)) return t.stylize("" + r, "boolean");
    if (zt(r)) return t.stylize("null", "null");
  }(t, r);
  if (i) return i;
  var o = Object.keys(r),
    u = function (t) {
      var r = {};
      return t.forEach(function (t, e) {
        r[t] = !0;
      }),
        r;
    }(o);
  if (
    t.showHidden && (o = Object.getOwnPropertyNames(r)),
      qt(r) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0)
  ) return Ct(r);
  if (0 === o.length) {
    if (Kt(r)) {
      var f = r.name ? ": " + r.name : "";
      return t.stylize("[Function" + f + "]", "special");
    }
    if (Gt(r)) return t.stylize(RegExp.prototype.toString.call(r), "regexp");
    if (Vt(r)) return t.stylize(Date.prototype.toString.call(r), "date");
    if (qt(r)) return Ct(r);
  }
  var s, a = "", h = !1, c = ["{", "}"];
  (Nt(r) && (h = !0, c = ["[", "]"]), Kt(r)) &&
    (a = " [Function" + (r.name ? ": " + r.name : "") + "]");
  return Gt(r) && (a = " " + RegExp.prototype.toString.call(r)),
    Vt(r) && (a = " " + Date.prototype.toUTCString.call(r)),
    qt(r) && (a = " " + Ct(r)),
    0 !== o.length || h && 0 != r.length
      ? e < 0
        ? Gt(r)
          ? t.stylize(RegExp.prototype.toString.call(r), "regexp")
          : t.stylize("[Object]", "special")
        : (t.seen.push(r),
          s = h
            ? function (t, r, e, n, i) {
              for (var o = [], u = 0, f = r.length; u < f; ++u) {
                ir(r, String(u))
                  ? o.push(Mt(t, r, e, n, String(u), !0))
                  : o.push("");
              }
              return i.forEach(function (i) {
                i.match(/^\d+$/) || o.push(Mt(t, r, e, n, i, !0));
              }),
                o;
            }(t, r, e, u, o)
            : o.map(function (n) {
              return Mt(t, r, e, u, n, h);
            }),
          t.seen.pop(),
          function (t, r, e) {
            var n = t.reduce(function (t, r) {
              return r.indexOf("\n"),
                t + r.replace(/\u001b\[\d\d?m/g, "").length + 1;
            }, 0);
            if (n > 60) {
              return e[0] + ("" === r ? "" : r + "\n ") + " " +
                t.join(",\n  ") + " " + e[1];
            }
            return e[0] + r + " " + t.join(", ") + " " + e[1];
          }(s, a, c))
      : c[0] + a + c[1];
}
function Ct(t) {
  return "[" + Error.prototype.toString.call(t) + "]";
}
function Mt(t, r, e, n, i, o) {
  var u, f, s;
  if (
    (s = Object.getOwnPropertyDescriptor(r, i) || { value: r[i] }).get
      ? f = s.set
        ? t.stylize("[Getter/Setter]", "special")
        : t.stylize("[Getter]", "special")
      : s.set && (f = t.stylize("[Setter]", "special")),
      ir(n, i) || (u = "[" + i + "]"),
      f ||
      (t.seen.indexOf(s.value) < 0
        ? (f = zt(e) ? Yt(t, s.value, null) : Yt(t, s.value, e - 1)).indexOf(
              "\n",
            ) > -1 && (f = o
              ? f.split("\n").map(function (t) {
                return "  " + t;
              }).join("\n").substr(2)
              : "\n" + f.split("\n").map(function (t) {
                return "   " + t;
              }).join("\n"))
        : f = t.stylize("[Circular]", "special")),
      Ht(u)
  ) {
    if (o && i.match(/^\d+$/)) return f;
    (u = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
      ? (u = u.substr(1, u.length - 2), u = t.stylize(u, "name"))
      : (u = u.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(
        /(^"|"$)/g,
        "'",
      ),
        u = t.stylize(u, "string"));
  }
  return u + ": " + f;
}
function Nt(t) {
  return Array.isArray(t);
}
function Lt(t) {
  return "boolean" == typeof t;
}
function zt(t) {
  return null === t;
}
function kt(t) {
  return null == t;
}
function $t(t) {
  return "number" == typeof t;
}
function Ft(t) {
  return "string" == typeof t;
}
function Jt(t) {
  return "symbol" == typeof t;
}
function Ht(t) {
  return void 0 === t;
}
function Gt(t) {
  return Zt(t) && "[object RegExp]" === Xt(t);
}
function Zt(t) {
  return "object" == typeof t && null !== t;
}
function Vt(t) {
  return Zt(t) && "[object Date]" === Xt(t);
}
function qt(t) {
  return Zt(t) && ("[object Error]" === Xt(t) || t instanceof Error);
}
function Kt(t) {
  return "function" == typeof t;
}
function Qt(t) {
  return null === t || "boolean" == typeof t || "number" == typeof t ||
    "string" == typeof t || "symbol" == typeof t || void 0 === t;
}
function Wt(t) {
  return d.isBuffer(t);
}
function Xt(t) {
  return Object.prototype.toString.call(t);
}
function tr(t) {
  return t < 10 ? "0" + t.toString(10) : t.toString(10);
}
jt.colors = {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  white: [37, 39],
  grey: [90, 39],
  black: [30, 39],
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39],
},
  jt.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red",
  };
var rr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function er() {
  var t, r;
  console.log(
    "%s - %s",
    (t = new Date(),
      r = [tr(t.getHours()), tr(t.getMinutes()), tr(t.getSeconds())].join(":"),
      [t.getDate(), rr[t.getMonth()], r].join(" ")),
    St.apply(null, arguments),
  );
}
function nr(t, r) {
  if (!r || !Zt(r)) return t;
  for (var e = Object.keys(r), n = e.length; n--;) t[e[n]] = r[e[n]];
  return t;
}
function ir(t, r) {
  return Object.prototype.hasOwnProperty.call(t, r);
}
var or = "undefined" != typeof Symbol
  ? Symbol("util.promisify.custom")
  : void 0;
function ur(t) {
  if ("function" != typeof t) {
    throw new TypeError('The "original" argument must be of type Function');
  }
  if (or && t[or]) {
    var r;
    if ("function" != typeof (r = t[or])) {
      throw new TypeError(
        'The "util.promisify.custom" argument must be of type Function',
      );
    }
    return Object.defineProperty(r, or, {
      value: r,
      enumerable: !1,
      writable: !1,
      configurable: !0,
    }),
      r;
  }
  function r() {
    for (
      var r,
        e,
        n = new Promise(function (t, n) {
          r = t, e = n;
        }),
        i = [],
        o = 0;
      o < arguments.length;
      o++
    ) i.push(arguments[o]);
    i.push(function (t, n) {
      t ? e(t) : r(n);
    });
    try {
      t.apply(this, i);
    } catch (t) {
      e(t);
    }
    return n;
  }
  return Object.setPrototypeOf(r, Object.getPrototypeOf(t)),
    or &&
    Object.defineProperty(r, or, {
      value: r,
      enumerable: !1,
      writable: !1,
      configurable: !0,
    }),
    Object.defineProperties(r, _t(t));
}
function fr(t, r) {
  if (!t) {
    var e = new Error("Promise was rejected with a falsy value");
    e.reason = t, t = e;
  }
  return r(t);
}
function sr(t) {
  if ("function" != typeof t) {
    throw new TypeError('The "original" argument must be of type Function');
  }
  function r() {
    for (var r = [], e = 0; e < arguments.length; e++) r.push(arguments[e]);
    var n = r.pop();
    if ("function" != typeof n) {
      throw new TypeError("The last argument must be of type Function");
    }
    var i = this,
      o = function () {
        return n.apply(i, arguments);
      };
    t.apply(this, r).then(function (t) {
      Rt.nextTick(o.bind(null, null, t));
    }, function (t) {
      Rt.nextTick(fr.bind(null, t, o));
    });
  }
  return Object.setPrototypeOf(r, Object.getPrototypeOf(t)),
    Object.defineProperties(r, _t(t)),
    r;
}
ur.custom = or;
var ar = {
  inherits: Tt,
  _extend: nr,
  log: er,
  isBuffer: Wt,
  isPrimitive: Qt,
  isFunction: Kt,
  isError: qt,
  isDate: Vt,
  isObject: Zt,
  isRegExp: Gt,
  isUndefined: Ht,
  isSymbol: Jt,
  isString: Ft,
  isNumber: $t,
  isNullOrUndefined: kt,
  isNull: zt,
  isBoolean: Lt,
  isArray: Nt,
  inspect: jt,
  deprecate: Ot,
  format: St,
  debuglog: xt,
  promisify: ur,
  callbackify: sr,
};
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
const hr = r(Object.freeze({
    __proto__: null,
    format: St,
    deprecate: Ot,
    debuglog: xt,
    inspect: jt,
    isArray: Nt,
    isBoolean: Lt,
    isNull: zt,
    isNullOrUndefined: kt,
    isNumber: $t,
    isString: Ft,
    isSymbol: Jt,
    isUndefined: Ht,
    isRegExp: Gt,
    isObject: Zt,
    isDate: Vt,
    isError: qt,
    isFunction: Kt,
    isPrimitive: Qt,
    isBuffer: Wt,
    log: er,
    inherits: Tt,
    _extend: nr,
    promisify: ur,
    callbackify: sr,
    default: ar,
  })),
  cr = t,
  lr = (t) => null !== t && "object" == typeof t && !Array.isArray(t),
  pr = (t) => "number" == typeof t || "string" == typeof t && "" !== t,
  gr = (t) => Number.isInteger(+t),
  yr = (t) => {
    let r = `${t}`, e = -1;
    if ("-" === r[0] && (r = r.slice(1)), "0" === r) return !1;
    for (; "0" === r[++e];);
    return e > 0;
  },
  dr = (t, r, e) => {
    if (r > 0) {
      let e = "-" === t[0] ? "-" : "";
      e && (t = t.slice(1)), t = e + t.padStart(e ? r - 1 : r, "0");
    }
    return !1 === e ? String(t) : t;
  },
  wr = (t, r) => {
    let e = "-" === t[0] ? "-" : "";
    for (e && (t = t.slice(1), r--); t.length < r;) t = "0" + t;
    return e ? "-" + t : t;
  },
  vr = (t, r, e, n) => {
    if (e) return cr(t, r, { wrap: !1, ...n });
    let i = String.fromCharCode(t);
    return t === r ? i : `[${i}-${String.fromCharCode(r)}]`;
  },
  mr = (t, r, e) => {
    if (Array.isArray(t)) {
      let r = !0 === e.wrap, n = e.capture ? "" : "?:";
      return r ? `(${n}${t.join("|")})` : t.join("|");
    }
    return cr(t, r, e);
  },
  br = (...t) => new RangeError("Invalid range arguments: " + hr.inspect(...t)),
  Er = (t, r, e) => {
    if (!0 === e.strictRanges) throw br([t, r]);
    return [];
  },
  Ar = (t, r, e = 1, n = {}) => {
    let i = Number(t), o = Number(r);
    if (!Number.isInteger(i) || !Number.isInteger(o)) {
      if (!0 === n.strictRanges) throw br([t, r]);
      return [];
    }
    0 === i && (i = 0), 0 === o && (o = 0);
    let u = i > o, f = String(t), s = String(r), a = String(e);
    e = Math.max(Math.abs(e), 1);
    let h = yr(f) || yr(s) || yr(a),
      c = h ? Math.max(f.length, s.length, a.length) : 0,
      l = !1 === h &&
        !1 ===
          ((t, r, e) =>
            "string" == typeof t || "string" == typeof r || !0 === e.stringify)(
              t,
              r,
              n,
            ),
      p = n.transform || ((t) => (r) => !0 === t ? Number(r) : String(r))(l);
    if (n.toRegex && 1 === e) return vr(wr(t, c), wr(r, c), !0, n);
    let g = { negatives: [], positives: [] }, y = [], d = 0;
    for (; u ? i >= o : i <= o;) {
      !0 === n.toRegex && e > 1
        ? g[(w = i) < 0 ? "negatives" : "positives"].push(Math.abs(w))
        : y.push(dr(p(i, d), c, l)),
        i = u ? i - e : i + e,
        d++;
    }
    var w;
    return !0 === n.toRegex
      ? e > 1
        ? ((t, r, e) => {
          t.negatives.sort((t, r) => t < r ? -1 : t > r ? 1 : 0),
            t.positives.sort((t, r) => t < r ? -1 : t > r ? 1 : 0);
          let n, i = r.capture ? "" : "?:", o = "", u = "";
          return t.positives.length &&
            (o = t.positives.map((t) => wr(String(t), e)).join("|")),
            t.negatives.length &&
            (u = `-(${i}${
              t.negatives.map((t) => wr(String(t), e)).join("|")
            })`),
            n = o && u ? `${o}|${u}` : o || u,
            r.wrap ? `(${i}${n})` : n;
        })(g, n, c)
        : mr(y, null, { wrap: !1, ...n })
      : y;
  },
  Rr = (t, r, e, n = {}) => {
    if (null == r && pr(t)) return [t];
    if (!pr(t) || !pr(r)) return Er(t, r, n);
    if ("function" == typeof e) return Rr(t, r, 1, { transform: e });
    if (lr(e)) return Rr(t, r, 0, e);
    let i = { ...n };
    return !0 === i.capture && (i.wrap = !0),
      e = e || i.step || 1,
      gr(e)
        ? gr(t) && gr(r) ? Ar(t, r, e, i) : ((t, r, e = 1, n = {}) => {
          if (!gr(t) && t.length > 1 || !gr(r) && r.length > 1) {
            return Er(
              t,
              r,
              n,
            );
          }
          let i = n.transform || ((t) => String.fromCharCode(t)),
            o = `${t}`.charCodeAt(0),
            u = `${r}`.charCodeAt(0),
            f = o > u,
            s = Math.min(o, u),
            a = Math.max(o, u);
          if (n.toRegex && 1 === e) return vr(s, a, !1, n);
          let h = [], c = 0;
          for (; f ? o >= u : o <= u;) {
            h.push(i(o, c)), o = f ? o - e : o + e, c++;
          }
          return !0 === n.toRegex ? mr(h, null, { wrap: !1, options: n }) : h;
        })(t, r, Math.max(Math.abs(e), 1), i)
        : null == e || lr(e)
        ? Rr(t, r, 1, e)
        : ((t, r) => {
          if (!0 === r.strictRanges) {
            throw new TypeError(`Expected step "${t}" to be a number`);
          }
          return [];
        })(e, i);
  };
var Tr = Rr;
export { Tr as default };
//# sourceMappingURL=/sm/93cb80697a9a52407f27bcaf4b75345d2afe900da8db4a0213a3f00a25e82c6b.map
