function compatibleInstance(thrown, errorLike) {
  return errorLike instanceof Error && thrown === errorLike;
}
function compatibleConstructor(thrown, errorLike) {
  if (errorLike instanceof Error) {
    return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
  } else if (errorLike.prototype instanceof Error || errorLike === Error) {
    return thrown.constructor === errorLike || thrown instanceof errorLike;
  }
  return false;
}
function compatibleMessage(thrown, errMatcher) {
  var comparisonString = typeof thrown === "string" ? thrown : thrown.message;
  if (errMatcher instanceof RegExp) {
    return errMatcher.test(comparisonString);
  } else if (typeof errMatcher === "string") {
    return comparisonString.indexOf(errMatcher) !== -1;
  }
  return false;
}
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
  var name = "";
  if (typeof constructorFn.name === "undefined") {
    var match = String(constructorFn).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    name = constructorFn.name;
  }
  return name;
}
function getConstructorName(errorLike) {
  var constructorName = errorLike;
  if (errorLike instanceof Error) {
    constructorName = getFunctionName(errorLike.constructor);
  } else if (typeof errorLike === "function") {
    constructorName = getFunctionName(errorLike).trim() || getFunctionName(new errorLike());
  }
  return constructorName;
}
function getMessage(errorLike) {
  var msg = "";
  if (errorLike && errorLike.message) {
    msg = errorLike.message;
  } else if (typeof errorLike === "string") {
    msg = errorLike;
  }
  return msg;
}
var checkError = {
  compatibleInstance,
  compatibleConstructor,
  compatibleMessage,
  getMessage,
  getConstructorName
};
var compatibleConstructor$1 = checkError.compatibleConstructor;
var compatibleInstance$1 = checkError.compatibleInstance;
var compatibleMessage$1 = checkError.compatibleMessage;
export default checkError;
var getConstructorName$1 = checkError.getConstructorName;
var getMessage$1 = checkError.getMessage;
export {checkError as __moduleExports, compatibleConstructor$1 as compatibleConstructor, compatibleInstance$1 as compatibleInstance, compatibleMessage$1 as compatibleMessage, getConstructorName$1 as getConstructorName, getMessage$1 as getMessage};
