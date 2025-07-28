/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/computed-types@1.6.0/lib/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t = {}, r = {}, e = {}, n = {}, o = { __esModule: !0 };
o.toError = i,
  o.createValidationError = function (t, r, ...e) {
    if (!r) {
      if (t[0]) {
        const { path: e, error: n } = t[0], o = String(n && n.message || n);
        r = e ? `${e.join(".")}: ${o}` : o;
      } else {
        r = "Unknown Validation Error";
      }
    }
    const n = i(r, ...e);
    return n.errors = t, n;
  },
  o.ValidationError = void 0;
class a extends TypeError {
  constructor(t, r) {
    super(t),
      this.errors = void 0,
      this.errors = r,
      Object.setPrototypeOf(this, a.prototype);
  }
  toJSON() {
    var t;
    return {
      message: this.message,
      errors: null == (t = this.errors)
        ? void 0
        : t.map(({ path: t, error: r }) => {
          var e;
          return {
            path: t,
            error: (null == (e = a.prototype.toJSON) ? void 0 : e.apply(r)) ||
              r,
          };
        }),
    };
  }
}
function i(t, ...r) {
  return "string" == typeof t
    ? new a(t)
    : "function" == typeof t
    ? i(t(...r))
    : t;
}
o.ValidationError = a, a.prototype.name = "ValidationError";
var u = {
    __esModule: !0,
    typeCheck: function (t) {
      return t;
    },
    isPromiseLike: function (t) {
      return !!t && "function" == typeof t.then;
    },
    isPrimitive: function (t) {
      return "object" != typeof t && "function" != typeof t || null === t;
    },
    deepConcat: function t(...r) {
      if (r.length < 2) {
        return r[0];
      }
      if ((r = r.filter((t) => void 0 !== t)).length < 2) {
        return r[0];
      }
      let e = r[0];
      if ("object" != typeof e || null === e) {
        for (let t = 1; t < r.length; t += 1) {
          if (r[t] !== e) {
            throw new s.ValidationError("Type mismatch on validation concat");
          }
        }
        return e;
      }
      const n = {};
      for (let t = 0; t < r.length; t += 1) {
        const e = r[t];
        if ("object" != typeof e || null === e) {
          throw new s.ValidationError("Type mismatch on validation concat");
        }
        for (const t in e) {
          if (!Object.prototype.hasOwnProperty.call(e, t)) {
            continue;
          }
          const r = e[t];
          void 0 !== r && (n[t] || (n[t] = []), n[t].push(r));
        }
      }
      e = Array.isArray(e) ? [] : {};
      for (const r in n) {
        e[r] = t(...n[r]);
      }
      return e;
    },
  },
  s = o;
n.__esModule = !0,
  n.type = function (t, r) {
    return (...e) => {
      if (typeof e[0] !== t || null === e[0]) {
        throw (0, l.toError)(r || `Expect value to be "${t}"`, ...e);
      }
      return e[0];
    };
  },
  n.equals = function (t, r) {
    return (...e) => {
      if (e[0] !== t) {
        throw (0, l.toError)(r || `Expect value to equal "${t}"`, ...e);
      }
      return e[0];
    };
  },
  n.test = function (t, r) {
    return (...e) => {
      if (!t(...e)) {
        throw (0, l.toError)(r || "Validation test failed", ...e);
      }
      return e[0];
    };
  },
  n.destruct = function (t, r) {
    return (...e) => {
      try {
        const n = t(...e);
        return (0, c.isPromiseLike)(n)
          ? n.then((t) => [null, t], (t) => [r ? (0, l.toError)(r, ...e) : t])
          : [null, n];
      } catch (t) {
        return [r ? (0, l.toError)(r, ...e) : t];
      }
    };
  },
  n.error = function (t, r) {
    return (...e) => {
      try {
        const n = t(...e);
        return (0, c.isPromiseLike)(n)
          ? n.then(null, () => {
            throw (0, l.toError)(r, ...e);
          })
          : n;
      } catch (t) {
        throw (0, l.toError)(r, ...e);
      }
    };
  },
  n.regexp = function (t, r) {
    t instanceof RegExp || (t = new RegExp(t));
    return (...e) => {
      if (!t.test(e[0])) {
        throw (0, l.toError)(
          r || `Invalid string format (expected: ${t})`,
          ...e,
        );
      }
      return String(e[0]);
    };
  },
  n.array = function (t = null, r) {
    const e = (...t) => {
      if (!Array.isArray(t[0])) {
        throw (0, l.toError)(r || "Expecting value to be an array", ...t);
      }
      return t[0];
    };
    if (null === t) {
      return e;
    }
    return (...n) => {
      const o = e(...n);
      if (o.length !== t) {
        throw (0, l.toError)(
          r || `Expected array length ${t} (given: ${o.length})`,
          ...n,
        );
      }
      return o;
    };
  },
  n.enumValue = function (t, r) {
    const e = new Set(
      Object.keys(t).filter((t) => isNaN(Number(t))).map((r) => t[r]),
    );
    return (...t) => {
      if (!e.has(t[0])) {
        throw (0, l.toError)(r || "Unknown enum value", ...t);
      }
      return t[0];
    };
  };
var l = o, c = u;
var f = {},
  d = {
    __esModule: !0,
    default: function t(r, e) {
      const { error: n, basePath: o = [], strict: a } = e || {};
      if ("function" == typeof r) {
        return r;
      }
      if ("object" != typeof r || null === r) {
        return (0, p.equals)(r, n);
      }
      if (r instanceof RegExp) {
        return (0, p.regexp)(r, n);
      }
      let i;
      if (Array.isArray(r)) {
        const t = (0, p.array)(r.length, n);
        i = (...r) => [t(...r), []];
      } else {
        const t = (0, p.type)("object", n);
        i = (...r) => [t(...r), {}];
      }
      const u = Object.keys(r),
        s = u.map((e) => {
          const n = [...o, e], i = t(r[e], { basePath: n, strict: a });
          return (t, r, o) => {
            try {
              const a = i(o[e]);
              return (0, m.isPromiseLike)(a)
                ? a.then((r) => {
                  t[e] = r;
                }, (t) => {
                  r.push({ error: t, path: n });
                })
                : void (t[e] = a);
            } catch (t) {
              r.push({ error: t, path: n });
            }
          };
        });
      if (a) {
        const t = new Set(u);
        s.push((r, e, n) => {
          Object.keys(n).forEach((r) => {
            t.has(r) ||
              e.push({
                path: [...o, r],
                error: (0, h.toError)(`Unknown property "${r}"`),
              });
          });
        });
      }
      const l = s.length;
      return (...t) => {
        let r, e, o;
        try {
          [r, e] = i(...t);
        } catch (t) {
          r = {}, e = {}, o = t;
        }
        const a = [], u = [];
        for (let t = 0; t < l; t += 1) {
          const n = s[t](e, u, r);
          n && a.push(n);
        }
        if (!a.length) {
          if (u.length || o) {
            throw (0, h.createValidationError)(u, o || n, ...t);
          }
          return e;
        }
        return Promise.all(a).then(() => {
          if (u.length || o) {
            throw (0, h.createValidationError)(u, o || n, ...t);
          }
          return e;
        });
      };
    },
  },
  h = o,
  p = n,
  m = u;
var g = {
    __esModule: !0,
    findSwitchKey: function (...t) {
      const r = t[0];
      if (t.length < 2 || "object" != typeof r || null === r) {
        return null;
      }
      let e = new Map();
      const n = Object.keys(r).find((n) => {
        const o = r[n];
        if (!(0, w.isPrimitive)(o)) {
          return !1;
        }
        e = new Map([[o, 0]]);
        for (let r = 1; r < t.length; r += 1) {
          const o = t[r];
          if ("object" != typeof o || null === o) {
            return !1;
          }
          const a = o[n];
          if (!(0, w.isPrimitive)(a) || e.has(a)) {
            return !1;
          }
          e.set(a, r);
        }
        return !0;
      });
      if (void 0 === n) {
        return null;
      }
      return [n, e];
    },
    generateSwitch: function (t, r) {
      const [e, n] = t;
      return (...t) => {
        const o = t[0];
        let a;
        if ("object" == typeof o && null !== o) {
          const t = o[e];
          a = n.get(t) || 0;
        } else {
          a = 0;
        }
        return r[a](...t);
      };
    },
  },
  w = u;
f.__esModule = !0,
  f.either = function (...t) {
    if (!t.length) {
      throw new RangeError("Expecting at least one argument");
    }
    const r = t.map((t) => (0, v.default)(t)), e = (0, E.findSwitchKey)(...t);
    if (e) {
      return (0, E.generateSwitch)(e, r);
    }
    return (...e) => {
      let n = 0;
      const o = () => {
        const a = r[n++];
        let i;
        try {
          i = a(...e);
        } catch (r) {
          if (n >= t.length) {
            throw r;
          }
          return o();
        }
        return (0, b.isPromiseLike)(i)
          ? i.then(null, (r) => {
            if (n >= t.length) {
              throw r;
            }
            return o();
          })
          : i;
      };
      return o();
    };
  },
  f.merge = function (...t) {
    if (!t.length) {
      throw new RangeError("Expecting at least one argument");
    }
    const r = t.map((t) => (0, v.default)(t)), e = r.length;
    if (1 === e) {
      return r[0];
    }
    return (...t) => {
      let n;
      const o = [];
      for (let a = 0; a < e; a += 1) {
        const e = r[a](...t);
        (0, b.isPromiseLike)(e) && (n = !0), o.push(e);
      }
      return n
        ? Promise.all(o).then((t) => (0, b.deepConcat)(...t))
        : (0, b.deepConcat)(...o);
    };
  },
  f.optional = function (t, r) {
    return (...e) => null == e[0] || "" === e[0] ? r : t(...e);
  },
  f.strictOptional = function (t, r) {
    return (...e) => void 0 === e[0] ? r : t(...e);
  };
var y, v = (y = d) && y.__esModule ? y : { default: y }, b = u, E = g;
e.__esModule = !0, e.default = void 0;
var x = n, _ = u, $ = f;
e.default = class {
  constructor(t) {
    this.validator = void 0, this.validator = t;
  }
  proxy() {
    return new Proxy(this.validator, {
      get: (t, r) => r in this ? this[r] : this.validator[r],
    });
  }
  equals(t, r) {
    return this.transform((0, x.equals)(t, r));
  }
  test(t, r) {
    return this.transform((0, x.test)(t, r));
  }
  transform(t, r = this.constructor) {
    const { validator: e } = this;
    return new r((...r) => {
      const n = e(...r);
      return (0, _.isPromiseLike)(n) ? n.then((r) => t(r)) : t(n);
    }).proxy();
  }
  construct(t) {
    const r = this.constructor, { validator: e } = this;
    return new r((...r) => e(...t(...r))).proxy();
  }
  optional(t) {
    const r = this.constructor, { validator: e } = this;
    return new r((0, $.optional)(e, t)).proxy();
  }
  strictOptional(t) {
    const r = this.constructor, { validator: e } = this;
    return new r((0, $.strictOptional)(e, t)).proxy();
  }
  destruct(t) {
    const r = this.constructor, { validator: e } = this;
    return new r((0, x.destruct)(e, t)).proxy();
  }
  error(t) {
    const r = this.constructor, { validator: e } = this;
    return new r((0, x.error)(e, t)).proxy();
  }
};
var V = { __esModule: !0 };
V.default = V.ObjectValidator = void 0;
var S = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(e),
  M = n;
class j extends S.default {
}
V.ObjectValidator = j;
var k = new j((0, M.type)("object")).proxy();
V.default = k;
var P = { __esModule: !0 };
P.default = P.StringValidator = void 0;
var L = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(e),
  N = n;
class O extends L.default {
  toLowerCase() {
    return this.transform((t) => t.toLowerCase());
  }
  toUpperCase() {
    return this.transform((t) => t.toUpperCase());
  }
  toLocaleLowerCase(...t) {
    return this.transform((r) => r.toLocaleLowerCase(...t));
  }
  toLocaleUpperCase(...t) {
    return this.transform((r) => r.toLocaleUpperCase(...t));
  }
  normalize(...t) {
    return this.transform((r) => r.normalize(...t));
  }
  trim() {
    return this.transform((t) => t.trim());
  }
  min(t, r) {
    return this.test(
      (r) => r.length >= t,
      r || ((r) =>
        new RangeError(
          `Expect length to be minimum of ${t} characters (actual: ${r.length})`,
        )),
    );
  }
  max(t, r) {
    return this.test(
      (r) => r.length <= t,
      r || ((r) =>
        new RangeError(
          `Expect length to be maximum of ${t} characters (actual: ${r.length})`,
        )),
    );
  }
  between(t, r, e) {
    return this.test(
      (e) => e.length >= t && e.length <= r,
      e || ((e) =>
        new RangeError(
          `Expect length to be between ${t} and ${r} characters (actual: ${e.length})`,
        )),
    );
  }
  regexp(t, r) {
    return this.transform((0, N.regexp)(t, r));
  }
}
P.StringValidator = O;
var R = new O((0, N.type)("string")).proxy();
P.default = R;
var C = { __esModule: !0 };
C.default = C.NumberValidator = void 0;
var U = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(e),
  q = P,
  A = n;
class D extends U.default {
  constructor(...t) {
    super(...t), this.gte = this.min, this.lte = this.max;
  }
  float(t) {
    return this.test(
      (t) => !isNaN(t) && Number.isFinite(t),
      t || "Expect value to be a number",
    );
  }
  integer(t) {
    return this.test(
      (t) => Number.isInteger(t),
      t || "Expect value to be an integer",
    );
  }
  toExponential(...t) {
    return this.transform((r) => r.toExponential(...t), q.StringValidator);
  }
  toFixed(...t) {
    return this.transform((r) => r.toFixed(...t), q.StringValidator);
  }
  toLocaleString(...t) {
    return this.transform((r) => r.toLocaleString(...t), q.StringValidator);
  }
  toPrecision(...t) {
    return this.transform((r) => r.toPrecision(...t), q.StringValidator);
  }
  toString(...t) {
    return this.transform((r) => r.toString(...t), q.StringValidator);
  }
  min(t, r) {
    return this.test(
      (r) => r >= t,
      r || ((r) =>
        new RangeError(
          `Expect value to be greater or equal than ${t} (actual: ${r})`,
        )),
    );
  }
  max(t, r) {
    return this.test(
      (r) => r <= t,
      r || ((r) =>
        new RangeError(
          `Expect value to be lower or equal than ${t} (actual: ${r})`,
        )),
    );
  }
  gt(t, r) {
    return this.test(
      (r) => r > t,
      r ||
        ((r) =>
          new RangeError(
            `Expect value to be greater than ${t} (actual: ${r})`,
          )),
    );
  }
  lt(t, r) {
    return this.test(
      (r) => r < t,
      r ||
        ((r) =>
          new RangeError(`Expect value to be lower than ${t} (actual: ${r})`)),
    );
  }
  between(t, r, e) {
    return this.test(
      (e) => e >= t && e <= r,
      e || ((e) =>
        new RangeError(
          `Expect value to be between ${t} and ${r} (actual: ${e})`,
        )),
    );
  }
}
C.NumberValidator = D;
var T = new D((0, A.type)("number")).proxy();
C.default = T;
var I = { __esModule: !0 };
I.default = I.BooleanValidator = void 0;
var B = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(e),
  F = n;
class z extends B.default {
}
I.BooleanValidator = z;
var J = new z((0, F.type)("boolean")).proxy();
I.default = J;
var K = { __esModule: !0 };
K.default = K.ArrayValidator = void 0;
var G = X(e), H = n, Q = X(d), W = u;
function X(t) {
  return t && t.__esModule ? t : { default: t };
}
class Y extends G.default {
  of(t, r) {
    const e = (0, Q.default)(t, { error: r });
    return this.transform((t) => {
      let r;
      const n = t.map((t) => {
        const n = e(t);
        return (0, W.isPromiseLike)(n) && (r = !0), n;
      });
      return r ? Promise.all(n) : n;
    });
  }
  min(t, r) {
    return this.test(
      (r) => r.length >= t,
      r ||
        ((r) =>
          `Expect array to be minimum of ${t} items (actual: ${r.length})`),
    );
  }
  max(t, r) {
    return this.test(
      (r) => r.length <= t,
      r ||
        ((r) =>
          `Expect array to be maximum of ${t} items (actual: ${r.length})`),
    );
  }
  between(t, r, e) {
    return this.test(
      (e) => e.length >= t && e.length <= r,
      e ||
        ((e) =>
          `Expect array to be between ${t} and ${r} items (actual: ${e.length})`),
    );
  }
}
K.ArrayValidator = Y;
var Z = new Y((0, H.array)()).proxy();
K.default = Z;
var tt = { __esModule: !0 };
tt.default = tt.DateValidator = void 0;
var rt = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(e),
  et = P,
  nt = o,
  ot = C;
class at extends rt.default {
  constructor(...t) {
    super(...t), this.gte = this.min, this.lte = this.max;
  }
  toISOString(...t) {
    return this.transform((r) => r.toISOString(...t), et.StringValidator);
  }
  getTime(...t) {
    return this.transform((r) => r.getTime(...t), ot.NumberValidator);
  }
  min(t, r) {
    return this.test(
      (r) => r >= t,
      r || ((r) =>
        new RangeError(
          `Expect date to be greater or equal than ${t} (actual: ${r})`,
        )),
    );
  }
  max(t, r) {
    return this.test(
      (r) => r <= t,
      r || ((r) =>
        new RangeError(
          `Expect date to be lower or equal than ${t} (actual: ${r})`,
        )),
    );
  }
  gt(t, r) {
    return this.test(
      (r) => r > t,
      r ||
        ((r) =>
          new RangeError(`Expect date to be greater than ${t} (actual: ${r})`)),
    );
  }
  lt(t, r) {
    return this.test(
      (r) => r < t,
      r ||
        ((r) =>
          new RangeError(`Expect date to be lower than ${t} (actual: ${r})`)),
    );
  }
  between(t, r, e) {
    return this.test(
      (e) => e >= t && e <= r,
      e || ((e) =>
        new RangeError(
          `Expect date to be between ${t} and ${r} (actual: ${e})`,
        )),
    );
  }
}
tt.DateValidator = at;
var it = new at((t) => {
  if (!(t instanceof Date)) {
    throw (0, nt.toError)("Expect value to be instance of Date");
  }
  return t;
}).proxy();
tt.default = it, r.__esModule = !0, r.default = r.UnknownValidator = void 0;
var ut = wt(e),
  st = o,
  lt = V,
  ct = P,
  ft = C,
  dt = I,
  ht = wt(d),
  pt = K,
  mt = n,
  gt = tt;
function wt(t) {
  return t && t.__esModule ? t : { default: t };
}
const yt = {
  true: !0,
  false: !1,
  t: !0,
  f: !1,
  yes: !0,
  no: !1,
  y: !0,
  n: !1,
  1: !0,
  0: !1,
};
class vt extends ut.default {
  schema(t, r) {
    return this.transform((0, ht.default)(t, { error: r }), ut.default);
  }
  object(t) {
    return this.transform((0, mt.type)("object", t), lt.ObjectValidator);
  }
  array(t) {
    return this.transform((0, mt.array)(null, t), pt.ArrayValidator);
  }
  string(t) {
    return this.transform((r) => {
      if ("string" == typeof r) {
        return r;
      }
      if (
        null == r ||
        "object" == typeof r && r.toString === Object.prototype.toString
      ) {
        throw (0, st.toError)(t || "Expect value to be string", r);
      }
      return String(r);
    }, ct.StringValidator);
  }
  number(t) {
    return this.transform((r) => {
      if ("number" == typeof r) {
        return r;
      }
      const e = Number(r);
      if (isNaN(e) && "NaN" !== r) {
        throw (0, st.toError)(t || "Unknown number value", r);
      }
      return e;
    }, ft.NumberValidator);
  }
  boolean(t) {
    return this.transform((r) => {
      if ("boolean" == typeof r) {
        return r;
      }
      const e = String(r).trim().toLowerCase(), n = yt[e];
      if (null == n) {
        throw (0, st.toError)(t || "Unknown boolean value", r);
      }
      return n;
    }, dt.BooleanValidator);
  }
  date(t) {
    return this.transform((r) => {
      if (r instanceof Date) {
        return r;
      }
      if ("number" == typeof r || "string" == typeof r) {
        const t = new Date(r);
        if (!isNaN(t.getTime())) {
          return t;
        }
      }
      throw (0, st.toError)(t || "Unknown date value", r);
    }, gt.DateValidator);
  }
  enum(t, r) {
    return this.transform((0, mt.enumValue)(t, r), ut.default);
  }
}
r.UnknownValidator = vt;
var bt = new vt((t) => t).proxy();
r.default = bt;
var Et = { __esModule: !0, default: void 0 },
  xt = St(e),
  _t = St(d),
  $t = f,
  Vt = n;
function St(t) {
  return t && t.__esModule ? t : { default: t };
}
function Mt(t, r) {
  let e, n;
  return r &&
    ("object" != typeof r || r instanceof Error
      ? e = r
      : (e = r.error, n = r.strict)),
    new xt.default((0, _t.default)(t, { error: e, strict: n })).proxy();
}
Mt.either = function (...t) {
  return new xt.default((0, $t.either)(...t)).proxy();
},
  Mt.merge = function (...t) {
    return new xt.default((0, $t.merge)(...t)).proxy();
  },
  Mt.enum = function (t, r) {
    return new xt.default((0, Vt.enumValue)(t, r)).proxy();
  };
var jt = Mt;
Et.default = jt, t.__esModule = !0, t.default = void 0;
var kt = Kt(r),
  Pt = t.unknown = kt.default,
  Lt = Kt(V),
  Nt = t.object = Lt.default,
  Ot = Kt(K),
  Rt = t.array = Ot.default,
  Ct = Kt(P),
  Ut = t.string = Ct.default,
  qt = Kt(C),
  At = t.number = qt.default,
  Dt = Kt(I),
  Tt = t.boolean = Dt.default,
  It = Kt(Et),
  Bt = Kt(tt),
  Ft = t.DateType = Bt.default,
  zt = u,
  Jt = t.isPromiseLike = zt.isPromiseLike;
function Kt(t) {
  return t && t.__esModule ? t : { default: t };
}
var Gt = It.default;
t.default = Gt;
var Ht = t.__esModule;
export {
  At as number,
  Ft as DateType,
  Ht as __esModule,
  Jt as isPromiseLike,
  Nt as object,
  Pt as unknown,
  Rt as array,
  t as default,
  Tt as boolean,
  Ut as string,
};
//# sourceMappingURL=/sm/3975d239a40998308ead08472b5e0743861d50b692d0011afe7aa1309edb3ee2.map
