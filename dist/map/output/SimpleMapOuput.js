"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var MapEntry_1 = require("../MapEntry");
var SimpleMapOutput = (function () {
    function SimpleMapOutput() {
        this.channel = new observable_1.ProxyChannel();
        this.map = new Map();
        this.list = [];
    }
    SimpleMapOutput.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    SimpleMapOutput.prototype.connectFn = function (fn) {
        return this.channel.connectFn(fn);
    };
    SimpleMapOutput.prototype.disconnect = function (dispatcher) {
        return this.channel.disconnect(dispatcher);
    };
    SimpleMapOutput.prototype.getAll = function () {
        return [];
    };
    SimpleMapOutput.prototype.get = function (key) {
        return this.map.get(key);
    };
    SimpleMapOutput.prototype.contains = function (key) {
        return this.map.has(key);
    };
    SimpleMapOutput.prototype.isEmpty = function () {
        return this.count() === 0;
    };
    SimpleMapOutput.prototype.count = function () {
        return this.map.size;
    };
    SimpleMapOutput.prototype.forEach = function (fn) {
        this.map.forEach(fn);
    };
    SimpleMapOutput.prototype.dispatch = function (change) {
        var _this = this;
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return;
        }
        this.map = new Map(change.source());
        this.list = [];
        this.map.forEach(function (value, key) {
            _this.list.push(new MapEntry_1.MapEntry(key, value));
        });
        this.channel.dispatch(change);
    };
    return SimpleMapOutput;
}());
exports.SimpleMapOutput = SimpleMapOutput;
//# sourceMappingURL=SimpleMapOuput.js.map