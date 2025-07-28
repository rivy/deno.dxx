/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/to-regex-range@5.0.1/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import t from "../../../cdn.jsdelivr.net/npm/is-number@7.0.0/+esm.js";
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */ const e = t,
  r = (t, n, o) => {
    if (!1 === e(t)) {
      throw new TypeError(
        "toRegexRange: expected the first argument to be a number",
      );
    }
    if (void 0 === n || t === n) {
      return String(t);
    }
    if (!1 === e(n)) {
      throw new TypeError(
        "toRegexRange: expected the second argument to be a number.",
      );
    }
    let i = { relaxZeros: !0, ...o };
    "boolean" == typeof i.strictZeros && (i.relaxZeros = !1 === i.strictZeros);
    let c = t + ":" + n + "=" + String(i.relaxZeros) + String(i.shorthand) +
      String(i.capture) + String(i.wrap);
    if (r.cache.hasOwnProperty(c)) {
      return r.cache[c].result;
    }
    let s = Math.min(t, n), l = Math.max(t, n);
    if (1 === Math.abs(s - l)) {
      let e = t + "|" + n;
      return i.capture ? `(${e})` : !1 === i.wrap ? e : `(?:${e})`;
    }
    let h = f(t) || f(n), g = { min: t, max: n, a: s, b: l }, p = [], d = [];
    if (h && (g.isPadded = h, g.maxLen = String(g.max).length), s < 0) {
      d = a(l < 0 ? Math.abs(l) : 1, Math.abs(s), g, i), s = g.a = 0;
    }
    return l >= 0 && (p = a(s, l, g, i)),
      g.negatives = d,
      g.positives = p,
      g.result = function (t, e) {
        let r = u(t, e, "-", !1) || [],
          n = u(e, t, "", !1) || [],
          a = u(t, e, "-?", !0) || [];
        return r.concat(a).concat(n).join("|");
      }(d, p),
      !0 === i.capture
        ? g.result = `(${g.result})`
        : !1 !== i.wrap && p.length + d.length > 1 &&
          (g.result = `(?:${g.result})`),
      r.cache[c] = g,
      g.result;
  };
function n(t, e, r) {
  if (t === e) {
    return { pattern: t, count: [], digits: 0 };
  }
  let n = function (t, e) {
      let r = [];
      for (let n = 0; n < t.length; n++) {
        r.push([t[n], e[n]]);
      }
      return r;
    }(t, e),
    a = n.length,
    u = "",
    o = 0;
  for (let t = 0; t < a; t++) {
    let [e, r] = n[t];
    e === r ? u += e : "0" !== e || "9" !== r ? u += h(e, r) : o++;
  }
  return o && (u += !0 === r.shorthand ? "\\d" : "[0-9]"),
    { pattern: u, count: [o], digits: a };
}
function a(t, e, r, a) {
  let u,
    i = function (t, e) {
      let r = 1, n = 1, a = c(t, r), u = new Set([e]);
      for (; t <= a && a <= e;) {
        u.add(a), r += 1, a = c(t, r);
      }
      for (a = s(e + 1, n) - 1; t < a && a <= e;) {
        u.add(a), n += 1, a = s(e + 1, n) - 1;
      }
      return u = [...u], u.sort(o), u;
    }(t, e),
    h = [],
    f = t;
  for (let t = 0; t < i.length; t++) {
    let e = i[t], o = n(String(f), String(e), a), c = "";
    r.isPadded || !u || u.pattern !== o.pattern
      ? (r.isPadded && (c = g(e, r, a)),
        o.string = c + o.pattern + l(o.count),
        h.push(o),
        f = e + 1,
        u = o)
      : (u.count.length > 1 && u.count.pop(),
        u.count.push(o.count[0]),
        u.string = u.pattern + l(u.count),
        f = e + 1);
  }
  return h;
}
function u(t, e, r, n, a) {
  let u = [];
  for (let a of t) {
    let { string: t } = a;
    n || i(e, "string", t) || u.push(r + t),
      n && i(e, "string", t) && u.push(r + t);
  }
  return u;
}
function o(t, e) {
  return t > e ? 1 : e > t ? -1 : 0;
}
function i(t, e, r) {
  return t.some((t) => t[e] === r);
}
function c(t, e) {
  return Number(String(t).slice(0, -e) + "9".repeat(e));
}
function s(t, e) {
  return t - t % Math.pow(10, e);
}
function l(t) {
  let [e = 0, r = ""] = t;
  return r || e > 1 ? `{${e + (r ? "," + r : "")}}` : "";
}
function h(t, e, r) {
  return `[${t}${e - t == 1 ? "" : "-"}${e}]`;
}
function f(t) {
  return /^-?(0+)\d/.test(t);
}
function g(t, e, r) {
  if (!e.isPadded) {
    return t;
  }
  let n = Math.abs(e.maxLen - String(t).length), a = !1 !== r.relaxZeros;
  switch (n) {
    case 0:
      return "";
    case 1:
      return a ? "0?" : "0";
    case 2:
      return a ? "0{0,2}" : "00";
    default:
      return a ? `0{0,${n}}` : `0{${n}}`;
  }
}
r.cache = {}, r.clearCache = () => r.cache = {};
var p = r, d = p.cache, m = p.clearCache;
export { d as cache, m as clearCache, p as default };
//# sourceMappingURL=/sm/29a0b1d76cd2a6e5801d6fc9f3ce2f5a931eaf412d46e5fd07301f4908bb79f0.map
