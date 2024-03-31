var extendStatics = function(e, t) {
  return (extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(e2, t2) {
    e2.__proto__ = t2;
  } || function(e2, t2) {
    for (var r in t2)
      Object.prototype.hasOwnProperty.call(t2, r) && (e2[r] = t2[r]);
  })(e, t);
};
function __extends(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function r() {
    this.constructor = e;
  }
  extendStatics(e, t), e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var util, __assign = function() {
  return (__assign = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++)
      for (var o in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e;
  }).apply(this, arguments);
};
function __awaiter(e, i, s, u) {
  return new (s = s || Promise)(function(r, t) {
    function n(e2) {
      try {
        a(u.next(e2));
      } catch (e3) {
        t(e3);
      }
    }
    function o(e2) {
      try {
        a(u.throw(e2));
      } catch (e3) {
        t(e3);
      }
    }
    function a(e2) {
      var t2;
      e2.done ? r(e2.value) : ((t2 = e2.value) instanceof s ? t2 : new s(function(e3) {
        e3(t2);
      })).then(n, o);
    }
    a((u = u.apply(e, i || [])).next());
  });
}
function __generator(r, n) {
  var o, a, i, s = {label: 0, sent: function() {
    if (1 & i[0])
      throw i[1];
    return i[1];
  }, trys: [], ops: []}, e = {next: t(0), throw: t(1), return: t(2)};
  return typeof Symbol == "function" && (e[Symbol.iterator] = function() {
    return this;
  }), e;
  function t(t2) {
    return function(e2) {
      return function(t3) {
        if (o)
          throw new TypeError("Generator is already executing.");
        for (; s; )
          try {
            if (o = 1, a && (i = 2 & t3[0] ? a.return : t3[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, t3[1])).done)
              return i;
            switch (a = 0, (t3 = i ? [2 & t3[0], i.value] : t3)[0]) {
              case 0:
              case 1:
                i = t3;
                break;
              case 4:
                return s.label++, {value: t3[1], done: false};
              case 5:
                s.label++, a = t3[1], t3 = [0];
                continue;
              case 7:
                t3 = s.ops.pop(), s.trys.pop();
                continue;
              default:
                if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (t3[0] === 6 || t3[0] === 2)) {
                  s = 0;
                  continue;
                }
                if (t3[0] === 3 && (!i || t3[1] > i[0] && t3[1] < i[3])) {
                  s.label = t3[1];
                  break;
                }
                if (t3[0] === 6 && s.label < i[1]) {
                  s.label = i[1], i = t3;
                  break;
                }
                if (i && s.label < i[2]) {
                  s.label = i[2], s.ops.push(t3);
                  break;
                }
                i[2] && s.ops.pop(), s.trys.pop();
                continue;
            }
            t3 = n.call(r, s);
          } catch (e3) {
            t3 = [6, e3], a = 0;
          } finally {
            o = i = 0;
          }
        if (5 & t3[0])
          throw t3[1];
        return {value: t3[0] ? t3[1] : void 0, done: true};
      }([t2, e2]);
    };
  }
}
function __values(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r)
    return r.call(e);
  if (e && typeof e.length == "number")
    return {next: function() {
      return {value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e};
    }};
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var n, o, a = r.call(e), i = [];
  try {
    for (; (t === void 0 || 0 < t--) && !(n = a.next()).done; )
      i.push(n.value);
  } catch (e2) {
    o = {error: e2};
  } finally {
    try {
      n && !n.done && (r = a.return) && r.call(a);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return i;
}
function __spreadArray(e, t) {
  for (var r = 0, n = t.length, o = e.length; r < n; r++, o++)
    e[o] = t[r];
  return e;
}
!function(u) {
  u.assertNever = function(e) {
    throw new Error();
  }, u.arrayToEnum = function(e) {
    var t, r, n = {};
    try {
      for (var o = __values(e), a = o.next(); !a.done; a = o.next()) {
        var i = a.value;
        n[i] = i;
      }
    } catch (e2) {
      t = {error: e2};
    } finally {
      try {
        a && !a.done && (r = o.return) && r.call(o);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return n;
  }, u.getValidEnumValues = function(t) {
    var r, e, n = u.objectKeys(t).filter(function(e2) {
      return typeof t[t[e2]] != "number";
    }), o = {};
    try {
      for (var a = __values(n), i = a.next(); !i.done; i = a.next()) {
        var s = i.value;
        o[s] = t[s];
      }
    } catch (e2) {
      r = {error: e2};
    } finally {
      try {
        i && !i.done && (e = a.return) && e.call(a);
      } finally {
        if (r)
          throw r.error;
      }
    }
    return u.objectValues(o);
  }, u.objectValues = function(t) {
    return u.objectKeys(t).map(function(e) {
      return t[e];
    });
  }, u.objectKeys = typeof Object.keys == "function" ? function(e) {
    return Object.keys(e);
  } : function(e) {
    var t, r = [];
    for (t in e)
      Object.prototype.hasOwnProperty.call(e, t) && r.push(t);
    return r;
  }, u.find = function(e, t) {
    var r, n;
    try {
      for (var o = __values(e), a = o.next(); !a.done; a = o.next()) {
        var i = a.value;
        if (t(i))
          return i;
      }
    } catch (e2) {
      r = {error: e2};
    } finally {
      try {
        a && !a.done && (n = o.return) && n.call(o);
      } finally {
        if (r)
          throw r.error;
      }
    }
  }, u.isInteger = typeof Number.isInteger == "function" ? function(e) {
    return Number.isInteger(e);
  } : function(e) {
    return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
  };
}(util = util || {});
var errorUtil, ZodIssueCode = util.arrayToEnum(["invalid_type", "custom", "invalid_union", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of"]), quotelessJson = function(e) {
  return JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
}, ZodError = function(r) {
  function t(e) {
    var t2 = this.constructor, u = r.call(this) || this;
    u.issues = [], u.format = function() {
      var c = {_errors: []}, p = function(e2) {
        var t3, r2;
        try {
          for (var n = __values(e2.issues), o = n.next(); !o.done; o = n.next()) {
            var a = o.value;
            if (a.code === "invalid_union")
              a.unionErrors.map(p);
            else if (a.code === "invalid_return_type")
              p(a.returnTypeError);
            else if (a.code === "invalid_arguments")
              p(a.argumentsError);
            else if (a.path.length === 0)
              c._errors.push(a.message);
            else
              for (var i = c, s = 0; s < a.path.length; ) {
                var u2, d = a.path[s];
                s === a.path.length - 1 ? (i[d] = i[d] || {_errors: []}, i[d]._errors.push(a.message)) : typeof d == "string" ? i[d] = i[d] || {_errors: []} : typeof d == "number" && ((u2 = [])._errors = [], i[d] = i[d] || u2), i = i[d], s++;
              }
          }
        } catch (e3) {
          t3 = {error: e3};
        } finally {
          try {
            o && !o.done && (r2 = n.return) && r2.call(n);
          } finally {
            if (t3)
              throw t3.error;
          }
        }
      };
      return p(u), c;
    }, u.addIssue = function(e2) {
      u.issues = __spreadArray(__spreadArray([], __read(u.issues), false), [e2]);
    }, u.addIssues = function(e2) {
      e2 === void 0 && (e2 = []), u.issues = __spreadArray(__spreadArray([], __read(u.issues), false), __read(e2));
    }, u.flatten = function(e2) {
      var t3, r2;
      e2 === void 0 && (e2 = function(e3) {
        return e3.message;
      });
      var n = {}, o = [];
      try {
        for (var a = __values(u.issues), i = a.next(); !i.done; i = a.next()) {
          var s = i.value;
          0 < s.path.length ? (n[s.path[0]] = n[s.path[0]] || [], n[s.path[0]].push(e2(s))) : o.push(e2(s));
        }
      } catch (e3) {
        t3 = {error: e3};
      } finally {
        try {
          i && !i.done && (r2 = a.return) && r2.call(a);
        } finally {
          if (t3)
            throw t3.error;
        }
      }
      return {formErrors: o, fieldErrors: n};
    };
    t2 = t2.prototype;
    return Object.setPrototypeOf ? Object.setPrototypeOf(u, t2) : u.__proto__ = t2, u.name = "ZodError", u.issues = e, u;
  }
  return __extends(t, r), Object.defineProperty(t.prototype, "errors", {get: function() {
    return this.issues;
  }, enumerable: false, configurable: true}), t.prototype.toString = function() {
    return this.message;
  }, Object.defineProperty(t.prototype, "message", {get: function() {
    return JSON.stringify(this.issues, null, 2);
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "isEmpty", {get: function() {
    return this.issues.length === 0;
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "formErrors", {get: function() {
    return this.flatten();
  }, enumerable: false, configurable: true}), t.create = function(e) {
    return new t(e);
  }, t;
}(Error), defaultErrorMap = function(e, t) {
  var r;
  switch (e.code) {
    case ZodIssueCode.invalid_type:
      r = e.received === "undefined" ? "Required" : "Expected " + e.expected + ", received " + e.received;
      break;
    case ZodIssueCode.unrecognized_keys:
      r = "Unrecognized key(s) in object: " + e.keys.map(function(e2) {
        return "'" + e2 + "'";
      }).join(", ");
      break;
    case ZodIssueCode.invalid_union:
      r = "Invalid input";
      break;
    case ZodIssueCode.invalid_enum_value:
      r = "Invalid enum value. Expected " + e.options.map(function(e2) {
        return typeof e2 == "string" ? "'" + e2 + "'" : e2;
      }).join(" | ") + ", received " + (typeof t.data == "string" ? "'" + t.data + "'" : t.data);
      break;
    case ZodIssueCode.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case ZodIssueCode.invalid_return_type:
      r = "Invalid function return type";
      break;
    case ZodIssueCode.invalid_date:
      r = "Invalid date";
      break;
    case ZodIssueCode.invalid_string:
      r = e.validation !== "regex" ? "Invalid " + e.validation : "Invalid";
      break;
    case ZodIssueCode.too_small:
      r = e.type === "array" ? "Should have " + (e.inclusive ? "at least" : "more than") + " " + e.minimum + " items" : e.type === "string" ? "Should be " + (e.inclusive ? "at least" : "over") + " " + e.minimum + " characters" : e.type === "number" ? "Value should be greater than " + (e.inclusive ? "or equal to " : "") + e.minimum : "Invalid input";
      break;
    case ZodIssueCode.too_big:
      r = e.type === "array" ? "Should have " + (e.inclusive ? "at most" : "less than") + " " + e.maximum + " items" : e.type === "string" ? "Should be " + (e.inclusive ? "at most" : "under") + " " + e.maximum + " characters long" : e.type === "number" ? "Value should be less than " + (e.inclusive ? "or equal to " : "") + e.maximum : "Invalid input";
      break;
    case ZodIssueCode.custom:
      r = "Invalid input";
      break;
    case ZodIssueCode.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case ZodIssueCode.not_multiple_of:
      r = "Should be multiple of " + e.multipleOf;
      break;
    default:
      r = t.defaultError, util.assertNever(e);
  }
  return {message: r};
}, overrideErrorMap = defaultErrorMap, setErrorMap = function(e) {
  overrideErrorMap = e;
}, ZodParsedType = util.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]), getParsedType = function(e) {
  switch (typeof e) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(e) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "object":
      return Array.isArray(e) ? ZodParsedType.array : e === null ? ZodParsedType.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? ZodParsedType.promise : e instanceof Map ? ZodParsedType.map : e instanceof Set ? ZodParsedType.set : e instanceof Date ? ZodParsedType.date : ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
}, makeIssue = function(e) {
  var t, r, n = e.data, o = e.path, a = e.errorMaps, e = e.issueData, o = __spreadArray(__spreadArray([], __read(o), false), __read(e.path || [])), i = __assign(__assign({}, e), {path: o}), s = "", a = a.filter(function(e2) {
    return !!e2;
  }).slice().reverse();
  try {
    for (var u = __values(a), d = u.next(); !d.done; d = u.next())
      s = (0, d.value)(i, {data: n, defaultError: s}).message;
  } catch (e2) {
    t = {error: e2};
  } finally {
    try {
      d && !d.done && (r = u.return) && r.call(u);
    } finally {
      if (t)
        throw t.error;
    }
  }
  return __assign(__assign({}, e), {path: o, message: e.message || s});
}, EMPTY_PATH = null, pathToArray = function(e) {
  if (e === null)
    return [];
  for (var t = new Array(e.count); e !== null; )
    t[e.count - 1] = e.component, e = e.parent;
  return t;
}, pathFromArray = function(e) {
  for (var t = null, r = 0; r < e.length; r++)
    t = {parent: t, component: e[r], count: r + 1};
  return t;
}, ParseContext = function() {
  function t(e) {
    this.def = e;
  }
  return Object.defineProperty(t.prototype, "path", {get: function() {
    return this.def.path;
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "issues", {get: function() {
    return this.def.issues;
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "errorMap", {get: function() {
    return this.def.errorMap;
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "async", {get: function() {
    return this.def.async;
  }, enumerable: false, configurable: true}), t.prototype.stepInto = function(e) {
    return new t(__assign(__assign({}, this.def), {path: this.path === null ? {parent: null, count: 1, component: e} : {parent: this.path, count: this.path.count + 1, component: e}}));
  }, t.prototype._addIssue = function(e, t2, r) {
    r === void 0 && (r = {});
    r = makeIssue({data: e, issueData: t2, path: pathToArray(this.path), errorMaps: [this.def.errorMap, r.schemaErrorMap, overrideErrorMap, defaultErrorMap]});
    this.issues.push(r);
  }, t;
}(), INVALID = Object.freeze({valid: false}), OK = function(e) {
  return {valid: true, value: e};
}, isInvalid = function(e) {
  return e.valid === false;
}, isOk = function(e) {
  return e.valid === true;
}, isAsync = function(e) {
  return e instanceof Promise;
};
!function(e) {
  e.errToObj = function(e2) {
    return typeof e2 == "string" ? {message: e2} : e2 || {};
  }, e.toString = function(e2) {
    return typeof e2 == "string" ? e2 : e2 == null ? void 0 : e2.message;
  };
}(errorUtil = errorUtil || {});
var createRootContext = function(e) {
  return new ParseContext({path: pathFromArray(e.path || []), issues: [], errorMap: e.errorMap, async: (e = e.async) !== null && e !== void 0 && e});
}, handleResult = function(e, t) {
  return isOk(t) && !e.issues.length ? {success: true, data: t.value} : {success: false, error: new ZodError(e.issues)};
};
function processCreateParams(r) {
  if (!r)
    return {};
  if (r.errorMap && (r.invalid_type_error || r.required_error))
    throw new Error(`Can't use "invalid" or "required" in conjunction with custom error map.`);
  if (r.errorMap)
    return {errorMap: r.errorMap};
  return {errorMap: function(e, t) {
    return e.code !== "invalid_type" ? {message: t.defaultError} : t.data === void 0 && r.required_error ? {message: r.required_error} : r.invalid_type_error ? {message: r.invalid_type_error} : {message: t.defaultError};
  }};
}
var objectUtil, ZodType = function() {
  function e(e2) {
    this.spa = this.safeParseAsync, this.superRefine = this._refinement, this._def = e2, this.transform = this.transform.bind(this), this.default = this.default.bind(this);
  }
  return e.prototype.addIssue = function(e2, t, r) {
    e2._addIssue(r.data, t, {schemaErrorMap: this._def.errorMap});
  }, e.prototype._parseSync = function(e2, t, r) {
    r = this._parse(e2, t, r);
    if (isAsync(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }, e.prototype._parseAsync = function(e2, t, r) {
    r = this._parse(e2, t, r);
    return Promise.resolve(r);
  }, e.prototype.parse = function(e2, t) {
    t = this.safeParse(e2, t);
    if (t.success)
      return t.data;
    throw t.error;
  }, e.prototype.safeParse = function(e2, t) {
    t = createRootContext(__assign(__assign({}, t), {async: false})), e2 = this._parseSync(t, e2, getParsedType(e2));
    return handleResult(t, e2);
  }, e.prototype.parseAsync = function(r, n) {
    return __awaiter(this, void 0, void 0, function() {
      var t;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, this.safeParseAsync(r, n)];
          case 1:
            if ((t = e2.sent()).success)
              return [2, t.data];
            throw t.error;
        }
      });
    });
  }, e.prototype.safeParseAsync = function(n, o) {
    return __awaiter(this, void 0, void 0, function() {
      var t, r;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return t = createRootContext(__assign(__assign({}, o), {async: true})), r = this._parse(t, n, getParsedType(n)), [4, isAsync(r) ? r : Promise.resolve(r)];
          case 1:
            return r = e2.sent(), [2, handleResult(t, r)];
        }
      });
    });
  }, e.prototype.refine = function(o, a) {
    return this._refinement(function(t, r) {
      function n() {
        return r.addIssue(__assign({code: ZodIssueCode.custom}, (e3 = t, typeof a == "string" || a === void 0 ? {message: a} : typeof a == "function" ? a(e3) : a)));
        var e3;
      }
      var e2 = o(t);
      return e2 instanceof Promise ? e2.then(function(e3) {
        return !!e3 || (n(), false);
      }) : !!e2 || (n(), false);
    });
  }, e.prototype.refinement = function(r, n) {
    return this._refinement(function(e2, t) {
      return !!r(e2) || (t.addIssue(typeof n == "function" ? n(e2, t) : n), false);
    });
  }, e.prototype._refinement = function(e2) {
    return new ZodEffects({schema: this, typeName: ZodFirstPartyTypeKind.ZodEffects, effect: {type: "refinement", refinement: e2}});
  }, e.prototype.optional = function() {
    return ZodOptional.create(this);
  }, e.prototype.nullable = function() {
    return ZodNullable.create(this);
  }, e.prototype.nullish = function() {
    return this.optional().nullable();
  }, e.prototype.array = function() {
    return ZodArray.create(this);
  }, e.prototype.promise = function() {
    return ZodPromise.create(this);
  }, e.prototype.or = function(e2) {
    return ZodUnion.create([this, e2]);
  }, e.prototype.and = function(e2) {
    return ZodIntersection.create(this, e2);
  }, e.prototype.transform = function(e2) {
    return new ZodEffects({schema: this, typeName: ZodFirstPartyTypeKind.ZodEffects, effect: {type: "transform", transform: e2}});
  }, e.prototype.default = function(e2) {
    return new ZodDefault({innerType: this, defaultValue: typeof e2 == "function" ? e2 : function() {
      return e2;
    }, typeName: ZodFirstPartyTypeKind.ZodDefault});
  }, e.prototype.isOptional = function() {
    return this.safeParse(void 0).success;
  }, e.prototype.isNullable = function() {
    return this.safeParse(null).success;
  }, e;
}(), cuidRegex = /^c[^\s-]{8,}$/i, uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, ZodString = function(e) {
  function t() {
    var n = e !== null && e.apply(this, arguments) || this;
    return n._regex = function(t2, e2, r) {
      return n.refinement(function(e3) {
        return t2.test(e3);
      }, __assign({validation: e2, code: ZodIssueCode.invalid_string}, errorUtil.errToObj(r)));
    }, n.nonempty = function(e2) {
      return n.min(1, errorUtil.errToObj(e2));
    }, n;
  }
  return __extends(t, e), t.prototype._parse = function(t2, r, e2) {
    var n, o;
    if (e2 !== ZodParsedType.string)
      return this.addIssue(t2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.string, received: e2}, {data: r}), INVALID;
    var a = false;
    try {
      for (var i = __values(this._def.checks), s = i.next(); !s.done; s = i.next()) {
        var u = s.value;
        if (u.kind === "min")
          r.length < u.value && (a = true, this.addIssue(t2, {code: ZodIssueCode.too_small, minimum: u.value, type: "string", inclusive: true, message: u.message}, {data: r}));
        else if (u.kind === "max")
          r.length > u.value && (a = true, this.addIssue(t2, {code: ZodIssueCode.too_big, maximum: u.value, type: "string", inclusive: true, message: u.message}, {data: r}));
        else if (u.kind === "email")
          emailRegex.test(r) || (a = true, this.addIssue(t2, {validation: "email", code: ZodIssueCode.invalid_string, message: u.message}, {data: r}));
        else if (u.kind === "uuid")
          uuidRegex.test(r) || (a = true, this.addIssue(t2, {validation: "uuid", code: ZodIssueCode.invalid_string, message: u.message}, {data: r}));
        else if (u.kind === "cuid")
          cuidRegex.test(r) || (a = true, this.addIssue(t2, {validation: "cuid", code: ZodIssueCode.invalid_string, message: u.message}, {data: r}));
        else if (u.kind === "url")
          try {
            new URL(r);
          } catch (e3) {
            a = true, this.addIssue(t2, {validation: "url", code: ZodIssueCode.invalid_string, message: u.message}, {data: r});
          }
        else
          u.kind === "regex" && (u.regex.lastIndex = 0, u.regex.test(r) || (a = true, this.addIssue(t2, {validation: "regex", code: ZodIssueCode.invalid_string, message: u.message}, {data: r})));
      }
    } catch (e3) {
      n = {error: e3};
    } finally {
      try {
        s && !s.done && (o = i.return) && o.call(i);
      } finally {
        if (n)
          throw n.error;
      }
    }
    return a ? INVALID : OK(r);
  }, t.prototype._addCheck = function(e2) {
    return new t(__assign(__assign({}, this._def), {checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [e2])}));
  }, t.prototype.email = function(e2) {
    return this._addCheck(__assign({kind: "email"}, errorUtil.errToObj(e2)));
  }, t.prototype.url = function(e2) {
    return this._addCheck(__assign({kind: "url"}, errorUtil.errToObj(e2)));
  }, t.prototype.uuid = function(e2) {
    return this._addCheck(__assign({kind: "uuid"}, errorUtil.errToObj(e2)));
  }, t.prototype.cuid = function(e2) {
    return this._addCheck(__assign({kind: "cuid"}, errorUtil.errToObj(e2)));
  }, t.prototype.regex = function(e2, t2) {
    return this._addCheck(__assign({kind: "regex", regex: e2}, errorUtil.errToObj(t2)));
  }, t.prototype.min = function(e2, t2) {
    return this._addCheck(__assign({kind: "min", value: e2}, errorUtil.errToObj(t2)));
  }, t.prototype.max = function(e2, t2) {
    return this._addCheck(__assign({kind: "max", value: e2}, errorUtil.errToObj(t2)));
  }, t.prototype.length = function(e2, t2) {
    return this.min(e2, t2).max(e2, t2);
  }, Object.defineProperty(t.prototype, "isEmail", {get: function() {
    return !!this._def.checks.find(function(e2) {
      return e2.kind === "email";
    });
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "isURL", {get: function() {
    return !!this._def.checks.find(function(e2) {
      return e2.kind === "url";
    });
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "isUUID", {get: function() {
    return !!this._def.checks.find(function(e2) {
      return e2.kind === "uuid";
    });
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "isCUID", {get: function() {
    return !!this._def.checks.find(function(e2) {
      return e2.kind === "cuid";
    });
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "minLength", {get: function() {
    var t2 = -1 / 0;
    return this._def.checks.map(function(e2) {
      e2.kind === "min" && (t2 === null || e2.value > t2) && (t2 = e2.value);
    }), t2;
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "maxLength", {get: function() {
    var t2 = null;
    return this._def.checks.map(function(e2) {
      e2.kind === "max" && (t2 === null || e2.value < t2) && (t2 = e2.value);
    }), t2;
  }, enumerable: false, configurable: true}), t.create = function(e2) {
    return new t(__assign({checks: [], typeName: ZodFirstPartyTypeKind.ZodString}, processCreateParams(e2)));
  }, t;
}(ZodType), ZodNumber = function(t) {
  function o() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.min = e.gte, e.max = e.lte, e.step = e.multipleOf, e;
  }
  return __extends(o, t), o.prototype._parse = function(e, t2, r) {
    var n, o2;
    if (r !== ZodParsedType.number)
      return this.addIssue(e, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.number, received: r}, {data: t2}), INVALID;
    var a = false;
    try {
      for (var i = __values(this._def.checks), s = i.next(); !s.done; s = i.next()) {
        var u = s.value;
        u.kind === "int" ? util.isInteger(t2) || (a = true, this.addIssue(e, {code: ZodIssueCode.invalid_type, expected: "integer", received: "float", message: u.message}, {data: t2})) : u.kind === "min" ? (u.inclusive ? t2 < u.value : t2 <= u.value) && (a = true, this.addIssue(e, {code: ZodIssueCode.too_small, minimum: u.value, type: "number", inclusive: u.inclusive, message: u.message}, {data: t2})) : u.kind === "max" ? (u.inclusive ? t2 > u.value : t2 >= u.value) && (a = true, this.addIssue(e, {code: ZodIssueCode.too_big, maximum: u.value, type: "number", inclusive: u.inclusive, message: u.message}, {data: t2})) : u.kind === "multipleOf" ? t2 % u.value != 0 && (a = true, this.addIssue(e, {code: ZodIssueCode.not_multiple_of, multipleOf: u.value, message: u.message}, {data: t2})) : util.assertNever(u);
      }
    } catch (e2) {
      n = {error: e2};
    } finally {
      try {
        s && !s.done && (o2 = i.return) && o2.call(i);
      } finally {
        if (n)
          throw n.error;
      }
    }
    return a ? INVALID : OK(t2);
  }, o.prototype.gte = function(e, t2) {
    return this.setLimit("min", e, true, errorUtil.toString(t2));
  }, o.prototype.gt = function(e, t2) {
    return this.setLimit("min", e, false, errorUtil.toString(t2));
  }, o.prototype.lte = function(e, t2) {
    return this.setLimit("max", e, true, errorUtil.toString(t2));
  }, o.prototype.lt = function(e, t2) {
    return this.setLimit("max", e, false, errorUtil.toString(t2));
  }, o.prototype.setLimit = function(e, t2, r, n) {
    return new o(__assign(__assign({}, this._def), {checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [{kind: e, value: t2, inclusive: r, message: errorUtil.toString(n)}])}));
  }, o.prototype._addCheck = function(e) {
    return new o(__assign(__assign({}, this._def), {checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [e])}));
  }, o.prototype.int = function(e) {
    return this._addCheck({kind: "int", message: errorUtil.toString(e)});
  }, o.prototype.positive = function(e) {
    return this._addCheck({kind: "min", value: 0, inclusive: false, message: errorUtil.toString(e)});
  }, o.prototype.negative = function(e) {
    return this._addCheck({kind: "max", value: 0, inclusive: false, message: errorUtil.toString(e)});
  }, o.prototype.nonpositive = function(e) {
    return this._addCheck({kind: "max", value: 0, inclusive: true, message: errorUtil.toString(e)});
  }, o.prototype.nonnegative = function(e) {
    return this._addCheck({kind: "min", value: 0, inclusive: true, message: errorUtil.toString(e)});
  }, o.prototype.multipleOf = function(e, t2) {
    return this._addCheck({kind: "multipleOf", value: e, message: errorUtil.toString(t2)});
  }, Object.defineProperty(o.prototype, "minValue", {get: function() {
    var t2, e, r = null;
    try {
      for (var n = __values(this._def.checks), o2 = n.next(); !o2.done; o2 = n.next()) {
        var a = o2.value;
        a.kind === "min" && (r === null || a.value > r) && (r = a.value);
      }
    } catch (e2) {
      t2 = {error: e2};
    } finally {
      try {
        o2 && !o2.done && (e = n.return) && e.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true}), Object.defineProperty(o.prototype, "maxValue", {get: function() {
    var t2, e, r = null;
    try {
      for (var n = __values(this._def.checks), o2 = n.next(); !o2.done; o2 = n.next()) {
        var a = o2.value;
        a.kind === "max" && (r === null || a.value < r) && (r = a.value);
      }
    } catch (e2) {
      t2 = {error: e2};
    } finally {
      try {
        o2 && !o2.done && (e = n.return) && e.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true}), Object.defineProperty(o.prototype, "isInt", {get: function() {
    return !!this._def.checks.find(function(e) {
      return e.kind === "int";
    });
  }, enumerable: false, configurable: true}), o.create = function(e) {
    return new o(__assign(__assign({checks: [], typeName: ZodFirstPartyTypeKind.ZodNumber}, processCreateParams(e)), processCreateParams(e)));
  }, o;
}(ZodType), ZodBigInt = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return r !== ZodParsedType.bigint ? (this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.bigint, received: r}, {data: t2}), INVALID) : OK(t2);
  }, t.create = function(e2) {
    return new t(__assign({typeName: ZodFirstPartyTypeKind.ZodBigInt}, processCreateParams(e2)));
  }, t;
}(ZodType), ZodBoolean = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return r !== ZodParsedType.boolean ? (this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.boolean, received: r}, {data: t2}), INVALID) : OK(t2);
  }, t.create = function(e2) {
    return new t(__assign({typeName: ZodFirstPartyTypeKind.ZodBoolean}, processCreateParams(e2)));
  }, t;
}(ZodType), ZodDate = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return r !== ZodParsedType.date ? (this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.date, received: r}, {data: t2}), INVALID) : isNaN(t2.getTime()) ? (this.addIssue(e2, {code: ZodIssueCode.invalid_date}, {data: t2}), INVALID) : OK(new Date(t2.getTime()));
  }, t.create = function(e2) {
    return new t(__assign({typeName: ZodFirstPartyTypeKind.ZodDate}, processCreateParams(e2)));
  }, t;
}(ZodType), ZodUndefined = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return r !== ZodParsedType.undefined ? (this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.undefined, received: r}, {data: t2}), INVALID) : OK(t2);
  }, t.create = function(e2) {
    return new t(__assign({typeName: ZodFirstPartyTypeKind.ZodUndefined}, processCreateParams(e2)));
  }, t;
}(ZodType), ZodNull = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return r !== ZodParsedType.null ? (this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.null, received: r}, {data: t2}), INVALID) : OK(t2);
  }, t.create = function(e2) {
    return new t(__assign({typeName: ZodFirstPartyTypeKind.ZodNull}, processCreateParams(e2)));
  }, t;
}(ZodType), ZodAny = function(t) {
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e._any = true, e;
  }
  return __extends(r, t), r.prototype._parse = function(e, t2, r2) {
    return OK(t2);
  }, r.create = function(e) {
    return new r(__assign({typeName: ZodFirstPartyTypeKind.ZodAny}, processCreateParams(e)));
  }, r;
}(ZodType), ZodUnknown = function(t) {
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e._unknown = true, e;
  }
  return __extends(r, t), r.prototype._parse = function(e, t2, r2) {
    return OK(t2);
  }, r.create = function(e) {
    return new r(__assign({typeName: ZodFirstPartyTypeKind.ZodUnknown}, processCreateParams(e)));
  }, r;
}(ZodType), ZodNever = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.never, received: r}, {data: t2}), INVALID;
  }, t.create = function(e2) {
    return new t(__assign({typeName: ZodFirstPartyTypeKind.ZodNever}, processCreateParams(e2)));
  }, t;
}(ZodType), ZodVoid = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return r !== ZodParsedType.undefined ? (this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.void, received: r}, {data: t2}), INVALID) : OK(t2);
  }, t.create = function(e2) {
    return new t(__assign({typeName: ZodFirstPartyTypeKind.ZodVoid}, processCreateParams(e2)));
  }, t;
}(ZodType), ZodArray = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(r2, e2, t) {
    var n = this._def;
    if (t !== ZodParsedType.array)
      return this.addIssue(r2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.array, received: t}, {data: e2}), INVALID;
    var e2 = e2, o = false;
    n.minLength !== null && e2.length < n.minLength.value && (o = true, this.addIssue(r2, {code: ZodIssueCode.too_small, minimum: n.minLength.value, type: "array", inclusive: true, message: n.minLength.message}, {data: e2})), n.maxLength !== null && e2.length > n.maxLength.value && (o = true, this.addIssue(r2, {code: ZodIssueCode.too_big, maximum: n.maxLength.value, type: "array", inclusive: true, message: n.maxLength.message}, {data: e2}));
    var a = [], i = new Array(e2.length), s = n.type, u = function(t2, e3) {
      isOk(e3) ? i[t2] = e3.value : isInvalid(e3) ? o = true : a.push(e3.then(function(e4) {
        return u(t2, e4);
      }));
    };
    return e2.forEach(function(e3, t2) {
      u(t2, s._parse(r2.stepInto(t2), e3, getParsedType(e3)));
    }), r2.async ? Promise.all(a).then(function() {
      return o ? INVALID : OK(i);
    }) : o ? INVALID : OK(i);
  }, Object.defineProperty(r.prototype, "element", {get: function() {
    return this._def.type;
  }, enumerable: false, configurable: true}), r.prototype.min = function(e2, t) {
    return new r(__assign(__assign({}, this._def), {minLength: {value: e2, message: errorUtil.toString(t)}}));
  }, r.prototype.max = function(e2, t) {
    return new r(__assign(__assign({}, this._def), {maxLength: {value: e2, message: errorUtil.toString(t)}}));
  }, r.prototype.length = function(e2, t) {
    return this.min(e2, t).max(e2, t);
  }, r.prototype.nonempty = function(e2) {
    return this.min(1, e2);
  }, r.create = function(e2, t) {
    return new r(__assign({type: e2, minLength: null, maxLength: null, typeName: ZodFirstPartyTypeKind.ZodArray}, processCreateParams(t)));
  }, r;
}(ZodType);
!function(e) {
  e.mergeShapes = function(e2, t) {
    return __assign(__assign({}, e2), t);
  }, e.intersectShapes = function(e2, t) {
    var r, n, o = util.objectKeys(e2), a = util.objectKeys(t), o = o.filter(function(e3) {
      return a.indexOf(e3) !== -1;
    }), i = {};
    try {
      for (var s = __values(o), u = s.next(); !u.done; u = s.next()) {
        var d = u.value;
        i[d] = ZodIntersection.create(e2[d], t[d]);
      }
    } catch (e3) {
      r = {error: e3};
    } finally {
      try {
        u && !u.done && (n = s.return) && n.call(s);
      } finally {
        if (r)
          throw r.error;
      }
    }
    return __assign(__assign(__assign({}, e2), t), i);
  };
}(objectUtil = objectUtil || {});
var mergeObjects = function(r) {
  return function(e) {
    var t = objectUtil.mergeShapes(r._def.shape(), e._def.shape());
    return new ZodObject({unknownKeys: r._def.unknownKeys, catchall: r._def.catchall, shape: function() {
      return t;
    }, typeName: ZodFirstPartyTypeKind.ZodObject});
  };
}, AugmentFactory = function(t) {
  return function(e) {
    return new ZodObject(__assign(__assign({}, t), {shape: function() {
      return __assign(__assign({}, t.shape()), e);
    }}));
  };
};
function deepPartialify(e) {
  if (e instanceof ZodObject) {
    var t, r = {};
    for (t in e.shape) {
      var n = e.shape[t];
      r[t] = ZodOptional.create(deepPartialify(n));
    }
    return new ZodObject(__assign(__assign({}, e._def), {shape: function() {
      return r;
    }}));
  }
  return e instanceof ZodArray ? ZodArray.create(deepPartialify(e.element)) : e instanceof ZodOptional ? ZodOptional.create(deepPartialify(e.unwrap())) : e instanceof ZodNullable ? ZodNullable.create(deepPartialify(e.unwrap())) : e instanceof ZodTuple ? ZodTuple.create(e.items.map(function(e2) {
    return deepPartialify(e2);
  })) : e;
}
var ZodObject = function(t) {
  function a() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e._cached = null, e.nonstrict = e.passthrough, e.augment = AugmentFactory(e._def), e.extend = AugmentFactory(e._def), e;
  }
  return __extends(a, t), a.prototype._getCached = function() {
    if (this._cached !== null)
      return this._cached;
    var e = this._def.shape(), t2 = util.objectKeys(e);
    return this._cached = {shape: e, keys: t2};
  }, a.prototype._parse = function(e, n, t2) {
    var r, o, a2, i, s;
    if (t2 !== ZodParsedType.object)
      return this.addIssue(e, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.object, received: t2}, {data: n}), INVALID;
    var t2 = this._getCached(), u = t2.shape, t2 = t2.keys, d = false, c = [], p = {}, l = function(t3, e2) {
      var r2;
      isOk(e2) ? ((r2 = e2.value) !== void 0 || t3 in n) && (p[t3] = r2) : isInvalid(e2) ? d = true : c.push(e2.then(function(e3) {
        return l(t3, e3);
      }));
    };
    try {
      for (var f = __values(t2), y = f.next(); !y.done; y = f.next()) {
        var _ = y.value, h = u[_], m = n[_];
        l(_, h._parse(e.stepInto(_), m, getParsedType(m)));
      }
    } catch (e2) {
      v = {error: e2};
    } finally {
      try {
        y && !y.done && (r = f.return) && r.call(f);
      } finally {
        if (v)
          throw v.error;
      }
    }
    if (this._def.catchall instanceof ZodNever) {
      var v = this._def.unknownKeys;
      if (v === "passthrough") {
        var Z = util.objectKeys(n).filter(function(e2) {
          return !(e2 in u);
        });
        try {
          for (var g = __values(Z), T = g.next(); !T.done; T = g.next()) {
            _ = T.value;
            p[_] = n[_];
          }
        } catch (e2) {
          o = {error: e2};
        } finally {
          try {
            T && !T.done && (a2 = g.return) && a2.call(g);
          } finally {
            if (o)
              throw o.error;
          }
        }
      } else if (v === "strict")
        0 < (Z = util.objectKeys(n).filter(function(e2) {
          return !(e2 in u);
        })).length && (d = true, this.addIssue(e, {code: ZodIssueCode.unrecognized_keys, keys: Z}, {data: n}));
      else if (v !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      var b = this._def.catchall, Z = util.objectKeys(n).filter(function(e2) {
        return !(e2 in u);
      });
      try {
        for (var I = __values(Z), P = I.next(); !P.done; P = I.next()) {
          _ = P.value, m = n[_];
          l(_, b._parse(e.stepInto(_), m, getParsedType(m)));
        }
      } catch (e2) {
        i = {error: e2};
      } finally {
        try {
          P && !P.done && (s = I.return) && s.call(I);
        } finally {
          if (i)
            throw i.error;
        }
      }
    }
    return e.async ? Promise.all(c).then(function() {
      return d ? INVALID : OK(p);
    }) : d ? INVALID : OK(p);
  }, Object.defineProperty(a.prototype, "shape", {get: function() {
    return this._def.shape();
  }, enumerable: false, configurable: true}), a.prototype.strict = function() {
    return new a(__assign(__assign({}, this._def), {unknownKeys: "strict"}));
  }, a.prototype.strip = function() {
    return new a(__assign(__assign({}, this._def), {unknownKeys: "strip"}));
  }, a.prototype.passthrough = function() {
    return new a(__assign(__assign({}, this._def), {unknownKeys: "passthrough"}));
  }, a.prototype.setKey = function(e, t2) {
    var r;
    return this.augment(((r = {})[e] = t2, r));
  }, a.prototype.merge = function(e) {
    var t2 = objectUtil.mergeShapes(this._def.shape(), e._def.shape());
    return new a({unknownKeys: e._def.unknownKeys, catchall: e._def.catchall, shape: function() {
      return t2;
    }, typeName: ZodFirstPartyTypeKind.ZodObject});
  }, a.prototype.catchall = function(e) {
    return new a(__assign(__assign({}, this._def), {catchall: e}));
  }, a.prototype.pick = function(e) {
    var t2 = this, r = {};
    return util.objectKeys(e).map(function(e2) {
      r[e2] = t2.shape[e2];
    }), new a(__assign(__assign({}, this._def), {shape: function() {
      return r;
    }}));
  }, a.prototype.omit = function(t2) {
    var r = this, n = {};
    return util.objectKeys(this.shape).map(function(e) {
      util.objectKeys(t2).indexOf(e) === -1 && (n[e] = r.shape[e]);
    }), new a(__assign(__assign({}, this._def), {shape: function() {
      return n;
    }}));
  }, a.prototype.deepPartial = function() {
    return deepPartialify(this);
  }, a.prototype.partial = function(t2) {
    var e, r = this, n = {};
    if (t2)
      return util.objectKeys(this.shape).map(function(e2) {
        util.objectKeys(t2).indexOf(e2) === -1 ? n[e2] = r.shape[e2] : n[e2] = r.shape[e2].optional();
      }), new a(__assign(__assign({}, this._def), {shape: function() {
        return n;
      }}));
    for (e in this.shape) {
      var o = this.shape[e];
      n[e] = o.optional();
    }
    return new a(__assign(__assign({}, this._def), {shape: function() {
      return n;
    }}));
  }, a.prototype.required = function() {
    var e, t2 = {};
    for (e in this.shape) {
      for (var r = this.shape[e]; r instanceof ZodOptional; )
        r = r._def.innerType;
      t2[e] = r;
    }
    return new a(__assign(__assign({}, this._def), {shape: function() {
      return t2;
    }}));
  }, a.create = function(e, t2) {
    return new a(__assign({shape: function() {
      return e;
    }, unknownKeys: "strip", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject}, processCreateParams(t2)));
  }, a.strictCreate = function(e, t2) {
    return new a(__assign({shape: function() {
      return e;
    }, unknownKeys: "strict", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject}, processCreateParams(t2)));
  }, a.lazycreate = function(e, t2) {
    return new a(__assign({shape: e, unknownKeys: "strip", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject}, processCreateParams(t2)));
  }, a;
}(ZodType), ZodUnion = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(r2, n, o) {
    function i(e3) {
      var t2 = e3.map(function(e4) {
        return new ZodError(e4);
      });
      return (e3 = t2.filter(function(e4) {
        return e4.issues[0].code !== "invalid_type";
      })).length === 1 ? e3[0].issues.forEach(function(e4) {
        return r2.issues.push(e4);
      }) : a.addIssue(r2, {code: ZodIssueCode.invalid_union, unionErrors: t2}, {data: n}), INVALID;
    }
    var t, e2, a = this, s = this._def.options;
    if (r2.async) {
      var u = s.map(function() {
        return new ParseContext(__assign(__assign({}, r2.def), {issues: []}));
      });
      return Promise.all(s.map(function(e3, t2) {
        return e3._parse(u[t2], n, o);
      })).then(function(e3) {
        var t2, r3;
        try {
          for (var n2 = __values(e3), o2 = n2.next(); !o2.done; o2 = n2.next()) {
            var a2 = o2.value;
            if (isOk(a2))
              return a2;
          }
        } catch (e4) {
          t2 = {error: e4};
        } finally {
          try {
            o2 && !o2.done && (r3 = n2.return) && r3.call(n2);
          } finally {
            if (t2)
              throw t2.error;
          }
        }
        return i(u.map(function(e4) {
          return e4.issues;
        }));
      });
    }
    var d = [];
    try {
      for (var c = __values(s), p = c.next(); !p.done; p = c.next()) {
        var l = p.value, f = new ParseContext(__assign(__assign({}, r2.def), {issues: []})), y = l._parseSync(f, n, o);
        if (!isInvalid(y))
          return y;
        d.push(f.issues);
      }
    } catch (e3) {
      t = {error: e3};
    } finally {
      try {
        p && !p.done && (e2 = c.return) && e2.call(c);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return i(d);
  }, Object.defineProperty(r.prototype, "options", {get: function() {
    return this._def.options;
  }, enumerable: false, configurable: true}), r.create = function(e2, t) {
    return new r(__assign({options: e2, typeName: ZodFirstPartyTypeKind.ZodUnion}, processCreateParams(t)));
  }, r;
}(ZodType);
function mergeValues(e, t) {
  var r, n, o = getParsedType(e), a = getParsedType(t);
  if (e === t)
    return {valid: true, data: e};
  if (o === ZodParsedType.object && a === ZodParsedType.object) {
    var i = util.objectKeys(t), s = util.objectKeys(e).filter(function(e2) {
      return i.indexOf(e2) !== -1;
    }), u = __assign(__assign({}, e), t);
    try {
      for (var d = __values(s), c = d.next(); !c.done; c = d.next()) {
        var p = c.value;
        if (!(l = mergeValues(e[p], t[p])).valid)
          return {valid: false};
        u[p] = l.data;
      }
    } catch (e2) {
      r = {error: e2};
    } finally {
      try {
        c && !c.done && (n = d.return) && n.call(d);
      } finally {
        if (r)
          throw r.error;
      }
    }
    return {valid: true, data: u};
  }
  if (o !== ZodParsedType.array || a !== ZodParsedType.array)
    return {valid: false};
  if (e.length !== t.length)
    return {valid: false};
  for (var l, f = [], y = 0; y < e.length; y++) {
    if (!(l = mergeValues(e[y], t[y])).valid)
      return {valid: false};
    f.push(l.data);
  }
  return {valid: true, data: f};
}
var ZodIntersection = function(e) {
  function n() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(n, e), n.prototype._parse = function(r, n2, e2) {
    function o(e3, t) {
      return isInvalid(e3) || isInvalid(t) ? INVALID : (t = mergeValues(e3.value, t.value)).valid ? OK(t.data) : (a.addIssue(r, {code: ZodIssueCode.invalid_intersection_types}, {data: n2}), INVALID);
    }
    var a = this;
    return r.async ? Promise.all([this._def.left._parse(r, n2, e2), this._def.right._parse(r, n2, e2)]).then(function(e3) {
      var t = __read(e3, 2), e3 = t[0], t = t[1];
      return o(e3, t);
    }) : o(this._def.left._parseSync(r, n2, e2), this._def.right._parseSync(r, n2, e2));
  }, n.create = function(e2, t, r) {
    return new n(__assign({left: e2, right: t, typeName: ZodFirstPartyTypeKind.ZodIntersection}, processCreateParams(r)));
  }, n;
}(ZodType), ZodTuple = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(r2, n, e2) {
    if (e2 !== ZodParsedType.array)
      return this.addIssue(r2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.array, received: e2}, {data: n}), INVALID;
    var o = this._def.rest;
    if (!o && n.length > this._def.items.length)
      return this.addIssue(r2, {code: ZodIssueCode.too_big, maximum: this._def.items.length, inclusive: true, type: "array"}, {data: n}), INVALID;
    if (n.length < this._def.items.length)
      return this.addIssue(r2, {code: ZodIssueCode.too_small, minimum: this._def.items.length, inclusive: true, type: "array"}, {data: n}), INVALID;
    var a = [], i = this._def.items, s = new Array(n.length), u = false, d = function(t, e3) {
      isOk(e3) ? s[t] = e3.value : isInvalid(e3) ? u = true : a.push(e3.then(function(e4) {
        return d(t, e4);
      }));
    };
    return i.forEach(function(e3, t) {
      d(t, e3._parse(r2.stepInto(t), n[t], getParsedType(n[t])));
    }), o && n.slice(i.length).forEach(function(e3, t) {
      t += i.length;
      d(t, o._parse(r2.stepInto(t), e3, getParsedType(e3)));
    }), r2.async ? Promise.all(a).then(function() {
      return u ? INVALID : OK(s);
    }) : u ? INVALID : OK(s);
  }, Object.defineProperty(r.prototype, "items", {get: function() {
    return this._def.items;
  }, enumerable: false, configurable: true}), r.prototype.rest = function(e2) {
    return new r(__assign(__assign({}, this._def), {rest: e2}));
  }, r.create = function(e2, t) {
    return new r(__assign({items: e2, typeName: ZodFirstPartyTypeKind.ZodTuple, rest: null}, processCreateParams(t)));
  }, r;
}(ZodType), ZodRecord = function(e) {
  function n() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(n, e), Object.defineProperty(n.prototype, "keySchema", {get: function() {
    return this._def.keyType;
  }, enumerable: false, configurable: true}), Object.defineProperty(n.prototype, "valueSchema", {get: function() {
    return this._def.valueType;
  }, enumerable: false, configurable: true}), n.prototype._parse = function(e2, t, r) {
    if (r !== ZodParsedType.object)
      return this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.object, received: r}, {data: t}), INVALID;
    var n2, o = [], a = this._def.keyType, i = this._def.valueType, s = {}, u = false, d = function(e3, t2) {
      isOk(e3) && isOk(t2) ? s[e3.value] = t2.value : isAsync(e3) || isAsync(t2) ? o.push(Promise.all([e3, t2]).then(function(e4) {
        var t3 = __read(e4, 2), e4 = t3[0], t3 = t3[1];
        return d(e4, t3);
      })) : u = true;
    };
    for (n2 in t)
      d(a._parse(e2.stepInto(n2), n2, getParsedType(n2)), i._parse(e2.stepInto(n2), t[n2], getParsedType(t[n2])));
    return e2.async ? Promise.all(o).then(function() {
      return u ? INVALID : OK(s);
    }) : u ? INVALID : OK(s);
  }, Object.defineProperty(n.prototype, "element", {get: function() {
    return this._def.valueType;
  }, enumerable: false, configurable: true}), n.create = function(e2, t, r) {
    return new n(t instanceof ZodType ? __assign({keyType: e2, valueType: t, typeName: ZodFirstPartyTypeKind.ZodRecord}, processCreateParams(r)) : __assign({keyType: ZodString.create(), valueType: e2, typeName: ZodFirstPartyTypeKind.ZodRecord}, processCreateParams(t)));
  }, n;
}(ZodType), ZodMap = function(e) {
  function n() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(n, e), n.prototype._parse = function(n2, e2, t) {
    if (t !== ZodParsedType.map)
      return this.addIssue(n2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.map, received: t}, {data: e2}), INVALID;
    var o = this._def.keyType, a = this._def.valueType, e2 = e2, r = new Map(), i = [], s = false, u = function(e3, t2) {
      isAsync(e3) || isAsync(t2) ? i.push(Promise.all([e3, t2]).then(function(e4) {
        var t3 = __read(e4, 2), e4 = t3[0], t3 = t3[1];
        return u(e4, t3);
      })) : isInvalid(e3) || isInvalid(t2) ? s = true : r.set(e3.value, t2.value);
    };
    return __spreadArray([], __read(e2.entries())).forEach(function(e3, t2) {
      var r2 = __read(e3, 2), e3 = r2[0], r2 = r2[1], t2 = n2.stepInto(t2), e3 = o._parse(t2.stepInto("key"), e3, getParsedType(e3)), r2 = a._parse(t2.stepInto("value"), r2, getParsedType(r2));
      u(e3, r2);
    }), n2.async ? Promise.all(i).then(function() {
      return s ? INVALID : OK(r);
    }) : s ? INVALID : OK(r);
  }, n.create = function(e2, t, r) {
    return new n(__assign({valueType: t, keyType: e2, typeName: ZodFirstPartyTypeKind.ZodMap}, processCreateParams(r)));
  }, n;
}(ZodType), ZodSet = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(r2, e2, t) {
    if (t !== ZodParsedType.set)
      return this.addIssue(r2, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.set, received: t}, {data: e2}), INVALID;
    var e2 = e2, n = this._def.valueType, o = new Set(), a = [], i = false, s = function(e3) {
      isOk(e3) ? o.add(e3.value) : isInvalid(e3) ? i = true : a.push(e3.then(function(e4) {
        return s(e4);
      }));
    };
    return __spreadArray([], __read(e2.values())).forEach(function(e3, t2) {
      return s(n._parse(r2.stepInto(t2), e3, getParsedType(e3)));
    }), r2.async ? Promise.all(a).then(function() {
      return i ? INVALID : OK(o);
    }) : i ? INVALID : OK(o);
  }, r.create = function(e2, t) {
    return new r(__assign({valueType: e2, typeName: ZodFirstPartyTypeKind.ZodSet}, processCreateParams(t)));
  }, r;
}(ZodType), ZodFunction = function(t) {
  function n() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.validate = e.implement, e;
  }
  return __extends(n, t), n.prototype._parse = function(r, e, t2) {
    var a = this;
    if (t2 !== ZodParsedType.function)
      return this.addIssue(r, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.function, received: t2}, {data: e}), INVALID;
    function i(e2, t3) {
      return makeIssue({data: e2, path: pathToArray(r.path), errorMaps: [r.errorMap], issueData: {code: ZodIssueCode.invalid_arguments, argumentsError: t3}});
    }
    function s(e2, t3) {
      return makeIssue({data: e2, path: pathToArray(r.path), errorMaps: [r.errorMap], issueData: {code: ZodIssueCode.invalid_return_type, returnTypeError: t3}});
    }
    var u = {errorMap: r.errorMap}, d = e;
    return this._def.returns instanceof ZodPromise ? OK(function() {
      for (var o = [], e2 = 0; e2 < arguments.length; e2++)
        o[e2] = arguments[e2];
      return __awaiter(a, void 0, void 0, function() {
        var t3, r2, n2;
        return __generator(this, function(e3) {
          switch (e3.label) {
            case 0:
              return t3 = new ZodError([]), [4, this._def.args.parseAsync(o, u).catch(function(e4) {
                throw t3.addIssue(i(o, e4)), t3;
              })];
            case 1:
              return r2 = e3.sent(), [4, d.apply(void 0, __spreadArray([], __read(r2)))];
            case 2:
              return n2 = e3.sent(), [4, this._def.returns.parseAsync(n2, u).catch(function(e4) {
                throw t3.addIssue(s(n2, e4)), t3;
              })];
            case 3:
              return [2, e3.sent()];
          }
        });
      });
    }) : OK(function() {
      for (var e2 = [], t3 = 0; t3 < arguments.length; t3++)
        e2[t3] = arguments[t3];
      var r2 = a._def.args.safeParse(e2, u);
      if (!r2.success)
        throw new ZodError([i(e2, r2.error)]);
      var n2 = d.apply(void 0, __spreadArray([], __read(r2.data))), r2 = a._def.returns.safeParse(n2, u);
      if (!r2.success)
        throw new ZodError([s(n2, r2.error)]);
      return r2.data;
    });
  }, n.prototype.parameters = function() {
    return this._def.args;
  }, n.prototype.returnType = function() {
    return this._def.returns;
  }, n.prototype.args = function() {
    for (var e = [], t2 = 0; t2 < arguments.length; t2++)
      e[t2] = arguments[t2];
    return new n(__assign(__assign({}, this._def), {args: ZodTuple.create(e).rest(ZodUnknown.create())}));
  }, n.prototype.returns = function(e) {
    return new n(__assign(__assign({}, this._def), {returns: e}));
  }, n.prototype.implement = function(e) {
    return this.parse(e);
  }, n.prototype.strictImplement = function(e) {
    return this.parse(e);
  }, n.create = function(e, t2, r) {
    return new n(__assign({args: (e || ZodTuple.create([])).rest(ZodUnknown.create()), returns: t2 || ZodUnknown.create(), typeName: ZodFirstPartyTypeKind.ZodFunction}, processCreateParams(r)));
  }, n;
}(ZodType), ZodLazy = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), Object.defineProperty(r.prototype, "schema", {get: function() {
    return this._def.getter();
  }, enumerable: false, configurable: true}), r.prototype._parse = function(e2, t, r2) {
    return this._def.getter()._parse(e2, t, r2);
  }, r.create = function(e2, t) {
    return new r(__assign({getter: e2, typeName: ZodFirstPartyTypeKind.ZodLazy}, processCreateParams(t)));
  }, r;
}(ZodType), ZodLiteral = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2, t, r2) {
    return t !== this._def.value ? (this.addIssue(e2, {code: ZodIssueCode.invalid_type, expected: this._def.value, received: t}, {data: t}), INVALID) : OK(t);
  }, Object.defineProperty(r.prototype, "value", {get: function() {
    return this._def.value;
  }, enumerable: false, configurable: true}), r.create = function(e2, t) {
    return new r(__assign({value: e2, typeName: ZodFirstPartyTypeKind.ZodLiteral}, processCreateParams(t)));
  }, r;
}(ZodType);
function createZodEnum(e) {
  return new ZodEnum({values: e, typeName: ZodFirstPartyTypeKind.ZodEnum});
}
var ZodFirstPartyTypeKind, ZodEnum = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return this._def.values.indexOf(t2) === -1 ? (this.addIssue(e2, {code: ZodIssueCode.invalid_enum_value, options: this._def.values}, {data: t2}), INVALID) : OK(t2);
  }, Object.defineProperty(t.prototype, "options", {get: function() {
    return this._def.values;
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "enum", {get: function() {
    var t2, e2, r = {};
    try {
      for (var n = __values(this._def.values), o = n.next(); !o.done; o = n.next()) {
        var a = o.value;
        r[a] = a;
      }
    } catch (e3) {
      t2 = {error: e3};
    } finally {
      try {
        o && !o.done && (e2 = n.return) && e2.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "Values", {get: function() {
    var t2, e2, r = {};
    try {
      for (var n = __values(this._def.values), o = n.next(); !o.done; o = n.next()) {
        var a = o.value;
        r[a] = a;
      }
    } catch (e3) {
      t2 = {error: e3};
    } finally {
      try {
        o && !o.done && (e2 = n.return) && e2.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true}), Object.defineProperty(t.prototype, "Enum", {get: function() {
    var t2, e2, r = {};
    try {
      for (var n = __values(this._def.values), o = n.next(); !o.done; o = n.next()) {
        var a = o.value;
        r[a] = a;
      }
    } catch (e3) {
      t2 = {error: e3};
    } finally {
      try {
        o && !o.done && (e2 = n.return) && e2.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true}), t.create = createZodEnum, t;
}(ZodType), ZodNativeEnum = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2, t, r2) {
    var n = util.getValidEnumValues(this._def.values);
    return n.indexOf(t) === -1 ? (this.addIssue(e2, {code: ZodIssueCode.invalid_enum_value, options: util.objectValues(n)}, {data: t}), INVALID) : OK(t);
  }, r.create = function(e2, t) {
    return new r(__assign({values: e2, typeName: ZodFirstPartyTypeKind.ZodNativeEnum}, processCreateParams(t)));
  }, r;
}(ZodType), ZodPromise = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(t, e2, r2) {
    var n = this;
    if (r2 !== ZodParsedType.promise && t.async === false)
      return this.addIssue(t, {code: ZodIssueCode.invalid_type, expected: ZodParsedType.promise, received: r2}, {data: e2}), INVALID;
    e2 = r2 === ZodParsedType.promise ? e2 : Promise.resolve(e2);
    return OK(e2.then(function(e3) {
      return n._def.type.parseAsync(e3, {path: pathToArray(t.path), errorMap: t.errorMap});
    }));
  }, r.create = function(e2, t) {
    return new r(__assign({type: e2, typeName: ZodFirstPartyTypeKind.ZodPromise}, processCreateParams(t)));
  }, r;
}(ZodType), ZodEffects = function(e) {
  function n() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(n, e), n.prototype.innerType = function() {
    return this._def.schema;
  }, n.prototype._parse = function(t, e2, r) {
    var n2 = this, o = t.async === false, a = this._def.effect || null, i = e2, r = r;
    if (a.type === "preprocess") {
      var s = a.transform(e2);
      if (t.async)
        return Promise.resolve(s).then(function(e3) {
          return n2._def.schema._parseAsync(t, e3, getParsedType(e3));
        });
      if ((s = this._def.schema._parseSync(t, s, getParsedType(s))) instanceof Promise)
        throw new Error("Asynchronous preprocess step encountered during synchronous parse operation. Use .parseAsync instead.");
      return s;
    }
    if (a.type === "refinement") {
      function u(e3, t2) {
        t2 = t2.refinement(e3, c);
        if (t2 instanceof Promise) {
          if (o)
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return t2.then(function() {
            return e3;
          });
        }
        return e3;
      }
      var d = false, c = {addIssue: function(e3) {
        d = true, n2.addIssue(t, e3, {data: i});
      }, get path() {
        return pathToArray(t.path);
      }};
      if (c.addIssue = c.addIssue.bind(c), o) {
        var p = this._def.schema._parseSync(t, i, r);
        if (isInvalid(p))
          return INVALID;
        s = u(p.value, a);
        return d ? INVALID : OK(s);
      }
      return this._def.schema._parseAsync(t, i, r).then(function(e3) {
        return isInvalid(e3) ? INVALID : u(e3.value, a);
      }).then(function(e3) {
        return d ? INVALID : OK(e3);
      });
    }
    if (a.type === "transform") {
      function l(e3, t2) {
        e3 = t2.transform(e3);
        if (e3 instanceof Promise && o)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return e3;
      }
      if (o) {
        p = this._def.schema._parseSync(t, i, r);
        if (isInvalid(p))
          return INVALID;
        s = l(p.value, a);
        return OK(s);
      }
      return this._def.schema._parseAsync(t, i, r).then(function(e3) {
        return isInvalid(e3) ? INVALID : l(e3.value, a);
      }).then(function(e3) {
        return OK(e3);
      });
    }
    util.assertNever(a);
  }, n.create = function(e2, t, r) {
    return new n(__assign({schema: e2, typeName: ZodFirstPartyTypeKind.ZodEffects, effect: t}, processCreateParams(r)));
  }, n.createWithPreprocess = function(e2, t, r) {
    return new n(__assign({schema: t, effect: {type: "preprocess", transform: e2}, typeName: ZodFirstPartyTypeKind.ZodEffects}, processCreateParams(r)));
  }, n;
}(ZodType), ZodOptional = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2, t, r2) {
    return r2 === ZodParsedType.undefined ? OK(void 0) : this._def.innerType._parse(e2, t, r2);
  }, r.prototype.unwrap = function() {
    return this._def.innerType;
  }, r.create = function(e2, t) {
    return new r(__assign({innerType: e2, typeName: ZodFirstPartyTypeKind.ZodOptional}, processCreateParams(t)));
  }, r;
}(ZodType), ZodNullable = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2, t, r2) {
    return r2 === ZodParsedType.null ? OK(null) : this._def.innerType._parse(e2, t, r2);
  }, r.prototype.unwrap = function() {
    return this._def.innerType;
  }, r.create = function(e2, t) {
    return new r(__assign({innerType: e2, typeName: ZodFirstPartyTypeKind.ZodNullable}, processCreateParams(t)));
  }, r;
}(ZodType), ZodDefault = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2, t2, r) {
    return r === ZodParsedType.undefined && (t2 = this._def.defaultValue()), this._def.innerType._parse(e2, t2, getParsedType(t2));
  }, t.prototype.removeDefault = function() {
    return this._def.innerType;
  }, t.create = function(e2, t2) {
    return new ZodOptional(__assign({innerType: e2, typeName: ZodFirstPartyTypeKind.ZodOptional}, processCreateParams(t2)));
  }, t;
}(ZodType), custom = function(e, t) {
  return e ? ZodAny.create().refine(e, t) : ZodAny.create();
}, late = {object: ZodObject.lazycreate};
!function(e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodPromise = "ZodPromise";
}(ZodFirstPartyTypeKind = ZodFirstPartyTypeKind || {});
var instanceOfType = function(t, e) {
  return e === void 0 && (e = {message: "Input not instance of " + t.name}), custom(function(e2) {
    return e2 instanceof t;
  }, e);
}, stringType = ZodString.create, numberType = ZodNumber.create, bigIntType = ZodBigInt.create, booleanType = ZodBoolean.create, dateType = ZodDate.create, undefinedType = ZodUndefined.create, nullType = ZodNull.create, anyType = ZodAny.create, unknownType = ZodUnknown.create, neverType = ZodNever.create, voidType = ZodVoid.create, arrayType = ZodArray.create, objectType = ZodObject.create, strictObjectType = ZodObject.strictCreate, unionType = ZodUnion.create, intersectionType = ZodIntersection.create, tupleType = ZodTuple.create, recordType = ZodRecord.create, mapType = ZodMap.create, setType = ZodSet.create, functionType = ZodFunction.create, lazyType = ZodLazy.create, literalType = ZodLiteral.create, enumType = ZodEnum.create, nativeEnumType = ZodNativeEnum.create, promiseType = ZodPromise.create, effectsType = ZodEffects.create, optionalType = ZodOptional.create, nullableType = ZodNullable.create, preprocessType = ZodEffects.createWithPreprocess, ostring = function() {
  return stringType().optional();
}, onumber = function() {
  return numberType().optional();
}, oboolean = function() {
  return booleanType().optional();
}, external = Object.freeze({__proto__: null, ZodParsedType, getParsedType, makeIssue, EMPTY_PATH, pathToArray, pathFromArray, ParseContext, INVALID, OK, isInvalid, isOk, isAsync, ZodType, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, get objectUtil() {
  return objectUtil;
}, mergeObjects, ZodObject, ZodUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodTransformer: ZodEffects, ZodOptional, ZodNullable, ZodDefault, custom, Schema: ZodType, ZodSchema: ZodType, late, get ZodFirstPartyTypeKind() {
  return ZodFirstPartyTypeKind;
}, any: anyType, array: arrayType, bigint: bigIntType, boolean: booleanType, date: dateType, effect: effectsType, enum: enumType, function: functionType, instanceof: instanceOfType, intersection: intersectionType, lazy: lazyType, literal: literalType, map: mapType, nativeEnum: nativeEnumType, never: neverType, null: nullType, nullable: nullableType, number: numberType, object: objectType, oboolean, onumber, optional: optionalType, ostring, preprocess: preprocessType, promise: promiseType, record: recordType, set: setType, strictObject: strictObjectType, string: stringType, transformer: effectsType, tuple: tupleType, undefined: undefinedType, union: unionType, unknown: unknownType, void: voidType, ZodIssueCode, quotelessJson, ZodError, defaultErrorMap, get overrideErrorMap() {
  return overrideErrorMap;
}, setErrorMap});
export {EMPTY_PATH, INVALID, OK, ParseContext, ZodType as Schema, ZodAny, ZodArray, ZodBigInt, ZodBoolean, ZodDate, ZodDefault, ZodEffects, ZodEnum, ZodError, ZodFirstPartyTypeKind, ZodFunction, ZodIntersection, ZodIssueCode, ZodLazy, ZodLiteral, ZodMap, ZodNativeEnum, ZodNever, ZodNull, ZodNullable, ZodNumber, ZodObject, ZodOptional, ZodParsedType, ZodPromise, ZodRecord, ZodType as ZodSchema, ZodSet, ZodString, ZodEffects as ZodTransformer, ZodTuple, ZodType, ZodUndefined, ZodUnion, ZodUnknown, ZodVoid, anyType as any, arrayType as array, bigIntType as bigint, booleanType as boolean, custom, dateType as date, defaultErrorMap, effectsType as effect, enumType as enum, functionType as function, getParsedType, instanceOfType as instanceof, intersectionType as intersection, isAsync, isInvalid, isOk, late, lazyType as lazy, literalType as literal, makeIssue, mapType as map, mergeObjects, nativeEnumType as nativeEnum, neverType as never, nullType as null, nullableType as nullable, numberType as number, objectType as object, objectUtil, oboolean, onumber, optionalType as optional, ostring, overrideErrorMap, pathFromArray, pathToArray, preprocessType as preprocess, promiseType as promise, quotelessJson, recordType as record, setType as set, setErrorMap, strictObjectType as strictObject, stringType as string, effectsType as transformer, tupleType as tuple, undefinedType as undefined, unionType as union, unknownType as unknown, voidType as void, external as z};
export default null;
