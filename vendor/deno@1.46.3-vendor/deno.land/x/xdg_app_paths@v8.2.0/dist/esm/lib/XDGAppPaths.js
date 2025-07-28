"use strict";
function isBoolean(t) {
  return typeOf(t) === "boolean";
}
function isObject(t) {
  return typeOf(t) === "object";
}
function isString(t) {
  return typeOf(t) === "string";
}
function typeOf(t) {
  return typeof t;
}
function Adapt(adapter_) {
  var meta = adapter_.meta, path = adapter_.path, xdg = adapter_.xdg;
  var XDGAppPaths_ = function () {
    function XDGAppPaths_(options_) {
      if (options_ === void 0) {
        options_ = {};
      }
      var _a, _b, _c;
      function XDGAppPaths(options) {
        if (options === void 0) {
          options = {};
        }
        return new XDGAppPaths_(options);
      }
      var options = isObject(options_) ? options_ : { name: options_ };
      var suffix = (_a = options.suffix) !== null && _a !== void 0 ? _a : "";
      var isolated_ = (_b = options.isolated) !== null && _b !== void 0
        ? _b
        : true;
      var namePriorityList = [
        options.name,
        meta.pkgMainFilename(),
        meta.mainFilename(),
      ];
      var nameFallback = "$eval";
      var name = path.parse(
        ((_c = namePriorityList.find(function (e) {
                return isString(e);
              })) !== null && _c !== void 0
          ? _c
          : nameFallback) + suffix,
      ).name;
      XDGAppPaths.$name = function $name() {
        return name;
      };
      XDGAppPaths.$isolated = function $isolated() {
        return isolated_;
      };
      function isIsolated(dirOptions) {
        var _a;
        dirOptions = dirOptions !== null && dirOptions !== void 0
          ? dirOptions
          : { isolated: isolated_ };
        var isolated = isBoolean(dirOptions)
          ? dirOptions
          : (_a = dirOptions.isolated) !== null && _a !== void 0
          ? _a
          : isolated_;
        return isolated;
      }
      function finalPathSegment(dirOptions) {
        return isIsolated(dirOptions) ? name : "";
      }
      XDGAppPaths.cache = function cache(dirOptions) {
        return path.join(xdg.cache(), finalPathSegment(dirOptions));
      };
      XDGAppPaths.config = function config(dirOptions) {
        return path.join(xdg.config(), finalPathSegment(dirOptions));
      };
      XDGAppPaths.data = function data(dirOptions) {
        return path.join(xdg.data(), finalPathSegment(dirOptions));
      };
      XDGAppPaths.runtime = function runtime(dirOptions) {
        return xdg.runtime()
          ? path.join(xdg.runtime(), finalPathSegment(dirOptions))
          : void 0;
      };
      XDGAppPaths.state = function state(dirOptions) {
        return path.join(xdg.state(), finalPathSegment(dirOptions));
      };
      XDGAppPaths.configDirs = function configDirs(dirOptions) {
        return xdg
          .configDirs()
          .map(function (s) {
            return path.join(s, finalPathSegment(dirOptions));
          });
      };
      XDGAppPaths.dataDirs = function dataDirs(dirOptions) {
        return xdg
          .dataDirs()
          .map(function (s) {
            return path.join(s, finalPathSegment(dirOptions));
          });
      };
      return XDGAppPaths;
    }
    return XDGAppPaths_;
  }();
  return { XDGAppPaths: new XDGAppPaths_() };
}
export { Adapt };
