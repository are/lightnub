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
var t=function(n,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])},t(n,o)};var n=function(){function t(){this.version="1.0.0",this.name="default-codec-json",this.type="codec",this.filter={format:"json"}}return t.prototype.get=function(){return this},t.prototype.encode=function(t){return JSON.stringify(t)},t.prototype.decode=function(t){return JSON.parse(t)},t}(),o=function(){function t(){this.version="1.0.0",this.name="default-codec-url",this.type="codec",this.filter={format:"url"}}return t.prototype.get=function(){return this},t.prototype.encode=function(t){return encodeURIComponent(t)},t.prototype.decode=function(t){return decodeURIComponent(t)},t}();function e(e){return function(e){function r(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var i=e.apply(this,t)||this;return i.registerModule(new n),i.registerModule(new o),i}return function(n,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}(r,e),r}(e)}export{e as default};
