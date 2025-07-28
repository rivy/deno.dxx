/* esm.sh - deep-eql@4.1.4 */
import * as __0$ from "../../../esm.sh/type-detect@4.1.0.js";
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m,
    c = (m) => Object.assign({ __esModule: true }, m);
  switch (n) {
    case "type-detect":
      return e(__0$);
    default:
      console.error('module "' + n + '" not found');
      return null;
  }
};
var h = Object.create;
var z = Object.defineProperty;
var k = Object.getOwnPropertyDescriptor;
var _ = Object.getOwnPropertyNames;
var F = Object.getPrototypeOf, K = Object.prototype.hasOwnProperty;
var W =
  ((e) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(e, { get: (r, t) => (typeof require < "u" ? require : r)[t] })
      : e)(function (e) {
      if (typeof require < "u") {
        return require.apply(this, arguments);
      }
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
var B = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
var C = (e, r, t, u) => {
  if (r && typeof r == "object" || typeof r == "function") {
    for (let s of _(r)) {
      !K.call(e, s) && s !== t &&
        z(e, s, {
          get: () => r[s],
          enumerable: !(u = k(r, s)) || u.enumerable,
        });
    }
  }
  return e;
};
var G = (
  e,
  r,
  t,
) => (t = e != null ? h(F(e)) : {},
  C(
    r || !e || !e.__esModule
      ? z(t, "default", { value: e, enumerable: !0 })
      : t,
    e,
  ));
var g = B((J, E) => {
  "use strict";
  var A = W("type-detect");
  function j() {
    this._key = "chai/deep-eql__" + Math.random() + Date.now();
  }
  j.prototype = {
    get: function (r) {
      return r[this._key];
    },
    set: function (r, t) {
      Object.isExtensible(r) &&
        Object.defineProperty(r, this._key, { value: t, configurable: !0 });
    },
  };
  var b = typeof WeakMap == "function" ? WeakMap : j;
  function T(e, r, t) {
    if (!t || m(e) || m(r)) {
      return null;
    }
    var u = t.get(e);
    if (u) {
      var s = u.get(r);
      if (typeof s == "boolean") {
        return s;
      }
    }
    return null;
  }
  function a(e, r, t, u) {
    if (!(!t || m(e) || m(r))) {
      var s = t.get(e);
      s ? s.set(r, u) : (s = new b(), s.set(r, u), t.set(e, s));
    }
  }
  E.exports = n;
  E.exports.MemoizeMap = b;
  function n(e, r, t) {
    if (t && t.comparator) {
      return q(e, r, t);
    }
    var u = I(e, r);
    return u !== null ? u : q(e, r, t);
  }
  function I(e, r) {
    return e === r
      ? e !== 0 || 1 / e === 1 / r
      : e !== e && r !== r
      ? !0
      : m(e) || m(r)
      ? !1
      : null;
  }
  function q(e, r, t) {
    t = t || {}, t.memoize = t.memoize === !1 ? !1 : t.memoize || new b();
    var u = t && t.comparator, s = T(e, r, t.memoize);
    if (s !== null) {
      return s;
    }
    var c = T(r, e, t.memoize);
    if (c !== null) {
      return c;
    }
    if (u) {
      var l = u(e, r);
      if (l === !1 || l === !0) {
        return a(e, r, t.memoize, l), l;
      }
      var o = I(e, r);
      if (o !== null) {
        return o;
      }
    }
    var i = A(e);
    if (i !== A(r)) {
      return a(e, r, t.memoize, !1), !1;
    }
    a(e, r, t.memoize, !0);
    var S = R(e, r, i, t);
    return a(e, r, t.memoize, S), S;
  }
  function R(e, r, t, u) {
    switch (t) {
      case "String":
      case "Number":
      case "Boolean":
      case "Date":
        return n(e.valueOf(), r.valueOf());
      case "Promise":
      case "Symbol":
      case "function":
      case "WeakMap":
      case "WeakSet":
        return e === r;
      case "Error":
        return U(e, r, ["name", "message", "code"], u);
      case "Arguments":
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "Array":
        return f(e, r, u);
      case "RegExp":
        return Z(e, r);
      case "Generator":
        return L(e, r, u);
      case "DataView":
        return f(new Uint8Array(e.buffer), new Uint8Array(r.buffer), u);
      case "ArrayBuffer":
        return f(new Uint8Array(e), new Uint8Array(r), u);
      case "Set":
        return w(e, r, u);
      case "Map":
        return w(e, r, u);
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.Instant":
      case "Temporal.ZonedDateTime":
      case "Temporal.PlainYearMonth":
      case "Temporal.PlainMonthDay":
        return e.equals(r);
      case "Temporal.Duration":
        return e.total("nanoseconds") === r.total("nanoseconds");
      case "Temporal.TimeZone":
      case "Temporal.Calendar":
        return e.toString() === r.toString();
      default:
        return V(e, r, u);
    }
  }
  function Z(e, r) {
    return e.toString() === r.toString();
  }
  function w(e, r, t) {
    try {
      if (e.size !== r.size) {
        return !1;
      }
      if (e.size === 0) {
        return !0;
      }
    } catch {
      return !1;
    }
    var u = [], s = [];
    return e.forEach(function (l, o) {
      u.push([l, o]);
    }),
      r.forEach(function (l, o) {
        s.push([l, o]);
      }),
      f(u.sort(), s.sort(), t);
  }
  function f(e, r, t) {
    var u = e.length;
    if (u !== r.length) {
      return !1;
    }
    if (u === 0) {
      return !0;
    }
    for (var s = -1; ++s < u;) {
      if (n(e[s], r[s], t) === !1) {
        return !1;
      }
    }
    return !0;
  }
  function L(e, r, t) {
    return f(v(e), v(r), t);
  }
  function N(e) {
    return typeof Symbol < "u" && typeof e == "object" &&
      typeof Symbol.iterator < "u" && typeof e[Symbol.iterator] == "function";
  }
  function M(e) {
    if (N(e)) {
      try {
        return v(e[Symbol.iterator]());
      } catch {
        return [];
      }
    }
    return [];
  }
  function v(e) {
    for (var r = e.next(), t = [r.value]; r.done === !1;) {
      r = e.next(), t.push(r.value);
    }
    return t;
  }
  function x(e) {
    var r = [];
    for (var t in e) {
      r.push(t);
    }
    return r;
  }
  function D(e) {
    for (
      var r = [], t = Object.getOwnPropertySymbols(e), u = 0;
      u < t.length;
      u += 1
    ) {
      var s = t[u];
      Object.getOwnPropertyDescriptor(e, s).enumerable && r.push(s);
    }
    return r;
  }
  function U(e, r, t, u) {
    var s = t.length;
    if (s === 0) {
      return !0;
    }
    for (var c = 0; c < s; c += 1) {
      if (n(e[t[c]], r[t[c]], u) === !1) {
        return !1;
      }
    }
    return !0;
  }
  function V(e, r, t) {
    var u = x(e), s = x(r), c = D(e), l = D(r);
    if (u = u.concat(c), s = s.concat(l), u.length && u.length === s.length) {
      return f(P(u).sort(), P(s).sort()) === !1 ? !1 : U(e, r, u, t);
    }
    var o = M(e), i = M(r);
    return o.length && o.length === i.length
      ? (o.sort(), i.sort(), f(o, i, t))
      : u.length === 0 && o.length === 0 && s.length === 0 && i.length === 0;
  }
  function m(e) {
    return e === null || typeof e != "object";
  }
  function P(e) {
    return e.map(function (t) {
      return typeof t == "symbol" ? t.toString() : t;
    });
  }
});
var y = G(g()), { MemoizeMap: Q } = y, X = y.default ?? y;
export { Q as MemoizeMap, X as default };
/*! Bundled license information:

deep-eql/index.js:
  (*!
   * deep-eql
   * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Check to see if the MemoizeMap has recorded a result of the two operands
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @returns {Boolean|null} result
  *)
  (*!
   * Set the result of the equality into the MemoizeMap
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @param {Boolean} result
  *)
  (*!
   * Primary Export
   *)
  (*!
   * The main logic of the `deepEqual` function.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (optional) Additional options
   * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
   * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
      complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
      references to blow the stack.
   * @return {Boolean} equal match
  *)
  (*!
   * Compare two Regular Expressions for equality.
   *
   * @param {RegExp} leftHandOperand
   * @param {RegExp} rightHandOperand
   * @return {Boolean} result
   *)
  (*!
   * Compare two Sets/Maps for equality. Faster than other equality functions.
   *
   * @param {Set} leftHandOperand
   * @param {Set} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for generator objects such as those returned by generator functions.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Determine if the given object has an @@iterator function.
   *
   * @param {Object} target
   * @return {Boolean} `true` if the object has an @@iterator function.
   *)
  (*!
   * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
   * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
   *
   * @param {Object} target
   * @returns {Array} an array of entries from the @@iterator function
   *)
  (*!
   * Gets all entries from a Generator. This will consume the generator - which could have side effects.
   *
   * @param {Generator} target
   * @returns {Array} an array of entries from the Generator.
   *)
  (*!
   * Gets all own and inherited enumerable keys from a target.
   *
   * @param {Object} target
   * @returns {Array} an array of own and inherited enumerable keys from the target.
   *)
  (*!
   * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
   * each key. If any value of the given key is not equal, the function will return false (early).
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
   * for each enumerable key in the object.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Returns true if the argument is a primitive.
   *
   * This intentionally returns true for all objects that can be compared by reference,
   * including functions and symbols.
   *
   * @param {Mixed} value
   * @return {Boolean} result
   *)
*/
//# sourceMappingURL=deep-eql.mjs.map
