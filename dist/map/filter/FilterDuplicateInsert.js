"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapEntry_1 = require("../MapEntry");
var SimpleChange_1 = require("../../change/SimpleChange");
var FilterDuplicateInsert = (function () {
    function FilterDuplicateInsert() {
    }
    FilterDuplicateInsert.prototype.execute = function (change) {
        var insertedMap = new Map();
        for (var _i = 0, _a = change.inserted(); _i < _a.length; _i++) {
            var toInsert = _a[_i];
            insertedMap.set(toInsert.getKey(), toInsert.getValue());
        }
        var inserted = [];
        insertedMap.forEach(function (value, key) {
            inserted.push(new MapEntry_1.MapEntry(key, value));
        });
        return new SimpleChange_1.SimpleChange(inserted, change.removed());
    };
    return FilterDuplicateInsert;
}());
exports.FilterDuplicateInsert = FilterDuplicateInsert;
//# sourceMappingURL=FilterDuplicateInsert.js.map