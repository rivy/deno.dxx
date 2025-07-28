/* esm.sh - assertion-error@1.1.0 */
var h = Object.create;
var i = Object.defineProperty;
var m = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var x = Object.getPrototypeOf, E = Object.prototype.hasOwnProperty;
var k = (r, t) => () => (t || r((t = { exports: {} }).exports, t), t.exports);
var g = (r, t, o, s) => {
  if (t && typeof t == "object" || typeof t == "function") {
    for (let e of d(t)) {
      !E.call(r, e) && e !== o &&
        i(r, e, {
          get: () => t[e],
          enumerable: !(s = m(t, e)) || s.enumerable,
        });
    }
  }
  return r;
};
var O = (
  r,
  t,
  o,
) => (o = r != null ? h(x(r)) : {},
  g(
    t || !r || !r.__esModule
      ? i(o, "default", { value: r, enumerable: !0 })
      : o,
    r,
  ));
var f = k((y, u) => {
  function p() {
    var r = [].slice.call(arguments);
    function t(o, s) {
      Object.keys(s).forEach(function (e) {
        ~r.indexOf(e) || (o[e] = s[e]);
      });
    }
    return function () {
      for (var s = [].slice.call(arguments), e = 0, a = {}; e < s.length; e++) {
        t(a, s[e]);
      }
      return a;
    };
  }
  u.exports = c;
  function c(r, t, o) {
    var s = p("name", "message", "stack", "constructor", "toJSON"),
      e = s(t || {});
    this.message = r || "Unspecified AssertionError", this.showDiff = !1;
    for (var a in e) {
      this[a] = e[a];
    }
    if (o = o || c, Error.captureStackTrace) {
      Error.captureStackTrace(this, o);
    } else {
      try {
        throw new Error();
      } catch (l) {
        this.stack = l.stack;
      }
    }
  }
  c.prototype = Object.create(Error.prototype);
  c.prototype.name = "AssertionError";
  c.prototype.constructor = c;
  c.prototype.toJSON = function (r) {
    var t = p("constructor", "toJSON", "stack"),
      o = t({ name: this.name }, this);
    return r !== !1 && this.stack && (o.stack = this.stack), o;
  };
});
var n = O(f()), { prototype: S } = n, j = n.default ?? n;
export { j as default, S as prototype };
/*! Bundled license information:

assertion-error/index.js:
  (*!
   * assertion-error
   * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
   * MIT Licensed
   *)
  (*!
   * Return a function that will copy properties from
   * one object to another excluding any originally
   * listed. Returned function will create a new `{}`.
   *
   * @param {String} excluded properties ...
   * @return {Function}
   *)
  (*!
   * Primary Exports
   *)
  (*!
   * Inherit from Error.prototype
   *)
  (*!
   * Statically set name
   *)
  (*!
   * Ensure correct constructor
   *)
*/
//# sourceMappingURL=assertion-error.mjs.map
