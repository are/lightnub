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

var EspruinoNetworking = /** @class */ (function () {
    function EspruinoNetworking(httpModule) {
        this.version = version;
        this.name = 'espruino-networking';
        this.type = 'networking';
        this.httpModule = httpModule;
    }
    EspruinoNetworking.prototype.get = function () {
        return this;
    };
    EspruinoNetworking.prototype.request = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var req = _this.httpModule.request({
                host: 'ps.pndsn.com',
                method: request.method.toUpperCase(),
                path: request.path,
                headers: request.headers,
            }, function (res) {
                var result = '';
                res.on('data', function (data) {
                    result += data;
                });
                res.on('close', function () {
                    resolve({ status: res.statusCode, body: result, headers: res.headers });
                });
            });
            req.on('error', function (error) {
                reject(error);
            });
            if (request.body) {
                req.end(request.body);
            }
            else {
                req.end();
            }
        });
    };
    return EspruinoNetworking;
}());
var index = (function (httpModule) {
    return function WithEspruinoNetworking(klazz) {
        return /** @class */ (function (_super) {
            __extends(WithEspruinoNetworking, _super);
            function WithEspruinoNetworking() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                _this.registerModule(new EspruinoNetworking(httpModule));
                return _this;
            }
            return WithEspruinoNetworking;
        }(klazz));
    };
});

export { index as default };
