"use strict";
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
***************************************************************************** */var t=function(o,e){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])},t(o,e)};var o=function(){function t(){this.version="1.0.0",this.name="default-codec-json",this.type="codec",this.filter={format:"json"}}return t.prototype.get=function(){return this},t.prototype.encode=function(t){return JSON.stringify(t)},t.prototype.decode=function(t){return JSON.parse(t)},t}(),e=function(){function t(){this.version="1.0.0",this.name="default-codec-url",this.type="codec",this.filter={format:"url"}}return t.prototype.get=function(){return this},t.prototype.encode=function(t){return encodeURIComponent(t)},t.prototype.decode=function(t){return decodeURIComponent(t)},t}();module.exports=function(n){return function(n){function r(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var i=n.apply(this,t)||this;return i.registerModule(new o),i.registerModule(new e),i}return function(o,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=o}t(o,e),o.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(r,n),r}(n)};
