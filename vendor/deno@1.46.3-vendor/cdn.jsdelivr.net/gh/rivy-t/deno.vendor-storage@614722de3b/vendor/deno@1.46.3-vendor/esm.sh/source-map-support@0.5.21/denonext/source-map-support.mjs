/* esm.sh - source-map-support@0.5.21 */
import __Process$ from "node:process";
import * as __0$ from "../../../esm.sh/source-map@0.6.1.js";
import * as __1$ from "node:path";
import * as __2$ from "node:fs";
import * as __3$ from "../../../esm.sh/buffer-from@1.1.2.js";
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m,
    c = (m) => Object.assign({ __esModule: true }, m);
  switch (n) {
    case "source-map":
      return e(__0$);
    case "node:path":
      return e(__1$);
    case "node:fs":
      return e(__2$);
    case "buffer-from":
      return e(__3$);
    default:
      console.error('module "' + n + '" not found');
      return null;
  }
};
var N = Object.create;
var F = Object.defineProperty;
var B = Object.getOwnPropertyDescriptor;
var X = Object.getOwnPropertyNames;
var G = Object.getPrototypeOf, I = Object.prototype.hasOwnProperty;
var m =
  ((e) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(e, { get: (r, t) => (typeof require < "u" ? require : r)[t] })
      : e)(function (e) {
      if (typeof require < "u") {
        return require.apply(this, arguments);
      }
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
var $ = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
var D = (e, r, t, i) => {
  if (r && typeof r == "object" || typeof r == "function") {
    for (let n of X(r)) {
      !I.call(e, n) && n !== t &&
        F(e, n, {
          get: () => r[n],
          enumerable: !(i = B(r, n)) || i.enumerable,
        });
    }
  }
  return e;
};
var A = (
  e,
  r,
  t,
) => (t = e != null ? N(G(e)) : {},
  D(
    r || !e || !e.__esModule
      ? F(t, "default", { value: e, enumerable: !0 })
      : t,
    e,
  ));
var H = $((p, x) => {
  var V = m("source-map").SourceMapConsumer, E = m("node:path"), c;
  try {
    c = m("node:fs"), (!c.existsSync || !c.readFileSync) && (c = null);
  } catch {}
  var z = m("buffer-from");
  function j(e, r) {
    return e.require(r);
  }
  var L = !1,
    q = !1,
    b = !1,
    d = "auto",
    v = {},
    S = {},
    J = /^data:application\/json[^,]+base64,/,
    l = [],
    f = [];
  function R() {
    return d === "browser"
      ? !0
      : d === "node"
      ? !1
      : typeof globalThis < "u" && typeof XMLHttpRequest == "function" &&
        !(globalThis.require && globalThis.module && globalThis.process &&
          globalThis.process.type === "renderer");
  }
  function K() {
    return typeof __Process$ == "object" && __Process$ !== null &&
      typeof __Process$.on == "function";
  }
  function Q() {
    return typeof __Process$ == "object" && __Process$ !== null
      ? __Process$.version
      : "";
  }
  function W() {
    if (typeof __Process$ == "object" && __Process$ !== null) {
      return __Process$.stderr;
    }
  }
  function Y(e) {
    if (
      typeof __Process$ == "object" && __Process$ !== null &&
      typeof __Process$.exit == "function"
    ) {
      return __Process$.exit(e);
    }
  }
  function w(e) {
    return function (r) {
      for (var t = 0; t < e.length; t++) {
        var i = e[t](r);
        if (i) {
          return i;
        }
      }
      return null;
    };
  }
  var C = w(l);
  l.push(function (e) {
    if (
      e = e.trim(),
        /^file:/.test(e) &&
        (e = e.replace(/file:\/\/\/(\w:)?/, function (i, n) {
          return n ? "" : "/";
        })),
        e in v
    ) {
      return v[e];
    }
    var r = "";
    try {
      if (c) {
        c.existsSync(e) && (r = c.readFileSync(e, "utf8"));
      } else {
        var t = new XMLHttpRequest();
        t.open("GET", e, !1),
          t.send(null),
          t.readyState === 4 && t.status === 200 && (r = t.responseText);
      }
    } catch {}
    return v[e] = r;
  });
  function M(e, r) {
    if (!e) {
      return r;
    }
    var t = E.dirname(e),
      i = /^\w+:\/\/[^\/]*/.exec(t),
      n = i ? i[0] : "",
      u = t.slice(n.length);
    return n && /^\/\w\:/.test(u)
      ? (n += "/", n + E.resolve(t.slice(n.length), r).replace(/\\/g, "/"))
      : n + E.resolve(t.slice(n.length), r);
  }
  function Z(e) {
    var r;
    if (R()) {
      try {
        var t = new XMLHttpRequest();
        t.open("GET", e, !1),
          t.send(null),
          r = t.readyState === 4 ? t.responseText : null;
        var i = t.getResponseHeader("SourceMap") ||
          t.getResponseHeader("X-SourceMap");
        if (i) {
          return i;
        }
      } catch {}
    }
    r = C(e);
    for (
      var n =
          /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg,
        u,
        a;
      a = n.exec(r);
    ) {
      u = a;
    }
    return u ? u[1] : null;
  }
  var P = w(f);
  f.push(function (e) {
    var r = Z(e);
    if (!r) {
      return null;
    }
    var t;
    if (J.test(r)) {
      var i = r.slice(r.indexOf(",") + 1);
      t = z(i, "base64").toString(), r = e;
    } else {
      r = M(e, r), t = C(r);
    }
    return t ? { url: r, map: t } : null;
  });
  function O(e) {
    var r = S[e.source];
    if (!r) {
      var t = P(e.source);
      t
        ? (r = S[e.source] = { url: t.url, map: new V(t.map) },
          r.map.sourcesContent && r.map.sources.forEach(function (n, u) {
            var a = r.map.sourcesContent[u];
            if (a) {
              var o = M(r.url, n);
              v[o] = a;
            }
          }))
        : r = S[e.source] = { url: null, map: null };
    }
    if (r && r.map && typeof r.map.originalPositionFor == "function") {
      var i = r.map.originalPositionFor(e);
      if (i.source !== null) {
        return i.source = M(r.url, i.source), i;
      }
    }
    return e;
  }
  function _(e) {
    var r = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(e);
    if (r) {
      var t = O({ source: r[2], line: +r[3], column: r[4] - 1 });
      return "eval at " + r[1] + " (" + t.source + ":" + t.line + ":" +
        (t.column + 1) + ")";
    }
    return r = /^eval at ([^(]+) \((.+)\)$/.exec(e),
      r ? "eval at " + r[1] + " (" + _(r[2]) + ")" : e;
  }
  function ee() {
    var e, r = "";
    if (this.isNative()) {
      r = "native";
    } else {
      e = this.getScriptNameOrSourceURL(),
        !e && this.isEval() && (r = this.getEvalOrigin(), r += ", "),
        e ? r += e : r += "<anonymous>";
      var t = this.getLineNumber();
      if (t != null) {
        r += ":" + t;
        var i = this.getColumnNumber();
        i && (r += ":" + i);
      }
    }
    var n = "",
      u = this.getFunctionName(),
      a = !0,
      o = this.isConstructor(),
      h = !(this.isToplevel() || o);
    if (h) {
      var s = this.getTypeName();
      s === "[object Object]" && (s = "null");
      var g = this.getMethodName();
      u
        ? (s && u.indexOf(s) != 0 && (n += s + "."),
          n += u,
          g && u.indexOf("." + g) != u.length - g.length - 1 &&
          (n += " [as " + g + "]"))
        : n += s + "." + (g || "<anonymous>");
    } else {
      o ? n += "new " + (u || "<anonymous>") : u ? n += u : (n += r, a = !1);
    }
    return a && (n += " (" + r + ")"), n;
  }
  function U(e) {
    var r = {};
    return Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(
      function (t) {
        r[t] = /^(?:is|get)/.test(t)
          ? function () {
            return e[t].call(e);
          }
          : e[t];
      },
    ),
      r.toString = ee,
      r;
  }
  function k(e, r) {
    if (
      r === void 0 && (r = { nextPosition: null, curPosition: null }),
        e.isNative()
    ) {
      return r.curPosition = null, e;
    }
    var t = e.getFileName() || e.getScriptNameOrSourceURL();
    if (t) {
      var i = e.getLineNumber(),
        n = e.getColumnNumber() - 1,
        u =
          /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/,
        a = u.test(Q()) ? 0 : 62;
      i === 1 && n > a && !R() && !e.isEval() && (n -= a);
      var o = O({ source: t, line: i, column: n });
      r.curPosition = o, e = U(e);
      var h = e.getFunctionName;
      return e.getFunctionName = function () {
        return r.nextPosition == null ? h() : r.nextPosition.name || h();
      },
        e.getFileName = function () {
          return o.source;
        },
        e.getLineNumber = function () {
          return o.line;
        },
        e.getColumnNumber = function () {
          return o.column + 1;
        },
        e.getScriptNameOrSourceURL = function () {
          return o.source;
        },
        e;
    }
    var s = e.isEval() && e.getEvalOrigin();
    return s && (s = _(s),
      e = U(e),
      e.getEvalOrigin = function () {
        return s;
      }),
      e;
  }
  function re(e, r) {
    b && (v = {}, S = {});
    for (
      var t = e.name || "Error",
        i = e.message || "",
        n = t + ": " + i,
        u = { nextPosition: null, curPosition: null },
        a = [],
        o = r.length - 1;
      o >= 0;
      o--
    ) {
      a.push(
        `
    at ` + k(r[o], u),
      ), u.nextPosition = u.curPosition;
    }
    return u.curPosition = u.nextPosition = null, n + a.reverse().join("");
  }
  function T(e) {
    var r = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(e.stack);
    if (r) {
      var t = r[1], i = +r[2], n = +r[3], u = v[t];
      if (!u && c && c.existsSync(t)) {
        try {
          u = c.readFileSync(t, "utf8");
        } catch {
          u = "";
        }
      }
      if (u) {
        var a = u.split(/(?:\r\n|\r|\n)/)[i - 1];
        if (a) {
          return t + ":" + i + `
` + a + `
` + new Array(n).join(" ") + "^";
        }
      }
    }
    return null;
  }
  function te(e) {
    var r = T(e), t = W();
    t && t._handle && t._handle.setBlocking && t._handle.setBlocking(!0),
      r && (console.error(), console.error(r)),
      console.error(e.stack),
      Y(1);
  }
  function ne() {
    var e = __Process$.emit;
    __Process$.emit = function (r) {
      if (r === "uncaughtException") {
        var t = arguments[1] && arguments[1].stack,
          i = this.listeners(r).length > 0;
        if (t && !i) {
          return te(arguments[1]);
        }
      }
      return e.apply(this, arguments);
    };
  }
  var ie = l.slice(0), ue = f.slice(0);
  p.wrapCallSite = k;
  p.getErrorSource = T;
  p.mapSourcePosition = O;
  p.retrieveSourceMap = P;
  p.install = function (e) {
    if (
      e = e || {},
        e.environment &&
        (d = e.environment, ["node", "browser", "auto"].indexOf(d) === -1)
    ) {
      throw new Error(
        "environment " + d +
          " was unknown. Available options are {auto, browser, node}",
      );
    }
    if (
      e.retrieveFile &&
      (e.overrideRetrieveFile && (l.length = 0), l.unshift(e.retrieveFile)),
        e.retrieveSourceMap &&
        (e.overrideRetrieveSourceMap && (f.length = 0),
          f.unshift(e.retrieveSourceMap)),
        e.hookRequire && !R()
    ) {
      var r = j(x, "module"), t = r.prototype._compile;
      t.__sourceMapSupport || (r.prototype._compile = function (u, a) {
        return v[a] = u, S[a] = void 0, t.call(this, u, a);
      },
        r.prototype._compile.__sourceMapSupport = !0);
    }
    if (
      b ||
      (b = "emptyCacheBetweenOperations" in e
        ? e.emptyCacheBetweenOperations
        : !1),
        L || (L = !0, Error.prepareStackTrace = re),
        !q
    ) {
      var i = "handleUncaughtExceptions" in e ? e.handleUncaughtExceptions : !0;
      try {
        var n = j(x, "worker_threads");
        n.isMainThread === !1 && (i = !1);
      } catch {}
      i && K() && (q = !0, ne());
    }
  };
  p.resetRetrieveHandlers = function () {
    l.length = 0,
      f.length = 0,
      l = ie.slice(0),
      f = ue.slice(0),
      P = w(f),
      C = w(l);
  };
});
var y = A(H()),
  {
    wrapCallSite: oe,
    getErrorSource: se,
    mapSourcePosition: ce,
    retrieveSourceMap: le,
    install: fe,
    resetRetrieveHandlers: ve,
  } = y,
  pe = y.default ?? y;
export {
  ce as mapSourcePosition,
  fe as install,
  le as retrieveSourceMap,
  oe as wrapCallSite,
  pe as default,
  se as getErrorSource,
  ve as resetRetrieveHandlers,
};
//# sourceMappingURL=source-map-support.mjs.map
