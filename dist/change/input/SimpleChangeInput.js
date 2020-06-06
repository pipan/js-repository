"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var SimpleChange_1 = require("../SimpleChange");
var SimpleChangeInput = (function () {
    function SimpleChangeInput() {
        this.channel = new observable_1.ProxyChannel();
    }
    SimpleChangeInput.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    SimpleChangeInput.prototype.connectFn = function (fn) {
        return this.channel.connectFn(fn);
    };
    SimpleChangeInput.prototype.disconnect = function (dispatcher) {
        this.channel.disconnect(dispatcher);
    };
    SimpleChangeInput.prototype.insert = function (items) {
        this.change(items, []);
    };
    SimpleChangeInput.prototype.remove = function (items) {
        this.change([], items);
    };
    SimpleChangeInput.prototype.change = function (insert, remove) {
        this.channel.dispatch(new SimpleChange_1.SimpleChange(insert, remove));
    };
    return SimpleChangeInput;
}());
exports.SimpleChangeInput = SimpleChangeInput;
//# sourceMappingURL=SimpleChangeInput.js.map