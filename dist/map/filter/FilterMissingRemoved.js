"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleChange_1 = require("../../change/SimpleChange");
var FilterMissingRemoved = (function () {
    function FilterMissingRemoved(map) {
        this.map = map;
    }
    FilterMissingRemoved.prototype.execute = function (change) {
        var removed = [];
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var toRemove = _a[_i];
            if (!this.map.has(toRemove.getKey())) {
                continue;
            }
            removed.push(toRemove);
        }
        return new SimpleChange_1.SimpleChange(change.inserted(), removed);
    };
    return FilterMissingRemoved;
}());
exports.FilterMissingRemoved = FilterMissingRemoved;
//# sourceMappingURL=FilterMissingRemoved.js.map