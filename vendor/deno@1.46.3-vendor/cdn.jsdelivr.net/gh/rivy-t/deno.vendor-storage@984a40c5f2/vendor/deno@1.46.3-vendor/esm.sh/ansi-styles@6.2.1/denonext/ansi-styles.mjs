/* esm.sh - ansi-styles@6.2.1 */
var g = (a = 0) => (e) => `\x1B[${e + a}m`,
  u = (a = 0) => (e) => `\x1B[${38 + a};5;${e}m`,
  b = (a = 0) => (e, t, n) => `\x1B[${38 + a};2;${e};${t};${n}m`,
  r = {
    modifier: {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      overline: [53, 55],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      blackBright: [90, 39],
      gray: [90, 39],
      grey: [90, 39],
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39],
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgBlackBright: [100, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49],
    },
  },
  B = Object.keys(r.modifier),
  c = Object.keys(r.color),
  h = Object.keys(r.bgColor),
  A = [...c, ...h];
function m() {
  let a = new Map();
  for (let [e, t] of Object.entries(r)) {
    for (let [n, o] of Object.entries(t)) {
      r[n] = { open: `\x1B[${o[0]}m`, close: `\x1B[${o[1]}m` },
        t[n] = r[n],
        a.set(o[0], o[1]);
    }
    Object.defineProperty(r, e, { value: t, enumerable: !1 });
  }
  return Object.defineProperty(r, "codes", { value: a, enumerable: !1 }),
    r.color.close = "\x1B[39m",
    r.bgColor.close = "\x1B[49m",
    r.color.ansi = g(),
    r.color.ansi256 = u(),
    r.color.ansi16m = b(),
    r.bgColor.ansi = g(10),
    r.bgColor.ansi256 = u(10),
    r.bgColor.ansi16m = b(10),
    Object.defineProperties(r, {
      rgbToAnsi256: {
        value: (e, t, n) =>
          e === t && t === n
            ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232
            : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(t / 255 * 5) +
              Math.round(n / 255 * 5),
        enumerable: !1,
      },
      hexToRgb: {
        value: (e) => {
          let t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));
          if (!t) {
            return [0, 0, 0];
          }
          let [n] = t;
          n.length === 3 && (n = [...n].map((l) => l + l).join(""));
          let o = Number.parseInt(n, 16);
          return [o >> 16 & 255, o >> 8 & 255, o & 255];
        },
        enumerable: !1,
      },
      hexToAnsi256: {
        value: (e) => r.rgbToAnsi256(...r.hexToRgb(e)),
        enumerable: !1,
      },
      ansi256ToAnsi: {
        value: (e) => {
          if (e < 8) {
            return 30 + e;
          }
          if (e < 16) {
            return 90 + (e - 8);
          }
          let t, n, o;
          if (e >= 232) {
            t = ((e - 232) * 10 + 8) / 255, n = t, o = t;
          } else {
            e -= 16;
            let s = e % 36;
            t = Math.floor(e / 36) / 5,
              n = Math.floor(s / 6) / 5,
              o = s % 6 / 5;
          }
          let l = Math.max(t, n, o) * 2;
          if (l === 0) {
            return 30;
          }
          let i = 30 +
            (Math.round(o) << 2 | Math.round(n) << 1 | Math.round(t));
          return l === 2 && (i += 60), i;
        },
        enumerable: !1,
      },
      rgbToAnsi: {
        value: (e, t, n) => r.ansi256ToAnsi(r.rgbToAnsi256(e, t, n)),
        enumerable: !1,
      },
      hexToAnsi: {
        value: (e) => r.ansi256ToAnsi(r.hexToAnsi256(e)),
        enumerable: !1,
      },
    }),
    r;
}
var f = m(), y = f;
export {
  A as colorNames,
  B as modifierNames,
  c as foregroundColorNames,
  h as backgroundColorNames,
  y as default,
};
//# sourceMappingURL=ansi-styles.mjs.map
