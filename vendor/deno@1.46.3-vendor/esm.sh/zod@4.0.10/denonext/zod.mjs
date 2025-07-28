/* esm.sh - zod@4.0.10 */
var Fr = Object.defineProperty;
var V = (e, o) => {
  for (var t in o) {
    Fr(e, t, { get: o[t], enumerable: !0 });
  }
};
var Ge = {};
V(Ge, {
  $brand: () => vt,
  $input: () => kt,
  $output: () => Zt,
  NEVER: () => Ot,
  TimePrecision: () => Pt,
  ZodAny: () => nr,
  ZodArray: () => ar,
  ZodBase64: () => Te,
  ZodBase64URL: () => Pe,
  ZodBigInt: () => S,
  ZodBigIntFormat: () => Ee,
  ZodBoolean: () => z,
  ZodCIDRv4: () => ze,
  ZodCIDRv6: () => Se,
  ZodCUID: () => Ze,
  ZodCUID2: () => ke,
  ZodCatch: () => zr,
  ZodCustom: () => M,
  ZodCustomStringFormat: () => Ye,
  ZodDate: () => C,
  ZodDefault: () => kr,
  ZodDiscriminatedUnion: () => pr,
  ZodE164: () => Oe,
  ZodEmail: () => xe,
  ZodEmoji: () => _e,
  ZodEnum: () => b,
  ZodError: () => Qr,
  ZodFile: () => yr,
  ZodFirstPartyTypeKind: () => Ve,
  ZodGUID: () => U,
  ZodIPv4: () => Ie,
  ZodIPv6: () => we,
  ZodISODate: () => D,
  ZodISODateTime: () => O,
  ZodISODuration: () => N,
  ZodISOTime: () => E,
  ZodIntersection: () => lr,
  ZodIssueCode: () => nt,
  ZodJWT: () => De,
  ZodKSUID: () => be,
  ZodLazy: () => Er,
  ZodLiteral: () => gr,
  ZodMap: () => fr,
  ZodNaN: () => Tr,
  ZodNanoID: () => ye,
  ZodNever: () => ir,
  ZodNonOptional: () => Be,
  ZodNull: () => or,
  ZodNullable: () => Zr,
  ZodNumber: () => w,
  ZodNumberFormat: () => v,
  ZodObject: () => B,
  ZodOptional: () => Ce,
  ZodPipe: () => Me,
  ZodPrefault: () => $r,
  ZodPromise: () => jr,
  ZodReadonly: () => Pr,
  ZodRealError: () => k,
  ZodRecord: () => Ae,
  ZodSet: () => hr,
  ZodString: () => I,
  ZodStringFormat: () => a,
  ZodSuccess: () => wr,
  ZodSymbol: () => er,
  ZodTemplateLiteral: () => Dr,
  ZodTransform: () => Le,
  ZodTuple: () => dr,
  ZodType: () => i,
  ZodULID: () => ve,
  ZodURL: () => ge,
  ZodUUID: () => h,
  ZodUndefined: () => rr,
  ZodUnion: () => Ue,
  ZodUnknown: () => cr,
  ZodVoid: () => ur,
  ZodXID: () => $e,
  _ZodString: () => he,
  _default: () => vr,
  any: () => No,
  array: () => je,
  base64: () => Zo,
  base64url: () => ko,
  bigint: () => To,
  boolean: () => Qe,
  catch: () => Sr,
  check: () => Ur,
  cidrv4: () => _o,
  cidrv6: () => yo,
  clone: () => $t,
  coerce: () => Ke,
  config: () => _t,
  core: () => ht,
  cuid: () => lo,
  cuid2: () => so,
  custom: () => Qo,
  date: () => Uo,
  discriminatedUnion: () => Co,
  e164: () => vo,
  email: () => ro,
  emoji: () => ao,
  endsWith: () => q,
  enum: () => xr,
  file: () => Go,
  flattenError: () => St,
  float32: () => Io,
  float64: () => wo,
  formatError: () => zt,
  function: () => yt,
  getErrorMap: () => it,
  globalRegistry: () => xt,
  gt: () => y,
  gte: () => d,
  guid: () => oo,
  includes: () => J,
  instanceof: () => et,
  int: () => fe,
  int32: () => zo,
  int64: () => Po,
  intersection: () => sr,
  ipv4: () => xo,
  ipv6: () => go,
  iso: () => j,
  json: () => ot,
  jwt: () => $o,
  keyof: () => Ro,
  ksuid: () => ho,
  lazy: () => Nr,
  length: () => P,
  literal: () => _r,
  locales: () => Dt,
  looseObject: () => Fo,
  lowercase: () => K,
  lt: () => _,
  lte: () => f,
  map: () => Vo,
  maxLength: () => T,
  maxSize: () => Kr,
  mime: () => qr,
  minLength: () => Z,
  minSize: () => Gr,
  multipleOf: () => $,
  nan: () => qo,
  nanoid: () => po,
  nativeEnum: () => Ko,
  negative: () => Mr,
  never: () => Ne,
  nonnegative: () => Wr,
  nonoptional: () => Ir,
  nonpositive: () => Vr,
  normalize: () => H,
  null: () => tr,
  nullable: () => L,
  nullish: () => Jo,
  number: () => He,
  object: () => Ao,
  optional: () => A,
  overwrite: () => Y,
  parse: () => pe,
  parseAsync: () => le,
  partialRecord: () => Mo,
  pipe: () => F,
  positive: () => Br,
  prefault: () => br,
  preprocess: () => tt,
  prettifyError: () => wt,
  promise: () => Ho,
  property: () => Xr,
  readonly: () => Or,
  record: () => mr,
  refine: () => Rr,
  regex: () => W,
  regexes: () => bt,
  registry: () => gt,
  safeParse: () => se,
  safeParseAsync: () => de,
  set: () => Wo,
  setErrorMap: () => ct,
  size: () => Jr,
  startsWith: () => X,
  strictObject: () => Lo,
  string: () => me,
  stringFormat: () => bo,
  stringbool: () => rt,
  success: () => Xo,
  superRefine: () => Ar,
  symbol: () => Do,
  templateLiteral: () => Yo,
  toJSONSchema: () => Tt,
  toLowerCase: () => ee,
  toUpperCase: () => re,
  transform: () => Fe,
  treeifyError: () => It,
  trim: () => Q,
  tuple: () => Bo,
  uint32: () => So,
  uint64: () => Oo,
  ulid: () => mo,
  undefined: () => Eo,
  union: () => Re,
  unknown: () => R,
  uppercase: () => G,
  url: () => uo,
  uuid: () => to,
  uuidv4: () => no,
  uuidv6: () => co,
  uuidv7: () => io,
  void: () => jo,
  xid: () => fo,
});
import * as ht from "./v4/core.mjs";
import * as r from "./v4/core.mjs";
import { util as u } from "./v4/core.mjs";
import {
  _endsWith as q,
  _gt as y,
  _gte as d,
  _includes as J,
  _length as P,
  _lowercase as K,
  _lt as _,
  _lte as f,
  _maxLength as T,
  _maxSize as Kr,
  _mime as qr,
  _minLength as Z,
  _minSize as Gr,
  _multipleOf as $,
  _negative as Mr,
  _nonnegative as Wr,
  _nonpositive as Vr,
  _normalize as H,
  _overwrite as Y,
  _positive as Br,
  _property as Xr,
  _regex as W,
  _size as Jr,
  _startsWith as X,
  _toLowerCase as ee,
  _toUpperCase as re,
  _trim as Q,
  _uppercase as G,
} from "./v4/core.mjs";
var j = {};
V(j, {
  ZodISODate: () => D,
  ZodISODateTime: () => O,
  ZodISODuration: () => N,
  ZodISOTime: () => E,
  date: () => te,
  datetime: () => oe,
  duration: () => ce,
  time: () => ne,
});
import * as p from "./v4/core.mjs";
var O = p.$constructor("ZodISODateTime", (e, o) => {
  p.$ZodISODateTime.init(e, o), a.init(e, o);
});
function oe(e) {
  return p._isoDateTime(O, e);
}
var D = p.$constructor("ZodISODate", (e, o) => {
  p.$ZodISODate.init(e, o), a.init(e, o);
});
function te(e) {
  return p._isoDate(D, e);
}
var E = p.$constructor("ZodISOTime", (e, o) => {
  p.$ZodISOTime.init(e, o), a.init(e, o);
});
function ne(e) {
  return p._isoTime(E, e);
}
var N = p.$constructor("ZodISODuration", (e, o) => {
  p.$ZodISODuration.init(e, o), a.init(e, o);
});
function ce(e) {
  return p._isoDuration(N, e);
}
import * as x from "./v4/core.mjs";
import * as g from "./v4/core.mjs";
import { $ZodError as Hr } from "./v4/core.mjs";
function ie(e, o = "|") {
  return e.map((t) => ae(t)).join(o);
}
function ue(e, o) {
  return typeof o == "bigint" ? o.toString() : o;
}
function Yr(e) {
  return {
    get value() {
      {
        let t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
      throw new Error("cached value already set");
    },
  };
}
var jt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
var Ut = Yr(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) {
    return !1;
  }
  try {
    let e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function ae(e) {
  return typeof e == "bigint"
    ? e.toString() + "n"
    : typeof e == "string"
    ? `"${e}"`
    : `${e}`;
}
var Rt = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
var qe = (e, o) => {
    Hr.init(e, o),
      e.name = "ZodError",
      Object.defineProperties(e, {
        format: { value: (t) => g.formatError(e, t) },
        flatten: { value: (t) => g.flattenError(e, t) },
        addIssue: {
          value: (t) => {
            e.issues.push(t), e.message = JSON.stringify(e.issues, ue, 2);
          },
        },
        addIssues: {
          value: (t) => {
            e.issues.push(...t), e.message = JSON.stringify(e.issues, ue, 2);
          },
        },
        isEmpty: {
          get() {
            return e.issues.length === 0;
          },
        },
      });
  },
  Qr = g.$constructor("ZodError", qe),
  k = g.$constructor("ZodError", qe, { Parent: Error });
var pe = x._parse(k),
  le = x._parseAsync(k),
  se = x._safeParse(k),
  de = x._safeParseAsync(k);
var i = r.$constructor(
    "ZodType",
    (
      e,
      o,
    ) => (r.$ZodType.init(e, o),
      e.def = o,
      Object.defineProperty(e, "_def", { value: o }),
      e.check = (...t) =>
        e.clone({
          ...o,
          checks: [
            ...o.checks ?? [],
            ...t.map((n) =>
              typeof n == "function"
                ? { _zod: { check: n, def: { check: "custom" }, onattach: [] } }
                : n
            ),
          ],
        }),
      e.clone = (t, n) => r.clone(e, t, n),
      e.brand = () => e,
      e.register = (t, n) => (t.add(e, n), e),
      e.parse = (t, n) => pe(e, t, n, { callee: e.parse }),
      e.safeParse = (t, n) => se(e, t, n),
      e.parseAsync = async (t, n) => le(e, t, n, { callee: e.parseAsync }),
      e.safeParseAsync = async (t, n) => de(e, t, n),
      e.spa = e.safeParseAsync,
      e.refine = (t, n) => e.check(Rr(t, n)),
      e.superRefine = (t) => e.check(Ar(t)),
      e.overwrite = (t) => e.check(Y(t)),
      e.optional = () => A(e),
      e.nullable = () => L(e),
      e.nullish = () => A(L(e)),
      e.nonoptional = (t) => Ir(e, t),
      e.array = () => je(e),
      e.or = (t) => Re([e, t]),
      e.and = (t) => sr(e, t),
      e.transform = (t) => F(e, Fe(t)),
      e.default = (t) => vr(e, t),
      e.prefault = (t) => br(e, t),
      e.catch = (t) => Sr(e, t),
      e.pipe = (t) => F(e, t),
      e.readonly = () => Or(e),
      e.describe = (t) => {
        let n = e.clone();
        return r.globalRegistry.add(n, { description: t }), n;
      },
      Object.defineProperty(e, "description", {
        get() {
          return r.globalRegistry.get(e)?.description;
        },
        configurable: !0,
      }),
      e.meta = (...t) => {
        if (t.length === 0) {
          return r.globalRegistry.get(e);
        }
        let n = e.clone();
        return r.globalRegistry.add(n, t[0]), n;
      },
      e.isOptional = () => e.safeParse(void 0).success,
      e.isNullable = () => e.safeParse(null).success,
      e),
  ),
  he = r.$constructor("_ZodString", (e, o) => {
    r.$ZodString.init(e, o), i.init(e, o);
    let t = e._zod.bag;
    e.format = t.format ?? null,
      e.minLength = t.minimum ?? null,
      e.maxLength = t.maximum ?? null,
      e.regex = (...n) => e.check(W(...n)),
      e.includes = (...n) => e.check(J(...n)),
      e.startsWith = (...n) => e.check(X(...n)),
      e.endsWith = (...n) => e.check(q(...n)),
      e.min = (...n) => e.check(Z(...n)),
      e.max = (...n) => e.check(T(...n)),
      e.length = (...n) => e.check(P(...n)),
      e.nonempty = (...n) => e.check(Z(1, ...n)),
      e.lowercase = (n) => e.check(K(n)),
      e.uppercase = (n) => e.check(G(n)),
      e.trim = () => e.check(Q()),
      e.normalize = (...n) => e.check(H(...n)),
      e.toLowerCase = () => e.check(ee()),
      e.toUpperCase = () => e.check(re());
  }),
  I = r.$constructor("ZodString", (e, o) => {
    r.$ZodString.init(e, o),
      he.init(e, o),
      e.email = (t) => e.check(r._email(xe, t)),
      e.url = (t) => e.check(r._url(ge, t)),
      e.jwt = (t) => e.check(r._jwt(De, t)),
      e.emoji = (t) => e.check(r._emoji(_e, t)),
      e.guid = (t) => e.check(r._guid(U, t)),
      e.uuid = (t) => e.check(r._uuid(h, t)),
      e.uuidv4 = (t) => e.check(r._uuidv4(h, t)),
      e.uuidv6 = (t) => e.check(r._uuidv6(h, t)),
      e.uuidv7 = (t) => e.check(r._uuidv7(h, t)),
      e.nanoid = (t) => e.check(r._nanoid(ye, t)),
      e.guid = (t) => e.check(r._guid(U, t)),
      e.cuid = (t) => e.check(r._cuid(Ze, t)),
      e.cuid2 = (t) => e.check(r._cuid2(ke, t)),
      e.ulid = (t) => e.check(r._ulid(ve, t)),
      e.base64 = (t) => e.check(r._base64(Te, t)),
      e.base64url = (t) => e.check(r._base64url(Pe, t)),
      e.xid = (t) => e.check(r._xid($e, t)),
      e.ksuid = (t) => e.check(r._ksuid(be, t)),
      e.ipv4 = (t) => e.check(r._ipv4(Ie, t)),
      e.ipv6 = (t) => e.check(r._ipv6(we, t)),
      e.cidrv4 = (t) => e.check(r._cidrv4(ze, t)),
      e.cidrv6 = (t) => e.check(r._cidrv6(Se, t)),
      e.e164 = (t) => e.check(r._e164(Oe, t)),
      e.datetime = (t) => e.check(oe(t)),
      e.date = (t) => e.check(te(t)),
      e.time = (t) => e.check(ne(t)),
      e.duration = (t) => e.check(ce(t));
  });
function me(e) {
  return r._string(I, e);
}
var a = r.$constructor("ZodStringFormat", (e, o) => {
    r.$ZodStringFormat.init(e, o), he.init(e, o);
  }),
  xe = r.$constructor("ZodEmail", (e, o) => {
    r.$ZodEmail.init(e, o), a.init(e, o);
  });
function ro(e) {
  return r._email(xe, e);
}
var U = r.$constructor("ZodGUID", (e, o) => {
  r.$ZodGUID.init(e, o), a.init(e, o);
});
function oo(e) {
  return r._guid(U, e);
}
var h = r.$constructor("ZodUUID", (e, o) => {
  r.$ZodUUID.init(e, o), a.init(e, o);
});
function to(e) {
  return r._uuid(h, e);
}
function no(e) {
  return r._uuidv4(h, e);
}
function co(e) {
  return r._uuidv6(h, e);
}
function io(e) {
  return r._uuidv7(h, e);
}
var ge = r.$constructor("ZodURL", (e, o) => {
  r.$ZodURL.init(e, o), a.init(e, o);
});
function uo(e) {
  return r._url(ge, e);
}
var _e = r.$constructor("ZodEmoji", (e, o) => {
  r.$ZodEmoji.init(e, o), a.init(e, o);
});
function ao(e) {
  return r._emoji(_e, e);
}
var ye = r.$constructor("ZodNanoID", (e, o) => {
  r.$ZodNanoID.init(e, o), a.init(e, o);
});
function po(e) {
  return r._nanoid(ye, e);
}
var Ze = r.$constructor("ZodCUID", (e, o) => {
  r.$ZodCUID.init(e, o), a.init(e, o);
});
function lo(e) {
  return r._cuid(Ze, e);
}
var ke = r.$constructor("ZodCUID2", (e, o) => {
  r.$ZodCUID2.init(e, o), a.init(e, o);
});
function so(e) {
  return r._cuid2(ke, e);
}
var ve = r.$constructor("ZodULID", (e, o) => {
  r.$ZodULID.init(e, o), a.init(e, o);
});
function mo(e) {
  return r._ulid(ve, e);
}
var $e = r.$constructor("ZodXID", (e, o) => {
  r.$ZodXID.init(e, o), a.init(e, o);
});
function fo(e) {
  return r._xid($e, e);
}
var be = r.$constructor("ZodKSUID", (e, o) => {
  r.$ZodKSUID.init(e, o), a.init(e, o);
});
function ho(e) {
  return r._ksuid(be, e);
}
var Ie = r.$constructor("ZodIPv4", (e, o) => {
  r.$ZodIPv4.init(e, o), a.init(e, o);
});
function xo(e) {
  return r._ipv4(Ie, e);
}
var we = r.$constructor("ZodIPv6", (e, o) => {
  r.$ZodIPv6.init(e, o), a.init(e, o);
});
function go(e) {
  return r._ipv6(we, e);
}
var ze = r.$constructor("ZodCIDRv4", (e, o) => {
  r.$ZodCIDRv4.init(e, o), a.init(e, o);
});
function _o(e) {
  return r._cidrv4(ze, e);
}
var Se = r.$constructor("ZodCIDRv6", (e, o) => {
  r.$ZodCIDRv6.init(e, o), a.init(e, o);
});
function yo(e) {
  return r._cidrv6(Se, e);
}
var Te = r.$constructor("ZodBase64", (e, o) => {
  r.$ZodBase64.init(e, o), a.init(e, o);
});
function Zo(e) {
  return r._base64(Te, e);
}
var Pe = r.$constructor("ZodBase64URL", (e, o) => {
  r.$ZodBase64URL.init(e, o), a.init(e, o);
});
function ko(e) {
  return r._base64url(Pe, e);
}
var Oe = r.$constructor("ZodE164", (e, o) => {
  r.$ZodE164.init(e, o), a.init(e, o);
});
function vo(e) {
  return r._e164(Oe, e);
}
var De = r.$constructor("ZodJWT", (e, o) => {
  r.$ZodJWT.init(e, o), a.init(e, o);
});
function $o(e) {
  return r._jwt(De, e);
}
var Ye = r.$constructor("ZodCustomStringFormat", (e, o) => {
  r.$ZodCustomStringFormat.init(e, o), a.init(e, o);
});
function bo(e, o, t = {}) {
  return r._stringFormat(Ye, e, o, t);
}
var w = r.$constructor("ZodNumber", (e, o) => {
  r.$ZodNumber.init(e, o),
    i.init(e, o),
    e.gt = (n, c) => e.check(y(n, c)),
    e.gte = (n, c) => e.check(d(n, c)),
    e.min = (n, c) => e.check(d(n, c)),
    e.lt = (n, c) => e.check(_(n, c)),
    e.lte = (n, c) => e.check(f(n, c)),
    e.max = (n, c) => e.check(f(n, c)),
    e.int = (n) => e.check(fe(n)),
    e.safe = (n) => e.check(fe(n)),
    e.positive = (n) => e.check(y(0, n)),
    e.nonnegative = (n) => e.check(d(0, n)),
    e.negative = (n) => e.check(_(0, n)),
    e.nonpositive = (n) => e.check(f(0, n)),
    e.multipleOf = (n, c) => e.check($(n, c)),
    e.step = (n, c) => e.check($(n, c)),
    e.finite = () => e;
  let t = e._zod.bag;
  e.minValue = Math.max(
    t.minimum ?? Number.NEGATIVE_INFINITY,
    t.exclusiveMinimum ?? Number.NEGATIVE_INFINITY,
  ) ?? null,
    e.maxValue = Math.min(
      t.maximum ?? Number.POSITIVE_INFINITY,
      t.exclusiveMaximum ?? Number.POSITIVE_INFINITY,
    ) ?? null,
    e.isInt = (t.format ?? "").includes("int") ||
      Number.isSafeInteger(t.multipleOf ?? .5),
    e.isFinite = !0,
    e.format = t.format ?? null;
});
function He(e) {
  return r._number(w, e);
}
var v = r.$constructor("ZodNumberFormat", (e, o) => {
  r.$ZodNumberFormat.init(e, o), w.init(e, o);
});
function fe(e) {
  return r._int(v, e);
}
function Io(e) {
  return r._float32(v, e);
}
function wo(e) {
  return r._float64(v, e);
}
function zo(e) {
  return r._int32(v, e);
}
function So(e) {
  return r._uint32(v, e);
}
var z = r.$constructor("ZodBoolean", (e, o) => {
  r.$ZodBoolean.init(e, o), i.init(e, o);
});
function Qe(e) {
  return r._boolean(z, e);
}
var S = r.$constructor("ZodBigInt", (e, o) => {
  r.$ZodBigInt.init(e, o),
    i.init(e, o),
    e.gte = (n, c) => e.check(d(n, c)),
    e.min = (n, c) => e.check(d(n, c)),
    e.gt = (n, c) => e.check(y(n, c)),
    e.gte = (n, c) => e.check(d(n, c)),
    e.min = (n, c) => e.check(d(n, c)),
    e.lt = (n, c) => e.check(_(n, c)),
    e.lte = (n, c) => e.check(f(n, c)),
    e.max = (n, c) => e.check(f(n, c)),
    e.positive = (n) => e.check(y(BigInt(0), n)),
    e.negative = (n) => e.check(_(BigInt(0), n)),
    e.nonpositive = (n) => e.check(f(BigInt(0), n)),
    e.nonnegative = (n) => e.check(d(BigInt(0), n)),
    e.multipleOf = (n, c) => e.check($(n, c));
  let t = e._zod.bag;
  e.minValue = t.minimum ?? null,
    e.maxValue = t.maximum ?? null,
    e.format = t.format ?? null;
});
function To(e) {
  return r._bigint(S, e);
}
var Ee = r.$constructor("ZodBigIntFormat", (e, o) => {
  r.$ZodBigIntFormat.init(e, o), S.init(e, o);
});
function Po(e) {
  return r._int64(Ee, e);
}
function Oo(e) {
  return r._uint64(Ee, e);
}
var er = r.$constructor("ZodSymbol", (e, o) => {
  r.$ZodSymbol.init(e, o), i.init(e, o);
});
function Do(e) {
  return r._symbol(er, e);
}
var rr = r.$constructor("ZodUndefined", (e, o) => {
  r.$ZodUndefined.init(e, o), i.init(e, o);
});
function Eo(e) {
  return r._undefined(rr, e);
}
var or = r.$constructor("ZodNull", (e, o) => {
  r.$ZodNull.init(e, o), i.init(e, o);
});
function tr(e) {
  return r._null(or, e);
}
var nr = r.$constructor("ZodAny", (e, o) => {
  r.$ZodAny.init(e, o), i.init(e, o);
});
function No() {
  return r._any(nr);
}
var cr = r.$constructor("ZodUnknown", (e, o) => {
  r.$ZodUnknown.init(e, o), i.init(e, o);
});
function R() {
  return r._unknown(cr);
}
var ir = r.$constructor("ZodNever", (e, o) => {
  r.$ZodNever.init(e, o), i.init(e, o);
});
function Ne(e) {
  return r._never(ir, e);
}
var ur = r.$constructor("ZodVoid", (e, o) => {
  r.$ZodVoid.init(e, o), i.init(e, o);
});
function jo(e) {
  return r._void(ur, e);
}
var C = r.$constructor("ZodDate", (e, o) => {
  r.$ZodDate.init(e, o),
    i.init(e, o),
    e.min = (n, c) => e.check(d(n, c)),
    e.max = (n, c) => e.check(f(n, c));
  let t = e._zod.bag;
  e.minDate = t.minimum ? new Date(t.minimum) : null,
    e.maxDate = t.maximum ? new Date(t.maximum) : null;
});
function Uo(e) {
  return r._date(C, e);
}
var ar = r.$constructor("ZodArray", (e, o) => {
  r.$ZodArray.init(e, o),
    i.init(e, o),
    e.element = o.element,
    e.min = (t, n) => e.check(Z(t, n)),
    e.nonempty = (t) => e.check(Z(1, t)),
    e.max = (t, n) => e.check(T(t, n)),
    e.length = (t, n) => e.check(P(t, n)),
    e.unwrap = () => e.element;
});
function je(e, o) {
  return r._array(ar, e, o);
}
function Ro(e) {
  let o = e._zod.def.shape;
  return _r(Object.keys(o));
}
var B = r.$constructor("ZodObject", (e, o) => {
  r.$ZodObject.init(e, o),
    i.init(e, o),
    u.defineLazy(e, "shape", () => o.shape),
    e.keyof = () => xr(Object.keys(e._zod.def.shape)),
    e.catchall = (t) => e.clone({ ...e._zod.def, catchall: t }),
    e.passthrough = () => e.clone({ ...e._zod.def, catchall: R() }),
    e.loose = () => e.clone({ ...e._zod.def, catchall: R() }),
    e.strict = () => e.clone({ ...e._zod.def, catchall: Ne() }),
    e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }),
    e.extend = (t) => u.extend(e, t),
    e.merge = (t) => u.merge(e, t),
    e.pick = (t) => u.pick(e, t),
    e.omit = (t) => u.omit(e, t),
    e.partial = (...t) => u.partial(Ce, e, t[0]),
    e.required = (...t) => u.required(Be, e, t[0]);
});
function Ao(e, o) {
  let t = {
    type: "object",
    get shape() {
      return u.assignProp(this, "shape", { ...e }), this.shape;
    },
    ...u.normalizeParams(o),
  };
  return new B(t);
}
function Lo(e, o) {
  return new B({
    type: "object",
    get shape() {
      return u.assignProp(this, "shape", { ...e }), this.shape;
    },
    catchall: Ne(),
    ...u.normalizeParams(o),
  });
}
function Fo(e, o) {
  return new B({
    type: "object",
    get shape() {
      return u.assignProp(this, "shape", { ...e }), this.shape;
    },
    catchall: R(),
    ...u.normalizeParams(o),
  });
}
var Ue = r.$constructor("ZodUnion", (e, o) => {
  r.$ZodUnion.init(e, o), i.init(e, o), e.options = o.options;
});
function Re(e, o) {
  return new Ue({ type: "union", options: e, ...u.normalizeParams(o) });
}
var pr = r.$constructor("ZodDiscriminatedUnion", (e, o) => {
  Ue.init(e, o), r.$ZodDiscriminatedUnion.init(e, o);
});
function Co(e, o, t) {
  return new pr({
    type: "union",
    options: o,
    discriminator: e,
    ...u.normalizeParams(t),
  });
}
var lr = r.$constructor("ZodIntersection", (e, o) => {
  r.$ZodIntersection.init(e, o), i.init(e, o);
});
function sr(e, o) {
  return new lr({ type: "intersection", left: e, right: o });
}
var dr = r.$constructor("ZodTuple", (e, o) => {
  r.$ZodTuple.init(e, o),
    i.init(e, o),
    e.rest = (t) => e.clone({ ...e._zod.def, rest: t });
});
function Bo(e, o, t) {
  let n = o instanceof r.$ZodType, c = n ? t : o, l = n ? o : null;
  return new dr({ type: "tuple", items: e, rest: l, ...u.normalizeParams(c) });
}
var Ae = r.$constructor("ZodRecord", (e, o) => {
  r.$ZodRecord.init(e, o),
    i.init(e, o),
    e.keyType = o.keyType,
    e.valueType = o.valueType;
});
function mr(e, o, t) {
  return new Ae({
    type: "record",
    keyType: e,
    valueType: o,
    ...u.normalizeParams(t),
  });
}
function Mo(e, o, t) {
  let n = r.clone(e);
  return n._zod.values = void 0,
    new Ae({
      type: "record",
      keyType: n,
      valueType: o,
      ...u.normalizeParams(t),
    });
}
var fr = r.$constructor("ZodMap", (e, o) => {
  r.$ZodMap.init(e, o),
    i.init(e, o),
    e.keyType = o.keyType,
    e.valueType = o.valueType;
});
function Vo(e, o, t) {
  return new fr({
    type: "map",
    keyType: e,
    valueType: o,
    ...u.normalizeParams(t),
  });
}
var hr = r.$constructor("ZodSet", (e, o) => {
  r.$ZodSet.init(e, o),
    i.init(e, o),
    e.min = (...t) => e.check(r._minSize(...t)),
    e.nonempty = (t) => e.check(r._minSize(1, t)),
    e.max = (...t) => e.check(r._maxSize(...t)),
    e.size = (...t) => e.check(r._size(...t));
});
function Wo(e, o) {
  return new hr({ type: "set", valueType: e, ...u.normalizeParams(o) });
}
var b = r.$constructor("ZodEnum", (e, o) => {
  r.$ZodEnum.init(e, o),
    i.init(e, o),
    e.enum = o.entries,
    e.options = Object.values(o.entries);
  let t = new Set(Object.keys(o.entries));
  e.extract = (n, c) => {
    let l = {};
    for (let s of n) {
      if (t.has(s)) {
        l[s] = o.entries[s];
      } else {
        throw new Error(`Key ${s} not found in enum`);
      }
    }
    return new b({ ...o, checks: [], ...u.normalizeParams(c), entries: l });
  },
    e.exclude = (n, c) => {
      let l = { ...o.entries };
      for (let s of n) {
        if (t.has(s)) {
          delete l[s];
        } else {
          throw new Error(`Key ${s} not found in enum`);
        }
      }
      return new b({ ...o, checks: [], ...u.normalizeParams(c), entries: l });
    };
});
function xr(e, o) {
  let t = Array.isArray(e) ? Object.fromEntries(e.map((n) => [n, n])) : e;
  return new b({ type: "enum", entries: t, ...u.normalizeParams(o) });
}
function Ko(e, o) {
  return new b({ type: "enum", entries: e, ...u.normalizeParams(o) });
}
var gr = r.$constructor("ZodLiteral", (e, o) => {
  r.$ZodLiteral.init(e, o),
    i.init(e, o),
    e.values = new Set(o.values),
    Object.defineProperty(e, "value", {
      get() {
        if (o.values.length > 1) {
          throw new Error(
            "This schema contains multiple valid literal values. Use `.values` instead.",
          );
        }
        return o.values[0];
      },
    });
});
function _r(e, o) {
  return new gr({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...u.normalizeParams(o),
  });
}
var yr = r.$constructor("ZodFile", (e, o) => {
  r.$ZodFile.init(e, o),
    i.init(e, o),
    e.min = (t, n) => e.check(r._minSize(t, n)),
    e.max = (t, n) => e.check(r._maxSize(t, n)),
    e.mime = (t, n) => e.check(r._mime(Array.isArray(t) ? t : [t], n));
});
function Go(e) {
  return r._file(yr, e);
}
var Le = r.$constructor("ZodTransform", (e, o) => {
  r.$ZodTransform.init(e, o),
    i.init(e, o),
    e._zod.parse = (t, n) => {
      t.addIssue = (l) => {
        if (typeof l == "string") {
          t.issues.push(u.issue(l, t.value, o));
        } else {
          let s = l;
          s.fatal && (s.continue = !1),
            s.code ?? (s.code = "custom"),
            s.input ?? (s.input = t.value),
            s.inst ?? (s.inst = e),
            t.issues.push(u.issue(s));
        }
      };
      let c = o.transform(t.value, t);
      return c instanceof Promise
        ? c.then((l) => (t.value = l, t))
        : (t.value = c, t);
    };
});
function Fe(e) {
  return new Le({ type: "transform", transform: e });
}
var Ce = r.$constructor("ZodOptional", (e, o) => {
  r.$ZodOptional.init(e, o),
    i.init(e, o),
    e.unwrap = () => e._zod.def.innerType;
});
function A(e) {
  return new Ce({ type: "optional", innerType: e });
}
var Zr = r.$constructor("ZodNullable", (e, o) => {
  r.$ZodNullable.init(e, o),
    i.init(e, o),
    e.unwrap = () => e._zod.def.innerType;
});
function L(e) {
  return new Zr({ type: "nullable", innerType: e });
}
function Jo(e) {
  return A(L(e));
}
var kr = r.$constructor("ZodDefault", (e, o) => {
  r.$ZodDefault.init(e, o),
    i.init(e, o),
    e.unwrap = () => e._zod.def.innerType,
    e.removeDefault = e.unwrap;
});
function vr(e, o) {
  return new kr({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof o == "function" ? o() : o;
    },
  });
}
var $r = r.$constructor("ZodPrefault", (e, o) => {
  r.$ZodPrefault.init(e, o),
    i.init(e, o),
    e.unwrap = () => e._zod.def.innerType;
});
function br(e, o) {
  return new $r({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof o == "function" ? o() : o;
    },
  });
}
var Be = r.$constructor("ZodNonOptional", (e, o) => {
  r.$ZodNonOptional.init(e, o),
    i.init(e, o),
    e.unwrap = () => e._zod.def.innerType;
});
function Ir(e, o) {
  return new Be({ type: "nonoptional", innerType: e, ...u.normalizeParams(o) });
}
var wr = r.$constructor("ZodSuccess", (e, o) => {
  r.$ZodSuccess.init(e, o), i.init(e, o), e.unwrap = () => e._zod.def.innerType;
});
function Xo(e) {
  return new wr({ type: "success", innerType: e });
}
var zr = r.$constructor("ZodCatch", (e, o) => {
  r.$ZodCatch.init(e, o),
    i.init(e, o),
    e.unwrap = () => e._zod.def.innerType,
    e.removeCatch = e.unwrap;
});
function Sr(e, o) {
  return new zr({
    type: "catch",
    innerType: e,
    catchValue: typeof o == "function" ? o : () => o,
  });
}
var Tr = r.$constructor("ZodNaN", (e, o) => {
  r.$ZodNaN.init(e, o), i.init(e, o);
});
function qo(e) {
  return r._nan(Tr, e);
}
var Me = r.$constructor("ZodPipe", (e, o) => {
  r.$ZodPipe.init(e, o), i.init(e, o), e.in = o.in, e.out = o.out;
});
function F(e, o) {
  return new Me({ type: "pipe", in: e, out: o });
}
var Pr = r.$constructor("ZodReadonly", (e, o) => {
  r.$ZodReadonly.init(e, o),
    i.init(e, o),
    e.unwrap = () => e._zod.def.innerType;
});
function Or(e) {
  return new Pr({ type: "readonly", innerType: e });
}
var Dr = r.$constructor("ZodTemplateLiteral", (e, o) => {
  r.$ZodTemplateLiteral.init(e, o), i.init(e, o);
});
function Yo(e, o) {
  return new Dr({
    type: "template_literal",
    parts: e,
    ...u.normalizeParams(o),
  });
}
var Er = r.$constructor("ZodLazy", (e, o) => {
  r.$ZodLazy.init(e, o), i.init(e, o), e.unwrap = () => e._zod.def.getter();
});
function Nr(e) {
  return new Er({ type: "lazy", getter: e });
}
var jr = r.$constructor("ZodPromise", (e, o) => {
  r.$ZodPromise.init(e, o), i.init(e, o), e.unwrap = () => e._zod.def.innerType;
});
function Ho(e) {
  return new jr({ type: "promise", innerType: e });
}
var M = r.$constructor("ZodCustom", (e, o) => {
  r.$ZodCustom.init(e, o), i.init(e, o);
});
function Ur(e) {
  let o = new r.$ZodCheck({ check: "custom" });
  return o._zod.check = e, o;
}
function Qo(e, o) {
  return r._custom(M, e ?? (() => !0), o);
}
function Rr(e, o = {}) {
  return r._refine(M, e, o);
}
function Ar(e) {
  let o = Ur((t) => (t.addIssue = (n) => {
    if (typeof n == "string") {
      t.issues.push(u.issue(n, t.value, o._zod.def));
    } else {
      let c = n;
      c.fatal && (c.continue = !1),
        c.code ?? (c.code = "custom"),
        c.input ?? (c.input = t.value),
        c.inst ?? (c.inst = o),
        c.continue ?? (c.continue = !o._zod.def.abort),
        t.issues.push(u.issue(c));
    }
  },
    e(t.value, t))
  );
  return o;
}
function et(e, o = { error: `Input not instance of ${e.name}` }) {
  let t = new M({
    type: "custom",
    check: "custom",
    fn: (n) => n instanceof e,
    abort: !0,
    ...u.normalizeParams(o),
  });
  return t._zod.bag.Class = e, t;
}
var rt = (...e) =>
  r._stringbool({ Pipe: Me, Boolean: z, String: I, Transform: Le }, ...e);
function ot(e) {
  let o = Nr(() => Re([me(e), He(), Qe(), tr(), je(o), mr(me(), o)]));
  return o;
}
function tt(e, o) {
  return F(Fe(e), o);
}
import * as We from "./v4/core.mjs";
var nt = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom",
};
function ct(e) {
  We.config({ customError: e });
}
function it() {
  return We.config().customError;
}
var Ve;
Ve || (Ve = {});
import { config as ft } from "./v4/core.mjs";
var ut = (e) => {
    let o = typeof e;
    switch (o) {
      case "number":
        return Number.isNaN(e) ? "NaN" : "number";
      case "object": {
        if (Array.isArray(e)) {
          return "array";
        }
        if (e === null) {
          return "null";
        }
        if (Object.getPrototypeOf(e) !== Object.prototype && e.constructor) {
          return e.constructor.name;
        }
      }
    }
    return o;
  },
  at = () => {
    let e = {
      string: { unit: "characters", verb: "to have" },
      file: { unit: "bytes", verb: "to have" },
      array: { unit: "items", verb: "to have" },
      set: { unit: "items", verb: "to have" },
    };
    function o(n) {
      return e[n] ?? null;
    }
    let t = {
      regex: "input",
      email: "email address",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datetime",
      date: "ISO date",
      time: "ISO time",
      duration: "ISO duration",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded string",
      base64url: "base64url-encoded string",
      json_string: "JSON string",
      e164: "E.164 number",
      jwt: "JWT",
      template_literal: "input",
    };
    return (n) => {
      switch (n.code) {
        case "invalid_type":
          return `Invalid input: expected ${n.expected}, received ${
            ut(n.input)
          }`;
        case "invalid_value":
          return n.values.length === 1
            ? `Invalid input: expected ${ae(n.values[0])}`
            : `Invalid option: expected one of ${ie(n.values, "|")}`;
        case "too_big": {
          let c = n.inclusive ? "<=" : "<", l = o(n.origin);
          return l
            ? `Too big: expected ${
              n.origin ?? "value"
            } to have ${c}${n.maximum.toString()} ${l.unit ?? "elements"}`
            : `Too big: expected ${
              n.origin ?? "value"
            } to be ${c}${n.maximum.toString()}`;
        }
        case "too_small": {
          let c = n.inclusive ? ">=" : ">", l = o(n.origin);
          return l
            ? `Too small: expected ${n.origin} to have ${c}${n.minimum.toString()} ${l.unit}`
            : `Too small: expected ${n.origin} to be ${c}${n.minimum.toString()}`;
        }
        case "invalid_format": {
          let c = n;
          return c.format === "starts_with"
            ? `Invalid string: must start with "${c.prefix}"`
            : c.format === "ends_with"
            ? `Invalid string: must end with "${c.suffix}"`
            : c.format === "includes"
            ? `Invalid string: must include "${c.includes}"`
            : c.format === "regex"
            ? `Invalid string: must match pattern ${c.pattern}`
            : `Invalid ${t[c.format] ?? n.format}`;
        }
        case "not_multiple_of":
          return `Invalid number: must be a multiple of ${n.divisor}`;
        case "unrecognized_keys":
          return `Unrecognized key${n.keys.length > 1 ? "s" : ""}: ${
            ie(n.keys, ", ")
          }`;
        case "invalid_key":
          return `Invalid key in ${n.origin}`;
        case "invalid_union":
          return "Invalid input";
        case "invalid_element":
          return `Invalid value in ${n.origin}`;
        default:
          return "Invalid input";
      }
    };
  };
function Lr() {
  return { localeError: at() };
}
import {
  $brand as vt,
  $input as kt,
  $output as Zt,
  clone as $t,
  config as _t,
  flattenError as St,
  formatError as zt,
  function as yt,
  globalRegistry as xt,
  NEVER as Ot,
  prettifyError as wt,
  regexes as bt,
  registry as gt,
  TimePrecision as Pt,
  toJSONSchema as Tt,
  treeifyError as It,
} from "./v4/core.mjs";
import * as Dt from "./v4/locales.mjs";
var Ke = {};
V(Ke, {
  bigint: () => dt,
  boolean: () => st,
  date: () => mt,
  number: () => lt,
  string: () => pt,
});
import * as m from "./v4/core.mjs";
function pt(e) {
  return m._coercedString(I, e);
}
function lt(e) {
  return m._coercedNumber(w, e);
}
function st(e) {
  return m._coercedBoolean(z, e);
}
function dt(e) {
  return m._coercedBigint(S, e);
}
function mt(e) {
  return m._coercedDate(C, e);
}
ft(Lr());
var Qt = Ge;
export {
  $ as multipleOf,
  $e as ZodXID,
  $o as jwt,
  $r as ZodPrefault,
  $t as clone,
  _ as lt,
  _e as ZodEmoji,
  _o as cidrv4,
  _r as literal,
  _t as config,
  A as optional,
  a as ZodStringFormat,
  Ae as ZodRecord,
  Ao as object,
  ao as emoji,
  Ar as superRefine,
  ar as ZodArray,
  B as ZodObject,
  b as ZodEnum,
  Be as ZodNonOptional,
  be as ZodKSUID,
  Bo as tuple,
  bo as stringFormat,
  Br as positive,
  br as prefault,
  bt as regexes,
  C as ZodDate,
  Ce as ZodOptional,
  Co as discriminatedUnion,
  co as uuidv6,
  cr as ZodUnknown,
  ct as setErrorMap,
  D as ZodISODate,
  d as gte,
  De as ZodJWT,
  de as safeParseAsync,
  Do as symbol,
  Dr as ZodTemplateLiteral,
  dr as ZodTuple,
  Dt as locales,
  E as ZodISOTime,
  Ee as ZodBigIntFormat,
  ee as toLowerCase,
  Eo as undefined,
  Er as ZodLazy,
  er as ZodSymbol,
  et as instanceof,
  F as pipe,
  f as lte,
  Fe as transform,
  fe as int,
  Fo as looseObject,
  fo as xid,
  fr as ZodMap,
  G as uppercase,
  Ge as z,
  ge as ZodURL,
  Go as file,
  go as ipv6,
  Gr as minSize,
  gr as ZodLiteral,
  gt as registry,
  H as normalize,
  h as ZodUUID,
  He as number,
  he as _ZodString,
  Ho as promise,
  ho as ksuid,
  hr as ZodSet,
  ht as core,
  I as ZodString,
  i as ZodType,
  Ie as ZodIPv4,
  Io as float32,
  io as uuidv7,
  Ir as nonoptional,
  ir as ZodNever,
  It as treeifyError,
  it as getErrorMap,
  J as includes,
  j as iso,
  je as array,
  Jo as nullish,
  jo as void,
  Jr as size,
  jr as ZodPromise,
  K as lowercase,
  k as ZodRealError,
  Ke as coerce,
  ke as ZodCUID2,
  Ko as nativeEnum,
  ko as base64url,
  Kr as maxSize,
  kr as ZodDefault,
  kt as $input,
  L as nullable,
  Le as ZodTransform,
  le as parseAsync,
  Lo as strictObject,
  lo as cuid,
  lr as ZodIntersection,
  M as ZodCustom,
  Me as ZodPipe,
  me as string,
  Mo as partialRecord,
  mo as ulid,
  Mr as negative,
  mr as record,
  N as ZodISODuration,
  Ne as never,
  No as any,
  no as uuidv4,
  Nr as lazy,
  nr as ZodAny,
  nt as ZodIssueCode,
  O as ZodISODateTime,
  Oe as ZodE164,
  Oo as uint64,
  oo as guid,
  Or as readonly,
  or as ZodNull,
  Ot as NEVER,
  ot as json,
  P as length,
  Pe as ZodBase64URL,
  pe as parse,
  Po as int64,
  po as nanoid,
  Pr as ZodReadonly,
  pr as ZodDiscriminatedUnion,
  Pt as TimePrecision,
  Q as trim,
  q as endsWith,
  Qe as boolean,
  Qo as custom,
  qo as nan,
  Qr as ZodError,
  qr as mime,
  Qt as default,
  R as unknown,
  Re as union,
  re as toUpperCase,
  Ro as keyof,
  ro as email,
  Rr as refine,
  rr as ZodUndefined,
  rt as stringbool,
  S as ZodBigInt,
  Se as ZodCIDRv6,
  se as safeParse,
  So as uint32,
  so as cuid2,
  Sr as catch,
  sr as intersection,
  St as flattenError,
  T as maxLength,
  Te as ZodBase64,
  To as bigint,
  to as uuid,
  Tr as ZodNaN,
  tr as null,
  Tt as toJSONSchema,
  tt as preprocess,
  U as ZodGUID,
  Ue as ZodUnion,
  Uo as date,
  uo as url,
  Ur as check,
  ur as ZodVoid,
  v as ZodNumberFormat,
  Ve as ZodFirstPartyTypeKind,
  ve as ZodULID,
  Vo as map,
  vo as e164,
  Vr as nonpositive,
  vr as _default,
  vt as $brand,
  W as regex,
  w as ZodNumber,
  we as ZodIPv6,
  Wo as set,
  wo as float64,
  Wr as nonnegative,
  wr as ZodSuccess,
  wt as prettifyError,
  X as startsWith,
  xe as ZodEmail,
  Xo as success,
  xo as ipv4,
  Xr as property,
  xr as enum,
  xt as globalRegistry,
  Y as overwrite,
  y as gt,
  Ye as ZodCustomStringFormat,
  ye as ZodNanoID,
  Yo as templateLiteral,
  yo as cidrv6,
  yr as ZodFile,
  yt as function,
  Z as minLength,
  z as ZodBoolean,
  Ze as ZodCUID,
  ze as ZodCIDRv4,
  Zo as base64,
  zo as int32,
  Zr as ZodNullable,
  zr as ZodCatch,
  Zt as $output,
  zt as formatError,
};
//# sourceMappingURL=zod.mjs.map
