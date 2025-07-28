/* esm.sh - is-fullwidth-code-point@4.0.0 */
function F(x) {
  return Number.isInteger(x)
    ? x >= 4352 &&
      (x <= 4447 || x === 9001 || x === 9002 ||
        11904 <= x && x <= 12871 && x !== 12351 || 12880 <= x && x <= 19903 ||
        19968 <= x && x <= 42182 || 43360 <= x && x <= 43388 ||
        44032 <= x && x <= 55203 || 63744 <= x && x <= 64255 ||
        65040 <= x && x <= 65049 || 65072 <= x && x <= 65131 ||
        65281 <= x && x <= 65376 || 65504 <= x && x <= 65510 ||
        110592 <= x && x <= 110593 || 127488 <= x && x <= 127569 ||
        131072 <= x && x <= 262141)
    : !1;
}
export { F as default };
//# sourceMappingURL=is-fullwidth-code-point.mjs.map
