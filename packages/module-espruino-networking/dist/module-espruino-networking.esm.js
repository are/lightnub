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
var t=function(n,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])},t(n,o)};var n=function(){function t(t){this.version="1.0.0",this.name="espruino-networking",this.type="networking",this.httpModule=t}return t.prototype.get=function(){return this},t.prototype.request=function(t){var n=this;return new Promise((function(o,e){var r=n.httpModule.request({host:"ps.pndsn.com",method:t.method.toUpperCase(),path:t.path,headers:t.headers},(function(t){var n="";t.on("data",(function(t){n+=t})),t.on("close",(function(){o({status:t.statusCode,body:n,headers:t.headers})}))}));r.on("error",(function(t){e(t)})),t.body?r.end(t.body):r.end()}))},t}(),o=function(o){return function(e){return function(e){function r(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var u=e.apply(this,t)||this;return u.registerModule(new n(o)),u}return function(n,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}(r,e),r}(e)}};export{o as default};
