"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleObservableListOutput_1 = require("../output/SimpleObservableListOutput");
var ListChange_1 = require("../ListChange");
var SimpleChangeInput_1 = require("../../change/input/SimpleChangeInput");
var ObservableListFrame = (function () {
    function ObservableListFrame(listChannel) {
        var _this = this;
        this.listChannel = listChannel;
        this.input = new SimpleChangeInput_1.SimpleChangeInput();
        this.output = new SimpleObservableListOutput_1.SimpleObservableListOutput(this.listChannel.get());
        this.input.connect(this.listChannel);
        this.listChannel.connectFn(function (change) {
            var data = __spreadArrays(_this.listChannel.get());
            _this.output.dispatch(new ListChange_1.ListChange(data, change.inserted(), change.removed()));
        });
    }
    ObservableListFrame.prototype.connect = function (dispatcher) {
        return this.output.connect(dispatcher);
    };
    ObservableListFrame.prototype.connectFn = function (fn) {
        return this.output.connectFn(fn);
    };
    ObservableListFrame.prototype.disconnect = function (dispatcher) {
        this.output.disconnect(dispatcher);
    };
    ObservableListFrame.prototype.getAll = function () {
        return this.output.getAll();
    };
    ObservableListFrame.prototype.get = function (index) {
        return this.output.get(index);
    };
    ObservableListFrame.prototype.count = function () {
        return this.output.count();
    };
    ObservableListFrame.prototype.isEmpty = function () {
        return this.output.isEmpty();
    };
    ObservableListFrame.prototype.contains = function (item) {
        return this.output.contains(item);
    };
    ObservableListFrame.prototype.insert = function (item) {
        this.insertAll([item]);
    };
    ObservableListFrame.prototype.insertAll = function (items) {
        this.input.insert(items);
    };
    ObservableListFrame.prototype.remove = function (item) {
        this.removeAll([item]);
    };
    ObservableListFrame.prototype.removeAll = function (items) {
        this.input.remove(items);
    };
    ObservableListFrame.prototype.setAll = function (items) {
        this.clear();
        this.insertAll(items);
    };
    ObservableListFrame.prototype.clear = function () {
        this.removeAll(this.getAll());
    };
    return ObservableListFrame;
}());
exports.ObservableListFrame = ObservableListFrame;
//# sourceMappingURL=ObservableListFrame.js.map