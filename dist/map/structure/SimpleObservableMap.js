"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleMapOuput_1 = require("../output/SimpleMapOuput");
var MapEntry_1 = require("../MapEntry");
var MapChange_1 = require("../MapChange");
var SimpleChangeInput_1 = require("../../change/input/SimpleChangeInput");
var SimpleMapChannel_1 = require("./SimpleMapChannel");
var SimpleObservableMap = (function () {
    function SimpleObservableMap() {
        var _this = this;
        this.mapChannel = new SimpleMapChannel_1.SimpleMapChannel();
        this.input = new SimpleChangeInput_1.SimpleChangeInput();
        this.output = new SimpleMapOuput_1.SimpleMapOutput();
        this.input.connect(this.mapChannel);
        this.mapChannel.connectFn(function (change) {
            var data = new Map(_this.mapChannel.get());
            _this.output.dispatch(new MapChange_1.MapChange(data, change.inserted(), change.removed()));
        });
    }
    SimpleObservableMap.prototype.connect = function (dispatcher) {
        return this.output.connect(dispatcher);
    };
    SimpleObservableMap.prototype.connectFn = function (fn) {
        return this.output.connectFn(fn);
    };
    SimpleObservableMap.prototype.disconnect = function (dispatcher) {
        this.output.disconnect(dispatcher);
    };
    SimpleObservableMap.prototype.getAll = function () {
        return this.output.getAll();
    };
    SimpleObservableMap.prototype.get = function (key) {
        return this.output.get(key);
    };
    SimpleObservableMap.prototype.contains = function (key) {
        return this.mapChannel.get().has(key);
    };
    SimpleObservableMap.prototype.isEmpty = function () {
        return this.output.isEmpty();
    };
    SimpleObservableMap.prototype.count = function () {
        return this.output.count();
    };
    SimpleObservableMap.prototype.forEach = function (fn) {
        this.output.forEach(fn);
    };
    SimpleObservableMap.prototype.insert = function (key, value) {
        this.input.insert([new MapEntry_1.MapEntry(key, value)]);
    };
    SimpleObservableMap.prototype.remove = function (key) {
        this.removeAll([key]);
    };
    SimpleObservableMap.prototype.removeAll = function (keys) {
        var toRemove = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            toRemove.push(new MapEntry_1.MapEntry(key, this.mapChannel.get().get(key)));
        }
        this.removeAllEntries(toRemove);
    };
    SimpleObservableMap.prototype.removeAllEntries = function (entries) {
        this.input.remove(entries);
    };
    SimpleObservableMap.prototype.clear = function () {
        var toRemove = [];
        this.mapChannel.get().forEach(function (value, key) {
            toRemove.push(new MapEntry_1.MapEntry(key, value));
        });
        this.removeAllEntries(toRemove);
    };
    return SimpleObservableMap;
}());
exports.SimpleObservableMap = SimpleObservableMap;
//# sourceMappingURL=SimpleObservableMap.js.map