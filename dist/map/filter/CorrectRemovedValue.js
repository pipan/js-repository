"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapEntry_1 = require("../MapEntry");
var SimpleChange_1 = require("../../change/SimpleChange");
var CorrectRemovedValue = (function () {
    function CorrectRemovedValue(map) {
        this.map = map;
    }
    CorrectRemovedValue.prototype.execute = function (change) {
        var removed = [];
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var toRemove = _a[_i];
            if (!this.map.has(toRemove.getKey())) {
                continue;
            }
            removed.push(new MapEntry_1.MapEntry(toRemove.getKey(), this.map.get(toRemove.getKey())));
        }
        return new SimpleChange_1.SimpleChange(change.inserted(), removed);
    };
    return CorrectRemovedValue;
}());
exports.CorrectRemovedValue = CorrectRemovedValue;
//# sourceMappingURL=CorrectRemovedValue.js.map