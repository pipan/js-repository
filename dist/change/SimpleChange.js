"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleChange = (function () {
    function SimpleChange(inserted, removed) {
        this.ins = inserted;
        this.rem = removed;
    }
    SimpleChange.prototype.inserted = function () {
        return this.ins;
    };
    SimpleChange.prototype.removed = function () {
        return this.rem;
    };
    return SimpleChange;
}());
exports.SimpleChange = SimpleChange;
//# sourceMappingURL=SimpleChange.js.map