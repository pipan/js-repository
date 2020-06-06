"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleChange_1 = require("../../change/SimpleChange");
var FilterMissingRemoved = (function () {
    function FilterMissingRemoved(list) {
        this.list = list;
    }
    FilterMissingRemoved.prototype.execute = function (change) {
        var toRemove = [];
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var removed = _a[_i];
            if (this.list.indexOf(removed) === -1) {
                continue;
            }
            toRemove.push(removed);
        }
        return new SimpleChange_1.SimpleChange(change.inserted(), toRemove);
    };
    return FilterMissingRemoved;
}());
exports.FilterMissingRemoved = FilterMissingRemoved;
//# sourceMappingURL=FilterMissingRemoved.js.map