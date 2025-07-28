/* esm.sh - ansi-regex@6.1.0 */
function u({ onlyFirst: n = !1 } = {}) {
  let e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
  ].join("|");
  return new RegExp(e, n ? void 0 : "g");
}
export { u as default };
//# sourceMappingURL=ansi-regex.mjs.map
