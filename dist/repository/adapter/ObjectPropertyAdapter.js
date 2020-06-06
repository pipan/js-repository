"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectPropertyAdapter = (function () {
    function ObjectPropertyAdapter(propertyName) {
        this.propertyName = propertyName;
    }
    ObjectPropertyAdapter.prototype.adapt = function (item) {
        if (typeof item[this.propertyName] === 'function') {
            return item[this.propertyName]();
        }
        return item[this.propertyName];
    };
    return ObjectPropertyAdapter;
}());
exports.ObjectPropertyAdapter = ObjectPropertyAdapter;
//# sourceMappingURL=ObjectPropertyAdapter.js.map