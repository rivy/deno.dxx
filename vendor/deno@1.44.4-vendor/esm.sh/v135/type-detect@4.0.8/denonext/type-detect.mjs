/* esm.sh - esbuild bundle(type-detect@4.0.8) denonext production */
var __global$ = globalThis || (typeof window !== "undefined" ? window : self);
var _ = Object.create;
var u = Object.defineProperty;
var j = Object.getOwnPropertyDescriptor;
var h = Object.getOwnPropertyNames;
var V = Object.getPrototypeOf, C = Object.prototype.hasOwnProperty;
var N = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), R = (e, t) => {
    for (var o in t)
        u(e, o, { get: t[o], enumerable: !0 });
}, y = (e, t, o, f) => {
    if (t && typeof t == "object" || typeof t == "function")
        for (let i of h(t))
            !C.call(e, i) && i !== o && u(e, i, { get: () => t[i], enumerable: !(f = j(t, i)) || f.enumerable });
    return e;
}, p = (e, t, o) => (y(e, t, "default"), o && y(o, t, "default")), E = (e, t, o) => (o = e != null ? _(V(e)) : {}, y(t || !e || !e.__esModule ? u(o, "default", { value: e, enumerable: !0 }) : o, e));
var d = N((s, l) => {
    (function (e, t) { typeof s == "object" && typeof l < "u" ? l.exports = t() : typeof define == "function" && define.amd ? define(t) : e.typeDetect = t(); })(s, function () {
        "use strict";
        var e = typeof Promise == "function", t = typeof self == "object" ? self : __global$, o = typeof Symbol < "u", f = typeof Map < "u", i = typeof Set < "u", T = typeof WeakMap < "u", x = typeof WeakSet < "u", M = typeof DataView < "u", g = o && typeof Symbol.iterator < "u", c = o && typeof Symbol.toStringTag < "u", O = i && typeof Set.prototype.entries == "function", P = f && typeof Map.prototype.entries == "function", I = O && Object.getPrototypeOf(new Set().entries()), L = P && Object.getPrototypeOf(new Map().entries()), m = g && typeof Array.prototype[Symbol.iterator] == "function", D = m && Object.getPrototypeOf([][Symbol.iterator]()), w = g && typeof String.prototype[Symbol.iterator] == "function", k = w && Object.getPrototypeOf(""[Symbol.iterator]()), H = 8, A = -1;
        function W(r) {
            var S = typeof r;
            if (S !== "object")
                return S;
            if (r === null)
                return "null";
            if (r === t)
                return "global";
            if (Array.isArray(r) && (c === !1 || !(Symbol.toStringTag in r)))
                return "Array";
            if (typeof window == "object" && window !== null) {
                if (typeof window.location == "object" && r === window.location)
                    return "Location";
                if (typeof window.document == "object" && r === window.document)
                    return "Document";
                if (typeof window.navigator == "object") {
                    if (typeof window.navigator.mimeTypes == "object" && r === window.navigator.mimeTypes)
                        return "MimeTypeArray";
                    if (typeof window.navigator.plugins == "object" && r === window.navigator.plugins)
                        return "PluginArray";
                }
                if ((typeof window.HTMLElement == "function" || typeof window.HTMLElement == "object") && r instanceof window.HTMLElement) {
                    if (r.tagName === "BLOCKQUOTE")
                        return "HTMLQuoteElement";
                    if (r.tagName === "TD")
                        return "HTMLTableDataCellElement";
                    if (r.tagName === "TH")
                        return "HTMLTableHeaderCellElement";
                }
            }
            var v = c && r[Symbol.toStringTag];
            if (typeof v == "string")
                return v;
            var n = Object.getPrototypeOf(r);
            return n === RegExp.prototype ? "RegExp" : n === Date.prototype ? "Date" : e && n === Promise.prototype ? "Promise" : i && n === Set.prototype ? "Set" : f && n === Map.prototype ? "Map" : x && n === WeakSet.prototype ? "WeakSet" : T && n === WeakMap.prototype ? "WeakMap" : M && n === DataView.prototype ? "DataView" : f && n === L ? "Map Iterator" : i && n === I ? "Set Iterator" : m && n === D ? "Array Iterator" : w && n === k ? "String Iterator" : n === null ? "Object" : Object.prototype.toString.call(r).slice(H, A);
        }
        return W;
    });
});
var a = {};
R(a, { default: () => K });
var Q = E(d());
p(a, E(d()));
var { default: b, ...B } = Q, K = b !== void 0 ? b : B;
export { K as default };
//# sourceMappingURL=type-detect.mjs.map
