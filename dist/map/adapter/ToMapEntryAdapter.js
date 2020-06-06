"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapEntry_1 = require("../MapEntry");
var ToMapEntryAdapter = (function () {
    function ToMapEntryAdapter(adapter) {
        this.adapter = adapter;
    }
    ToMapEntryAdapter.prototype.adapt = function (item) {
        return new MapEntry_1.MapEntry(this.adapter.adapt(item), item);
    };
    return ToMapEntryAdapter;
}());
exports.ToMapEntryAdapter = ToMapEntryAdapter;
//# sourceMappingURL=ToMapEntryAdapter.js.map