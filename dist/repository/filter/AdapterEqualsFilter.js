"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleChange_1 = require("../../change/SimpleChange");
var ObjectPropertyAdapter_1 = require("../adapter/ObjectPropertyAdapter");
var AdapterEqualsFilter = (function () {
    function AdapterEqualsFilter(adapter, value) {
        this.adapter = adapter;
        this.value = value;
    }
    AdapterEqualsFilter.fromPropertyName = function (key, value) {
        return new AdapterEqualsFilter(new ObjectPropertyAdapter_1.ObjectPropertyAdapter(key), value);
    };
    AdapterEqualsFilter.prototype.execute = function (value) {
        var toRemove = [];
        for (var _i = 0, _a = value.removed(); _i < _a.length; _i++) {
            var removed = _a[_i];
            if (this.adapter.adapt(removed) !== this.value) {
                continue;
            }
            toRemove.push(removed);
        }
        var toInsert = [];
        for (var _b = 0, _c = value.inserted(); _b < _c.length; _b++) {
            var inserted = _c[_b];
            if (this.adapter.adapt(inserted) !== this.value) {
                continue;
            }
            toInsert.push(inserted);
        }
        return new SimpleChange_1.SimpleChange(toInsert, toRemove);
    };
    return AdapterEqualsFilter;
}());
exports.AdapterEqualsFilter = AdapterEqualsFilter;
//# sourceMappingURL=AdapterEqualsFilter.js.map