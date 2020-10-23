"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var SimpleChange_1 = require("../../change/SimpleChange");
var MapQueryResult = (function () {
    function MapQueryResult(source, channel, filters) {
        var _this = this;
        this.channel = channel;
        this.filterPipe = filters;
        this.source = source;
        this.eager = new observable_1.EagerObservable(new Map());
        this.channel.connectFn(function () {
            _this.eager.dispatch(_this.channel.get());
        });
        this.dispatch(new SimpleChange_1.SimpleChange(this.source.get(), []));
        this.source.connect(this);
    }
    MapQueryResult.prototype.connect = function (dispatcher) {
        return this.eager.connect(dispatcher);
    };
    MapQueryResult.prototype.connectFn = function (fn) {
        return this.eager.connectFn(fn);
    };
    MapQueryResult.prototype.disconnect = function (dispatcher) {
        this.eager.disconnect(dispatcher);
    };
    MapQueryResult.prototype.close = function () {
        this.source.disconnect(this);
    };
    MapQueryResult.prototype.dispatch = function (change) {
        change = this.filterPipe.execute(change);
        this.channel.dispatch(change);
    };
    MapQueryResult.prototype.get = function () {
        return this.eager.get();
    };
    MapQueryResult.prototype.imidiate = function () {
        var value = this.get();
        this.close();
        return value;
    };
    return MapQueryResult;
}());
exports.MapQueryResult = MapQueryResult;
//# sourceMappingURL=MapQueryResult.js.map