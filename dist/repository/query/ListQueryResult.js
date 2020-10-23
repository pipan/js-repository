"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var SimpleChange_1 = require("../../change/SimpleChange");
var ListQueryResult = (function () {
    function ListQueryResult(source, channel, filters) {
        var _this = this;
        this.channel = channel;
        this.filterPipe = filters;
        this.source = source;
        this.eager = new observable_1.EagerObservable([]);
        this.channel.connectFn(function () {
            _this.eager.dispatch(_this.channel.get());
        });
        this.dispatch(new SimpleChange_1.SimpleChange(this.source.get(), []));
        this.source.connect(this);
    }
    ListQueryResult.prototype.connect = function (dispatcher) {
        return this.eager.connect(dispatcher);
    };
    ListQueryResult.prototype.connectFn = function (fn) {
        return this.eager.connectFn(fn);
    };
    ListQueryResult.prototype.disconnect = function (dispatcher) {
        this.eager.disconnect(dispatcher);
    };
    ListQueryResult.prototype.close = function () {
        this.source.disconnect(this);
    };
    ListQueryResult.prototype.dispatch = function (change) {
        change = this.filterPipe.execute(change);
        this.channel.dispatch(change);
    };
    ListQueryResult.prototype.get = function () {
        return this.eager.get();
    };
    ListQueryResult.prototype.imidiate = function () {
        var value = this.get();
        this.close();
        return value;
    };
    return ListQueryResult;
}());
exports.ListQueryResult = ListQueryResult;
//# sourceMappingURL=ListQueryResult.js.map