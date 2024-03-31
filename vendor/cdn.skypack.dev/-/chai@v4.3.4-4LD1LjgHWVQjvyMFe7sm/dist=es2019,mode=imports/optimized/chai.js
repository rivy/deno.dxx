import AssertionError$1 from "/-/assertion-error@v1.1.0-kNvqltoxcdROsufUrL09/dist=es2019,mode=imports/optimized/assertion-error.js";
import pathval2 from "/-/pathval@v1.1.1-4hf44tKt2vdiXpyywiwN/dist=es2019,mode=imports/optimized/pathval.js";
import type$1 from "/-/type-detect@v4.0.8-3tmjjwwFw2jHiLYy7SbM/dist=es2019,mode=imports/optimized/type-detect.js";
import getName$1 from "/-/get-func-name@v2.0.0-scW92yE6OFNJbvjxk2uF/dist=es2019,mode=imports/optimized/get-func-name.js";
import require$$9 from "/-/deep-eql@v3.0.1-EVT6yn6LFH7vvQx4YnOu/dist=es2019,mode=imports/optimized/deep-eql.js";
import require$$20 from "/-/check-error@v1.0.2-pv7N1FcwI8awT920b4E0/dist=es2019,mode=imports/optimized/check-error.js";
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var flag = function flag2(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};
/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var test = function test2(obj, args) {
  var negate = flag(obj, "negate"), expr = args[0];
  return negate ? !expr : expr;
};
/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var expectTypes = function expectTypes2(obj, types) {
  var flagMsg = flag(obj, "message");
  var ssfi = flag(obj, "ssfi");
  flagMsg = flagMsg ? flagMsg + ": " : "";
  obj = flag(obj, "object");
  types = types.map(function(t) {
    return t.toLowerCase();
  });
  types.sort();
  var str = types.map(function(t, index) {
    var art = ~["a", "e", "i", "o", "u"].indexOf(t.charAt(0)) ? "an" : "a";
    var or = types.length > 1 && index === types.length - 1 ? "or " : "";
    return or + art + " " + t;
  }).join(", ");
  var objType = type$1(obj).toLowerCase();
  if (!types.some(function(expected) {
    return objType === expected;
  })) {
    throw new AssertionError$1(flagMsg + "object tested must be " + str + ", but " + objType + " given", void 0, ssfi);
  }
};
/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var getActual = function getActual2(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
};
/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var getProperties = function getProperties2(object) {
  var result = Object.getOwnPropertyNames(object);
  function addProperty3(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }
  var proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty3);
    proto = Object.getPrototypeOf(proto);
  }
  return result;
};
/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var getEnumerableProperties = function getEnumerableProperties2(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};
var config = {
  includeStack: false,
  showDiff: true,
  truncateThreshold: 40,
  useProxy: true,
  proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"]
};
var inspect_1 = createCommonjsModule(function(module, exports) {
  module.exports = inspect2;
  function inspect2(obj, showHidden, depth, colors) {
    var ctx = {
      showHidden,
      seen: [],
      stylize: function(str) {
        return str;
      }
    };
    return formatValue(ctx, obj, typeof depth === "undefined" ? 2 : depth);
  }
  var isDOMElement = function(object) {
    if (typeof HTMLElement === "object") {
      return object instanceof HTMLElement;
    } else {
      return object && typeof object === "object" && "nodeType" in object && object.nodeType === 1 && typeof object.nodeName === "string";
    }
  };
  function formatValue(ctx, value, recurseTimes) {
    if (value && typeof value.inspect === "function" && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (typeof ret !== "string") {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
    if (isDOMElement(value)) {
      if ("outerHTML" in value) {
        return value.outerHTML;
      } else {
        try {
          if (document.xmlVersion) {
            var xmlSerializer = new XMLSerializer();
            return xmlSerializer.serializeToString(value);
          } else {
            var ns = "http://www.w3.org/1999/xhtml";
            var container = document.createElementNS(ns, "_");
            container.appendChild(value.cloneNode(false));
            var html = container.innerHTML.replace("><", ">" + value.innerHTML + "<");
            container.innerHTML = "";
            return html;
          }
        } catch (err) {
        }
      }
    }
    var visibleKeys = getEnumerableProperties(value);
    var keys = ctx.showHidden ? getProperties(value) : visibleKeys;
    var name, nameSuffix;
    if (keys.length === 0 || isError(value) && (keys.length === 1 && keys[0] === "stack" || keys.length === 2 && keys[0] === "description" && keys[1] === "stack")) {
      if (typeof value === "function") {
        name = getName$1(value);
        nameSuffix = name ? ": " + name : "";
        return ctx.stylize("[Function" + nameSuffix + "]", "special");
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toUTCString.call(value), "date");
      }
      if (isError(value)) {
        return formatError(value);
      }
    }
    var base = "", array = false, typedArray = false, braces = ["{", "}"];
    if (isTypedArray(value)) {
      typedArray = true;
      braces = ["[", "]"];
    }
    if (isArray(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (typeof value === "function") {
      name = getName$1(value);
      nameSuffix = name ? ": " + name : "";
      base = " [Function" + nameSuffix + "]";
    }
    if (isRegExp(value)) {
      base = " " + RegExp.prototype.toString.call(value);
    }
    if (isDate(value)) {
      base = " " + Date.prototype.toUTCString.call(value);
    }
    if (isError(value)) {
      return formatError(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      } else {
        return ctx.stylize("[Object]", "special");
      }
    }
    ctx.seen.push(value);
    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else if (typedArray) {
      return formatTypedArray(value);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }
  function formatPrimitive(ctx, value) {
    switch (typeof value) {
      case "undefined":
        return ctx.stylize("undefined", "undefined");
      case "string":
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      case "number":
        if (value === 0 && 1 / value === -Infinity) {
          return ctx.stylize("-0", "number");
        }
        return ctx.stylize("" + value, "number");
      case "boolean":
        return ctx.stylize("" + value, "boolean");
      case "symbol":
        return ctx.stylize(value.toString(), "symbol");
      case "bigint":
        return ctx.stylize(value.toString() + "n", "bigint");
    }
    if (value === null) {
      return ctx.stylize("null", "null");
    }
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (Object.prototype.hasOwnProperty.call(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
      } else {
        output.push("");
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
      }
    });
    return output;
  }
  function formatTypedArray(value) {
    var str = "[ ";
    for (var i = 0; i < value.length; ++i) {
      if (str.length >= config.truncateThreshold - 7) {
        str += "...";
        break;
      }
      str += value[i] + ", ";
    }
    str += " ]";
    if (str.indexOf(",  ]") !== -1) {
      str = str.replace(",  ]", " ]");
    }
    return str;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name;
    var propDescriptor = Object.getOwnPropertyDescriptor(value, key);
    var str;
    if (propDescriptor) {
      if (propDescriptor.get) {
        if (propDescriptor.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (propDescriptor.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
    }
    if (visibleKeys.indexOf(key) < 0) {
      name = "[" + key + "]";
    }
    if (!str) {
      if (ctx.seen.indexOf(value[key]) < 0) {
        if (recurseTimes === null) {
          str = formatValue(ctx, value[key], null);
        } else {
          str = formatValue(ctx, value[key], recurseTimes - 1);
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str.split("\n").map(function(line) {
              return "  " + line;
            }).join("\n").substr(2);
          } else {
            str = "\n" + str.split("\n").map(function(line) {
              return "   " + line;
            }).join("\n");
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special");
      }
    }
    if (typeof name === "undefined") {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify("" + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, "name");
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, "string");
      }
    }
    return name + ": " + str;
  }
  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function(prev, cur) {
      return prev + cur.length + 1;
    }, 0);
    if (length > 60) {
      return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    }
    return braces[0] + base + " " + output.join(", ") + " " + braces[1];
  }
  function isTypedArray(ar) {
    return typeof ar === "object" && /\w+Array]$/.test(objectToString(ar));
  }
  function isArray(ar) {
    return Array.isArray(ar) || typeof ar === "object" && objectToString(ar) === "[object Array]";
  }
  function isRegExp(re) {
    return typeof re === "object" && objectToString(re) === "[object RegExp]";
  }
  function isDate(d) {
    return typeof d === "object" && objectToString(d) === "[object Date]";
  }
  function isError(e) {
    return typeof e === "object" && objectToString(e) === "[object Error]";
  }
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
});
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var objDisplay = function objDisplay2(obj) {
  var str = inspect_1(obj), type2 = Object.prototype.toString.call(obj);
  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type2 === "[object Function]") {
      return !obj.name || obj.name === "" ? "[Function]" : "[Function: " + obj.name + "]";
    } else if (type2 === "[object Array]") {
      return "[ Array(" + obj.length + ") ]";
    } else if (type2 === "[object Object]") {
      var keys = Object.keys(obj), kstr = keys.length > 2 ? keys.splice(0, 2).join(", ") + ", ..." : keys.join(", ");
      return "{ Object (" + kstr + ") }";
    } else {
      return str;
    }
  } else {
    return str;
  }
};
/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var getMessage = function getMessage2(obj, args) {
  var negate = flag(obj, "negate"), val = flag(obj, "object"), expected = args[3], actual = getActual(obj, args), msg = negate ? args[2] : args[1], flagMsg = flag(obj, "message");
  if (typeof msg === "function")
    msg = msg();
  msg = msg || "";
  msg = msg.replace(/#\{this\}/g, function() {
    return objDisplay(val);
  }).replace(/#\{act\}/g, function() {
    return objDisplay(actual);
  }).replace(/#\{exp\}/g, function() {
    return objDisplay(expected);
  });
  return flagMsg ? flagMsg + ": " + msg : msg;
};
/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var transferFlags = function transferFlags2(assertion2, object, includeAll) {
  var flags = assertion2.__flags || (assertion2.__flags = Object.create(null));
  if (!object.__flags) {
    object.__flags = Object.create(null);
  }
  includeAll = arguments.length === 3 ? includeAll : true;
  for (var flag3 in flags) {
    if (includeAll || flag3 !== "object" && flag3 !== "ssfi" && flag3 !== "lockSsfi" && flag3 != "message") {
      object.__flags[flag3] = flags[flag3];
    }
  }
};
/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var isProxyEnabled = function isProxyEnabled2() {
  return config.useProxy && typeof Proxy !== "undefined" && typeof Reflect !== "undefined";
};
/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var addProperty = function addProperty2(ctx, name, getter) {
  getter = getter === void 0 ? function() {
  } : getter;
  Object.defineProperty(ctx, name, {
    get: function propertyGetter() {
      if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
        flag(this, "ssfi", propertyGetter);
      }
      var result = getter.call(this);
      if (result !== void 0)
        return result;
      var newAssertion = new chai.Assertion();
      transferFlags(this, newAssertion);
      return newAssertion;
    },
    configurable: true
  });
};
var fnLengthDesc = Object.getOwnPropertyDescriptor(function() {
}, "length");
/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var addLengthGuard = function addLengthGuard2(fn, assertionName, isChainable) {
  if (!fnLengthDesc.configurable)
    return fn;
  Object.defineProperty(fn, "length", {
    get: function() {
      if (isChainable) {
        throw Error("Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
      }
      throw Error("Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".');
    }
  });
  return fn;
};
/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var builtins = ["__flags", "__methods", "_obj", "assert"];
var proxify = function proxify2(obj, nonChainableMethodName) {
  if (!isProxyEnabled())
    return obj;
  return new Proxy(obj, {
    get: function proxyGetter(target, property) {
      if (typeof property === "string" && config.proxyExcludedKeys.indexOf(property) === -1 && !Reflect.has(target, property)) {
        if (nonChainableMethodName) {
          throw Error("Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".');
        }
        var suggestion = null;
        var suggestionDistance = 4;
        getProperties(target).forEach(function(prop) {
          if (!Object.prototype.hasOwnProperty(prop) && builtins.indexOf(prop) === -1) {
            var dist = stringDistanceCapped(property, prop, suggestionDistance);
            if (dist < suggestionDistance) {
              suggestion = prop;
              suggestionDistance = dist;
            }
          }
        });
        if (suggestion !== null) {
          throw Error("Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?');
        } else {
          throw Error("Invalid Chai property: " + property);
        }
      }
      if (builtins.indexOf(property) === -1 && !flag(target, "lockSsfi")) {
        flag(target, "ssfi", proxyGetter);
      }
      return Reflect.get(target, property);
    }
  });
};
function stringDistanceCapped(strA, strB, cap) {
  if (Math.abs(strA.length - strB.length) >= cap) {
    return cap;
  }
  var memo = [];
  for (var i = 0; i <= strA.length; i++) {
    memo[i] = Array(strB.length + 1).fill(0);
    memo[i][0] = i;
  }
  for (var j = 0; j < strB.length; j++) {
    memo[0][j] = j;
  }
  for (var i = 1; i <= strA.length; i++) {
    var ch = strA.charCodeAt(i - 1);
    for (var j = 1; j <= strB.length; j++) {
      if (Math.abs(i - j) >= cap) {
        memo[i][j] = cap;
        continue;
      }
      memo[i][j] = Math.min(memo[i - 1][j] + 1, memo[i][j - 1] + 1, memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1));
    }
  }
  return memo[strA.length][strB.length];
}
/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var addMethod = function addMethod2(ctx, name, method) {
  var methodWrapper = function() {
    if (!flag(this, "lockSsfi")) {
      flag(this, "ssfi", methodWrapper);
    }
    var result = method.apply(this, arguments);
    if (result !== void 0)
      return result;
    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
  addLengthGuard(methodWrapper, name, false);
  ctx[name] = proxify(methodWrapper, name);
};
/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var overwriteProperty = function overwriteProperty2(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name), _super = function() {
  };
  if (_get && typeof _get.get === "function")
    _super = _get.get;
  Object.defineProperty(ctx, name, {
    get: function overwritingPropertyGetter() {
      if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
        flag(this, "ssfi", overwritingPropertyGetter);
      }
      var origLockSsfi = flag(this, "lockSsfi");
      flag(this, "lockSsfi", true);
      var result = getter(_super).call(this);
      flag(this, "lockSsfi", origLockSsfi);
      if (result !== void 0) {
        return result;
      }
      var newAssertion = new chai.Assertion();
      transferFlags(this, newAssertion);
      return newAssertion;
    },
    configurable: true
  });
};
/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var overwriteMethod = function overwriteMethod2(ctx, name, method) {
  var _method = ctx[name], _super = function() {
    throw new Error(name + " is not a function");
  };
  if (_method && typeof _method === "function")
    _super = _method;
  var overwritingMethodWrapper = function() {
    if (!flag(this, "lockSsfi")) {
      flag(this, "ssfi", overwritingMethodWrapper);
    }
    var origLockSsfi = flag(this, "lockSsfi");
    flag(this, "lockSsfi", true);
    var result = method(_super).apply(this, arguments);
    flag(this, "lockSsfi", origLockSsfi);
    if (result !== void 0) {
      return result;
    }
    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
  addLengthGuard(overwritingMethodWrapper, name, false);
  ctx[name] = proxify(overwritingMethodWrapper, name);
};
/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
/*!
 * Module variables
 */
var canSetPrototype = typeof Object.setPrototypeOf === "function";
var testFn = function() {
};
var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  var propDesc = Object.getOwnPropertyDescriptor(testFn, name);
  if (typeof propDesc !== "object")
    return true;
  return !propDesc.configurable;
});
var call = Function.prototype.call, apply = Function.prototype.apply;
var addChainableMethod = function addChainableMethod2(ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== "function") {
    chainingBehavior = function() {
    };
  }
  var chainableBehavior = {
    method,
    chainingBehavior
  };
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;
  Object.defineProperty(ctx, name, {
    get: function chainableMethodGetter() {
      chainableBehavior.chainingBehavior.call(this);
      var chainableMethodWrapper = function() {
        if (!flag(this, "lockSsfi")) {
          flag(this, "ssfi", chainableMethodWrapper);
        }
        var result = chainableBehavior.method.apply(this, arguments);
        if (result !== void 0) {
          return result;
        }
        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      };
      addLengthGuard(chainableMethodWrapper, name, true);
      if (canSetPrototype) {
        var prototype = Object.create(this);
        prototype.call = call;
        prototype.apply = apply;
        Object.setPrototypeOf(chainableMethodWrapper, prototype);
      } else {
        var asserterNames = Object.getOwnPropertyNames(ctx);
        asserterNames.forEach(function(asserterName) {
          if (excludeNames.indexOf(asserterName) !== -1) {
            return;
          }
          var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
          Object.defineProperty(chainableMethodWrapper, asserterName, pd);
        });
      }
      transferFlags(this, chainableMethodWrapper);
      return proxify(chainableMethodWrapper);
    },
    configurable: true
  });
};
/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var overwriteChainableMethod = function overwriteChainableMethod2(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];
  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== void 0) {
      return result;
    }
    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
  var _method = chainableBehavior.method;
  chainableBehavior.method = function overwritingChainableMethodWrapper() {
    var result = method(_method).apply(this, arguments);
    if (result !== void 0) {
      return result;
    }
    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
};
/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var compareByInspect = function compareByInspect2(a, b) {
  return inspect_1(a) < inspect_1(b) ? -1 : 1;
};
/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var getOwnEnumerablePropertySymbols = function getOwnEnumerablePropertySymbols2(obj) {
  if (typeof Object.getOwnPropertySymbols !== "function")
    return [];
  return Object.getOwnPropertySymbols(obj).filter(function(sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
};
/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var getOwnEnumerableProperties = function getOwnEnumerableProperties2(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
};
/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */
function isNaN(value) {
  return value !== value;
}
var _isNaN = Number.isNaN || isNaN;
function isObjectType(obj) {
  var objectType = type$1(obj);
  var objectTypes = ["Array", "Object", "function"];
  return objectTypes.indexOf(objectType) !== -1;
}
var getOperator = function getOperator2(obj, args) {
  var operator = flag(obj, "operator");
  var negate = flag(obj, "negate");
  var expected = args[3];
  var msg = negate ? args[2] : args[1];
  if (operator) {
    return operator;
  }
  if (typeof msg === "function")
    msg = msg();
  msg = msg || "";
  if (!msg) {
    return void 0;
  }
  if (/\shave\s/.test(msg)) {
    return void 0;
  }
  var isObject = isObjectType(expected);
  if (/\snot\s/.test(msg)) {
    return isObject ? "notDeepStrictEqual" : "notStrictEqual";
  }
  return isObject ? "deepStrictEqual" : "strictEqual";
};
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Dependencies that are used for multiple exports are required here only once
 */
/*!
 * test utility
 */
var test$1 = test;
/*!
 * type utility
 */
var type = type$1;
/*!
 * expectTypes utility
 */
var expectTypes$1 = expectTypes;
/*!
 * message utility
 */
var getMessage$1 = getMessage;
/*!
 * actual utility
 */
var getActual$1 = getActual;
/*!
 * Inspect util
 */
var inspect = inspect_1;
/*!
 * Object Display util
 */
var objDisplay$1 = objDisplay;
/*!
 * Flag utility
 */
var flag$1 = flag;
/*!
 * Flag transferring utility
 */
var transferFlags$1 = transferFlags;
/*!
 * Deep equal utility
 */
var eql = require$$9;
/*!
 * Deep path info
 */
var getPathInfo = pathval2.getPathInfo;
/*!
 * Check if a property exists
 */
var hasProperty = pathval2.hasProperty;
/*!
 * Function name
 */
var getName = getName$1;
/*!
 * add Property
 */
var addProperty$1 = addProperty;
/*!
 * add Method
 */
var addMethod$1 = addMethod;
/*!
 * overwrite Property
 */
var overwriteProperty$1 = overwriteProperty;
/*!
 * overwrite Method
 */
var overwriteMethod$1 = overwriteMethod;
/*!
 * Add a chainable method
 */
var addChainableMethod$1 = addChainableMethod;
/*!
 * Overwrite chainable method
 */
var overwriteChainableMethod$1 = overwriteChainableMethod;
/*!
 * Compare by inspect method
 */
var compareByInspect$1 = compareByInspect;
/*!
 * Get own enumerable property symbols method
 */
var getOwnEnumerablePropertySymbols$1 = getOwnEnumerablePropertySymbols;
/*!
 * Get own enumerable properties method
 */
var getOwnEnumerableProperties$1 = getOwnEnumerableProperties;
/*!
 * Checks error against a given set of criteria
 */
var checkError = require$$20;
/*!
 * Proxify util
 */
var proxify$1 = proxify;
/*!
 * addLengthGuard util
 */
var addLengthGuard$1 = addLengthGuard;
/*!
 * isProxyEnabled helper
 */
var isProxyEnabled$1 = isProxyEnabled;
/*!
 * isNaN method
 */
var _isNaN$1 = _isNaN;
/*!
 * getOperator method
 */
var getOperator$1 = getOperator;
var utils = {
  test: test$1,
  type,
  expectTypes: expectTypes$1,
  getMessage: getMessage$1,
  getActual: getActual$1,
  inspect,
  objDisplay: objDisplay$1,
  flag: flag$1,
  transferFlags: transferFlags$1,
  eql,
  getPathInfo,
  hasProperty,
  getName,
  addProperty: addProperty$1,
  addMethod: addMethod$1,
  overwriteProperty: overwriteProperty$1,
  overwriteMethod: overwriteMethod$1,
  addChainableMethod: addChainableMethod$1,
  overwriteChainableMethod: overwriteChainableMethod$1,
  compareByInspect: compareByInspect$1,
  getOwnEnumerablePropertySymbols: getOwnEnumerablePropertySymbols$1,
  getOwnEnumerableProperties: getOwnEnumerableProperties$1,
  checkError,
  proxify: proxify$1,
  addLengthGuard: addLengthGuard$1,
  isProxyEnabled: isProxyEnabled$1,
  isNaN: _isNaN$1,
  getOperator: getOperator$1
};
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var assertion = function(_chai, util2) {
  /*!
   * Module dependencies.
   */
  var AssertionError2 = _chai.AssertionError, flag3 = util2.flag;
  /*!
   * Module export.
   */
  _chai.Assertion = Assertion2;
  /*!
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
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */
  function Assertion2(obj, msg, ssfi, lockSsfi) {
    flag3(this, "ssfi", ssfi || Assertion2);
    flag3(this, "lockSsfi", lockSsfi);
    flag3(this, "object", obj);
    flag3(this, "message", msg);
    return util2.proxify(this);
  }
  Object.defineProperty(Assertion2, "includeStack", {
    get: function() {
      console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
      return config.includeStack;
    },
    set: function(value) {
      console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
      config.includeStack = value;
    }
  });
  Object.defineProperty(Assertion2, "showDiff", {
    get: function() {
      console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
      return config.showDiff;
    },
    set: function(value) {
      console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
      config.showDiff = value;
    }
  });
  Assertion2.addProperty = function(name, fn) {
    util2.addProperty(this.prototype, name, fn);
  };
  Assertion2.addMethod = function(name, fn) {
    util2.addMethod(this.prototype, name, fn);
  };
  Assertion2.addChainableMethod = function(name, fn, chainingBehavior) {
    util2.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };
  Assertion2.overwriteProperty = function(name, fn) {
    util2.overwriteProperty(this.prototype, name, fn);
  };
  Assertion2.overwriteMethod = function(name, fn) {
    util2.overwriteMethod(this.prototype, name, fn);
  };
  Assertion2.overwriteChainableMethod = function(name, fn, chainingBehavior) {
    util2.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };
  Assertion2.prototype.assert = function(expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util2.test(this, arguments);
    if (showDiff !== false)
      showDiff = true;
    if (expected === void 0 && _actual === void 0)
      showDiff = false;
    if (config.showDiff !== true)
      showDiff = false;
    if (!ok) {
      msg = util2.getMessage(this, arguments);
      var actual = util2.getActual(this, arguments);
      var assertionErrorObjectProperties = {
        actual,
        expected,
        showDiff
      };
      var operator = util2.getOperator(this, arguments);
      if (operator) {
        assertionErrorObjectProperties.operator = operator;
      }
      throw new AssertionError2(msg, assertionErrorObjectProperties, config.includeStack ? this.assert : flag3(this, "ssfi"));
    }
  };
  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */
  Object.defineProperty(Assertion2.prototype, "_obj", {
    get: function() {
      return flag3(this, "object");
    },
    set: function(val) {
      flag3(this, "object", val);
    }
  });
};
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var assertions = function(chai2, _) {
  var Assertion2 = chai2.Assertion, AssertionError2 = chai2.AssertionError, flag3 = _.flag;
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
    "also"
  ].forEach(function(chain) {
    Assertion2.addProperty(chain);
  });
  Assertion2.addProperty("not", function() {
    flag3(this, "negate", true);
  });
  Assertion2.addProperty("deep", function() {
    flag3(this, "deep", true);
  });
  Assertion2.addProperty("nested", function() {
    flag3(this, "nested", true);
  });
  Assertion2.addProperty("own", function() {
    flag3(this, "own", true);
  });
  Assertion2.addProperty("ordered", function() {
    flag3(this, "ordered", true);
  });
  Assertion2.addProperty("any", function() {
    flag3(this, "any", true);
    flag3(this, "all", false);
  });
  Assertion2.addProperty("all", function() {
    flag3(this, "all", true);
    flag3(this, "any", false);
  });
  function an(type2, msg) {
    if (msg)
      flag3(this, "message", msg);
    type2 = type2.toLowerCase();
    var obj = flag3(this, "object"), article = ~["a", "e", "i", "o", "u"].indexOf(type2.charAt(0)) ? "an " : "a ";
    this.assert(type2 === _.type(obj).toLowerCase(), "expected #{this} to be " + article + type2, "expected #{this} not to be " + article + type2);
  }
  Assertion2.addChainableMethod("an", an);
  Assertion2.addChainableMethod("a", an);
  function SameValueZero(a, b) {
    return _.isNaN(a) && _.isNaN(b) || a === b;
  }
  function includeChainingBehavior() {
    flag3(this, "contains", true);
  }
  function include(val, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), objType = _.type(obj).toLowerCase(), flagMsg = flag3(this, "message"), negate = flag3(this, "negate"), ssfi = flag3(this, "ssfi"), isDeep = flag3(this, "deep"), descriptor = isDeep ? "deep " : "";
    flagMsg = flagMsg ? flagMsg + ": " : "";
    var included = false;
    switch (objType) {
      case "string":
        included = obj.indexOf(val) !== -1;
        break;
      case "weakset":
        if (isDeep) {
          throw new AssertionError2(flagMsg + "unable to use .deep.include with WeakSet", void 0, ssfi);
        }
        included = obj.has(val);
        break;
      case "map":
        var isEql = isDeep ? _.eql : SameValueZero;
        obj.forEach(function(item) {
          included = included || isEql(item, val);
        });
        break;
      case "set":
        if (isDeep) {
          obj.forEach(function(item) {
            included = included || _.eql(item, val);
          });
        } else {
          included = obj.has(val);
        }
        break;
      case "array":
        if (isDeep) {
          included = obj.some(function(item) {
            return _.eql(item, val);
          });
        } else {
          included = obj.indexOf(val) !== -1;
        }
        break;
      default:
        if (val !== Object(val)) {
          throw new AssertionError2(flagMsg + "the given combination of arguments (" + objType + " and " + _.type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + _.type(val).toLowerCase(), void 0, ssfi);
        }
        var props = Object.keys(val), firstErr = null, numErrs = 0;
        props.forEach(function(prop) {
          var propAssertion = new Assertion2(obj);
          _.transferFlags(this, propAssertion, true);
          flag3(propAssertion, "lockSsfi", true);
          if (!negate || props.length === 1) {
            propAssertion.property(prop, val[prop]);
            return;
          }
          try {
            propAssertion.property(prop, val[prop]);
          } catch (err) {
            if (!_.checkError.compatibleConstructor(err, AssertionError2)) {
              throw err;
            }
            if (firstErr === null)
              firstErr = err;
            numErrs++;
          }
        }, this);
        if (negate && props.length > 1 && numErrs === props.length) {
          throw firstErr;
        }
        return;
    }
    this.assert(included, "expected #{this} to " + descriptor + "include " + _.inspect(val), "expected #{this} to not " + descriptor + "include " + _.inspect(val));
  }
  Assertion2.addChainableMethod("include", include, includeChainingBehavior);
  Assertion2.addChainableMethod("contain", include, includeChainingBehavior);
  Assertion2.addChainableMethod("contains", include, includeChainingBehavior);
  Assertion2.addChainableMethod("includes", include, includeChainingBehavior);
  Assertion2.addProperty("ok", function() {
    this.assert(flag3(this, "object"), "expected #{this} to be truthy", "expected #{this} to be falsy");
  });
  Assertion2.addProperty("true", function() {
    this.assert(flag3(this, "object") === true, "expected #{this} to be true", "expected #{this} to be false", flag3(this, "negate") ? false : true);
  });
  Assertion2.addProperty("false", function() {
    this.assert(flag3(this, "object") === false, "expected #{this} to be false", "expected #{this} to be true", flag3(this, "negate") ? true : false);
  });
  Assertion2.addProperty("null", function() {
    this.assert(flag3(this, "object") === null, "expected #{this} to be null", "expected #{this} not to be null");
  });
  Assertion2.addProperty("undefined", function() {
    this.assert(flag3(this, "object") === void 0, "expected #{this} to be undefined", "expected #{this} not to be undefined");
  });
  Assertion2.addProperty("NaN", function() {
    this.assert(_.isNaN(flag3(this, "object")), "expected #{this} to be NaN", "expected #{this} not to be NaN");
  });
  function assertExist() {
    var val = flag3(this, "object");
    this.assert(val !== null && val !== void 0, "expected #{this} to exist", "expected #{this} to not exist");
  }
  Assertion2.addProperty("exist", assertExist);
  Assertion2.addProperty("exists", assertExist);
  Assertion2.addProperty("empty", function() {
    var val = flag3(this, "object"), ssfi = flag3(this, "ssfi"), flagMsg = flag3(this, "message"), itemsCount;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    switch (_.type(val).toLowerCase()) {
      case "array":
      case "string":
        itemsCount = val.length;
        break;
      case "map":
      case "set":
        itemsCount = val.size;
        break;
      case "weakmap":
      case "weakset":
        throw new AssertionError2(flagMsg + ".empty was passed a weak collection", void 0, ssfi);
      case "function":
        var msg = flagMsg + ".empty was passed a function " + _.getName(val);
        throw new AssertionError2(msg.trim(), void 0, ssfi);
      default:
        if (val !== Object(val)) {
          throw new AssertionError2(flagMsg + ".empty was passed non-string primitive " + _.inspect(val), void 0, ssfi);
        }
        itemsCount = Object.keys(val).length;
    }
    this.assert(itemsCount === 0, "expected #{this} to be empty", "expected #{this} not to be empty");
  });
  function checkArguments() {
    var obj = flag3(this, "object"), type2 = _.type(obj);
    this.assert(type2 === "Arguments", "expected #{this} to be arguments but got " + type2, "expected #{this} to not be arguments");
  }
  Assertion2.addProperty("arguments", checkArguments);
  Assertion2.addProperty("Arguments", checkArguments);
  function assertEqual(val, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object");
    if (flag3(this, "deep")) {
      var prevLockSsfi = flag3(this, "lockSsfi");
      flag3(this, "lockSsfi", true);
      this.eql(val);
      flag3(this, "lockSsfi", prevLockSsfi);
    } else {
      this.assert(val === obj, "expected #{this} to equal #{exp}", "expected #{this} to not equal #{exp}", val, this._obj, true);
    }
  }
  Assertion2.addMethod("equal", assertEqual);
  Assertion2.addMethod("equals", assertEqual);
  Assertion2.addMethod("eq", assertEqual);
  function assertEql(obj, msg) {
    if (msg)
      flag3(this, "message", msg);
    this.assert(_.eql(obj, flag3(this, "object")), "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", obj, this._obj, true);
  }
  Assertion2.addMethod("eql", assertEql);
  Assertion2.addMethod("eqls", assertEql);
  function assertAbove(n, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), doLength = flag3(this, "doLength"), flagMsg = flag3(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag3(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && (objType === "date" && nType !== "date")) {
      errorMessage = msgPrefix + "the argument to above must be a date";
    } else if (nType !== "number" && (doLength || objType === "number")) {
      errorMessage = msgPrefix + "the argument to above must be a number";
    } else if (!doLength && (objType !== "date" && objType !== "number")) {
      var printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError2(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      var descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(itemsCount > n, "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " above #{exp}", n, itemsCount);
    } else {
      this.assert(obj > n, "expected #{this} to be above #{exp}", "expected #{this} to be at most #{exp}", n);
    }
  }
  Assertion2.addMethod("above", assertAbove);
  Assertion2.addMethod("gt", assertAbove);
  Assertion2.addMethod("greaterThan", assertAbove);
  function assertLeast(n, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), doLength = flag3(this, "doLength"), flagMsg = flag3(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag3(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && (objType === "date" && nType !== "date")) {
      errorMessage = msgPrefix + "the argument to least must be a date";
    } else if (nType !== "number" && (doLength || objType === "number")) {
      errorMessage = msgPrefix + "the argument to least must be a number";
    } else if (!doLength && (objType !== "date" && objType !== "number")) {
      var printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError2(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      var descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(itemsCount >= n, "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}", "expected #{this} to have a " + descriptor + " below #{exp}", n, itemsCount);
    } else {
      this.assert(obj >= n, "expected #{this} to be at least #{exp}", "expected #{this} to be below #{exp}", n);
    }
  }
  Assertion2.addMethod("least", assertLeast);
  Assertion2.addMethod("gte", assertLeast);
  Assertion2.addMethod("greaterThanOrEqual", assertLeast);
  function assertBelow(n, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), doLength = flag3(this, "doLength"), flagMsg = flag3(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag3(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && (objType === "date" && nType !== "date")) {
      errorMessage = msgPrefix + "the argument to below must be a date";
    } else if (nType !== "number" && (doLength || objType === "number")) {
      errorMessage = msgPrefix + "the argument to below must be a number";
    } else if (!doLength && (objType !== "date" && objType !== "number")) {
      var printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError2(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      var descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(itemsCount < n, "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " below #{exp}", n, itemsCount);
    } else {
      this.assert(obj < n, "expected #{this} to be below #{exp}", "expected #{this} to be at least #{exp}", n);
    }
  }
  Assertion2.addMethod("below", assertBelow);
  Assertion2.addMethod("lt", assertBelow);
  Assertion2.addMethod("lessThan", assertBelow);
  function assertMost(n, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), doLength = flag3(this, "doLength"), flagMsg = flag3(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag3(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && (objType === "date" && nType !== "date")) {
      errorMessage = msgPrefix + "the argument to most must be a date";
    } else if (nType !== "number" && (doLength || objType === "number")) {
      errorMessage = msgPrefix + "the argument to most must be a number";
    } else if (!doLength && (objType !== "date" && objType !== "number")) {
      var printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError2(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      var descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(itemsCount <= n, "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}", "expected #{this} to have a " + descriptor + " above #{exp}", n, itemsCount);
    } else {
      this.assert(obj <= n, "expected #{this} to be at most #{exp}", "expected #{this} to be above #{exp}", n);
    }
  }
  Assertion2.addMethod("most", assertMost);
  Assertion2.addMethod("lte", assertMost);
  Assertion2.addMethod("lessThanOrEqual", assertMost);
  Assertion2.addMethod("within", function(start, finish, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), doLength = flag3(this, "doLength"), flagMsg = flag3(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag3(this, "ssfi"), objType = _.type(obj).toLowerCase(), startType = _.type(start).toLowerCase(), finishType = _.type(finish).toLowerCase(), errorMessage, shouldThrow = true, range = startType === "date" && finishType === "date" ? start.toUTCString() + ".." + finish.toUTCString() : start + ".." + finish;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && (objType === "date" && (startType !== "date" || finishType !== "date"))) {
      errorMessage = msgPrefix + "the arguments to within must be dates";
    } else if ((startType !== "number" || finishType !== "number") && (doLength || objType === "number")) {
      errorMessage = msgPrefix + "the arguments to within must be numbers";
    } else if (!doLength && (objType !== "date" && objType !== "number")) {
      var printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError2(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      var descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(itemsCount >= start && itemsCount <= finish, "expected #{this} to have a " + descriptor + " within " + range, "expected #{this} to not have a " + descriptor + " within " + range);
    } else {
      this.assert(obj >= start && obj <= finish, "expected #{this} to be within " + range, "expected #{this} to not be within " + range);
    }
  });
  function assertInstanceOf(constructor, msg) {
    if (msg)
      flag3(this, "message", msg);
    var target = flag3(this, "object");
    var ssfi = flag3(this, "ssfi");
    var flagMsg = flag3(this, "message");
    try {
      var isInstanceOf = target instanceof constructor;
    } catch (err) {
      if (err instanceof TypeError) {
        flagMsg = flagMsg ? flagMsg + ": " : "";
        throw new AssertionError2(flagMsg + "The instanceof assertion needs a constructor but " + _.type(constructor) + " was given.", void 0, ssfi);
      }
      throw err;
    }
    var name = _.getName(constructor);
    if (name === null) {
      name = "an unnamed constructor";
    }
    this.assert(isInstanceOf, "expected #{this} to be an instance of " + name, "expected #{this} to not be an instance of " + name);
  }
  Assertion2.addMethod("instanceof", assertInstanceOf);
  Assertion2.addMethod("instanceOf", assertInstanceOf);
  function assertProperty(name, val, msg) {
    if (msg)
      flag3(this, "message", msg);
    var isNested = flag3(this, "nested"), isOwn = flag3(this, "own"), flagMsg = flag3(this, "message"), obj = flag3(this, "object"), ssfi = flag3(this, "ssfi"), nameType = typeof name;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    if (isNested) {
      if (nameType !== "string") {
        throw new AssertionError2(flagMsg + "the argument to property must be a string when using nested syntax", void 0, ssfi);
      }
    } else {
      if (nameType !== "string" && nameType !== "number" && nameType !== "symbol") {
        throw new AssertionError2(flagMsg + "the argument to property must be a string, number, or symbol", void 0, ssfi);
      }
    }
    if (isNested && isOwn) {
      throw new AssertionError2(flagMsg + 'The "nested" and "own" flags cannot be combined.', void 0, ssfi);
    }
    if (obj === null || obj === void 0) {
      throw new AssertionError2(flagMsg + "Target cannot be null or undefined.", void 0, ssfi);
    }
    var isDeep = flag3(this, "deep"), negate = flag3(this, "negate"), pathInfo = isNested ? _.getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name];
    var descriptor = "";
    if (isDeep)
      descriptor += "deep ";
    if (isOwn)
      descriptor += "own ";
    if (isNested)
      descriptor += "nested ";
    descriptor += "property ";
    var hasProperty2;
    if (isOwn)
      hasProperty2 = Object.prototype.hasOwnProperty.call(obj, name);
    else if (isNested)
      hasProperty2 = pathInfo.exists;
    else
      hasProperty2 = _.hasProperty(obj, name);
    if (!negate || arguments.length === 1) {
      this.assert(hasProperty2, "expected #{this} to have " + descriptor + _.inspect(name), "expected #{this} to not have " + descriptor + _.inspect(name));
    }
    if (arguments.length > 1) {
      this.assert(hasProperty2 && (isDeep ? _.eql(val, value) : val === value), "expected #{this} to have " + descriptor + _.inspect(name) + " of #{exp}, but got #{act}", "expected #{this} to not have " + descriptor + _.inspect(name) + " of #{act}", val, value);
    }
    flag3(this, "object", value);
  }
  Assertion2.addMethod("property", assertProperty);
  function assertOwnProperty(name, value, msg) {
    flag3(this, "own", true);
    assertProperty.apply(this, arguments);
  }
  Assertion2.addMethod("ownProperty", assertOwnProperty);
  Assertion2.addMethod("haveOwnProperty", assertOwnProperty);
  function assertOwnPropertyDescriptor(name, descriptor, msg) {
    if (typeof descriptor === "string") {
      msg = descriptor;
      descriptor = null;
    }
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object");
    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    if (actualDescriptor && descriptor) {
      this.assert(_.eql(descriptor, actualDescriptor), "expected the own property descriptor for " + _.inspect(name) + " on #{this} to match " + _.inspect(descriptor) + ", got " + _.inspect(actualDescriptor), "expected the own property descriptor for " + _.inspect(name) + " on #{this} to not match " + _.inspect(descriptor), descriptor, actualDescriptor, true);
    } else {
      this.assert(actualDescriptor, "expected #{this} to have an own property descriptor for " + _.inspect(name), "expected #{this} to not have an own property descriptor for " + _.inspect(name));
    }
    flag3(this, "object", actualDescriptor);
  }
  Assertion2.addMethod("ownPropertyDescriptor", assertOwnPropertyDescriptor);
  Assertion2.addMethod("haveOwnPropertyDescriptor", assertOwnPropertyDescriptor);
  function assertLengthChain() {
    flag3(this, "doLength", true);
  }
  function assertLength(n, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), objType = _.type(obj).toLowerCase(), flagMsg = flag3(this, "message"), ssfi = flag3(this, "ssfi"), descriptor = "length", itemsCount;
    switch (objType) {
      case "map":
      case "set":
        descriptor = "size";
        itemsCount = obj.size;
        break;
      default:
        new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        itemsCount = obj.length;
    }
    this.assert(itemsCount == n, "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " of #{act}", n, itemsCount);
  }
  Assertion2.addChainableMethod("length", assertLength, assertLengthChain);
  Assertion2.addChainableMethod("lengthOf", assertLength, assertLengthChain);
  function assertMatch(re, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object");
    this.assert(re.exec(obj), "expected #{this} to match " + re, "expected #{this} not to match " + re);
  }
  Assertion2.addMethod("match", assertMatch);
  Assertion2.addMethod("matches", assertMatch);
  Assertion2.addMethod("string", function(str, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), flagMsg = flag3(this, "message"), ssfi = flag3(this, "ssfi");
    new Assertion2(obj, flagMsg, ssfi, true).is.a("string");
    this.assert(~obj.indexOf(str), "expected #{this} to contain " + _.inspect(str), "expected #{this} to not contain " + _.inspect(str));
  });
  function assertKeys(keys) {
    var obj = flag3(this, "object"), objType = _.type(obj), keysType = _.type(keys), ssfi = flag3(this, "ssfi"), isDeep = flag3(this, "deep"), str, deepStr = "", actual, ok = true, flagMsg = flag3(this, "message");
    flagMsg = flagMsg ? flagMsg + ": " : "";
    var mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
    if (objType === "Map" || objType === "Set") {
      deepStr = isDeep ? "deeply " : "";
      actual = [];
      obj.forEach(function(val, key) {
        actual.push(key);
      });
      if (keysType !== "Array") {
        keys = Array.prototype.slice.call(arguments);
      }
    } else {
      actual = _.getOwnEnumerableProperties(obj);
      switch (keysType) {
        case "Array":
          if (arguments.length > 1) {
            throw new AssertionError2(mixedArgsMsg, void 0, ssfi);
          }
          break;
        case "Object":
          if (arguments.length > 1) {
            throw new AssertionError2(mixedArgsMsg, void 0, ssfi);
          }
          keys = Object.keys(keys);
          break;
        default:
          keys = Array.prototype.slice.call(arguments);
      }
      keys = keys.map(function(val) {
        return typeof val === "symbol" ? val : String(val);
      });
    }
    if (!keys.length) {
      throw new AssertionError2(flagMsg + "keys required", void 0, ssfi);
    }
    var len = keys.length, any = flag3(this, "any"), all = flag3(this, "all"), expected = keys;
    if (!any && !all) {
      all = true;
    }
    if (any) {
      ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });
    }
    if (all) {
      ok = expected.every(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });
      if (!flag3(this, "contains")) {
        ok = ok && keys.length == actual.length;
      }
    }
    if (len > 1) {
      keys = keys.map(function(key) {
        return _.inspect(key);
      });
      var last = keys.pop();
      if (all) {
        str = keys.join(", ") + ", and " + last;
      }
      if (any) {
        str = keys.join(", ") + ", or " + last;
      }
    } else {
      str = _.inspect(keys[0]);
    }
    str = (len > 1 ? "keys " : "key ") + str;
    str = (flag3(this, "contains") ? "contain " : "have ") + str;
    this.assert(ok, "expected #{this} to " + deepStr + str, "expected #{this} to not " + deepStr + str, expected.slice(0).sort(_.compareByInspect), actual.sort(_.compareByInspect), true);
  }
  Assertion2.addMethod("keys", assertKeys);
  Assertion2.addMethod("key", assertKeys);
  function assertThrows(errorLike, errMsgMatcher, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), ssfi = flag3(this, "ssfi"), flagMsg = flag3(this, "message"), negate = flag3(this, "negate") || false;
    new Assertion2(obj, flagMsg, ssfi, true).is.a("function");
    if (errorLike instanceof RegExp || typeof errorLike === "string") {
      errMsgMatcher = errorLike;
      errorLike = null;
    }
    var caughtErr;
    try {
      obj();
    } catch (err) {
      caughtErr = err;
    }
    var everyArgIsUndefined = errorLike === void 0 && errMsgMatcher === void 0;
    var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    var errorLikeFail = false;
    var errMsgMatcherFail = false;
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
      var errorLikeString = "an error";
      if (errorLike instanceof Error) {
        errorLikeString = "#{exp}";
      } else if (errorLike) {
        errorLikeString = _.checkError.getConstructorName(errorLike);
      }
      this.assert(caughtErr, "expected #{this} to throw " + errorLikeString, "expected #{this} to not throw an error but #{act} was thrown", errorLike && errorLike.toString(), caughtErr instanceof Error ? caughtErr.toString() : typeof caughtErr === "string" ? caughtErr : caughtErr && _.checkError.getConstructorName(caughtErr));
    }
    if (errorLike && caughtErr) {
      if (errorLike instanceof Error) {
        var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);
        if (isCompatibleInstance === negate) {
          if (everyArgIsDefined && negate) {
            errorLikeFail = true;
          } else {
            this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""), errorLike.toString(), caughtErr.toString());
          }
        }
      }
      var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
      if (isCompatibleConstructor === negate) {
        if (everyArgIsDefined && negate) {
          errorLikeFail = true;
        } else {
          this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""), errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike), caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr));
        }
      }
    }
    if (caughtErr && errMsgMatcher !== void 0 && errMsgMatcher !== null) {
      var placeholder = "including";
      if (errMsgMatcher instanceof RegExp) {
        placeholder = "matching";
      }
      var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
      if (isCompatibleMessage === negate) {
        if (everyArgIsDefined && negate) {
          errMsgMatcherFail = true;
        } else {
          this.assert(negate, "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}", "expected #{this} to throw error not " + placeholder + " #{exp}", errMsgMatcher, _.checkError.getMessage(caughtErr));
        }
      }
    }
    if (errorLikeFail && errMsgMatcherFail) {
      this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""), errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike), caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr));
    }
    flag3(this, "object", caughtErr);
  }
  Assertion2.addMethod("throw", assertThrows);
  Assertion2.addMethod("throws", assertThrows);
  Assertion2.addMethod("Throw", assertThrows);
  function respondTo(method, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), itself = flag3(this, "itself"), context = typeof obj === "function" && !itself ? obj.prototype[method] : obj[method];
    this.assert(typeof context === "function", "expected #{this} to respond to " + _.inspect(method), "expected #{this} to not respond to " + _.inspect(method));
  }
  Assertion2.addMethod("respondTo", respondTo);
  Assertion2.addMethod("respondsTo", respondTo);
  Assertion2.addProperty("itself", function() {
    flag3(this, "itself", true);
  });
  function satisfy(matcher, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object");
    var result = matcher(obj);
    this.assert(result, "expected #{this} to satisfy " + _.objDisplay(matcher), "expected #{this} to not satisfy" + _.objDisplay(matcher), flag3(this, "negate") ? false : true, result);
  }
  Assertion2.addMethod("satisfy", satisfy);
  Assertion2.addMethod("satisfies", satisfy);
  function closeTo(expected, delta, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), flagMsg = flag3(this, "message"), ssfi = flag3(this, "ssfi");
    new Assertion2(obj, flagMsg, ssfi, true).is.a("number");
    if (typeof expected !== "number" || typeof delta !== "number") {
      flagMsg = flagMsg ? flagMsg + ": " : "";
      var deltaMessage = delta === void 0 ? ", and a delta is required" : "";
      throw new AssertionError2(flagMsg + "the arguments to closeTo or approximately must be numbers" + deltaMessage, void 0, ssfi);
    }
    this.assert(Math.abs(obj - expected) <= delta, "expected #{this} to be close to " + expected + " +/- " + delta, "expected #{this} not to be close to " + expected + " +/- " + delta);
  }
  Assertion2.addMethod("closeTo", closeTo);
  Assertion2.addMethod("approximately", closeTo);
  function isSubsetOf(subset, superset, cmp, contains, ordered) {
    if (!contains) {
      if (subset.length !== superset.length)
        return false;
      superset = superset.slice();
    }
    return subset.every(function(elem, idx) {
      if (ordered)
        return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
      if (!cmp) {
        var matchIdx = superset.indexOf(elem);
        if (matchIdx === -1)
          return false;
        if (!contains)
          superset.splice(matchIdx, 1);
        return true;
      }
      return superset.some(function(elem2, matchIdx2) {
        if (!cmp(elem, elem2))
          return false;
        if (!contains)
          superset.splice(matchIdx2, 1);
        return true;
      });
    });
  }
  Assertion2.addMethod("members", function(subset, msg) {
    if (msg)
      flag3(this, "message", msg);
    var obj = flag3(this, "object"), flagMsg = flag3(this, "message"), ssfi = flag3(this, "ssfi");
    new Assertion2(obj, flagMsg, ssfi, true).to.be.an("array");
    new Assertion2(subset, flagMsg, ssfi, true).to.be.an("array");
    var contains = flag3(this, "contains");
    var ordered = flag3(this, "ordered");
    var subject, failMsg, failNegateMsg;
    if (contains) {
      subject = ordered ? "an ordered superset" : "a superset";
      failMsg = "expected #{this} to be " + subject + " of #{exp}";
      failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}";
    } else {
      subject = ordered ? "ordered members" : "members";
      failMsg = "expected #{this} to have the same " + subject + " as #{exp}";
      failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}";
    }
    var cmp = flag3(this, "deep") ? _.eql : void 0;
    this.assert(isSubsetOf(subset, obj, cmp, contains, ordered), failMsg, failNegateMsg, subset, obj, true);
  });
  function oneOf(list, msg) {
    if (msg)
      flag3(this, "message", msg);
    var expected = flag3(this, "object"), flagMsg = flag3(this, "message"), ssfi = flag3(this, "ssfi"), contains = flag3(this, "contains"), isDeep = flag3(this, "deep");
    new Assertion2(list, flagMsg, ssfi, true).to.be.an("array");
    if (contains) {
      this.assert(list.some(function(possibility) {
        return expected.indexOf(possibility) > -1;
      }), "expected #{this} to contain one of #{exp}", "expected #{this} to not contain one of #{exp}", list, expected);
    } else {
      if (isDeep) {
        this.assert(list.some(function(possibility) {
          return _.eql(expected, possibility);
        }), "expected #{this} to deeply equal one of #{exp}", "expected #{this} to deeply equal one of #{exp}", list, expected);
      } else {
        this.assert(list.indexOf(expected) > -1, "expected #{this} to be one of #{exp}", "expected #{this} to not be one of #{exp}", list, expected);
      }
    }
  }
  Assertion2.addMethod("oneOf", oneOf);
  function assertChanges(subject, prop, msg) {
    if (msg)
      flag3(this, "message", msg);
    var fn = flag3(this, "object"), flagMsg = flag3(this, "message"), ssfi = flag3(this, "ssfi");
    new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
    var initial;
    if (!prop) {
      new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
      initial = subject();
    } else {
      new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }
    fn();
    var final = prop === void 0 || prop === null ? subject() : subject[prop];
    var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
    flag3(this, "deltaMsgObj", msgObj);
    flag3(this, "initialDeltaValue", initial);
    flag3(this, "finalDeltaValue", final);
    flag3(this, "deltaBehavior", "change");
    flag3(this, "realDelta", final !== initial);
    this.assert(initial !== final, "expected " + msgObj + " to change", "expected " + msgObj + " to not change");
  }
  Assertion2.addMethod("change", assertChanges);
  Assertion2.addMethod("changes", assertChanges);
  function assertIncreases(subject, prop, msg) {
    if (msg)
      flag3(this, "message", msg);
    var fn = flag3(this, "object"), flagMsg = flag3(this, "message"), ssfi = flag3(this, "ssfi");
    new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
    var initial;
    if (!prop) {
      new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
      initial = subject();
    } else {
      new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }
    new Assertion2(initial, flagMsg, ssfi, true).is.a("number");
    fn();
    var final = prop === void 0 || prop === null ? subject() : subject[prop];
    var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
    flag3(this, "deltaMsgObj", msgObj);
    flag3(this, "initialDeltaValue", initial);
    flag3(this, "finalDeltaValue", final);
    flag3(this, "deltaBehavior", "increase");
    flag3(this, "realDelta", final - initial);
    this.assert(final - initial > 0, "expected " + msgObj + " to increase", "expected " + msgObj + " to not increase");
  }
  Assertion2.addMethod("increase", assertIncreases);
  Assertion2.addMethod("increases", assertIncreases);
  function assertDecreases(subject, prop, msg) {
    if (msg)
      flag3(this, "message", msg);
    var fn = flag3(this, "object"), flagMsg = flag3(this, "message"), ssfi = flag3(this, "ssfi");
    new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
    var initial;
    if (!prop) {
      new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
      initial = subject();
    } else {
      new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }
    new Assertion2(initial, flagMsg, ssfi, true).is.a("number");
    fn();
    var final = prop === void 0 || prop === null ? subject() : subject[prop];
    var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
    flag3(this, "deltaMsgObj", msgObj);
    flag3(this, "initialDeltaValue", initial);
    flag3(this, "finalDeltaValue", final);
    flag3(this, "deltaBehavior", "decrease");
    flag3(this, "realDelta", initial - final);
    this.assert(final - initial < 0, "expected " + msgObj + " to decrease", "expected " + msgObj + " to not decrease");
  }
  Assertion2.addMethod("decrease", assertDecreases);
  Assertion2.addMethod("decreases", assertDecreases);
  function assertDelta(delta, msg) {
    if (msg)
      flag3(this, "message", msg);
    var msgObj = flag3(this, "deltaMsgObj");
    var initial = flag3(this, "initialDeltaValue");
    var final = flag3(this, "finalDeltaValue");
    var behavior = flag3(this, "deltaBehavior");
    var realDelta = flag3(this, "realDelta");
    var expression;
    if (behavior === "change") {
      expression = Math.abs(final - initial) === Math.abs(delta);
    } else {
      expression = realDelta === Math.abs(delta);
    }
    this.assert(expression, "expected " + msgObj + " to " + behavior + " by " + delta, "expected " + msgObj + " to not " + behavior + " by " + delta);
  }
  Assertion2.addMethod("by", assertDelta);
  Assertion2.addProperty("extensible", function() {
    var obj = flag3(this, "object");
    var isExtensible = obj === Object(obj) && Object.isExtensible(obj);
    this.assert(isExtensible, "expected #{this} to be extensible", "expected #{this} to not be extensible");
  });
  Assertion2.addProperty("sealed", function() {
    var obj = flag3(this, "object");
    var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
    this.assert(isSealed, "expected #{this} to be sealed", "expected #{this} to not be sealed");
  });
  Assertion2.addProperty("frozen", function() {
    var obj = flag3(this, "object");
    var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
    this.assert(isFrozen, "expected #{this} to be frozen", "expected #{this} to not be frozen");
  });
  Assertion2.addProperty("finite", function(msg) {
    var obj = flag3(this, "object");
    this.assert(typeof obj === "number" && isFinite(obj), "expected #{this} to be a finite number", "expected #{this} to not be a finite number");
  });
};
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var expect = function(chai2, util2) {
  chai2.expect = function(val, message) {
    return new chai2.Assertion(val, message);
  };
  chai2.expect.fail = function(actual, expected, message, operator) {
    if (arguments.length < 2) {
      message = actual;
      actual = void 0;
    }
    message = message || "expect.fail()";
    throw new chai2.AssertionError(message, {
      actual,
      expected,
      operator
    }, chai2.expect.fail);
  };
};
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var should = function(chai2, util2) {
  var Assertion2 = chai2.Assertion;
  function loadShould() {
    function shouldGetter() {
      if (this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol === "function" && this instanceof Symbol || typeof BigInt === "function" && this instanceof BigInt) {
        return new Assertion2(this.valueOf(), null, shouldGetter);
      }
      return new Assertion2(this, null, shouldGetter);
    }
    function shouldSetter(value) {
      Object.defineProperty(this, "should", {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    Object.defineProperty(Object.prototype, "should", {
      set: shouldSetter,
      get: shouldGetter,
      configurable: true
    });
    var should2 = {};
    should2.fail = function(actual, expected, message, operator) {
      if (arguments.length < 2) {
        message = actual;
        actual = void 0;
      }
      message = message || "should.fail()";
      throw new chai2.AssertionError(message, {
        actual,
        expected,
        operator
      }, should2.fail);
    };
    should2.equal = function(val1, val2, msg) {
      new Assertion2(val1, msg).to.equal(val2);
    };
    should2.Throw = function(fn, errt, errs, msg) {
      new Assertion2(fn, msg).to.Throw(errt, errs);
    };
    should2.exist = function(val, msg) {
      new Assertion2(val, msg).to.exist;
    };
    should2.not = {};
    should2.not.equal = function(val1, val2, msg) {
      new Assertion2(val1, msg).to.not.equal(val2);
    };
    should2.not.Throw = function(fn, errt, errs, msg) {
      new Assertion2(fn, msg).to.not.Throw(errt, errs);
    };
    should2.not.exist = function(val, msg) {
      new Assertion2(val, msg).to.not.exist;
    };
    should2["throw"] = should2["Throw"];
    should2.not["throw"] = should2.not["Throw"];
    return should2;
  }
  chai2.should = loadShould;
  chai2.Should = loadShould;
};
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var assert = function(chai2, util2) {
  /*!
   * Chai dependencies.
   */
  var Assertion2 = chai2.Assertion, flag3 = util2.flag;
  /*!
   * Module export.
   */
  var assert2 = chai2.assert = function(express, errmsg) {
    var test3 = new Assertion2(null, null, chai2.assert, true);
    test3.assert(express, errmsg, "[ negation message unavailable ]");
  };
  assert2.fail = function(actual, expected, message, operator) {
    if (arguments.length < 2) {
      message = actual;
      actual = void 0;
    }
    message = message || "assert.fail()";
    throw new chai2.AssertionError(message, {
      actual,
      expected,
      operator
    }, assert2.fail);
  };
  assert2.isOk = function(val, msg) {
    new Assertion2(val, msg, assert2.isOk, true).is.ok;
  };
  assert2.isNotOk = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotOk, true).is.not.ok;
  };
  assert2.equal = function(act, exp, msg) {
    var test3 = new Assertion2(act, msg, assert2.equal, true);
    test3.assert(exp == flag3(test3, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", exp, act, true);
  };
  assert2.notEqual = function(act, exp, msg) {
    var test3 = new Assertion2(act, msg, assert2.notEqual, true);
    test3.assert(exp != flag3(test3, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", exp, act, true);
  };
  assert2.strictEqual = function(act, exp, msg) {
    new Assertion2(act, msg, assert2.strictEqual, true).to.equal(exp);
  };
  assert2.notStrictEqual = function(act, exp, msg) {
    new Assertion2(act, msg, assert2.notStrictEqual, true).to.not.equal(exp);
  };
  assert2.deepEqual = assert2.deepStrictEqual = function(act, exp, msg) {
    new Assertion2(act, msg, assert2.deepEqual, true).to.eql(exp);
  };
  assert2.notDeepEqual = function(act, exp, msg) {
    new Assertion2(act, msg, assert2.notDeepEqual, true).to.not.eql(exp);
  };
  assert2.isAbove = function(val, abv, msg) {
    new Assertion2(val, msg, assert2.isAbove, true).to.be.above(abv);
  };
  assert2.isAtLeast = function(val, atlst, msg) {
    new Assertion2(val, msg, assert2.isAtLeast, true).to.be.least(atlst);
  };
  assert2.isBelow = function(val, blw, msg) {
    new Assertion2(val, msg, assert2.isBelow, true).to.be.below(blw);
  };
  assert2.isAtMost = function(val, atmst, msg) {
    new Assertion2(val, msg, assert2.isAtMost, true).to.be.most(atmst);
  };
  assert2.isTrue = function(val, msg) {
    new Assertion2(val, msg, assert2.isTrue, true).is["true"];
  };
  assert2.isNotTrue = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotTrue, true).to.not.equal(true);
  };
  assert2.isFalse = function(val, msg) {
    new Assertion2(val, msg, assert2.isFalse, true).is["false"];
  };
  assert2.isNotFalse = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotFalse, true).to.not.equal(false);
  };
  assert2.isNull = function(val, msg) {
    new Assertion2(val, msg, assert2.isNull, true).to.equal(null);
  };
  assert2.isNotNull = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotNull, true).to.not.equal(null);
  };
  assert2.isNaN = function(val, msg) {
    new Assertion2(val, msg, assert2.isNaN, true).to.be.NaN;
  };
  assert2.isNotNaN = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotNaN, true).not.to.be.NaN;
  };
  assert2.exists = function(val, msg) {
    new Assertion2(val, msg, assert2.exists, true).to.exist;
  };
  assert2.notExists = function(val, msg) {
    new Assertion2(val, msg, assert2.notExists, true).to.not.exist;
  };
  assert2.isUndefined = function(val, msg) {
    new Assertion2(val, msg, assert2.isUndefined, true).to.equal(void 0);
  };
  assert2.isDefined = function(val, msg) {
    new Assertion2(val, msg, assert2.isDefined, true).to.not.equal(void 0);
  };
  assert2.isFunction = function(val, msg) {
    new Assertion2(val, msg, assert2.isFunction, true).to.be.a("function");
  };
  assert2.isNotFunction = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotFunction, true).to.not.be.a("function");
  };
  assert2.isObject = function(val, msg) {
    new Assertion2(val, msg, assert2.isObject, true).to.be.a("object");
  };
  assert2.isNotObject = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotObject, true).to.not.be.a("object");
  };
  assert2.isArray = function(val, msg) {
    new Assertion2(val, msg, assert2.isArray, true).to.be.an("array");
  };
  assert2.isNotArray = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotArray, true).to.not.be.an("array");
  };
  assert2.isString = function(val, msg) {
    new Assertion2(val, msg, assert2.isString, true).to.be.a("string");
  };
  assert2.isNotString = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotString, true).to.not.be.a("string");
  };
  assert2.isNumber = function(val, msg) {
    new Assertion2(val, msg, assert2.isNumber, true).to.be.a("number");
  };
  assert2.isNotNumber = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotNumber, true).to.not.be.a("number");
  };
  assert2.isFinite = function(val, msg) {
    new Assertion2(val, msg, assert2.isFinite, true).to.be.finite;
  };
  assert2.isBoolean = function(val, msg) {
    new Assertion2(val, msg, assert2.isBoolean, true).to.be.a("boolean");
  };
  assert2.isNotBoolean = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotBoolean, true).to.not.be.a("boolean");
  };
  assert2.typeOf = function(val, type2, msg) {
    new Assertion2(val, msg, assert2.typeOf, true).to.be.a(type2);
  };
  assert2.notTypeOf = function(val, type2, msg) {
    new Assertion2(val, msg, assert2.notTypeOf, true).to.not.be.a(type2);
  };
  assert2.instanceOf = function(val, type2, msg) {
    new Assertion2(val, msg, assert2.instanceOf, true).to.be.instanceOf(type2);
  };
  assert2.notInstanceOf = function(val, type2, msg) {
    new Assertion2(val, msg, assert2.notInstanceOf, true).to.not.be.instanceOf(type2);
  };
  assert2.include = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.include, true).include(inc);
  };
  assert2.notInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.notInclude, true).not.include(inc);
  };
  assert2.deepInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.deepInclude, true).deep.include(inc);
  };
  assert2.notDeepInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.notDeepInclude, true).not.deep.include(inc);
  };
  assert2.nestedInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.nestedInclude, true).nested.include(inc);
  };
  assert2.notNestedInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.notNestedInclude, true).not.nested.include(inc);
  };
  assert2.deepNestedInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.deepNestedInclude, true).deep.nested.include(inc);
  };
  assert2.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.notDeepNestedInclude, true).not.deep.nested.include(inc);
  };
  assert2.ownInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.ownInclude, true).own.include(inc);
  };
  assert2.notOwnInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.notOwnInclude, true).not.own.include(inc);
  };
  assert2.deepOwnInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.deepOwnInclude, true).deep.own.include(inc);
  };
  assert2.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion2(exp, msg, assert2.notDeepOwnInclude, true).not.deep.own.include(inc);
  };
  assert2.match = function(exp, re, msg) {
    new Assertion2(exp, msg, assert2.match, true).to.match(re);
  };
  assert2.notMatch = function(exp, re, msg) {
    new Assertion2(exp, msg, assert2.notMatch, true).to.not.match(re);
  };
  assert2.property = function(obj, prop, msg) {
    new Assertion2(obj, msg, assert2.property, true).to.have.property(prop);
  };
  assert2.notProperty = function(obj, prop, msg) {
    new Assertion2(obj, msg, assert2.notProperty, true).to.not.have.property(prop);
  };
  assert2.propertyVal = function(obj, prop, val, msg) {
    new Assertion2(obj, msg, assert2.propertyVal, true).to.have.property(prop, val);
  };
  assert2.notPropertyVal = function(obj, prop, val, msg) {
    new Assertion2(obj, msg, assert2.notPropertyVal, true).to.not.have.property(prop, val);
  };
  assert2.deepPropertyVal = function(obj, prop, val, msg) {
    new Assertion2(obj, msg, assert2.deepPropertyVal, true).to.have.deep.property(prop, val);
  };
  assert2.notDeepPropertyVal = function(obj, prop, val, msg) {
    new Assertion2(obj, msg, assert2.notDeepPropertyVal, true).to.not.have.deep.property(prop, val);
  };
  assert2.ownProperty = function(obj, prop, msg) {
    new Assertion2(obj, msg, assert2.ownProperty, true).to.have.own.property(prop);
  };
  assert2.notOwnProperty = function(obj, prop, msg) {
    new Assertion2(obj, msg, assert2.notOwnProperty, true).to.not.have.own.property(prop);
  };
  assert2.ownPropertyVal = function(obj, prop, value, msg) {
    new Assertion2(obj, msg, assert2.ownPropertyVal, true).to.have.own.property(prop, value);
  };
  assert2.notOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion2(obj, msg, assert2.notOwnPropertyVal, true).to.not.have.own.property(prop, value);
  };
  assert2.deepOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion2(obj, msg, assert2.deepOwnPropertyVal, true).to.have.deep.own.property(prop, value);
  };
  assert2.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion2(obj, msg, assert2.notDeepOwnPropertyVal, true).to.not.have.deep.own.property(prop, value);
  };
  assert2.nestedProperty = function(obj, prop, msg) {
    new Assertion2(obj, msg, assert2.nestedProperty, true).to.have.nested.property(prop);
  };
  assert2.notNestedProperty = function(obj, prop, msg) {
    new Assertion2(obj, msg, assert2.notNestedProperty, true).to.not.have.nested.property(prop);
  };
  assert2.nestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion2(obj, msg, assert2.nestedPropertyVal, true).to.have.nested.property(prop, val);
  };
  assert2.notNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion2(obj, msg, assert2.notNestedPropertyVal, true).to.not.have.nested.property(prop, val);
  };
  assert2.deepNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion2(obj, msg, assert2.deepNestedPropertyVal, true).to.have.deep.nested.property(prop, val);
  };
  assert2.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion2(obj, msg, assert2.notDeepNestedPropertyVal, true).to.not.have.deep.nested.property(prop, val);
  };
  assert2.lengthOf = function(exp, len, msg) {
    new Assertion2(exp, msg, assert2.lengthOf, true).to.have.lengthOf(len);
  };
  assert2.hasAnyKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.hasAnyKeys, true).to.have.any.keys(keys);
  };
  assert2.hasAllKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.hasAllKeys, true).to.have.all.keys(keys);
  };
  assert2.containsAllKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.containsAllKeys, true).to.contain.all.keys(keys);
  };
  assert2.doesNotHaveAnyKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.doesNotHaveAnyKeys, true).to.not.have.any.keys(keys);
  };
  assert2.doesNotHaveAllKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.doesNotHaveAllKeys, true).to.not.have.all.keys(keys);
  };
  assert2.hasAnyDeepKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.hasAnyDeepKeys, true).to.have.any.deep.keys(keys);
  };
  assert2.hasAllDeepKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.hasAllDeepKeys, true).to.have.all.deep.keys(keys);
  };
  assert2.containsAllDeepKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.containsAllDeepKeys, true).to.contain.all.deep.keys(keys);
  };
  assert2.doesNotHaveAnyDeepKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.doesNotHaveAnyDeepKeys, true).to.not.have.any.deep.keys(keys);
  };
  assert2.doesNotHaveAllDeepKeys = function(obj, keys, msg) {
    new Assertion2(obj, msg, assert2.doesNotHaveAllDeepKeys, true).to.not.have.all.deep.keys(keys);
  };
  assert2.throws = function(fn, errorLike, errMsgMatcher, msg) {
    if (typeof errorLike === "string" || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }
    var assertErr = new Assertion2(fn, msg, assert2.throws, true).to.throw(errorLike, errMsgMatcher);
    return flag3(assertErr, "object");
  };
  assert2.doesNotThrow = function(fn, errorLike, errMsgMatcher, msg) {
    if (typeof errorLike === "string" || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }
    new Assertion2(fn, msg, assert2.doesNotThrow, true).to.not.throw(errorLike, errMsgMatcher);
  };
  assert2.operator = function(val, operator, val2, msg) {
    var ok;
    switch (operator) {
      case "==":
        ok = val == val2;
        break;
      case "===":
        ok = val === val2;
        break;
      case ">":
        ok = val > val2;
        break;
      case ">=":
        ok = val >= val2;
        break;
      case "<":
        ok = val < val2;
        break;
      case "<=":
        ok = val <= val2;
        break;
      case "!=":
        ok = val != val2;
        break;
      case "!==":
        ok = val !== val2;
        break;
      default:
        msg = msg ? msg + ": " : msg;
        throw new chai2.AssertionError(msg + 'Invalid operator "' + operator + '"', void 0, assert2.operator);
    }
    var test3 = new Assertion2(ok, msg, assert2.operator, true);
    test3.assert(flag3(test3, "object") === true, "expected " + util2.inspect(val) + " to be " + operator + " " + util2.inspect(val2), "expected " + util2.inspect(val) + " to not be " + operator + " " + util2.inspect(val2));
  };
  assert2.closeTo = function(act, exp, delta, msg) {
    new Assertion2(act, msg, assert2.closeTo, true).to.be.closeTo(exp, delta);
  };
  assert2.approximately = function(act, exp, delta, msg) {
    new Assertion2(act, msg, assert2.approximately, true).to.be.approximately(exp, delta);
  };
  assert2.sameMembers = function(set1, set2, msg) {
    new Assertion2(set1, msg, assert2.sameMembers, true).to.have.same.members(set2);
  };
  assert2.notSameMembers = function(set1, set2, msg) {
    new Assertion2(set1, msg, assert2.notSameMembers, true).to.not.have.same.members(set2);
  };
  assert2.sameDeepMembers = function(set1, set2, msg) {
    new Assertion2(set1, msg, assert2.sameDeepMembers, true).to.have.same.deep.members(set2);
  };
  assert2.notSameDeepMembers = function(set1, set2, msg) {
    new Assertion2(set1, msg, assert2.notSameDeepMembers, true).to.not.have.same.deep.members(set2);
  };
  assert2.sameOrderedMembers = function(set1, set2, msg) {
    new Assertion2(set1, msg, assert2.sameOrderedMembers, true).to.have.same.ordered.members(set2);
  };
  assert2.notSameOrderedMembers = function(set1, set2, msg) {
    new Assertion2(set1, msg, assert2.notSameOrderedMembers, true).to.not.have.same.ordered.members(set2);
  };
  assert2.sameDeepOrderedMembers = function(set1, set2, msg) {
    new Assertion2(set1, msg, assert2.sameDeepOrderedMembers, true).to.have.same.deep.ordered.members(set2);
  };
  assert2.notSameDeepOrderedMembers = function(set1, set2, msg) {
    new Assertion2(set1, msg, assert2.notSameDeepOrderedMembers, true).to.not.have.same.deep.ordered.members(set2);
  };
  assert2.includeMembers = function(superset, subset, msg) {
    new Assertion2(superset, msg, assert2.includeMembers, true).to.include.members(subset);
  };
  assert2.notIncludeMembers = function(superset, subset, msg) {
    new Assertion2(superset, msg, assert2.notIncludeMembers, true).to.not.include.members(subset);
  };
  assert2.includeDeepMembers = function(superset, subset, msg) {
    new Assertion2(superset, msg, assert2.includeDeepMembers, true).to.include.deep.members(subset);
  };
  assert2.notIncludeDeepMembers = function(superset, subset, msg) {
    new Assertion2(superset, msg, assert2.notIncludeDeepMembers, true).to.not.include.deep.members(subset);
  };
  assert2.includeOrderedMembers = function(superset, subset, msg) {
    new Assertion2(superset, msg, assert2.includeOrderedMembers, true).to.include.ordered.members(subset);
  };
  assert2.notIncludeOrderedMembers = function(superset, subset, msg) {
    new Assertion2(superset, msg, assert2.notIncludeOrderedMembers, true).to.not.include.ordered.members(subset);
  };
  assert2.includeDeepOrderedMembers = function(superset, subset, msg) {
    new Assertion2(superset, msg, assert2.includeDeepOrderedMembers, true).to.include.deep.ordered.members(subset);
  };
  assert2.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
    new Assertion2(superset, msg, assert2.notIncludeDeepOrderedMembers, true).to.not.include.deep.ordered.members(subset);
  };
  assert2.oneOf = function(inList, list, msg) {
    new Assertion2(inList, msg, assert2.oneOf, true).to.be.oneOf(list);
  };
  assert2.changes = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    new Assertion2(fn, msg, assert2.changes, true).to.change(obj, prop);
  };
  assert2.changesBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion2(fn, msg, assert2.changesBy, true).to.change(obj, prop).by(delta);
  };
  assert2.doesNotChange = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion2(fn, msg, assert2.doesNotChange, true).to.not.change(obj, prop);
  };
  assert2.changesButNotBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion2(fn, msg, assert2.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
  };
  assert2.increases = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion2(fn, msg, assert2.increases, true).to.increase(obj, prop);
  };
  assert2.increasesBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion2(fn, msg, assert2.increasesBy, true).to.increase(obj, prop).by(delta);
  };
  assert2.doesNotIncrease = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion2(fn, msg, assert2.doesNotIncrease, true).to.not.increase(obj, prop);
  };
  assert2.increasesButNotBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion2(fn, msg, assert2.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
  };
  assert2.decreases = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion2(fn, msg, assert2.decreases, true).to.decrease(obj, prop);
  };
  assert2.decreasesBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion2(fn, msg, assert2.decreasesBy, true).to.decrease(obj, prop).by(delta);
  };
  assert2.doesNotDecrease = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion2(fn, msg, assert2.doesNotDecrease, true).to.not.decrease(obj, prop);
  };
  assert2.doesNotDecreaseBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    return new Assertion2(fn, msg, assert2.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
  };
  assert2.decreasesButNotBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion2(fn, msg, assert2.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
  };
  /*!
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
   */
  assert2.ifError = function(val) {
    if (val) {
      throw val;
    }
  };
  assert2.isExtensible = function(obj, msg) {
    new Assertion2(obj, msg, assert2.isExtensible, true).to.be.extensible;
  };
  assert2.isNotExtensible = function(obj, msg) {
    new Assertion2(obj, msg, assert2.isNotExtensible, true).to.not.be.extensible;
  };
  assert2.isSealed = function(obj, msg) {
    new Assertion2(obj, msg, assert2.isSealed, true).to.be.sealed;
  };
  assert2.isNotSealed = function(obj, msg) {
    new Assertion2(obj, msg, assert2.isNotSealed, true).to.not.be.sealed;
  };
  assert2.isFrozen = function(obj, msg) {
    new Assertion2(obj, msg, assert2.isFrozen, true).to.be.frozen;
  };
  assert2.isNotFrozen = function(obj, msg) {
    new Assertion2(obj, msg, assert2.isNotFrozen, true).to.not.be.frozen;
  };
  assert2.isEmpty = function(val, msg) {
    new Assertion2(val, msg, assert2.isEmpty, true).to.be.empty;
  };
  assert2.isNotEmpty = function(val, msg) {
    new Assertion2(val, msg, assert2.isNotEmpty, true).to.not.be.empty;
  };
  /*!
   * Aliases.
   */
  (function alias(name, as) {
    assert2[as] = assert2[name];
    return alias;
  })("isOk", "ok")("isNotOk", "notOk")("throws", "throw")("throws", "Throw")("isExtensible", "extensible")("isNotExtensible", "notExtensible")("isSealed", "sealed")("isNotSealed", "notSealed")("isFrozen", "frozen")("isNotFrozen", "notFrozen")("isEmpty", "empty")("isNotEmpty", "notEmpty");
};
var chai = createCommonjsModule(function(module, exports) {
  /*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   */
  var used = [];
  /*!
   * Chai version
   */
  exports.version = "4.3.3";
  /*!
   * Assertion Error
   */
  exports.AssertionError = AssertionError$1;
  /*!
   * Utils for plugins (not exported)
   */
  exports.use = function(fn) {
    if (!~used.indexOf(fn)) {
      fn(exports, utils);
      used.push(fn);
    }
    return exports;
  };
  /*!
   * Utility Functions
   */
  exports.util = utils;
  /*!
   * Configuration
   */
  exports.config = config;
  /*!
   * Primary `Assertion` prototype
   */
  exports.use(assertion);
  /*!
   * Core Assertions
   */
  exports.use(assertions);
  /*!
   * Expect interface
   */
  exports.use(expect);
  /*!
   * Should interface
   */
  exports.use(should);
  /*!
   * Assert interface
   */
  exports.use(assert);
});
var chai$1 = chai;
const expect$1 = chai$1.expect;
const version = chai$1.version;
const Assertion = chai$1.Assertion;
const AssertionError = chai$1.AssertionError;
const util = chai$1.util;
const config$1 = chai$1.config;
const use = chai$1.use;
const should$1 = chai$1.should;
const assert$1 = chai$1.assert;
const core = chai$1.core;
export default chai$1;
export {Assertion, AssertionError, assert$1 as assert, config$1 as config, core, expect$1 as expect, should$1 as should, use, util, version};
