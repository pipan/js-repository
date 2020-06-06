"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var PropertyChange_1 = require("../PropertyChange");
var SimpleObservableProperty = (function () {
    function SimpleObservableProperty(value) {
        if (value === void 0) { value = undefined; }
        this.value = value;
        this.channel = new observable_1.ProxyChannel();
    }
    SimpleObservableProperty.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    SimpleObservableProperty.prototype.connectFn = function (fn) {
        return this.channel.connectFn(fn);
    };
    SimpleObservableProperty.prototype.disconnect = function (dispatcher) {
        this.channel.disconnect(dispatcher);
    };
    SimpleObservableProperty.prototype.get = function () {
        return this.value;
    };
    SimpleObservableProperty.prototype.isEmpty = function () {
        return this.value === undefined || this.value === null;
    };
    SimpleObservableProperty.prototype.equals = function (value) {
        return this.value === value;
    };
    SimpleObservableProperty.prototype.set = function (value) {
        if (this.equals(value)) {
            return;
        }
        var prev = this.value;
        this.value = value;
        this.channel.dispatch(new PropertyChange_1.PropertyChange(this.value, prev));
    };
    SimpleObservableProperty.prototype.clear = function () {
        this.set(undefined);
    };
    return SimpleObservableProperty;
}());
exports.SimpleObservableProperty = SimpleObservableProperty;
//# sourceMappingURL=SimpleObservableProperty.js.map