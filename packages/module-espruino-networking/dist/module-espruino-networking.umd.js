!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t="undefined"!=typeof globalThis?globalThis:t||self)["module-espruino-networking"]=n()}(this,(function(){"use strict";
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
    ***************************************************************************** */var t=function(n,e){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])},t(n,e)};var n=function(){function t(t){this.version="1.0.0",this.name="espruino-networking",this.type="networking",this.httpModule=t}return t.prototype.get=function(){return this},t.prototype.request=function(t){var n=this;return new Promise((function(e,o){var r=n.httpModule.request({host:"ps.pndsn.com",method:t.method.toUpperCase(),path:t.path,headers:t.headers},(function(t){var n="";t.on("data",(function(t){n+=t})),t.on("close",(function(){e({status:t.statusCode,body:n,headers:t.headers})}))}));r.on("error",(function(t){o(t)})),t.body?r.end(t.body):r.end()}))},t}();return function(e){return function(o){return function(o){function r(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var i=o.apply(this,t)||this;return i.registerModule(new n(e)),i}return function(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}(r,o),r}(o)}}}));
