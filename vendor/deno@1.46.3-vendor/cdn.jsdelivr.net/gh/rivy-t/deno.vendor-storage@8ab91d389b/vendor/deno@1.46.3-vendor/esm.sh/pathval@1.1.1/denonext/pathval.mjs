/* esm.sh - pathval@1.1.1 */
var y = Object.create;
var s = Object.defineProperty;
var m = Object.getOwnPropertyDescriptor;
var V = Object.getOwnPropertyNames;
var x = Object.getPrototypeOf, _ = Object.prototype.hasOwnProperty;
var I = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var $ = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function") {
    for (let a of V(t)) {
      !_.call(e, a) && a !== n &&
        s(e, a, {
          get: () => t[a],
          enumerable: !(r = m(t, a)) || r.enumerable,
        });
    }
  }
  return e;
};
var O = (
  e,
  t,
  n,
) => (n = e != null ? y(x(e)) : {},
  $(
    t || !e || !e.__esModule
      ? s(n, "default", { value: e, enumerable: !0 })
      : n,
    e,
  ));
var g = I((S, h) => {
  "use strict";
  function c(e, t) {
    return typeof e > "u" || e === null ? !1 : t in Object(e);
  }
  function d(e) {
    var t = e.replace(/([^\\])\[/g, "$1.["), n = t.match(/(\\\.|[^.]+?)+/g);
    return n.map(function (a) {
      if (a === "constructor" || a === "__proto__" || a === "prototype") {
        return {};
      }
      var f = /^\[(\d+)\]$/, u = f.exec(a), l = null;
      return u
        ? l = { i: parseFloat(u[1]) }
        : l = { p: a.replace(/\\([.[\]])/g, "$1") },
        l;
    });
  }
  function p(e, t, n) {
    var r = e, a = null;
    n = typeof n > "u" ? t.length : n;
    for (var f = 0; f < n; f++) {
      var u = t[f];
      r && (typeof u.p > "u" ? r = r[u.i] : r = r[u.p], f === n - 1 && (a = r));
    }
    return a;
  }
  function A(e, t, n) {
    for (var r = e, a = n.length, f = null, u = 0; u < a; u++) {
      var l = null, o = null;
      if (f = n[u], u === a - 1) {
        l = typeof f.p > "u" ? f.i : f.p, r[l] = t;
      } else if (typeof f.p < "u" && r[f.p]) {
        r = r[f.p];
      } else if (typeof f.i < "u" && r[f.i]) {
        r = r[f.i];
      } else {
        var P = n[u + 1];
        l = typeof f.p > "u" ? f.i : f.p,
          o = typeof P.p > "u" ? [] : {},
          r[l] = o,
          r = r[l];
      }
    }
  }
  function v(e, t) {
    var n = d(t),
      r = n[n.length - 1],
      a = {
        parent: n.length > 1 ? p(e, n, n.length - 1) : e,
        name: r.p || r.i,
        value: p(e, n),
      };
    return a.exists = c(a.parent, a.name), a;
  }
  function F(e, t) {
    var n = v(e, t);
    return n.value;
  }
  function G(e, t, n) {
    var r = d(t);
    return A(e, n, r), e;
  }
  h.exports = {
    hasProperty: c,
    getPathInfo: v,
    getPathValue: F,
    setPathValue: G,
  };
});
var i = O(g()),
  { hasProperty: k, getPathInfo: q, getPathValue: w, setPathValue: z } = i,
  B = i.default ?? i;
export {
  B as default,
  k as hasProperty,
  q as getPathInfo,
  w as getPathValue,
  z as setPathValue,
};
//# sourceMappingURL=pathval.mjs.map
