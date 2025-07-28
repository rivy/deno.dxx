/* esm.sh - slice-ansi@5.0.0 */
import F from "../../../esm.sh/is-fullwidth-code-point@4.0.0.js";
import h from "../../../esm.sh/ansi-styles@6.2.1_2.js";
var x = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/,
  g = ["\x1B", "\x9B"],
  d = (n) => `${g[0]}[${n}m`,
  b = (n, l, u) => {
    let i = [];
    n = [...n];
    for (let e of n) {
      let s = e;
      e.includes(";") && (e = e.split(";")[0][0] + "0");
      let t = h.codes.get(Number.parseInt(e, 10));
      if (t) {
        let f = n.indexOf(t.toString());
        f === -1 ? i.push(d(l ? t : s)) : n.splice(f, 1);
      } else if (l) {
        i.push(d(0));
        break;
      } else {
        i.push(d(s));
      }
    }
    if (l && (i = i.filter((e, s) => i.indexOf(e) === s), u !== void 0)) {
      let e = d(h.codes.get(Number.parseInt(u, 10)));
      i = i.reduce((s, t) => t === e ? [t, ...s] : [...s, t], []);
    }
    return i.join("");
  };
function E(n, l, u) {
  let i = [...n],
    e = [],
    s = typeof u == "number" ? u : i.length,
    t = !1,
    f,
    o = 0,
    r = "";
  for (let [p, c] of i.entries()) {
    let m = !1;
    if (g.includes(c)) {
      let a = /\d[^m]*/.exec(n.slice(p, p + 18));
      f = a && a.length > 0 ? a[0] : void 0,
        o < s && (t = !0, f !== void 0 && e.push(f));
    } else {
      t && c === "m" && (t = !1, m = !0);
    }
    if (
      !t && !m && o++,
        !x.test(c) && F(c.codePointAt()) && (o++, typeof u != "number" && s++),
        o > l && o <= s
    ) {
      r += c;
    } else if (o === l && !t && f !== void 0) {
      r = b(e);
    } else if (o >= s) {
      r += b(e, !0, f);
      break;
    }
  }
  return r;
}
export { E as default };
//# sourceMappingURL=slice-ansi.mjs.map
