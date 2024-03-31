/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */
/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */
function exclude() {
  var excludes = [].slice.call(arguments);
  function excludeProps(res, obj) {
    Object.keys(obj).forEach(function(key) {
      if (!~excludes.indexOf(key))
        res[key] = obj[key];
    });
  }
  return function extendExclude() {
    var args = [].slice.call(arguments), i = 0, res = {};
    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }
    return res;
  };
}
/*!
 * Primary Exports
 */
var assertionError = AssertionError;
function AssertionError(message, _props, ssf) {
  var extend = exclude("name", "message", "stack", "constructor", "toJSON"), props = extend(_props || {});
  this.message = message || "Unspecified AssertionError";
  this.showDiff = false;
  for (var key in props) {
    this[key] = props[key];
  }
  ssf = ssf || AssertionError;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  } else {
    try {
      throw new Error();
    } catch (e) {
      this.stack = e.stack;
    }
  }
}
/*!
 * Inherit from Error.prototype
 */
AssertionError.prototype = Object.create(Error.prototype);
/*!
 * Statically set name
 */
AssertionError.prototype.name = "AssertionError";
/*!
 * Ensure correct constructor
 */
AssertionError.prototype.constructor = AssertionError;
AssertionError.prototype.toJSON = function(stack) {
  var extend = exclude("constructor", "toJSON", "stack"), props = extend({name: this.name}, this);
  if (stack !== false && this.stack) {
    props.stack = this.stack;
  }
  return props;
};
export default assertionError;
