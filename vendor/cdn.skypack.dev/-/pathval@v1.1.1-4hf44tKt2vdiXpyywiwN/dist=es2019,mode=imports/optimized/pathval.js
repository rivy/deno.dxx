function hasProperty(obj, name) {
  if (typeof obj === "undefined" || obj === null) {
    return false;
  }
  return name in Object(obj);
}
function parsePath(path) {
  var str = path.replace(/([^\\])\[/g, "$1.[");
  var parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function mapMatches(value) {
    if (value === "constructor" || value === "__proto__" || value === "prototype") {
      return {};
    }
    var regexp = /^\[(\d+)\]$/;
    var mArr = regexp.exec(value);
    var parsed = null;
    if (mArr) {
      parsed = {i: parseFloat(mArr[1])};
    } else {
      parsed = {p: value.replace(/\\([.[\]])/g, "$1")};
    }
    return parsed;
  });
}
function internalGetPathValue(obj, parsed, pathDepth) {
  var temporaryValue = obj;
  var res = null;
  pathDepth = typeof pathDepth === "undefined" ? parsed.length : pathDepth;
  for (var i = 0; i < pathDepth; i++) {
    var part = parsed[i];
    if (temporaryValue) {
      if (typeof part.p === "undefined") {
        temporaryValue = temporaryValue[part.i];
      } else {
        temporaryValue = temporaryValue[part.p];
      }
      if (i === pathDepth - 1) {
        res = temporaryValue;
      }
    }
  }
  return res;
}
function internalSetPathValue(obj, val, parsed) {
  var tempObj = obj;
  var pathDepth = parsed.length;
  var part = null;
  for (var i = 0; i < pathDepth; i++) {
    var propName = null;
    var propVal = null;
    part = parsed[i];
    if (i === pathDepth - 1) {
      propName = typeof part.p === "undefined" ? part.i : part.p;
      tempObj[propName] = val;
    } else if (typeof part.p !== "undefined" && tempObj[part.p]) {
      tempObj = tempObj[part.p];
    } else if (typeof part.i !== "undefined" && tempObj[part.i]) {
      tempObj = tempObj[part.i];
    } else {
      var next = parsed[i + 1];
      propName = typeof part.p === "undefined" ? part.i : part.p;
      propVal = typeof next.p === "undefined" ? [] : {};
      tempObj[propName] = propVal;
      tempObj = tempObj[propName];
    }
  }
}
function getPathInfo(obj, path) {
  var parsed = parsePath(path);
  var last = parsed[parsed.length - 1];
  var info = {
    parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
    name: last.p || last.i,
    value: internalGetPathValue(obj, parsed)
  };
  info.exists = hasProperty(info.parent, info.name);
  return info;
}
function getPathValue(obj, path) {
  var info = getPathInfo(obj, path);
  return info.value;
}
function setPathValue(obj, path, val) {
  var parsed = parsePath(path);
  internalSetPathValue(obj, val, parsed);
  return obj;
}
var pathval = {
  hasProperty,
  getPathInfo,
  getPathValue,
  setPathValue
};
export default pathval;
var getPathInfo$1 = pathval.getPathInfo;
var getPathValue$1 = pathval.getPathValue;
var hasProperty$1 = pathval.hasProperty;
var setPathValue$1 = pathval.setPathValue;
export {pathval as __moduleExports, getPathInfo$1 as getPathInfo, getPathValue$1 as getPathValue, hasProperty$1 as hasProperty, setPathValue$1 as setPathValue};
