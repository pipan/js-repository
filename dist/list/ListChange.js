"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListChange = (function () {
    function ListChange(sourceValue, insertedArray, removedArray) {
        this.removedArray = removedArray;
        this.insertedArray = insertedArray;
        this.sourceValue = sourceValue;
    }
    ListChange.prototype.removed = function () {
        return this.removedArray;
    };
    ListChange.prototype.inserted = function () {
        return this.insertedArray;
    };
    ListChange.prototype.source = function () {
        return this.sourceValue;
    };
    return ListChange;
}());
exports.ListChange = ListChange;
//# sourceMappingURL=ListChange.js.map