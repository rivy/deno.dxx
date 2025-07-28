/* esm.sh - loupe@2.3.7 */
import __Process$ from "node:process";
import { Buffer as __Buffer$ } from "node:buffer";
import * as __0$ from "node:util";
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m,
    c = (m) => Object.assign({ __esModule: true }, m);
  switch (n) {
    case "node:util":
      return e(__0$);
    default:
      console.error('module "' + n + '" not found');
      return null;
  }
};
var Q =
  ((t) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(t, { get: (e, n) => (typeof require < "u" ? require : e)[n] })
      : t)(function (t) {
      if (typeof require < "u") {
        return require.apply(this, arguments);
      }
      throw Error('Dynamic require of "' + t + '" is not supported');
    });
var U = {
    bold: ["1", "22"],
    dim: ["2", "22"],
    italic: ["3", "23"],
    underline: ["4", "24"],
    inverse: ["7", "27"],
    hidden: ["8", "28"],
    strike: ["9", "29"],
    black: ["30", "39"],
    red: ["31", "39"],
    green: ["32", "39"],
    yellow: ["33", "39"],
    blue: ["34", "39"],
    magenta: ["35", "39"],
    cyan: ["36", "39"],
    white: ["37", "39"],
    brightblack: ["30;1", "39"],
    brightred: ["31;1", "39"],
    brightgreen: ["32;1", "39"],
    brightyellow: ["33;1", "39"],
    brightblue: ["34;1", "39"],
    brightmagenta: ["35;1", "39"],
    brightcyan: ["36;1", "39"],
    brightwhite: ["37;1", "39"],
    grey: ["90", "39"],
  },
  X = {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red",
  },
  g = "\u2026";
function Y(t, e) {
  let n = U[X[e]] || U[e];
  return n ? `\x1B[${n[0]}m${String(t)}\x1B[${n[1]}m` : String(t);
}
function _(
  {
    showHidden: t = !1,
    depth: e = 2,
    colors: n = !1,
    customInspect: r = !0,
    showProxy: i = !1,
    maxArrayLength: c = 1 / 0,
    breakLength: o = 1 / 0,
    seen: s = [],
    truncate: m = 1 / 0,
    stylize: l = String,
  } = {},
) {
  let p = {
    showHidden: !!t,
    depth: Number(e),
    colors: !!n,
    customInspect: !!r,
    showProxy: !!i,
    maxArrayLength: Number(c),
    breakLength: Number(o),
    truncate: Number(m),
    seen: s,
    stylize: l,
  };
  return p.colors && (p.stylize = Y), p;
}
function f(t, e, n = g) {
  t = String(t);
  let r = n.length, i = t.length;
  return r > e && i > r ? n : i > e && i > r ? `${t.slice(0, e - r)}${n}` : t;
}
function u(t, e, n, r = ", ") {
  n = n || e.inspect;
  let i = t.length;
  if (i === 0) {
    return "";
  }
  let c = e.truncate, o = "", s = "", m = "";
  for (let l = 0; l < i; l += 1) {
    let p = l + 1 === t.length, d = l + 2 === t.length;
    m = `${g}(${t.length - l})`;
    let G = t[l];
    e.truncate = c - o.length - (p ? 0 : r.length);
    let R = s || n(G, e) + (p ? "" : r),
      $ = o.length + R.length,
      W = $ + m.length;
    if (
      p && $ > c && o.length + m.length <= c || !p && !d && W > c ||
      (s = p ? "" : n(t[l + 1], e) + (d ? "" : r),
        !p && d && W > c && $ + s.length > c)
    ) {
      break;
    }
    if (o += R, !p && !d && $ + s.length >= c) {
      m = `${g}(${t.length - l - 1})`;
      break;
    }
    m = "";
  }
  return `${o}${m}`;
}
function v(t) {
  return t.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)
    ? t
    : JSON.stringify(t).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(
      /(^"|"$)/g,
      "'",
    );
}
function h([t, e], n) {
  return n.truncate -= 2,
    typeof t == "string"
      ? t = v(t)
      : typeof t != "number" && (t = `[${n.inspect(t, n)}]`),
    n.truncate -= t.length,
    e = n.inspect(e, n),
    `${t}: ${e}`;
}
function w(t, e) {
  let n = Object.keys(t).slice(t.length);
  if (!t.length && !n.length) {
    return "[]";
  }
  e.truncate -= 4;
  let r = u(t, e);
  e.truncate -= r.length;
  let i = "";
  return n.length && (i = u(n.map((c) => [c, t[c]]), e, h)),
    `[ ${r}${i ? `, ${i}` : ""} ]`;
}
import tt from "../../../esm.sh/get-func-name@2.0.2.js";
var et = (t) =>
  typeof __Buffer$ == "function" && t instanceof __Buffer$
    ? "Buffer"
    : t[Symbol.toStringTag]
    ? t[Symbol.toStringTag]
    : tt(t.constructor);
function a(t, e) {
  let n = et(t);
  e.truncate -= n.length + 4;
  let r = Object.keys(t).slice(t.length);
  if (!t.length && !r.length) {
    return `${n}[]`;
  }
  let i = "";
  for (let o = 0; o < t.length; o++) {
    let s = `${e.stylize(f(t[o], e.truncate), "number")}${
      o === t.length - 1 ? "" : ", "
    }`;
    if (e.truncate -= s.length, t[o] !== t.length && e.truncate <= 3) {
      i += `${g}(${t.length - t[o] + 1})`;
      break;
    }
    i += s;
  }
  let c = "";
  return r.length && (c = u(r.map((o) => [o, t[o]]), e, h)),
    `${n}[ ${i}${c ? `, ${c}` : ""} ]`;
}
function I(t, e) {
  let n = t.toJSON();
  if (n === null) {
    return "Invalid Date";
  }
  let r = n.split("T"), i = r[0];
  return e.stylize(`${i}T${f(r[1], e.truncate - i.length - 1)}`, "date");
}
import nt from "../../../esm.sh/get-func-name@2.0.2.js";
function S(t, e) {
  let n = nt(t);
  return n
    ? e.stylize(`[Function ${f(n, e.truncate - 11)}]`, "special")
    : e.stylize("[Function]", "special");
}
function rt([t, e], n) {
  return n.truncate -= 4,
    t = n.inspect(t, n),
    n.truncate -= t.length,
    e = n.inspect(e, n),
    `${t} => ${e}`;
}
function it(t) {
  let e = [];
  return t.forEach((n, r) => {
    e.push([r, n]);
  }),
    e;
}
function T(t, e) {
  return t.size - 1 <= 0
    ? "Map{}"
    : (e.truncate -= 7, `Map{ ${u(it(t), e, rt)} }`);
}
var ct = Number.isNaN || ((t) => t !== t);
function x(t, e) {
  return ct(t)
    ? e.stylize("NaN", "number")
    : t === 1 / 0
    ? e.stylize("Infinity", "number")
    : t === -1 / 0
    ? e.stylize("-Infinity", "number")
    : t === 0
    ? e.stylize(1 / t === 1 / 0 ? "+0" : "-0", "number")
    : e.stylize(f(t, e.truncate), "number");
}
function z(t, e) {
  let n = f(t.toString(), e.truncate - 1);
  return n !== g && (n += "n"), e.stylize(n, "bigint");
}
function E(t, e) {
  let n = t.toString().split("/")[2],
    r = e.truncate - (2 + n.length),
    i = t.source;
  return e.stylize(`/${f(i, r)}/${n}`, "regexp");
}
function ot(t) {
  let e = [];
  return t.forEach((n) => {
    e.push(n);
  }),
    e;
}
function j(t, e) {
  return t.size === 0 ? "Set{}" : (e.truncate -= 7, `Set{ ${u(ot(t), e)} }`);
}
var V = new RegExp(
    "['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]",
    "g",
  ),
  st = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "'": "\\'",
    "\\": "\\\\",
  },
  ut = 16,
  ft = 4;
function lt(t) {
  return st[t] || `\\u${`0000${t.charCodeAt(0).toString(ut)}`.slice(-ft)}`;
}
function A(t, e) {
  return V.test(t) && (t = t.replace(V, lt)),
    e.stylize(`'${f(t, e.truncate - 2)}'`, "string");
}
function N(t) {
  return "description" in Symbol.prototype
    ? t.description ? `Symbol(${t.description})` : "Symbol()"
    : t.toString();
}
var q = () => "Promise{\u2026}";
try {
  let { getPromiseDetails: t, kPending: e, kRejected: n } = __Process$.binding(
    "util",
  );
  Array.isArray(t(Promise.resolve())) && (q = (r, i) => {
    let [c, o] = t(r);
    return c === e
      ? "Promise{<pending>}"
      : `Promise${c === n ? "!" : ""}{${i.inspect(o, i)}}`;
  });
} catch {}
var J = q;
import pt from "../../../esm.sh/get-func-name@2.0.2.js";
function y(t, e) {
  let n = Object.getOwnPropertyNames(t),
    r = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : [];
  if (n.length === 0 && r.length === 0) {
    return "{}";
  }
  if (e.truncate -= 4, e.seen = e.seen || [], e.seen.indexOf(t) >= 0) {
    return "[Circular]";
  }
  e.seen.push(t);
  let i = u(n.map((s) => [s, t[s]]), e, h),
    c = u(r.map((s) => [s, t[s]]), e, h);
  e.seen.pop();
  let o = "";
  return i && c && (o = ", "), `{ ${i}${o}${c} }`;
}
var B = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : !1;
function F(t, e) {
  let n = "";
  return B && B in t && (n = t[B]),
    n = n || pt(t.constructor),
    (!n || n === "_class") && (n = "<Anonymous Class>"),
    e.truncate -= n.length,
    `${n}${y(t, e)}`;
}
function H(t, e) {
  return t.length === 0
    ? "Arguments[]"
    : (e.truncate -= 13, `Arguments[ ${u(t, e)} ]`);
}
var at = [
  "stack",
  "line",
  "column",
  "name",
  "message",
  "fileName",
  "lineNumber",
  "columnNumber",
  "number",
  "description",
];
function D(t, e) {
  let n = Object.getOwnPropertyNames(t).filter((o) => at.indexOf(o) === -1),
    r = t.name;
  e.truncate -= r.length;
  let i = "";
  typeof t.message == "string"
    ? i = f(t.message, e.truncate)
    : n.unshift("message"),
    i = i ? `: ${i}` : "",
    e.truncate -= i.length + 5;
  let c = u(n.map((o) => [o, t[o]]), e, h);
  return `${r}${i}${c ? ` { ${c} }` : ""}`;
}
function mt([t, e], n) {
  return n.truncate -= 3,
    e
      ? `${n.stylize(t, "yellow")}=${n.stylize(`"${e}"`, "string")}`
      : `${n.stylize(t, "yellow")}`;
}
function L(t, e) {
  return u(
    t,
    e,
    O,
    `
`,
  );
}
function O(t, e) {
  let n = t.getAttributeNames(),
    r = t.tagName.toLowerCase(),
    i = e.stylize(`<${r}`, "special"),
    c = e.stylize(">", "special"),
    o = e.stylize(`</${r}>`, "special");
  e.truncate -= r.length * 2 + 5;
  let s = "";
  n.length > 0 &&
  (s += " ", s += u(n.map((p) => [p, t.getAttribute(p)]), e, mt, " ")),
    e.truncate -= s.length;
  let m = e.truncate, l = L(t.children, e);
  return l && l.length > m && (l = `${g}(${t.children.length})`),
    `${i}${s}${c}${l}${o}`;
}
var gt = typeof Symbol == "function" && typeof Symbol.for == "function",
  C = gt ? Symbol.for("chai/inspect") : "@@chai/inspect",
  b = !1;
try {
  let t = Q("node:util");
  b = t.inspect ? t.inspect.custom : !1;
} catch {
  b = !1;
}
function Z() {
  this.key = "chai/loupe__" + Math.random() + Date.now();
}
Z.prototype = {
  get: function (e) {
    return e[this.key];
  },
  has: function (e) {
    return this.key in e;
  },
  set: function (e, n) {
    Object.isExtensible(e) &&
      Object.defineProperty(e, this.key, { value: n, configurable: !0 });
  },
};
var P = new (typeof WeakMap == "function" ? WeakMap : Z)(),
  M = {},
  K = {
    undefined: (t, e) => e.stylize("undefined", "undefined"),
    null: (t, e) => e.stylize(null, "null"),
    boolean: (t, e) => e.stylize(t, "boolean"),
    Boolean: (t, e) => e.stylize(t, "boolean"),
    number: x,
    Number: x,
    bigint: z,
    BigInt: z,
    string: A,
    String: A,
    function: S,
    Function: S,
    symbol: N,
    Symbol: N,
    Array: w,
    Date: I,
    Map: T,
    Set: j,
    RegExp: E,
    Promise: J,
    WeakSet: (t, e) => e.stylize("WeakSet{\u2026}", "special"),
    WeakMap: (t, e) => e.stylize("WeakMap{\u2026}", "special"),
    Arguments: H,
    Int8Array: a,
    Uint8Array: a,
    Uint8ClampedArray: a,
    Int16Array: a,
    Uint16Array: a,
    Int32Array: a,
    Uint32Array: a,
    Float32Array: a,
    Float64Array: a,
    Generator: () => "",
    DataView: () => "",
    ArrayBuffer: () => "",
    Error: D,
    HTMLCollection: L,
    NodeList: L,
  },
  ht = (t, e, n) =>
    C in t && typeof t[C] == "function"
      ? t[C](e)
      : b && b in t && typeof t[b] == "function"
      ? t[b](e.depth, e)
      : "inspect" in t && typeof t.inspect == "function"
      ? t.inspect(e.depth, e)
      : "constructor" in t && P.has(t.constructor)
      ? P.get(t.constructor)(t, e)
      : M[n]
      ? M[n](t, e)
      : "",
  yt = Object.prototype.toString;
function k(t, e) {
  e = _(e), e.inspect = k;
  let { customInspect: n } = e, r = t === null ? "null" : typeof t;
  if (r === "object" && (r = yt.call(t).slice(8, -1)), K[r]) {
    return K[r](t, e);
  }
  if (n && t) {
    let c = ht(t, e, r);
    if (c) {
      return typeof c == "string" ? c : k(c, e);
    }
  }
  let i = t ? Object.getPrototypeOf(t) : !1;
  return i === Object.prototype || i === null
    ? y(t, e)
    : t && typeof HTMLElement == "function" && t instanceof HTMLElement
    ? O(t, e)
    : "constructor" in t
    ? t.constructor !== Object ? F(t, e) : y(t, e)
    : t === Object(t)
    ? y(t, e)
    : e.stylize(String(t), r);
}
function de(t, e) {
  return P.has(t) ? !1 : (P.set(t, e), !0);
}
function $e(t, e) {
  return t in M ? !1 : (M[t] = e, !0);
}
var Se = C, xe = k;
export {
  $e as registerStringTag,
  de as registerConstructor,
  k as inspect,
  Se as custom,
  xe as default,
};
//# sourceMappingURL=loupe.mjs.map
