"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var SimpleObservableListOutput = (function () {
    function SimpleObservableListOutput(values) {
        if (values === void 0) { values = []; }
        this.list = __spreadArrays(values);
        this.channel = new observable_1.ProxyChannel();
    }
    SimpleObservableListOutput.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    SimpleObservableListOutput.prototype.connectFn = function (fn) {
        return this.channel.connectFn(fn);
    };
    SimpleObservableListOutput.prototype.disconnect = function (dispatcher) {
        this.channel.disconnect(dispatcher);
    };
    SimpleObservableListOutput.prototype.dispatch = function (change) {
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return;
        }
        this.list = __spreadArrays(change.source());
        this.channel.dispatch(change);
    };
    SimpleObservableListOutput.prototype.isEmpty = function () {
        return this.count() === 0;
    };
    SimpleObservableListOutput.prototype.get = function (index) {
        if (this.count() <= index) {
            return undefined;
        }
        return this.list[index];
    };
    SimpleObservableListOutput.prototype.getAll = function () {
        return this.list;
    };
    SimpleObservableListOutput.prototype.count = function () {
        return this.list.length;
    };
    SimpleObservableListOutput.prototype.contains = function (item) {
        return this.list.indexOf(item) > -1;
    };
    return SimpleObservableListOutput;
}());
exports.SimpleObservableListOutput = SimpleObservableListOutput;
//# sourceMappingURL=SimpleObservableListOutput.js.map