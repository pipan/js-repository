"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapChange = (function () {
    function MapChange(source, inserted, removed) {
        this.sourceValue = source;
        this.insertedValue = inserted;
        this.removedValue = removed;
    }
    MapChange.prototype.inserted = function () {
        return this.insertedValue;
    };
    MapChange.prototype.removed = function () {
        return this.removedValue;
    };
    MapChange.prototype.source = function () {
        return this.sourceValue;
    };
    return MapChange;
}());
exports.MapChange = MapChange;
//# sourceMappingURL=MapChange.js.map