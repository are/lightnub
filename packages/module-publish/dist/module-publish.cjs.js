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
***************************************************************************** */var t=function(e,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])},t(e,o)};var e=function(){function t(){this.version="1.0.0",this.name="publish-dx",this.type="dx"}return t.prototype.get=function(){},t}();module.exports=function(o){return function(o){function n(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r=o.apply(this,t)||this;return r.registerModule(new e),r}return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}(n,o),n.prototype.publish=function(t){var e=t.channel,o=t.message,n=t.keyset,r=this.get("networking"),c=this.get("codec",{format:"json"}),i=this.get("codec",{format:"url"}),s=i.encode(c.encode(o)),u=i.encode(e);r.request({method:"get",path:"/publish/".concat(n.publishKey,"/").concat(n.subscribeKey,"/0/").concat(u,"/0/").concat(s)})},n}(o)};
