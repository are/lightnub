(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["plugin-pubsub-dx"] = factory());
})(this, (function () { 'use strict';

  var version = "1.0.0";

  var PubSubDxPlugin = /** @class */ (function () {
      function PubSubDxPlugin() {
          this.name = 'pubsub-dx';
          this.version = version;
          this.priority = 'normal';
      }
      PubSubDxPlugin.prototype.onJobStarted = function (_job) { };
      PubSubDxPlugin.prototype.onJobFinished = function (_job) { };
      PubSubDxPlugin.prototype.initialize = function (instance) {
          instance.__decorate('publish', function (_a, callback) {
              var keyset = _a.keyset, channel = _a.channel, message = _a.message;
              return instance.__run({
                  operation: 'publish',
                  keyset: keyset,
                  data: {
                      channel: channel,
                      message: message,
                  },
                  callback: callback,
              });
          });
      };
      PubSubDxPlugin.prototype.onJobCreated = function (job) {
          if (job.operation === 'publish') {
              var _a = job.data, channel = _a.channel, message = _a.message;
              var url = "https://ps.pndsn.com/publish/".concat(job.keyset.publishKey, "/").concat(job.keyset.subscribeKey, "/0/").concat(channel, "/0/").concat(encodeURIComponent(JSON.stringify(message)));
              job.data = {
                  url: url,
                  method: 'GET',
                  headers: {},
              };
          }
      };
      return PubSubDxPlugin;
  }());

  return PubSubDxPlugin;

}));
