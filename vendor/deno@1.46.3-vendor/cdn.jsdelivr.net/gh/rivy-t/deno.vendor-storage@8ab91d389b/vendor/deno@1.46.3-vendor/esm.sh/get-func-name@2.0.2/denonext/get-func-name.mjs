/* esm.sh - get-func-name@2.0.2 */
var s = Object.create;
var f = Object.defineProperty;
var m = Object.getOwnPropertyDescriptor;
var p = Object.getOwnPropertyNames;
var c = Object.getPrototypeOf, d = Object.prototype.hasOwnProperty;
var l = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var v = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function") {
    for (let o of p(t)) {
      !d.call(e, o) && o !== n &&
        f(e, o, {
          get: () => t[o],
          enumerable: !(r = m(t, o)) || r.enumerable,
        });
    }
  }
  return e;
};
var y = (
  e,
  t,
  n,
) => (n = e != null ? s(c(e)) : {},
  v(
    t || !e || !e.__esModule
      ? f(n, "default", { value: e, enumerable: !0 })
      : n,
    e,
  ));
var u = l((S, a) => {
  "use strict";
  var g = Function.prototype.toString,
    x = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/,
    h = 512;
  function j(e) {
    if (typeof e != "function") {
      return null;
    }
    var t = "";
    if (typeof Function.prototype.name > "u" && typeof e.name > "u") {
      var n = g.call(e);
      if (n.indexOf("(") > h) {
        return t;
      }
      var r = n.match(x);
      r && (t = r[1]);
    } else {
      t = e.name;
    }
    return t;
  }
  a.exports = j;
});
var i = y(u()), F = i.default ?? i;
export { F as default };
//# sourceMappingURL=get-func-name.mjs.map
