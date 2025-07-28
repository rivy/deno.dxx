/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/is-number@7.0.0/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var i = function (i) {
  return "number" == typeof i
    ? i - i == 0
    : "string" == typeof i && "" !== i.trim() &&
      (Number.isFinite ? Number.isFinite(+i) : isFinite(+i));
};
export { i as default };
//# sourceMappingURL=/sm/0002d8a64389f59f23d3002fd97cca5c60e7dc3ceaa9d3d8c342f11ea497b077.map
