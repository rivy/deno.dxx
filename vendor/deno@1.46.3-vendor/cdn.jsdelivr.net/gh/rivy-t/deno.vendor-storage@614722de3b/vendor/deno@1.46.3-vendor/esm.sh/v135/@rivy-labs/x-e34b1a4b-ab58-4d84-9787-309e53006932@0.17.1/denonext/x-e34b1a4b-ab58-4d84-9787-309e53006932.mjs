/* esm.sh - esbuild bundle(@rivy-labs/x-e34b1a4b-ab58-4d84-9787-309e53006932@0.17.1) denonext production */
import __Process$ from "node:process";
import * as __0$ from "../../../../../esm.sh/v135/lru-cache@7.18.3/denonext/lru-cache.mjs";
import * as __1$ from "../../../../../esm.sh/v135/sigmund@1.0.1/denonext/sigmund.mjs";
import * as __2$ from "node:path";
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m,
    c = (m) => Object.assign({ __esModule: true }, m);
  switch (n) {
    case "lru-cache":
      return e(__0$);
    case "sigmund":
      return e(__1$);
    case "path":
      return e(__2$);
    default:
      throw new Error('module "' + n + '" not found');
  }
};
var ne = Object.create;
var N = Object.defineProperty;
var ie = Object.getOwnPropertyDescriptor;
var se = Object.getOwnPropertyNames;
var oe = Object.getPrototypeOf, ae = Object.prototype.hasOwnProperty;
var z =
  ((e) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(e, { get: (t, n) => (typeof require < "u" ? require : t)[n] })
      : e)(function (e) {
      if (typeof require < "u") {
        return require.apply(this, arguments);
      }
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
var ce = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  ue = (e, t) => {
    for (var n in t) {
      N(e, n, { get: t[n], enumerable: !0 });
    }
  },
  fe = (e, t, n, r) => {
    if (t && typeof t == "object" || typeof t == "function") {
      for (let i of se(t)) {
        !ae.call(e, i) && i !== n && N(e, i, {
          get: () => t[i],
          enumerable: !(r = ie(t, i)) || r.enumerable,
        });
      }
    }
    return e;
  };
var le = (
  e,
  t,
  n,
) => (n = e != null ? ne(oe(e)) : {},
  fe(
    t || !e || !e.__esModule
      ? N(n, "default", { value: e, enumerable: !0 })
      : n,
    e,
  ));
var W = ce((Q, G) => {
  var V = typeof __Process$ == "object" ? __Process$.platform : "win32";
  G ? G.exports = m : Q.minimatch = m;
  m.Minimatch = d;
  var he = z("lru-cache"),
    ge = m.cache = new he({ max: 100 }),
    q = m.GLOBSTAR = d.GLOBSTAR = {},
    pe = z("sigmund"),
    de = z("path"),
    T = "[^/]",
    $ = T + "*?",
    me = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
    be = "(?:(?!(?:\\/|^)\\.).)*?",
    H = ve("().*{}+?[]^$\\!");
  function ve(e) {
    return e.split("").reduce(function (t, n) {
      return t[n] = !0, t;
    }, {});
  }
  var X = /\/+/;
  m.monkeyPatch = ye;
  function ye() {
    var e = Object.getOwnPropertyDescriptor(String.prototype, "match"),
      t = e.value;
    e.value = function (n) {
      return n instanceof d ? n.match(this) : t.call(this, n);
    }, Object.defineProperty(String.prototype, e);
  }
  m.filter = we;
  function we(e, t) {
    return t = t || {}, function (n, r, i) {
      return m(n, e, t);
    };
  }
  function I(e, t) {
    e = e || {}, t = t || {};
    var n = {};
    return Object.keys(t).forEach(function (r) {
      n[r] = t[r];
    }),
      Object.keys(e).forEach(function (r) {
        n[r] = e[r];
      }),
      n;
  }
  m.defaults = function (e) {
    if (!e || !Object.keys(e).length) {
      return m;
    }
    var t = m,
      n = function (i, s, o) {
        return t.minimatch(i, s, I(e, o));
      };
    return n.Minimatch = function (i, s) {
      return new t.Minimatch(i, I(e, s));
    },
      n;
  };
  d.defaults = function (e) {
    return !e || !Object.keys(e).length ? d : m.defaults(e).Minimatch;
  };
  function m(e, t, n) {
    if (typeof t != "string") {
      throw new TypeError("glob pattern string required");
    }
    return n || (n = {}),
      !n.nocomment && t.charAt(0) === "#"
        ? !1
        : t.trim() === ""
        ? e === ""
        : new d(t, n).match(e);
  }
  function d(e, t) {
    if (!(this instanceof d)) {
      return new d(e, t, ge);
    }
    if (typeof e != "string") {
      throw new TypeError("glob pattern string required");
    }
    t || (t = {}), V === "win32" && (e = e.split("\\").join("/"));
    var n = e + `
` +
        pe(t),
      r = m.cache.get(n);
    if (r) {
      return r;
    }
    m.cache.set(n, this),
      this.options = t,
      this.set = [],
      this.pattern = e,
      this.regexp = null,
      this.negate = !1,
      this.comment = !1,
      this.empty = !1,
      this.make();
  }
  d.prototype.make = xe;
  function xe() {
    if (!this._made) {
      var e = this.pattern, t = this.options;
      if (!t.nocomment && e.charAt(0) === "#") {
        this.comment = !0;
        return;
      }
      if (!e) {
        this.empty = !0;
        return;
      }
      this.parseNegate();
      var n = this.globSet = this.braceExpand();
      t.debug && console.error(this.pattern, n),
        n = this.globParts = n.map(function (r) {
          return r.split(X);
        }),
        t.debug && console.error(this.pattern, n),
        n = n.map(function (r, i, s) {
          return r.map(this.parse, this);
        }, this),
        t.debug && console.error(this.pattern, n),
        n = n.filter(function (r) {
          return r.indexOf(!1) === -1;
        }),
        t.debug && console.error(this.pattern, n),
        this.set = n;
    }
  }
  d.prototype.parseNegate = Se;
  function Se() {
    var e = this.pattern, t = !1, n = this.options, r = 0;
    if (!n.nonegate) {
      for (var i = 0, s = e.length; i < s && e.charAt(i) === "!"; i++) {
        t = !t, r++;
      }
      r && (this.pattern = e.substr(r)), this.negate = t;
    }
  }
  m.braceExpand = function (e, t) {
    return new d(e, t).braceExpand();
  };
  d.prototype.braceExpand = _;
  function _(e, t) {
    if (
      t = t || this.options,
        e = typeof e > "u" ? this.pattern : e,
        typeof e > "u"
    ) {
      throw new Error("undefined pattern");
    }
    if (t.nobrace || !e.match(/\{.*\}/)) {
      return [e];
    }
    var S = !1;
    if (e.charAt(0) !== "{") {
      for (var n = null, a = 0, r = e.length; a < r; a++) {
        var i = e.charAt(a);
        if (i === "\\") {
          S = !S;
        } else if (i === "{" && !S) {
          n = e.substr(0, a);
          break;
        }
      }
      if (n === null) {
        return [e];
      }
      var s = _(e.substr(a), t);
      return s.map(function (w) {
        return n + w;
      });
    }
    var o = e.match(/^\{(-?[0-9]+)\.\.(-?[0-9]+)\}/);
    if (o) {
      for (
        var v = _(e.substr(o[0].length), t),
          g = +o[1],
          c = +o[2],
          f = g > c ? -1 : 1,
          u = [],
          a = g;
        a != c + f;
        a += f
      ) {
        for (var l = 0, b = v.length; l < b; l++) {
          u.push(a + v[l]);
        }
      }
      return u;
    }
    var a = 1, h = 1, u = [], x = "", p = !1, S = !1;
    function O() {
      u.push(x), x = "";
    }
    e: for (a = 1, r = e.length; a < r; a++) {
      var i = e.charAt(a);
      if (S) {
        S = !1, x += "\\" + i;
      } else {
        switch (i) {
          case "\\":
            S = !0;
            continue;
          case "{":
            h++, x += "{";
            continue;
          case "}":
            if (h--, h === 0) {
              O(), a++;
              break e;
            } else {
              x += i;
              continue;
            }
          case ",":
            h === 1 ? O() : x += i;
            continue;
          default:
            x += i;
            continue;
        }
      }
    }
    if (h !== 0) {
      return _("\\" + e, t);
    }
    var v = _(e.substr(a), t), P = u.length === 1;
    u = u.map(function (w) {
      return _(w, t);
    }),
      u = u.reduce(function (w, L) {
        return w.concat(L);
      }),
      P && (u = u.map(function (w) {
        return "{" + w + "}";
      }));
    for (var k = [], a = 0, r = u.length; a < r; a++) {
      for (var l = 0, b = v.length; l < b; l++) {
        k.push(u[a] + v[l]);
      }
    }
    return k;
  }
  d.prototype.parse = _e;
  var J = {};
  function _e(e, t) {
    var n = this.options;
    if (!n.noglobstar && e === "**") {
      return q;
    }
    if (e === "") {
      return "";
    }
    var r = "",
      i = !!n.nocase,
      s = !1,
      o = [],
      g,
      c,
      f = !1,
      l = -1,
      b = -1,
      a = e.charAt(0) === "."
        ? ""
        : n.dot
        ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))"
        : "(?!\\.)";
    function h() {
      if (c) {
        switch (c) {
          case "*":
            r += $, i = !0;
            break;
          case "?":
            r += T, i = !0;
            break;
          default:
            r += "\\" + c;
            break;
        }
        c = !1;
      }
    }
    for (var u = 0, x = e.length, p; u < x && (p = e.charAt(u)); u++) {
      if (n.debug && console.error("%s	%s %s %j", e, u, r, p), s && H[p]) {
        r += "\\" + p, s = !1;
        continue;
      }
      switch (p) {
        case "/":
          return !1;
        case "\\":
          h(), s = !0;
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          if (
            n.debug && console.error("%s	%s %s %j <-- stateChar", e, u, r, p),
              f
          ) {
            p === "!" && u === b + 1 && (p = "^"), r += p;
            continue;
          }
          h(), c = p, n.noext && h();
          continue;
        case "(":
          if (f) {
            r += "(";
            continue;
          }
          if (!c) {
            r += "\\(";
            continue;
          }
          g = c,
            o.push({ type: g, start: u - 1, reStart: r.length }),
            r += c === "!" ? "(?:(?!" : "(?:",
            c = !1;
          continue;
        case ")":
          if (f || !o.length) {
            r += "\\)";
            continue;
          }
          switch (i = !0, r += ")", g = o.pop().type, g) {
            case "!":
              r += "[^/]*?)";
              break;
            case "?":
            case "+":
            case "*":
              r += g;
            case "@":
              break;
          }
          continue;
        case "|":
          if (f || !o.length || s) {
            r += "\\|", s = !1;
            continue;
          }
          r += "|";
          continue;
        case "[":
          if (h(), f) {
            r += "\\" + p;
            continue;
          }
          f = !0, b = u, l = r.length, r += p;
          continue;
        case "]":
          if (u === b + 1 || !f) {
            r += "\\" + p, s = !1;
            continue;
          }
          i = !0, f = !1, r += p;
          continue;
        default:
          h(), s ? s = !1 : H[p] && !(p === "^" && f) && (r += "\\"), r += p;
      }
    }
    if (f) {
      var S = e.substr(b + 1), O = this.parse(S, J);
      r = r.substr(0, l) + "\\[" + O[0], i = i || O[1];
    }
    for (var v; v = o.pop();) {
      var P = r.slice(v.reStart + 3);
      P = P.replace(/((?:\\{2})*)(\\?)\|/g, function (Ue, K, M) {
        return M || (M = "\\"), K + K + M + "|";
      });
      var k = v.type === "*" ? $ : v.type === "?" ? T : "\\" + v.type;
      i = !0, r = r.slice(0, v.reStart) + k + "\\(" + P;
    }
    h(), s && (r += "\\\\");
    var w = !1;
    switch (r.charAt(0)) {
      case ".":
      case "[":
      case "(":
        w = !0;
    }
    if (r !== "" && i && (r = "(?=.)" + r), w && (r = a + r), t === J) {
      return [r, i];
    }
    if (!i) {
      return Ee(e);
    }
    var L = n.nocase ? "i" : "", B = new RegExp("^" + r + "$", L);
    return B._glob = e, B._src = r, B;
  }
  m.makeRe = function (e, t) {
    return new d(e, t || {}).makeRe();
  };
  d.prototype.makeRe = Oe;
  function Oe() {
    if (this.regexp || this.regexp === !1) {
      return this.regexp;
    }
    var e = this.set;
    if (!e.length) {
      return this.regexp = !1;
    }
    var t = this.options,
      n = t.noglobstar ? $ : t.dot ? me : be,
      r = t.nocase ? "i" : "",
      i = e.map(function (s) {
        return s.map(function (o) {
          return o === q ? n : typeof o == "string" ? ke(o) : o._src;
        }).join("\\/");
      }).join("|");
    i = "^(?:" + i + ")$", this.negate && (i = "^(?!" + i + ").*$");
    try {
      return this.regexp = new RegExp(i, r);
    } catch {
      return this.regexp = !1;
    }
  }
  m.match = function (e, t, n) {
    var r = new d(t, n);
    return e = e.filter(function (i) {
      return r.match(i);
    }),
      n.nonull && !e.length && e.push(t),
      e;
  };
  d.prototype.match = Pe;
  function Pe(e, t) {
    if (this.comment) {
      return !1;
    }
    if (this.empty) {
      return e === "";
    }
    if (e === "/" && t) {
      return !0;
    }
    var n = this.options;
    V === "win32" && (e = e.split("\\").join("/")),
      e = e.split(X),
      n.debug && console.error(this.pattern, "split", e);
    for (var r = this.set, i = 0, s = r.length; i < s; i++) {
      var o = r[i], g = this.matchOne(e, o, t);
      if (g) {
        return n.flipNegate ? !0 : !this.negate;
      }
    }
    return n.flipNegate ? !1 : this.negate;
  }
  d.prototype.matchOne = function (e, t, n) {
    var r = this.options;
    r.debug && console.error("matchOne", { this: this, file: e, pattern: t }),
      r.matchBase && t.length === 1 &&
      (e = de.basename(e.join("/")).split("/")),
      r.debug && console.error("matchOne", e.length, t.length);
    for (
      var i = 0, s = 0, o = e.length, g = t.length;
      i < o && s < g;
      i++, s++
    ) {
      r.debug && console.error("matchOne loop");
      var c = t[s], f = e[i];
      if (r.debug && console.error(t, c, f), c === !1) {
        return !1;
      }
      if (c === q) {
        r.debug && console.error("GLOBSTAR", [t, c, f]);
        var l = i, b = s + 1;
        if (b === g) {
          for (r.debug && console.error("** at the end"); i < o; i++) {
            if (
              e[i] === "." || e[i] === ".." || !r.dot && e[i].charAt(0) === "."
            ) {
              return !1;
            }
          }
          return !0;
        }
        e: for (; l < o;) {
          var a = e[l];
          if (
            r.debug && console.error(
              `
globstar while`,
              e,
              l,
              t,
              b,
              a,
            ), this.matchOne(e.slice(l), t.slice(b), n)
          ) {
            return r.debug && console.error("globstar found match!", l, o, a),
              !0;
          }
          if (a === "." || a === ".." || !r.dot && a.charAt(0) === ".") {
            r.debug && console.error("dot detected!", e, l, t, b);
            break e;
          }
          r.debug && console.error("globstar swallow a segment, and continue"),
            l++;
        }
        return !!(n && l === o);
      }
      var h;
      if (
        typeof c == "string"
          ? (r.nocase ? h = f.toLowerCase() === c.toLowerCase() : h = f === c,
            r.debug && console.error("string match", c, f, h))
          : (h = f.match(c),
            r.debug && console.error("pattern match", c, f, h)), !h
      ) {
        return !1;
      }
    }
    if (i === o && s === g) {
      return !0;
    }
    if (i === o) {
      return n;
    }
    if (s === g) {
      var u = i === o - 1 && e[i] === "";
      return u;
    }
    throw new Error("wtf?");
  };
  function Ee(e) {
    return e.replace(/\\(.)/g, "$1");
  }
  function ke(e) {
    return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
});
var D = {};
ue(D, {
  parse: () => $e,
  parseFromFiles: () => ze,
  parseFromFilesSync: () => Te,
  parseString: () => U,
  parseSync: () => Ge,
  versionCompare: () => j,
});
var ee = le(W());
import * as C from "node:fs";
import * as y from "node:path";
import * as Y from "node:fs";
var E = {
  section: /^\s*\[(([^#;]|\\#|\\;)+)\]\s*([#;].*)?$/,
  param: /^\s*([\w\.\-\_]+)\s*[=:]\s*(.*?)\s*([#;].*)?$/,
  comment: /^\s*[#;].*$/,
};
function U(e) {
  let t = {}, n = null, r = [[n, t]];
  return e.split(/\r\n|\r|\n/).forEach((s) => {
    let o;
    E.comment.test(s) ||
      (E.param.test(s)
        ? (o = s.match(E.param), t[o[1]] = o[2])
        : E.section.test(s) &&
          (o = s.match(E.section), n = o[1], t = {}, r.push([n, t])));
  }),
    r;
}
var Z = {
  name: "@rivy-labs/x-e34b1a4b-ab58-4d84-9787-309e53006932",
  version: "0.17.1",
  description: "EditorConfig File Locator and Interpreter for Node.js",
  keywords: ["editorconfig", "core"],
  main: "src/index.js",
  contributors: [
    "Hong Xu (topbug.net)",
    "Jed Mao (https://github.com/jedmao/)",
    "Trey Hunner (http://treyhunner.com)",
  ],
  directories: { bin: "./bin", lib: "./lib" },
  scripts: {
    clean: "rimraf dist",
    prebuild: "npm run clean",
    build: "tsc",
    pretest: "npm run lint && npm run build && npm run copy && cmake .",
    test: "ctest .",
    "pretest:ci": "npm run pretest",
    "test:ci": "ctest -VV --output-on-failure .",
    lint: "npm run eclint && npm run tslint",
    eclint: 'eclint check --indent_size ignore "src/**"',
    tslint: "tslint --project tsconfig.json --exclude package.json",
    copy:
      "cpy .npmignore LICENSE README.md CHANGELOG.md dist && cpy bin/* dist/bin && cpy src/lib/fnmatch*.* dist/src/lib",
    prepub: "npm run lint && npm run build && npm run copy",
    pub: "npm publish ./dist",
  },
  repository: {
    type: "git",
    url: "git://github.com/editorconfig/editorconfig-core-js.git",
  },
  bugs: "https://github.com/editorconfig/editorconfig-core-js/issues",
  author: "EditorConfig Team",
  license: "MIT",
  dependencies: {
    commander: "^2.19.0",
    "lru-cache": "^7.14.0",
    sigmund: "^1.0.1",
  },
  devDependencies: {
    "@types/mocha": "^5.2.6",
    "@types/node": "^10.12.29",
    "@uutils/uu":
      "https://cdn.jsdelivr.net/gh/rivy-t/uu.npm@master/dist/uutils-uu.tgz",
    "cpy-cli": "^2.0.0",
    eclint: "^2.8.1",
    "exec-if-updated":
      "https://cdn.jsdelivr.net/gh/rivy/js-cli.exec-if-updated@2.2.0/dist/pkg/exec-if-updated.tgz",
    mocha: "^5.2.0",
    "os-paths":
      "https://cdn.jsdelivr.net/gh/rivy/js.os-paths@v7.3.0/dist/os-paths.tgz",
    rimraf: "^2.6.3",
    should: "^13.2.3",
    tslint: "^5.13.1",
    typescript: "^3.3.3333",
  },
};
var Ce = {
  end_of_line: !0,
  indent_style: !0,
  indent_size: !0,
  insert_final_newline: !0,
  trim_trailing_whitespace: !0,
  charset: !0,
};
function Fe(e, t) {
  let n = { matchBase: !0, dot: !0, noext: !0 };
  return t = t.replace(/\*\*/g, "{*,**/**/**}"), (0, ee.default)(e, t, n);
}
function te(e, t) {
  let n = [];
  do e = y.dirname(e), n.push(y.join(e, t.config)); while (e !== t.root);
  return n;
}
function j(e, t) {
  return e = e ?? "0.0.0",
    t = t ?? "0.0.0",
    e.localeCompare(t, void 0, { numeric: !0 });
}
j.gte = (e, t) => j(e, t) >= 0;
function Re(e, t) {
  return "indent_style" in e && e.indent_style === "tab" &&
    !("indent_size" in e) && j.gte(t, "0.10.0") && (e.indent_size = "tab"),
    "indent_size" in e && !("tab_width" in e) && e.indent_size !== "tab" &&
    (e.tab_width = e.indent_size),
    "indent_size" in e && "tab_width" in e && e.indent_size === "tab" &&
    (e.indent_size = e.tab_width),
    e;
}
function Ae(e = {}, t) {
  return {
    config: e.config || ".editorconfig",
    version: e.version || Z.version,
    root: y.resolve(e.root || y.parse(t).root),
  };
}
function Le(e, t) {
  switch (t.indexOf("/")) {
    case -1:
      t = "**/" + t;
      break;
    case 0:
      t = t.substring(1);
      break;
    default:
      break;
  }
  return y.join(e, t);
}
function Be(e = {}, t = {}) {
  for (let n in t) {
    if (t.hasOwnProperty(n)) {
      let r = t[n], i = n.toLowerCase(), s = r;
      Ce[i] && (s = r.toLowerCase());
      try {
        s = JSON.parse(r);
      } catch {}
      (typeof r > "u" || r === null) && (s = String(r)), e[i] = s;
    }
  }
  return e;
}
function F(e, t, n) {
  return Re(
    e.reverse().reduce((r, i) => {
      let s = y.dirname(i.name);
      return i.contents.forEach((o) => {
        let g = o[0], c = o[1];
        if (!g) {
          return;
        }
        let f = Le(s, g);
        Fe(t, f) && (r = Be(r, c));
      }),
        r;
    }, {}),
    n.version,
  );
}
function R(e) {
  let t = [];
  for (let n in e) {
    if (e.hasOwnProperty(n)) {
      let r = e[n], i = U(r.contents);
      if (
        t.push({ name: r.name, contents: i }),
          (i[0][1].root || "").toLowerCase() === "true"
      ) {
        break;
      }
    }
  }
  return t;
}
async function Me(e) {
  return Promise.all(e.map((t) =>
    new Promise((n) => {
      C.readFile(t, "utf8", (r, i) => {
        n({ name: t, contents: r ? "" : i });
      });
    })
  ));
}
function Ne(e) {
  let t = [], n;
  return e.forEach((r) => {
    try {
      n = C.readFileSync(r, "utf8");
    } catch {
      n = "";
    }
    t.push({ name: r, contents: n });
  }),
    t;
}
function A(e, t = {}) {
  let n = y.resolve(e);
  return [n, Ae(t, n)];
}
async function ze(e, t, n = {}) {
  let [r, i] = A(e, n);
  return t.then(R).then((s) => F(s, r, i));
}
function Te(e, t, n = {}) {
  let [r, i] = A(e, n);
  return F(R(t), r, i);
}
async function $e(e, t = {}) {
  let [n, r] = A(e, t), i = te(n, r);
  return Me(i).then(R).then((s) => F(s, n, r));
}
function Ge(e, t = {}) {
  let [n, r] = A(e, t), i = te(n, r), s = Ne(i);
  return F(R(s), n, r);
}
var { default: re, ...qe } = D, Xe = re !== void 0 ? re : qe;
export {
  $e as parse,
  Ge as parseSync,
  j as versionCompare,
  Te as parseFromFilesSync,
  U as parseString,
  Xe as default,
  ze as parseFromFiles,
};
//# sourceMappingURL=x-e34b1a4b-ab58-4d84-9787-309e53006932.mjs.map
