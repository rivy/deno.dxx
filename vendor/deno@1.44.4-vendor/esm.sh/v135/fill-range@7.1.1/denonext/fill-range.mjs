/* esm.sh - esbuild bundle(fill-range@7.1.1) denonext production */
import * as __0$ from "node:util";
import * as __1$ from "../../../../esm.sh/v135/to-regex-range@5.0.1/denonext/to-regex-range.mjs";
var require = n => {
    const e = m => typeof m.default < "u" ? m.default : m, c = m => Object.assign({ __esModule: true }, m);
    switch (n) {
        case "util": return e(__0$);
        case "to-regex-range": return e(__1$);
        default: throw new Error("module \"" + n + "\" not found");
    }
};
var D = Object.create;
var R = Object.defineProperty;
var F = Object.getOwnPropertyDescriptor;
var G = Object.getOwnPropertyNames;
var H = Object.getPrototypeOf, J = Object.prototype.hasOwnProperty;
var j = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (r, t) => (typeof require < "u" ? require : r)[t] }) : e)(function (e) {
    if (typeof require < "u")
        return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
});
var K = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports), P = (e, r) => {
    for (var t in r)
        R(e, t, { get: r[t], enumerable: !0 });
}, d = (e, r, t, n) => {
    if (r && typeof r == "object" || typeof r == "function")
        for (let i of G(r))
            !J.call(e, i) && i !== t && R(e, i, { get: () => r[i], enumerable: !(n = F(r, i)) || n.enumerable });
    return e;
}, c = (e, r, t) => (d(e, r, "default"), t && d(t, r, "default")), A = (e, r, t) => (t = e != null ? D(H(e)) : {}, d(r || !e || !e.__esModule ? R(t, "default", { value: e, enumerable: !0 }) : t, e));
var v = K((ne, O) => {
    "use strict";
    var Q = j("util"), E = j("to-regex-range"), _ = e => e !== null && typeof e == "object" && !Array.isArray(e), U = e => r => e === !0 ? Number(r) : String(r), $ = e => typeof e == "number" || typeof e == "string" && e !== "", h = e => Number.isInteger(+e), y = e => {
        let r = `${e}`, t = -1;
        if (r[0] === "-" && (r = r.slice(1)), r === "0")
            return !1;
        for (; r[++t] === "0";)
            ;
        return t > 0;
    }, W = (e, r, t) => typeof e == "string" || typeof r == "string" ? !0 : t.stringify === !0, X = (e, r, t) => {
        if (r > 0) {
            let n = e[0] === "-" ? "-" : "";
            n && (e = e.slice(1)), e = n + e.padStart(n ? r - 1 : r, "0");
        }
        return t === !1 ? String(e) : e;
    }, S = (e, r) => {
        let t = e[0] === "-" ? "-" : "";
        for (t && (e = e.slice(1), r--); e.length < r;)
            e = "0" + e;
        return t ? "-" + e : e;
    }, Y = (e, r, t) => { e.negatives.sort((f, a) => f < a ? -1 : f > a ? 1 : 0), e.positives.sort((f, a) => f < a ? -1 : f > a ? 1 : 0); let n = r.capture ? "" : "?:", i = "", l = "", u; return e.positives.length && (i = e.positives.map(f => S(String(f), t)).join("|")), e.negatives.length && (l = `-(${n}${e.negatives.map(f => S(String(f), t)).join("|")})`), i && l ? u = `${i}|${l}` : u = i || l, r.wrap ? `(${n}${u})` : u; }, I = (e, r, t, n) => {
        if (t)
            return E(e, r, { wrap: !1, ...n });
        let i = String.fromCharCode(e);
        if (e === r)
            return i;
        let l = String.fromCharCode(r);
        return `[${i}-${l}]`;
    }, q = (e, r, t) => {
        if (Array.isArray(e)) {
            let n = t.wrap === !0, i = t.capture ? "" : "?:";
            return n ? `(${i}${e.join("|")})` : e.join("|");
        }
        return E(e, r, t);
    }, V = (...e) => new RangeError("Invalid range arguments: " + Q.inspect(...e)), z = (e, r, t) => {
        if (t.strictRanges === !0)
            throw V([e, r]);
        return [];
    }, Z = (e, r) => {
        if (r.strictRanges === !0)
            throw new TypeError(`Expected step "${e}" to be a number`);
        return [];
    }, L = (e, r, t = 1, n = {}) => {
        let i = Number(e), l = Number(r);
        if (!Number.isInteger(i) || !Number.isInteger(l)) {
            if (n.strictRanges === !0)
                throw V([e, r]);
            return [];
        }
        i === 0 && (i = 0), l === 0 && (l = 0);
        let u = i > l, f = String(e), a = String(r), m = String(t);
        t = Math.max(Math.abs(t), 1);
        let s = y(f) || y(a) || y(m), g = s ? Math.max(f.length, a.length, m.length) : 0, x = s === !1 && W(e, r, n) === !1, k = n.transform || U(x);
        if (n.toRegex && t === 1)
            return I(S(e, g), S(r, g), !0, n);
        let M = { negatives: [], positives: [] }, B = C => M[C < 0 ? "negatives" : "positives"].push(Math.abs(C)), b = [], N = 0;
        for (; u ? i >= l : i <= l;)
            n.toRegex === !0 && t > 1 ? B(i) : b.push(X(k(i, N), g, x)), i = u ? i - t : i + t, N++;
        return n.toRegex === !0 ? t > 1 ? Y(M, n, g) : q(b, null, { wrap: !1, ...n }) : b;
    }, p = (e, r, t = 1, n = {}) => {
        if (!h(e) && e.length > 1 || !h(r) && r.length > 1)
            return z(e, r, n);
        let i = n.transform || (x => String.fromCharCode(x)), l = `${e}`.charCodeAt(0), u = `${r}`.charCodeAt(0), f = l > u, a = Math.min(l, u), m = Math.max(l, u);
        if (n.toRegex && t === 1)
            return I(a, m, !1, n);
        let s = [], g = 0;
        for (; f ? l >= u : l <= u;)
            s.push(i(l, g)), l = f ? l - t : l + t, g++;
        return n.toRegex === !0 ? q(s, null, { wrap: !1, options: n }) : s;
    }, w = (e, r, t, n = {}) => {
        if (r == null && $(e))
            return [e];
        if (!$(e) || !$(r))
            return z(e, r, n);
        if (typeof t == "function")
            return w(e, r, 1, { transform: t });
        if (_(t))
            return w(e, r, 0, t);
        let i = { ...n };
        return i.capture === !0 && (i.wrap = !0), t = t || i.step || 1, h(t) ? h(e) && h(r) ? L(e, r, t, i) : p(e, r, Math.max(Math.abs(t), 1), i) : t != null && !_(t) ? Z(t, i) : w(e, r, 1, t);
    };
    O.exports = w;
});
var o = {};
P(o, { default: () => te });
var ee = A(v());
c(o, A(v()));
var { default: T, ...re } = ee, te = T !== void 0 ? T : re;
export { te as default };
/*! Bundled license information:

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=fill-range.mjs.map
