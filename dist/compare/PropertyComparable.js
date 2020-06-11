"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectPropertyAdapter_1 = require("../repository/adapter/ObjectPropertyAdapter");
var PropertyComparable = (function () {
    function PropertyComparable(propertyName) {
        this.propertyAdapter = new ObjectPropertyAdapter_1.ObjectPropertyAdapter(propertyName);
    }
    PropertyComparable.prototype.compare = function (a, b) {
        var aValue = this.propertyAdapter.adapt(a);
        var bValue = this.propertyAdapter.adapt(b);
        if (aValue < bValue) {
            return -1;
        }
        else if (aValue > bValue) {
            return 1;
        }
        return 0;
    };
    return PropertyComparable;
}());
exports.PropertyComparable = PropertyComparable;
//# sourceMappingURL=PropertyComparable.js.map