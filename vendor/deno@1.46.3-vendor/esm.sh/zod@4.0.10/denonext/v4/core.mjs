/* esm.sh - zod@4.0.10/v4/core */
var tr = Object.defineProperty;
var it = (t, e) => {
  for (var r in e) {
    tr(t, r, { get: e[r], enumerable: !0 });
  }
};
var Yr = Object.freeze({ status: "aborted" });
function l(t, e, r) {
  function o(u, p) {
    var m;
    Object.defineProperty(u, "_zod", { value: u._zod ?? {}, enumerable: !1 }),
      (m = u._zod).traits ?? (m.traits = new Set()),
      u._zod.traits.add(t),
      e(u, p);
    for (let h in s.prototype) {
      h in u || Object.defineProperty(u, h, { value: s.prototype[h].bind(u) });
    }
    u._zod.constr = s, u._zod.def = p;
  }
  let n = r?.Parent ?? Object;
  class i extends n {
  }
  Object.defineProperty(i, "name", { value: t });
  function s(u) {
    var p;
    let m = r?.Parent ? new i() : this;
    o(m, u), (p = m._zod).deferred ?? (p.deferred = []);
    for (let h of m._zod.deferred) {
      h();
    }
    return m;
  }
  return Object.defineProperty(s, "init", { value: o }),
    Object.defineProperty(s, Symbol.hasInstance, {
      value: (u) =>
        r?.Parent && u instanceof r.Parent ? !0 : u?._zod?.traits?.has(t),
    }),
    Object.defineProperty(s, "name", { value: t }),
    s;
}
var Xr = Symbol("zod_brand"),
  O = class extends Error {
    constructor() {
      super(
        "Encountered Promise during synchronous parse. Use .parseAsync() instead.",
      );
    }
  },
  Q = {};
function I(t) {
  return t && Object.assign(Q, t), Q;
}
var L = {};
it(L, {
  BIGINT_FORMAT_RANGES: () => ze,
  Class: () => fe,
  NUMBER_FORMAT_RANGES: () => xe,
  aborted: () => R,
  allowsEval: () => de,
  assert: () => sr,
  assertEqual: () => rr,
  assertIs: () => or,
  assertNever: () => ir,
  assertNotEqual: () => nr,
  assignProp: () => C,
  cached: () => B,
  captureStackTrace: () => te,
  cleanEnum: () => br,
  cleanRegex: () => J,
  clone: () => j,
  cloneDef: () => cr,
  createTransparentProxy: () => hr,
  defineLazy: () => $,
  esc: () => ee,
  escapeRegex: () => T,
  extend: () => gr,
  finalizeIssue: () => E,
  floatSafeRemainder: () => he,
  getElementAtPath: () => ar,
  getEnumValues: () => V,
  getLengthableOrigin: () => K,
  getParsedType: () => mr,
  getSizableOrigin: () => G,
  isObject: () => F,
  isPlainObject: () => D,
  issue: () => ve,
  joinValues: () => ur,
  jsonStringifyReplacer: () => me,
  merge: () => xr,
  mergeDefs: () => N,
  normalizeParams: () => f,
  nullish: () => A,
  numKeys: () => fr,
  omit: () => _r,
  optionalKeys: () => ge,
  partial: () => zr,
  pick: () => dr,
  prefixIssues: () => S,
  primitiveTypes: () => _e,
  promiseAllObject: () => lr,
  propertyKeyTypes: () => W,
  randomString: () => pr,
  required: () => vr,
  stringifyPrimitive: () => st,
  unwrapMessage: () => U,
});
function rr(t) {
  return t;
}
function nr(t) {
  return t;
}
function or(t) {}
function ir(t) {
  throw new Error();
}
function sr(t) {}
function V(t) {
  let e = Object.values(t).filter((o) => typeof o == "number");
  return Object.entries(t).filter(([o, n]) => e.indexOf(+o) === -1).map((
    [o, n],
  ) => n);
}
function ur(t, e = "|") {
  return t.map((r) => st(r)).join(e);
}
function me(t, e) {
  return typeof e == "bigint" ? e.toString() : e;
}
function B(t) {
  return {
    get value() {
      {
        let r = t();
        return Object.defineProperty(this, "value", { value: r }), r;
      }
      throw new Error("cached value already set");
    },
  };
}
function A(t) {
  return t == null;
}
function J(t) {
  let e = t.startsWith("^") ? 1 : 0,
    r = t.endsWith("$") ? t.length - 1 : t.length;
  return t.slice(e, r);
}
function he(t, e) {
  let r = (t.toString().split(".")[1] || "").length,
    o = (e.toString().split(".")[1] || "").length,
    n = r > o ? r : o,
    i = Number.parseInt(t.toFixed(n).replace(".", "")),
    s = Number.parseInt(e.toFixed(n).replace(".", ""));
  return i % s / 10 ** n;
}
function $(t, e, r) {
  Object.defineProperty(t, e, {
    get() {
      {
        let n = r();
        return t[e] = n, n;
      }
      throw new Error("cached value already set");
    },
    set(n) {
      Object.defineProperty(t, e, { value: n });
    },
    configurable: !0,
  });
}
function C(t, e, r) {
  Object.defineProperty(t, e, {
    value: r,
    writable: !0,
    enumerable: !0,
    configurable: !0,
  });
}
function N(...t) {
  let e = {};
  for (let r of t) {
    let o = Object.getOwnPropertyDescriptors(r);
    Object.assign(e, o);
  }
  return Object.defineProperties({}, e);
}
function cr(t) {
  return N(t._zod.def);
}
function ar(t, e) {
  return e ? e.reduce((r, o) => r?.[o], t) : t;
}
function lr(t) {
  let e = Object.keys(t), r = e.map((o) => t[o]);
  return Promise.all(r).then((o) => {
    let n = {};
    for (let i = 0; i < e.length; i++) {
      n[e[i]] = o[i];
    }
    return n;
  });
}
function pr(t = 10) {
  let e = "abcdefghijklmnopqrstuvwxyz", r = "";
  for (let o = 0; o < t; o++) {
    r += e[Math.floor(Math.random() * e.length)];
  }
  return r;
}
function ee(t) {
  return JSON.stringify(t);
}
var te = "captureStackTrace" in Error ? Error.captureStackTrace : (...t) => {};
function F(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
var de = B(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) {
    return !1;
  }
  try {
    let t = Function;
    return new t(""), !0;
  } catch {
    return !1;
  }
});
function D(t) {
  if (F(t) === !1) {
    return !1;
  }
  let e = t.constructor;
  if (e === void 0) {
    return !0;
  }
  let r = e.prototype;
  return !(F(r) === !1 ||
    Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function fr(t) {
  let e = 0;
  for (let r in t) {
    Object.prototype.hasOwnProperty.call(t, r) && e++;
  }
  return e;
}
var mr = (t) => {
    let e = typeof t;
    switch (e) {
      case "undefined":
        return "undefined";
      case "string":
        return "string";
      case "number":
        return Number.isNaN(t) ? "nan" : "number";
      case "boolean":
        return "boolean";
      case "function":
        return "function";
      case "bigint":
        return "bigint";
      case "symbol":
        return "symbol";
      case "object":
        return Array.isArray(t)
          ? "array"
          : t === null
          ? "null"
          : t.then && typeof t.then == "function" && t.catch &&
              typeof t.catch == "function"
          ? "promise"
          : typeof Map < "u" && t instanceof Map
          ? "map"
          : typeof Set < "u" && t instanceof Set
          ? "set"
          : typeof Date < "u" && t instanceof Date
          ? "date"
          : typeof File < "u" && t instanceof File
          ? "file"
          : "object";
      default:
        throw new Error(`Unknown data type: ${e}`);
    }
  },
  W = new Set(["string", "number", "symbol"]),
  _e = new Set([
    "string",
    "number",
    "bigint",
    "boolean",
    "symbol",
    "undefined",
  ]);
function T(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function j(t, e, r) {
  let o = new t._zod.constr(e ?? t._zod.def);
  return (!e || r?.parent) && (o._zod.parent = t), o;
}
function f(t) {
  let e = t;
  if (!e) {
    return {};
  }
  if (typeof e == "string") {
    return { error: () => e };
  }
  if (e?.message !== void 0) {
    if (e?.error !== void 0) {
      throw new Error("Cannot specify both `message` and `error` params");
    }
    e.error = e.message;
  }
  return delete e.message,
    typeof e.error == "string" ? { ...e, error: () => e.error } : e;
}
function hr(t) {
  let e;
  return new Proxy({}, {
    get(r, o, n) {
      return e ?? (e = t()), Reflect.get(e, o, n);
    },
    set(r, o, n, i) {
      return e ?? (e = t()), Reflect.set(e, o, n, i);
    },
    has(r, o) {
      return e ?? (e = t()), Reflect.has(e, o);
    },
    deleteProperty(r, o) {
      return e ?? (e = t()), Reflect.deleteProperty(e, o);
    },
    ownKeys(r) {
      return e ?? (e = t()), Reflect.ownKeys(e);
    },
    getOwnPropertyDescriptor(r, o) {
      return e ?? (e = t()), Reflect.getOwnPropertyDescriptor(e, o);
    },
    defineProperty(r, o, n) {
      return e ?? (e = t()), Reflect.defineProperty(e, o, n);
    },
  });
}
function st(t) {
  return typeof t == "bigint"
    ? t.toString() + "n"
    : typeof t == "string"
    ? `"${t}"`
    : `${t}`;
}
function ge(t) {
  return Object.keys(t).filter((e) =>
    t[e]._zod.optin === "optional" && t[e]._zod.optout === "optional"
  );
}
var xe = {
    safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    int32: [-2147483648, 2147483647],
    uint32: [0, 4294967295],
    float32: [-34028234663852886e22, 34028234663852886e22],
    float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
  },
  ze = {
    int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
    uint64: [BigInt(0), BigInt("18446744073709551615")],
  };
function dr(t, e) {
  let r = t._zod.def,
    o = N(t._zod.def, {
      get shape() {
        let n = {};
        for (let i in e) {
          if (!(i in r.shape)) {
            throw new Error(`Unrecognized key: "${i}"`);
          }
          e[i] && (n[i] = r.shape[i]);
        }
        return C(this, "shape", n), n;
      },
      checks: [],
    });
  return j(t, o);
}
function _r(t, e) {
  let r = t._zod.def,
    o = N(t._zod.def, {
      get shape() {
        let n = { ...t._zod.def.shape };
        for (let i in e) {
          if (!(i in r.shape)) {
            throw new Error(`Unrecognized key: "${i}"`);
          }
          e[i] && delete n[i];
        }
        return C(this, "shape", n), n;
      },
      checks: [],
    });
  return j(t, o);
}
function gr(t, e) {
  if (!D(e)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  let r = N(t._zod.def, {
    get shape() {
      let o = { ...t._zod.def.shape, ...e };
      return C(this, "shape", o), o;
    },
    checks: [],
  });
  return j(t, r);
}
function xr(t, e) {
  let r = N(t._zod.def, {
    get shape() {
      let o = { ...t._zod.def.shape, ...e._zod.def.shape };
      return C(this, "shape", o), o;
    },
    get catchall() {
      return e._zod.def.catchall;
    },
    checks: [],
  });
  return j(t, r);
}
function zr(t, e, r) {
  let o = N(e._zod.def, {
    get shape() {
      let n = e._zod.def.shape, i = { ...n };
      if (r) {
        for (let s in r) {
          if (!(s in n)) {
            throw new Error(`Unrecognized key: "${s}"`);
          }
          r[s] &&
            (i[s] = t ? new t({ type: "optional", innerType: n[s] }) : n[s]);
        }
      } else {
        for (let s in n) {
          i[s] = t ? new t({ type: "optional", innerType: n[s] }) : n[s];
        }
      }
      return C(this, "shape", i), i;
    },
    checks: [],
  });
  return j(e, o);
}
function vr(t, e, r) {
  let o = N(e._zod.def, {
    get shape() {
      let n = e._zod.def.shape, i = { ...n };
      if (r) {
        for (let s in r) {
          if (!(s in i)) {
            throw new Error(`Unrecognized key: "${s}"`);
          }
          r[s] && (i[s] = new t({ type: "nonoptional", innerType: n[s] }));
        }
      } else {
        for (let s in n) {
          i[s] = new t({ type: "nonoptional", innerType: n[s] });
        }
      }
      return C(this, "shape", i), i;
    },
    checks: [],
  });
  return j(e, o);
}
function R(t, e = 0) {
  for (let r = e; r < t.issues.length; r++) {
    if (t.issues[r]?.continue !== !0) {
      return !0;
    }
  }
  return !1;
}
function S(t, e) {
  return e.map((r) => {
    var o;
    return (o = r).path ?? (o.path = []), r.path.unshift(t), r;
  });
}
function U(t) {
  return typeof t == "string" ? t : t?.message;
}
function E(t, e, r) {
  let o = { ...t, path: t.path ?? [] };
  if (!t.message) {
    let n = U(t.inst?._zod.def?.error?.(t)) ?? U(e?.error?.(t)) ??
      U(r.customError?.(t)) ?? U(r.localeError?.(t)) ?? "Invalid input";
    o.message = n;
  }
  return delete o.inst, delete o.continue, e?.reportInput || delete o.input, o;
}
function G(t) {
  return t instanceof Set
    ? "set"
    : t instanceof Map
    ? "map"
    : t instanceof File
    ? "file"
    : "unknown";
}
function K(t) {
  return Array.isArray(t)
    ? "array"
    : typeof t == "string"
    ? "string"
    : "unknown";
}
function ve(...t) {
  let [e, r, o] = t;
  return typeof e == "string"
    ? { message: e, code: "custom", input: r, inst: o }
    : { ...e };
}
function br(t) {
  return Object.entries(t).filter(([e, r]) =>
    Number.isNaN(Number.parseInt(e, 10))
  ).map((e) => e[1]);
}
var fe = class {
  constructor(...e) {}
};
var ut = (t, e) => {
    t.name = "$ZodError",
      Object.defineProperty(t, "_zod", { value: t._zod, enumerable: !1 }),
      Object.defineProperty(t, "issues", { value: e, enumerable: !1 }),
      t.message = JSON.stringify(e, me, 2),
      Object.defineProperty(t, "toString", {
        value: () => t.message,
        enumerable: !1,
      });
  },
  ct = l("$ZodError", ut),
  q = l("$ZodError", ut, { Parent: Error });
function Qr(t, e = (r) => r.message) {
  let r = {}, o = [];
  for (let n of t.issues) {
    n.path.length > 0
      ? (r[n.path[0]] = r[n.path[0]] || [], r[n.path[0]].push(e(n)))
      : o.push(e(n));
  }
  return { formErrors: o, fieldErrors: r };
}
function en(t, e) {
  let r = e || function (i) {
      return i.message;
    },
    o = { _errors: [] },
    n = (i) => {
      for (let s of i.issues) {
        if (s.code === "invalid_union" && s.errors.length) {
          s.errors.map((u) => n({ issues: u }));
        } else if (s.code === "invalid_key") {
          n({ issues: s.issues });
        } else if (s.code === "invalid_element") {
          n({ issues: s.issues });
        } else if (s.path.length === 0) {
          o._errors.push(r(s));
        } else {
          let u = o, p = 0;
          for (; p < s.path.length;) {
            let m = s.path[p];
            p === s.path.length - 1
              ? (u[m] = u[m] || { _errors: [] }, u[m]._errors.push(r(s)))
              : u[m] = u[m] || { _errors: [] },
              u = u[m],
              p++;
          }
        }
      }
    };
  return n(t), o;
}
function tn(t, e) {
  let r = e || function (i) {
      return i.message;
    },
    o = { errors: [] },
    n = (i, s = []) => {
      var u, p;
      for (let m of i.issues) {
        if (m.code === "invalid_union" && m.errors.length) {
          m.errors.map((h) => n({ issues: h }, m.path));
        } else if (m.code === "invalid_key") {
          n({ issues: m.issues }, m.path);
        } else if (m.code === "invalid_element") {
          n({ issues: m.issues }, m.path);
        } else {
          let h = [...s, ...m.path];
          if (h.length === 0) {
            o.errors.push(r(m));
            continue;
          }
          let a = o, x = 0;
          for (; x < h.length;) {
            let d = h[x], c = x === h.length - 1;
            typeof d == "string"
              ? (a.properties ?? (a.properties = {}),
                (u = a.properties)[d] ?? (u[d] = { errors: [] }),
                a = a.properties[d])
              : (a.items ?? (a.items = []),
                (p = a.items)[d] ?? (p[d] = { errors: [] }),
                a = a.items[d]),
              c && a.errors.push(r(m)),
              x++;
          }
        }
      }
    };
  return n(t), o;
}
function $r(t) {
  let e = [], r = t.map((o) => typeof o == "object" ? o.key : o);
  for (let o of r) {
    typeof o == "number"
      ? e.push(`[${o}]`)
      : typeof o == "symbol"
      ? e.push(`[${JSON.stringify(String(o))}]`)
      : /[^\w$]/.test(o)
      ? e.push(`[${JSON.stringify(o)}]`)
      : (e.length && e.push("."), e.push(o));
  }
  return e.join("");
}
function rn(t) {
  let e = [],
    r = [...t.issues].sort((o, n) =>
      (o.path ?? []).length - (n.path ?? []).length
    );
  for (let o of r) {
    e.push(`\u2716 ${o.message}`),
      o.path?.length && e.push(`  \u2192 at ${$r(o.path)}`);
  }
  return e.join(`
`);
}
var wr = (t) => (e, r, o, n) => {
    let i = o ? Object.assign(o, { async: !1 }) : { async: !1 },
      s = e._zod.run({ value: r, issues: [] }, i);
    if (s instanceof Promise) {
      throw new O();
    }
    if (s.issues.length) {
      let u = new (n?.Err ?? t)(s.issues.map((p) => E(p, i, I())));
      throw te(u, n?.callee), u;
    }
    return s.value;
  },
  be = wr(q),
  kr = (t) => async (e, r, o, n) => {
    let i = o ? Object.assign(o, { async: !0 }) : { async: !0 },
      s = e._zod.run({ value: r, issues: [] }, i);
    if (s instanceof Promise && (s = await s), s.issues.length) {
      let u = new (n?.Err ?? t)(s.issues.map((p) => E(p, i, I())));
      throw te(u, n?.callee), u;
    }
    return s.value;
  },
  $e = kr(q),
  Zr = (t) => (e, r, o) => {
    let n = o ? { ...o, async: !1 } : { async: !1 },
      i = e._zod.run({ value: r, issues: [] }, n);
    if (i instanceof Promise) {
      throw new O();
    }
    return i.issues.length
      ? { success: !1, error: new (t ?? ct)(i.issues.map((s) => E(s, n, I()))) }
      : { success: !0, data: i.value };
  },
  at = Zr(q),
  Pr = (t) => async (e, r, o) => {
    let n = o ? Object.assign(o, { async: !0 }) : { async: !0 },
      i = e._zod.run({ value: r, issues: [] }, n);
    return i instanceof Promise && (i = await i),
      i.issues.length
        ? { success: !1, error: new t(i.issues.map((s) => E(s, n, I()))) }
        : { success: !0, data: i.value };
  },
  lt = Pr(q);
var ne = {};
it(ne, {
  base64: () => Re,
  base64url: () => re,
  bigint: () => Be,
  boolean: () => Ge,
  browserEmail: () => jr,
  cidrv4: () => je,
  cidrv6: () => Ce,
  cuid: () => ye,
  cuid2: () => we,
  date: () => Fe,
  datetime: () => Ue,
  domain: () => Rr,
  duration: () => Ee,
  e164: () => Me,
  email: () => Te,
  emoji: () => Oe,
  extendedDuration: () => Sr,
  guid: () => Ie,
  hostname: () => Le,
  html5Email: () => Or,
  integer: () => Je,
  ipv4: () => Ae,
  ipv6: () => Ne,
  ksuid: () => Pe,
  lowercase: () => Ye,
  nanoid: () => Se,
  null: () => Ke,
  number: () => We,
  rfc5322Email: () => Ar,
  string: () => Ve,
  time: () => De,
  ulid: () => ke,
  undefined: () => qe,
  unicodeEmail: () => Nr,
  uppercase: () => Xe,
  uuid: () => M,
  uuid4: () => Er,
  uuid6: () => Ir,
  uuid7: () => Tr,
  xid: () => Ze,
});
var ye = /^[cC][^\s-]{8,}$/,
  we = /^[0-9a-z]+$/,
  ke = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  Ze = /^[0-9a-vA-V]{20}$/,
  Pe = /^[A-Za-z0-9]{27}$/,
  Se = /^[a-zA-Z0-9_-]{21}$/,
  Ee =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  Sr =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  Ie =
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  M = (t) =>
    t
      ? new RegExp(
        `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${t}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
      )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/,
  Er = M(4),
  Ir = M(6),
  Tr = M(7),
  Te =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  Or =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  Ar =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  Nr = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u,
  jr =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  Cr = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Oe() {
  return new RegExp(Cr, "u");
}
var Ae =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Ne =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/,
  je =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  Ce =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  Re =
    /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  re = /^[A-Za-z0-9_-]*$/,
  Le = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/,
  Rr = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
  Me = /^\+(?:[0-9]){6,14}[0-9]$/,
  pt =
    "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
  Fe = new RegExp(`^${pt}$`);
function ft(t) {
  let e = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof t.precision == "number"
    ? t.precision === -1
      ? `${e}`
      : t.precision === 0
      ? `${e}:[0-5]\\d`
      : `${e}:[0-5]\\d\\.\\d{${t.precision}}`
    : `${e}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function De(t) {
  return new RegExp(`^${ft(t)}$`);
}
function Ue(t) {
  let e = ft({ precision: t.precision }), r = ["Z"];
  t.local && r.push(""), t.offset && r.push("([+-]\\d{2}:\\d{2})");
  let o = `${e}(?:${r.join("|")})`;
  return new RegExp(`^${pt}T(?:${o})$`);
}
var Ve = (t) => {
    let e = t
      ? `[\\s\\S]{${t?.minimum ?? 0},${t?.maximum ?? ""}}`
      : "[\\s\\S]*";
    return new RegExp(`^${e}$`);
  },
  Be = /^\d+n?$/,
  Je = /^\d+$/,
  We = /^-?\d+(?:\.\d+)?/i,
  Ge = /true|false/i,
  Ke = /null/i;
var qe = /undefined/i;
var Ye = /^[^A-Z]*$/, Xe = /^[^a-z]*$/;
var Z = l("$ZodCheck", (t, e) => {
    var r;
    t._zod ?? (t._zod = {}),
      t._zod.def = e,
      (r = t._zod).onattach ?? (r.onattach = []);
  }),
  ht = { number: "number", bigint: "bigint", object: "date" },
  He = l("$ZodCheckLessThan", (t, e) => {
    Z.init(t, e);
    let r = ht[typeof e.value];
    t._zod.onattach.push((o) => {
      let n = o._zod.bag,
        i = (e.inclusive ? n.maximum : n.exclusiveMaximum) ??
          Number.POSITIVE_INFINITY;
      e.value < i &&
        (e.inclusive ? n.maximum = e.value : n.exclusiveMaximum = e.value);
    }),
      t._zod.check = (o) => {
        (e.inclusive ? o.value <= e.value : o.value < e.value) ||
          o.issues.push({
            origin: r,
            code: "too_big",
            maximum: e.value,
            input: o.value,
            inclusive: e.inclusive,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  Qe = l("$ZodCheckGreaterThan", (t, e) => {
    Z.init(t, e);
    let r = ht[typeof e.value];
    t._zod.onattach.push((o) => {
      let n = o._zod.bag,
        i = (e.inclusive ? n.minimum : n.exclusiveMinimum) ??
          Number.NEGATIVE_INFINITY;
      e.value > i &&
        (e.inclusive ? n.minimum = e.value : n.exclusiveMinimum = e.value);
    }),
      t._zod.check = (o) => {
        (e.inclusive ? o.value >= e.value : o.value > e.value) ||
          o.issues.push({
            origin: r,
            code: "too_small",
            minimum: e.value,
            input: o.value,
            inclusive: e.inclusive,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  dt = l("$ZodCheckMultipleOf", (t, e) => {
    Z.init(t, e),
      t._zod.onattach.push((r) => {
        var o;
        (o = r._zod.bag).multipleOf ?? (o.multipleOf = e.value);
      }),
      t._zod.check = (r) => {
        if (typeof r.value != typeof e.value) {
          throw new Error("Cannot mix number and bigint in multiple_of check.");
        }
        (typeof r.value == "bigint"
          ? r.value % e.value === BigInt(0)
          : he(r.value, e.value) === 0) ||
          r.issues.push({
            origin: typeof r.value,
            code: "not_multiple_of",
            divisor: e.value,
            input: r.value,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  _t = l("$ZodCheckNumberFormat", (t, e) => {
    Z.init(t, e), e.format = e.format || "float64";
    let r = e.format?.includes("int"),
      o = r ? "int" : "number",
      [n, i] = xe[e.format];
    t._zod.onattach.push((s) => {
      let u = s._zod.bag;
      u.format = e.format, u.minimum = n, u.maximum = i, r && (u.pattern = Je);
    }),
      t._zod.check = (s) => {
        let u = s.value;
        if (r) {
          if (!Number.isInteger(u)) {
            s.issues.push({
              expected: o,
              format: e.format,
              code: "invalid_type",
              input: u,
              inst: t,
            });
            return;
          }
          if (!Number.isSafeInteger(u)) {
            u > 0
              ? s.issues.push({
                input: u,
                code: "too_big",
                maximum: Number.MAX_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst: t,
                origin: o,
                continue: !e.abort,
              })
              : s.issues.push({
                input: u,
                code: "too_small",
                minimum: Number.MIN_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst: t,
                origin: o,
                continue: !e.abort,
              });
            return;
          }
        }
        u < n &&
        s.issues.push({
          origin: "number",
          input: u,
          code: "too_small",
          minimum: n,
          inclusive: !0,
          inst: t,
          continue: !e.abort,
        }),
          u > i &&
          s.issues.push({
            origin: "number",
            input: u,
            code: "too_big",
            maximum: i,
            inst: t,
          });
      };
  }),
  gt = l("$ZodCheckBigIntFormat", (t, e) => {
    Z.init(t, e);
    let [r, o] = ze[e.format];
    t._zod.onattach.push((n) => {
      let i = n._zod.bag;
      i.format = e.format, i.minimum = r, i.maximum = o;
    }),
      t._zod.check = (n) => {
        let i = n.value;
        i < r &&
        n.issues.push({
          origin: "bigint",
          input: i,
          code: "too_small",
          minimum: r,
          inclusive: !0,
          inst: t,
          continue: !e.abort,
        }),
          i > o &&
          n.issues.push({
            origin: "bigint",
            input: i,
            code: "too_big",
            maximum: o,
            inst: t,
          });
      };
  }),
  xt = l("$ZodCheckMaxSize", (t, e) => {
    var r;
    Z.init(t, e),
      (r = t._zod.def).when ?? (r.when = (o) => {
        let n = o.value;
        return !A(n) && n.size !== void 0;
      }),
      t._zod.onattach.push((o) => {
        let n = o._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        e.maximum < n && (o._zod.bag.maximum = e.maximum);
      }),
      t._zod.check = (o) => {
        let n = o.value;
        n.size <= e.maximum ||
          o.issues.push({
            origin: G(n),
            code: "too_big",
            maximum: e.maximum,
            input: n,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  zt = l("$ZodCheckMinSize", (t, e) => {
    var r;
    Z.init(t, e),
      (r = t._zod.def).when ?? (r.when = (o) => {
        let n = o.value;
        return !A(n) && n.size !== void 0;
      }),
      t._zod.onattach.push((o) => {
        let n = o._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        e.minimum > n && (o._zod.bag.minimum = e.minimum);
      }),
      t._zod.check = (o) => {
        let n = o.value;
        n.size >= e.minimum ||
          o.issues.push({
            origin: G(n),
            code: "too_small",
            minimum: e.minimum,
            input: n,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  vt = l("$ZodCheckSizeEquals", (t, e) => {
    var r;
    Z.init(t, e),
      (r = t._zod.def).when ?? (r.when = (o) => {
        let n = o.value;
        return !A(n) && n.size !== void 0;
      }),
      t._zod.onattach.push((o) => {
        let n = o._zod.bag;
        n.minimum = e.size, n.maximum = e.size, n.size = e.size;
      }),
      t._zod.check = (o) => {
        let n = o.value, i = n.size;
        if (i === e.size) {
          return;
        }
        let s = i > e.size;
        o.issues.push({
          origin: G(n),
          ...s
            ? { code: "too_big", maximum: e.size }
            : { code: "too_small", minimum: e.size },
          inclusive: !0,
          exact: !0,
          input: o.value,
          inst: t,
          continue: !e.abort,
        });
      };
  }),
  bt = l("$ZodCheckMaxLength", (t, e) => {
    var r;
    Z.init(t, e),
      (r = t._zod.def).when ?? (r.when = (o) => {
        let n = o.value;
        return !A(n) && n.length !== void 0;
      }),
      t._zod.onattach.push((o) => {
        let n = o._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        e.maximum < n && (o._zod.bag.maximum = e.maximum);
      }),
      t._zod.check = (o) => {
        let n = o.value;
        if (n.length <= e.maximum) {
          return;
        }
        let s = K(n);
        o.issues.push({
          origin: s,
          code: "too_big",
          maximum: e.maximum,
          inclusive: !0,
          input: n,
          inst: t,
          continue: !e.abort,
        });
      };
  }),
  $t = l("$ZodCheckMinLength", (t, e) => {
    var r;
    Z.init(t, e),
      (r = t._zod.def).when ?? (r.when = (o) => {
        let n = o.value;
        return !A(n) && n.length !== void 0;
      }),
      t._zod.onattach.push((o) => {
        let n = o._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        e.minimum > n && (o._zod.bag.minimum = e.minimum);
      }),
      t._zod.check = (o) => {
        let n = o.value;
        if (n.length >= e.minimum) {
          return;
        }
        let s = K(n);
        o.issues.push({
          origin: s,
          code: "too_small",
          minimum: e.minimum,
          inclusive: !0,
          input: n,
          inst: t,
          continue: !e.abort,
        });
      };
  }),
  yt = l("$ZodCheckLengthEquals", (t, e) => {
    var r;
    Z.init(t, e),
      (r = t._zod.def).when ?? (r.when = (o) => {
        let n = o.value;
        return !A(n) && n.length !== void 0;
      }),
      t._zod.onattach.push((o) => {
        let n = o._zod.bag;
        n.minimum = e.length, n.maximum = e.length, n.length = e.length;
      }),
      t._zod.check = (o) => {
        let n = o.value, i = n.length;
        if (i === e.length) {
          return;
        }
        let s = K(n), u = i > e.length;
        o.issues.push({
          origin: s,
          ...u
            ? { code: "too_big", maximum: e.length }
            : { code: "too_small", minimum: e.length },
          inclusive: !0,
          exact: !0,
          input: o.value,
          inst: t,
          continue: !e.abort,
        });
      };
  }),
  Y = l("$ZodCheckStringFormat", (t, e) => {
    var r, o;
    Z.init(t, e),
      t._zod.onattach.push((n) => {
        let i = n._zod.bag;
        i.format = e.format,
          e.pattern &&
          (i.patterns ?? (i.patterns = new Set()), i.patterns.add(e.pattern));
      }),
      e.pattern
        ? (r = t._zod).check ?? (r.check = (n) => {
          e.pattern.lastIndex = 0,
            !e.pattern.test(n.value) &&
            n.issues.push({
              origin: "string",
              code: "invalid_format",
              format: e.format,
              input: n.value,
              ...e.pattern ? { pattern: e.pattern.toString() } : {},
              inst: t,
              continue: !e.abort,
            });
        })
        : (o = t._zod).check ?? (o.check = () => {});
  }),
  wt = l("$ZodCheckRegex", (t, e) => {
    Y.init(t, e),
      t._zod.check = (r) => {
        e.pattern.lastIndex = 0,
          !e.pattern.test(r.value) &&
          r.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "regex",
            input: r.value,
            pattern: e.pattern.toString(),
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  kt = l("$ZodCheckLowerCase", (t, e) => {
    e.pattern ?? (e.pattern = Ye), Y.init(t, e);
  }),
  Zt = l("$ZodCheckUpperCase", (t, e) => {
    e.pattern ?? (e.pattern = Xe), Y.init(t, e);
  }),
  Pt = l("$ZodCheckIncludes", (t, e) => {
    Z.init(t, e);
    let r = T(e.includes),
      o = new RegExp(
        typeof e.position == "number" ? `^.{${e.position}}${r}` : r,
      );
    e.pattern = o,
      t._zod.onattach.push((n) => {
        let i = n._zod.bag;
        i.patterns ?? (i.patterns = new Set()), i.patterns.add(o);
      }),
      t._zod.check = (n) => {
        n.value.includes(e.includes, e.position) ||
          n.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: e.includes,
            input: n.value,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  St = l("$ZodCheckStartsWith", (t, e) => {
    Z.init(t, e);
    let r = new RegExp(`^${T(e.prefix)}.*`);
    e.pattern ?? (e.pattern = r),
      t._zod.onattach.push((o) => {
        let n = o._zod.bag;
        n.patterns ?? (n.patterns = new Set()), n.patterns.add(r);
      }),
      t._zod.check = (o) => {
        o.value.startsWith(e.prefix) ||
          o.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: e.prefix,
            input: o.value,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  Et = l("$ZodCheckEndsWith", (t, e) => {
    Z.init(t, e);
    let r = new RegExp(`.*${T(e.suffix)}$`);
    e.pattern ?? (e.pattern = r),
      t._zod.onattach.push((o) => {
        let n = o._zod.bag;
        n.patterns ?? (n.patterns = new Set()), n.patterns.add(r);
      }),
      t._zod.check = (o) => {
        o.value.endsWith(e.suffix) ||
          o.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: e.suffix,
            input: o.value,
            inst: t,
            continue: !e.abort,
          });
      };
  });
function mt(t, e, r) {
  t.issues.length && e.issues.push(...S(r, t.issues));
}
var It = l("$ZodCheckProperty", (t, e) => {
    Z.init(t, e),
      t._zod.check = (r) => {
        let o = e.schema._zod.run(
          { value: r.value[e.property], issues: [] },
          {},
        );
        if (o instanceof Promise) {
          return o.then((n) => mt(n, r, e.property));
        }
        mt(o, r, e.property);
      };
  }),
  Tt = l("$ZodCheckMimeType", (t, e) => {
    Z.init(t, e);
    let r = new Set(e.mime);
    t._zod.onattach.push((o) => {
      o._zod.bag.mime = e.mime;
    }),
      t._zod.check = (o) => {
        r.has(o.value.type) ||
          o.issues.push({
            code: "invalid_value",
            values: e.mime,
            input: o.value.type,
            inst: t,
          });
      };
  }),
  Ot = l("$ZodCheckOverwrite", (t, e) => {
    Z.init(t, e),
      t._zod.check = (r) => {
        r.value = e.tx(r.value);
      };
  });
var oe = class {
  constructor(e = []) {
    this.content = [], this.indent = 0, this && (this.args = e);
  }
  indented(e) {
    this.indent += 1, e(this), this.indent -= 1;
  }
  write(e) {
    if (typeof e == "function") {
      e(this, { execution: "sync" }), e(this, { execution: "async" });
      return;
    }
    let o = e.split(`
`).filter((s) => s),
      n = Math.min(...o.map((s) => s.length - s.trimStart().length)),
      i = o.map((s) => s.slice(n)).map((s) => " ".repeat(this.indent * 2) + s);
    for (let s of i) {
      this.content.push(s);
    }
  }
  compile() {
    let e = Function,
      r = this?.args,
      n = [...(this?.content ?? [""]).map((i) => `  ${i}`)];
    return new e(
      ...r,
      n.join(`
`),
    );
  }
};
var Nt = { major: 4, minor: 0, patch: 10 };
var z = l("$ZodType", (t, e) => {
    var r;
    t ?? (t = {}),
      t._zod.def = e,
      t._zod.bag = t._zod.bag || {},
      t._zod.version = Nt;
    let o = [...t._zod.def.checks ?? []];
    t._zod.traits.has("$ZodCheck") && o.unshift(t);
    for (let n of o) {
      for (let i of n._zod.onattach) {
        i(t);
      }
    }
    if (o.length === 0) {
      (r = t._zod).deferred ?? (r.deferred = []),
        t._zod.deferred?.push(() => {
          t._zod.run = t._zod.parse;
        });
    } else {
      let n = (i, s, u) => {
        let p = R(i), m;
        for (let h of s) {
          if (h._zod.def.when) {
            if (!h._zod.def.when(i)) {
              continue;
            }
          } else if (p) {
            continue;
          }
          let a = i.issues.length, x = h._zod.check(i);
          if (x instanceof Promise && u?.async === !1) {
            throw new O();
          }
          if (m || x instanceof Promise) {
            m = (m ?? Promise.resolve()).then(async () => {
              await x, i.issues.length !== a && (p || (p = R(i, a)));
            });
          } else {
            if (i.issues.length === a) {
              continue;
            }
            p || (p = R(i, a));
          }
        }
        return m ? m.then(() => i) : i;
      };
      t._zod.run = (i, s) => {
        let u = t._zod.parse(i, s);
        if (u instanceof Promise) {
          if (s.async === !1) {
            throw new O();
          }
          return u.then((p) => n(p, o, s));
        }
        return n(u, o, s);
      };
    }
    t["~standard"] = {
      validate: (n) => {
        try {
          let i = at(t, n);
          return i.success ? { value: i.data } : { issues: i.error?.issues };
        } catch {
          return lt(t, n).then((s) =>
            s.success ? { value: s.data } : { issues: s.error?.issues }
          );
        }
      },
      vendor: "zod",
      version: 1,
    };
  }),
  tt = l("$ZodString", (t, e) => {
    z.init(t, e),
      t._zod.pattern = [...t?._zod.bag?.patterns ?? []].pop() ?? Ve(t._zod.bag),
      t._zod.parse = (r, o) => {
        if (e.coerce) {
          try {
            r.value = String(r.value);
          } catch {}
        }
        return typeof r.value == "string" ||
          r.issues.push({
            expected: "string",
            code: "invalid_type",
            input: r.value,
            inst: t,
          }),
          r;
      };
  }),
  k = l("$ZodStringFormat", (t, e) => {
    Y.init(t, e), tt.init(t, e);
  }),
  ln = l("$ZodGUID", (t, e) => {
    e.pattern ?? (e.pattern = Ie), k.init(t, e);
  }),
  pn = l("$ZodUUID", (t, e) => {
    if (e.version) {
      let o =
        { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[e.version];
      if (o === void 0) {
        throw new Error(`Invalid UUID version: "${e.version}"`);
      }
      e.pattern ?? (e.pattern = M(o));
    } else {
      e.pattern ?? (e.pattern = M());
    }
    k.init(t, e);
  }),
  fn = l("$ZodEmail", (t, e) => {
    e.pattern ?? (e.pattern = Te), k.init(t, e);
  }),
  mn = l("$ZodURL", (t, e) => {
    k.init(t, e),
      t._zod.check = (r) => {
        try {
          let o = r.value.trim(), n = new URL(o);
          e.hostname &&
          (e.hostname.lastIndex = 0,
            e.hostname.test(n.hostname) ||
            r.issues.push({
              code: "invalid_format",
              format: "url",
              note: "Invalid hostname",
              pattern: Le.source,
              input: r.value,
              inst: t,
              continue: !e.abort,
            })),
            e.protocol &&
            (e.protocol.lastIndex = 0,
              e.protocol.test(
                n.protocol.endsWith(":") ? n.protocol.slice(0, -1) : n.protocol,
              ) ||
              r.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid protocol",
                pattern: e.protocol.source,
                input: r.value,
                inst: t,
                continue: !e.abort,
              })),
            e.normalize ? r.value = n.href : r.value = o;
          return;
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "url",
            input: r.value,
            inst: t,
            continue: !e.abort,
          });
        }
      };
  }),
  hn = l("$ZodEmoji", (t, e) => {
    e.pattern ?? (e.pattern = Oe()), k.init(t, e);
  }),
  dn = l("$ZodNanoID", (t, e) => {
    e.pattern ?? (e.pattern = Se), k.init(t, e);
  }),
  _n = l("$ZodCUID", (t, e) => {
    e.pattern ?? (e.pattern = ye), k.init(t, e);
  }),
  gn = l("$ZodCUID2", (t, e) => {
    e.pattern ?? (e.pattern = we), k.init(t, e);
  }),
  xn = l("$ZodULID", (t, e) => {
    e.pattern ?? (e.pattern = ke), k.init(t, e);
  }),
  zn = l("$ZodXID", (t, e) => {
    e.pattern ?? (e.pattern = Ze), k.init(t, e);
  }),
  vn = l("$ZodKSUID", (t, e) => {
    e.pattern ?? (e.pattern = Pe), k.init(t, e);
  }),
  bn = l("$ZodISODateTime", (t, e) => {
    e.pattern ?? (e.pattern = Ue(e)), k.init(t, e);
  }),
  $n = l("$ZodISODate", (t, e) => {
    e.pattern ?? (e.pattern = Fe), k.init(t, e);
  }),
  yn = l("$ZodISOTime", (t, e) => {
    e.pattern ?? (e.pattern = De(e)), k.init(t, e);
  }),
  wn = l("$ZodISODuration", (t, e) => {
    e.pattern ?? (e.pattern = Ee), k.init(t, e);
  }),
  kn = l("$ZodIPv4", (t, e) => {
    e.pattern ?? (e.pattern = Ae),
      k.init(t, e),
      t._zod.onattach.push((r) => {
        let o = r._zod.bag;
        o.format = "ipv4";
      });
  }),
  Zn = l("$ZodIPv6", (t, e) => {
    e.pattern ?? (e.pattern = Ne),
      k.init(t, e),
      t._zod.onattach.push((r) => {
        let o = r._zod.bag;
        o.format = "ipv6";
      }),
      t._zod.check = (r) => {
        try {
          new URL(`http://[${r.value}]`);
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: r.value,
            inst: t,
            continue: !e.abort,
          });
        }
      };
  }),
  Pn = l("$ZodCIDRv4", (t, e) => {
    e.pattern ?? (e.pattern = je), k.init(t, e);
  }),
  Sn = l("$ZodCIDRv6", (t, e) => {
    e.pattern ?? (e.pattern = Ce),
      k.init(t, e),
      t._zod.check = (r) => {
        let [o, n] = r.value.split("/");
        try {
          if (!n) {
            throw new Error();
          }
          let i = Number(n);
          if (`${i}` !== n) {
            throw new Error();
          }
          if (i < 0 || i > 128) {
            throw new Error();
          }
          new URL(`http://[${o}]`);
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: r.value,
            inst: t,
            continue: !e.abort,
          });
        }
      };
  });
function Jt(t) {
  if (t === "") {
    return !0;
  }
  if (t.length % 4 !== 0) {
    return !1;
  }
  try {
    return atob(t), !0;
  } catch {
    return !1;
  }
}
var En = l("$ZodBase64", (t, e) => {
  e.pattern ?? (e.pattern = Re),
    k.init(t, e),
    t._zod.onattach.push((r) => {
      r._zod.bag.contentEncoding = "base64";
    }),
    t._zod.check = (r) => {
      Jt(r.value) ||
        r.issues.push({
          code: "invalid_format",
          format: "base64",
          input: r.value,
          inst: t,
          continue: !e.abort,
        });
    };
});
function Lr(t) {
  if (!re.test(t)) {
    return !1;
  }
  let e = t.replace(/[-_]/g, (o) => o === "-" ? "+" : "/"),
    r = e.padEnd(Math.ceil(e.length / 4) * 4, "=");
  return Jt(r);
}
var In = l("$ZodBase64URL", (t, e) => {
    e.pattern ?? (e.pattern = re),
      k.init(t, e),
      t._zod.onattach.push((r) => {
        r._zod.bag.contentEncoding = "base64url";
      }),
      t._zod.check = (r) => {
        Lr(r.value) ||
          r.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: r.value,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  Tn = l("$ZodE164", (t, e) => {
    e.pattern ?? (e.pattern = Me), k.init(t, e);
  });
function Mr(t, e = null) {
  try {
    let r = t.split(".");
    if (r.length !== 3) {
      return !1;
    }
    let [o] = r;
    if (!o) {
      return !1;
    }
    let n = JSON.parse(atob(o));
    return !("typ" in n && n?.typ !== "JWT" || !n.alg ||
      e && (!("alg" in n) || n.alg !== e));
  } catch {
    return !1;
  }
}
var On = l("$ZodJWT", (t, e) => {
    k.init(t, e),
      t._zod.check = (r) => {
        Mr(r.value, e.alg) ||
          r.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: r.value,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  An = l("$ZodCustomStringFormat", (t, e) => {
    k.init(t, e),
      t._zod.check = (r) => {
        e.fn(r.value) ||
          r.issues.push({
            code: "invalid_format",
            format: e.format,
            input: r.value,
            inst: t,
            continue: !e.abort,
          });
      };
  }),
  Fr = l("$ZodNumber", (t, e) => {
    z.init(t, e),
      t._zod.pattern = t._zod.bag.pattern ?? We,
      t._zod.parse = (r, o) => {
        if (e.coerce) {
          try {
            r.value = Number(r.value);
          } catch {}
        }
        let n = r.value;
        if (typeof n == "number" && !Number.isNaN(n) && Number.isFinite(n)) {
          return r;
        }
        let i = typeof n == "number"
          ? Number.isNaN(n) ? "NaN" : Number.isFinite(n) ? void 0 : "Infinity"
          : void 0;
        return r.issues.push({
          expected: "number",
          code: "invalid_type",
          input: n,
          inst: t,
          ...i ? { received: i } : {},
        }),
          r;
      };
  }),
  Nn = l("$ZodNumber", (t, e) => {
    _t.init(t, e), Fr.init(t, e);
  }),
  Wt = l("$ZodBoolean", (t, e) => {
    z.init(t, e),
      t._zod.pattern = Ge,
      t._zod.parse = (r, o) => {
        if (e.coerce) {
          try {
            r.value = !!r.value;
          } catch {}
        }
        let n = r.value;
        return typeof n == "boolean" ||
          r.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input: n,
            inst: t,
          }),
          r;
      };
  }),
  Dr = l("$ZodBigInt", (t, e) => {
    z.init(t, e),
      t._zod.pattern = Be,
      t._zod.parse = (r, o) => {
        if (e.coerce) {
          try {
            r.value = BigInt(r.value);
          } catch {}
        }
        return typeof r.value == "bigint" ||
          r.issues.push({
            expected: "bigint",
            code: "invalid_type",
            input: r.value,
            inst: t,
          }),
          r;
      };
  }),
  jn = l("$ZodBigInt", (t, e) => {
    gt.init(t, e), Dr.init(t, e);
  }),
  Cn = l("$ZodSymbol", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        let n = r.value;
        return typeof n == "symbol" ||
          r.issues.push({
            expected: "symbol",
            code: "invalid_type",
            input: n,
            inst: t,
          }),
          r;
      };
  }),
  Rn = l("$ZodUndefined", (t, e) => {
    z.init(t, e),
      t._zod.pattern = qe,
      t._zod.values = new Set([void 0]),
      t._zod.optin = "optional",
      t._zod.optout = "optional",
      t._zod.parse = (r, o) => {
        let n = r.value;
        return typeof n > "u" ||
          r.issues.push({
            expected: "undefined",
            code: "invalid_type",
            input: n,
            inst: t,
          }),
          r;
      };
  }),
  Ln = l("$ZodNull", (t, e) => {
    z.init(t, e),
      t._zod.pattern = Ke,
      t._zod.values = new Set([null]),
      t._zod.parse = (r, o) => {
        let n = r.value;
        return n === null ||
          r.issues.push({
            expected: "null",
            code: "invalid_type",
            input: n,
            inst: t,
          }),
          r;
      };
  }),
  Mn = l("$ZodAny", (t, e) => {
    z.init(t, e), t._zod.parse = (r) => r;
  }),
  rt = l("$ZodUnknown", (t, e) => {
    z.init(t, e), t._zod.parse = (r) => r;
  }),
  Fn = l("$ZodNever", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => (r.issues.push({
        expected: "never",
        code: "invalid_type",
        input: r.value,
        inst: t,
      }),
        r);
  }),
  Dn = l("$ZodVoid", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        let n = r.value;
        return typeof n > "u" ||
          r.issues.push({
            expected: "void",
            code: "invalid_type",
            input: n,
            inst: t,
          }),
          r;
      };
  }),
  Un = l("$ZodDate", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        if (e.coerce) {
          try {
            r.value = new Date(r.value);
          } catch {}
        }
        let n = r.value, i = n instanceof Date;
        return i && !Number.isNaN(n.getTime()) ||
          r.issues.push({
            expected: "date",
            code: "invalid_type",
            input: n,
            ...i ? { received: "Invalid Date" } : {},
            inst: t,
          }),
          r;
      };
  });
function jt(t, e, r) {
  t.issues.length && e.issues.push(...S(r, t.issues)), e.value[r] = t.value;
}
var Gt = l("$ZodArray", (t, e) => {
  z.init(t, e),
    t._zod.parse = (r, o) => {
      let n = r.value;
      if (!Array.isArray(n)) {
        return r.issues.push({
          expected: "array",
          code: "invalid_type",
          input: n,
          inst: t,
        }),
          r;
      }
      r.value = Array(n.length);
      let i = [];
      for (let s = 0; s < n.length; s++) {
        let u = n[s], p = e.element._zod.run({ value: u, issues: [] }, o);
        p instanceof Promise ? i.push(p.then((m) => jt(m, r, s))) : jt(p, r, s);
      }
      return i.length ? Promise.all(i).then(() => r) : r;
    };
});
function ie(t, e, r, o) {
  t.issues.length && e.issues.push(...S(r, t.issues)),
    t.value === void 0 ? r in o && (e.value[r] = void 0) : e.value[r] = t.value;
}
var Vn = l("$ZodObject", (t, e) => {
  z.init(t, e);
  let r = B(() => {
    let a = Object.keys(e.shape);
    for (let d of a) {
      if (!(e.shape[d] instanceof z)) {
        throw new Error(`Invalid element at key "${d}": expected a Zod schema`);
      }
    }
    let x = ge(e.shape);
    return {
      shape: e.shape,
      keys: a,
      keySet: new Set(a),
      numKeys: a.length,
      optionalKeys: new Set(x),
    };
  });
  $(t._zod, "propValues", () => {
    let a = e.shape, x = {};
    for (let d in a) {
      let c = a[d]._zod;
      if (c.values) {
        x[d] ?? (x[d] = new Set());
        for (let _ of c.values) {
          x[d].add(_);
        }
      }
    }
    return x;
  });
  let o = (a) => {
      let x = new oe(["shape", "payload", "ctx"]),
        d = r.value,
        c = (v) => {
          let b = ee(v);
          return `shape[${b}]._zod.run({ value: input[${b}], issues: [] }, ctx)`;
        };
      x.write("const input = payload.value;");
      let _ = Object.create(null), g = 0;
      for (let v of d.keys) {
        _[v] = `key_${g++}`;
      }
      x.write("const newResult = {}");
      for (let v of d.keys) {
        let b = _[v], w = ee(v);
        x.write(`const ${b} = ${c(v)};`),
          x.write(`
        if (${b}.issues.length) {
          payload.issues = payload.issues.concat(${b}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${w}, ...iss.path] : [${w}]
          })));
        }
        
        if (${b}.value === undefined) {
          if (${w} in input) {
            newResult[${w}] = undefined;
          }
        } else {
          newResult[${w}] = ${b}.value;
        }
      `);
      }
      x.write("payload.value = newResult;"), x.write("return payload;");
      let y = x.compile();
      return (v, b) => y(a, v, b);
    },
    n,
    i = F,
    s = !Q.jitless,
    p = s && de.value,
    m = e.catchall,
    h;
  t._zod.parse = (a, x) => {
    h ?? (h = r.value);
    let d = a.value;
    if (!i(d)) {
      return a.issues.push({
        expected: "object",
        code: "invalid_type",
        input: d,
        inst: t,
      }),
        a;
    }
    let c = [];
    if (s && p && x?.async === !1 && x.jitless !== !0) {
      n || (n = o(e.shape)), a = n(a, x);
    } else {
      a.value = {};
      let b = h.shape;
      for (let w of h.keys) {
        let le = b[w]._zod.run({ value: d[w], issues: [] }, x);
        le instanceof Promise
          ? c.push(le.then((er) => ie(er, a, w, d)))
          : ie(le, a, w, d);
      }
    }
    if (!m) {
      return c.length ? Promise.all(c).then(() => a) : a;
    }
    let _ = [], g = h.keySet, y = m._zod, v = y.def.type;
    for (let b of Object.keys(d)) {
      if (g.has(b)) {
        continue;
      }
      if (v === "never") {
        _.push(b);
        continue;
      }
      let w = y.run({ value: d[b], issues: [] }, x);
      w instanceof Promise
        ? c.push(w.then((H) => ie(H, a, b, d)))
        : ie(w, a, b, d);
    }
    return _.length &&
      a.issues.push({ code: "unrecognized_keys", keys: _, input: d, inst: t }),
      c.length ? Promise.all(c).then(() => a) : a;
  };
});
function Ct(t, e, r, o) {
  for (let i of t) {
    if (i.issues.length === 0) {
      return e.value = i.value, e;
    }
  }
  let n = t.filter((i) => !R(i));
  return n.length === 1 ? (e.value = n[0].value, n[0]) : (e.issues.push({
    code: "invalid_union",
    input: e.value,
    inst: r,
    errors: t.map((i) => i.issues.map((s) => E(s, o, I()))),
  }),
    e);
}
var Ur = l("$ZodUnion", (t, e) => {
    z.init(t, e),
      $(
        t._zod,
        "optin",
        () =>
          e.options.some((r) => r._zod.optin === "optional")
            ? "optional"
            : void 0,
      ),
      $(
        t._zod,
        "optout",
        () =>
          e.options.some((r) => r._zod.optout === "optional")
            ? "optional"
            : void 0,
      ),
      $(t._zod, "values", () => {
        if (e.options.every((r) => r._zod.values)) {
          return new Set(e.options.flatMap((r) => Array.from(r._zod.values)));
        }
      }),
      $(t._zod, "pattern", () => {
        if (e.options.every((r) => r._zod.pattern)) {
          let r = e.options.map((o) => o._zod.pattern);
          return new RegExp(`^(${r.map((o) => J(o.source)).join("|")})$`);
        }
      }),
      t._zod.parse = (r, o) => {
        let n = !1, i = [];
        for (let s of e.options) {
          let u = s._zod.run({ value: r.value, issues: [] }, o);
          if (u instanceof Promise) {
            i.push(u), n = !0;
          } else {
            if (u.issues.length === 0) {
              return u;
            }
            i.push(u);
          }
        }
        return n ? Promise.all(i).then((s) => Ct(s, r, t, o)) : Ct(i, r, t, o);
      };
  }),
  Bn = l("$ZodDiscriminatedUnion", (t, e) => {
    Ur.init(t, e);
    let r = t._zod.parse;
    $(t._zod, "propValues", () => {
      let n = {};
      for (let i of e.options) {
        let s = i._zod.propValues;
        if (!s || Object.keys(s).length === 0) {
          throw new Error(
            `Invalid discriminated union option at index "${
              e.options.indexOf(i)
            }"`,
          );
        }
        for (let [u, p] of Object.entries(s)) {
          n[u] || (n[u] = new Set());
          for (let m of p) {
            n[u].add(m);
          }
        }
      }
      return n;
    });
    let o = B(() => {
      let n = e.options, i = new Map();
      for (let s of n) {
        let u = s._zod.propValues?.[e.discriminator];
        if (!u || u.size === 0) {
          throw new Error(
            `Invalid discriminated union option at index "${
              e.options.indexOf(s)
            }"`,
          );
        }
        for (let p of u) {
          if (i.has(p)) {
            throw new Error(`Duplicate discriminator value "${String(p)}"`);
          }
          i.set(p, s);
        }
      }
      return i;
    });
    t._zod.parse = (n, i) => {
      let s = n.value;
      if (!F(s)) {
        return n.issues.push({
          code: "invalid_type",
          expected: "object",
          input: s,
          inst: t,
        }),
          n;
      }
      let u = o.value.get(s?.[e.discriminator]);
      return u ? u._zod.run(n, i) : e.unionFallback ? r(n, i) : (n.issues.push({
        code: "invalid_union",
        errors: [],
        note: "No matching discriminator",
        discriminator: e.discriminator,
        input: s,
        path: [e.discriminator],
        inst: t,
      }),
        n);
    };
  }),
  Jn = l("$ZodIntersection", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        let n = r.value,
          i = e.left._zod.run({ value: n, issues: [] }, o),
          s = e.right._zod.run({ value: n, issues: [] }, o);
        return i instanceof Promise || s instanceof Promise
          ? Promise.all([i, s]).then(([p, m]) => Rt(r, p, m))
          : Rt(r, i, s);
      };
  });
function et(t, e) {
  if (t === e) {
    return { valid: !0, data: t };
  }
  if (t instanceof Date && e instanceof Date && +t == +e) {
    return { valid: !0, data: t };
  }
  if (D(t) && D(e)) {
    let r = Object.keys(e),
      o = Object.keys(t).filter((i) => r.indexOf(i) !== -1),
      n = { ...t, ...e };
    for (let i of o) {
      let s = et(t[i], e[i]);
      if (!s.valid) {
        return { valid: !1, mergeErrorPath: [i, ...s.mergeErrorPath] };
      }
      n[i] = s.data;
    }
    return { valid: !0, data: n };
  }
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) {
      return { valid: !1, mergeErrorPath: [] };
    }
    let r = [];
    for (let o = 0; o < t.length; o++) {
      let n = t[o], i = e[o], s = et(n, i);
      if (!s.valid) {
        return { valid: !1, mergeErrorPath: [o, ...s.mergeErrorPath] };
      }
      r.push(s.data);
    }
    return { valid: !0, data: r };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Rt(t, e, r) {
  if (
    e.issues.length && t.issues.push(...e.issues),
      r.issues.length && t.issues.push(...r.issues),
      R(t)
  ) {
    return t;
  }
  let o = et(e.value, r.value);
  if (!o.valid) {
    throw new Error(
      `Unmergable intersection. Error path: ${
        JSON.stringify(o.mergeErrorPath)
      }`,
    );
  }
  return t.value = o.data, t;
}
var ue = l("$ZodTuple", (t, e) => {
  z.init(t, e);
  let r = e.items,
    o = r.length -
      [...r].reverse().findIndex((n) => n._zod.optin !== "optional");
  t._zod.parse = (n, i) => {
    let s = n.value;
    if (!Array.isArray(s)) {
      return n.issues.push({
        input: s,
        inst: t,
        expected: "tuple",
        code: "invalid_type",
      }),
        n;
    }
    n.value = [];
    let u = [];
    if (!e.rest) {
      let m = s.length > r.length, h = s.length < o - 1;
      if (m || h) {
        return n.issues.push({
          input: s,
          inst: t,
          origin: "array",
          ...m
            ? { code: "too_big", maximum: r.length }
            : { code: "too_small", minimum: r.length },
        }),
          n;
      }
    }
    let p = -1;
    for (let m of r) {
      if (p++, p >= s.length && p >= o) {
        continue;
      }
      let h = m._zod.run({ value: s[p], issues: [] }, i);
      h instanceof Promise ? u.push(h.then((a) => se(a, n, p))) : se(h, n, p);
    }
    if (e.rest) {
      let m = s.slice(r.length);
      for (let h of m) {
        p++;
        let a = e.rest._zod.run({ value: h, issues: [] }, i);
        a instanceof Promise ? u.push(a.then((x) => se(x, n, p))) : se(a, n, p);
      }
    }
    return u.length ? Promise.all(u).then(() => n) : n;
  };
});
function se(t, e, r) {
  t.issues.length && e.issues.push(...S(r, t.issues)), e.value[r] = t.value;
}
var Wn = l("$ZodRecord", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        let n = r.value;
        if (!D(n)) {
          return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: n,
            inst: t,
          }),
            r;
        }
        let i = [];
        if (e.keyType._zod.values) {
          let s = e.keyType._zod.values;
          r.value = {};
          for (let p of s) {
            if (
              typeof p == "string" || typeof p == "number" ||
              typeof p == "symbol"
            ) {
              let m = e.valueType._zod.run({ value: n[p], issues: [] }, o);
              m instanceof Promise
                ? i.push(m.then((h) => {
                  h.issues.length && r.issues.push(...S(p, h.issues)),
                    r.value[p] = h.value;
                }))
                : (m.issues.length && r.issues.push(...S(p, m.issues)),
                  r.value[p] = m.value);
            }
          }
          let u;
          for (let p in n) {
            s.has(p) || (u = u ?? [], u.push(p));
          }
          u && u.length > 0 &&
            r.issues.push({
              code: "unrecognized_keys",
              input: n,
              inst: t,
              keys: u,
            });
        } else {
          r.value = {};
          for (let s of Reflect.ownKeys(n)) {
            if (s === "__proto__") {
              continue;
            }
            let u = e.keyType._zod.run({ value: s, issues: [] }, o);
            if (u instanceof Promise) {
              throw new Error(
                "Async schemas not supported in object keys currently",
              );
            }
            if (u.issues.length) {
              r.issues.push({
                origin: "record",
                code: "invalid_key",
                issues: u.issues.map((m) => E(m, o, I())),
                input: s,
                path: [s],
                inst: t,
              }), r.value[u.value] = u.value;
              continue;
            }
            let p = e.valueType._zod.run({ value: n[s], issues: [] }, o);
            p instanceof Promise
              ? i.push(p.then((m) => {
                m.issues.length && r.issues.push(...S(s, m.issues)),
                  r.value[u.value] = m.value;
              }))
              : (p.issues.length && r.issues.push(...S(s, p.issues)),
                r.value[u.value] = p.value);
          }
        }
        return i.length ? Promise.all(i).then(() => r) : r;
      };
  }),
  Gn = l("$ZodMap", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        let n = r.value;
        if (!(n instanceof Map)) {
          return r.issues.push({
            expected: "map",
            code: "invalid_type",
            input: n,
            inst: t,
          }),
            r;
        }
        let i = [];
        r.value = new Map();
        for (let [s, u] of n) {
          let p = e.keyType._zod.run({ value: s, issues: [] }, o),
            m = e.valueType._zod.run({ value: u, issues: [] }, o);
          p instanceof Promise || m instanceof Promise
            ? i.push(
              Promise.all([p, m]).then(([h, a]) => {
                Lt(h, a, r, s, n, t, o);
              }),
            )
            : Lt(p, m, r, s, n, t, o);
        }
        return i.length ? Promise.all(i).then(() => r) : r;
      };
  });
function Lt(t, e, r, o, n, i, s) {
  t.issues.length &&
  (W.has(typeof o) ? r.issues.push(...S(o, t.issues)) : r.issues.push({
    origin: "map",
    code: "invalid_key",
    input: n,
    inst: i,
    issues: t.issues.map((u) => E(u, s, I())),
  })),
    e.issues.length &&
    (W.has(typeof o) ? r.issues.push(...S(o, e.issues)) : r.issues.push({
      origin: "map",
      code: "invalid_element",
      input: n,
      inst: i,
      key: o,
      issues: e.issues.map((u) => E(u, s, I())),
    })),
    r.value.set(t.value, e.value);
}
var Kn = l("$ZodSet", (t, e) => {
  z.init(t, e),
    t._zod.parse = (r, o) => {
      let n = r.value;
      if (!(n instanceof Set)) {
        return r.issues.push({
          input: n,
          inst: t,
          expected: "set",
          code: "invalid_type",
        }),
          r;
      }
      let i = [];
      r.value = new Set();
      for (let s of n) {
        let u = e.valueType._zod.run({ value: s, issues: [] }, o);
        u instanceof Promise ? i.push(u.then((p) => Mt(p, r))) : Mt(u, r);
      }
      return i.length ? Promise.all(i).then(() => r) : r;
    };
});
function Mt(t, e) {
  t.issues.length && e.issues.push(...t.issues), e.value.add(t.value);
}
var qn = l("$ZodEnum", (t, e) => {
    z.init(t, e);
    let r = V(e.entries), o = new Set(r);
    t._zod.values = o,
      t._zod.pattern = new RegExp(
        `^(${
          r.filter((n) => W.has(typeof n)).map((n) =>
            typeof n == "string" ? T(n) : n.toString()
          ).join("|")
        })$`,
      ),
      t._zod.parse = (n, i) => {
        let s = n.value;
        return o.has(s) ||
          n.issues.push({
            code: "invalid_value",
            values: r,
            input: s,
            inst: t,
          }),
          n;
      };
  }),
  Yn = l("$ZodLiteral", (t, e) => {
    if (z.init(t, e), e.values.length === 0) {
      throw new Error("Cannot create literal schema with no valid values");
    }
    t._zod.values = new Set(e.values),
      t._zod.pattern = new RegExp(
        `^(${
          e.values.map((r) =>
            typeof r == "string" ? T(r) : r ? T(r.toString()) : String(r)
          ).join("|")
        })$`,
      ),
      t._zod.parse = (r, o) => {
        let n = r.value;
        return t._zod.values.has(n) ||
          r.issues.push({
            code: "invalid_value",
            values: e.values,
            input: n,
            inst: t,
          }),
          r;
      };
  }),
  Xn = l("$ZodFile", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        let n = r.value;
        return n instanceof File ||
          r.issues.push({
            expected: "file",
            code: "invalid_type",
            input: n,
            inst: t,
          }),
          r;
      };
  }),
  Kt = l("$ZodTransform", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        let n = e.transform(r.value, r);
        if (o.async) {
          return (n instanceof Promise ? n : Promise.resolve(n)).then((
            s,
          ) => (r.value = s, r));
        }
        if (n instanceof Promise) {
          throw new O();
        }
        return r.value = n, r;
      };
  }),
  Hn = l("$ZodOptional", (t, e) => {
    z.init(t, e),
      t._zod.optin = "optional",
      t._zod.optout = "optional",
      $(t._zod, "values", () =>
        e.innerType._zod.values
          ? new Set([...e.innerType._zod.values, void 0])
          : void 0),
      $(t._zod, "pattern", () => {
        let r = e.innerType._zod.pattern;
        return r ? new RegExp(`^(${J(r.source)})?$`) : void 0;
      }),
      t._zod.parse = (r, o) =>
        e.innerType._zod.optin === "optional"
          ? e.innerType._zod.run(r, o)
          : r.value === void 0
          ? r
          : e.innerType._zod.run(r, o);
  }),
  Qn = l("$ZodNullable", (t, e) => {
    z.init(t, e),
      $(t._zod, "optin", () => e.innerType._zod.optin),
      $(t._zod, "optout", () => e.innerType._zod.optout),
      $(t._zod, "pattern", () => {
        let r = e.innerType._zod.pattern;
        return r ? new RegExp(`^(${J(r.source)}|null)$`) : void 0;
      }),
      $(t._zod, "values", () =>
        e.innerType._zod.values
          ? new Set([...e.innerType._zod.values, null])
          : void 0),
      t._zod.parse = (r, o) =>
        r.value === null ? r : e.innerType._zod.run(r, o);
  }),
  eo = l("$ZodDefault", (t, e) => {
    z.init(t, e),
      t._zod.optin = "optional",
      $(t._zod, "values", () => e.innerType._zod.values),
      t._zod.parse = (r, o) => {
        if (r.value === void 0) {
          return r.value = e.defaultValue, r;
        }
        let n = e.innerType._zod.run(r, o);
        return n instanceof Promise ? n.then((i) => Ft(i, e)) : Ft(n, e);
      };
  });
function Ft(t, e) {
  return t.value === void 0 && (t.value = e.defaultValue), t;
}
var to = l("$ZodPrefault", (t, e) => {
    z.init(t, e),
      t._zod.optin = "optional",
      $(t._zod, "values", () => e.innerType._zod.values),
      t._zod.parse = (
        r,
        o,
      ) => (r.value === void 0 && (r.value = e.defaultValue),
        e.innerType._zod.run(r, o));
  }),
  ro = l("$ZodNonOptional", (t, e) => {
    z.init(t, e),
      $(t._zod, "values", () => {
        let r = e.innerType._zod.values;
        return r ? new Set([...r].filter((o) => o !== void 0)) : void 0;
      }),
      t._zod.parse = (r, o) => {
        let n = e.innerType._zod.run(r, o);
        return n instanceof Promise ? n.then((i) => Dt(i, t)) : Dt(n, t);
      };
  });
function Dt(t, e) {
  return !t.issues.length && t.value === void 0 &&
    t.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: t.value,
      inst: e,
    }),
    t;
}
var no = l("$ZodSuccess", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) => {
        let n = e.innerType._zod.run(r, o);
        return n instanceof Promise
          ? n.then((i) => (r.value = i.issues.length === 0, r))
          : (r.value = n.issues.length === 0, r);
      };
  }),
  oo = l("$ZodCatch", (t, e) => {
    z.init(t, e),
      $(t._zod, "optin", () => e.innerType._zod.optin),
      $(t._zod, "optout", () => e.innerType._zod.optout),
      $(t._zod, "values", () => e.innerType._zod.values),
      t._zod.parse = (r, o) => {
        let n = e.innerType._zod.run(r, o);
        return n instanceof Promise
          ? n.then((i) => (r.value = i.value,
            i.issues.length &&
            (r.value = e.catchValue({
              ...r,
              error: { issues: i.issues.map((s) => E(s, o, I())) },
              input: r.value,
            }),
              r.issues = []),
            r)
          )
          : (r.value = n.value,
            n.issues.length &&
            (r.value = e.catchValue({
              ...r,
              error: { issues: n.issues.map((i) => E(i, o, I())) },
              input: r.value,
            }),
              r.issues = []),
            r);
      };
  }),
  io = l("$ZodNaN", (t, e) => {
    z.init(t, e),
      t._zod.parse = (
        r,
        o,
      ) => ((typeof r.value != "number" || !Number.isNaN(r.value)) &&
        r.issues.push({
          input: r.value,
          inst: t,
          expected: "nan",
          code: "invalid_type",
        }),
        r);
  }),
  qt = l("$ZodPipe", (t, e) => {
    z.init(t, e),
      $(t._zod, "values", () => e.in._zod.values),
      $(t._zod, "optin", () => e.in._zod.optin),
      $(t._zod, "optout", () => e.out._zod.optout),
      $(t._zod, "propValues", () => e.in._zod.propValues),
      t._zod.parse = (r, o) => {
        let n = e.in._zod.run(r, o);
        return n instanceof Promise ? n.then((i) => Ut(i, e, o)) : Ut(n, e, o);
      };
  });
function Ut(t, e, r) {
  return t.issues.length
    ? t
    : e.out._zod.run({ value: t.value, issues: t.issues }, r);
}
var so = l("$ZodReadonly", (t, e) => {
  z.init(t, e),
    $(t._zod, "propValues", () => e.innerType._zod.propValues),
    $(t._zod, "values", () => e.innerType._zod.values),
    $(t._zod, "optin", () => e.innerType._zod.optin),
    $(t._zod, "optout", () => e.innerType._zod.optout),
    t._zod.parse = (r, o) => {
      let n = e.innerType._zod.run(r, o);
      return n instanceof Promise ? n.then(Vt) : Vt(n);
    };
});
function Vt(t) {
  return t.value = Object.freeze(t.value), t;
}
var uo = l("$ZodTemplateLiteral", (t, e) => {
    z.init(t, e);
    let r = [];
    for (let o of e.parts) {
      if (o instanceof z) {
        if (!o._zod.pattern) {
          throw new Error(
            `Invalid template literal part, no pattern found: ${
              [...o._zod.traits].shift()
            }`,
          );
        }
        let n = o._zod.pattern instanceof RegExp
          ? o._zod.pattern.source
          : o._zod.pattern;
        if (!n) {
          throw new Error(`Invalid template literal part: ${o._zod.traits}`);
        }
        let i = n.startsWith("^") ? 1 : 0,
          s = n.endsWith("$") ? n.length - 1 : n.length;
        r.push(n.slice(i, s));
      } else if (o === null || _e.has(typeof o)) {
        r.push(T(`${o}`));
      } else {
        throw new Error(`Invalid template literal part: ${o}`);
      }
    }
    t._zod.pattern = new RegExp(`^${r.join("")}$`),
      t._zod.parse = (o, n) =>
        typeof o.value != "string"
          ? (o.issues.push({
            input: o.value,
            inst: t,
            expected: "template_literal",
            code: "invalid_type",
          }),
            o)
          : (t._zod.pattern.lastIndex = 0,
            t._zod.pattern.test(o.value) ||
            o.issues.push({
              input: o.value,
              inst: t,
              code: "invalid_format",
              format: e.format ?? "template_literal",
              pattern: t._zod.pattern.source,
            }),
            o);
  }),
  co = l("$ZodPromise", (t, e) => {
    z.init(t, e),
      t._zod.parse = (r, o) =>
        Promise.resolve(r.value).then((n) =>
          e.innerType._zod.run({ value: n, issues: [] }, o)
        );
  }),
  ao = l("$ZodLazy", (t, e) => {
    z.init(t, e),
      $(t._zod, "innerType", () => e.getter()),
      $(t._zod, "pattern", () => t._zod.innerType._zod.pattern),
      $(t._zod, "propValues", () => t._zod.innerType._zod.propValues),
      $(t._zod, "optin", () => t._zod.innerType._zod.optin),
      $(t._zod, "optout", () => t._zod.innerType._zod.optout),
      t._zod.parse = (r, o) => t._zod.innerType._zod.run(r, o);
  }),
  lo = l("$ZodCustom", (t, e) => {
    Z.init(t, e),
      z.init(t, e),
      t._zod.parse = (r, o) => r,
      t._zod.check = (r) => {
        let o = r.value, n = e.fn(o);
        if (n instanceof Promise) {
          return n.then((i) => Bt(i, r, o, t));
        }
        Bt(n, r, o, t);
      };
  });
function Bt(t, e, r, o) {
  if (!t) {
    let n = {
      code: "custom",
      input: r,
      inst: o,
      path: [...o._zod.def.path ?? []],
      continue: !o._zod.def.abort,
    };
    o._zod.def.params && (n.params = o._zod.def.params), e.issues.push(ve(n));
  }
}
import * as ks from "./locales.mjs";
var fo = Symbol("ZodOutput"),
  mo = Symbol("ZodInput"),
  X = class {
    constructor() {
      this._map = new Map(), this._idmap = new Map();
    }
    add(e, ...r) {
      let o = r[0];
      if (this._map.set(e, o), o && typeof o == "object" && "id" in o) {
        if (this._idmap.has(o.id)) {
          throw new Error(`ID ${o.id} already exists in the registry`);
        }
        this._idmap.set(o.id, e);
      }
      return this;
    }
    clear() {
      return this._map = new Map(), this._idmap = new Map(), this;
    }
    remove(e) {
      let r = this._map.get(e);
      return r && typeof r == "object" && "id" in r && this._idmap.delete(r.id),
        this._map.delete(e),
        this;
    }
    get(e) {
      let r = e._zod.parent;
      if (r) {
        let o = { ...this.get(r) ?? {} };
        delete o.id;
        let n = { ...o, ...this._map.get(e) };
        return Object.keys(n).length ? n : void 0;
      }
      return this._map.get(e);
    }
    has(e) {
      return this._map.has(e);
    }
  };
function Vr() {
  return new X();
}
var Xt = Vr();
function _o(t, e) {
  return new t({ type: "string", ...f(e) });
}
function go(t, e) {
  return new t({ type: "string", coerce: !0, ...f(e) });
}
function xo(t, e) {
  return new t({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function zo(t, e) {
  return new t({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function vo(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function bo(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...f(e),
  });
}
function $o(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...f(e),
  });
}
function yo(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...f(e),
  });
}
function wo(t, e) {
  return new t({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function ko(t, e) {
  return new t({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Zo(t, e) {
  return new t({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Po(t, e) {
  return new t({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function So(t, e) {
  return new t({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Eo(t, e) {
  return new t({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Io(t, e) {
  return new t({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function To(t, e) {
  return new t({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Oo(t, e) {
  return new t({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Ao(t, e) {
  return new t({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function No(t, e) {
  return new t({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function jo(t, e) {
  return new t({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Co(t, e) {
  return new t({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Ro(t, e) {
  return new t({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Lo(t, e) {
  return new t({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
function Mo(t, e) {
  return new t({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...f(e),
  });
}
var Fo = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
function Do(t, e) {
  return new t({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...f(e),
  });
}
function Uo(t, e) {
  return new t({
    type: "string",
    format: "date",
    check: "string_format",
    ...f(e),
  });
}
function Vo(t, e) {
  return new t({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...f(e),
  });
}
function Bo(t, e) {
  return new t({
    type: "string",
    format: "duration",
    check: "string_format",
    ...f(e),
  });
}
function Jo(t, e) {
  return new t({ type: "number", checks: [], ...f(e) });
}
function Wo(t, e) {
  return new t({ type: "number", coerce: !0, checks: [], ...f(e) });
}
function Go(t, e) {
  return new t({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...f(e),
  });
}
function Ko(t, e) {
  return new t({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "float32",
    ...f(e),
  });
}
function qo(t, e) {
  return new t({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "float64",
    ...f(e),
  });
}
function Yo(t, e) {
  return new t({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "int32",
    ...f(e),
  });
}
function Xo(t, e) {
  return new t({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "uint32",
    ...f(e),
  });
}
function Ho(t, e) {
  return new t({ type: "boolean", ...f(e) });
}
function Qo(t, e) {
  return new t({ type: "boolean", coerce: !0, ...f(e) });
}
function ei(t, e) {
  return new t({ type: "bigint", ...f(e) });
}
function ti(t, e) {
  return new t({ type: "bigint", coerce: !0, ...f(e) });
}
function ri(t, e) {
  return new t({
    type: "bigint",
    check: "bigint_format",
    abort: !1,
    format: "int64",
    ...f(e),
  });
}
function ni(t, e) {
  return new t({
    type: "bigint",
    check: "bigint_format",
    abort: !1,
    format: "uint64",
    ...f(e),
  });
}
function oi(t, e) {
  return new t({ type: "symbol", ...f(e) });
}
function ii(t, e) {
  return new t({ type: "undefined", ...f(e) });
}
function si(t, e) {
  return new t({ type: "null", ...f(e) });
}
function ui(t) {
  return new t({ type: "any" });
}
function nt(t) {
  return new t({ type: "unknown" });
}
function ci(t, e) {
  return new t({ type: "never", ...f(e) });
}
function ai(t, e) {
  return new t({ type: "void", ...f(e) });
}
function li(t, e) {
  return new t({ type: "date", ...f(e) });
}
function pi(t, e) {
  return new t({ type: "date", coerce: !0, ...f(e) });
}
function fi(t, e) {
  return new t({ type: "nan", ...f(e) });
}
function Br(t, e) {
  return new He({ check: "less_than", ...f(e), value: t, inclusive: !1 });
}
function Jr(t, e) {
  return new He({ check: "less_than", ...f(e), value: t, inclusive: !0 });
}
function Wr(t, e) {
  return new Qe({ check: "greater_than", ...f(e), value: t, inclusive: !1 });
}
function Gr(t, e) {
  return new Qe({ check: "greater_than", ...f(e), value: t, inclusive: !0 });
}
function mi(t) {
  return Wr(0, t);
}
function hi(t) {
  return Br(0, t);
}
function di(t) {
  return Jr(0, t);
}
function _i(t) {
  return Gr(0, t);
}
function gi(t, e) {
  return new dt({ check: "multiple_of", ...f(e), value: t });
}
function xi(t, e) {
  return new xt({ check: "max_size", ...f(e), maximum: t });
}
function zi(t, e) {
  return new zt({ check: "min_size", ...f(e), minimum: t });
}
function vi(t, e) {
  return new vt({ check: "size_equals", ...f(e), size: t });
}
function bi(t, e) {
  return new bt({ check: "max_length", ...f(e), maximum: t });
}
function $i(t, e) {
  return new $t({ check: "min_length", ...f(e), minimum: t });
}
function yi(t, e) {
  return new yt({ check: "length_equals", ...f(e), length: t });
}
function wi(t, e) {
  return new wt({
    check: "string_format",
    format: "regex",
    ...f(e),
    pattern: t,
  });
}
function ki(t) {
  return new kt({ check: "string_format", format: "lowercase", ...f(t) });
}
function Zi(t) {
  return new Zt({ check: "string_format", format: "uppercase", ...f(t) });
}
function Pi(t, e) {
  return new Pt({
    check: "string_format",
    format: "includes",
    ...f(e),
    includes: t,
  });
}
function Si(t, e) {
  return new St({
    check: "string_format",
    format: "starts_with",
    ...f(e),
    prefix: t,
  });
}
function Ei(t, e) {
  return new Et({
    check: "string_format",
    format: "ends_with",
    ...f(e),
    suffix: t,
  });
}
function Ii(t, e, r) {
  return new It({ check: "property", property: t, schema: e, ...f(r) });
}
function Ti(t, e) {
  return new Tt({ check: "mime_type", mime: t, ...f(e) });
}
function ce(t) {
  return new Ot({ check: "overwrite", tx: t });
}
function Oi(t) {
  return ce((e) => e.normalize(t));
}
function Ai() {
  return ce((t) => t.trim());
}
function Ni() {
  return ce((t) => t.toLowerCase());
}
function ji() {
  return ce((t) => t.toUpperCase());
}
function Ht(t, e, r) {
  return new t({ type: "array", element: e, ...f(r) });
}
function Ci(t, e, r) {
  return new t({ type: "union", options: e, ...f(r) });
}
function Ri(t, e, r, o) {
  return new t({ type: "union", options: r, discriminator: e, ...f(o) });
}
function Li(t, e, r) {
  return new t({ type: "intersection", left: e, right: r });
}
function Qt(t, e, r, o) {
  let n = r instanceof z, i = n ? o : r, s = n ? r : null;
  return new t({ type: "tuple", items: e, rest: s, ...f(i) });
}
function Mi(t, e, r, o) {
  return new t({ type: "record", keyType: e, valueType: r, ...f(o) });
}
function Fi(t, e, r, o) {
  return new t({ type: "map", keyType: e, valueType: r, ...f(o) });
}
function Di(t, e, r) {
  return new t({ type: "set", valueType: e, ...f(r) });
}
function Ui(t, e, r) {
  let o = Array.isArray(e) ? Object.fromEntries(e.map((n) => [n, n])) : e;
  return new t({ type: "enum", entries: o, ...f(r) });
}
function Vi(t, e, r) {
  return new t({ type: "enum", entries: e, ...f(r) });
}
function Bi(t, e, r) {
  return new t({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...f(r),
  });
}
function Ji(t, e) {
  return new t({ type: "file", ...f(e) });
}
function Wi(t, e) {
  return new t({ type: "transform", transform: e });
}
function Gi(t, e) {
  return new t({ type: "optional", innerType: e });
}
function Ki(t, e) {
  return new t({ type: "nullable", innerType: e });
}
function qi(t, e, r) {
  return new t({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof r == "function" ? r() : r;
    },
  });
}
function Yi(t, e, r) {
  return new t({ type: "nonoptional", innerType: e, ...f(r) });
}
function Xi(t, e) {
  return new t({ type: "success", innerType: e });
}
function Hi(t, e, r) {
  return new t({
    type: "catch",
    innerType: e,
    catchValue: typeof r == "function" ? r : () => r,
  });
}
function Qi(t, e, r) {
  return new t({ type: "pipe", in: e, out: r });
}
function es(t, e) {
  return new t({ type: "readonly", innerType: e });
}
function ts(t, e, r) {
  return new t({ type: "template_literal", parts: e, ...f(r) });
}
function rs(t, e) {
  return new t({ type: "lazy", getter: e });
}
function ns(t, e) {
  return new t({ type: "promise", innerType: e });
}
function os(t, e, r) {
  let o = f(r);
  return o.abort ?? (o.abort = !0),
    new t({ type: "custom", check: "custom", fn: e, ...o });
}
function is(t, e, r) {
  return new t({ type: "custom", check: "custom", fn: e, ...f(r) });
}
function ss(t, e) {
  let r = f(e),
    o = r.truthy ?? ["true", "1", "yes", "on", "y", "enabled"],
    n = r.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  r.case !== "sensitive" &&
    (o = o.map((c) => typeof c == "string" ? c.toLowerCase() : c),
      n = n.map((c) => typeof c == "string" ? c.toLowerCase() : c));
  let i = new Set(o),
    s = new Set(n),
    u = t.Pipe ?? qt,
    p = t.Boolean ?? Wt,
    m = t.String ?? tt,
    h = t.Transform ?? Kt,
    a = new h({
      type: "transform",
      transform: (c, _) => {
        let g = c;
        return r.case !== "sensitive" && (g = g.toLowerCase()),
          i.has(g) ? !0 : s.has(g) ? !1 : (_.issues.push({
            code: "invalid_value",
            expected: "stringbool",
            values: [...i, ...s],
            input: _.value,
            inst: a,
          }),
            {});
      },
      error: r.error,
    }),
    x = new u({
      type: "pipe",
      in: new m({ type: "string", error: r.error }),
      out: a,
      error: r.error,
    });
  return new u({
    type: "pipe",
    in: x,
    out: new p({ type: "boolean", error: r.error }),
    error: r.error,
  });
}
function us(t, e, r, o = {}) {
  let n = f(o),
    i = {
      ...f(o),
      check: "string_format",
      type: "string",
      format: e,
      fn: typeof r == "function" ? r : (u) => r.test(u),
      ...n,
    };
  return r instanceof RegExp && (i.pattern = r), new t(i);
}
var ot = class {
  constructor(e) {
    this._def = e, this.def = e;
  }
  implement(e) {
    if (typeof e != "function") {
      throw new Error("implement() must be called with a function");
    }
    let r = (...o) => {
      let n = this._def.input
        ? be(this._def.input, o, void 0, { callee: r })
        : o;
      if (!Array.isArray(n)) {
        throw new Error(
          "Invalid arguments schema: not an array or tuple schema.",
        );
      }
      let i = e(...n);
      return this._def.output
        ? be(this._def.output, i, void 0, { callee: r })
        : i;
    };
    return r;
  }
  implementAsync(e) {
    if (typeof e != "function") {
      throw new Error("implement() must be called with a function");
    }
    let r = async (...o) => {
      let n = this._def.input
        ? await $e(this._def.input, o, void 0, { callee: r })
        : o;
      if (!Array.isArray(n)) {
        throw new Error(
          "Invalid arguments schema: not an array or tuple schema.",
        );
      }
      let i = await e(...n);
      return this._def.output
        ? $e(this._def.output, i, void 0, { callee: r })
        : i;
    };
    return r;
  }
  input(...e) {
    let r = this.constructor;
    return Array.isArray(e[0])
      ? new r({
        type: "function",
        input: new ue({ type: "tuple", items: e[0], rest: e[1] }),
        output: this._def.output,
      })
      : new r({ type: "function", input: e[0], output: this._def.output });
  }
  output(e) {
    let r = this.constructor;
    return new r({ type: "function", input: this._def.input, output: e });
  }
};
function fs(t) {
  return new ot({
    type: "function",
    input: Array.isArray(t?.input)
      ? Qt(ue, t?.input)
      : t?.input ?? Ht(Gt, nt(rt)),
    output: t?.output ?? nt(rt),
  });
}
var ae = class {
  constructor(e) {
    this.counter = 0,
      this.metadataRegistry = e?.metadata ?? Xt,
      this.target = e?.target ?? "draft-2020-12",
      this.unrepresentable = e?.unrepresentable ?? "throw",
      this.override = e?.override ?? (() => {}),
      this.io = e?.io ?? "output",
      this.seen = new Map();
  }
  process(e, r = { path: [], schemaPath: [] }) {
    var o;
    let n = e._zod.def,
      i = {
        guid: "uuid",
        url: "uri",
        datetime: "date-time",
        json_string: "json-string",
        regex: "",
      },
      s = this.seen.get(e);
    if (s) {
      return s.count++,
        r.schemaPath.includes(e) && (s.cycle = r.path),
        s.schema;
    }
    let u = { schema: {}, count: 1, cycle: void 0, path: r.path };
    this.seen.set(e, u);
    let p = e._zod.toJSONSchema?.();
    if (p) {
      u.schema = p;
    } else {
      let a = { ...r, schemaPath: [...r.schemaPath, e], path: r.path },
        x = e._zod.parent;
      if (x) {
        u.ref = x, this.process(x, a), this.seen.get(x).isParent = !0;
      } else {
        let d = u.schema;
        switch (n.type) {
          case "string": {
            let c = d;
            c.type = "string";
            let {
              minimum: _,
              maximum: g,
              format: y,
              patterns: v,
              contentEncoding: b,
            } = e._zod.bag;
            if (
              typeof _ == "number" && (c.minLength = _),
                typeof g == "number" && (c.maxLength = g),
                y && (c.format = i[y] ?? y, c.format === "" && delete c.format),
                b && (c.contentEncoding = b),
                v && v.size > 0
            ) {
              let w = [...v];
              w.length === 1 ? c.pattern = w[0].source : w.length > 1 &&
                (u.schema.allOf = [
                  ...w.map((H) => ({
                    ...this.target === "draft-7" ? { type: "string" } : {},
                    pattern: H.source,
                  })),
                ]);
            }
            break;
          }
          case "number": {
            let c = d,
              {
                minimum: _,
                maximum: g,
                format: y,
                multipleOf: v,
                exclusiveMaximum: b,
                exclusiveMinimum: w,
              } = e._zod.bag;
            typeof y == "string" && y.includes("int")
              ? c.type = "integer"
              : c.type = "number",
              typeof w == "number" && (c.exclusiveMinimum = w),
              typeof _ == "number" &&
              (c.minimum = _,
                typeof w == "number" &&
                (w >= _ ? delete c.minimum : delete c.exclusiveMinimum)),
              typeof b == "number" && (c.exclusiveMaximum = b),
              typeof g == "number" &&
              (c.maximum = g,
                typeof b == "number" &&
                (b <= g ? delete c.maximum : delete c.exclusiveMaximum)),
              typeof v == "number" && (c.multipleOf = v);
            break;
          }
          case "boolean": {
            let c = d;
            c.type = "boolean";
            break;
          }
          case "bigint": {
            if (this.unrepresentable === "throw") {
              throw new Error("BigInt cannot be represented in JSON Schema");
            }
            break;
          }
          case "symbol": {
            if (this.unrepresentable === "throw") {
              throw new Error("Symbols cannot be represented in JSON Schema");
            }
            break;
          }
          case "null": {
            d.type = "null";
            break;
          }
          case "any":
            break;
          case "unknown":
            break;
          case "undefined": {
            if (this.unrepresentable === "throw") {
              throw new Error("Undefined cannot be represented in JSON Schema");
            }
            break;
          }
          case "void": {
            if (this.unrepresentable === "throw") {
              throw new Error("Void cannot be represented in JSON Schema");
            }
            break;
          }
          case "never": {
            d.not = {};
            break;
          }
          case "date": {
            if (this.unrepresentable === "throw") {
              throw new Error("Date cannot be represented in JSON Schema");
            }
            break;
          }
          case "array": {
            let c = d, { minimum: _, maximum: g } = e._zod.bag;
            typeof _ == "number" && (c.minItems = _),
              typeof g == "number" && (c.maxItems = g),
              c.type = "array",
              c.items = this.process(n.element, {
                ...a,
                path: [...a.path, "items"],
              });
            break;
          }
          case "object": {
            let c = d;
            c.type = "object", c.properties = {};
            let _ = n.shape;
            for (let v in _) {
              c.properties[v] = this.process(_[v], {
                ...a,
                path: [...a.path, "properties", v],
              });
            }
            let g = new Set(Object.keys(_)),
              y = new Set([...g].filter((v) => {
                let b = n.shape[v]._zod;
                return this.io === "input"
                  ? b.optin === void 0
                  : b.optout === void 0;
              }));
            y.size > 0 && (c.required = Array.from(y)),
              n.catchall?._zod.def.type === "never"
                ? c.additionalProperties = !1
                : n.catchall
                ? n.catchall &&
                  (c.additionalProperties = this.process(n.catchall, {
                    ...a,
                    path: [...a.path, "additionalProperties"],
                  }))
                : this.io === "output" && (c.additionalProperties = !1);
            break;
          }
          case "union": {
            let c = d;
            c.anyOf = n.options.map((_, g) =>
              this.process(_, { ...a, path: [...a.path, "anyOf", g] })
            );
            break;
          }
          case "intersection": {
            let c = d,
              _ = this.process(n.left, { ...a, path: [...a.path, "allOf", 0] }),
              g = this.process(n.right, {
                ...a,
                path: [...a.path, "allOf", 1],
              }),
              y = (b) => "allOf" in b && Object.keys(b).length === 1,
              v = [...y(_) ? _.allOf : [_], ...y(g) ? g.allOf : [g]];
            c.allOf = v;
            break;
          }
          case "tuple": {
            let c = d;
            c.type = "array";
            let _ = n.items.map((v, b) =>
              this.process(v, { ...a, path: [...a.path, "prefixItems", b] })
            );
            if (
              this.target === "draft-2020-12" ? c.prefixItems = _ : c.items = _,
                n.rest
            ) {
              let v = this.process(n.rest, {
                ...a,
                path: [...a.path, "items"],
              });
              this.target === "draft-2020-12"
                ? c.items = v
                : c.additionalItems = v;
            }
            n.rest &&
              (c.items = this.process(n.rest, {
                ...a,
                path: [...a.path, "items"],
              }));
            let { minimum: g, maximum: y } = e._zod.bag;
            typeof g == "number" && (c.minItems = g),
              typeof y == "number" && (c.maxItems = y);
            break;
          }
          case "record": {
            let c = d;
            c.type = "object",
              c.propertyNames = this.process(n.keyType, {
                ...a,
                path: [...a.path, "propertyNames"],
              }),
              c.additionalProperties = this.process(n.valueType, {
                ...a,
                path: [...a.path, "additionalProperties"],
              });
            break;
          }
          case "map": {
            if (this.unrepresentable === "throw") {
              throw new Error("Map cannot be represented in JSON Schema");
            }
            break;
          }
          case "set": {
            if (this.unrepresentable === "throw") {
              throw new Error("Set cannot be represented in JSON Schema");
            }
            break;
          }
          case "enum": {
            let c = d, _ = V(n.entries);
            _.every((g) => typeof g == "number") && (c.type = "number"),
              _.every((g) => typeof g == "string") && (c.type = "string"),
              c.enum = _;
            break;
          }
          case "literal": {
            let c = d, _ = [];
            for (let g of n.values) {
              if (g === void 0) {
                if (this.unrepresentable === "throw") {
                  throw new Error(
                    "Literal `undefined` cannot be represented in JSON Schema",
                  );
                }
              } else if (typeof g == "bigint") {
                if (this.unrepresentable === "throw") {
                  throw new Error(
                    "BigInt literals cannot be represented in JSON Schema",
                  );
                }
                _.push(Number(g));
              } else {
                _.push(g);
              }
            }
            if (_.length !== 0) {
              if (_.length === 1) {
                let g = _[0];
                c.type = g === null ? "null" : typeof g, c.const = g;
              } else {
                _.every((g) => typeof g == "number") &&
                (c.type = "number"),
                  _.every((g) => typeof g == "string") && (c.type = "string"),
                  _.every((g) => typeof g == "boolean") && (c.type = "string"),
                  _.every((g) => g === null) && (c.type = "null"),
                  c.enum = _;
              }
            }
            break;
          }
          case "file": {
            let c = d,
              _ = {
                type: "string",
                format: "binary",
                contentEncoding: "binary",
              },
              { minimum: g, maximum: y, mime: v } = e._zod.bag;
            g !== void 0 && (_.minLength = g),
              y !== void 0 && (_.maxLength = y),
              v
                ? v.length === 1
                  ? (_.contentMediaType = v[0], Object.assign(c, _))
                  : c.anyOf = v.map((b) => ({ ..._, contentMediaType: b }))
                : Object.assign(c, _);
            break;
          }
          case "transform": {
            if (this.unrepresentable === "throw") {
              throw new Error(
                "Transforms cannot be represented in JSON Schema",
              );
            }
            break;
          }
          case "nullable": {
            let c = this.process(n.innerType, a);
            d.anyOf = [c, { type: "null" }];
            break;
          }
          case "nonoptional": {
            this.process(n.innerType, a), u.ref = n.innerType;
            break;
          }
          case "success": {
            let c = d;
            c.type = "boolean";
            break;
          }
          case "default": {
            this.process(n.innerType, a),
              u.ref = n.innerType,
              d.default = JSON.parse(JSON.stringify(n.defaultValue));
            break;
          }
          case "prefault": {
            this.process(n.innerType, a),
              u.ref = n.innerType,
              this.io === "input" &&
              (d._prefault = JSON.parse(JSON.stringify(n.defaultValue)));
            break;
          }
          case "catch": {
            this.process(n.innerType, a), u.ref = n.innerType;
            let c;
            try {
              c = n.catchValue(void 0);
            } catch {
              throw new Error(
                "Dynamic catch values are not supported in JSON Schema",
              );
            }
            d.default = c;
            break;
          }
          case "nan": {
            if (this.unrepresentable === "throw") {
              throw new Error("NaN cannot be represented in JSON Schema");
            }
            break;
          }
          case "template_literal": {
            let c = d, _ = e._zod.pattern;
            if (!_) {
              throw new Error("Pattern not found in template literal");
            }
            c.type = "string", c.pattern = _.source;
            break;
          }
          case "pipe": {
            let c = this.io === "input"
              ? n.in._zod.def.type === "transform" ? n.out : n.in
              : n.out;
            this.process(c, a), u.ref = c;
            break;
          }
          case "readonly": {
            this.process(n.innerType, a), u.ref = n.innerType, d.readOnly = !0;
            break;
          }
          case "promise": {
            this.process(n.innerType, a), u.ref = n.innerType;
            break;
          }
          case "optional": {
            this.process(n.innerType, a), u.ref = n.innerType;
            break;
          }
          case "lazy": {
            let c = e._zod.innerType;
            this.process(c, a), u.ref = c;
            break;
          }
          case "custom": {
            if (this.unrepresentable === "throw") {
              throw new Error(
                "Custom types cannot be represented in JSON Schema",
              );
            }
            break;
          }
          default:
        }
      }
    }
    let m = this.metadataRegistry.get(e);
    return m && Object.assign(u.schema, m),
      this.io === "input" && P(e) &&
      (delete u.schema.examples, delete u.schema.default),
      this.io === "input" && u.schema._prefault &&
      ((o = u.schema).default ?? (o.default = u.schema._prefault)),
      delete u.schema._prefault,
      this.seen.get(e).schema;
  }
  emit(e, r) {
    let o = {
        cycles: r?.cycles ?? "ref",
        reused: r?.reused ?? "inline",
        external: r?.external ?? void 0,
      },
      n = this.seen.get(e);
    if (!n) {
      throw new Error("Unprocessed schema. This is a bug in Zod.");
    }
    let i = (h) => {
        let a = this.target === "draft-2020-12" ? "$defs" : "definitions";
        if (o.external) {
          let _ = o.external.registry.get(h[0])?.id,
            g = o.external.uri ?? ((v) => v);
          if (_) {
            return { ref: g(_) };
          }
          let y = h[1].defId ?? h[1].schema.id ?? `schema${this.counter++}`;
          return h[1].defId = y,
            { defId: y, ref: `${g("__shared")}#/${a}/${y}` };
        }
        if (h[1] === n) {
          return { ref: "#" };
        }
        let d = `#/${a}/`, c = h[1].schema.id ?? `__schema${this.counter++}`;
        return { defId: c, ref: d + c };
      },
      s = (h) => {
        if (h[1].schema.$ref) {
          return;
        }
        let a = h[1], { ref: x, defId: d } = i(h);
        a.def = { ...a.schema }, d && (a.defId = d);
        let c = a.schema;
        for (let _ in c) {
          delete c[_];
        }
        c.$ref = x;
      };
    if (o.cycles === "throw") {
      for (let h of this.seen.entries()) {
        let a = h[1];
        if (a.cycle) {
          throw new Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
        }
      }
    }
    for (let h of this.seen.entries()) {
      let a = h[1];
      if (e === h[0]) {
        s(h);
        continue;
      }
      if (o.external) {
        let d = o.external.registry.get(h[0])?.id;
        if (e !== h[0] && d) {
          s(h);
          continue;
        }
      }
      if (this.metadataRegistry.get(h[0])?.id) {
        s(h);
        continue;
      }
      if (a.cycle) {
        s(h);
        continue;
      }
      if (a.count > 1 && o.reused === "ref") {
        s(h);
        continue;
      }
    }
    let u = (h, a) => {
      let x = this.seen.get(h), d = x.def ?? x.schema, c = { ...d };
      if (x.ref === null) {
        return;
      }
      let _ = x.ref;
      if (x.ref = null, _) {
        u(_, a);
        let g = this.seen.get(_).schema;
        g.$ref && a.target === "draft-7"
          ? (d.allOf = d.allOf ?? [], d.allOf.push(g))
          : (Object.assign(d, g), Object.assign(d, c));
      }
      x.isParent ||
        this.override({ zodSchema: h, jsonSchema: d, path: x.path ?? [] });
    };
    for (let h of [...this.seen.entries()].reverse()) {
      u(h[0], { target: this.target });
    }
    let p = {};
    if (
      this.target === "draft-2020-12"
        ? p.$schema = "https://json-schema.org/draft/2020-12/schema"
        : this.target === "draft-7"
        ? p.$schema = "http://json-schema.org/draft-07/schema#"
        : console.warn(`Invalid target: ${this.target}`), o.external?.uri
    ) {
      let h = o.external.registry.get(e)?.id;
      if (!h) {
        throw new Error("Schema is missing an `id` property");
      }
      p.$id = o.external.uri(h);
    }
    Object.assign(p, n.def);
    let m = o.external?.defs ?? {};
    for (let h of this.seen.entries()) {
      let a = h[1];
      a.def && a.defId && (m[a.defId] = a.def);
    }
    o.external ||
      Object.keys(m).length > 0 &&
        (this.target === "draft-2020-12" ? p.$defs = m : p.definitions = m);
    try {
      return JSON.parse(JSON.stringify(p));
    } catch {
      throw new Error("Error converting schema to JSON.");
    }
  }
};
function _s(t, e) {
  if (t instanceof X) {
    let o = new ae(e), n = {};
    for (let u of t._idmap.entries()) {
      let [p, m] = u;
      o.process(m);
    }
    let i = {}, s = { registry: t, uri: e?.uri, defs: n };
    for (let u of t._idmap.entries()) {
      let [p, m] = u;
      i[p] = o.emit(m, { ...e, external: s });
    }
    if (Object.keys(n).length > 0) {
      let u = o.target === "draft-2020-12" ? "$defs" : "definitions";
      i.__shared = { [u]: n };
    }
    return { schemas: i };
  }
  let r = new ae(e);
  return r.process(t), r.emit(t, e);
}
function P(t, e) {
  let r = e ?? { seen: new Set() };
  if (r.seen.has(t)) {
    return !1;
  }
  r.seen.add(t);
  let n = t._zod.def;
  switch (n.type) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
    case "date":
    case "symbol":
    case "undefined":
    case "null":
    case "any":
    case "unknown":
    case "never":
    case "void":
    case "literal":
    case "enum":
    case "nan":
    case "file":
    case "template_literal":
      return !1;
    case "array":
      return P(n.element, r);
    case "object": {
      for (let i in n.shape) {
        if (P(n.shape[i], r)) {
          return !0;
        }
      }
      return !1;
    }
    case "union": {
      for (let i of n.options) {
        if (P(i, r)) {
          return !0;
        }
      }
      return !1;
    }
    case "intersection":
      return P(n.left, r) || P(n.right, r);
    case "tuple": {
      for (let i of n.items) {
        if (P(i, r)) {
          return !0;
        }
      }
      return !!(n.rest && P(n.rest, r));
    }
    case "record":
      return P(n.keyType, r) || P(n.valueType, r);
    case "map":
      return P(n.keyType, r) || P(n.valueType, r);
    case "set":
      return P(n.valueType, r);
    case "promise":
    case "optional":
    case "nonoptional":
    case "nullable":
    case "readonly":
      return P(n.innerType, r);
    case "lazy":
      return P(n.getter(), r);
    case "default":
      return P(n.innerType, r);
    case "prefault":
      return P(n.innerType, r);
    case "custom":
      return !1;
    case "transform":
      return !0;
    case "pipe":
      return P(n.in, r) || P(n.out, r);
    case "success":
      return !1;
    case "catch":
      return !1;
    default:
  }
  throw new Error(`Unknown schema type: ${n.type}`);
}
var Kr = {};
export {
  $e as parseAsync,
  $i as _minLength,
  $n as $ZodISODate,
  $o as _uuidv6,
  $r as toDotPath,
  $t as $ZodCheckMinLength,
  _i as _nonnegative,
  _n as $ZodCUID,
  _o as _string,
  _s as toJSONSchema,
  _t as $ZodCheckNumberFormat,
  ae as JSONSchemaGenerator,
  Ai as _trim,
  ai as _void,
  An as $ZodCustomStringFormat,
  Ao as _ipv6,
  ao as $ZodLazy,
  at as safeParse,
  be as parse,
  Bi as _literal,
  bi as _maxLength,
  Bn as $ZodDiscriminatedUnion,
  bn as $ZodISODateTime,
  Bo as _isoDuration,
  bo as _uuidv4,
  Br as _lt,
  bt as $ZodCheckMaxLength,
  ce as _overwrite,
  Ci as _union,
  ci as _never,
  Cn as $ZodSymbol,
  Co as _base64,
  co as $ZodPromise,
  ct as $ZodError,
  Di as _set,
  di as _nonpositive,
  Dn as $ZodVoid,
  dn as $ZodNanoID,
  Do as _isoDateTime,
  Dr as $ZodBigInt,
  dt as $ZodCheckMultipleOf,
  Ei as _endsWith,
  ei as _bigint,
  En as $ZodBase64,
  en as formatError,
  Eo as _ulid,
  eo as $ZodDefault,
  es as _readonly,
  Et as $ZodCheckEndsWith,
  Fi as _map,
  fi as _nan,
  Fn as $ZodNever,
  fn as $ZodEmail,
  Fo as TimePrecision,
  fo as $output,
  Fr as $ZodNumber,
  fs as function,
  Gi as _optional,
  gi as _multipleOf,
  Gn as $ZodMap,
  gn as $ZodCUID2,
  Go as _int,
  go as _coercedString,
  Gr as _gte,
  Gr as _min,
  Gt as $ZodArray,
  gt as $ZodCheckBigIntFormat,
  He as $ZodCheckLessThan,
  Hi as _catch,
  hi as _negative,
  Hn as $ZodOptional,
  hn as $ZodEmoji,
  Ho as _boolean,
  Ht as _array,
  I as config,
  Ii as _property,
  ii as _undefined,
  In as $ZodBase64URL,
  Io as _xid,
  io as $ZodNaN,
  is as _refine,
  It as $ZodCheckProperty,
  j as clone,
  Ji as _file,
  ji as _toUpperCase,
  Jn as $ZodIntersection,
  jn as $ZodBigIntFormat,
  Jo as _number,
  jo as _cidrv6,
  Jr as _lte,
  Jr as _max,
  Jt as isValidBase64,
  k as $ZodStringFormat,
  Ki as _nullable,
  ki as _lowercase,
  Kn as $ZodSet,
  kn as $ZodIPv4,
  Ko as _float32,
  ko as _emoji,
  Kr as JSONSchema,
  kr as _parseAsync,
  ks as locales,
  Kt as $ZodTransform,
  kt as $ZodCheckLowerCase,
  L as util,
  l as $constructor,
  Li as _intersection,
  li as _date,
  Ln as $ZodNull,
  ln as $ZodGUID,
  Lo as _e164,
  lo as $ZodCustom,
  Lr as isValidBase64URL,
  lt as safeParseAsync,
  Mi as _record,
  mi as _positive,
  Mn as $ZodAny,
  mn as $ZodURL,
  Mo as _jwt,
  mo as $input,
  Mr as isValidJWT,
  ne as regexes,
  Ni as _toLowerCase,
  ni as _uint64,
  Nn as $ZodNumberFormat,
  No as _cidrv4,
  no as $ZodSuccess,
  ns as _promise,
  Nt as version,
  nt as _unknown,
  O as $ZodAsyncError,
  oe as Doc,
  Oi as _normalize,
  oi as _symbol,
  On as $ZodJWT,
  Oo as _ipv4,
  oo as $ZodCatch,
  os as _custom,
  Ot as $ZodCheckOverwrite,
  ot as $ZodFunction,
  Pi as _includes,
  pi as _coercedDate,
  Pn as $ZodCIDRv4,
  pn as $ZodUUID,
  Po as _cuid,
  Pr as _safeParseAsync,
  Pt as $ZodCheckIncludes,
  Q as globalConfig,
  q as $ZodRealError,
  Qe as $ZodCheckGreaterThan,
  Qi as _pipe,
  qi as _default,
  Qn as $ZodNullable,
  qn as $ZodEnum,
  Qo as _coercedBoolean,
  qo as _float64,
  Qr as flattenError,
  Qt as _tuple,
  qt as $ZodPipe,
  Ri as _discriminatedUnion,
  ri as _int64,
  Rn as $ZodUndefined,
  rn as prettifyError,
  Ro as _base64url,
  ro as $ZodNonOptional,
  rs as _lazy,
  rt as $ZodUnknown,
  Si as _startsWith,
  si as _null,
  Sn as $ZodCIDRv6,
  So as _cuid2,
  so as $ZodReadonly,
  ss as _stringbool,
  St as $ZodCheckStartsWith,
  Ti as _mime,
  ti as _coercedBigint,
  Tn as $ZodE164,
  tn as treeifyError,
  To as _ksuid,
  to as $ZodPrefault,
  ts as _templateLiteral,
  Tt as $ZodCheckMimeType,
  tt as $ZodString,
  ue as $ZodTuple,
  Ui as _enum,
  ui as _any,
  Un as $ZodDate,
  Uo as _isoDate,
  uo as $ZodTemplateLiteral,
  Ur as $ZodUnion,
  us as _stringFormat,
  Vi as _nativeEnum,
  vi as _size,
  Vn as $ZodObject,
  vn as $ZodKSUID,
  Vo as _isoTime,
  vo as _uuid,
  Vr as registry,
  vt as $ZodCheckSizeEquals,
  Wi as _transform,
  wi as _regex,
  Wn as $ZodRecord,
  wn as $ZodISODuration,
  Wo as _coercedNumber,
  wo as _url,
  Wr as _gt,
  wr as _parse,
  Wt as $ZodBoolean,
  wt as $ZodCheckRegex,
  X as $ZodRegistry,
  Xi as _success,
  xi as _maxSize,
  Xn as $ZodFile,
  xn as $ZodULID,
  Xo as _uint32,
  xo as _email,
  Xr as $brand,
  Xt as globalRegistry,
  xt as $ZodCheckMaxSize,
  Y as $ZodCheckStringFormat,
  Yi as _nonoptional,
  yi as _length,
  Yn as $ZodLiteral,
  yn as $ZodISOTime,
  Yo as _int32,
  yo as _uuidv7,
  Yr as NEVER,
  yt as $ZodCheckLengthEquals,
  Z as $ZodCheck,
  z as $ZodType,
  Zi as _uppercase,
  zi as _minSize,
  Zn as $ZodIPv6,
  zn as $ZodXID,
  Zo as _nanoid,
  zo as _guid,
  Zr as _safeParse,
  Zt as $ZodCheckUpperCase,
  zt as $ZodCheckMinSize,
};
//# sourceMappingURL=core.mjs.map
