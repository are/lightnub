//

var shallowequal = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};

var version = "1.0.0";

var Core = /** @class */ (function () {
    function Core() {
        this.modules = [];
    }
    Core.prototype.registerModule = function (module) {
        var _a;
        this.modules.push(module);
        (_a = module.initialize) === null || _a === void 0 ? void 0 : _a.call(module, this);
    };
    Core.prototype.get = function (type, filter) {
        var module = this.modules.find(function (module) {
            return module.type === type &&
                (module.filter === undefined || filter === undefined || shallowequal(module.filter, filter));
        });
        if (!module) {
            throw new Error("A ".concat(type, " module is missing that can fulfill following requirements: ").concat(JSON.stringify(filter), ". Make sure to include this module during instantiation."));
        }
        return module.get();
    };
    Core.version = version;
    return Core;
}());
// @ts-ignore
function LightNub() {
    var decorators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        decorators[_i] = arguments[_i];
    }
    // @ts-ignore
    return new (decorators.reduceRight(function (klass, decorator) { return decorator(klass); }, Core))();
}
LightNub.Core = Core;

export { LightNub as default };
