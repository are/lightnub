(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["plugin-espruino-networking"] = factory());
})(this, (function () { 'use strict';

  var version = "1.0.0";

  var EspruinoNetworkingPlugin = /** @class */ (function () {
      function EspruinoNetworkingPlugin(httpModule) {
          this.name = 'espruino-networking';
          this.version = version;
          this.priority = 'normal';
          this._httpClient = httpModule;
      }
      EspruinoNetworkingPlugin.prototype.initialize = function (_instance) { };
      EspruinoNetworkingPlugin.prototype.onJobCreated = function (_job) { };
      EspruinoNetworkingPlugin.prototype.onJobFinished = function (_job) { };
      EspruinoNetworkingPlugin.prototype.onJobStarted = function (job) {
          console.log(job);
      };
      return EspruinoNetworkingPlugin;
  }());

  return EspruinoNetworkingPlugin;

}));
