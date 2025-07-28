/* esm.sh - chai@4.5.0 */
import * as __0$ from "../../../esm.sh/assertion-error@1.1.0.js";
import * as __1$ from "../../../esm.sh/pathval@1.1.1.js";
import * as __2$ from "../../../esm.sh/type-detect@4.1.0.js";
import * as __3$ from "../../../esm.sh/deep-eql@4.1.4.js";
import * as __4$ from "../../../esm.sh/get-func-name@2.0.2.js";
import * as __5$ from "../../../esm.sh/check-error@1.0.3.js";
import * as __6$ from "../../../esm.sh/loupe@2.3.7.js";
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m,
    c = (m) => Object.assign({ __esModule: true }, m);
  switch (n) {
    case "assertion-error":
      return e(__0$);
    case "pathval":
      return e(__1$);
    case "type-detect":
      return e(__2$);
    case "deep-eql":
      return e(__3$);
    case "get-func-name":
      return e(__4$);
    case "check-error":
      return e(__5$);
    case "loupe":
      return c(__6$);
    default:
      console.error('module "' + n + '" not found');
      return null;
  }
};
var Ft = Object.create;
var me = Object.defineProperty;
var Vt = Object.getOwnPropertyDescriptor;
var zt = Object.getOwnPropertyNames;
var Kt = Object.getPrototypeOf, Lt = Object.prototype.hasOwnProperty;
var k =
  ((b) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(b, { get: (i, r) => (typeof require < "u" ? require : i)[r] })
      : b)(function (b) {
      if (typeof require < "u") {
        return require.apply(this, arguments);
      }
      throw Error('Dynamic require of "' + b + '" is not supported');
    });
var M = (b, i) => () => (i || b((i = { exports: {} }).exports, i), i.exports);
var Gt = (b, i, r, d) => {
  if (i && typeof i == "object" || typeof i == "function") {
    for (let e of zt(i)) {
      !Lt.call(b, e) && e !== r &&
        me(b, e, {
          get: () => i[e],
          enumerable: !(d = Vt(i, e)) || d.enumerable,
        });
    }
  }
  return b;
};
var Ht = (
  b,
  i,
  r,
) => (r = b != null ? Ft(Kt(b)) : {},
  Gt(
    i || !b || !b.__esModule
      ? me(r, "default", { value: b, enumerable: !0 })
      : r,
    b,
  ));
var T = M((Bn, xe) => {
  xe.exports = function (i, r, d) {
    var e = i.__flags || (i.__flags = Object.create(null));
    if (arguments.length === 3) {
      e[r] = d;
    } else {
      return e[r];
    }
  };
});
var qe = M((Fn, Oe) => {
  var Rt = T();
  Oe.exports = function (i, r) {
    var d = Rt(i, "negate"), e = r[0];
    return d ? !e : e;
  };
});
var Pe = M((Vn, Me) => {
  var Wt = k("assertion-error"), ee = T(), Ut = k("type-detect");
  Me.exports = function (i, r) {
    var d = ee(i, "message"), e = ee(i, "ssfi");
    d = d ? d + ": " : "",
      i = ee(i, "object"),
      r = r.map(function (o) {
        return o.toLowerCase();
      }),
      r.sort();
    var t = r.map(function (o, u) {
        var w = ~["a", "e", "i", "o", "u"].indexOf(o.charAt(0)) ? "an" : "a",
          v = r.length > 1 && u === r.length - 1 ? "or " : "";
        return v + w + " " + o;
      }).join(", "),
      n = Ut(i).toLowerCase();
    if (
      !r.some(function (o) {
        return n === o;
      })
    ) {
      throw new Wt(
        d + "object tested must be " + t + ", but " + n + " given",
        void 0,
        e,
      );
    }
  };
});
var te = M((zn, je) => {
  je.exports = function (i, r) {
    return r.length > 4 ? r[4] : i._obj;
  };
});
var z = M((Kn, Ne) => {
  Ne.exports = {
    includeStack: !1,
    showDiff: !0,
    truncateThreshold: 40,
    useProxy: !0,
    proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"],
    deepEqual: null,
  };
});
var Q = M((Gn, De) => {
  var Ln = k("get-func-name"), Jt = k("loupe"), Ee = z();
  De.exports = Yt;
  function Yt(b, i, r, d) {
    var e = {
      colors: d,
      depth: typeof r > "u" ? 2 : r,
      showHidden: i,
      truncate: Ee.truncateThreshold ? Ee.truncateThreshold : 1 / 0,
    };
    return Jt.inspect(b, e);
  }
});
var ne = M((Hn, Se) => {
  var Zt = Q(), Ae = z();
  Se.exports = function (i) {
    var r = Zt(i), d = Object.prototype.toString.call(i);
    if (Ae.truncateThreshold && r.length >= Ae.truncateThreshold) {
      if (d === "[object Function]") {
        return !i.name || i.name === ""
          ? "[Function]"
          : "[Function: " + i.name + "]";
      }
      if (d === "[object Array]") {
        return "[ Array(" + i.length + ") ]";
      }
      if (d === "[object Object]") {
        var e = Object.keys(i),
          t = e.length > 2 ? e.splice(0, 2).join(", ") + ", ..." : e.join(", ");
        return "{ Object (" + t + ") }";
      } else {
        return r;
      }
    } else {
      return r;
    }
  };
});
var Ie = M((Rn, Te) => {
  var re = T(), Qt = te(), oe = ne();
  Te.exports = function (i, r) {
    var d = re(i, "negate"),
      e = re(i, "object"),
      t = r[3],
      n = Qt(i, r),
      o = d ? r[2] : r[1],
      u = re(i, "message");
    return typeof o == "function" && (o = o()),
      o = o || "",
      o = o.replace(/#\{this\}/g, function () {
        return oe(e);
      }).replace(/#\{act\}/g, function () {
        return oe(n);
      }).replace(/#\{exp\}/g, function () {
        return oe(t);
      }),
      u ? u + ": " + o : o;
  };
});
var B = M((Wn, ke) => {
  ke.exports = function (i, r, d) {
    var e = i.__flags || (i.__flags = Object.create(null));
    r.__flags || (r.__flags = Object.create(null)),
      d = arguments.length === 3 ? d : !0;
    for (var t in e) {
      (d ||
        t !== "object" && t !== "ssfi" && t !== "lockSsfi" && t != "message") &&
        (r.__flags[t] = e[t]);
    }
  };
});
var R = M((Un, Ce) => {
  var Xt = z();
  Ce.exports = function () {
    return Xt.useProxy && typeof Proxy < "u" && typeof Reflect < "u";
  };
});
var Ve = M((Jn, Fe) => {
  var $t = F(), Be = T(), _t = R(), en = B();
  Fe.exports = function (i, r, d) {
    d = d === void 0 ? function () {} : d,
      Object.defineProperty(i, r, {
        get: function e() {
          !_t() && !Be(this, "lockSsfi") && Be(this, "ssfi", e);
          var t = d.call(this);
          if (t !== void 0) {
            return t;
          }
          var n = new $t.Assertion();
          return en(this, n), n;
        },
        configurable: !0,
      });
  };
});
var W = M((Yn, ze) => {
  var tn = Object.getOwnPropertyDescriptor(function () {}, "length");
  ze.exports = function (i, r, d) {
    return tn.configurable && Object.defineProperty(i, "length", {
      get: function () {
        throw Error(
          d
            ? "Invalid Chai property: " + r +
              '.length. Due to a compatibility issue, "length" cannot directly follow "' +
              r + '". Use "' + r + '.lengthOf" instead.'
            : "Invalid Chai property: " + r +
              '.length. See docs for proper usage of "' + r + '".',
        );
      },
    }),
      i;
  };
});
var Le = M((Zn, Ke) => {
  Ke.exports = function (i) {
    var r = Object.getOwnPropertyNames(i);
    function d(t) {
      r.indexOf(t) === -1 && r.push(t);
    }
    for (var e = Object.getPrototypeOf(i); e !== null;) {
      Object.getOwnPropertyNames(e).forEach(d), e = Object.getPrototypeOf(e);
    }
    return r;
  };
});
var U = M((Qn, Re) => {
  var nn = z(), Ge = T(), rn = Le(), on = R();
  var He = ["__flags", "__methods", "_obj", "assert"];
  Re.exports = function (i, r) {
    return on()
      ? new Proxy(i, {
        get: function d(e, t) {
          if (
            typeof t == "string" && nn.proxyExcludedKeys.indexOf(t) === -1 &&
            !Reflect.has(e, t)
          ) {
            if (r) {
              throw Error(
                "Invalid Chai property: " + r + "." + t +
                  '. See docs for proper usage of "' + r + '".',
              );
            }
            var n = null, o = 4;
            throw rn(e).forEach(function (u) {
              if (!Object.prototype.hasOwnProperty(u) && He.indexOf(u) === -1) {
                var w = sn(t, u, o);
                w < o && (n = u, o = w);
              }
            }),
              Error(
                n !== null
                  ? "Invalid Chai property: " + t + '. Did you mean "' + n +
                    '"?'
                  : "Invalid Chai property: " + t,
              );
          }
          return He.indexOf(t) === -1 && !Ge(e, "lockSsfi") && Ge(e, "ssfi", d),
            Reflect.get(e, t);
        },
      })
      : i;
  };
  function sn(b, i, r) {
    if (Math.abs(b.length - i.length) >= r) {
      return r;
    }
    for (var d = [], e = 0; e <= b.length; e++) {
      d[e] = Array(i.length + 1).fill(0), d[e][0] = e;
    }
    for (var t = 0; t < i.length; t++) {
      d[0][t] = t;
    }
    for (var e = 1; e <= b.length; e++) {
      for (var n = b.charCodeAt(e - 1), t = 1; t <= i.length; t++) {
        if (Math.abs(e - t) >= r) {
          d[e][t] = r;
          continue;
        }
        d[e][t] = Math.min(
          d[e - 1][t] + 1,
          d[e][t - 1] + 1,
          d[e - 1][t - 1] + (n === i.charCodeAt(t - 1) ? 0 : 1),
        );
      }
    }
    return d[b.length][i.length];
  }
});
var Je = M((Xn, Ue) => {
  var an = W(), un = F(), We = T(), cn = U(), fn = B();
  Ue.exports = function (i, r, d) {
    var e = function () {
      We(this, "lockSsfi") || We(this, "ssfi", e);
      var t = d.apply(this, arguments);
      if (t !== void 0) {
        return t;
      }
      var n = new un.Assertion();
      return fn(this, n), n;
    };
    an(e, r, !1), i[r] = cn(e, r);
  };
});
var Ze = M(($n, Ye) => {
  var dn = F(), J = T(), hn = R(), ln = B();
  Ye.exports = function (i, r, d) {
    var e = Object.getOwnPropertyDescriptor(i, r), t = function () {};
    e && typeof e.get == "function" && (t = e.get),
      Object.defineProperty(i, r, {
        get: function n() {
          !hn() && !J(this, "lockSsfi") && J(this, "ssfi", n);
          var o = J(this, "lockSsfi");
          J(this, "lockSsfi", !0);
          var u = d(t).call(this);
          if (J(this, "lockSsfi", o), u !== void 0) {
            return u;
          }
          var w = new dn.Assertion();
          return ln(this, w), w;
        },
        configurable: !0,
      });
  };
});
var Xe = M((_n, Qe) => {
  var pn = W(), bn = F(), Y = T(), gn = U(), wn = B();
  Qe.exports = function (i, r, d) {
    var e = i[r],
      t = function () {
        throw new Error(r + " is not a function");
      };
    e && typeof e == "function" && (t = e);
    var n = function () {
      Y(this, "lockSsfi") || Y(this, "ssfi", n);
      var o = Y(this, "lockSsfi");
      Y(this, "lockSsfi", !0);
      var u = d(t).apply(this, arguments);
      if (Y(this, "lockSsfi", o), u !== void 0) {
        return u;
      }
      var w = new bn.Assertion();
      return wn(this, w), w;
    };
    pn(n, r, !1), i[r] = gn(n, r);
  };
});
var nt = M((er, tt) => {
  var yn = W(), vn = F(), $e = T(), mn = U(), _e = B();
  var xn = typeof Object.setPrototypeOf == "function",
    et = function () {},
    On = Object.getOwnPropertyNames(et).filter(function (b) {
      var i = Object.getOwnPropertyDescriptor(et, b);
      return typeof i != "object" ? !0 : !i.configurable;
    }),
    qn = Function.prototype.call,
    Mn = Function.prototype.apply;
  tt.exports = function (i, r, d, e) {
    typeof e != "function" && (e = function () {});
    var t = { method: d, chainingBehavior: e };
    i.__methods || (i.__methods = {}),
      i.__methods[r] = t,
      Object.defineProperty(i, r, {
        get: function () {
          t.chainingBehavior.call(this);
          var o = function () {
            $e(this, "lockSsfi") || $e(this, "ssfi", o);
            var v = t.method.apply(this, arguments);
            if (v !== void 0) {
              return v;
            }
            var C = new vn.Assertion();
            return _e(this, C), C;
          };
          if (yn(o, r, !0), xn) {
            var u = Object.create(this);
            u.call = qn, u.apply = Mn, Object.setPrototypeOf(o, u);
          } else {
            var w = Object.getOwnPropertyNames(i);
            w.forEach(function (v) {
              if (On.indexOf(v) === -1) {
                var C = Object.getOwnPropertyDescriptor(i, v);
                Object.defineProperty(o, v, C);
              }
            });
          }
          return _e(this, o), mn(o);
        },
        configurable: !0,
      });
  };
});
var it = M((tr, st) => {
  var rt = F(), ot = B();
  st.exports = function (i, r, d, e) {
    var t = i.__methods[r], n = t.chainingBehavior;
    t.chainingBehavior = function () {
      var w = e(n).call(this);
      if (w !== void 0) {
        return w;
      }
      var v = new rt.Assertion();
      return ot(this, v), v;
    };
    var o = t.method;
    t.method = function () {
      var w = d(o).apply(this, arguments);
      if (w !== void 0) {
        return w;
      }
      var v = new rt.Assertion();
      return ot(this, v), v;
    };
  };
});
var ct = M((nr, ut) => {
  var at = Q();
  ut.exports = function (i, r) {
    return at(i) < at(r) ? -1 : 1;
  };
});
var se = M((rr, ft) => {
  ft.exports = function (i) {
    return typeof Object.getOwnPropertySymbols != "function"
      ? []
      : Object.getOwnPropertySymbols(i).filter(function (r) {
        return Object.getOwnPropertyDescriptor(i, r).enumerable;
      });
  };
});
var ht = M((or, dt) => {
  var Pn = se();
  dt.exports = function (i) {
    return Object.keys(i).concat(Pn(i));
  };
});
var pt = M((sr, lt) => {
  function jn(b) {
    return b !== b;
  }
  lt.exports = Number.isNaN || jn;
});
var wt = M((ir, gt) => {
  var Nn = k("type-detect"), bt = T();
  function En(b) {
    var i = Nn(b), r = ["Array", "Object", "function"];
    return r.indexOf(i) !== -1;
  }
  gt.exports = function (i, r) {
    var d = bt(i, "operator"),
      e = bt(i, "negate"),
      t = r[3],
      n = e ? r[2] : r[1];
    if (d) {
      return d;
    }
    if (
      typeof n == "function" && (n = n()),
        n = n || "",
        !!n && !/\shave\s/.test(n)
    ) {
      var o = En(t);
      return /\snot\s/.test(n)
        ? o ? "notDeepStrictEqual" : "notStrictEqual"
        : o
        ? "deepStrictEqual"
        : "strictEqual";
    }
  };
});
var vt = M((P) => {
  var yt = k("pathval");
  P.test = qe();
  P.type = k("type-detect");
  P.expectTypes = Pe();
  P.getMessage = Ie();
  P.getActual = te();
  P.inspect = Q();
  P.objDisplay = ne();
  P.flag = T();
  P.transferFlags = B();
  P.eql = k("deep-eql");
  P.getPathInfo = yt.getPathInfo;
  P.hasProperty = yt.hasProperty;
  P.getName = k("get-func-name");
  P.addProperty = Ve();
  P.addMethod = Je();
  P.overwriteProperty = Ze();
  P.overwriteMethod = Xe();
  P.addChainableMethod = nt();
  P.overwriteChainableMethod = it();
  P.compareByInspect = ct();
  P.getOwnEnumerablePropertySymbols = se();
  P.getOwnEnumerableProperties = ht();
  P.checkError = k("check-error");
  P.proxify = U();
  P.addLengthGuard = W();
  P.isProxyEnabled = R();
  P.isNaN = pt();
  P.getOperator = wt();
});
var xt = M((ur, mt) => {
  var K = z();
  mt.exports = function (b, i) {
    var r = b.AssertionError, d = i.flag;
    b.Assertion = e;
    function e(t, n, o, u) {
      return d(this, "ssfi", o || e),
        d(this, "lockSsfi", u),
        d(this, "object", t),
        d(this, "message", n),
        d(this, "eql", K.deepEqual || i.eql),
        i.proxify(this);
    }
    Object.defineProperty(e, "includeStack", {
      get: function () {
        return console.warn(
          "Assertion.includeStack is deprecated, use chai.config.includeStack instead.",
        ),
          K.includeStack;
      },
      set: function (t) {
        console.warn(
          "Assertion.includeStack is deprecated, use chai.config.includeStack instead.",
        ), K.includeStack = t;
      },
    }),
      Object.defineProperty(e, "showDiff", {
        get: function () {
          return console.warn(
            "Assertion.showDiff is deprecated, use chai.config.showDiff instead.",
          ),
            K.showDiff;
        },
        set: function (t) {
          console.warn(
            "Assertion.showDiff is deprecated, use chai.config.showDiff instead.",
          ), K.showDiff = t;
        },
      }),
      e.addProperty = function (t, n) {
        i.addProperty(this.prototype, t, n);
      },
      e.addMethod = function (t, n) {
        i.addMethod(this.prototype, t, n);
      },
      e.addChainableMethod = function (t, n, o) {
        i.addChainableMethod(this.prototype, t, n, o);
      },
      e.overwriteProperty = function (t, n) {
        i.overwriteProperty(this.prototype, t, n);
      },
      e.overwriteMethod = function (t, n) {
        i.overwriteMethod(this.prototype, t, n);
      },
      e.overwriteChainableMethod = function (t, n, o) {
        i.overwriteChainableMethod(this.prototype, t, n, o);
      },
      e.prototype.assert = function (t, n, o, u, w, v) {
        var C = i.test(this, arguments);
        if (
          v !== !1 && (v = !0),
            u === void 0 && w === void 0 && (v = !1),
            K.showDiff !== !0 && (v = !1),
            !C
        ) {
          n = i.getMessage(this, arguments);
          var Z = i.getActual(this, arguments),
            L = { actual: Z, expected: u, showDiff: v },
            G = i.getOperator(this, arguments);
          throw G && (L.operator = G),
            new r(n, L, K.includeStack ? this.assert : d(this, "ssfi"));
        }
      };
    Object.defineProperty(e.prototype, "_obj", {
      get: function () {
        return d(this, "object");
      },
      set: function (t) {
        d(this, "object", t);
      },
    });
  };
});
var qt = M((cr, Ot) => {
  Ot.exports = function (b, i) {
    var r = b.Assertion, d = b.AssertionError, e = i.flag;
    [
      "to",
      "be",
      "been",
      "is",
      "and",
      "has",
      "have",
      "with",
      "that",
      "which",
      "at",
      "of",
      "same",
      "but",
      "does",
      "still",
      "also",
    ].forEach(function (s) {
      r.addProperty(s);
    }),
      r.addProperty("not", function () {
        e(this, "negate", !0);
      }),
      r.addProperty("deep", function () {
        e(this, "deep", !0);
      }),
      r.addProperty("nested", function () {
        e(this, "nested", !0);
      }),
      r.addProperty("own", function () {
        e(this, "own", !0);
      }),
      r.addProperty("ordered", function () {
        e(this, "ordered", !0);
      }),
      r.addProperty("any", function () {
        e(this, "any", !0), e(this, "all", !1);
      }),
      r.addProperty("all", function () {
        e(this, "all", !0), e(this, "any", !1);
      });
    function t(s, a) {
      a && e(this, "message", a), s = s.toLowerCase();
      var f = e(this, "object"),
        h = ~["a", "e", "i", "o", "u"].indexOf(s.charAt(0)) ? "an " : "a ";
      this.assert(
        s === i.type(f).toLowerCase(),
        "expected #{this} to be " + h + s,
        "expected #{this} not to be " + h + s,
      );
    }
    r.addChainableMethod("an", t), r.addChainableMethod("a", t);
    function n(s, a) {
      return i.isNaN(s) && i.isNaN(a) || s === a;
    }
    function o() {
      e(this, "contains", !0);
    }
    function u(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"),
        h = i.type(f).toLowerCase(),
        p = e(this, "message"),
        g = e(this, "negate"),
        l = e(this, "ssfi"),
        c = e(this, "deep"),
        y = c ? "deep " : "",
        m = c ? e(this, "eql") : n;
      p = p ? p + ": " : "";
      var x = !1;
      switch (h) {
        case "string":
          x = f.indexOf(s) !== -1;
          break;
        case "weakset":
          if (c) {
            throw new d(
              p + "unable to use .deep.include with WeakSet",
              void 0,
              l,
            );
          }
          x = f.has(s);
          break;
        case "map":
          f.forEach(function (j) {
            x = x || m(j, s);
          });
          break;
        case "set":
          c
            ? f.forEach(function (j) {
              x = x || m(j, s);
            })
            : x = f.has(s);
          break;
        case "array":
          c
            ? x = f.some(function (j) {
              return m(j, s);
            })
            : x = f.indexOf(s) !== -1;
          break;
        default:
          if (s !== Object(s)) {
            throw new d(
              p + "the given combination of arguments (" + h + " and " +
                i.type(s).toLowerCase() +
                ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " +
                i.type(s).toLowerCase(),
              void 0,
              l,
            );
          }
          var N = Object.keys(s), q = null, O = 0;
          if (
            N.forEach(function (j) {
              var E = new r(f);
              if (
                i.transferFlags(this, E, !0),
                  e(E, "lockSsfi", !0),
                  !g || N.length === 1
              ) {
                E.property(j, s[j]);
                return;
              }
              try {
                E.property(j, s[j]);
              } catch (D) {
                if (!i.checkError.compatibleConstructor(D, d)) {
                  throw D;
                }
                q === null && (q = D), O++;
              }
            }, this), g && N.length > 1 && O === N.length
          ) {
            throw q;
          }
          return;
      }
      this.assert(
        x,
        "expected #{this} to " + y + "include " + i.inspect(s),
        "expected #{this} to not " + y + "include " + i.inspect(s),
      );
    }
    r.addChainableMethod("include", u, o),
      r.addChainableMethod("contain", u, o),
      r.addChainableMethod("contains", u, o),
      r.addChainableMethod("includes", u, o),
      r.addProperty("ok", function () {
        this.assert(
          e(this, "object"),
          "expected #{this} to be truthy",
          "expected #{this} to be falsy",
        );
      }),
      r.addProperty("true", function () {
        this.assert(
          e(this, "object") === !0,
          "expected #{this} to be true",
          "expected #{this} to be false",
          !e(this, "negate"),
        );
      }),
      r.addProperty("false", function () {
        this.assert(
          e(this, "object") === !1,
          "expected #{this} to be false",
          "expected #{this} to be true",
          !!e(this, "negate"),
        );
      }),
      r.addProperty("null", function () {
        this.assert(
          e(this, "object") === null,
          "expected #{this} to be null",
          "expected #{this} not to be null",
        );
      }),
      r.addProperty("undefined", function () {
        this.assert(
          e(this, "object") === void 0,
          "expected #{this} to be undefined",
          "expected #{this} not to be undefined",
        );
      }),
      r.addProperty("NaN", function () {
        this.assert(
          i.isNaN(e(this, "object")),
          "expected #{this} to be NaN",
          "expected #{this} not to be NaN",
        );
      });
    function w() {
      var s = e(this, "object");
      this.assert(
        s != null,
        "expected #{this} to exist",
        "expected #{this} to not exist",
      );
    }
    r.addProperty("exist", w),
      r.addProperty("exists", w),
      r.addProperty("empty", function () {
        var s = e(this, "object"),
          a = e(this, "ssfi"),
          f = e(this, "message"),
          h;
        switch (f = f ? f + ": " : "", i.type(s).toLowerCase()) {
          case "array":
          case "string":
            h = s.length;
            break;
          case "map":
          case "set":
            h = s.size;
            break;
          case "weakmap":
          case "weakset":
            throw new d(f + ".empty was passed a weak collection", void 0, a);
          case "function":
            var p = f + ".empty was passed a function " + i.getName(s);
            throw new d(p.trim(), void 0, a);
          default:
            if (s !== Object(s)) {
              throw new d(
                f + ".empty was passed non-string primitive " + i.inspect(s),
                void 0,
                a,
              );
            }
            h = Object.keys(s).length;
        }
        this.assert(
          h === 0,
          "expected #{this} to be empty",
          "expected #{this} not to be empty",
        );
      });
    function v() {
      var s = e(this, "object"), a = i.type(s);
      this.assert(
        a === "Arguments",
        "expected #{this} to be arguments but got " + a,
        "expected #{this} to not be arguments",
      );
    }
    r.addProperty("arguments", v), r.addProperty("Arguments", v);
    function C(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object");
      if (e(this, "deep")) {
        var h = e(this, "lockSsfi");
        e(this, "lockSsfi", !0), this.eql(s), e(this, "lockSsfi", h);
      } else {
        this.assert(
          s === f,
          "expected #{this} to equal #{exp}",
          "expected #{this} to not equal #{exp}",
          s,
          this._obj,
          !0,
        );
      }
    }
    r.addMethod("equal", C), r.addMethod("equals", C), r.addMethod("eq", C);
    function Z(s, a) {
      a && e(this, "message", a);
      var f = e(this, "eql");
      this.assert(
        f(s, e(this, "object")),
        "expected #{this} to deeply equal #{exp}",
        "expected #{this} to not deeply equal #{exp}",
        s,
        this._obj,
        !0,
      );
    }
    r.addMethod("eql", Z), r.addMethod("eqls", Z);
    function L(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"),
        h = e(this, "doLength"),
        p = e(this, "message"),
        g = p ? p + ": " : "",
        l = e(this, "ssfi"),
        c = i.type(f).toLowerCase(),
        y = i.type(s).toLowerCase(),
        m,
        x = !0;
      if (
        h && c !== "map" && c !== "set" &&
        new r(f, p, l, !0).to.have.property("length"),
          !h && c === "date" && y !== "date"
      ) {
        m = g + "the argument to above must be a date";
      } else if (y !== "number" && (h || c === "number")) {
        m = g + "the argument to above must be a number";
      } else if (!h && c !== "date" && c !== "number") {
        var N = c === "string" ? "'" + f + "'" : f;
        m = g + "expected " + N + " to be a number or a date";
      } else {
        x = !1;
      }
      if (x) {
        throw new d(m, void 0, l);
      }
      if (h) {
        var q = "length", O;
        c === "map" || c === "set" ? (q = "size", O = f.size) : O = f.length,
          this.assert(
            O > s,
            "expected #{this} to have a " + q + " above #{exp} but got #{act}",
            "expected #{this} to not have a " + q + " above #{exp}",
            s,
            O,
          );
      } else {
        this.assert(
          f > s,
          "expected #{this} to be above #{exp}",
          "expected #{this} to be at most #{exp}",
          s,
        );
      }
    }
    r.addMethod("above", L),
      r.addMethod("gt", L),
      r.addMethod("greaterThan", L);
    function G(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"),
        h = e(this, "doLength"),
        p = e(this, "message"),
        g = p ? p + ": " : "",
        l = e(this, "ssfi"),
        c = i.type(f).toLowerCase(),
        y = i.type(s).toLowerCase(),
        m,
        x = !0;
      if (
        h && c !== "map" && c !== "set" &&
        new r(f, p, l, !0).to.have.property("length"),
          !h && c === "date" && y !== "date"
      ) {
        m = g + "the argument to least must be a date";
      } else if (y !== "number" && (h || c === "number")) {
        m = g + "the argument to least must be a number";
      } else if (!h && c !== "date" && c !== "number") {
        var N = c === "string" ? "'" + f + "'" : f;
        m = g + "expected " + N + " to be a number or a date";
      } else {
        x = !1;
      }
      if (x) {
        throw new d(m, void 0, l);
      }
      if (h) {
        var q = "length", O;
        c === "map" || c === "set" ? (q = "size", O = f.size) : O = f.length,
          this.assert(
            O >= s,
            "expected #{this} to have a " + q +
              " at least #{exp} but got #{act}",
            "expected #{this} to have a " + q + " below #{exp}",
            s,
            O,
          );
      } else {
        this.assert(
          f >= s,
          "expected #{this} to be at least #{exp}",
          "expected #{this} to be below #{exp}",
          s,
        );
      }
    }
    r.addMethod("least", G),
      r.addMethod("gte", G),
      r.addMethod("greaterThanOrEqual", G);
    function X(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"),
        h = e(this, "doLength"),
        p = e(this, "message"),
        g = p ? p + ": " : "",
        l = e(this, "ssfi"),
        c = i.type(f).toLowerCase(),
        y = i.type(s).toLowerCase(),
        m,
        x = !0;
      if (
        h && c !== "map" && c !== "set" &&
        new r(f, p, l, !0).to.have.property("length"),
          !h && c === "date" && y !== "date"
      ) {
        m = g + "the argument to below must be a date";
      } else if (y !== "number" && (h || c === "number")) {
        m = g + "the argument to below must be a number";
      } else if (!h && c !== "date" && c !== "number") {
        var N = c === "string" ? "'" + f + "'" : f;
        m = g + "expected " + N + " to be a number or a date";
      } else {
        x = !1;
      }
      if (x) {
        throw new d(m, void 0, l);
      }
      if (h) {
        var q = "length", O;
        c === "map" || c === "set" ? (q = "size", O = f.size) : O = f.length,
          this.assert(
            O < s,
            "expected #{this} to have a " + q + " below #{exp} but got #{act}",
            "expected #{this} to not have a " + q + " below #{exp}",
            s,
            O,
          );
      } else {
        this.assert(
          f < s,
          "expected #{this} to be below #{exp}",
          "expected #{this} to be at least #{exp}",
          s,
        );
      }
    }
    r.addMethod("below", X), r.addMethod("lt", X), r.addMethod("lessThan", X);
    function $(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"),
        h = e(this, "doLength"),
        p = e(this, "message"),
        g = p ? p + ": " : "",
        l = e(this, "ssfi"),
        c = i.type(f).toLowerCase(),
        y = i.type(s).toLowerCase(),
        m,
        x = !0;
      if (
        h && c !== "map" && c !== "set" &&
        new r(f, p, l, !0).to.have.property("length"),
          !h && c === "date" && y !== "date"
      ) {
        m = g + "the argument to most must be a date";
      } else if (y !== "number" && (h || c === "number")) {
        m = g + "the argument to most must be a number";
      } else if (!h && c !== "date" && c !== "number") {
        var N = c === "string" ? "'" + f + "'" : f;
        m = g + "expected " + N + " to be a number or a date";
      } else {
        x = !1;
      }
      if (x) {
        throw new d(m, void 0, l);
      }
      if (h) {
        var q = "length", O;
        c === "map" || c === "set" ? (q = "size", O = f.size) : O = f.length,
          this.assert(
            O <= s,
            "expected #{this} to have a " + q +
              " at most #{exp} but got #{act}",
            "expected #{this} to have a " + q + " above #{exp}",
            s,
            O,
          );
      } else {
        this.assert(
          f <= s,
          "expected #{this} to be at most #{exp}",
          "expected #{this} to be above #{exp}",
          s,
        );
      }
    }
    r.addMethod("most", $),
      r.addMethod("lte", $),
      r.addMethod("lessThanOrEqual", $),
      r.addMethod("within", function (s, a, f) {
        f && e(this, "message", f);
        var h = e(this, "object"),
          p = e(this, "doLength"),
          g = e(this, "message"),
          l = g ? g + ": " : "",
          c = e(this, "ssfi"),
          y = i.type(h).toLowerCase(),
          m = i.type(s).toLowerCase(),
          x = i.type(a).toLowerCase(),
          N,
          q = !0,
          O = m === "date" && x === "date"
            ? s.toISOString() + ".." + a.toISOString()
            : s + ".." + a;
        if (
          p && y !== "map" && y !== "set" &&
          new r(h, g, c, !0).to.have.property("length"),
            !p && y === "date" && (m !== "date" || x !== "date")
        ) {
          N = l + "the arguments to within must be dates";
        } else if (
          (m !== "number" || x !== "number") && (p || y === "number")
        ) {
          N = l + "the arguments to within must be numbers";
        } else if (!p && y !== "date" && y !== "number") {
          var j = y === "string" ? "'" + h + "'" : h;
          N = l + "expected " + j + " to be a number or a date";
        } else {
          q = !1;
        }
        if (q) {
          throw new d(N, void 0, c);
        }
        if (p) {
          var E = "length", D;
          y === "map" || y === "set" ? (E = "size", D = h.size) : D = h.length,
            this.assert(
              D >= s && D <= a,
              "expected #{this} to have a " + E + " within " + O,
              "expected #{this} to not have a " + E + " within " + O,
            );
        } else {
          this.assert(
            h >= s && h <= a,
            "expected #{this} to be within " + O,
            "expected #{this} to not be within " + O,
          );
        }
      });
    function ie(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"), h = e(this, "ssfi"), p = e(this, "message");
      try {
        var g = f instanceof s;
      } catch (c) {
        throw c instanceof TypeError
          ? (p = p ? p + ": " : "",
            new d(
              p + "The instanceof assertion needs a constructor but " +
                i.type(s) + " was given.",
              void 0,
              h,
            ))
          : c;
      }
      var l = i.getName(s);
      l === null && (l = "an unnamed constructor"),
        this.assert(
          g,
          "expected #{this} to be an instance of " + l,
          "expected #{this} to not be an instance of " + l,
        );
    }
    r.addMethod("instanceof", ie), r.addMethod("instanceOf", ie);
    function ae(s, a, f) {
      f && e(this, "message", f);
      var h = e(this, "nested"),
        p = e(this, "own"),
        g = e(this, "message"),
        l = e(this, "object"),
        c = e(this, "ssfi"),
        y = typeof s;
      if (g = g ? g + ": " : "", h) {
        if (y !== "string") {
          throw new d(
            g +
              "the argument to property must be a string when using nested syntax",
            void 0,
            c,
          );
        }
      } else if (y !== "string" && y !== "number" && y !== "symbol") {
        throw new d(
          g + "the argument to property must be a string, number, or symbol",
          void 0,
          c,
        );
      }
      if (h && p) {
        throw new d(
          g + 'The "nested" and "own" flags cannot be combined.',
          void 0,
          c,
        );
      }
      if (l == null) {
        throw new d(g + "Target cannot be null or undefined.", void 0, c);
      }
      var m = e(this, "deep"),
        x = e(this, "negate"),
        N = h ? i.getPathInfo(l, s) : null,
        q = h ? N.value : l[s],
        O = m ? e(this, "eql") : (D, H) => D === H,
        j = "";
      m && (j += "deep "),
        p && (j += "own "),
        h && (j += "nested "),
        j += "property ";
      var E;
      p
        ? E = Object.prototype.hasOwnProperty.call(l, s)
        : h
        ? E = N.exists
        : E = i.hasProperty(l, s),
        (!x || arguments.length === 1) &&
        this.assert(
          E,
          "expected #{this} to have " + j + i.inspect(s),
          "expected #{this} to not have " + j + i.inspect(s),
        ),
        arguments.length > 1 &&
        this.assert(
          E && O(a, q),
          "expected #{this} to have " + j + i.inspect(s) +
            " of #{exp}, but got #{act}",
          "expected #{this} to not have " + j + i.inspect(s) + " of #{act}",
          a,
          q,
        ),
        e(this, "object", q);
    }
    r.addMethod("property", ae);
    function ue(s, a, f) {
      e(this, "own", !0), ae.apply(this, arguments);
    }
    r.addMethod("ownProperty", ue), r.addMethod("haveOwnProperty", ue);
    function ce(s, a, f) {
      typeof a == "string" && (f = a, a = null), f && e(this, "message", f);
      var h = e(this, "object"),
        p = Object.getOwnPropertyDescriptor(Object(h), s),
        g = e(this, "eql");
      p && a
        ? this.assert(
          g(a, p),
          "expected the own property descriptor for " + i.inspect(s) +
            " on #{this} to match " + i.inspect(a) + ", got " + i.inspect(p),
          "expected the own property descriptor for " + i.inspect(s) +
            " on #{this} to not match " + i.inspect(a),
          a,
          p,
          !0,
        )
        : this.assert(
          p,
          "expected #{this} to have an own property descriptor for " +
            i.inspect(s),
          "expected #{this} to not have an own property descriptor for " +
            i.inspect(s),
        ), e(this, "object", p);
    }
    r.addMethod("ownPropertyDescriptor", ce),
      r.addMethod("haveOwnPropertyDescriptor", ce);
    function fe() {
      e(this, "doLength", !0);
    }
    function de(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"),
        h = i.type(f).toLowerCase(),
        p = e(this, "message"),
        g = e(this, "ssfi"),
        l = "length",
        c;
      switch (h) {
        case "map":
        case "set":
          l = "size", c = f.size;
          break;
        default:
          new r(f, p, g, !0).to.have.property("length"), c = f.length;
      }
      this.assert(
        c == s,
        "expected #{this} to have a " + l + " of #{exp} but got #{act}",
        "expected #{this} to not have a " + l + " of #{act}",
        s,
        c,
      );
    }
    r.addChainableMethod("length", de, fe),
      r.addChainableMethod("lengthOf", de, fe);
    function he(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object");
      this.assert(
        s.exec(f),
        "expected #{this} to match " + s,
        "expected #{this} not to match " + s,
      );
    }
    r.addMethod("match", he),
      r.addMethod("matches", he),
      r.addMethod("string", function (s, a) {
        a && e(this, "message", a);
        var f = e(this, "object"), h = e(this, "message"), p = e(this, "ssfi");
        new r(f, h, p, !0).is.a("string"),
          this.assert(
            ~f.indexOf(s),
            "expected #{this} to contain " + i.inspect(s),
            "expected #{this} to not contain " + i.inspect(s),
          );
      });
    function le(s) {
      var a = e(this, "object"),
        f = i.type(a),
        h = i.type(s),
        p = e(this, "ssfi"),
        g = e(this, "deep"),
        l,
        c = "",
        y,
        m = !0,
        x = e(this, "message");
      x = x ? x + ": " : "";
      var N = x +
        "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
      if (f === "Map" || f === "Set") {
        c = g ? "deeply " : "",
          y = [],
          a.forEach(function (S, V) {
            y.push(V);
          }),
          h !== "Array" && (s = Array.prototype.slice.call(arguments));
      } else {
        switch (y = i.getOwnEnumerableProperties(a), h) {
          case "Array":
            if (arguments.length > 1) {
              throw new d(N, void 0, p);
            }
            break;
          case "Object":
            if (arguments.length > 1) {
              throw new d(N, void 0, p);
            }
            s = Object.keys(s);
            break;
          default:
            s = Array.prototype.slice.call(arguments);
        }
        s = s.map(function (S) {
          return typeof S == "symbol" ? S : String(S);
        });
      }
      if (!s.length) {
        throw new d(x + "keys required", void 0, p);
      }
      var q = s.length,
        O = e(this, "any"),
        j = e(this, "all"),
        E = s,
        D = g ? e(this, "eql") : (S, V) => S === V;
      if (
        !O && !j && (j = !0),
          O && (m = E.some(function (S) {
            return y.some(function (V) {
              return D(S, V);
            });
          })),
          j && (m = E.every(function (S) {
            return y.some(function (V) {
              return D(S, V);
            });
          }),
            e(this, "contains") || (m = m && s.length == y.length)),
          q > 1
      ) {
        s = s.map(function (S) {
          return i.inspect(S);
        });
        var H = s.pop();
        j && (l = s.join(", ") + ", and " + H),
          O && (l = s.join(", ") + ", or " + H);
      } else {
        l = i.inspect(s[0]);
      }
      l = (q > 1 ? "keys " : "key ") + l,
        l = (e(this, "contains") ? "contain " : "have ") + l,
        this.assert(
          m,
          "expected #{this} to " + c + l,
          "expected #{this} to not " + c + l,
          E.slice(0).sort(i.compareByInspect),
          y.sort(i.compareByInspect),
          !0,
        );
    }
    r.addMethod("keys", le), r.addMethod("key", le);
    function _(s, a, f) {
      f && e(this, "message", f);
      var h = e(this, "object"),
        p = e(this, "ssfi"),
        g = e(this, "message"),
        l = e(this, "negate") || !1;
      new r(h, g, p, !0).is.a("function"),
        (s instanceof RegExp || typeof s == "string") && (a = s, s = null);
      var c;
      try {
        h();
      } catch (H) {
        c = H;
      }
      var y = s === void 0 && a === void 0, m = !!(s && a), x = !1, N = !1;
      if (y || !y && !l) {
        var q = "an error";
        s instanceof Error
          ? q = "#{exp}"
          : s && (q = i.checkError.getConstructorName(s)),
          this.assert(
            c,
            "expected #{this} to throw " + q,
            "expected #{this} to not throw an error but #{act} was thrown",
            s && s.toString(),
            c instanceof Error
              ? c.toString()
              : typeof c == "string"
              ? c
              : c && i.checkError.getConstructorName(c),
          );
      }
      if (s && c) {
        if (s instanceof Error) {
          var O = i.checkError.compatibleInstance(c, s);
          O === l &&
            (m && l ? x = !0 : this.assert(
              l,
              "expected #{this} to throw #{exp} but #{act} was thrown",
              "expected #{this} to not throw #{exp}" +
                (c && !l ? " but #{act} was thrown" : ""),
              s.toString(),
              c.toString(),
            ));
        }
        var j = i.checkError.compatibleConstructor(c, s);
        j === l &&
          (m && l ? x = !0 : this.assert(
            l,
            "expected #{this} to throw #{exp} but #{act} was thrown",
            "expected #{this} to not throw #{exp}" +
              (c ? " but #{act} was thrown" : ""),
            s instanceof Error
              ? s.toString()
              : s && i.checkError.getConstructorName(s),
            c instanceof Error
              ? c.toString()
              : c && i.checkError.getConstructorName(c),
          ));
      }
      if (c && a !== void 0 && a !== null) {
        var E = "including";
        a instanceof RegExp && (E = "matching");
        var D = i.checkError.compatibleMessage(c, a);
        D === l &&
          (m && l ? N = !0 : this.assert(
            l,
            "expected #{this} to throw error " + E + " #{exp} but got #{act}",
            "expected #{this} to throw error not " + E + " #{exp}",
            a,
            i.checkError.getMessage(c),
          ));
      }
      x && N &&
      this.assert(
        l,
        "expected #{this} to throw #{exp} but #{act} was thrown",
        "expected #{this} to not throw #{exp}" +
          (c ? " but #{act} was thrown" : ""),
        s instanceof Error
          ? s.toString()
          : s && i.checkError.getConstructorName(s),
        c instanceof Error
          ? c.toString()
          : c && i.checkError.getConstructorName(c),
      ), e(this, "object", c);
    }
    r.addMethod("throw", _), r.addMethod("throws", _), r.addMethod("Throw", _);
    function pe(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"),
        h = e(this, "itself"),
        p = typeof f == "function" && !h ? f.prototype[s] : f[s];
      this.assert(
        typeof p == "function",
        "expected #{this} to respond to " + i.inspect(s),
        "expected #{this} to not respond to " + i.inspect(s),
      );
    }
    r.addMethod("respondTo", pe),
      r.addMethod("respondsTo", pe),
      r.addProperty("itself", function () {
        e(this, "itself", !0);
      });
    function be(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"), h = s(f);
      this.assert(
        h,
        "expected #{this} to satisfy " + i.objDisplay(s),
        "expected #{this} to not satisfy" + i.objDisplay(s),
        !e(this, "negate"),
        h,
      );
    }
    r.addMethod("satisfy", be), r.addMethod("satisfies", be);
    function ge(s, a, f) {
      f && e(this, "message", f);
      var h = e(this, "object"), p = e(this, "message"), g = e(this, "ssfi");
      if (
        new r(h, p, g, !0).is.a("number"),
          typeof s != "number" || typeof a != "number"
      ) {
        p = p ? p + ": " : "";
        var l = a === void 0 ? ", and a delta is required" : "";
        throw new d(
          p + "the arguments to closeTo or approximately must be numbers" + l,
          void 0,
          g,
        );
      }
      this.assert(
        Math.abs(h - s) <= a,
        "expected #{this} to be close to " + s + " +/- " + a,
        "expected #{this} not to be close to " + s + " +/- " + a,
      );
    }
    r.addMethod("closeTo", ge), r.addMethod("approximately", ge);
    function kt(s, a, f, h, p) {
      if (!h) {
        if (s.length !== a.length) {
          return !1;
        }
        a = a.slice();
      }
      return s.every(function (g, l) {
        if (p) {
          return f ? f(g, a[l]) : g === a[l];
        }
        if (!f) {
          var c = a.indexOf(g);
          return c === -1 ? !1 : (h || a.splice(c, 1), !0);
        }
        return a.some(function (y, m) {
          return f(g, y) ? (h || a.splice(m, 1), !0) : !1;
        });
      });
    }
    r.addMethod("members", function (s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"), h = e(this, "message"), p = e(this, "ssfi");
      new r(f, h, p, !0).to.be.an("array"),
        new r(s, h, p, !0).to.be.an("array");
      var g = e(this, "contains"), l = e(this, "ordered"), c, y, m;
      g
        ? (c = l ? "an ordered superset" : "a superset",
          y = "expected #{this} to be " + c + " of #{exp}",
          m = "expected #{this} to not be " + c + " of #{exp}")
        : (c = l ? "ordered members" : "members",
          y = "expected #{this} to have the same " + c + " as #{exp}",
          m = "expected #{this} to not have the same " + c + " as #{exp}");
      var x = e(this, "deep") ? e(this, "eql") : void 0;
      this.assert(kt(s, f, x, g, l), y, m, s, f, !0);
    });
    function Ct(s, a) {
      a && e(this, "message", a);
      var f = e(this, "object"),
        h = e(this, "message"),
        p = e(this, "ssfi"),
        g = e(this, "contains"),
        l = e(this, "deep"),
        c = e(this, "eql");
      new r(s, h, p, !0).to.be.an("array"),
        g
          ? this.assert(
            s.some(function (y) {
              return f.indexOf(y) > -1;
            }),
            "expected #{this} to contain one of #{exp}",
            "expected #{this} to not contain one of #{exp}",
            s,
            f,
          )
          : l
          ? this.assert(
            s.some(function (y) {
              return c(f, y);
            }),
            "expected #{this} to deeply equal one of #{exp}",
            "expected #{this} to deeply equal one of #{exp}",
            s,
            f,
          )
          : this.assert(
            s.indexOf(f) > -1,
            "expected #{this} to be one of #{exp}",
            "expected #{this} to not be one of #{exp}",
            s,
            f,
          );
    }
    r.addMethod("oneOf", Ct);
    function we(s, a, f) {
      f && e(this, "message", f);
      var h = e(this, "object"), p = e(this, "message"), g = e(this, "ssfi");
      new r(h, p, g, !0).is.a("function");
      var l;
      a
        ? (new r(s, p, g, !0).to.have.property(a), l = s[a])
        : (new r(s, p, g, !0).is.a("function"), l = s()), h();
      var c = a == null ? s() : s[a], y = a == null ? l : "." + a;
      e(this, "deltaMsgObj", y),
        e(this, "initialDeltaValue", l),
        e(this, "finalDeltaValue", c),
        e(this, "deltaBehavior", "change"),
        e(this, "realDelta", c !== l),
        this.assert(
          l !== c,
          "expected " + y + " to change",
          "expected " + y + " to not change",
        );
    }
    r.addMethod("change", we), r.addMethod("changes", we);
    function ye(s, a, f) {
      f && e(this, "message", f);
      var h = e(this, "object"), p = e(this, "message"), g = e(this, "ssfi");
      new r(h, p, g, !0).is.a("function");
      var l;
      a
        ? (new r(s, p, g, !0).to.have.property(a), l = s[a])
        : (new r(s, p, g, !0).is.a("function"), l = s()),
        new r(l, p, g, !0).is.a("number"),
        h();
      var c = a == null ? s() : s[a], y = a == null ? l : "." + a;
      e(this, "deltaMsgObj", y),
        e(this, "initialDeltaValue", l),
        e(this, "finalDeltaValue", c),
        e(this, "deltaBehavior", "increase"),
        e(this, "realDelta", c - l),
        this.assert(
          c - l > 0,
          "expected " + y + " to increase",
          "expected " + y + " to not increase",
        );
    }
    r.addMethod("increase", ye), r.addMethod("increases", ye);
    function ve(s, a, f) {
      f && e(this, "message", f);
      var h = e(this, "object"), p = e(this, "message"), g = e(this, "ssfi");
      new r(h, p, g, !0).is.a("function");
      var l;
      a
        ? (new r(s, p, g, !0).to.have.property(a), l = s[a])
        : (new r(s, p, g, !0).is.a("function"), l = s()),
        new r(l, p, g, !0).is.a("number"),
        h();
      var c = a == null ? s() : s[a], y = a == null ? l : "." + a;
      e(this, "deltaMsgObj", y),
        e(this, "initialDeltaValue", l),
        e(this, "finalDeltaValue", c),
        e(this, "deltaBehavior", "decrease"),
        e(this, "realDelta", l - c),
        this.assert(
          c - l < 0,
          "expected " + y + " to decrease",
          "expected " + y + " to not decrease",
        );
    }
    r.addMethod("decrease", ve), r.addMethod("decreases", ve);
    function Bt(s, a) {
      a && e(this, "message", a);
      var f = e(this, "deltaMsgObj"),
        h = e(this, "initialDeltaValue"),
        p = e(this, "finalDeltaValue"),
        g = e(this, "deltaBehavior"),
        l = e(this, "realDelta"),
        c;
      g === "change"
        ? c = Math.abs(p - h) === Math.abs(s)
        : c = l === Math.abs(s),
        this.assert(
          c,
          "expected " + f + " to " + g + " by " + s,
          "expected " + f + " to not " + g + " by " + s,
        );
    }
    r.addMethod("by", Bt),
      r.addProperty("extensible", function () {
        var s = e(this, "object"),
          a = s === Object(s) && Object.isExtensible(s);
        this.assert(
          a,
          "expected #{this} to be extensible",
          "expected #{this} to not be extensible",
        );
      }),
      r.addProperty("sealed", function () {
        var s = e(this, "object"),
          a = s === Object(s) ? Object.isSealed(s) : !0;
        this.assert(
          a,
          "expected #{this} to be sealed",
          "expected #{this} to not be sealed",
        );
      }),
      r.addProperty("frozen", function () {
        var s = e(this, "object"),
          a = s === Object(s) ? Object.isFrozen(s) : !0;
        this.assert(
          a,
          "expected #{this} to be frozen",
          "expected #{this} to not be frozen",
        );
      }),
      r.addProperty("finite", function (s) {
        var a = e(this, "object");
        this.assert(
          typeof a == "number" && isFinite(a),
          "expected #{this} to be a finite number",
          "expected #{this} to not be a finite number",
        );
      });
  };
});
var Pt = M((fr, Mt) => {
  Mt.exports = function (b, i) {
    b.expect = function (r, d) {
      return new b.Assertion(r, d);
    },
      b.expect.fail = function (r, d, e, t) {
        throw arguments.length < 2 && (e = r, r = void 0),
          e = e || "expect.fail()",
          new b.AssertionError(
            e,
            { actual: r, expected: d, operator: t },
            b.expect.fail,
          );
      };
  };
});
var Nt = M((dr, jt) => {
  jt.exports = function (b, i) {
    var r = b.Assertion;
    function d() {
      function e() {
        return this instanceof String || this instanceof Number ||
            this instanceof Boolean ||
            typeof Symbol == "function" && this instanceof Symbol ||
            typeof BigInt == "function" && this instanceof BigInt
          ? new r(this.valueOf(), null, e)
          : new r(this, null, e);
      }
      function t(o) {
        Object.defineProperty(this, "should", {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        });
      }
      Object.defineProperty(Object.prototype, "should", {
        set: t,
        get: e,
        configurable: !0,
      });
      var n = {};
      return n.fail = function (o, u, w, v) {
        throw arguments.length < 2 && (w = o, o = void 0),
          w = w || "should.fail()",
          new b.AssertionError(
            w,
            { actual: o, expected: u, operator: v },
            n.fail,
          );
      },
        n.equal = function (o, u, w) {
          new r(o, w).to.equal(u);
        },
        n.Throw = function (o, u, w, v) {
          new r(o, v).to.Throw(u, w);
        },
        n.exist = function (o, u) {
          new r(o, u).to.exist;
        },
        n.not = {},
        n.not.equal = function (o, u, w) {
          new r(o, w).to.not.equal(u);
        },
        n.not.Throw = function (o, u, w, v) {
          new r(o, v).to.not.Throw(u, w);
        },
        n.not.exist = function (o, u) {
          new r(o, u).to.not.exist;
        },
        n.throw = n.Throw,
        n.not.throw = n.not.Throw,
        n;
    }
    b.should = d, b.Should = d;
  };
});
var Dt = M((hr, Et) => {
  Et.exports = function (b, i) {
    var r = b.Assertion, d = i.flag;
    var e = b.assert = function (t, n) {
      var o = new r(null, null, b.assert, !0);
      o.assert(t, n, "[ negation message unavailable ]");
    };
    e.fail = function (t, n, o, u) {
      throw arguments.length < 2 && (o = t, t = void 0),
        o = o || "assert.fail()",
        new b.AssertionError(
          o,
          { actual: t, expected: n, operator: u },
          e.fail,
        );
    },
      e.isOk = function (t, n) {
        new r(t, n, e.isOk, !0).is.ok;
      },
      e.isNotOk = function (t, n) {
        new r(t, n, e.isNotOk, !0).is.not.ok;
      },
      e.equal = function (t, n, o) {
        var u = new r(t, o, e.equal, !0);
        u.assert(
          n == d(u, "object"),
          "expected #{this} to equal #{exp}",
          "expected #{this} to not equal #{act}",
          n,
          t,
          !0,
        );
      },
      e.notEqual = function (t, n, o) {
        var u = new r(t, o, e.notEqual, !0);
        u.assert(
          n != d(u, "object"),
          "expected #{this} to not equal #{exp}",
          "expected #{this} to equal #{act}",
          n,
          t,
          !0,
        );
      },
      e.strictEqual = function (t, n, o) {
        new r(t, o, e.strictEqual, !0).to.equal(n);
      },
      e.notStrictEqual = function (t, n, o) {
        new r(t, o, e.notStrictEqual, !0).to.not.equal(n);
      },
      e.deepEqual = e.deepStrictEqual = function (t, n, o) {
        new r(t, o, e.deepEqual, !0).to.eql(n);
      },
      e.notDeepEqual = function (t, n, o) {
        new r(t, o, e.notDeepEqual, !0).to.not.eql(n);
      },
      e.isAbove = function (t, n, o) {
        new r(t, o, e.isAbove, !0).to.be.above(n);
      },
      e.isAtLeast = function (t, n, o) {
        new r(t, o, e.isAtLeast, !0).to.be.least(n);
      },
      e.isBelow = function (t, n, o) {
        new r(t, o, e.isBelow, !0).to.be.below(n);
      },
      e.isAtMost = function (t, n, o) {
        new r(t, o, e.isAtMost, !0).to.be.most(n);
      },
      e.isTrue = function (t, n) {
        new r(t, n, e.isTrue, !0).is.true;
      },
      e.isNotTrue = function (t, n) {
        new r(t, n, e.isNotTrue, !0).to.not.equal(!0);
      },
      e.isFalse = function (t, n) {
        new r(t, n, e.isFalse, !0).is.false;
      },
      e.isNotFalse = function (t, n) {
        new r(t, n, e.isNotFalse, !0).to.not.equal(!1);
      },
      e.isNull = function (t, n) {
        new r(t, n, e.isNull, !0).to.equal(null);
      },
      e.isNotNull = function (t, n) {
        new r(t, n, e.isNotNull, !0).to.not.equal(null);
      },
      e.isNaN = function (t, n) {
        new r(t, n, e.isNaN, !0).to.be.NaN;
      },
      e.isNotNaN = function (t, n) {
        new r(t, n, e.isNotNaN, !0).not.to.be.NaN;
      },
      e.exists = function (t, n) {
        new r(t, n, e.exists, !0).to.exist;
      },
      e.notExists = function (t, n) {
        new r(t, n, e.notExists, !0).to.not.exist;
      },
      e.isUndefined = function (t, n) {
        new r(t, n, e.isUndefined, !0).to.equal(void 0);
      },
      e.isDefined = function (t, n) {
        new r(t, n, e.isDefined, !0).to.not.equal(void 0);
      },
      e.isFunction = function (t, n) {
        new r(t, n, e.isFunction, !0).to.be.a("function");
      },
      e.isNotFunction = function (t, n) {
        new r(t, n, e.isNotFunction, !0).to.not.be.a("function");
      },
      e.isObject = function (t, n) {
        new r(t, n, e.isObject, !0).to.be.a("object");
      },
      e.isNotObject = function (t, n) {
        new r(t, n, e.isNotObject, !0).to.not.be.a("object");
      },
      e.isArray = function (t, n) {
        new r(t, n, e.isArray, !0).to.be.an("array");
      },
      e.isNotArray = function (t, n) {
        new r(t, n, e.isNotArray, !0).to.not.be.an("array");
      },
      e.isString = function (t, n) {
        new r(t, n, e.isString, !0).to.be.a("string");
      },
      e.isNotString = function (t, n) {
        new r(t, n, e.isNotString, !0).to.not.be.a("string");
      },
      e.isNumber = function (t, n) {
        new r(t, n, e.isNumber, !0).to.be.a("number");
      },
      e.isNotNumber = function (t, n) {
        new r(t, n, e.isNotNumber, !0).to.not.be.a("number");
      },
      e.isFinite = function (t, n) {
        new r(t, n, e.isFinite, !0).to.be.finite;
      },
      e.isBoolean = function (t, n) {
        new r(t, n, e.isBoolean, !0).to.be.a("boolean");
      },
      e.isNotBoolean = function (t, n) {
        new r(t, n, e.isNotBoolean, !0).to.not.be.a("boolean");
      },
      e.typeOf = function (t, n, o) {
        new r(t, o, e.typeOf, !0).to.be.a(n);
      },
      e.notTypeOf = function (t, n, o) {
        new r(t, o, e.notTypeOf, !0).to.not.be.a(n);
      },
      e.instanceOf = function (t, n, o) {
        new r(t, o, e.instanceOf, !0).to.be.instanceOf(n);
      },
      e.notInstanceOf = function (t, n, o) {
        new r(t, o, e.notInstanceOf, !0).to.not.be.instanceOf(n);
      },
      e.include = function (t, n, o) {
        new r(t, o, e.include, !0).include(n);
      },
      e.notInclude = function (t, n, o) {
        new r(t, o, e.notInclude, !0).not.include(n);
      },
      e.deepInclude = function (t, n, o) {
        new r(t, o, e.deepInclude, !0).deep.include(n);
      },
      e.notDeepInclude = function (t, n, o) {
        new r(t, o, e.notDeepInclude, !0).not.deep.include(n);
      },
      e.nestedInclude = function (t, n, o) {
        new r(t, o, e.nestedInclude, !0).nested.include(n);
      },
      e.notNestedInclude = function (t, n, o) {
        new r(t, o, e.notNestedInclude, !0).not.nested.include(n);
      },
      e.deepNestedInclude = function (t, n, o) {
        new r(t, o, e.deepNestedInclude, !0).deep.nested.include(n);
      },
      e.notDeepNestedInclude = function (t, n, o) {
        new r(t, o, e.notDeepNestedInclude, !0).not.deep.nested.include(n);
      },
      e.ownInclude = function (t, n, o) {
        new r(t, o, e.ownInclude, !0).own.include(n);
      },
      e.notOwnInclude = function (t, n, o) {
        new r(t, o, e.notOwnInclude, !0).not.own.include(n);
      },
      e.deepOwnInclude = function (t, n, o) {
        new r(t, o, e.deepOwnInclude, !0).deep.own.include(n);
      },
      e.notDeepOwnInclude = function (t, n, o) {
        new r(t, o, e.notDeepOwnInclude, !0).not.deep.own.include(n);
      },
      e.match = function (t, n, o) {
        new r(t, o, e.match, !0).to.match(n);
      },
      e.notMatch = function (t, n, o) {
        new r(t, o, e.notMatch, !0).to.not.match(n);
      },
      e.property = function (t, n, o) {
        new r(t, o, e.property, !0).to.have.property(n);
      },
      e.notProperty = function (t, n, o) {
        new r(t, o, e.notProperty, !0).to.not.have.property(n);
      },
      e.propertyVal = function (t, n, o, u) {
        new r(t, u, e.propertyVal, !0).to.have.property(n, o);
      },
      e.notPropertyVal = function (t, n, o, u) {
        new r(t, u, e.notPropertyVal, !0).to.not.have.property(n, o);
      },
      e.deepPropertyVal = function (t, n, o, u) {
        new r(t, u, e.deepPropertyVal, !0).to.have.deep.property(n, o);
      },
      e.notDeepPropertyVal = function (t, n, o, u) {
        new r(t, u, e.notDeepPropertyVal, !0).to.not.have.deep.property(n, o);
      },
      e.ownProperty = function (t, n, o) {
        new r(t, o, e.ownProperty, !0).to.have.own.property(n);
      },
      e.notOwnProperty = function (t, n, o) {
        new r(t, o, e.notOwnProperty, !0).to.not.have.own.property(n);
      },
      e.ownPropertyVal = function (t, n, o, u) {
        new r(t, u, e.ownPropertyVal, !0).to.have.own.property(n, o);
      },
      e.notOwnPropertyVal = function (t, n, o, u) {
        new r(t, u, e.notOwnPropertyVal, !0).to.not.have.own.property(n, o);
      },
      e.deepOwnPropertyVal = function (t, n, o, u) {
        new r(t, u, e.deepOwnPropertyVal, !0).to.have.deep.own.property(n, o);
      },
      e.notDeepOwnPropertyVal = function (t, n, o, u) {
        new r(t, u, e.notDeepOwnPropertyVal, !0).to.not.have.deep.own.property(
          n,
          o,
        );
      },
      e.nestedProperty = function (t, n, o) {
        new r(t, o, e.nestedProperty, !0).to.have.nested.property(n);
      },
      e.notNestedProperty = function (t, n, o) {
        new r(t, o, e.notNestedProperty, !0).to.not.have.nested.property(n);
      },
      e.nestedPropertyVal = function (t, n, o, u) {
        new r(t, u, e.nestedPropertyVal, !0).to.have.nested.property(n, o);
      },
      e.notNestedPropertyVal = function (t, n, o, u) {
        new r(t, u, e.notNestedPropertyVal, !0).to.not.have.nested.property(
          n,
          o,
        );
      },
      e.deepNestedPropertyVal = function (t, n, o, u) {
        new r(t, u, e.deepNestedPropertyVal, !0).to.have.deep.nested.property(
          n,
          o,
        );
      },
      e.notDeepNestedPropertyVal = function (t, n, o, u) {
        new r(t, u, e.notDeepNestedPropertyVal, !0).to.not.have.deep.nested
          .property(n, o);
      },
      e.lengthOf = function (t, n, o) {
        new r(t, o, e.lengthOf, !0).to.have.lengthOf(n);
      },
      e.hasAnyKeys = function (t, n, o) {
        new r(t, o, e.hasAnyKeys, !0).to.have.any.keys(n);
      },
      e.hasAllKeys = function (t, n, o) {
        new r(t, o, e.hasAllKeys, !0).to.have.all.keys(n);
      },
      e.containsAllKeys = function (t, n, o) {
        new r(t, o, e.containsAllKeys, !0).to.contain.all.keys(n);
      },
      e.doesNotHaveAnyKeys = function (t, n, o) {
        new r(t, o, e.doesNotHaveAnyKeys, !0).to.not.have.any.keys(n);
      },
      e.doesNotHaveAllKeys = function (t, n, o) {
        new r(t, o, e.doesNotHaveAllKeys, !0).to.not.have.all.keys(n);
      },
      e.hasAnyDeepKeys = function (t, n, o) {
        new r(t, o, e.hasAnyDeepKeys, !0).to.have.any.deep.keys(n);
      },
      e.hasAllDeepKeys = function (t, n, o) {
        new r(t, o, e.hasAllDeepKeys, !0).to.have.all.deep.keys(n);
      },
      e.containsAllDeepKeys = function (t, n, o) {
        new r(t, o, e.containsAllDeepKeys, !0).to.contain.all.deep.keys(n);
      },
      e.doesNotHaveAnyDeepKeys = function (t, n, o) {
        new r(t, o, e.doesNotHaveAnyDeepKeys, !0).to.not.have.any.deep.keys(n);
      },
      e.doesNotHaveAllDeepKeys = function (t, n, o) {
        new r(t, o, e.doesNotHaveAllDeepKeys, !0).to.not.have.all.deep.keys(n);
      },
      e.throws = function (t, n, o, u) {
        (typeof n == "string" || n instanceof RegExp) && (o = n, n = null);
        var w = new r(t, u, e.throws, !0).to.throw(n, o);
        return d(w, "object");
      },
      e.doesNotThrow = function (t, n, o, u) {
        (typeof n == "string" || n instanceof RegExp) && (o = n, n = null),
          new r(t, u, e.doesNotThrow, !0).to.not.throw(n, o);
      },
      e.operator = function (t, n, o, u) {
        var w;
        switch (n) {
          case "==":
            w = t == o;
            break;
          case "===":
            w = t === o;
            break;
          case ">":
            w = t > o;
            break;
          case ">=":
            w = t >= o;
            break;
          case "<":
            w = t < o;
            break;
          case "<=":
            w = t <= o;
            break;
          case "!=":
            w = t != o;
            break;
          case "!==":
            w = t !== o;
            break;
          default:
            throw u = u && u + ": ",
              new b.AssertionError(
                u + 'Invalid operator "' + n + '"',
                void 0,
                e.operator,
              );
        }
        var v = new r(w, u, e.operator, !0);
        v.assert(
          d(v, "object") === !0,
          "expected " + i.inspect(t) + " to be " + n + " " + i.inspect(o),
          "expected " + i.inspect(t) + " to not be " + n + " " + i.inspect(o),
        );
      },
      e.closeTo = function (t, n, o, u) {
        new r(t, u, e.closeTo, !0).to.be.closeTo(n, o);
      },
      e.approximately = function (t, n, o, u) {
        new r(t, u, e.approximately, !0).to.be.approximately(n, o);
      },
      e.sameMembers = function (t, n, o) {
        new r(t, o, e.sameMembers, !0).to.have.same.members(n);
      },
      e.notSameMembers = function (t, n, o) {
        new r(t, o, e.notSameMembers, !0).to.not.have.same.members(n);
      },
      e.sameDeepMembers = function (t, n, o) {
        new r(t, o, e.sameDeepMembers, !0).to.have.same.deep.members(n);
      },
      e.notSameDeepMembers = function (t, n, o) {
        new r(t, o, e.notSameDeepMembers, !0).to.not.have.same.deep.members(n);
      },
      e.sameOrderedMembers = function (t, n, o) {
        new r(t, o, e.sameOrderedMembers, !0).to.have.same.ordered.members(n);
      },
      e.notSameOrderedMembers = function (t, n, o) {
        new r(t, o, e.notSameOrderedMembers, !0).to.not.have.same.ordered
          .members(n);
      },
      e.sameDeepOrderedMembers = function (t, n, o) {
        new r(t, o, e.sameDeepOrderedMembers, !0).to.have.same.deep.ordered
          .members(n);
      },
      e.notSameDeepOrderedMembers = function (t, n, o) {
        new r(t, o, e.notSameDeepOrderedMembers, !0).to.not.have.same.deep
          .ordered.members(n);
      },
      e.includeMembers = function (t, n, o) {
        new r(t, o, e.includeMembers, !0).to.include.members(n);
      },
      e.notIncludeMembers = function (t, n, o) {
        new r(t, o, e.notIncludeMembers, !0).to.not.include.members(n);
      },
      e.includeDeepMembers = function (t, n, o) {
        new r(t, o, e.includeDeepMembers, !0).to.include.deep.members(n);
      },
      e.notIncludeDeepMembers = function (t, n, o) {
        new r(t, o, e.notIncludeDeepMembers, !0).to.not.include.deep.members(n);
      },
      e.includeOrderedMembers = function (t, n, o) {
        new r(t, o, e.includeOrderedMembers, !0).to.include.ordered.members(n);
      },
      e.notIncludeOrderedMembers = function (t, n, o) {
        new r(t, o, e.notIncludeOrderedMembers, !0).to.not.include.ordered
          .members(n);
      },
      e.includeDeepOrderedMembers = function (t, n, o) {
        new r(t, o, e.includeDeepOrderedMembers, !0).to.include.deep.ordered
          .members(n);
      },
      e.notIncludeDeepOrderedMembers = function (t, n, o) {
        new r(t, o, e.notIncludeDeepOrderedMembers, !0).to.not.include.deep
          .ordered.members(n);
      },
      e.oneOf = function (t, n, o) {
        new r(t, o, e.oneOf, !0).to.be.oneOf(n);
      },
      e.changes = function (t, n, o, u) {
        arguments.length === 3 && typeof n == "function" && (u = o, o = null),
          new r(t, u, e.changes, !0).to.change(n, o);
      },
      e.changesBy = function (t, n, o, u, w) {
        if (arguments.length === 4 && typeof n == "function") {
          var v = u;
          u = o, w = v;
        } else {
          arguments.length === 3 && (u = o, o = null);
        }
        new r(t, w, e.changesBy, !0).to.change(n, o).by(u);
      },
      e.doesNotChange = function (t, n, o, u) {
        return arguments.length === 3 && typeof n == "function" &&
          (u = o, o = null),
          new r(t, u, e.doesNotChange, !0).to.not.change(n, o);
      },
      e.changesButNotBy = function (t, n, o, u, w) {
        if (arguments.length === 4 && typeof n == "function") {
          var v = u;
          u = o, w = v;
        } else {
          arguments.length === 3 && (u = o, o = null);
        }
        new r(t, w, e.changesButNotBy, !0).to.change(n, o).but.not.by(u);
      },
      e.increases = function (t, n, o, u) {
        return arguments.length === 3 && typeof n == "function" &&
          (u = o, o = null),
          new r(t, u, e.increases, !0).to.increase(n, o);
      },
      e.increasesBy = function (t, n, o, u, w) {
        if (arguments.length === 4 && typeof n == "function") {
          var v = u;
          u = o, w = v;
        } else {
          arguments.length === 3 && (u = o, o = null);
        }
        new r(t, w, e.increasesBy, !0).to.increase(n, o).by(u);
      },
      e.doesNotIncrease = function (t, n, o, u) {
        return arguments.length === 3 && typeof n == "function" &&
          (u = o, o = null),
          new r(t, u, e.doesNotIncrease, !0).to.not.increase(n, o);
      },
      e.increasesButNotBy = function (t, n, o, u, w) {
        if (arguments.length === 4 && typeof n == "function") {
          var v = u;
          u = o, w = v;
        } else {
          arguments.length === 3 && (u = o, o = null);
        }
        new r(t, w, e.increasesButNotBy, !0).to.increase(n, o).but.not.by(u);
      },
      e.decreases = function (t, n, o, u) {
        return arguments.length === 3 && typeof n == "function" &&
          (u = o, o = null),
          new r(t, u, e.decreases, !0).to.decrease(n, o);
      },
      e.decreasesBy = function (t, n, o, u, w) {
        if (arguments.length === 4 && typeof n == "function") {
          var v = u;
          u = o, w = v;
        } else {
          arguments.length === 3 && (u = o, o = null);
        }
        new r(t, w, e.decreasesBy, !0).to.decrease(n, o).by(u);
      },
      e.doesNotDecrease = function (t, n, o, u) {
        return arguments.length === 3 && typeof n == "function" &&
          (u = o, o = null),
          new r(t, u, e.doesNotDecrease, !0).to.not.decrease(n, o);
      },
      e.doesNotDecreaseBy = function (t, n, o, u, w) {
        if (arguments.length === 4 && typeof n == "function") {
          var v = u;
          u = o, w = v;
        } else {
          arguments.length === 3 && (u = o, o = null);
        }
        return new r(t, w, e.doesNotDecreaseBy, !0).to.not.decrease(n, o).by(u);
      },
      e.decreasesButNotBy = function (t, n, o, u, w) {
        if (arguments.length === 4 && typeof n == "function") {
          var v = u;
          u = o, w = v;
        } else {
          arguments.length === 3 && (u = o, o = null);
        }
        new r(t, w, e.decreasesButNotBy, !0).to.decrease(n, o).but.not.by(u);
      };
    e.ifError = function (t) {
      if (t) {
        throw t;
      }
    },
      e.isExtensible = function (t, n) {
        new r(t, n, e.isExtensible, !0).to.be.extensible;
      },
      e.isNotExtensible = function (t, n) {
        new r(t, n, e.isNotExtensible, !0).to.not.be.extensible;
      },
      e.isSealed = function (t, n) {
        new r(t, n, e.isSealed, !0).to.be.sealed;
      },
      e.isNotSealed = function (t, n) {
        new r(t, n, e.isNotSealed, !0).to.not.be.sealed;
      },
      e.isFrozen = function (t, n) {
        new r(t, n, e.isFrozen, !0).to.be.frozen;
      },
      e.isNotFrozen = function (t, n) {
        new r(t, n, e.isNotFrozen, !0).to.not.be.frozen;
      },
      e.isEmpty = function (t, n) {
        new r(t, n, e.isEmpty, !0).to.be.empty;
      },
      e.isNotEmpty = function (t, n) {
        new r(t, n, e.isNotEmpty, !0).to.not.be.empty;
      };
    (function t(n, o) {
      return e[o] = e[n], t;
    })("isOk", "ok")("isNotOk", "notOk")("throws", "throw")("throws", "Throw")(
      "isExtensible",
      "extensible",
    )("isNotExtensible", "notExtensible")("isSealed", "sealed")(
      "isNotSealed",
      "notSealed",
    )("isFrozen", "frozen")("isNotFrozen", "notFrozen")("isEmpty", "empty")(
      "isNotEmpty",
      "notEmpty",
    );
  };
});
var F = M((A) => {
  var At = [];
  A.version = "4.3.8";
  A.AssertionError = k("assertion-error");
  var St = vt();
  A.use = function (b) {
    return ~At.indexOf(b) || (b(A, St), At.push(b)), A;
  };
  A.util = St;
  var Dn = z();
  A.config = Dn;
  var An = xt();
  A.use(An);
  var Sn = qt();
  A.use(Sn);
  var Tn = Pt();
  A.use(Tn);
  var In = Nt();
  A.use(In);
  var kn = Dt();
  A.use(kn);
});
var It = M((pr, Tt) => {
  Tt.exports = F();
});
var I = Ht(It(), 1),
  br = I.default.expect,
  gr = I.default.version,
  wr = I.default.Assertion,
  yr = I.default.AssertionError,
  vr = I.default.util,
  mr = I.default.config,
  xr = I.default.use,
  Or = I.default.should,
  qr = I.default.assert,
  Mr = I.default.core,
  Pr = I.default;
export {
  br as expect,
  gr as version,
  Mr as core,
  mr as config,
  Or as should,
  Pr as default,
  qr as assert,
  vr as util,
  wr as Assertion,
  xr as use,
  yr as AssertionError,
};
/*! Bundled license information:

chai/lib/chai/utils/flag.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/test.js:
  (*!
   * Chai - test utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/expectTypes.js:
  (*!
   * Chai - expectTypes utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getActual.js:
  (*!
   * Chai - getActual utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/objDisplay.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getMessage.js:
  (*!
   * Chai - message composition utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/transferFlags.js:
  (*!
   * Chai - transferFlags utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/isProxyEnabled.js:
  (*!
   * Chai - isProxyEnabled helper
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addProperty.js:
  (*!
   * Chai - addProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addLengthGuard.js:
  (*!
   * Chai - addLengthGuard utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getProperties.js:
  (*!
   * Chai - getProperties utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/proxify.js:
  (*!
   * Chai - proxify utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addMethod.js:
  (*!
   * Chai - addMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteProperty.js:
  (*!
   * Chai - overwriteProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteMethod.js:
  (*!
   * Chai - overwriteMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addChainableMethod.js:
  (*!
   * Chai - addChainingMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)
  (*!
   * Module variables
   *)

chai/lib/chai/utils/overwriteChainableMethod.js:
  (*!
   * Chai - overwriteChainableMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/compareByInspect.js:
  (*!
   * Chai - compareByInspect utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js:
  (*!
   * Chai - getOwnEnumerablePropertySymbols utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getOwnEnumerableProperties.js:
  (*!
   * Chai - getOwnEnumerableProperties utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/isNaN.js:
  (*!
   * Chai - isNaN utility
   * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/index.js:
  (*!
   * chai
   * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Dependencies that are used for multiple exports are required here only once
   *)
  (*!
   * test utility
   *)
  (*!
   * type utility
   *)
  (*!
   * expectTypes utility
   *)
  (*!
   * message utility
   *)
  (*!
   * actual utility
   *)
  (*!
   * Inspect util
   *)
  (*!
   * Object Display util
   *)
  (*!
   * Flag utility
   *)
  (*!
   * Flag transferring utility
   *)
  (*!
   * Deep equal utility
   *)
  (*!
   * Deep path info
   *)
  (*!
   * Check if a property exists
   *)
  (*!
   * Function name
   *)
  (*!
   * add Property
   *)
  (*!
   * add Method
   *)
  (*!
   * overwrite Property
   *)
  (*!
   * overwrite Method
   *)
  (*!
   * Add a chainable method
   *)
  (*!
   * Overwrite chainable method
   *)
  (*!
   * Compare by inspect method
   *)
  (*!
   * Get own enumerable property symbols method
   *)
  (*!
   * Get own enumerable properties method
   *)
  (*!
   * Checks error against a given set of criteria
   *)
  (*!
   * Proxify util
   *)
  (*!
   * addLengthGuard util
   *)
  (*!
   * isProxyEnabled helper
   *)
  (*!
   * isNaN method
   *)
  (*!
   * getOperator method
   *)

chai/lib/chai/assertion.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * - `eql`: This flag contains the deepEqual function to be used by the assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   *)
  (*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   *)

chai/lib/chai/core/assertions.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/expect.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/should.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/assert.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   *)
  (*!
   * Aliases.
   *)

chai/lib/chai.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai version
   *)
  (*!
   * Assertion Error
   *)
  (*!
   * Utils for plugins (not exported)
   *)
  (*!
   * Utility Functions
   *)
  (*!
   * Configuration
   *)
  (*!
   * Primary `Assertion` prototype
   *)
  (*!
   * Core Assertions
   *)
  (*!
   * Expect interface
   *)
  (*!
   * Should interface
   *)
  (*!
   * Assert interface
   *)
*/
//# sourceMappingURL=chai.mjs.map
