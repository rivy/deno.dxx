/* esm.sh - esbuild bundle(check-error@1.0.3) denonext production */
import * as __0$ from "../../../../esm.sh/v135/get-func-name@2.0.2/denonext/get-func-name.mjs";
var require = n => {
    const e = m => typeof m.default < "u" ? m.default : m, c = m => Object.assign({}, m);
    switch (n) {
        case "get-func-name": return e(__0$);
        default: throw new Error("module \"" + n + "\" not found");
    }
};
var b = Object.create;
var f = Object.defineProperty;
var d = Object.getOwnPropertyDescriptor;
var x = Object.getOwnPropertyNames;
var C = Object.getPrototypeOf, E = Object.prototype.hasOwnProperty;
var _ = (n => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(n, { get: (t, s) => (typeof require < "u" ? require : t)[s] }) : n)(function (n) {
    if (typeof require < "u")
        return require.apply(this, arguments);
    throw Error('Dynamic require of "' + n + '" is not supported');
});
var v = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports), y = (n, t) => {
    for (var s in t)
        f(n, s, { get: t[s], enumerable: !0 });
}, a = (n, t, s, m) => {
    if (t && typeof t == "object" || typeof t == "function")
        for (let c of x(t))
            !E.call(n, c) && c !== s && f(n, c, { get: () => t[c], enumerable: !(m = d(t, c)) || m.enumerable });
    return n;
}, o = (n, t, s) => (a(n, t, "default"), s && a(s, t, "default")), g = (n, t, s) => (s = n != null ? b(C(n)) : {}, a(t || !n || !n.__esModule ? f(s, "default", { value: n, enumerable: !0 }) : s, n));
var i = v((G, p) => {
    "use strict";
    var u = _("get-func-name");
    function N(n, t) { return t instanceof Error && n === t; }
    function I(n, t) { return t instanceof Error ? n.constructor === t.constructor || n instanceof t.constructor : t.prototype instanceof Error || t === Error ? n.constructor === t || n instanceof t : !1; }
    function M(n, t) { var s = typeof n == "string" ? n : n.message; return t instanceof RegExp ? t.test(s) : typeof t == "string" ? s.indexOf(t) !== -1 : !1; }
    function q(n) {
        var t = n;
        if (n instanceof Error)
            t = u(n.constructor);
        else if (typeof n == "function" && (t = u(n), t === "")) {
            var s = u(new n);
            t = s || t;
        }
        return t;
    }
    function F(n) { var t = ""; return n && n.message ? t = n.message : typeof n == "string" && (t = n), t; }
    p.exports = { compatibleInstance: N, compatibleConstructor: I, compatibleMessage: M, getMessage: F, getConstructorName: q };
});
var e = {};
y(e, { compatibleConstructor: () => R, compatibleInstance: () => O, compatibleMessage: () => S, default: () => B, getConstructorName: () => z, getMessage: () => j });
var r = g(i());
o(e, g(i()));
var { compatibleInstance: O, compatibleConstructor: R, compatibleMessage: S, getMessage: j, getConstructorName: z } = r, { default: l, ...A } = r, B = l !== void 0 ? l : A;
export { R as compatibleConstructor, O as compatibleInstance, S as compatibleMessage, B as default, z as getConstructorName, j as getMessage };
//# sourceMappingURL=check-error.mjs.map
