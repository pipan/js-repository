"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var SimpleChange_1 = require("../../change/SimpleChange");
var PropertyQueryResult = (function () {
    function PropertyQueryResult(source, filters) {
        this.filterPipe = filters;
        this.source = source;
        this.eager = new observable_1.EagerObservable();
        this.dispatch(new SimpleChange_1.SimpleChange(this.source.get(), []));
        this.source.connect(this);
    }
    PropertyQueryResult.prototype.connect = function (dispatcher) {
        return this.eager.connect(dispatcher);
    };
    PropertyQueryResult.prototype.connectFn = function (fn) {
        return this.eager.connectFn(fn);
    };
    PropertyQueryResult.prototype.disconnect = function (dispatcher) {
        this.eager.disconnect(dispatcher);
    };
    PropertyQueryResult.prototype.close = function () {
        this.source.disconnect(this);
    };
    PropertyQueryResult.prototype.dispatch = function (change) {
        change = this.filterPipe.execute(change);
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return;
        }
        var value = undefined;
        if (change.inserted().length > 0) {
            value = change.inserted()[0];
        }
        this.eager.dispatch(value);
    };
    PropertyQueryResult.prototype.get = function () {
        return this.eager.get();
    };
    PropertyQueryResult.prototype.imidiate = function () {
        var value = this.get();
        this.close();
        return value;
    };
    return PropertyQueryResult;
}());
exports.PropertyQueryResult = PropertyQueryResult;
//# sourceMappingURL=PropertyQueryResult.js.map