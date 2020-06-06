"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleChange_1 = require("../../change/SimpleChange");
var FilterDuplicateValue = (function () {
    function FilterDuplicateValue(map) {
        this.map = map;
    }
    FilterDuplicateValue.prototype.execute = function (change) {
        var inserted = [];
        for (var _i = 0, _a = change.inserted(); _i < _a.length; _i++) {
            var toInsert = _a[_i];
            if (this.map.has(toInsert.getKey()) && this.map.get(toInsert.getKey()) === toInsert.getValue()) {
                continue;
            }
            inserted.push(toInsert);
        }
        return new SimpleChange_1.SimpleChange(inserted, change.removed());
    };
    return FilterDuplicateValue;
}());
exports.FilterDuplicateValue = FilterDuplicateValue;
//# sourceMappingURL=FilterDuplicateValue.js.map