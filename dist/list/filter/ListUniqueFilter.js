"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListChange_1 = require("../ListChange");
var ListUniqueFilter = (function () {
    function ListUniqueFilter() {
    }
    ListUniqueFilter.prototype.execute = function (change) {
        var source = change.source();
        var toRemove = [];
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var removed = _a[_i];
            if (source.indexOf(removed) < 0) {
                continue;
            }
            if (toRemove.indexOf(removed) > -1) {
                continue;
            }
            toRemove.push(removed);
        }
        var toInsert = [];
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var inserted = _c[_b];
            if (source.indexOf(inserted) > -1) {
                continue;
            }
            if (toInsert.indexOf(inserted) > -1) {
                continue;
            }
            toInsert.push(inserted);
        }
        return new ListChange_1.ListChange(source, toInsert, toRemove);
    };
    return ListUniqueFilter;
}());
exports.ListUniqueFilter = ListUniqueFilter;
//# sourceMappingURL=ListUniqueFilter.js.map