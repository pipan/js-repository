"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObservableListFrame_1 = require("./list/structure/ObservableListFrame");
var SimpleObservableProperty_1 = require("./property/structure/SimpleObservableProperty");
var SimpleObservableMap_1 = require("./map/structure/SimpleObservableMap");
var OrderedListChannel_1 = require("./list/structure/OrderedListChannel");
var SimpleListChannel_1 = require("./list/structure/SimpleListChannel");
var Observables = (function () {
    function Observables() {
    }
    Observables.createProperty = function (value) {
        if (value === void 0) { value = undefined; }
        return new SimpleObservableProperty_1.SimpleObservableProperty(value);
    };
    Observables.createList = function (values) {
        if (values === void 0) { values = []; }
        return new ObservableListFrame_1.ObservableListFrame(new SimpleListChannel_1.SimpleListChannel(values));
    };
    Observables.createOrderedList = function (compare, values) {
        if (values === void 0) { values = []; }
        return new ObservableListFrame_1.ObservableListFrame(new OrderedListChannel_1.OrderedListChannel(compare, values));
    };
    Observables.createMap = function () {
        return new SimpleObservableMap_1.SimpleObservableMap();
    };
    return Observables;
}());
exports.Observables = Observables;
//# sourceMappingURL=Observables.js.map