/* esm.sh - strip-ansi@7.1.0 */
import r from "../../../esm.sh/ansi-regex@6.1.0_2.js";
var t = r();
function o(e) {
  if (typeof e != "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  }
  return e.replace(t, "");
}
export { o as default };
//# sourceMappingURL=strip-ansi.mjs.map
