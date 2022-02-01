(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["plugin-espruino-networking"] = {}));
})(this, (function (exports) { 'use strict';

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

  exports.EspruinoNetworkingPlugin = EspruinoNetworkingPlugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));