!function(n,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):(n="undefined"!=typeof globalThis?globalThis:n||self)["plugin-espruino-networking"]=o()}(this,(function(){"use strict";return function(){function n(n){this.name="espruino-networking",this.version="1.0.0",this.priority="normal",this._httpClient=n}return n.prototype.initialize=function(n){},n.prototype.onJobCreated=function(n){},n.prototype.onJobFinished=function(n){},n.prototype.onJobStarted=function(n){n.isDone=!0,n.callback(void 0,!0)},n}()}));
