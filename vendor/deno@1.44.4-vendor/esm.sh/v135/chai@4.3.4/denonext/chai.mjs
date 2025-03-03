/* esm.sh - esbuild bundle(chai@4.3.4) denonext production */
import * as __0$ from "../../../../esm.sh/v135/assertion-error@1.1.0/denonext/assertion-error.mjs";
import * as __1$ from "../../../../esm.sh/v135/pathval@1.1.1/denonext/pathval.mjs";
import * as __2$ from "../../../../esm.sh/v135/type-detect@4.0.8/denonext/type-detect.mjs";
import * as __3$ from "../../../../esm.sh/v135/deep-eql@3.0.1/denonext/deep-eql.mjs";
import * as __4$ from "../../../../esm.sh/v135/get-func-name@2.0.2/denonext/get-func-name.mjs";
import * as __5$ from "../../../../esm.sh/v135/check-error@1.0.3/denonext/check-error.mjs";
import * as __6$ from "../../../../esm.sh/v135/type-detect@4.0.8/denonext/type-detect.mjs";
import * as __7$ from "../../../../esm.sh/v135/assertion-error@1.1.0/denonext/assertion-error.mjs";
import * as __8$ from "../../../../esm.sh/v135/type-detect@4.0.8/denonext/type-detect.mjs";
import * as __9$ from "../../../../esm.sh/v135/get-func-name@2.0.2/denonext/get-func-name.mjs";
var require = n => {
    const e = m => typeof m.default < "u" ? m.default : m, c = m => Object.assign({}, m);
    switch (n) {
        case "assertion-error": return e(__0$);
        case "pathval": return e(__1$);
        case "type-detect": return e(__2$);
        case "deep-eql": return e(__3$);
        case "get-func-name": return e(__4$);
        case "check-error": return e(__5$);
        default: throw new Error("module \"" + n + "\" not found");
    }
};
var $t = Object.create;
var je = Object.defineProperty;
var Wt = Object.getOwnPropertyDescriptor;
var Jt = Object.getOwnPropertyNames;
var Zt = Object.getPrototypeOf, Xt = Object.prototype.hasOwnProperty;
var B = (u => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(u, { get: (i, r) => (typeof require < "u" ? require : i)[r] }) : u)(function (u) {
    if (typeof require < "u")
        return require.apply(this, arguments);
    throw Error('Dynamic require of "' + u + '" is not supported');
});
var M = (u, i) => () => (i || u((i = { exports: {} }).exports, i), i.exports);
var Yt = (u, i, r, h) => {
    if (i && typeof i == "object" || typeof i == "function")
        for (let e of Jt(i))
            !Xt.call(u, e) && e !== r && je(u, e, { get: () => i[e], enumerable: !(h = Wt(i, e)) || h.enumerable });
    return u;
};
var Qt = (u, i, r) => (r = u != null ? $t(Zt(u)) : {}, Yt(i || !u || !u.__esModule ? je(r, "default", { value: u, enumerable: !0 }) : r, u));
var z = M((er, Pe) => {
    Pe.exports = function (i, r, h) {
        var e = i.__flags || (i.__flags = Object.create(null));
        if (arguments.length === 3)
            e[r] = h;
        else
            return e[r];
    };
});
var Ee = M((tr, Ne) => { var _t = z(); Ne.exports = function (i, r) { var h = _t(i, "negate"), e = r[0]; return h ? !e : e; }; });
var Ae = M((nr, Se) => {
    var en = B("assertion-error"), re = z(), tn = B("type-detect");
    Se.exports = function (i, r) {
        var h = re(i, "message"), e = re(i, "ssfi");
        h = h ? h + ": " : "", i = re(i, "object"), r = r.map(function (o) { return o.toLowerCase(); }), r.sort();
        var t = r.map(function (o, a) { var b = ~["a", "e", "i", "o", "u"].indexOf(o.charAt(0)) ? "an" : "a", m = r.length > 1 && a === r.length - 1 ? "or " : ""; return m + b + " " + o; }).join(", "), n = tn(i).toLowerCase();
        if (!r.some(function (o) { return n === o; }))
            throw new en(h + "object tested must be " + t + ", but " + n + " given", void 0, e);
    };
});
var oe = M((rr, De) => { De.exports = function (i, r) { return r.length > 4 ? r[4] : i._obj; }; });
var ie = M((or, Te) => {
    Te.exports = function (i) {
        var r = Object.getOwnPropertyNames(i);
        function h(t) { r.indexOf(t) === -1 && r.push(t); }
        for (var e = Object.getPrototypeOf(i); e !== null;)
            Object.getOwnPropertyNames(e).forEach(h), e = Object.getPrototypeOf(e);
        return r;
    };
});
var ze = M((ir, Ie) => {
    Ie.exports = function (i) {
        var r = [];
        for (var h in i)
            r.push(h);
        return r;
    };
});
var G = M((sr, Ce) => { Ce.exports = { includeStack: !1, showDiff: !0, truncateThreshold: 40, useProxy: !0, proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"] }; });
var te = M((Ve, Le) => {
    var ke = B("get-func-name"), nn = ie(), rn = ze(), on = G();
    Le.exports = sn;
    function sn(u, i, r, h) { var e = { showHidden: i, seen: [], stylize: function (t) { return t; } }; return ee(e, u, typeof r > "u" ? 2 : r); }
    var an = function (u) { return typeof HTMLElement == "object" ? u instanceof HTMLElement : u && typeof u == "object" && "nodeType" in u && u.nodeType === 1 && typeof u.nodeName == "string"; };
    function ee(u, i, r) {
        if (i && typeof i.inspect == "function" && i.inspect !== Ve.inspect && !(i.constructor && i.constructor.prototype === i)) {
            var h = i.inspect(r, u);
            return typeof h != "string" && (h = ee(u, h, r)), h;
        }
        var e = un(u, i);
        if (e)
            return e;
        if (an(i)) {
            if ("outerHTML" in i)
                return i.outerHTML;
            try {
                if (document.xmlVersion) {
                    var t = new XMLSerializer;
                    return t.serializeToString(i);
                }
                else {
                    var n = "http://www.w3.org/1999/xhtml", o = document.createElementNS(n, "_");
                    o.appendChild(i.cloneNode(!1));
                    var a = o.innerHTML.replace("><", ">" + i.innerHTML + "<");
                    return o.innerHTML = "", a;
                }
            }
            catch { }
        }
        var b = rn(i), m = u.showHidden ? nn(i) : b, E, F;
        if (m.length === 0 || ae(i) && (m.length === 1 && m[0] === "stack" || m.length === 2 && m[0] === "description" && m[1] === "stack")) {
            if (typeof i == "function")
                return E = ke(i), F = E ? ": " + E : "", u.stylize("[Function" + F + "]", "special");
            if (se(i))
                return u.stylize(RegExp.prototype.toString.call(i), "regexp");
            if (Fe(i))
                return u.stylize(Date.prototype.toUTCString.call(i), "date");
            if (ae(i))
                return Be(i);
        }
        var I = "", k = !1, R = !1, V = ["{", "}"];
        if (hn(i) && (R = !0, V = ["[", "]"]), ln(i) && (k = !0, V = ["[", "]"]), typeof i == "function" && (E = ke(i), F = E ? ": " + E : "", I = " [Function" + F + "]"), se(i) && (I = " " + RegExp.prototype.toString.call(i)), Fe(i) && (I = " " + Date.prototype.toUTCString.call(i)), ae(i))
            return Be(i);
        if (m.length === 0 && (!k || i.length == 0))
            return V[0] + I + V[1];
        if (r < 0)
            return se(i) ? u.stylize(RegExp.prototype.toString.call(i), "regexp") : u.stylize("[Object]", "special");
        u.seen.push(i);
        var U;
        if (k)
            U = fn(u, i, r, b, m);
        else {
            if (R)
                return cn(i);
            U = m.map(function (W) { return ue(u, i, r, b, W, k); });
        }
        return u.seen.pop(), dn(U, I, V);
    }
    function un(u, i) {
        switch (typeof i) {
            case "undefined": return u.stylize("undefined", "undefined");
            case "string":
                var r = "'" + JSON.stringify(i).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                return u.stylize(r, "string");
            case "number": return i === 0 && 1 / i === -1 / 0 ? u.stylize("-0", "number") : u.stylize("" + i, "number");
            case "boolean": return u.stylize("" + i, "boolean");
            case "symbol": return u.stylize(i.toString(), "symbol");
            case "bigint": return u.stylize(i.toString() + "n", "bigint");
        }
        if (i === null)
            return u.stylize("null", "null");
    }
    function Be(u) { return "[" + Error.prototype.toString.call(u) + "]"; }
    function fn(u, i, r, h, e) {
        for (var t = [], n = 0, o = i.length; n < o; ++n)
            Object.prototype.hasOwnProperty.call(i, String(n)) ? t.push(ue(u, i, r, h, String(n), !0)) : t.push("");
        return e.forEach(function (a) { a.match(/^\d+$/) || t.push(ue(u, i, r, h, a, !0)); }), t;
    }
    function cn(u) {
        for (var i = "[ ", r = 0; r < u.length; ++r) {
            if (i.length >= on.truncateThreshold - 7) {
                i += "...";
                break;
            }
            i += u[r] + ", ";
        }
        return i += " ]", i.indexOf(",  ]") !== -1 && (i = i.replace(",  ]", " ]")), i;
    }
    function ue(u, i, r, h, e, t) {
        var n, o = Object.getOwnPropertyDescriptor(i, e), a;
        if (o && (o.get ? o.set ? a = u.stylize("[Getter/Setter]", "special") : a = u.stylize("[Getter]", "special") : o.set && (a = u.stylize("[Setter]", "special"))), h.indexOf(e) < 0 && (n = "[" + e + "]"), a || (u.seen.indexOf(i[e]) < 0 ? (r === null ? a = ee(u, i[e], null) : a = ee(u, i[e], r - 1), a.indexOf(`
`) > -1 && (t ? a = a.split(`
`).map(function (b) { return "  " + b; }).join(`
`).substr(2) : a = `
` + a.split(`
`).map(function (b) { return "   " + b; }).join(`
`))) : a = u.stylize("[Circular]", "special")), typeof n > "u") {
            if (t && e.match(/^\d+$/))
                return a;
            n = JSON.stringify("" + e), n.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (n = n.substr(1, n.length - 2), n = u.stylize(n, "name")) : (n = n.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), n = u.stylize(n, "string"));
        }
        return n + ": " + a;
    }
    function dn(u, i, r) {
        var h = u.reduce(function (e, t) { return e + t.length + 1; }, 0);
        return h > 60 ? r[0] + (i === "" ? "" : i + `
 `) + " " + u.join(`,
  `) + " " + r[1] : r[0] + i + " " + u.join(", ") + " " + r[1];
    }
    function hn(u) { return typeof u == "object" && /\w+Array]$/.test(J(u)); }
    function ln(u) { return Array.isArray(u) || typeof u == "object" && J(u) === "[object Array]"; }
    function se(u) { return typeof u == "object" && J(u) === "[object RegExp]"; }
    function Fe(u) { return typeof u == "object" && J(u) === "[object Date]"; }
    function ae(u) { return typeof u == "object" && J(u) === "[object Error]"; }
    function J(u) { return Object.prototype.toString.call(u); }
});
var fe = M((ar, He) => {
    var pn = te(), Ke = G();
    He.exports = function (i) {
        var r = pn(i), h = Object.prototype.toString.call(i);
        if (Ke.truncateThreshold && r.length >= Ke.truncateThreshold) {
            if (h === "[object Function]")
                return !i.name || i.name === "" ? "[Function]" : "[Function: " + i.name + "]";
            if (h === "[object Array]")
                return "[ Array(" + i.length + ") ]";
            if (h === "[object Object]") {
                var e = Object.keys(i), t = e.length > 2 ? e.splice(0, 2).join(", ") + ", ..." : e.join(", ");
                return "{ Object (" + t + ") }";
            }
            else
                return r;
        }
        else
            return r;
    };
});
var Re = M((ur, Ge) => { var ce = z(), gn = oe(), de = fe(); Ge.exports = function (i, r) { var h = ce(i, "negate"), e = ce(i, "object"), t = r[3], n = gn(i, r), o = h ? r[2] : r[1], a = ce(i, "message"); return typeof o == "function" && (o = o()), o = o || "", o = o.replace(/#\{this\}/g, function () { return de(e); }).replace(/#\{act\}/g, function () { return de(n); }).replace(/#\{exp\}/g, function () { return de(t); }), a ? a + ": " + o : o; }; });
var L = M((fr, Ue) => {
    Ue.exports = function (i, r, h) {
        var e = i.__flags || (i.__flags = Object.create(null));
        r.__flags || (r.__flags = Object.create(null)), h = arguments.length === 3 ? h : !0;
        for (var t in e)
            (h || t !== "object" && t !== "ssfi" && t !== "lockSsfi" && t != "message") && (r.__flags[t] = e[t]);
    };
});
var Z = M((cr, $e) => { var bn = G(); $e.exports = function () { return bn.useProxy && typeof Proxy < "u" && typeof Reflect < "u"; }; });
var Ze = M((dr, Je) => {
    var yn = K(), We = z(), wn = Z(), mn = L();
    Je.exports = function (i, r, h) {
        h = h === void 0 ? function () { } : h, Object.defineProperty(i, r, { get: function e() {
                !wn() && !We(this, "lockSsfi") && We(this, "ssfi", e);
                var t = h.call(this);
                if (t !== void 0)
                    return t;
                var n = new yn.Assertion;
                return mn(this, n), n;
            }, configurable: !0 });
    };
});
var X = M((hr, Xe) => { var vn = Object.getOwnPropertyDescriptor(function () { }, "length"); Xe.exports = function (i, r, h) { return vn.configurable && Object.defineProperty(i, "length", { get: function () { throw Error(h ? "Invalid Chai property: " + r + '.length. Due to a compatibility issue, "length" cannot directly follow "' + r + '". Use "' + r + '.lengthOf" instead.' : "Invalid Chai property: " + r + '.length. See docs for proper usage of "' + r + '".'); } }), i; }; });
var Y = M((lr, _e) => {
    var xn = G(), Ye = z(), On = ie(), Mn = Z();
    var Qe = ["__flags", "__methods", "_obj", "assert"];
    _e.exports = function (i, r) {
        return Mn() ? new Proxy(i, { get: function h(e, t) {
                if (typeof t == "string" && xn.proxyExcludedKeys.indexOf(t) === -1 && !Reflect.has(e, t)) {
                    if (r)
                        throw Error("Invalid Chai property: " + r + "." + t + '. See docs for proper usage of "' + r + '".');
                    var n = null, o = 4;
                    throw On(e).forEach(function (a) {
                        if (!Object.prototype.hasOwnProperty(a) && Qe.indexOf(a) === -1) {
                            var b = qn(t, a, o);
                            b < o && (n = a, o = b);
                        }
                    }), Error(n !== null ? "Invalid Chai property: " + t + '. Did you mean "' + n + '"?' : "Invalid Chai property: " + t);
                }
                return Qe.indexOf(t) === -1 && !Ye(e, "lockSsfi") && Ye(e, "ssfi", h), Reflect.get(e, t);
            } }) : i;
    };
    function qn(u, i, r) {
        if (Math.abs(u.length - i.length) >= r)
            return r;
        for (var h = [], e = 0; e <= u.length; e++)
            h[e] = Array(i.length + 1).fill(0), h[e][0] = e;
        for (var t = 0; t < i.length; t++)
            h[0][t] = t;
        for (var e = 1; e <= u.length; e++)
            for (var n = u.charCodeAt(e - 1), t = 1; t <= i.length; t++) {
                if (Math.abs(e - t) >= r) {
                    h[e][t] = r;
                    continue;
                }
                h[e][t] = Math.min(h[e - 1][t] + 1, h[e][t - 1] + 1, h[e - 1][t - 1] + (n === i.charCodeAt(t - 1) ? 0 : 1));
            }
        return h[u.length][i.length];
    }
});
var nt = M((pr, tt) => {
    var jn = X(), Pn = K(), et = z(), Nn = Y(), En = L();
    tt.exports = function (i, r, h) {
        var e = function () {
            et(this, "lockSsfi") || et(this, "ssfi", e);
            var t = h.apply(this, arguments);
            if (t !== void 0)
                return t;
            var n = new Pn.Assertion;
            return En(this, n), n;
        };
        jn(e, r, !1), i[r] = Nn(e, r);
    };
});
var ot = M((gr, rt) => {
    var Sn = K(), Q = z(), An = Z(), Dn = L();
    rt.exports = function (i, r, h) {
        var e = Object.getOwnPropertyDescriptor(i, r), t = function () { };
        e && typeof e.get == "function" && (t = e.get), Object.defineProperty(i, r, { get: function n() {
                !An() && !Q(this, "lockSsfi") && Q(this, "ssfi", n);
                var o = Q(this, "lockSsfi");
                Q(this, "lockSsfi", !0);
                var a = h(t).call(this);
                if (Q(this, "lockSsfi", o), a !== void 0)
                    return a;
                var b = new Sn.Assertion;
                return Dn(this, b), b;
            }, configurable: !0 });
    };
});
var st = M((br, it) => {
    var Tn = X(), In = K(), _ = z(), zn = Y(), Cn = L();
    it.exports = function (i, r, h) {
        var e = i[r], t = function () { throw new Error(r + " is not a function"); };
        e && typeof e == "function" && (t = e);
        var n = function () {
            _(this, "lockSsfi") || _(this, "ssfi", n);
            var o = _(this, "lockSsfi");
            _(this, "lockSsfi", !0);
            var a = h(t).apply(this, arguments);
            if (_(this, "lockSsfi", o), a !== void 0)
                return a;
            var b = new In.Assertion;
            return Cn(this, b), b;
        };
        Tn(n, r, !1), i[r] = zn(n, r);
    };
});
var dt = M((yr, ct) => {
    var kn = X(), Bn = K(), at = z(), Fn = Y(), ut = L();
    var Vn = typeof Object.setPrototypeOf == "function", ft = function () { }, Ln = Object.getOwnPropertyNames(ft).filter(function (u) { var i = Object.getOwnPropertyDescriptor(ft, u); return typeof i != "object" ? !0 : !i.configurable; }), Kn = Function.prototype.call, Hn = Function.prototype.apply;
    ct.exports = function (i, r, h, e) {
        typeof e != "function" && (e = function () { });
        var t = { method: h, chainingBehavior: e };
        i.__methods || (i.__methods = {}), i.__methods[r] = t, Object.defineProperty(i, r, { get: function () {
                t.chainingBehavior.call(this);
                var o = function () {
                    at(this, "lockSsfi") || at(this, "ssfi", o);
                    var m = t.method.apply(this, arguments);
                    if (m !== void 0)
                        return m;
                    var E = new Bn.Assertion;
                    return ut(this, E), E;
                };
                if (kn(o, r, !0), Vn) {
                    var a = Object.create(this);
                    a.call = Kn, a.apply = Hn, Object.setPrototypeOf(o, a);
                }
                else {
                    var b = Object.getOwnPropertyNames(i);
                    b.forEach(function (m) {
                        if (Ln.indexOf(m) === -1) {
                            var E = Object.getOwnPropertyDescriptor(i, m);
                            Object.defineProperty(o, m, E);
                        }
                    });
                }
                return ut(this, o), Fn(o);
            }, configurable: !0 });
    };
});
var gt = M((wr, pt) => {
    var ht = K(), lt = L();
    pt.exports = function (i, r, h, e) {
        var t = i.__methods[r], n = t.chainingBehavior;
        t.chainingBehavior = function () {
            var b = e(n).call(this);
            if (b !== void 0)
                return b;
            var m = new ht.Assertion;
            return lt(this, m), m;
        };
        var o = t.method;
        t.method = function () {
            var b = h(o).apply(this, arguments);
            if (b !== void 0)
                return b;
            var m = new ht.Assertion;
            return lt(this, m), m;
        };
    };
});
var wt = M((mr, yt) => { var bt = te(); yt.exports = function (i, r) { return bt(i) < bt(r) ? -1 : 1; }; });
var he = M((vr, mt) => { mt.exports = function (i) { return typeof Object.getOwnPropertySymbols != "function" ? [] : Object.getOwnPropertySymbols(i).filter(function (r) { return Object.getOwnPropertyDescriptor(i, r).enumerable; }); }; });
var xt = M((xr, vt) => { var Gn = he(); vt.exports = function (i) { return Object.keys(i).concat(Gn(i)); }; });
var Mt = M((Or, Ot) => { function Rn(u) { return u !== u; } Ot.exports = Number.isNaN || Rn; });
var Pt = M((Mr, jt) => {
    var Un = B("type-detect"), qt = z();
    function $n(u) { var i = Un(u), r = ["Array", "Object", "function"]; return r.indexOf(i) !== -1; }
    jt.exports = function (i, r) {
        var h = qt(i, "operator"), e = qt(i, "negate"), t = r[3], n = e ? r[2] : r[1];
        if (h)
            return h;
        if (typeof n == "function" && (n = n()), n = n || "", !!n && !/\shave\s/.test(n)) {
            var o = $n(t);
            return /\snot\s/.test(n) ? o ? "notDeepStrictEqual" : "notStrictEqual" : o ? "deepStrictEqual" : "strictEqual";
        }
    };
});
var Et = M(j => { var Nt = B("pathval"); j.test = Ee(); j.type = B("type-detect"); j.expectTypes = Ae(); j.getMessage = Re(); j.getActual = oe(); j.inspect = te(); j.objDisplay = fe(); j.flag = z(); j.transferFlags = L(); j.eql = B("deep-eql"); j.getPathInfo = Nt.getPathInfo; j.hasProperty = Nt.hasProperty; j.getName = B("get-func-name"); j.addProperty = Ze(); j.addMethod = nt(); j.overwriteProperty = ot(); j.overwriteMethod = st(); j.addChainableMethod = dt(); j.overwriteChainableMethod = gt(); j.compareByInspect = wt(); j.getOwnEnumerablePropertySymbols = he(); j.getOwnEnumerableProperties = xt(); j.checkError = B("check-error"); j.proxify = Y(); j.addLengthGuard = X(); j.isProxyEnabled = Z(); j.isNaN = Mt(); j.getOperator = Pt(); });
var At = M((jr, St) => {
    var $ = G();
    St.exports = function (u, i) {
        var r = u.AssertionError, h = i.flag;
        u.Assertion = e;
        function e(t, n, o, a) { return h(this, "ssfi", o || e), h(this, "lockSsfi", a), h(this, "object", t), h(this, "message", n), i.proxify(this); }
        Object.defineProperty(e, "includeStack", { get: function () { return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."), $.includeStack; }, set: function (t) { console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."), $.includeStack = t; } }), Object.defineProperty(e, "showDiff", { get: function () { return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."), $.showDiff; }, set: function (t) { console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."), $.showDiff = t; } }), e.addProperty = function (t, n) { i.addProperty(this.prototype, t, n); }, e.addMethod = function (t, n) { i.addMethod(this.prototype, t, n); }, e.addChainableMethod = function (t, n, o) { i.addChainableMethod(this.prototype, t, n, o); }, e.overwriteProperty = function (t, n) { i.overwriteProperty(this.prototype, t, n); }, e.overwriteMethod = function (t, n) { i.overwriteMethod(this.prototype, t, n); }, e.overwriteChainableMethod = function (t, n, o) { i.overwriteChainableMethod(this.prototype, t, n, o); }, e.prototype.assert = function (t, n, o, a, b, m) {
            var E = i.test(this, arguments);
            if (m !== !1 && (m = !0), a === void 0 && b === void 0 && (m = !1), $.showDiff !== !0 && (m = !1), !E) {
                n = i.getMessage(this, arguments);
                var F = i.getActual(this, arguments), I = { actual: F, expected: a, showDiff: m }, k = i.getOperator(this, arguments);
                throw k && (I.operator = k), new r(n, I, $.includeStack ? this.assert : h(this, "ssfi"));
            }
        };
        Object.defineProperty(e.prototype, "_obj", { get: function () { return h(this, "object"); }, set: function (t) { h(this, "object", t); } });
    };
});
var Tt = M((Pr, Dt) => {
    Dt.exports = function (u, i) {
        var r = u.Assertion, h = u.AssertionError, e = i.flag;
        ["to", "be", "been", "is", "and", "has", "have", "with", "that", "which", "at", "of", "same", "but", "does", "still", "also"].forEach(function (s) { r.addProperty(s); }), r.addProperty("not", function () { e(this, "negate", !0); }), r.addProperty("deep", function () { e(this, "deep", !0); }), r.addProperty("nested", function () { e(this, "nested", !0); }), r.addProperty("own", function () { e(this, "own", !0); }), r.addProperty("ordered", function () { e(this, "ordered", !0); }), r.addProperty("any", function () { e(this, "any", !0), e(this, "all", !1); }), r.addProperty("all", function () { e(this, "all", !0), e(this, "any", !1); });
        function t(s, f) { f && e(this, "message", f), s = s.toLowerCase(); var d = e(this, "object"), l = ~["a", "e", "i", "o", "u"].indexOf(s.charAt(0)) ? "an " : "a "; this.assert(s === i.type(d).toLowerCase(), "expected #{this} to be " + l + s, "expected #{this} not to be " + l + s); }
        r.addChainableMethod("an", t), r.addChainableMethod("a", t);
        function n(s, f) { return i.isNaN(s) && i.isNaN(f) || s === f; }
        function o() { e(this, "contains", !0); }
        function a(s, f) {
            f && e(this, "message", f);
            var d = e(this, "object"), l = i.type(d).toLowerCase(), g = e(this, "message"), y = e(this, "negate"), p = e(this, "ssfi"), c = e(this, "deep"), w = c ? "deep " : "";
            g = g ? g + ": " : "";
            var v = !1;
            switch (l) {
                case "string":
                    v = d.indexOf(s) !== -1;
                    break;
                case "weakset":
                    if (c)
                        throw new h(g + "unable to use .deep.include with WeakSet", void 0, p);
                    v = d.has(s);
                    break;
                case "map":
                    var q = c ? i.eql : n;
                    d.forEach(function (N) { v = v || q(N, s); });
                    break;
                case "set":
                    c ? d.forEach(function (N) { v = v || i.eql(N, s); }) : v = d.has(s);
                    break;
                case "array":
                    c ? v = d.some(function (N) { return i.eql(N, s); }) : v = d.indexOf(s) !== -1;
                    break;
                default:
                    if (s !== Object(s))
                        throw new h(g + "the given combination of arguments (" + l + " and " + i.type(s).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + i.type(s).toLowerCase(), void 0, p);
                    var P = Object.keys(s), O = null, x = 0;
                    if (P.forEach(function (N) {
                        var S = new r(d);
                        if (i.transferFlags(this, S, !0), e(S, "lockSsfi", !0), !y || P.length === 1) {
                            S.property(N, s[N]);
                            return;
                        }
                        try {
                            S.property(N, s[N]);
                        }
                        catch (D) {
                            if (!i.checkError.compatibleConstructor(D, h))
                                throw D;
                            O === null && (O = D), x++;
                        }
                    }, this), y && P.length > 1 && x === P.length)
                        throw O;
                    return;
            }
            this.assert(v, "expected #{this} to " + w + "include " + i.inspect(s), "expected #{this} to not " + w + "include " + i.inspect(s));
        }
        r.addChainableMethod("include", a, o), r.addChainableMethod("contain", a, o), r.addChainableMethod("contains", a, o), r.addChainableMethod("includes", a, o), r.addProperty("ok", function () { this.assert(e(this, "object"), "expected #{this} to be truthy", "expected #{this} to be falsy"); }), r.addProperty("true", function () { this.assert(e(this, "object") === !0, "expected #{this} to be true", "expected #{this} to be false", !e(this, "negate")); }), r.addProperty("false", function () { this.assert(e(this, "object") === !1, "expected #{this} to be false", "expected #{this} to be true", !!e(this, "negate")); }), r.addProperty("null", function () { this.assert(e(this, "object") === null, "expected #{this} to be null", "expected #{this} not to be null"); }), r.addProperty("undefined", function () { this.assert(e(this, "object") === void 0, "expected #{this} to be undefined", "expected #{this} not to be undefined"); }), r.addProperty("NaN", function () { this.assert(i.isNaN(e(this, "object")), "expected #{this} to be NaN", "expected #{this} not to be NaN"); });
        function b() { var s = e(this, "object"); this.assert(s != null, "expected #{this} to exist", "expected #{this} to not exist"); }
        r.addProperty("exist", b), r.addProperty("exists", b), r.addProperty("empty", function () {
            var s = e(this, "object"), f = e(this, "ssfi"), d = e(this, "message"), l;
            switch (d = d ? d + ": " : "", i.type(s).toLowerCase()) {
                case "array":
                case "string":
                    l = s.length;
                    break;
                case "map":
                case "set":
                    l = s.size;
                    break;
                case "weakmap":
                case "weakset": throw new h(d + ".empty was passed a weak collection", void 0, f);
                case "function":
                    var g = d + ".empty was passed a function " + i.getName(s);
                    throw new h(g.trim(), void 0, f);
                default:
                    if (s !== Object(s))
                        throw new h(d + ".empty was passed non-string primitive " + i.inspect(s), void 0, f);
                    l = Object.keys(s).length;
            }
            this.assert(l === 0, "expected #{this} to be empty", "expected #{this} not to be empty");
        });
        function m() { var s = e(this, "object"), f = i.type(s); this.assert(f === "Arguments", "expected #{this} to be arguments but got " + f, "expected #{this} to not be arguments"); }
        r.addProperty("arguments", m), r.addProperty("Arguments", m);
        function E(s, f) {
            f && e(this, "message", f);
            var d = e(this, "object");
            if (e(this, "deep")) {
                var l = e(this, "lockSsfi");
                e(this, "lockSsfi", !0), this.eql(s), e(this, "lockSsfi", l);
            }
            else
                this.assert(s === d, "expected #{this} to equal #{exp}", "expected #{this} to not equal #{exp}", s, this._obj, !0);
        }
        r.addMethod("equal", E), r.addMethod("equals", E), r.addMethod("eq", E);
        function F(s, f) { f && e(this, "message", f), this.assert(i.eql(s, e(this, "object")), "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", s, this._obj, !0); }
        r.addMethod("eql", F), r.addMethod("eqls", F);
        function I(s, f) {
            f && e(this, "message", f);
            var d = e(this, "object"), l = e(this, "doLength"), g = e(this, "message"), y = g ? g + ": " : "", p = e(this, "ssfi"), c = i.type(d).toLowerCase(), w = i.type(s).toLowerCase(), v, q = !0;
            if (l && c !== "map" && c !== "set" && new r(d, g, p, !0).to.have.property("length"), !l && c === "date" && w !== "date")
                v = y + "the argument to above must be a date";
            else if (w !== "number" && (l || c === "number"))
                v = y + "the argument to above must be a number";
            else if (!l && c !== "date" && c !== "number") {
                var P = c === "string" ? "'" + d + "'" : d;
                v = y + "expected " + P + " to be a number or a date";
            }
            else
                q = !1;
            if (q)
                throw new h(v, void 0, p);
            if (l) {
                var O = "length", x;
                c === "map" || c === "set" ? (O = "size", x = d.size) : x = d.length, this.assert(x > s, "expected #{this} to have a " + O + " above #{exp} but got #{act}", "expected #{this} to not have a " + O + " above #{exp}", s, x);
            }
            else
                this.assert(d > s, "expected #{this} to be above #{exp}", "expected #{this} to be at most #{exp}", s);
        }
        r.addMethod("above", I), r.addMethod("gt", I), r.addMethod("greaterThan", I);
        function k(s, f) {
            f && e(this, "message", f);
            var d = e(this, "object"), l = e(this, "doLength"), g = e(this, "message"), y = g ? g + ": " : "", p = e(this, "ssfi"), c = i.type(d).toLowerCase(), w = i.type(s).toLowerCase(), v, q = !0;
            if (l && c !== "map" && c !== "set" && new r(d, g, p, !0).to.have.property("length"), !l && c === "date" && w !== "date")
                v = y + "the argument to least must be a date";
            else if (w !== "number" && (l || c === "number"))
                v = y + "the argument to least must be a number";
            else if (!l && c !== "date" && c !== "number") {
                var P = c === "string" ? "'" + d + "'" : d;
                v = y + "expected " + P + " to be a number or a date";
            }
            else
                q = !1;
            if (q)
                throw new h(v, void 0, p);
            if (l) {
                var O = "length", x;
                c === "map" || c === "set" ? (O = "size", x = d.size) : x = d.length, this.assert(x >= s, "expected #{this} to have a " + O + " at least #{exp} but got #{act}", "expected #{this} to have a " + O + " below #{exp}", s, x);
            }
            else
                this.assert(d >= s, "expected #{this} to be at least #{exp}", "expected #{this} to be below #{exp}", s);
        }
        r.addMethod("least", k), r.addMethod("gte", k), r.addMethod("greaterThanOrEqual", k);
        function R(s, f) {
            f && e(this, "message", f);
            var d = e(this, "object"), l = e(this, "doLength"), g = e(this, "message"), y = g ? g + ": " : "", p = e(this, "ssfi"), c = i.type(d).toLowerCase(), w = i.type(s).toLowerCase(), v, q = !0;
            if (l && c !== "map" && c !== "set" && new r(d, g, p, !0).to.have.property("length"), !l && c === "date" && w !== "date")
                v = y + "the argument to below must be a date";
            else if (w !== "number" && (l || c === "number"))
                v = y + "the argument to below must be a number";
            else if (!l && c !== "date" && c !== "number") {
                var P = c === "string" ? "'" + d + "'" : d;
                v = y + "expected " + P + " to be a number or a date";
            }
            else
                q = !1;
            if (q)
                throw new h(v, void 0, p);
            if (l) {
                var O = "length", x;
                c === "map" || c === "set" ? (O = "size", x = d.size) : x = d.length, this.assert(x < s, "expected #{this} to have a " + O + " below #{exp} but got #{act}", "expected #{this} to not have a " + O + " below #{exp}", s, x);
            }
            else
                this.assert(d < s, "expected #{this} to be below #{exp}", "expected #{this} to be at least #{exp}", s);
        }
        r.addMethod("below", R), r.addMethod("lt", R), r.addMethod("lessThan", R);
        function V(s, f) {
            f && e(this, "message", f);
            var d = e(this, "object"), l = e(this, "doLength"), g = e(this, "message"), y = g ? g + ": " : "", p = e(this, "ssfi"), c = i.type(d).toLowerCase(), w = i.type(s).toLowerCase(), v, q = !0;
            if (l && c !== "map" && c !== "set" && new r(d, g, p, !0).to.have.property("length"), !l && c === "date" && w !== "date")
                v = y + "the argument to most must be a date";
            else if (w !== "number" && (l || c === "number"))
                v = y + "the argument to most must be a number";
            else if (!l && c !== "date" && c !== "number") {
                var P = c === "string" ? "'" + d + "'" : d;
                v = y + "expected " + P + " to be a number or a date";
            }
            else
                q = !1;
            if (q)
                throw new h(v, void 0, p);
            if (l) {
                var O = "length", x;
                c === "map" || c === "set" ? (O = "size", x = d.size) : x = d.length, this.assert(x <= s, "expected #{this} to have a " + O + " at most #{exp} but got #{act}", "expected #{this} to have a " + O + " above #{exp}", s, x);
            }
            else
                this.assert(d <= s, "expected #{this} to be at most #{exp}", "expected #{this} to be above #{exp}", s);
        }
        r.addMethod("most", V), r.addMethod("lte", V), r.addMethod("lessThanOrEqual", V), r.addMethod("within", function (s, f, d) {
            d && e(this, "message", d);
            var l = e(this, "object"), g = e(this, "doLength"), y = e(this, "message"), p = y ? y + ": " : "", c = e(this, "ssfi"), w = i.type(l).toLowerCase(), v = i.type(s).toLowerCase(), q = i.type(f).toLowerCase(), P, O = !0, x = v === "date" && q === "date" ? s.toUTCString() + ".." + f.toUTCString() : s + ".." + f;
            if (g && w !== "map" && w !== "set" && new r(l, y, c, !0).to.have.property("length"), !g && w === "date" && (v !== "date" || q !== "date"))
                P = p + "the arguments to within must be dates";
            else if ((v !== "number" || q !== "number") && (g || w === "number"))
                P = p + "the arguments to within must be numbers";
            else if (!g && w !== "date" && w !== "number") {
                var N = w === "string" ? "'" + l + "'" : l;
                P = p + "expected " + N + " to be a number or a date";
            }
            else
                O = !1;
            if (O)
                throw new h(P, void 0, c);
            if (g) {
                var S = "length", D;
                w === "map" || w === "set" ? (S = "size", D = l.size) : D = l.length, this.assert(D >= s && D <= f, "expected #{this} to have a " + S + " within " + x, "expected #{this} to not have a " + S + " within " + x);
            }
            else
                this.assert(l >= s && l <= f, "expected #{this} to be within " + x, "expected #{this} to not be within " + x);
        });
        function U(s, f) {
            f && e(this, "message", f);
            var d = e(this, "object"), l = e(this, "ssfi"), g = e(this, "message");
            try {
                var y = d instanceof s;
            }
            catch (c) {
                throw c instanceof TypeError ? (g = g ? g + ": " : "", new h(g + "The instanceof assertion needs a constructor but " + i.type(s) + " was given.", void 0, l)) : c;
            }
            var p = i.getName(s);
            p === null && (p = "an unnamed constructor"), this.assert(y, "expected #{this} to be an instance of " + p, "expected #{this} to not be an instance of " + p);
        }
        r.addMethod("instanceof", U), r.addMethod("instanceOf", U);
        function W(s, f, d) {
            d && e(this, "message", d);
            var l = e(this, "nested"), g = e(this, "own"), y = e(this, "message"), p = e(this, "object"), c = e(this, "ssfi"), w = typeof s;
            if (y = y ? y + ": " : "", l) {
                if (w !== "string")
                    throw new h(y + "the argument to property must be a string when using nested syntax", void 0, c);
            }
            else if (w !== "string" && w !== "number" && w !== "symbol")
                throw new h(y + "the argument to property must be a string, number, or symbol", void 0, c);
            if (l && g)
                throw new h(y + 'The "nested" and "own" flags cannot be combined.', void 0, c);
            if (p == null)
                throw new h(y + "Target cannot be null or undefined.", void 0, c);
            var v = e(this, "deep"), q = e(this, "negate"), P = l ? i.getPathInfo(p, s) : null, O = l ? P.value : p[s], x = "";
            v && (x += "deep "), g && (x += "own "), l && (x += "nested "), x += "property ";
            var N;
            g ? N = Object.prototype.hasOwnProperty.call(p, s) : l ? N = P.exists : N = i.hasProperty(p, s), (!q || arguments.length === 1) && this.assert(N, "expected #{this} to have " + x + i.inspect(s), "expected #{this} to not have " + x + i.inspect(s)), arguments.length > 1 && this.assert(N && (v ? i.eql(f, O) : f === O), "expected #{this} to have " + x + i.inspect(s) + " of #{exp}, but got #{act}", "expected #{this} to not have " + x + i.inspect(s) + " of #{act}", f, O), e(this, "object", O);
        }
        r.addMethod("property", W);
        function le(s, f, d) { e(this, "own", !0), W.apply(this, arguments); }
        r.addMethod("ownProperty", le), r.addMethod("haveOwnProperty", le);
        function pe(s, f, d) { typeof f == "string" && (d = f, f = null), d && e(this, "message", d); var l = e(this, "object"), g = Object.getOwnPropertyDescriptor(Object(l), s); g && f ? this.assert(i.eql(f, g), "expected the own property descriptor for " + i.inspect(s) + " on #{this} to match " + i.inspect(f) + ", got " + i.inspect(g), "expected the own property descriptor for " + i.inspect(s) + " on #{this} to not match " + i.inspect(f), f, g, !0) : this.assert(g, "expected #{this} to have an own property descriptor for " + i.inspect(s), "expected #{this} to not have an own property descriptor for " + i.inspect(s)), e(this, "object", g); }
        r.addMethod("ownPropertyDescriptor", pe), r.addMethod("haveOwnPropertyDescriptor", pe);
        function ge() { e(this, "doLength", !0); }
        function be(s, f) {
            f && e(this, "message", f);
            var d = e(this, "object"), l = i.type(d).toLowerCase(), g = e(this, "message"), y = e(this, "ssfi"), p = "length", c;
            switch (l) {
                case "map":
                case "set":
                    p = "size", c = d.size;
                    break;
                default: new r(d, g, y, !0).to.have.property("length"), c = d.length;
            }
            this.assert(c == s, "expected #{this} to have a " + p + " of #{exp} but got #{act}", "expected #{this} to not have a " + p + " of #{act}", s, c);
        }
        r.addChainableMethod("length", be, ge), r.addChainableMethod("lengthOf", be, ge);
        function ye(s, f) { f && e(this, "message", f); var d = e(this, "object"); this.assert(s.exec(d), "expected #{this} to match " + s, "expected #{this} not to match " + s); }
        r.addMethod("match", ye), r.addMethod("matches", ye), r.addMethod("string", function (s, f) { f && e(this, "message", f); var d = e(this, "object"), l = e(this, "message"), g = e(this, "ssfi"); new r(d, l, g, !0).is.a("string"), this.assert(~d.indexOf(s), "expected #{this} to contain " + i.inspect(s), "expected #{this} to not contain " + i.inspect(s)); });
        function we(s) {
            var f = e(this, "object"), d = i.type(f), l = i.type(s), g = e(this, "ssfi"), y = e(this, "deep"), p, c = "", w, v = !0, q = e(this, "message");
            q = q ? q + ": " : "";
            var P = q + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
            if (d === "Map" || d === "Set")
                c = y ? "deeply " : "", w = [], f.forEach(function (A, H) { w.push(H); }), l !== "Array" && (s = Array.prototype.slice.call(arguments));
            else {
                switch (w = i.getOwnEnumerableProperties(f), l) {
                    case "Array":
                        if (arguments.length > 1)
                            throw new h(P, void 0, g);
                        break;
                    case "Object":
                        if (arguments.length > 1)
                            throw new h(P, void 0, g);
                        s = Object.keys(s);
                        break;
                    default: s = Array.prototype.slice.call(arguments);
                }
                s = s.map(function (A) { return typeof A == "symbol" ? A : String(A); });
            }
            if (!s.length)
                throw new h(q + "keys required", void 0, g);
            var O = s.length, x = e(this, "any"), N = e(this, "all"), S = s;
            if (!x && !N && (N = !0), x && (v = S.some(function (A) { return w.some(function (H) { return y ? i.eql(A, H) : A === H; }); })), N && (v = S.every(function (A) { return w.some(function (H) { return y ? i.eql(A, H) : A === H; }); }), e(this, "contains") || (v = v && s.length == w.length)), O > 1) {
                s = s.map(function (A) { return i.inspect(A); });
                var D = s.pop();
                N && (p = s.join(", ") + ", and " + D), x && (p = s.join(", ") + ", or " + D);
            }
            else
                p = i.inspect(s[0]);
            p = (O > 1 ? "keys " : "key ") + p, p = (e(this, "contains") ? "contain " : "have ") + p, this.assert(v, "expected #{this} to " + c + p, "expected #{this} to not " + c + p, S.slice(0).sort(i.compareByInspect), w.sort(i.compareByInspect), !0);
        }
        r.addMethod("keys", we), r.addMethod("key", we);
        function ne(s, f, d) {
            d && e(this, "message", d);
            var l = e(this, "object"), g = e(this, "ssfi"), y = e(this, "message"), p = e(this, "negate") || !1;
            new r(l, y, g, !0).is.a("function"), (s instanceof RegExp || typeof s == "string") && (f = s, s = null);
            var c;
            try {
                l();
            }
            catch (A) {
                c = A;
            }
            var w = s === void 0 && f === void 0, v = !!(s && f), q = !1, P = !1;
            if (w || !w && !p) {
                var O = "an error";
                s instanceof Error ? O = "#{exp}" : s && (O = i.checkError.getConstructorName(s)), this.assert(c, "expected #{this} to throw " + O, "expected #{this} to not throw an error but #{act} was thrown", s && s.toString(), c instanceof Error ? c.toString() : typeof c == "string" ? c : c && i.checkError.getConstructorName(c));
            }
            if (s && c) {
                if (s instanceof Error) {
                    var x = i.checkError.compatibleInstance(c, s);
                    x === p && (v && p ? q = !0 : this.assert(p, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (c && !p ? " but #{act} was thrown" : ""), s.toString(), c.toString()));
                }
                var N = i.checkError.compatibleConstructor(c, s);
                N === p && (v && p ? q = !0 : this.assert(p, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (c ? " but #{act} was thrown" : ""), s instanceof Error ? s.toString() : s && i.checkError.getConstructorName(s), c instanceof Error ? c.toString() : c && i.checkError.getConstructorName(c)));
            }
            if (c && f !== void 0 && f !== null) {
                var S = "including";
                f instanceof RegExp && (S = "matching");
                var D = i.checkError.compatibleMessage(c, f);
                D === p && (v && p ? P = !0 : this.assert(p, "expected #{this} to throw error " + S + " #{exp} but got #{act}", "expected #{this} to throw error not " + S + " #{exp}", f, i.checkError.getMessage(c)));
            }
            q && P && this.assert(p, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (c ? " but #{act} was thrown" : ""), s instanceof Error ? s.toString() : s && i.checkError.getConstructorName(s), c instanceof Error ? c.toString() : c && i.checkError.getConstructorName(c)), e(this, "object", c);
        }
        r.addMethod("throw", ne), r.addMethod("throws", ne), r.addMethod("Throw", ne);
        function me(s, f) { f && e(this, "message", f); var d = e(this, "object"), l = e(this, "itself"), g = typeof d == "function" && !l ? d.prototype[s] : d[s]; this.assert(typeof g == "function", "expected #{this} to respond to " + i.inspect(s), "expected #{this} to not respond to " + i.inspect(s)); }
        r.addMethod("respondTo", me), r.addMethod("respondsTo", me), r.addProperty("itself", function () { e(this, "itself", !0); });
        function ve(s, f) { f && e(this, "message", f); var d = e(this, "object"), l = s(d); this.assert(l, "expected #{this} to satisfy " + i.objDisplay(s), "expected #{this} to not satisfy" + i.objDisplay(s), !e(this, "negate"), l); }
        r.addMethod("satisfy", ve), r.addMethod("satisfies", ve);
        function xe(s, f, d) {
            d && e(this, "message", d);
            var l = e(this, "object"), g = e(this, "message"), y = e(this, "ssfi");
            if (new r(l, g, y, !0).is.a("number"), typeof s != "number" || typeof f != "number") {
                g = g ? g + ": " : "";
                var p = f === void 0 ? ", and a delta is required" : "";
                throw new h(g + "the arguments to closeTo or approximately must be numbers" + p, void 0, y);
            }
            this.assert(Math.abs(l - s) <= f, "expected #{this} to be close to " + s + " +/- " + f, "expected #{this} not to be close to " + s + " +/- " + f);
        }
        r.addMethod("closeTo", xe), r.addMethod("approximately", xe);
        function Gt(s, f, d, l, g) {
            if (!l) {
                if (s.length !== f.length)
                    return !1;
                f = f.slice();
            }
            return s.every(function (y, p) {
                if (g)
                    return d ? d(y, f[p]) : y === f[p];
                if (!d) {
                    var c = f.indexOf(y);
                    return c === -1 ? !1 : (l || f.splice(c, 1), !0);
                }
                return f.some(function (w, v) { return d(y, w) ? (l || f.splice(v, 1), !0) : !1; });
            });
        }
        r.addMethod("members", function (s, f) { f && e(this, "message", f); var d = e(this, "object"), l = e(this, "message"), g = e(this, "ssfi"); new r(d, l, g, !0).to.be.an("array"), new r(s, l, g, !0).to.be.an("array"); var y = e(this, "contains"), p = e(this, "ordered"), c, w, v; y ? (c = p ? "an ordered superset" : "a superset", w = "expected #{this} to be " + c + " of #{exp}", v = "expected #{this} to not be " + c + " of #{exp}") : (c = p ? "ordered members" : "members", w = "expected #{this} to have the same " + c + " as #{exp}", v = "expected #{this} to not have the same " + c + " as #{exp}"); var q = e(this, "deep") ? i.eql : void 0; this.assert(Gt(s, d, q, y, p), w, v, s, d, !0); });
        function Rt(s, f) { f && e(this, "message", f); var d = e(this, "object"), l = e(this, "message"), g = e(this, "ssfi"), y = e(this, "contains"), p = e(this, "deep"); new r(s, l, g, !0).to.be.an("array"), y ? this.assert(s.some(function (c) { return d.indexOf(c) > -1; }), "expected #{this} to contain one of #{exp}", "expected #{this} to not contain one of #{exp}", s, d) : p ? this.assert(s.some(function (c) { return i.eql(d, c); }), "expected #{this} to deeply equal one of #{exp}", "expected #{this} to deeply equal one of #{exp}", s, d) : this.assert(s.indexOf(d) > -1, "expected #{this} to be one of #{exp}", "expected #{this} to not be one of #{exp}", s, d); }
        r.addMethod("oneOf", Rt);
        function Oe(s, f, d) { d && e(this, "message", d); var l = e(this, "object"), g = e(this, "message"), y = e(this, "ssfi"); new r(l, g, y, !0).is.a("function"); var p; f ? (new r(s, g, y, !0).to.have.property(f), p = s[f]) : (new r(s, g, y, !0).is.a("function"), p = s()), l(); var c = f == null ? s() : s[f], w = f == null ? p : "." + f; e(this, "deltaMsgObj", w), e(this, "initialDeltaValue", p), e(this, "finalDeltaValue", c), e(this, "deltaBehavior", "change"), e(this, "realDelta", c !== p), this.assert(p !== c, "expected " + w + " to change", "expected " + w + " to not change"); }
        r.addMethod("change", Oe), r.addMethod("changes", Oe);
        function Me(s, f, d) { d && e(this, "message", d); var l = e(this, "object"), g = e(this, "message"), y = e(this, "ssfi"); new r(l, g, y, !0).is.a("function"); var p; f ? (new r(s, g, y, !0).to.have.property(f), p = s[f]) : (new r(s, g, y, !0).is.a("function"), p = s()), new r(p, g, y, !0).is.a("number"), l(); var c = f == null ? s() : s[f], w = f == null ? p : "." + f; e(this, "deltaMsgObj", w), e(this, "initialDeltaValue", p), e(this, "finalDeltaValue", c), e(this, "deltaBehavior", "increase"), e(this, "realDelta", c - p), this.assert(c - p > 0, "expected " + w + " to increase", "expected " + w + " to not increase"); }
        r.addMethod("increase", Me), r.addMethod("increases", Me);
        function qe(s, f, d) { d && e(this, "message", d); var l = e(this, "object"), g = e(this, "message"), y = e(this, "ssfi"); new r(l, g, y, !0).is.a("function"); var p; f ? (new r(s, g, y, !0).to.have.property(f), p = s[f]) : (new r(s, g, y, !0).is.a("function"), p = s()), new r(p, g, y, !0).is.a("number"), l(); var c = f == null ? s() : s[f], w = f == null ? p : "." + f; e(this, "deltaMsgObj", w), e(this, "initialDeltaValue", p), e(this, "finalDeltaValue", c), e(this, "deltaBehavior", "decrease"), e(this, "realDelta", p - c), this.assert(c - p < 0, "expected " + w + " to decrease", "expected " + w + " to not decrease"); }
        r.addMethod("decrease", qe), r.addMethod("decreases", qe);
        function Ut(s, f) { f && e(this, "message", f); var d = e(this, "deltaMsgObj"), l = e(this, "initialDeltaValue"), g = e(this, "finalDeltaValue"), y = e(this, "deltaBehavior"), p = e(this, "realDelta"), c; y === "change" ? c = Math.abs(g - l) === Math.abs(s) : c = p === Math.abs(s), this.assert(c, "expected " + d + " to " + y + " by " + s, "expected " + d + " to not " + y + " by " + s); }
        r.addMethod("by", Ut), r.addProperty("extensible", function () { var s = e(this, "object"), f = s === Object(s) && Object.isExtensible(s); this.assert(f, "expected #{this} to be extensible", "expected #{this} to not be extensible"); }), r.addProperty("sealed", function () { var s = e(this, "object"), f = s === Object(s) ? Object.isSealed(s) : !0; this.assert(f, "expected #{this} to be sealed", "expected #{this} to not be sealed"); }), r.addProperty("frozen", function () { var s = e(this, "object"), f = s === Object(s) ? Object.isFrozen(s) : !0; this.assert(f, "expected #{this} to be frozen", "expected #{this} to not be frozen"); }), r.addProperty("finite", function (s) { var f = e(this, "object"); this.assert(typeof f == "number" && isFinite(f), "expected #{this} to be a finite number", "expected #{this} to not be a finite number"); });
    };
});
var zt = M((Nr, It) => { It.exports = function (u, i) { u.expect = function (r, h) { return new u.Assertion(r, h); }, u.expect.fail = function (r, h, e, t) { throw arguments.length < 2 && (e = r, r = void 0), e = e || "expect.fail()", new u.AssertionError(e, { actual: r, expected: h, operator: t }, u.expect.fail); }; }; });
var kt = M((Er, Ct) => { Ct.exports = function (u, i) { var r = u.Assertion; function h() { function e() { return this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol == "function" && this instanceof Symbol || typeof BigInt == "function" && this instanceof BigInt ? new r(this.valueOf(), null, e) : new r(this, null, e); } function t(o) { Object.defineProperty(this, "should", { value: o, enumerable: !0, configurable: !0, writable: !0 }); } Object.defineProperty(Object.prototype, "should", { set: t, get: e, configurable: !0 }); var n = {}; return n.fail = function (o, a, b, m) { throw arguments.length < 2 && (b = o, o = void 0), b = b || "should.fail()", new u.AssertionError(b, { actual: o, expected: a, operator: m }, n.fail); }, n.equal = function (o, a, b) { new r(o, b).to.equal(a); }, n.Throw = function (o, a, b, m) { new r(o, m).to.Throw(a, b); }, n.exist = function (o, a) { new r(o, a).to.exist; }, n.not = {}, n.not.equal = function (o, a, b) { new r(o, b).to.not.equal(a); }, n.not.Throw = function (o, a, b, m) { new r(o, m).to.not.Throw(a, b); }, n.not.exist = function (o, a) { new r(o, a).to.not.exist; }, n.throw = n.Throw, n.not.throw = n.not.Throw, n; } u.should = h, u.Should = h; }; });
var Ft = M((Sr, Bt) => {
    Bt.exports = function (u, i) {
        var r = u.Assertion, h = i.flag;
        var e = u.assert = function (t, n) { var o = new r(null, null, u.assert, !0); o.assert(t, n, "[ negation message unavailable ]"); };
        e.fail = function (t, n, o, a) { throw arguments.length < 2 && (o = t, t = void 0), o = o || "assert.fail()", new u.AssertionError(o, { actual: t, expected: n, operator: a }, e.fail); }, e.isOk = function (t, n) { new r(t, n, e.isOk, !0).is.ok; }, e.isNotOk = function (t, n) { new r(t, n, e.isNotOk, !0).is.not.ok; }, e.equal = function (t, n, o) { var a = new r(t, o, e.equal, !0); a.assert(n == h(a, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", n, t, !0); }, e.notEqual = function (t, n, o) { var a = new r(t, o, e.notEqual, !0); a.assert(n != h(a, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", n, t, !0); }, e.strictEqual = function (t, n, o) { new r(t, o, e.strictEqual, !0).to.equal(n); }, e.notStrictEqual = function (t, n, o) { new r(t, o, e.notStrictEqual, !0).to.not.equal(n); }, e.deepEqual = e.deepStrictEqual = function (t, n, o) { new r(t, o, e.deepEqual, !0).to.eql(n); }, e.notDeepEqual = function (t, n, o) { new r(t, o, e.notDeepEqual, !0).to.not.eql(n); }, e.isAbove = function (t, n, o) { new r(t, o, e.isAbove, !0).to.be.above(n); }, e.isAtLeast = function (t, n, o) { new r(t, o, e.isAtLeast, !0).to.be.least(n); }, e.isBelow = function (t, n, o) { new r(t, o, e.isBelow, !0).to.be.below(n); }, e.isAtMost = function (t, n, o) { new r(t, o, e.isAtMost, !0).to.be.most(n); }, e.isTrue = function (t, n) { new r(t, n, e.isTrue, !0).is.true; }, e.isNotTrue = function (t, n) { new r(t, n, e.isNotTrue, !0).to.not.equal(!0); }, e.isFalse = function (t, n) { new r(t, n, e.isFalse, !0).is.false; }, e.isNotFalse = function (t, n) { new r(t, n, e.isNotFalse, !0).to.not.equal(!1); }, e.isNull = function (t, n) { new r(t, n, e.isNull, !0).to.equal(null); }, e.isNotNull = function (t, n) { new r(t, n, e.isNotNull, !0).to.not.equal(null); }, e.isNaN = function (t, n) { new r(t, n, e.isNaN, !0).to.be.NaN; }, e.isNotNaN = function (t, n) { new r(t, n, e.isNotNaN, !0).not.to.be.NaN; }, e.exists = function (t, n) { new r(t, n, e.exists, !0).to.exist; }, e.notExists = function (t, n) { new r(t, n, e.notExists, !0).to.not.exist; }, e.isUndefined = function (t, n) { new r(t, n, e.isUndefined, !0).to.equal(void 0); }, e.isDefined = function (t, n) { new r(t, n, e.isDefined, !0).to.not.equal(void 0); }, e.isFunction = function (t, n) { new r(t, n, e.isFunction, !0).to.be.a("function"); }, e.isNotFunction = function (t, n) { new r(t, n, e.isNotFunction, !0).to.not.be.a("function"); }, e.isObject = function (t, n) { new r(t, n, e.isObject, !0).to.be.a("object"); }, e.isNotObject = function (t, n) { new r(t, n, e.isNotObject, !0).to.not.be.a("object"); }, e.isArray = function (t, n) { new r(t, n, e.isArray, !0).to.be.an("array"); }, e.isNotArray = function (t, n) { new r(t, n, e.isNotArray, !0).to.not.be.an("array"); }, e.isString = function (t, n) { new r(t, n, e.isString, !0).to.be.a("string"); }, e.isNotString = function (t, n) { new r(t, n, e.isNotString, !0).to.not.be.a("string"); }, e.isNumber = function (t, n) { new r(t, n, e.isNumber, !0).to.be.a("number"); }, e.isNotNumber = function (t, n) { new r(t, n, e.isNotNumber, !0).to.not.be.a("number"); }, e.isFinite = function (t, n) { new r(t, n, e.isFinite, !0).to.be.finite; }, e.isBoolean = function (t, n) { new r(t, n, e.isBoolean, !0).to.be.a("boolean"); }, e.isNotBoolean = function (t, n) { new r(t, n, e.isNotBoolean, !0).to.not.be.a("boolean"); }, e.typeOf = function (t, n, o) { new r(t, o, e.typeOf, !0).to.be.a(n); }, e.notTypeOf = function (t, n, o) { new r(t, o, e.notTypeOf, !0).to.not.be.a(n); }, e.instanceOf = function (t, n, o) { new r(t, o, e.instanceOf, !0).to.be.instanceOf(n); }, e.notInstanceOf = function (t, n, o) { new r(t, o, e.notInstanceOf, !0).to.not.be.instanceOf(n); }, e.include = function (t, n, o) { new r(t, o, e.include, !0).include(n); }, e.notInclude = function (t, n, o) { new r(t, o, e.notInclude, !0).not.include(n); }, e.deepInclude = function (t, n, o) { new r(t, o, e.deepInclude, !0).deep.include(n); }, e.notDeepInclude = function (t, n, o) { new r(t, o, e.notDeepInclude, !0).not.deep.include(n); }, e.nestedInclude = function (t, n, o) { new r(t, o, e.nestedInclude, !0).nested.include(n); }, e.notNestedInclude = function (t, n, o) { new r(t, o, e.notNestedInclude, !0).not.nested.include(n); }, e.deepNestedInclude = function (t, n, o) { new r(t, o, e.deepNestedInclude, !0).deep.nested.include(n); }, e.notDeepNestedInclude = function (t, n, o) { new r(t, o, e.notDeepNestedInclude, !0).not.deep.nested.include(n); }, e.ownInclude = function (t, n, o) { new r(t, o, e.ownInclude, !0).own.include(n); }, e.notOwnInclude = function (t, n, o) { new r(t, o, e.notOwnInclude, !0).not.own.include(n); }, e.deepOwnInclude = function (t, n, o) { new r(t, o, e.deepOwnInclude, !0).deep.own.include(n); }, e.notDeepOwnInclude = function (t, n, o) { new r(t, o, e.notDeepOwnInclude, !0).not.deep.own.include(n); }, e.match = function (t, n, o) { new r(t, o, e.match, !0).to.match(n); }, e.notMatch = function (t, n, o) { new r(t, o, e.notMatch, !0).to.not.match(n); }, e.property = function (t, n, o) { new r(t, o, e.property, !0).to.have.property(n); }, e.notProperty = function (t, n, o) { new r(t, o, e.notProperty, !0).to.not.have.property(n); }, e.propertyVal = function (t, n, o, a) { new r(t, a, e.propertyVal, !0).to.have.property(n, o); }, e.notPropertyVal = function (t, n, o, a) { new r(t, a, e.notPropertyVal, !0).to.not.have.property(n, o); }, e.deepPropertyVal = function (t, n, o, a) { new r(t, a, e.deepPropertyVal, !0).to.have.deep.property(n, o); }, e.notDeepPropertyVal = function (t, n, o, a) { new r(t, a, e.notDeepPropertyVal, !0).to.not.have.deep.property(n, o); }, e.ownProperty = function (t, n, o) { new r(t, o, e.ownProperty, !0).to.have.own.property(n); }, e.notOwnProperty = function (t, n, o) { new r(t, o, e.notOwnProperty, !0).to.not.have.own.property(n); }, e.ownPropertyVal = function (t, n, o, a) { new r(t, a, e.ownPropertyVal, !0).to.have.own.property(n, o); }, e.notOwnPropertyVal = function (t, n, o, a) { new r(t, a, e.notOwnPropertyVal, !0).to.not.have.own.property(n, o); }, e.deepOwnPropertyVal = function (t, n, o, a) { new r(t, a, e.deepOwnPropertyVal, !0).to.have.deep.own.property(n, o); }, e.notDeepOwnPropertyVal = function (t, n, o, a) { new r(t, a, e.notDeepOwnPropertyVal, !0).to.not.have.deep.own.property(n, o); }, e.nestedProperty = function (t, n, o) { new r(t, o, e.nestedProperty, !0).to.have.nested.property(n); }, e.notNestedProperty = function (t, n, o) { new r(t, o, e.notNestedProperty, !0).to.not.have.nested.property(n); }, e.nestedPropertyVal = function (t, n, o, a) { new r(t, a, e.nestedPropertyVal, !0).to.have.nested.property(n, o); }, e.notNestedPropertyVal = function (t, n, o, a) { new r(t, a, e.notNestedPropertyVal, !0).to.not.have.nested.property(n, o); }, e.deepNestedPropertyVal = function (t, n, o, a) { new r(t, a, e.deepNestedPropertyVal, !0).to.have.deep.nested.property(n, o); }, e.notDeepNestedPropertyVal = function (t, n, o, a) { new r(t, a, e.notDeepNestedPropertyVal, !0).to.not.have.deep.nested.property(n, o); }, e.lengthOf = function (t, n, o) { new r(t, o, e.lengthOf, !0).to.have.lengthOf(n); }, e.hasAnyKeys = function (t, n, o) { new r(t, o, e.hasAnyKeys, !0).to.have.any.keys(n); }, e.hasAllKeys = function (t, n, o) { new r(t, o, e.hasAllKeys, !0).to.have.all.keys(n); }, e.containsAllKeys = function (t, n, o) { new r(t, o, e.containsAllKeys, !0).to.contain.all.keys(n); }, e.doesNotHaveAnyKeys = function (t, n, o) { new r(t, o, e.doesNotHaveAnyKeys, !0).to.not.have.any.keys(n); }, e.doesNotHaveAllKeys = function (t, n, o) { new r(t, o, e.doesNotHaveAllKeys, !0).to.not.have.all.keys(n); }, e.hasAnyDeepKeys = function (t, n, o) { new r(t, o, e.hasAnyDeepKeys, !0).to.have.any.deep.keys(n); }, e.hasAllDeepKeys = function (t, n, o) { new r(t, o, e.hasAllDeepKeys, !0).to.have.all.deep.keys(n); }, e.containsAllDeepKeys = function (t, n, o) { new r(t, o, e.containsAllDeepKeys, !0).to.contain.all.deep.keys(n); }, e.doesNotHaveAnyDeepKeys = function (t, n, o) { new r(t, o, e.doesNotHaveAnyDeepKeys, !0).to.not.have.any.deep.keys(n); }, e.doesNotHaveAllDeepKeys = function (t, n, o) { new r(t, o, e.doesNotHaveAllDeepKeys, !0).to.not.have.all.deep.keys(n); }, e.throws = function (t, n, o, a) { (typeof n == "string" || n instanceof RegExp) && (o = n, n = null); var b = new r(t, a, e.throws, !0).to.throw(n, o); return h(b, "object"); }, e.doesNotThrow = function (t, n, o, a) { (typeof n == "string" || n instanceof RegExp) && (o = n, n = null), new r(t, a, e.doesNotThrow, !0).to.not.throw(n, o); }, e.operator = function (t, n, o, a) {
            var b;
            switch (n) {
                case "==":
                    b = t == o;
                    break;
                case "===":
                    b = t === o;
                    break;
                case ">":
                    b = t > o;
                    break;
                case ">=":
                    b = t >= o;
                    break;
                case "<":
                    b = t < o;
                    break;
                case "<=":
                    b = t <= o;
                    break;
                case "!=":
                    b = t != o;
                    break;
                case "!==":
                    b = t !== o;
                    break;
                default: throw a = a && a + ": ", new u.AssertionError(a + 'Invalid operator "' + n + '"', void 0, e.operator);
            }
            var m = new r(b, a, e.operator, !0);
            m.assert(h(m, "object") === !0, "expected " + i.inspect(t) + " to be " + n + " " + i.inspect(o), "expected " + i.inspect(t) + " to not be " + n + " " + i.inspect(o));
        }, e.closeTo = function (t, n, o, a) { new r(t, a, e.closeTo, !0).to.be.closeTo(n, o); }, e.approximately = function (t, n, o, a) { new r(t, a, e.approximately, !0).to.be.approximately(n, o); }, e.sameMembers = function (t, n, o) { new r(t, o, e.sameMembers, !0).to.have.same.members(n); }, e.notSameMembers = function (t, n, o) { new r(t, o, e.notSameMembers, !0).to.not.have.same.members(n); }, e.sameDeepMembers = function (t, n, o) { new r(t, o, e.sameDeepMembers, !0).to.have.same.deep.members(n); }, e.notSameDeepMembers = function (t, n, o) { new r(t, o, e.notSameDeepMembers, !0).to.not.have.same.deep.members(n); }, e.sameOrderedMembers = function (t, n, o) { new r(t, o, e.sameOrderedMembers, !0).to.have.same.ordered.members(n); }, e.notSameOrderedMembers = function (t, n, o) { new r(t, o, e.notSameOrderedMembers, !0).to.not.have.same.ordered.members(n); }, e.sameDeepOrderedMembers = function (t, n, o) { new r(t, o, e.sameDeepOrderedMembers, !0).to.have.same.deep.ordered.members(n); }, e.notSameDeepOrderedMembers = function (t, n, o) { new r(t, o, e.notSameDeepOrderedMembers, !0).to.not.have.same.deep.ordered.members(n); }, e.includeMembers = function (t, n, o) { new r(t, o, e.includeMembers, !0).to.include.members(n); }, e.notIncludeMembers = function (t, n, o) { new r(t, o, e.notIncludeMembers, !0).to.not.include.members(n); }, e.includeDeepMembers = function (t, n, o) { new r(t, o, e.includeDeepMembers, !0).to.include.deep.members(n); }, e.notIncludeDeepMembers = function (t, n, o) { new r(t, o, e.notIncludeDeepMembers, !0).to.not.include.deep.members(n); }, e.includeOrderedMembers = function (t, n, o) { new r(t, o, e.includeOrderedMembers, !0).to.include.ordered.members(n); }, e.notIncludeOrderedMembers = function (t, n, o) { new r(t, o, e.notIncludeOrderedMembers, !0).to.not.include.ordered.members(n); }, e.includeDeepOrderedMembers = function (t, n, o) { new r(t, o, e.includeDeepOrderedMembers, !0).to.include.deep.ordered.members(n); }, e.notIncludeDeepOrderedMembers = function (t, n, o) { new r(t, o, e.notIncludeDeepOrderedMembers, !0).to.not.include.deep.ordered.members(n); }, e.oneOf = function (t, n, o) { new r(t, o, e.oneOf, !0).to.be.oneOf(n); }, e.changes = function (t, n, o, a) { arguments.length === 3 && typeof n == "function" && (a = o, o = null), new r(t, a, e.changes, !0).to.change(n, o); }, e.changesBy = function (t, n, o, a, b) {
            if (arguments.length === 4 && typeof n == "function") {
                var m = a;
                a = o, b = m;
            }
            else
                arguments.length === 3 && (a = o, o = null);
            new r(t, b, e.changesBy, !0).to.change(n, o).by(a);
        }, e.doesNotChange = function (t, n, o, a) { return arguments.length === 3 && typeof n == "function" && (a = o, o = null), new r(t, a, e.doesNotChange, !0).to.not.change(n, o); }, e.changesButNotBy = function (t, n, o, a, b) {
            if (arguments.length === 4 && typeof n == "function") {
                var m = a;
                a = o, b = m;
            }
            else
                arguments.length === 3 && (a = o, o = null);
            new r(t, b, e.changesButNotBy, !0).to.change(n, o).but.not.by(a);
        }, e.increases = function (t, n, o, a) { return arguments.length === 3 && typeof n == "function" && (a = o, o = null), new r(t, a, e.increases, !0).to.increase(n, o); }, e.increasesBy = function (t, n, o, a, b) {
            if (arguments.length === 4 && typeof n == "function") {
                var m = a;
                a = o, b = m;
            }
            else
                arguments.length === 3 && (a = o, o = null);
            new r(t, b, e.increasesBy, !0).to.increase(n, o).by(a);
        }, e.doesNotIncrease = function (t, n, o, a) { return arguments.length === 3 && typeof n == "function" && (a = o, o = null), new r(t, a, e.doesNotIncrease, !0).to.not.increase(n, o); }, e.increasesButNotBy = function (t, n, o, a, b) {
            if (arguments.length === 4 && typeof n == "function") {
                var m = a;
                a = o, b = m;
            }
            else
                arguments.length === 3 && (a = o, o = null);
            new r(t, b, e.increasesButNotBy, !0).to.increase(n, o).but.not.by(a);
        }, e.decreases = function (t, n, o, a) { return arguments.length === 3 && typeof n == "function" && (a = o, o = null), new r(t, a, e.decreases, !0).to.decrease(n, o); }, e.decreasesBy = function (t, n, o, a, b) {
            if (arguments.length === 4 && typeof n == "function") {
                var m = a;
                a = o, b = m;
            }
            else
                arguments.length === 3 && (a = o, o = null);
            new r(t, b, e.decreasesBy, !0).to.decrease(n, o).by(a);
        }, e.doesNotDecrease = function (t, n, o, a) { return arguments.length === 3 && typeof n == "function" && (a = o, o = null), new r(t, a, e.doesNotDecrease, !0).to.not.decrease(n, o); }, e.doesNotDecreaseBy = function (t, n, o, a, b) {
            if (arguments.length === 4 && typeof n == "function") {
                var m = a;
                a = o, b = m;
            }
            else
                arguments.length === 3 && (a = o, o = null);
            return new r(t, b, e.doesNotDecreaseBy, !0).to.not.decrease(n, o).by(a);
        }, e.decreasesButNotBy = function (t, n, o, a, b) {
            if (arguments.length === 4 && typeof n == "function") {
                var m = a;
                a = o, b = m;
            }
            else
                arguments.length === 3 && (a = o, o = null);
            new r(t, b, e.decreasesButNotBy, !0).to.decrease(n, o).but.not.by(a);
        };
        e.ifError = function (t) {
            if (t)
                throw t;
        }, e.isExtensible = function (t, n) { new r(t, n, e.isExtensible, !0).to.be.extensible; }, e.isNotExtensible = function (t, n) { new r(t, n, e.isNotExtensible, !0).to.not.be.extensible; }, e.isSealed = function (t, n) { new r(t, n, e.isSealed, !0).to.be.sealed; }, e.isNotSealed = function (t, n) { new r(t, n, e.isNotSealed, !0).to.not.be.sealed; }, e.isFrozen = function (t, n) { new r(t, n, e.isFrozen, !0).to.be.frozen; }, e.isNotFrozen = function (t, n) { new r(t, n, e.isNotFrozen, !0).to.not.be.frozen; }, e.isEmpty = function (t, n) { new r(t, n, e.isEmpty, !0).to.be.empty; }, e.isNotEmpty = function (t, n) { new r(t, n, e.isNotEmpty, !0).to.not.be.empty; };
        (function t(n, o) { return e[o] = e[n], t; })("isOk", "ok")("isNotOk", "notOk")("throws", "throw")("throws", "Throw")("isExtensible", "extensible")("isNotExtensible", "notExtensible")("isSealed", "sealed")("isNotSealed", "notSealed")("isFrozen", "frozen")("isNotFrozen", "notFrozen")("isEmpty", "empty")("isNotEmpty", "notEmpty");
    };
});
var K = M(T => { var Vt = []; T.version = "4.3.3"; T.AssertionError = B("assertion-error"); var Lt = Et(); T.use = function (u) { return ~Vt.indexOf(u) || (u(T, Lt), Vt.push(u)), T; }; T.util = Lt; var Wn = G(); T.config = Wn; var Jn = At(); T.use(Jn); var Zn = Tt(); T.use(Zn); var Xn = zt(); T.use(Xn); var Yn = kt(); T.use(Yn); var Qn = Ft(); T.use(Qn); });
var Ht = M((Dr, Kt) => { Kt.exports = K(); });
var C = Qt(Ht(), 1), Tr = C.default.expect, Ir = C.default.version, zr = C.default.Assertion, Cr = C.default.AssertionError, kr = C.default.util, Br = C.default.config, Fr = C.default.use, Vr = C.default.should, Lr = C.default.assert, Kr = C.default.core, Hr = C.default;
export { zr as Assertion, Cr as AssertionError, Lr as assert, Br as config, Kr as core, Hr as default, Tr as expect, Vr as should, Fr as use, kr as util, Ir as version };
/*! Bundled license information:

chai/lib/chai/utils/flag.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/test.js:
  (*!
   * Chai - test utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/expectTypes.js:
  (*!
   * Chai - expectTypes utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getActual.js:
  (*!
   * Chai - getActual utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getProperties.js:
  (*!
   * Chai - getProperties utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getEnumerableProperties.js:
  (*!
   * Chai - getEnumerableProperties utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/objDisplay.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getMessage.js:
  (*!
   * Chai - message composition utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/transferFlags.js:
  (*!
   * Chai - transferFlags utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/isProxyEnabled.js:
  (*!
   * Chai - isProxyEnabled helper
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addProperty.js:
  (*!
   * Chai - addProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addLengthGuard.js:
  (*!
   * Chai - addLengthGuard utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/proxify.js:
  (*!
   * Chai - proxify utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addMethod.js:
  (*!
   * Chai - addMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteProperty.js:
  (*!
   * Chai - overwriteProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteMethod.js:
  (*!
   * Chai - overwriteMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addChainableMethod.js:
  (*!
   * Chai - addChainingMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)
  (*!
   * Module variables
   *)

chai/lib/chai/utils/overwriteChainableMethod.js:
  (*!
   * Chai - overwriteChainableMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/compareByInspect.js:
  (*!
   * Chai - compareByInspect utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js:
  (*!
   * Chai - getOwnEnumerablePropertySymbols utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getOwnEnumerableProperties.js:
  (*!
   * Chai - getOwnEnumerableProperties utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/isNaN.js:
  (*!
   * Chai - isNaN utility
   * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/index.js:
  (*!
   * chai
   * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Dependencies that are used for multiple exports are required here only once
   *)
  (*!
   * test utility
   *)
  (*!
   * type utility
   *)
  (*!
   * expectTypes utility
   *)
  (*!
   * message utility
   *)
  (*!
   * actual utility
   *)
  (*!
   * Inspect util
   *)
  (*!
   * Object Display util
   *)
  (*!
   * Flag utility
   *)
  (*!
   * Flag transferring utility
   *)
  (*!
   * Deep equal utility
   *)
  (*!
   * Deep path info
   *)
  (*!
   * Check if a property exists
   *)
  (*!
   * Function name
   *)
  (*!
   * add Property
   *)
  (*!
   * add Method
   *)
  (*!
   * overwrite Property
   *)
  (*!
   * overwrite Method
   *)
  (*!
   * Add a chainable method
   *)
  (*!
   * Overwrite chainable method
   *)
  (*!
   * Compare by inspect method
   *)
  (*!
   * Get own enumerable property symbols method
   *)
  (*!
   * Get own enumerable properties method
   *)
  (*!
   * Checks error against a given set of criteria
   *)
  (*!
   * Proxify util
   *)
  (*!
   * addLengthGuard util
   *)
  (*!
   * isProxyEnabled helper
   *)
  (*!
   * isNaN method
   *)
  (*!
   * getOperator method
   *)

chai/lib/chai/assertion.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   *)
  (*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   *)

chai/lib/chai/core/assertions.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/expect.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/should.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/assert.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   *)
  (*!
   * Aliases.
   *)

chai/lib/chai.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai version
   *)
  (*!
   * Assertion Error
   *)
  (*!
   * Utils for plugins (not exported)
   *)
  (*!
   * Utility Functions
   *)
  (*!
   * Configuration
   *)
  (*!
   * Primary `Assertion` prototype
   *)
  (*!
   * Core Assertions
   *)
  (*!
   * Expect interface
   *)
  (*!
   * Should interface
   *)
  (*!
   * Assert interface
   *)
*/
//# sourceMappingURL=chai.mjs.map
