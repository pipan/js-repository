"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapEntry_1 = require("../MapEntry");
var SimpleChange_1 = require("../../change/SimpleChange");
var CreateRemoveEventForReplace = (function () {
    function CreateRemoveEventForReplace(map) {
        this.map = map;
    }
    CreateRemoveEventForReplace.prototype.execute = function (change) {
        var removed = change.removed();
        for (var _i = 0, _a = change.inserted(); _i < _a.length; _i++) {
            var toInsert = _a[_i];
            if (!this.map.has(toInsert.getKey())) {
                continue;
            }
            removed.push(new MapEntry_1.MapEntry(toInsert.getKey(), this.map.get(toInsert.getKey())));
        }
        return new SimpleChange_1.SimpleChange(change.inserted(), removed);
    };
    return CreateRemoveEventForReplace;
}());
exports.CreateRemoveEventForReplace = CreateRemoveEventForReplace;
//# sourceMappingURL=CreateRemoveEventForReplace.js.map