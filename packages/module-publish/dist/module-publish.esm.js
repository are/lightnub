/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var version = "1.0.0";

var PublishModule = /** @class */ (function () {
    function PublishModule() {
        this.version = version;
        this.name = 'publish-dx';
        this.type = 'dx';
    }
    PublishModule.prototype.get = function () { };
    return PublishModule;
}());
function WithPublish(klazz) {
    return /** @class */ (function (_super) {
        __extends(WithPublish, _super);
        function WithPublish() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.registerModule(new PublishModule());
            return _this;
        }
        WithPublish.prototype.publish = function (_a) {
            var channel = _a.channel, message = _a.message, keyset = _a.keyset;
            var networking = this.get('networking');
            var jsonCodec = this.get('codec', { format: 'json' });
            var urlCodec = this.get('codec', { format: 'url' });
            var encodedMessage = urlCodec.encode(jsonCodec.encode(message));
            var encodedChannel = urlCodec.encode(channel);
            networking.request({
                method: 'get',
                path: "/publish/".concat(keyset.publishKey, "/").concat(keyset.subscribeKey, "/0/").concat(encodedChannel, "/0/").concat(encodedMessage),
            });
        };
        return WithPublish;
    }(klazz));
}
//   initialize(instance: Instance) {
//     instance.__decorate(
//       'publish',
//       function (
//         { keyset, channel, message }: PublishOptions,
//         callback: (error: Error | undefined, result: PublishResult) => void
//       ) {
//         return instance.__run({
//           operation: 'publish',
//           keyset: keyset,
//           data: {
//             channel: channel,
//             message: message,
//           },
//           callback: callback,
//         })
//       }
//     )
//   }
//   onJobCreated(job: Job) {
//     if (job.operation === 'publish') {
//       const { channel, message } = job.data
//       const path = `/publish/${job.keyset.publishKey}/${job.keyset.subscribeKey}/0/${channel}/0/${encodeURIComponent(
//         JSON.stringify(message)
//       )}`
//       job.data = {
//         protocol: 'http:',
//         host: 'ps.pndsn.com',
//         path: path,
//         method: 'GET',
//       }
//     }
//   }
// }

export { WithPublish as default };
