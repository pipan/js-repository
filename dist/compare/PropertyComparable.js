"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyComparable = (function () {
    function PropertyComparable(propertyName) {
        this.propertyName = propertyName;
    }
    PropertyComparable.prototype.compare = function (a, b) {
        if (a[this.propertyName] < b[this.propertyName]) {
            return -1;
        }
        else if (a[this.propertyName] > b[this.propertyName]) {
            return 1;
        }
        return 0;
    };
    return PropertyComparable;
}());
exports.PropertyComparable = PropertyComparable;
//# sourceMappingURL=PropertyComparable.js.map