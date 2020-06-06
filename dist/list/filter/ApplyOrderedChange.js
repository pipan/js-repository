"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ListChange_1 = require("../ListChange");
var ApplyOrderedChange = (function () {
    function ApplyOrderedChange(compare) {
        this.compare = compare;
    }
    ApplyOrderedChange.prototype.execute = function (change) {
        var data = __spreadArrays(change.source());
        var removed = [];
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var toRemove = _a[_i];
            var index = data.indexOf(toRemove);
            if (index === -1) {
                continue;
            }
            removed.push(toRemove);
            data.splice(index, 1);
        }
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var toInsert = _c[_b];
            var index = this.getInsertIndex(data, toInsert);
            if (index === -1) {
                data.push(toInsert);
            }
            else {
                data.splice(index, 0, toInsert);
            }
        }
        return new ListChange_1.ListChange(data, change.inserted(), removed);
    };
    ApplyOrderedChange.prototype.getInsertIndex = function (data, toInsert) {
        var index = 0;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            if (this.compare.compare(toInsert, item) < 0) {
                return index;
            }
            index++;
        }
        return -1;
    };
    return ApplyOrderedChange;
}());
exports.ApplyOrderedChange = ApplyOrderedChange;
//# sourceMappingURL=ApplyOrderedChange.js.map