/* esm.sh - esbuild bundle(type-detect@4.1.0) denonext production */
var A = Object.create;
var s = Object.defineProperty;
var W = Object.getOwnPropertyDescriptor;
var _ = Object.getOwnPropertyNames;
var V = Object.getPrototypeOf, C = Object.prototype.hasOwnProperty;
var G = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), N = (e, t) => {
    for (var o in t)
        s(e, o, { get: t[o], enumerable: !0 });
}, l = (e, t, o, f) => {
    if (t && typeof t == "object" || typeof t == "function")
        for (let i of _(t))
            !C.call(e, i) && i !== o && s(e, i, { get: () => t[i], enumerable: !(f = W(t, i)) || f.enumerable });
    return e;
}, p = (e, t, o) => (l(e, t, "default"), o && l(o, t, "default")), v = (e, t, o) => (o = e != null ? A(V(e)) : {}, l(t || !e || !e.__esModule ? s(o, "default", { value: e, enumerable: !0 }) : o, e));
var g = G((c, d) => {
    (function (e, t) { typeof c == "object" && typeof d < "u" ? d.exports = t() : typeof define == "function" && define.amd ? define(t) : (e = typeof globalThis < "u" ? globalThis : e || self, e.typeDetect = t()); })(c, function () {
        "use strict";
        var e = typeof Promise == "function", t = function (r) {
            if (typeof globalThis == "object")
                return globalThis;
            Object.defineProperty(r, "typeDetectGlobalObject", { get: function () { return this; }, configurable: !0 });
            var y = typeDetectGlobalObject;
            return delete r.typeDetectGlobalObject, y;
        }(Object.prototype), o = typeof Symbol < "u", f = typeof Map < "u", i = typeof Set < "u", T = typeof WeakMap < "u", O = typeof WeakSet < "u", x = typeof DataView < "u", m = o && typeof Symbol.iterator < "u", w = o && typeof Symbol.toStringTag < "u", M = i && typeof Set.prototype.entries == "function", P = f && typeof Map.prototype.entries == "function", D = M && Object.getPrototypeOf(new Set().entries()), I = P && Object.getPrototypeOf(new Map().entries()), b = m && typeof Array.prototype[Symbol.iterator] == "function", L = b && Object.getPrototypeOf([][Symbol.iterator]()), S = m && typeof String.prototype[Symbol.iterator] == "function", h = S && Object.getPrototypeOf(""[Symbol.iterator]()), j = 8, k = -1;
        function H(r) {
            var y = typeof r;
            if (y !== "object")
                return y;
            if (r === null)
                return "null";
            if (r === t)
                return "global";
            if (Array.isArray(r) && (w === !1 || !(Symbol.toStringTag in r)))
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
            var u = w && r[Symbol.toStringTag];
            if (typeof u == "string")
                return u;
            var n = Object.getPrototypeOf(r);
            return n === RegExp.prototype ? "RegExp" : n === Date.prototype ? "Date" : e && n === Promise.prototype ? "Promise" : i && n === Set.prototype ? "Set" : f && n === Map.prototype ? "Map" : O && n === WeakSet.prototype ? "WeakSet" : T && n === WeakMap.prototype ? "WeakMap" : x && n === DataView.prototype ? "DataView" : f && n === I ? "Map Iterator" : i && n === D ? "Set Iterator" : b && n === L ? "Array Iterator" : S && n === h ? "String Iterator" : n === null ? "Object" : Object.prototype.toString.call(r).slice(j, k);
        }
        return H;
    });
});
var a = {};
N(a, { default: () => B });
var R = v(g());
p(a, v(g()));
var { default: E, ...Q } = R, B = E !== void 0 ? E : Q;
export { B as default };
//# sourceMappingURL=type-detect.mjs.map
