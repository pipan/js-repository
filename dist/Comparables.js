"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComparableFn_1 = require("./compare/ComparableFn");
var PropertyComparable_1 = require("./compare/PropertyComparable");
var InverseComparable_1 = require("./compare/InverseComparable");
var Comparables = (function () {
    function Comparables() {
    }
    Comparables.stringAsc = function () {
        return new ComparableFn_1.ComparableFn(function (a, b) {
            return a.localeCompare(b);
        });
    };
    Comparables.stringDesc = function () {
        return new ComparableFn_1.ComparableFn(function (a, b) {
            return a.localeCompare(b) * -1;
        });
    };
    Comparables.property = function (propertyName, direction) {
        if (direction == 'asc') {
            return this.propertyAsc(propertyName);
        }
        else {
            return this.propertyDesc(propertyName);
        }
    };
    Comparables.propertyAsc = function (propertyName) {
        return new PropertyComparable_1.PropertyComparable(propertyName);
    };
    Comparables.propertyDesc = function (propertyName) {
        return new InverseComparable_1.InverseComparable(this.propertyAsc(propertyName));
    };
    return Comparables;
}());
exports.Comparables = Comparables;
//# sourceMappingURL=Comparables.js.map