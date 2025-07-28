/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/picomatch@2.2.1/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function t(t) {
  return t && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
function e(t, e) {
  for (var n = 0, o = t.length - 1; o >= 0; o--) {
    var r = t[o];
    "." === r
      ? t.splice(o, 1)
      : ".." === r
      ? (t.splice(o, 1), n++)
      : n && (t.splice(o, 1), n--);
  }
  if (e) { for (; n--; n) t.unshift(".."); }
  return t;
}
var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
  o = function (t) {
    return n.exec(t).slice(1);
  };
function r() {
  for (var t = "", n = !1, o = arguments.length - 1; o >= -1 && !n; o--) {
    var r = o >= 0 ? arguments[o] : "/";
    if ("string" != typeof r) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    r && (t = r + "/" + t, n = "/" === r.charAt(0));
  }
  return (n ? "/" : "") + (t = e(
        A(t.split("/"), function (t) {
          return !!t;
        }),
        !n,
      ).join("/")) || ".";
}
function u(t) {
  var n = s(t), o = "/" === h(t, -1);
  return (t = e(
    A(t.split("/"), function (t) {
      return !!t;
    }),
    !n,
  ).join("/")) || n || (t = "."),
    t && o && (t += "/"),
    (n ? "/" : "") + t;
}
function s(t) {
  return "/" === t.charAt(0);
}
function a() {
  return u(
    A(Array.prototype.slice.call(arguments, 0), function (t, e) {
      if ("string" != typeof t) {
        throw new TypeError("Arguments to path.join must be strings");
      }
      return t;
    }).join("/"),
  );
}
function i(t, e) {
  function n(t) {
    for (var e = 0; e < t.length && "" === t[e]; e++);
    for (var n = t.length - 1; n >= 0 && "" === t[n]; n--);
    return e > n ? [] : t.slice(e, n - e + 1);
  }
  t = r(t).substr(1), e = r(e).substr(1);
  for (
    var o = n(t.split("/")),
      u = n(e.split("/")),
      s = Math.min(o.length, u.length),
      a = s,
      i = 0;
    i < s;
    i++
  ) {
    if (o[i] !== u[i]) {
      a = i;
      break;
    }
  }
  var p = [];
  for (i = a; i < o.length; i++) p.push("..");
  return (p = p.concat(u.slice(a))).join("/");
}
function p(t) {
  var e = o(t), n = e[0], r = e[1];
  return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : ".";
}
function l(t, e) {
  var n = o(t)[2];
  return e && n.substr(-1 * e.length) === e &&
    (n = n.substr(0, n.length - e.length)),
    n;
}
function c(t) {
  return o(t)[3];
}
var f = {
  extname: c,
  basename: l,
  dirname: p,
  sep: "/",
  delimiter: ":",
  relative: i,
  join: a,
  isAbsolute: s,
  normalize: u,
  resolve: r,
};
function A(t, e) {
  if (t.filter) return t.filter(e);
  for (var n = [], o = 0; o < t.length; o++) e(t[o], o, t) && n.push(t[o]);
  return n;
}
var h = "b" === "ab".substr(-1)
    ? function (t, e, n) {
      return t.substr(e, n);
    }
    : function (t, e, n) {
      return e < 0 && (e = t.length + e), t.substr(e, n);
    },
  R = t(
    Object.freeze({
      __proto__: null,
      resolve: r,
      normalize: u,
      isAbsolute: s,
      join: a,
      relative: i,
      sep: "/",
      delimiter: ":",
      dirname: p,
      basename: l,
      extname: c,
      default: f,
    }),
  ),
  _ = "undefined" != typeof global
    ? global
    : "undefined" != typeof self
    ? self
    : "undefined" != typeof window
    ? window
    : {};
function g() {
  throw new Error("setTimeout has not been defined");
}
function E() {
  throw new Error("clearTimeout has not been defined");
}
var b = g, y = E;
function v(t) {
  if (b === setTimeout) return setTimeout(t, 0);
  if ((b === g || !b) && setTimeout) return b = setTimeout, setTimeout(t, 0);
  try {
    return b(t, 0);
  } catch (e) {
    try {
      return b.call(null, t, 0);
    } catch (e) {
      return b.call(this, t, 0);
    }
  }
}
"function" == typeof _.setTimeout && (b = setTimeout),
  "function" == typeof _.clearTimeout && (y = clearTimeout);
var C, $ = [], S = !1, x = -1;
function d() {
  S && C && (S = !1, C.length ? $ = C.concat($) : x = -1, $.length && T());
}
function T() {
  if (!S) {
    var t = v(d);
    S = !0;
    for (var e = $.length; e;) {
      for (C = $, $ = []; ++x < e;) C && C[x].run();
      x = -1, e = $.length;
    }
    C = null,
      S = !1,
      function (t) {
        if (y === clearTimeout) return clearTimeout(t);
        if ((y === E || !y) && clearTimeout) {
          return y = clearTimeout, clearTimeout(t);
        }
        try {
          return y(t);
        } catch (e) {
          try {
            return y.call(null, t);
          } catch (e) {
            return y.call(this, t);
          }
        }
      }(t);
  }
}
function H(t, e) {
  this.fun = t, this.array = e;
}
H.prototype.run = function () {
  this.fun.apply(null, this.array);
};
function m() {}
var L = m, O = m, k = m, w = m, N = m, I = m, B = m;
var M = _.performance || {},
  D = M.now || M.mozNow || M.msNow || M.oNow || M.webkitNow || function () {
    return (new Date()).getTime();
  };
var G = new Date();
var P = {
    nextTick: function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      }
      $.push(new H(t, e)), 1 !== $.length || S || v(T);
    },
    title: "browser",
    browser: !0,
    env: {},
    argv: [],
    version: "",
    versions: {},
    on: L,
    addListener: O,
    once: k,
    off: w,
    removeListener: N,
    removeAllListeners: I,
    emit: B,
    binding: function (t) {
      throw new Error("process.binding is not supported");
    },
    cwd: function () {
      return "/";
    },
    chdir: function (t) {
      throw new Error("process.chdir is not supported");
    },
    umask: function () {
      return 0;
    },
    hrtime: function (t) {
      var e = .001 * D.call(M), n = Math.floor(e), o = Math.floor(e % 1 * 1e9);
      return t && (n -= t[0], (o -= t[1]) < 0 && (n--, o += 1e9)), [n, o];
    },
    platform: "browser",
    release: {},
    config: {},
    uptime: function () {
      return (new Date() - G) / 1e3;
    },
  },
  K = {};
const U = R,
  X = "\\\\/",
  F = `[^${X}]`,
  Q = "\\.",
  j = "\\/",
  W = "[^/]",
  q = `(?:${j}|$)`,
  z = `(?:^|${j})`,
  Z = `${Q}{1,2}${q}`,
  Y = {
    DOT_LITERAL: Q,
    PLUS_LITERAL: "\\+",
    QMARK_LITERAL: "\\?",
    SLASH_LITERAL: j,
    ONE_CHAR: "(?=.)",
    QMARK: W,
    END_ANCHOR: q,
    DOTS_SLASH: Z,
    NO_DOT: `(?!${Q})`,
    NO_DOTS: `(?!${z}${Z})`,
    NO_DOT_SLASH: `(?!${Q}{0,1}${q})`,
    NO_DOTS_SLASH: `(?!${Z})`,
    QMARK_NO_DOT: `[^.${j}]`,
    STAR: `${W}*?`,
    START_ANCHOR: z,
  },
  V = {
    ...Y,
    SLASH_LITERAL: `[${X}]`,
    QMARK: F,
    STAR: `${F}*?`,
    DOTS_SLASH: `${Q}{1,2}(?:[${X}]|$)`,
    NO_DOT: `(?!${Q})`,
    NO_DOTS: `(?!(?:^|[${X}])${Q}{1,2}(?:[${X}]|$))`,
    NO_DOT_SLASH: `(?!${Q}{0,1}(?:[${X}]|$))`,
    NO_DOTS_SLASH: `(?!${Q}{1,2}(?:[${X}]|$))`,
    QMARK_NO_DOT: `[^.${X}]`,
    START_ANCHOR: `(?:^|[${X}])`,
    END_ANCHOR: `(?:[${X}]|$)`,
  };
var J = {
  MAX_LENGTH: 65536,
  POSIX_REGEX_SOURCE: {
    alnum: "a-zA-Z0-9",
    alpha: "a-zA-Z",
    ascii: "\\x00-\\x7F",
    blank: " \\t",
    cntrl: "\\x00-\\x1F\\x7F",
    digit: "0-9",
    graph: "\\x21-\\x7E",
    lower: "a-z",
    print: "\\x20-\\x7E ",
    punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
    space: " \\t\\r\\n\\v\\f",
    upper: "A-Z",
    word: "A-Za-z0-9_",
    xdigit: "A-Fa-f0-9",
  },
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
  REPLACEMENTS: { "***": "*", "**/**": "**", "**/**/**": "**" },
  CHAR_0: 48,
  CHAR_9: 57,
  CHAR_UPPERCASE_A: 65,
  CHAR_LOWERCASE_A: 97,
  CHAR_UPPERCASE_Z: 90,
  CHAR_LOWERCASE_Z: 122,
  CHAR_LEFT_PARENTHESES: 40,
  CHAR_RIGHT_PARENTHESES: 41,
  CHAR_ASTERISK: 42,
  CHAR_AMPERSAND: 38,
  CHAR_AT: 64,
  CHAR_BACKWARD_SLASH: 92,
  CHAR_CARRIAGE_RETURN: 13,
  CHAR_CIRCUMFLEX_ACCENT: 94,
  CHAR_COLON: 58,
  CHAR_COMMA: 44,
  CHAR_DOT: 46,
  CHAR_DOUBLE_QUOTE: 34,
  CHAR_EQUAL: 61,
  CHAR_EXCLAMATION_MARK: 33,
  CHAR_FORM_FEED: 12,
  CHAR_FORWARD_SLASH: 47,
  CHAR_GRAVE_ACCENT: 96,
  CHAR_HASH: 35,
  CHAR_HYPHEN_MINUS: 45,
  CHAR_LEFT_ANGLE_BRACKET: 60,
  CHAR_LEFT_CURLY_BRACE: 123,
  CHAR_LEFT_SQUARE_BRACKET: 91,
  CHAR_LINE_FEED: 10,
  CHAR_NO_BREAK_SPACE: 160,
  CHAR_PERCENT: 37,
  CHAR_PLUS: 43,
  CHAR_QUESTION_MARK: 63,
  CHAR_RIGHT_ANGLE_BRACKET: 62,
  CHAR_RIGHT_CURLY_BRACE: 125,
  CHAR_RIGHT_SQUARE_BRACKET: 93,
  CHAR_SEMICOLON: 59,
  CHAR_SINGLE_QUOTE: 39,
  CHAR_SPACE: 32,
  CHAR_TAB: 9,
  CHAR_UNDERSCORE: 95,
  CHAR_VERTICAL_LINE: 124,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
  SEP: U.sep,
  extglobChars: (t) => ({
    "!": { type: "negate", open: "(?:(?!(?:", close: `))${t.STAR})` },
    "?": { type: "qmark", open: "(?:", close: ")?" },
    "+": { type: "plus", open: "(?:", close: ")+" },
    "*": { type: "star", open: "(?:", close: ")*" },
    "@": { type: "at", open: "(?:", close: ")" },
  }),
  globChars: (t) => !0 === t ? V : Y,
};
!function (t) {
  const e = R,
    n = "win32" === P.platform,
    {
      REGEX_BACKSLASH: o,
      REGEX_REMOVE_BACKSLASH: r,
      REGEX_SPECIAL_CHARS: u,
      REGEX_SPECIAL_CHARS_GLOBAL: s,
    } = J;
  t.isObject = (t) => null !== t && "object" == typeof t && !Array.isArray(t),
    t.hasRegexChars = (t) => u.test(t),
    t.isRegexChar = (e) => 1 === e.length && t.hasRegexChars(e),
    t.escapeRegex = (t) => t.replace(s, "\\$1"),
    t.toPosixSlashes = (t) => t.replace(o, "/"),
    t.removeBackslashes = (t) => t.replace(r, (t) => "\\" === t ? "" : t),
    t.supportsLookbehinds = () => {
      const t = P.version.slice(1).split(".").map(Number);
      return 3 === t.length && t[0] >= 9 || 8 === t[0] && t[1] >= 10;
    },
    t.isWindows = (t) =>
      t && "boolean" == typeof t.windows
        ? t.windows
        : !0 === n || "\\" === e.sep,
    t.escapeLast = (e, n, o) => {
      const r = e.lastIndexOf(n, o);
      return -1 === r
        ? e
        : "\\" === e[r - 1]
        ? t.escapeLast(e, n, r - 1)
        : `${e.slice(0, r)}\\${e.slice(r)}`;
    },
    t.removePrefix = (t, e = {}) => {
      let n = t;
      return n.startsWith("./") && (n = n.slice(2), e.prefix = "./"), n;
    },
    t.wrapOutput = (t, e = {}, n = {}) => {
      let o = `${n.contains ? "" : "^"}(?:${t})${n.contains ? "" : "$"}`;
      return !0 === e.negated && (o = `(?:^(?!${o}).*$)`), o;
    };
}(K);
const tt = K,
  {
    CHAR_ASTERISK: et,
    CHAR_AT: nt,
    CHAR_BACKWARD_SLASH: ot,
    CHAR_COMMA: rt,
    CHAR_DOT: ut,
    CHAR_EXCLAMATION_MARK: st,
    CHAR_FORWARD_SLASH: at,
    CHAR_LEFT_CURLY_BRACE: it,
    CHAR_LEFT_PARENTHESES: pt,
    CHAR_LEFT_SQUARE_BRACKET: lt,
    CHAR_PLUS: ct,
    CHAR_QUESTION_MARK: ft,
    CHAR_RIGHT_CURLY_BRACE: At,
    CHAR_RIGHT_PARENTHESES: ht,
    CHAR_RIGHT_SQUARE_BRACKET: Rt,
  } = J,
  _t = (t) => t === at || t === ot,
  gt = (t) => {
    !0 !== t.isPrefix && (t.depth = t.isGlobstar ? 1 / 0 : 1);
  };
var Et = (t, e) => {
  const n = e || {},
    o = t.length - 1,
    r = !0 === n.parts || !0 === n.scanToEnd,
    u = [],
    s = [],
    a = [];
  let i,
    p,
    l = t,
    c = -1,
    f = 0,
    A = 0,
    h = !1,
    R = !1,
    _ = !1,
    g = !1,
    E = !1,
    b = !1,
    y = !1,
    v = !1,
    C = !1,
    $ = 0,
    S = { value: "", depth: 0, isGlob: !1 };
  const x = () => c >= o, d = () => (i = p, l.charCodeAt(++c));
  for (; c < o;) {
    let t;
    if (p = d(), p !== ot) {
      if (!0 === b || p === it) {
        for ($++; !0 !== x() && (p = d());) {
          if (p !== ot) {
            if (p !== it) {
              if (!0 !== b && p === ut && (p = d()) === ut) {
                if (
                  h = S.isBrace = !0, _ = S.isGlob = !0, C = !0, !0 === r
                ) continue;
                break;
              }
              if (!0 !== b && p === rt) {
                if (
                  h = S.isBrace = !0, _ = S.isGlob = !0, C = !0, !0 === r
                ) continue;
                break;
              }
              if (p === At && ($--, 0 === $)) {
                b = !1, h = S.isBrace = !0, C = !0;
                break;
              }
            } else $++;
          } else y = S.backslashes = !0, d();
        }
        if (!0 === r) continue;
        break;
      }
      if (p !== at) {
        if (!0 !== n.noext) {
          if (
            !0 === (p === ct || p === nt || p === et || p === ft || p === st) &&
            l.charCodeAt(c + 1) === pt
          ) {
            if (_ = S.isGlob = !0, g = S.isExtglob = !0, C = !0, !0 === r) {
              for (; !0 !== x() && (p = d());) {
                if (p !== ot) {
                  if (p === ht) {
                    _ = S.isGlob = !0, C = !0;
                    break;
                  }
                } else y = S.backslashes = !0, p = d();
              }
              continue;
            }
            break;
          }
        }
        if (p === et) {
          if (
            i === et && (E = S.isGlobstar = !0),
              _ = S.isGlob = !0,
              C = !0,
              !0 === r
          ) continue;
          break;
        }
        if (p === ft) {
          if (_ = S.isGlob = !0, C = !0, !0 === r) continue;
          break;
        }
        if (p === lt) {
          for (; !0 !== x() && (t = d());) {
            if (t !== ot) {
              if (t === Rt) {
                if (
                  R = S.isBracket = !0, _ = S.isGlob = !0, C = !0, !0 === r
                ) continue;
                break;
              }
            } else y = S.backslashes = !0, d();
          }
        }
        if (!0 === n.nonegate || p !== st || c !== f) {
          if (!0 !== n.noparen && p === pt) {
            for (; !0 !== x() && (p = d());) {
              if (p !== ot) {
                if (p === ht) {
                  if (_ = S.isGlob = !0, C = !0, !0 === r) continue;
                  break;
                }
              } else y = S.backslashes = !0, p = d();
            }
          }
          if (!0 === _) {
            if (C = !0, !0 === r) continue;
            break;
          }
        } else v = S.negated = !0, f++;
      } else {
        if (
          u.push(c),
            s.push(S),
            S = { value: "", depth: 0, isGlob: !1 },
            !0 === C
        ) continue;
        if (i === ut && c === f + 1) {
          f += 2;
          continue;
        }
        A = c + 1;
      }
    } else y = S.backslashes = !0, p = d(), p === it && (b = !0);
  }
  !0 === n.noext && (g = !1, _ = !1);
  let T = l, H = "", m = "";
  f > 0 && (H = l.slice(0, f), l = l.slice(f), A -= f),
    T && !0 === _ && A > 0
      ? (T = l.slice(0, A), m = l.slice(A))
      : !0 === _
      ? (T = "", m = l)
      : T = l,
    T && "" !== T && "/" !== T && T !== l && _t(T.charCodeAt(T.length - 1)) &&
    (T = T.slice(0, -1)),
    !0 === n.unescape &&
    (m && (m = tt.removeBackslashes(m)),
      T && !0 === y && (T = tt.removeBackslashes(T)));
  const L = {
    prefix: H,
    input: t,
    start: f,
    base: T,
    glob: m,
    isBrace: h,
    isBracket: R,
    isGlob: _,
    isExtglob: g,
    isGlobstar: E,
    negated: v,
  };
  if (
    !0 === n.tokens && (L.maxDepth = 0, _t(p) || s.push(S), L.tokens = s),
      !0 === n.parts || !0 === n.tokens
  ) {
    let e;
    for (let o = 0; o < u.length; o++) {
      const r = e ? e + 1 : f, i = u[o], p = t.slice(r, i);
      n.tokens &&
      (0 === o && 0 !== f
        ? (s[o].isPrefix = !0, s[o].value = H)
        : s[o].value = p,
        gt(s[o]),
        L.maxDepth += s[o].depth),
        0 === o && "" === p || a.push(p),
        e = i;
    }
    if (e && e + 1 < t.length) {
      const o = t.slice(e + 1);
      a.push(o),
        n.tokens &&
        (s[s.length - 1].value = o,
          gt(s[s.length - 1]),
          L.maxDepth += s[s.length - 1].depth);
    }
    L.slashes = u, L.parts = a;
  }
  return L;
};
const bt = J,
  yt = K,
  {
    MAX_LENGTH: vt,
    POSIX_REGEX_SOURCE: Ct,
    REGEX_NON_SPECIAL_CHARS: $t,
    REGEX_SPECIAL_CHARS_BACKREF: St,
    REPLACEMENTS: xt,
  } = bt,
  dt = (t, e) => {
    if ("function" == typeof e.expandRange) return e.expandRange(...t, e);
    t.sort();
    const n = `[${t.join("-")}]`;
    try {
      new RegExp(n);
    } catch (e) {
      return t.map((t) => yt.escapeRegex(t)).join("..");
    }
    return n;
  },
  Tt = (t, e) =>
    `Missing ${t}: "${e}" - use "\\\\${e}" to match literal characters`,
  Ht = (t, e) => {
    if ("string" != typeof t) throw new TypeError("Expected a string");
    t = xt[t] || t;
    const n = { ...e },
      o = "number" == typeof n.maxLength ? Math.min(vt, n.maxLength) : vt;
    let r = t.length;
    if (r > o) {
      throw new SyntaxError(
        `Input length: ${r}, exceeds maximum allowed length: ${o}`,
      );
    }
    const u = { type: "bos", value: "", output: n.prepend || "" },
      s = [u],
      a = n.capture ? "" : "?:",
      i = yt.isWindows(e),
      p = bt.globChars(i),
      l = bt.extglobChars(p),
      {
        DOT_LITERAL: c,
        PLUS_LITERAL: f,
        SLASH_LITERAL: A,
        ONE_CHAR: h,
        DOTS_SLASH: R,
        NO_DOT: _,
        NO_DOT_SLASH: g,
        NO_DOTS_SLASH: E,
        QMARK: b,
        QMARK_NO_DOT: y,
        STAR: v,
        START_ANCHOR: C,
      } = p,
      $ = (t) => `(${a}(?:(?!${C}${t.dot ? R : c}).)*?)`,
      S = n.dot ? "" : _,
      x = n.dot ? b : y;
    let d = !0 === n.bash ? $(n) : v;
    n.capture && (d = `(${d})`),
      "boolean" == typeof n.noext && (n.noextglob = n.noext);
    const T = {
      input: t,
      index: -1,
      start: 0,
      dot: !0 === n.dot,
      consumed: "",
      output: "",
      prefix: "",
      backtrack: !1,
      negated: !1,
      brackets: 0,
      braces: 0,
      parens: 0,
      quotes: 0,
      globstar: !1,
      tokens: s,
    };
    t = yt.removePrefix(t, T), r = t.length;
    const H = [], m = [], L = [];
    let O, k = u;
    const w = () => T.index === r - 1,
      N = T.peek = (e = 1) => t[T.index + e],
      I = T.advance = () => t[++T.index],
      B = () => t.slice(T.index + 1),
      M = (t = "", e = 0) => {
        T.consumed += t, T.index += e;
      },
      D = (t) => {
        T.output += null != t.output ? t.output : t.value, M(t.value);
      },
      G = () => {
        let t = 1;
        for (; "!" === N() && ("(" !== N(2) || "?" === N(3));) {
          I(), T.start++, t++;
        }
        return t % 2 != 0 && (T.negated = !0, T.start++, !0);
      },
      P = (t) => {
        T[t]++, L.push(t);
      },
      K = (t) => {
        T[t]--, L.pop();
      },
      U = (t) => {
        if ("globstar" === k.type) {
          const e = T.braces > 0 && ("comma" === t.type || "brace" === t.type),
            n = !0 === t.extglob ||
              H.length && ("pipe" === t.type || "paren" === t.type);
          "slash" === t.type || "paren" === t.type || e || n ||
            (T.output = T.output.slice(0, -k.output.length),
              k.type = "star",
              k.value = "*",
              k.output = d,
              T.output += k.output);
        }
        if (
          H.length && "paren" !== t.type && !l[t.value] &&
          (H[H.length - 1].inner += t.value),
            (t.value || t.output) && D(t),
            k && "text" === k.type && "text" === t.type
        ) {
          return k.value += t.value,
            void (k.output = (k.output || "") + t.value);
        }
        t.prev = k, s.push(t), k = t;
      },
      X = (t, e) => {
        const o = { ...l[e], conditions: 1, inner: "" };
        o.prev = k, o.parens = T.parens, o.output = T.output;
        const r = (n.capture ? "(" : "") + o.open;
        P("parens"),
          U({ type: t, value: e, output: T.output ? "" : h }),
          U({ type: "paren", extglob: !0, value: I(), output: r }),
          H.push(o);
      },
      F = (t) => {
        let e = t.close + (n.capture ? ")" : "");
        if ("negate" === t.type) {
          let o = d;
          t.inner && t.inner.length > 1 && t.inner.includes("/") && (o = $(n)),
            (o !== d || w() || /^\)+$/.test(B())) && (e = t.close = `)$))${o}`),
            "bos" === t.prev.type && w() && (T.negatedExtglob = !0);
        }
        U({ type: "paren", extglob: !0, value: O, output: e }), K("parens");
      };
    if (!1 !== n.fastpaths && !/(^[*!]|[/()[\]{}"])/.test(t)) {
      let o = !1,
        r = t.replace(
          St,
          (t, e, n, r, u, s) =>
            "\\" === r
              ? (o = !0, t)
              : "?" === r
              ? e
                ? e + r + (u ? b.repeat(u.length) : "")
                : 0 === s
                ? x + (u ? b.repeat(u.length) : "")
                : b.repeat(n.length)
              : "." === r
              ? c.repeat(n.length)
              : "*" === r
              ? e ? e + r + (u ? d : "") : d
              : e
              ? t
              : `\\${t}`,
        );
      return !0 === o &&
        (r = !0 === n.unescape ? r.replace(/\\/g, "") : r.replace(
          /\\+/g,
          (t) => t.length % 2 == 0 ? "\\\\" : t ? "\\" : "",
        )),
        r === t && !0 === n.contains
          ? (T.output = t, T)
          : (T.output = yt.wrapOutput(r, T, e), T);
    }
    for (; !w();) {
      if (O = I(), "\0" === O) continue;
      if ("\\" === O) {
        const t = N();
        if ("/" === t && !0 !== n.bash) continue;
        if ("." === t || ";" === t) continue;
        if (!t) {
          O += "\\", U({ type: "text", value: O });
          continue;
        }
        const e = /^\\+/.exec(B());
        let o = 0;
        if (
          e && e[0].length > 2 &&
          (o = e[0].length, T.index += o, o % 2 != 0 && (O += "\\")),
            !0 === n.unescape ? O = I() || "" : O += I() || "",
            0 === T.brackets
        ) {
          U({ type: "text", value: O });
          continue;
        }
      }
      if (
        T.brackets > 0 && ("]" !== O || "[" === k.value || "[^" === k.value)
      ) {
        if (!1 !== n.posix && ":" === O) {
          const t = k.value.slice(1);
          if (t.includes("[") && (k.posix = !0, t.includes(":"))) {
            const t = k.value.lastIndexOf("["),
              e = k.value.slice(0, t),
              n = k.value.slice(t + 2),
              o = Ct[n];
            if (o) {
              k.value = e + o,
                T.backtrack = !0,
                I(),
                u.output || 1 !== s.indexOf(k) || (u.output = h);
              continue;
            }
          }
        }
        ("[" === O && ":" !== N() || "-" === O && "]" === N()) &&
        (O = `\\${O}`),
          "]" !== O || "[" !== k.value && "[^" !== k.value || (O = `\\${O}`),
          !0 === n.posix && "!" === O && "[" === k.value && (O = "^"),
          k.value += O,
          D({ value: O });
        continue;
      }
      if (1 === T.quotes && '"' !== O) {
        O = yt.escapeRegex(O), k.value += O, D({ value: O });
        continue;
      }
      if ('"' === O) {
        T.quotes = 1 === T.quotes ? 0 : 1,
          !0 === n.keepQuotes && U({ type: "text", value: O });
        continue;
      }
      if ("(" === O) {
        P("parens"), U({ type: "paren", value: O });
        continue;
      }
      if (")" === O) {
        if (0 === T.parens && !0 === n.strictBrackets) {
          throw new SyntaxError(Tt("opening", "("));
        }
        const t = H[H.length - 1];
        if (t && T.parens === t.parens + 1) {
          F(H.pop());
          continue;
        }
        U({ type: "paren", value: O, output: T.parens ? ")" : "\\)" }),
          K("parens");
        continue;
      }
      if ("[" === O) {
        if (!0 !== n.nobracket && B().includes("]")) P("brackets");
        else {
          if (!0 !== n.nobracket && !0 === n.strictBrackets) {
            throw new SyntaxError(Tt("closing", "]"));
          }
          O = `\\${O}`;
        }
        U({ type: "bracket", value: O });
        continue;
      }
      if ("]" === O) {
        if (
          !0 === n.nobracket ||
          k && "bracket" === k.type && 1 === k.value.length
        ) {
          U({ type: "text", value: O, output: `\\${O}` });
          continue;
        }
        if (0 === T.brackets) {
          if (!0 === n.strictBrackets) {
            throw new SyntaxError(Tt("opening", "["));
          }
          U({ type: "text", value: O, output: `\\${O}` });
          continue;
        }
        K("brackets");
        const t = k.value.slice(1);
        if (
          !0 === k.posix || "^" !== t[0] || t.includes("/") || (O = `/${O}`),
            k.value += O,
            D({ value: O }),
            !1 === n.literalBrackets || yt.hasRegexChars(t)
        ) continue;
        const e = yt.escapeRegex(k.value);
        if (
          T.output = T.output.slice(0, -k.value.length),
            !0 === n.literalBrackets
        ) {
          T.output += e, k.value = e;
          continue;
        }
        k.value = `(${a}${e}|${k.value})`, T.output += k.value;
        continue;
      }
      if ("{" === O && !0 !== n.nobrace) {
        P("braces");
        const t = {
          type: "brace",
          value: O,
          output: "(",
          outputIndex: T.output.length,
          tokensIndex: T.tokens.length,
        };
        m.push(t), U(t);
        continue;
      }
      if ("}" === O) {
        const t = m[m.length - 1];
        if (!0 === n.nobrace || !t) {
          U({ type: "text", value: O, output: O });
          continue;
        }
        let e = ")";
        if (!0 === t.dots) {
          const t = s.slice(), o = [];
          for (
            let e = t.length - 1;
            e >= 0 && (s.pop(), "brace" !== t[e].type);
            e--
          ) "dots" !== t[e].type && o.unshift(t[e].value);
          e = dt(o, n), T.backtrack = !0;
        }
        if (!0 !== t.comma && !0 !== t.dots) {
          const n = T.output.slice(0, t.outputIndex),
            o = T.tokens.slice(t.tokensIndex);
          t.value = t.output = "\\{", O = e = "\\}", T.output = n;
          for (const t of o) T.output += t.output || t.value;
        }
        U({ type: "brace", value: O, output: e }), K("braces"), m.pop();
        continue;
      }
      if ("|" === O) {
        H.length > 0 && H[H.length - 1].conditions++,
          U({ type: "text", value: O });
        continue;
      }
      if ("," === O) {
        let t = O;
        const e = m[m.length - 1];
        e && "braces" === L[L.length - 1] && (e.comma = !0, t = "|"),
          U({ type: "comma", value: O, output: t });
        continue;
      }
      if ("/" === O) {
        if ("dot" === k.type && T.index === T.start + 1) {
          T.start = T.index + 1, T.consumed = "", T.output = "", s.pop(), k = u;
          continue;
        }
        U({ type: "slash", value: O, output: A });
        continue;
      }
      if ("." === O) {
        if (T.braces > 0 && "dot" === k.type) {
          "." === k.value && (k.output = c);
          const t = m[m.length - 1];
          k.type = "dots", k.output += O, k.value += O, t.dots = !0;
          continue;
        }
        if (
          T.braces + T.parens === 0 && "bos" !== k.type && "slash" !== k.type
        ) {
          U({ type: "text", value: O, output: c });
          continue;
        }
        U({ type: "dot", value: O, output: c });
        continue;
      }
      if ("?" === O) {
        if (
          !(k && "(" === k.value) && !0 !== n.noextglob && "(" === N() &&
          "?" !== N(2)
        ) {
          X("qmark", O);
          continue;
        }
        if (k && "paren" === k.type) {
          const t = N();
          let e = O;
          if ("<" === t && !yt.supportsLookbehinds()) {
            throw new Error(
              "Node.js v10 or higher is required for regex lookbehinds",
            );
          }
          ("(" === k.value && !/[!=<:]/.test(t) ||
            "<" === t && !/<([!=]|\w+>)/.test(B())) && (e = `\\${O}`),
            U({ type: "text", value: O, output: e });
          continue;
        }
        if (!0 !== n.dot && ("slash" === k.type || "bos" === k.type)) {
          U({ type: "qmark", value: O, output: y });
          continue;
        }
        U({ type: "qmark", value: O, output: b });
        continue;
      }
      if ("!" === O) {
        if (
          !0 !== n.noextglob && "(" === N() &&
          ("?" !== N(2) || !/[!=<:]/.test(N(3)))
        ) {
          X("negate", O);
          continue;
        }
        if (!0 !== n.nonegate && 0 === T.index) {
          G();
          continue;
        }
      }
      if ("+" === O) {
        if (!0 !== n.noextglob && "(" === N() && "?" !== N(2)) {
          X("plus", O);
          continue;
        }
        if (k && "(" === k.value || !1 === n.regex) {
          U({ type: "plus", value: O, output: f });
          continue;
        }
        if (
          k &&
            ("bracket" === k.type || "paren" === k.type ||
              "brace" === k.type) || T.parens > 0
        ) {
          U({ type: "plus", value: O });
          continue;
        }
        U({ type: "plus", value: f });
        continue;
      }
      if ("@" === O) {
        if (!0 !== n.noextglob && "(" === N() && "?" !== N(2)) {
          U({ type: "at", extglob: !0, value: O, output: "" });
          continue;
        }
        U({ type: "text", value: O });
        continue;
      }
      if ("*" !== O) {
        "$" !== O && "^" !== O || (O = `\\${O}`);
        const t = $t.exec(B());
        t && (O += t[0], T.index += t[0].length), U({ type: "text", value: O });
        continue;
      }
      if (k && ("globstar" === k.type || !0 === k.star)) {
        k.type = "star",
          k.star = !0,
          k.value += O,
          k.output = d,
          T.backtrack = !0,
          T.globstar = !0,
          M(O);
        continue;
      }
      let e = B();
      if (!0 !== n.noextglob && /^\([^?]/.test(e)) {
        X("star", O);
        continue;
      }
      if ("star" === k.type) {
        if (!0 === n.noglobstar) {
          M(O);
          continue;
        }
        const o = k.prev,
          r = o.prev,
          u = "slash" === o.type || "bos" === o.type,
          s = r && ("star" === r.type || "globstar" === r.type);
        if (!0 === n.bash && (!u || e[0] && "/" !== e[0])) {
          U({ type: "star", value: O, output: "" });
          continue;
        }
        const a = T.braces > 0 && ("comma" === o.type || "brace" === o.type),
          i = H.length && ("pipe" === o.type || "paren" === o.type);
        if (!u && "paren" !== o.type && !a && !i) {
          U({ type: "star", value: O, output: "" });
          continue;
        }
        for (; "/**" === e.slice(0, 3);) {
          const n = t[T.index + 4];
          if (n && "/" !== n) break;
          e = e.slice(3), M("/**", 3);
        }
        if ("bos" === o.type && w()) {
          k.type = "globstar",
            k.value += O,
            k.output = $(n),
            T.output = k.output,
            T.globstar = !0,
            M(O);
          continue;
        }
        if ("slash" === o.type && "bos" !== o.prev.type && !s && w()) {
          T.output = T.output.slice(0, -(o.output + k.output).length),
            o.output = `(?:${o.output}`,
            k.type = "globstar",
            k.output = $(n) + (n.strictSlashes ? ")" : "|$)"),
            k.value += O,
            T.globstar = !0,
            T.output += o.output + k.output,
            M(O);
          continue;
        }
        if ("slash" === o.type && "bos" !== o.prev.type && "/" === e[0]) {
          const t = void 0 !== e[1] ? "|$" : "";
          T.output = T.output.slice(0, -(o.output + k.output).length),
            o.output = `(?:${o.output}`,
            k.type = "globstar",
            k.output = `${$(n)}${A}|${A}${t})`,
            k.value += O,
            T.output += o.output + k.output,
            T.globstar = !0,
            M(O + I()),
            U({ type: "slash", value: "/", output: "" });
          continue;
        }
        if ("bos" === o.type && "/" === e[0]) {
          k.type = "globstar",
            k.value += O,
            k.output = `(?:^|${A}|${$(n)}${A})`,
            T.output = k.output,
            T.globstar = !0,
            M(O + I()),
            U({ type: "slash", value: "/", output: "" });
          continue;
        }
        T.output = T.output.slice(0, -k.output.length),
          k.type = "globstar",
          k.output = $(n),
          k.value += O,
          T.output += k.output,
          T.globstar = !0,
          M(O);
        continue;
      }
      const o = { type: "star", value: O, output: d };
      !0 !== n.bash
        ? !k || "bracket" !== k.type && "paren" !== k.type || !0 !== n.regex
          ? (T.index !== T.start && "slash" !== k.type && "dot" !== k.type ||
            ("dot" === k.type
              ? (T.output += g, k.output += g)
              : !0 === n.dot
              ? (T.output += E, k.output += E)
              : (T.output += S, k.output += S),
              "*" !== N() && (T.output += h, k.output += h)),
            U(o))
          : (o.output = O, U(o))
        : (o.output = ".*?",
          "bos" !== k.type && "slash" !== k.type || (o.output = S + o.output),
          U(o));
    }
    for (; T.brackets > 0;) {
      if (!0 === n.strictBrackets) throw new SyntaxError(Tt("closing", "]"));
      T.output = yt.escapeLast(T.output, "["), K("brackets");
    }
    for (; T.parens > 0;) {
      if (!0 === n.strictBrackets) throw new SyntaxError(Tt("closing", ")"));
      T.output = yt.escapeLast(T.output, "("), K("parens");
    }
    for (; T.braces > 0;) {
      if (!0 === n.strictBrackets) throw new SyntaxError(Tt("closing", "}"));
      T.output = yt.escapeLast(T.output, "{"), K("braces");
    }
    if (
      !0 === n.strictSlashes || "star" !== k.type && "bracket" !== k.type ||
      U({ type: "maybe_slash", value: "", output: `${A}?` }), !0 === T.backtrack
    ) {
      T.output = "";
      for (const t of T.tokens) {
        T.output += null != t.output ? t.output : t.value,
          t.suffix && (T.output += t.suffix);
      }
    }
    return T;
  };
Ht.fastpaths = (t, e) => {
  const n = { ...e },
    o = "number" == typeof n.maxLength ? Math.min(vt, n.maxLength) : vt,
    r = t.length;
  if (r > o) {
    throw new SyntaxError(
      `Input length: ${r}, exceeds maximum allowed length: ${o}`,
    );
  }
  t = xt[t] || t;
  const u = yt.isWindows(e),
    {
      DOT_LITERAL: s,
      SLASH_LITERAL: a,
      ONE_CHAR: i,
      DOTS_SLASH: p,
      NO_DOT: l,
      NO_DOTS: c,
      NO_DOTS_SLASH: f,
      STAR: A,
      START_ANCHOR: h,
    } = bt.globChars(u),
    R = n.dot ? c : l,
    _ = n.dot ? f : l,
    g = n.capture ? "" : "?:";
  let E = !0 === n.bash ? ".*?" : A;
  n.capture && (E = `(${E})`);
  const b = (t) =>
      !0 === t.noglobstar ? E : `(${g}(?:(?!${h}${t.dot ? p : s}).)*?)`,
    y = (t) => {
      switch (t) {
        case "*":
          return `${R}${i}${E}`;
        case ".*":
          return `${s}${i}${E}`;
        case "*.*":
          return `${R}${E}${s}${i}${E}`;
        case "*/*":
          return `${R}${E}${a}${i}${_}${E}`;
        case "**":
          return R + b(n);
        case "**/*":
          return `(?:${R}${b(n)}${a})?${_}${i}${E}`;
        case "**/*.*":
          return `(?:${R}${b(n)}${a})?${_}${E}${s}${i}${E}`;
        case "**/.*":
          return `(?:${R}${b(n)}${a})?${s}${i}${E}`;
        default: {
          const e = /^(.*?)\.(\w+)$/.exec(t);
          if (!e) return;
          const n = y(e[1]);
          if (!n) return;
          return n + s + e[2];
        }
      }
    },
    v = yt.removePrefix(t, { negated: !1, prefix: "" });
  let C = y(v);
  return C && !0 !== n.strictSlashes && (C += `${a}?`), C;
};
const mt = R,
  Lt = Et,
  Ot = Ht,
  kt = K,
  wt = J,
  Nt = (t, e, n = !1) => {
    if (Array.isArray(t)) {
      const o = t.map((t) => Nt(t, e, n)),
        r = (t) => {
          for (const e of o) {
            const n = e(t);
            if (n) return n;
          }
          return !1;
        };
      return r;
    }
    const o = (r = t) && "object" == typeof r && !Array.isArray(r) &&
      t.tokens && t.input;
    var r;
    if ("" === t || "string" != typeof t && !o) {
      throw new TypeError("Expected pattern to be a non-empty string");
    }
    const u = e || {},
      s = kt.isWindows(e),
      a = o ? Nt.compileRe(t, e) : Nt.makeRe(t, e, !1, !0),
      i = a.state;
    delete a.state;
    let p = () => !1;
    if (u.ignore) {
      const t = { ...e, ignore: null, onMatch: null, onResult: null };
      p = Nt(u.ignore, t, n);
    }
    const l = (n, o = !1) => {
      const { isMatch: r, match: l, output: c } = Nt.test(n, a, e, {
          glob: t,
          posix: s,
        }),
        f = {
          glob: t,
          state: i,
          regex: a,
          posix: s,
          input: n,
          output: c,
          match: l,
          isMatch: r,
        };
      return "function" == typeof u.onResult && u.onResult(f),
        !1 === r
          ? (f.isMatch = !1, !!o && f)
          : p(n)
          ? ("function" == typeof u.onIgnore && u.onIgnore(f),
            f.isMatch = !1,
            !!o && f)
          : ("function" == typeof u.onMatch && u.onMatch(f), !o || f);
    };
    return n && (l.state = i), l;
  };
Nt.test = (t, e, n, { glob: o, posix: r } = {}) => {
  if ("string" != typeof t) {
    throw new TypeError("Expected input to be a string");
  }
  if ("" === t) return { isMatch: !1, output: "" };
  const u = n || {}, s = u.format || (r ? kt.toPosixSlashes : null);
  let a = t === o, i = a && s ? s(t) : t;
  return !1 === a && (i = s ? s(t) : t, a = i === o),
    !1 !== a && !0 !== u.capture ||
    (a = !0 === u.matchBase || !0 === u.basename
      ? Nt.matchBase(t, e, n, r)
      : e.exec(i)),
    { isMatch: Boolean(a), match: a, output: i };
},
  Nt.matchBase = (t, e, n, o = kt.isWindows(n)) =>
    (e instanceof RegExp ? e : Nt.makeRe(e, n)).test(mt.basename(t)),
  Nt.isMatch = (t, e, n) => Nt(e, n)(t),
  Nt.parse = (t, e) =>
    Array.isArray(t)
      ? t.map((t) => Nt.parse(t, e))
      : Ot(t, { ...e, fastpaths: !1 }),
  Nt.scan = (t, e) => Lt(t, e),
  Nt.compileRe = (t, e, n = !1, o = !1) => {
    if (!0 === n) return t.output;
    const r = e || {}, u = r.contains ? "" : "^", s = r.contains ? "" : "$";
    let a = `${u}(?:${t.output})${s}`;
    t && !0 === t.negated && (a = `^(?!${a}).*$`);
    const i = Nt.toRegex(a, e);
    return !0 === o && (i.state = t), i;
  },
  Nt.makeRe = (t, e, n = !1, o = !1) => {
    if (!t || "string" != typeof t) {
      throw new TypeError("Expected a non-empty string");
    }
    const r = e || {};
    let u, s = { negated: !1, fastpaths: !0 }, a = "";
    return t.startsWith("./") && (t = t.slice(2), a = s.prefix = "./"),
      !1 === r.fastpaths || "." !== t[0] && "*" !== t[0] ||
      (u = Ot.fastpaths(t, e)),
      void 0 === u
        ? (s = Ot(t, e), s.prefix = a + (s.prefix || ""))
        : s.output = u,
      Nt.compileRe(s, e, n, o);
  },
  Nt.toRegex = (t, e) => {
    try {
      const n = e || {};
      return new RegExp(t, n.flags || (n.nocase ? "i" : ""));
    } catch (t) {
      if (e && !0 === e.debug) throw t;
      return /$^/;
    }
  },
  Nt.constants = wt;
var It = Nt,
  Bt = It.compileRe,
  Mt = It.constants,
  Dt = It.isMatch,
  Gt = It.makeRe,
  Pt = It.matchBase,
  Kt = It.parse,
  Ut = It.scan,
  Xt = It.test,
  Ft = It.toRegex;
export {
  Bt as compileRe,
  Dt as isMatch,
  Ft as toRegex,
  Gt as makeRe,
  It as default,
  Kt as parse,
  Mt as constants,
  Pt as matchBase,
  Ut as scan,
  Xt as test,
};
//# sourceMappingURL=/sm/0fc14be77972238a6fd825db0cd04c9018ad360e0fbaa5856412ff6fca2bc248.map
