"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleListChannel_1 = require("./list/structure/SimpleListChannel");
var OrderedListChannel_1 = require("./list/structure/OrderedListChannel");
var UniqueListChannel_1 = require("./list/structure/UniqueListChannel");
var SimpleMapChannel_1 = require("./map/structure/SimpleMapChannel");
var IndexedMapChannel_1 = require("./map/structure/IndexedMapChannel");
var Channels = (function () {
    function Channels() {
    }
    Channels.createList = function (value) {
        if (value === void 0) { value = []; }
        return new SimpleListChannel_1.SimpleListChannel(value);
    };
    Channels.createOrderedList = function (compare, value) {
        if (value === void 0) { value = []; }
        return new OrderedListChannel_1.OrderedListChannel(compare, value);
    };
    Channels.createUniqueList = function (adapter, value) {
        if (value === void 0) { value = []; }
        return new UniqueListChannel_1.UniqueListChannel(adapter, value);
    };
    Channels.createMap = function () {
        return new SimpleMapChannel_1.SimpleMapChannel();
    };
    Channels.createIndexedMap = function (adapter) {
        return new IndexedMapChannel_1.IndexedMapChannel(adapter);
    };
    return Channels;
}());
exports.Channels = Channels;
//# sourceMappingURL=Channels.js.map