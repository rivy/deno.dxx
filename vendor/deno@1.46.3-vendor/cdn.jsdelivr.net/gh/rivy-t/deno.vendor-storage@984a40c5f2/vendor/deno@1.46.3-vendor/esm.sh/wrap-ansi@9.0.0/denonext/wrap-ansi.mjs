/* esm.sh - wrap-ansi@9.0.0 */
import g from "../../../esm.sh/string-width@7.2.0_2.js";
import I from "../../../esm.sh/strip-ansi@7.1.0_2.js";
import _ from "../../../esm.sh/ansi-styles@6.2.1_2.js";
var E = new Set(["\x1B", "\x9B"]),
  b = 39,
  x = "\x07",
  $ = "[",
  k = "]",
  C = "m",
  S = `${k}8;;`,
  L = (e) => `${E.values().next().value}${$}${e}${C}`,
  N = (e) => `${E.values().next().value}${S}${e}${x}`,
  w = (e) => e.split(" ").map((t) => g(t)),
  m = (e, t, i) => {
    let s = [...t], l = !1, d = !1, r = g(I(e.at(-1)));
    for (let [n, c] of s.entries()) {
      let p = g(c);
      if (
        r + p <= i ? e[e.length - 1] += c : (e.push(c), r = 0),
          E.has(c) &&
          (l = !0, d = s.slice(n + 1, n + 1 + S.length).join("") === S),
          l
      ) {
        d ? c === x && (l = !1, d = !1) : c === C && (l = !1);
        continue;
      }
      r += p, r === i && n < s.length - 1 && (e.push(""), r = 0);
    }
    !r && e.at(-1).length > 0 && e.length > 1 && (e[e.length - 2] += e.pop());
  },
  j = (e) => {
    let t = e.split(" "), i = t.length;
    for (; i > 0 && !(g(t[i - 1]) > 0);) {
      i--;
    }
    return i === t.length ? e : t.slice(0, i).join(" ") + t.slice(i).join("");
  },
  v = (e, t, i = {}) => {
    if (i.trim !== !1 && e.trim() === "") {
      return "";
    }
    let s = "", l, d, r = w(e), n = [""];
    for (let [f, o] of e.split(" ").entries()) {
      i.trim !== !1 && (n[n.length - 1] = n.at(-1).trimStart());
      let a = g(n.at(-1));
      if (
        f !== 0 &&
        (a >= t && (i.wordWrap === !1 || i.trim === !1) && (n.push(""), a = 0),
          (a > 0 || i.trim === !1) && (n[n.length - 1] += " ", a++)),
          i.hard && r[f] > t
      ) {
        let h = t - a, u = 1 + Math.floor((r[f] - h - 1) / t);
        Math.floor((r[f] - 1) / t) < u && n.push(""), m(n, o, t);
        continue;
      }
      if (a + r[f] > t && a > 0 && r[f] > 0) {
        if (i.wordWrap === !1 && a < t) {
          m(n, o, t);
          continue;
        }
        n.push("");
      }
      if (a + r[f] > t && i.wordWrap === !1) {
        m(n, o, t);
        continue;
      }
      n[n.length - 1] += o;
    }
    i.trim !== !1 && (n = n.map((f) => j(f)));
    let c = n.join(`
`),
      p = [...c],
      A = 0;
    for (let [f, o] of p.entries()) {
      if (s += o, E.has(o)) {
        let { groups: h } =
          new RegExp(`(?:\\${$}(?<code>\\d+)m|\\${S}(?<uri>.*)${x})`).exec(
            c.slice(A),
          ) || { groups: {} };
        if (h.code !== void 0) {
          let u = Number.parseFloat(h.code);
          l = u === b ? void 0 : u;
        } else {
          h.uri !== void 0 && (d = h.uri.length === 0 ? void 0 : h.uri);
        }
      }
      let a = _.codes.get(Number(l));
      p[f + 1] === `
`
        ? (d && (s += N("")), l && a && (s += L(a)))
        : o === `
` && (l && a && (s += L(l)), d && (s += N(d))), A += o.length;
    }
    return s;
  };
function R(e, t, i) {
  return String(e).normalize().replaceAll(
    `\r
`,
    `
`,
  ).split(`
`).map((s) => v(s, t, i)).join(`
`);
}
export { R as default };
//# sourceMappingURL=wrap-ansi.mjs.map
