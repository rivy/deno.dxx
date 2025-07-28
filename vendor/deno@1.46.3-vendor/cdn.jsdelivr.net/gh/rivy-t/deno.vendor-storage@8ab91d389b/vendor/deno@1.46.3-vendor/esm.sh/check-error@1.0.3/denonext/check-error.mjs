/* esm.sh - check-error@1.0.3 */
import * as __0$ from "../../../esm.sh/get-func-name@2.0.2.js";
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m,
    c = (m) => Object.assign({ __esModule: true }, m);
  switch (n) {
    case "get-func-name":
      return e(__0$);
    default:
      console.error('module "' + n + '" not found');
      return null;
  }
};
var m = Object.create;
var f = Object.defineProperty;
var g = Object.getOwnPropertyDescriptor;
var p = Object.getOwnPropertyNames;
var l = Object.getPrototypeOf, r = Object.prototype.hasOwnProperty;
var b =
  ((s) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(s, { get: (t, n) => (typeof require < "u" ? require : t)[n] })
      : s)(function (s) {
      if (typeof require < "u") {
        return require.apply(this, arguments);
      }
      throw Error('Dynamic require of "' + s + '" is not supported');
    });
var C = (s, t) => () => (t || s((t = { exports: {} }).exports, t), t.exports);
var E = (s, t, n, a) => {
  if (t && typeof t == "object" || typeof t == "function") {
    for (let e of p(t)) {
      !r.call(s, e) && e !== n &&
        f(s, e, {
          get: () => t[e],
          enumerable: !(a = g(t, e)) || a.enumerable,
        });
    }
  }
  return s;
};
var v = (
  s,
  t,
  n,
) => (n = s != null ? m(l(s)) : {},
  E(
    t || !s || !s.__esModule
      ? f(n, "default", { value: s, enumerable: !0 })
      : n,
    s,
  ));
var i = C((j, u) => {
  "use strict";
  var o = b("get-func-name");
  function x(s, t) {
    return t instanceof Error && s === t;
  }
  function y(s, t) {
    return t instanceof Error
      ? s.constructor === t.constructor || s instanceof t.constructor
      : t.prototype instanceof Error || t === Error
      ? s.constructor === t || s instanceof t
      : !1;
  }
  function N(s, t) {
    var n = typeof s == "string" ? s : s.message;
    return t instanceof RegExp
      ? t.test(n)
      : typeof t == "string"
      ? n.indexOf(t) !== -1
      : !1;
  }
  function d(s) {
    var t = s;
    if (s instanceof Error) {
      t = o(s.constructor);
    } else if (typeof s == "function" && (t = o(s), t === "")) {
      var n = o(new s());
      t = n || t;
    }
    return t;
  }
  function I(s) {
    var t = "";
    return s && s.message ? t = s.message : typeof s == "string" && (t = s), t;
  }
  u.exports = {
    compatibleInstance: x,
    compatibleConstructor: y,
    compatibleMessage: N,
    getMessage: I,
    getConstructorName: d,
  };
});
var c = v(i()),
  {
    compatibleInstance: q,
    compatibleConstructor: F,
    compatibleMessage: O,
    getMessage: R,
    getConstructorName: S,
  } = c,
  z = c.default ?? c;
export {
  F as compatibleConstructor,
  O as compatibleMessage,
  q as compatibleInstance,
  R as getMessage,
  S as getConstructorName,
  z as default,
};
//# sourceMappingURL=check-error.mjs.map
