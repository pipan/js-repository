"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyChange = (function () {
    function PropertyChange(nextValue, previousValue) {
        this.nextValue = nextValue;
        this.previousValue = previousValue;
    }
    PropertyChange.prototype.next = function () {
        return this.nextValue;
    };
    PropertyChange.prototype.previous = function () {
        return this.previousValue;
    };
    return PropertyChange;
}());
exports.PropertyChange = PropertyChange;
//# sourceMappingURL=PropertyChange.js.map