/* esm.sh - string-width@7.2.0 */
import f from "../../../esm.sh/strip-ansi@7.1.0_2.js";
import { eastAsianWidth as r } from "../../../esm.sh/get-east-asian-width@1.3.0.js";
import u from "../../../esm.sh/emoji-regex@10.4.0.js";
var c = new Intl.Segmenter(), _ = /^\p{Default_Ignorable_Code_Point}$/u;
function a(t, i = {}) {
  if (typeof t != "string" || t.length === 0) {
    return 0;
  }
  let { ambiguousIsNarrow: s = !0, countAnsiEscapeCodes: x = !1 } = i;
  if (x || (t = f(t)), t.length === 0) {
    return 0;
  }
  let n = 0, F = { ambiguousAsWide: !s };
  for (let { segment: o } of c.segment(t)) {
    let e = o.codePointAt(0);
    if (
      !(e <= 31 || e >= 127 && e <= 159) &&
      !(e >= 8203 && e <= 8207 || e === 65279) &&
      !(e >= 768 && e <= 879 || e >= 6832 && e <= 6911 ||
        e >= 7616 && e <= 7679 || e >= 8400 && e <= 8447 ||
        e >= 65056 && e <= 65071) &&
      !(e >= 55296 && e <= 57343) && !(e >= 65024 && e <= 65039) && !_.test(o)
    ) {
      if (u().test(o)) {
        n += 2;
        continue;
      }
      n += r(e, F);
    }
  }
  return n;
}
export { a as default };
//# sourceMappingURL=string-width.mjs.map
