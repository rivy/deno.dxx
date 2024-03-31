var toString = Function.prototype.toString;
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
function getFuncName(aFunc) {
  if (typeof aFunc !== "function") {
    return null;
  }
  var name = "";
  if (typeof Function.prototype.name === "undefined" && typeof aFunc.name === "undefined") {
    var match = toString.call(aFunc).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    name = aFunc.name;
  }
  return name;
}
var getFuncName_1 = getFuncName;
export default getFuncName_1;
