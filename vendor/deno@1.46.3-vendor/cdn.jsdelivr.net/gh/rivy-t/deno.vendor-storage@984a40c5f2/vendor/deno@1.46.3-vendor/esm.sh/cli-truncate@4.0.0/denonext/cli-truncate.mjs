/* esm.sh - cli-truncate@4.0.0 */
import o from "../../../esm.sh/slice-ansi@5.0.0.js";
import s from "../../../esm.sh/string-width@7.2.0_2.js";
function u(r, e, c) {
  if (r.charAt(e) === " ") {
    return e;
  }
  let a = c ? 1 : -1;
  for (let f = 0; f <= 3; f++) {
    let p = e + f * a;
    if (r.charAt(p) === " ") {
      return p;
    }
  }
  return e;
}
function g(r, e, c = {}) {
  let { position: a = "end", space: f = !1, preferTruncationOnSpace: p = !1 } =
      c,
    { truncationCharacter: t = "\u2026" } = c;
  if (typeof r != "string") {
    throw new TypeError(`Expected \`input\` to be a string, got ${typeof r}`);
  }
  if (typeof e != "number") {
    throw new TypeError(`Expected \`columns\` to be a number, got ${typeof e}`);
  }
  if (e < 1) {
    return "";
  }
  if (e === 1) {
    return t;
  }
  let i = s(r);
  if (i <= e) {
    return r;
  }
  if (a === "start") {
    if (p) {
      let n = u(r, i - e + 1, !0);
      return t + o(r, n, i).trim();
    }
    return f === !0 && (t += " "), t + o(r, i - e + s(t), i);
  }
  if (a === "middle") {
    f === !0 && (t = ` ${t} `);
    let n = Math.floor(e / 2);
    if (p) {
      let d = u(r, n), h = u(r, i - (e - n) + 1, !0);
      return o(r, 0, d) + t + o(r, h, i).trim();
    }
    return o(r, 0, n) + t + o(r, i - (e - n) + s(t), i);
  }
  if (a === "end") {
    if (p) {
      let n = u(r, e - 1);
      return o(r, 0, n) + t;
    }
    return f === !0 && (t = ` ${t}`), o(r, 0, e - s(t)) + t;
  }
  throw new Error(
    `Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${a}`,
  );
}
export { g as default };
//# sourceMappingURL=cli-truncate.mjs.map
