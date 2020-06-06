"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InverseComparable = (function () {
    function InverseComparable(comparable) {
        this.comparable = comparable;
    }
    InverseComparable.prototype.compare = function (a, b) {
        return this.comparable.compare(a, b) * -1;
    };
    return InverseComparable;
}());
exports.InverseComparable = InverseComparable;
//# sourceMappingURL=InverseComparable.js.map