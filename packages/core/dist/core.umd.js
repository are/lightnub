(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.core = {}));
})(this, (function (exports) { 'use strict';

  var version = "1.0.0";

  var LightNub = /** @class */ (function () {
      function LightNub(plugins) {
          this.__jobCounter = 0;
          this.__plugins = plugins;
      }
      LightNub.prototype.__jobCreatedHook = function (job) {
          for (var _i = 0, _a = this.__plugins; _i < _a.length; _i++) {
              var plugin = _a[_i];
              plugin.onJobCreated(job);
          }
      };
      LightNub.prototype.__jobStartedHook = function (job) {
          for (var _i = 0, _a = this.__plugins; _i < _a.length; _i++) {
              var plugin = _a[_i];
              plugin.onJobStarted(job);
          }
      };
      LightNub.prototype.__jobFinishedHook = function (job) {
          for (var _i = 0, _a = this.__plugins; _i < _a.length; _i++) {
              var plugin = _a[_i];
              plugin.onJobFinished(job);
          }
      };
      LightNub.prototype.__decorate = function (name, fn) {
          this[name] = fn.bind(this);
      };
      LightNub.prototype.__run = function (_a) {
          var data = _a.data, callback = _a.callback, keyset = _a.keyset, operation = _a.operation;
          var job = {
              id: this.__jobCounter++,
              data: data,
              callback: callback,
              keyset: keyset,
              operation: operation,
              isDone: false,
          };
          this.__jobCreatedHook(job);
          this.__jobStartedHook(job);
          this.__jobFinishedHook(job);
      };
      LightNub.__version = version;
      return LightNub;
  }());

  exports.LightNub = LightNub;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
