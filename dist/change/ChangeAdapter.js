"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleChange_1 = require("./SimpleChange");
var ChangeAdapter = (function () {
    function ChangeAdapter(adapter) {
        this.adapter = adapter;
    }
    ChangeAdapter.prototype.adapt = function (item) {
        var toRemove = [];
        for (var _i = 0, _a = item.removed(); _i < _a.length; _i++) {
            var remove = _a[_i];
            toRemove.push(this.adapter.adapt(remove));
        }
        var toInsert = [];
        for (var _b = 0, _c = item.inserted(); _b < _c.length; _b++) {
            var insert = _c[_b];
            toInsert.push(this.adapter.adapt(insert));
        }
        return new SimpleChange_1.SimpleChange(toInsert, toRemove);
    };
    return ChangeAdapter;
}());
exports.ChangeAdapter = ChangeAdapter;
//# sourceMappingURL=ChangeAdapter.js.map