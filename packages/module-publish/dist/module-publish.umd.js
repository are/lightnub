!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self)["module-publish"]=e()}(this,(function(){"use strict";
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
    ***************************************************************************** */var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};var e=function(){function t(){this.version="1.0.0",this.name="publish-dx",this.type="dx"}return t.prototype.get=function(){},t}();return function(n){return function(n){function o(){for(var t=[],o=0;o<arguments.length;o++)t[o]=arguments[o];var r=n.apply(this,t)||this;return r.registerModule(new e),r}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}(o,n),o.prototype.publish=function(t){var e=t.channel,n=t.message,o=t.keyset,r=this.get("networking"),i=this.get("codec",{format:"json"}),c=this.get("codec",{format:"url"}),u=c.encode(i.encode(n)),s=c.encode(e);r.request({method:"get",path:"/publish/".concat(o.publishKey,"/").concat(o.subscribeKey,"/0/").concat(s,"/0/").concat(u)})},o}(n)}}));
