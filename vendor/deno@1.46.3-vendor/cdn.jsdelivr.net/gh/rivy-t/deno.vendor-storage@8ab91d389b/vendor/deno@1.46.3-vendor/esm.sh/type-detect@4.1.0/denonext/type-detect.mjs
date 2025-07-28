/* esm.sh - type-detect@4.1.0 */
var L = Object.create;
var m = Object.defineProperty;
var h = Object.getOwnPropertyDescriptor;
var k = Object.getOwnPropertyNames;
var H = Object.getPrototypeOf, A = Object.prototype.hasOwnProperty;
var W = (r, t) => () => (t || r((t = { exports: {} }).exports, t), t.exports);
var V = (r, t, n, a) => {
  if (t && typeof t == "object" || typeof t == "function") {
    for (let i of k(t)) {
      !A.call(r, i) && i !== n &&
        m(r, i, {
          get: () => t[i],
          enumerable: !(a = h(t, i)) || a.enumerable,
        });
    }
  }
  return r;
};
var C = (
  r,
  t,
  n,
) => (n = r != null ? L(H(r)) : {},
  V(
    t || !r || !r.__esModule
      ? m(n, "default", { value: r, enumerable: !0 })
      : n,
    r,
  ));
var w = W((y, u) => {
  (function (r, t) {
    typeof y == "object" && typeof u < "u"
      ? u.exports = t()
      : typeof define == "function" && define.amd
      ? define(t)
      : (r = typeof globalThis < "u" ? globalThis : r || self,
        r.typeDetect = t());
  })(y, function () {
    "use strict";
    var r = typeof Promise == "function",
      t = function (e) {
        if (typeof globalThis == "object") {
          return globalThis;
        }
        Object.defineProperty(e, "typeDetectGlobalObject", {
          get: function () {
            return this;
          },
          configurable: !0,
        });
        var p = typeDetectGlobalObject;
        return delete e.typeDetectGlobalObject, p;
      }(Object.prototype),
      n = typeof Symbol < "u",
      a = typeof Map < "u",
      i = typeof Set < "u",
      b = typeof WeakMap < "u",
      S = typeof WeakSet < "u",
      v = typeof DataView < "u",
      l = n && typeof Symbol.iterator < "u",
      c = n && typeof Symbol.toStringTag < "u",
      E = i && typeof Set.prototype.entries == "function",
      T = a && typeof Map.prototype.entries == "function",
      O = E && Object.getPrototypeOf(new Set().entries()),
      M = T && Object.getPrototypeOf(new Map().entries()),
      g = l && typeof Array.prototype[Symbol.iterator] == "function",
      x = g && Object.getPrototypeOf([][Symbol.iterator]()),
      d = l && typeof String.prototype[Symbol.iterator] == "function",
      P = d && Object.getPrototypeOf(""[Symbol.iterator]()),
      D = 8,
      j = -1;
    function I(e) {
      var p = typeof e;
      if (p !== "object") {
        return p;
      }
      if (e === null) {
        return "null";
      }
      if (e === t) {
        return "global";
      }
      if (Array.isArray(e) && (c === !1 || !(Symbol.toStringTag in e))) {
        return "Array";
      }
      if (typeof globalThis == "object" && globalThis !== null) {
        if (
          typeof globalThis.location == "object" && e === globalThis.location
        ) {
          return "Location";
        }
        if (
          typeof globalThis.document == "object" && e === globalThis.document
        ) {
          return "Document";
        }
        if (typeof globalThis.navigator == "object") {
          if (
            typeof globalThis.navigator.mimeTypes == "object" &&
            e === globalThis.navigator.mimeTypes
          ) {
            return "MimeTypeArray";
          }
          if (
            typeof globalThis.navigator.plugins == "object" &&
            e === globalThis.navigator.plugins
          ) {
            return "PluginArray";
          }
        }
        if (
          (typeof globalThis.HTMLElement == "function" ||
            typeof globalThis.HTMLElement == "object") &&
          e instanceof globalThis.HTMLElement
        ) {
          if (e.tagName === "BLOCKQUOTE") {
            return "HTMLQuoteElement";
          }
          if (e.tagName === "TD") {
            return "HTMLTableDataCellElement";
          }
          if (e.tagName === "TH") {
            return "HTMLTableHeaderCellElement";
          }
        }
      }
      var f = c && e[Symbol.toStringTag];
      if (typeof f == "string") {
        return f;
      }
      var o = Object.getPrototypeOf(e);
      return o === RegExp.prototype
        ? "RegExp"
        : o === Date.prototype
        ? "Date"
        : r && o === Promise.prototype
        ? "Promise"
        : i && o === Set.prototype
        ? "Set"
        : a && o === Map.prototype
        ? "Map"
        : S && o === WeakSet.prototype
        ? "WeakSet"
        : b && o === WeakMap.prototype
        ? "WeakMap"
        : v && o === DataView.prototype
        ? "DataView"
        : a && o === M
        ? "Map Iterator"
        : i && o === O
        ? "Set Iterator"
        : g && o === x
        ? "Array Iterator"
        : d && o === P
        ? "String Iterator"
        : o === null
        ? "Object"
        : Object.prototype.toString.call(e).slice(D, j);
    }
    return I;
  });
});
var s = C(w()), N = s.default ?? s;
export { N as default };
//# sourceMappingURL=type-detect.mjs.map
