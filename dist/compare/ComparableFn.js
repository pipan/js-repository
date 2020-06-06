"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComparableFn = (function () {
    function ComparableFn(fn) {
        this.fn = fn;
    }
    ComparableFn.prototype.compare = function (a, b) {
        return this.fn(a, b);
    };
    return ComparableFn;
}());
exports.ComparableFn = ComparableFn;
//# sourceMappingURL=ComparableFn.js.map