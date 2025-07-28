/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/braces@3.0.3/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import e from "/npm/fill-range@7.1.1/+esm";
var t, n = {};
(t = n).isInteger = (e) =>
  "number" == typeof e
    ? Number.isInteger(e)
    : "string" == typeof e && "" !== e.trim() && Number.isInteger(Number(e)),
  t.find = (e, t) => e.nodes.find((e) => e.type === t),
  t.exceedsLimit = (e, n, r = 1, s) =>
    !1 !== s && !(!t.isInteger(e) || !t.isInteger(n)) &&
    (Number(n) - Number(e)) / Number(r) >= s,
  t.escapeNode = (e, t = 0, n) => {
    const r = e.nodes[t];
    r && (n && r.type === n || "open" === r.type || "close" === r.type) &&
      !0 !== r.escaped && (r.value = "\\" + r.value, r.escaped = !0);
  },
  t.encloseBrace = (e) =>
    !("brace" !== e.type || e.commas >> 0 + e.ranges || (e.invalid = !0, 0)),
  t.isInvalidBrace = (e) =>
    !("brace" !== e.type ||
      !0 !== e.invalid && !e.dollar &&
        (e.commas >> 0 + e.ranges && !0 === e.open && !0 === e.close ||
          (e.invalid = !0, 0))),
  t.isOpenOrClose = (e) =>
    "open" === e.type || "close" === e.type || !0 === e.open || !0 === e.close,
  t.reduce = (e) =>
    e.reduce(
      (
        e,
        t,
      ) => ("text" === t.type && e.push(t.value),
        "range" === t.type && (t.type = "text"),
        e),
      [],
    ),
  t.flatten = (...e) => {
    const t = [],
      n = (e) => {
        for (let r = 0; r < e.length; r++) {
          const s = e[r];
          Array.isArray(s) ? n(s) : void 0 !== s && t.push(s);
        }
        return t;
      };
    return n(e), t;
  };
const r = n;
var s = (e, t = {}) => {
  const n = (e, s = {}) => {
    const o = t.escapeInvalid && r.isInvalidBrace(s),
      a = !0 === e.invalid && !0 === t.escapeInvalid;
    let p = "";
    if (e.value) {
      return (o || a) && r.isOpenOrClose(e) ? "\\" + e.value : e.value;
    }
    if (e.value) return e.value;
    if (e.nodes) { for (const t of e.nodes) p += n(t); }
    return p;
  };
  return n(e);
};
const o = e, a = n;
var p = (e, t = {}) => {
  const n = (e, r = {}) => {
    const s = a.isInvalidBrace(r),
      p = !0 === e.invalid && !0 === t.escapeInvalid,
      l = !0 === s || !0 === p,
      i = !0 === t.escapeInvalid ? "\\" : "";
    let A = "";
    if (!0 === e.isOpen) return i + e.value;
    if (!0 === e.isClose) {
      return console.log("node.isClose", i, e.value), i + e.value;
    }
    if ("open" === e.type) return l ? i + e.value : "(";
    if ("close" === e.type) return l ? i + e.value : ")";
    if ("comma" === e.type) {
      return "comma" === e.prev.type ? "" : l ? e.value : "|";
    }
    if (e.value) return e.value;
    if (e.nodes && e.ranges > 0) {
      const n = a.reduce(e.nodes),
        r = o(...n, { ...t, wrap: !1, toRegex: !0, strictZeros: !0 });
      if (0 !== r.length) return n.length > 1 && r.length > 1 ? `(${r})` : r;
    }
    if (e.nodes) { for (const t of e.nodes) A += n(t, e); }
    return A;
  };
  return n(e);
};
const l = e,
  i = s,
  A = n,
  u = (e = "", t = "", n = !1) => {
    const r = [];
    if (e = [].concat(e), !(t = [].concat(t)).length) return e;
    if (!e.length) return n ? A.flatten(t).map((e) => `{${e}}`) : t;
    for (const s of e) {
      if (Array.isArray(s)) { for (const e of s) r.push(u(e, t, n)); }
      else {for (let e of t) {
          !0 === n && "string" == typeof e && (e = `{${e}}`),
            r.push(Array.isArray(e) ? u(s, e, n) : s + e);
        }}
    }
    return A.flatten(r);
  };
var R = (e, t = {}) => {
  const n = void 0 === t.rangeLimit ? 1e3 : t.rangeLimit,
    r = (e, s = {}) => {
      e.queue = [];
      let o = s, a = s.queue;
      for (; "brace" !== o.type && "root" !== o.type && o.parent;) {
        o = o.parent, a = o.queue;
      }
      if (e.invalid || e.dollar) return void a.push(u(a.pop(), i(e, t)));
      if ("brace" === e.type && !0 !== e.invalid && 2 === e.nodes.length) {
        return void a.push(u(a.pop(), ["{}"]));
      }
      if (e.nodes && e.ranges > 0) {
        const r = A.reduce(e.nodes);
        if (A.exceedsLimit(...r, t.step, n)) {
          throw new RangeError(
            "expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.",
          );
        }
        let s = l(...r, t);
        return 0 === s.length && (s = i(e, t)),
          a.push(u(a.pop(), s)),
          void (e.nodes = []);
      }
      const p = A.encloseBrace(e);
      let R = e.queue, c = e;
      for (; "brace" !== c.type && "root" !== c.type && c.parent;) {
        c = c.parent, R = c.queue;
      }
      for (let t = 0; t < e.nodes.length; t++) {
        const n = e.nodes[t];
        "comma" !== n.type || "brace" !== e.type
          ? "close" !== n.type
            ? n.value && "open" !== n.type
              ? R.push(u(R.pop(), n.value))
              : n.nodes && r(n, e)
            : a.push(u(a.pop(), R, p))
          : (1 === t && R.push(""), R.push(""));
      }
      return R;
    };
  return A.flatten(r(e));
};
const c = s,
  {
    MAX_LENGTH: _,
    CHAR_BACKSLASH: C,
    CHAR_BACKTICK: f,
    CHAR_COMMA: E,
    CHAR_DOT: d,
    CHAR_LEFT_PARENTHESES: y,
    CHAR_RIGHT_PARENTHESES: H,
    CHAR_LEFT_CURLY_BRACE: v,
    CHAR_RIGHT_CURLY_BRACE: g,
    CHAR_LEFT_SQUARE_BRACKET: h,
    CHAR_RIGHT_SQUARE_BRACKET: m,
    CHAR_DOUBLE_QUOTE: T,
    CHAR_SINGLE_QUOTE: L,
    CHAR_NO_BREAK_SPACE: S,
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: x,
  } = {
    MAX_LENGTH: 1e4,
    CHAR_0: "0",
    CHAR_9: "9",
    CHAR_UPPERCASE_A: "A",
    CHAR_LOWERCASE_A: "a",
    CHAR_UPPERCASE_Z: "Z",
    CHAR_LOWERCASE_Z: "z",
    CHAR_LEFT_PARENTHESES: "(",
    CHAR_RIGHT_PARENTHESES: ")",
    CHAR_ASTERISK: "*",
    CHAR_AMPERSAND: "&",
    CHAR_AT: "@",
    CHAR_BACKSLASH: "\\",
    CHAR_BACKTICK: "`",
    CHAR_CARRIAGE_RETURN: "\r",
    CHAR_CIRCUMFLEX_ACCENT: "^",
    CHAR_COLON: ":",
    CHAR_COMMA: ",",
    CHAR_DOLLAR: "$",
    CHAR_DOT: ".",
    CHAR_DOUBLE_QUOTE: '"',
    CHAR_EQUAL: "=",
    CHAR_EXCLAMATION_MARK: "!",
    CHAR_FORM_FEED: "\f",
    CHAR_FORWARD_SLASH: "/",
    CHAR_HASH: "#",
    CHAR_HYPHEN_MINUS: "-",
    CHAR_LEFT_ANGLE_BRACKET: "<",
    CHAR_LEFT_CURLY_BRACE: "{",
    CHAR_LEFT_SQUARE_BRACKET: "[",
    CHAR_LINE_FEED: "\n",
    CHAR_NO_BREAK_SPACE: " ",
    CHAR_PERCENT: "%",
    CHAR_PLUS: "+",
    CHAR_QUESTION_MARK: "?",
    CHAR_RIGHT_ANGLE_BRACKET: ">",
    CHAR_RIGHT_CURLY_BRACE: "}",
    CHAR_RIGHT_SQUARE_BRACKET: "]",
    CHAR_SEMICOLON: ";",
    CHAR_SINGLE_QUOTE: "'",
    CHAR_SPACE: " ",
    CHAR_TAB: "\t",
    CHAR_UNDERSCORE: "_",
    CHAR_VERTICAL_LINE: "|",
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\ufeff",
  };
const I = s,
  O = p,
  N = R,
  B = (e, t = {}) => {
    if ("string" != typeof e) throw new TypeError("Expected a string");
    const n = t || {},
      r = "number" == typeof n.maxLength ? Math.min(_, n.maxLength) : _;
    if (e.length > r) {
      throw new SyntaxError(
        `Input length (${e.length}), exceeds max characters (${r})`,
      );
    }
    const s = { type: "root", input: e, nodes: [] }, o = [s];
    let a = s, p = s, l = 0;
    const i = e.length;
    let A, u = 0, R = 0;
    const I = () => e[u++],
      O = (e) => {
        if (
          "text" === e.type && "dot" === p.type && (p.type = "text"),
            !p || "text" !== p.type || "text" !== e.type
        ) return a.nodes.push(e), e.parent = a, e.prev = p, p = e, e;
        p.value += e.value;
      };
    for (O({ type: "bos" }); u < i;) {
      if (a = o[o.length - 1], A = I(), A !== x && A !== S) {
        if (A !== C) {
          if (A !== m) {
            if (A !== h) {
              if (A !== y) {
                if (A !== H) {
                  if (A !== T && A !== L && A !== f) {
                    if (A !== v) {
                      if (A !== g) {
                        if (A === E && R > 0) {
                          if (a.ranges > 0) {
                            a.ranges = 0;
                            const e = a.nodes.shift();
                            a.nodes = [e, { type: "text", value: c(a) }];
                          }
                          O({ type: "comma", value: A }), a.commas++;
                        } else if (A === d && R > 0 && 0 === a.commas) {
                          const e = a.nodes;
                          if (0 === R || 0 === e.length) {
                            O({ type: "text", value: A });
                            continue;
                          }
                          if ("dot" === p.type) {
                            if (
                              a.range = [],
                                p.value += A,
                                p.type = "range",
                                3 !== a.nodes.length && 5 !== a.nodes.length
                            ) {
                              a.invalid = !0, a.ranges = 0, p.type = "text";
                              continue;
                            }
                            a.ranges++, a.args = [];
                            continue;
                          }
                          if ("range" === p.type) {
                            e.pop();
                            const t = e[e.length - 1];
                            t.value += p.value + A, p = t, a.ranges--;
                            continue;
                          }
                          O({ type: "dot", value: A });
                        } else O({ type: "text", value: A });
                      } else {
                        if ("brace" !== a.type) {
                          O({ type: "text", value: A });
                          continue;
                        }
                        const e = "close";
                        a = o.pop(),
                          a.close = !0,
                          O({ type: e, value: A }),
                          R--,
                          a = o[o.length - 1];
                      }
                    } else {
                      R++;
                      const e = p.value && "$" === p.value.slice(-1) ||
                        !0 === a.dollar;
                      a = O({
                        type: "brace",
                        open: !0,
                        close: !1,
                        dollar: e,
                        depth: R,
                        commas: 0,
                        ranges: 0,
                        nodes: [],
                      }),
                        o.push(a),
                        O({ type: "open", value: A });
                    }
                  } else {
                    const e = A;
                    let n;
                    for (!0 !== t.keepQuotes && (A = ""); u < i && (n = I());) {
                      if (n !== C) {
                        if (n === e) {
                          !0 === t.keepQuotes && (A += n);
                          break;
                        }
                        A += n;
                      } else A += n + I();
                    }
                    O({ type: "text", value: A });
                  }
                } else {
                  if ("paren" !== a.type) {
                    O({ type: "text", value: A });
                    continue;
                  }
                  a = o.pop(),
                    O({ type: "text", value: A }),
                    a = o[o.length - 1];
                }
              } else {a = O({ type: "paren", nodes: [] }),
                  o.push(a),
                  O({ type: "text", value: A });}
            } else {
              let e;
              for (l++; u < i && (e = I());) {
                if (A += e, e !== h) {
                  if (e !== C) { if (e === m && (l--, 0 === l)) break; }
                  else A += I();
                } else l++;
              }
              O({ type: "text", value: A });
            }
          } else O({ type: "text", value: "\\" + A });
        } else O({ type: "text", value: (t.keepEscaping ? A : "") + I() });
      }
    }
    do {
      if (a = o.pop(), "root" !== a.type) {
        a.nodes.forEach((e) => {
          e.nodes ||
            ("open" === e.type && (e.isOpen = !0),
              "close" === e.type && (e.isClose = !0),
              e.nodes || (e.type = "text"),
              e.invalid = !0);
        });
        const e = o[o.length - 1], t = e.nodes.indexOf(a);
        e.nodes.splice(t, 1, ...a.nodes);
      }
    } while (o.length > 0);
    return O({ type: "eos" }), s;
  },
  U = (e, t = {}) => {
    let n = [];
    if (Array.isArray(e)) {
      for (const r of e) {
        const e = U.create(r, t);
        Array.isArray(e) ? n.push(...e) : n.push(e);
      }
    } else n = [].concat(U.create(e, t));
    return t && !0 === t.expand && !0 === t.nodupes && (n = [...new Set(n)]), n;
  };
U.parse = (e, t = {}) => B(e, t),
  U.stringify = (e, t = {}) => I("string" == typeof e ? U.parse(e, t) : e, t),
  U.compile = (
    e,
    t = {},
  ) => ("string" == typeof e && (e = U.parse(e, t)), O(e, t)),
  U.expand = (e, t = {}) => {
    "string" == typeof e && (e = U.parse(e, t));
    let n = N(e, t);
    return !0 === t.noempty && (n = n.filter(Boolean)),
      !0 === t.nodupes && (n = [...new Set(n)]),
      n;
  },
  U.create = (e, t = {}) =>
    "" === e || e.length < 3
      ? [e]
      : !0 !== t.expand
      ? U.compile(e, t)
      : U.expand(e, t);
var b = U,
  K = b.compile,
  P = b.create,
  M = b.expand,
  G = b.parse,
  D = b.stringify;
export {
  b as default,
  D as stringify,
  G as parse,
  K as compile,
  M as expand,
  P as create,
};
//# sourceMappingURL=/sm/853c69a94b06a11e671239c89ad19603ee53681f79622eb4cf076edd88112dde.map
