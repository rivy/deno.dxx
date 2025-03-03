/* esm.sh - esbuild bundle(deep-eql@3.0.1) denonext production */
import * as __0$ from "../../../../esm.sh/v135/type-detect@4.0.8/denonext/type-detect.mjs";
var require = n => {
    const e = m => typeof m.default < "u" ? m.default : m, c = m => Object.assign({}, m);
    switch (n) {
        case "type-detect": return e(__0$);
        default: throw new Error("module \"" + n + "\" not found");
    }
};
var W = Object.create;
var E = Object.defineProperty;
var B = Object.getOwnPropertyDescriptor;
var K = Object.getOwnPropertyNames;
var P = Object.getPrototypeOf, C = Object.prototype.hasOwnProperty;
var G = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (r, t) => (typeof require < "u" ? require : r)[t] }) : e)(function (e) {
    if (typeof require < "u")
        return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
});
var R = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports), T = (e, r) => {
    for (var t in r)
        E(e, t, { get: r[t], enumerable: !0 });
}, a = (e, r, t, u) => {
    if (r && typeof r == "object" || typeof r == "function")
        for (let f of K(r))
            !C.call(e, f) && f !== t && E(e, f, { get: () => r[f], enumerable: !(u = B(r, f)) || u.enumerable });
    return e;
}, l = (e, r, t) => (a(e, r, "default"), t && a(t, r, "default")), w = (e, r, t) => (t = e != null ? W(P(e)) : {}, a(r || !e || !e.__esModule ? E(t, "default", { value: e, enumerable: !0 }) : t, e));
var x = R((H, A) => {
    "use strict";
    var S = G("type-detect");
    function j() { this._key = "chai/deep-eql__" + Math.random() + Date.now(); }
    j.prototype = { get: function (r) { return r[this._key]; }, set: function (r, t) { Object.isExtensible(r) && Object.defineProperty(r, this._key, { value: t, configurable: !0 }); } };
    var z = typeof WeakMap == "function" ? WeakMap : j;
    function _(e, r, t) {
        if (!t || n(e) || n(r))
            return null;
        var u = t.get(e);
        if (u) {
            var f = u.get(r);
            if (typeof f == "boolean")
                return f;
        }
        return null;
    }
    function y(e, r, t, u) {
        if (!(!t || n(e) || n(r))) {
            var f = t.get(e);
            f ? f.set(r, u) : (f = new z, f.set(r, u), t.set(e, f));
        }
    }
    A.exports = v;
    A.exports.MemoizeMap = z;
    function v(e, r, t) {
        if (t && t.comparator)
            return U(e, r, t);
        var u = D(e, r);
        return u !== null ? u : U(e, r, t);
    }
    function D(e, r) { return e === r ? e !== 0 || 1 / e === 1 / r : e !== e && r !== r ? !0 : n(e) || n(r) ? !1 : null; }
    function U(e, r, t) {
        t = t || {}, t.memoize = t.memoize === !1 ? !1 : t.memoize || new z;
        var u = t && t.comparator, f = _(e, r, t.memoize);
        if (f !== null)
            return f;
        var s = _(r, e, t.memoize);
        if (s !== null)
            return s;
        if (u) {
            var c = u(e, r);
            if (c === !1 || c === !0)
                return y(e, r, t.memoize, c), c;
            var m = D(e, r);
            if (m !== null)
                return m;
        }
        var M = S(e);
        if (M !== S(r))
            return y(e, r, t.memoize, !1), !1;
        y(e, r, t.memoize, !0);
        var q = L(e, r, M, t);
        return y(e, r, t.memoize, q), q;
    }
    function L(e, r, t, u) {
        switch (t) {
            case "String":
            case "Number":
            case "Boolean":
            case "Date": return v(e.valueOf(), r.valueOf());
            case "Promise":
            case "Symbol":
            case "function":
            case "WeakMap":
            case "WeakSet":
            case "Error": return e === r;
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
            case "Array": return o(e, r, u);
            case "RegExp": return N(e, r);
            case "Generator": return V(e, r, u);
            case "DataView": return o(new Uint8Array(e.buffer), new Uint8Array(r.buffer), u);
            case "ArrayBuffer": return o(new Uint8Array(e), new Uint8Array(r), u);
            case "Set": return k(e, r, u);
            case "Map": return k(e, r, u);
            default: return X(e, r, u);
        }
    }
    function N(e, r) { return e.toString() === r.toString(); }
    function k(e, r, t) {
        if (e.size !== r.size)
            return !1;
        if (e.size === 0)
            return !0;
        var u = [], f = [];
        return e.forEach(function (c, m) { u.push([c, m]); }), r.forEach(function (c, m) { f.push([c, m]); }), o(u.sort(), f.sort(), t);
    }
    function o(e, r, t) {
        var u = e.length;
        if (u !== r.length)
            return !1;
        if (u === 0)
            return !0;
        for (var f = -1; ++f < u;)
            if (v(e[f], r[f], t) === !1)
                return !1;
        return !0;
    }
    function V(e, r, t) { return o(b(e), b(r), t); }
    function J(e) { return typeof Symbol < "u" && typeof e == "object" && typeof Symbol.iterator < "u" && typeof e[Symbol.iterator] == "function"; }
    function I(e) {
        if (J(e))
            try {
                return b(e[Symbol.iterator]());
            }
            catch {
                return [];
            }
        return [];
    }
    function b(e) {
        for (var r = e.next(), t = [r.value]; r.done === !1;)
            r = e.next(), t.push(r.value);
        return t;
    }
    function h(e) {
        var r = [];
        for (var t in e)
            r.push(t);
        return r;
    }
    function Q(e, r, t, u) {
        var f = t.length;
        if (f === 0)
            return !0;
        for (var s = 0; s < f; s += 1)
            if (v(e[t[s]], r[t[s]], u) === !1)
                return !1;
        return !0;
    }
    function X(e, r, t) {
        var u = h(e), f = h(r);
        if (u.length && u.length === f.length)
            return u.sort(), f.sort(), o(u, f) === !1 ? !1 : Q(e, r, u, t);
        var s = I(e), c = I(r);
        return s.length && s.length === c.length ? (s.sort(), c.sort(), o(s, c, t)) : u.length === 0 && s.length === 0 && f.length === 0 && c.length === 0;
    }
    function n(e) { return e === null || typeof e != "object"; }
});
var i = {};
T(i, { MemoizeMap: () => Y, default: () => $ });
var F = w(x());
l(i, w(x()));
var { MemoizeMap: Y } = F, { default: g, ...Z } = F, $ = g !== void 0 ? g : Z;
export { Y as MemoizeMap, $ as default };
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
