"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var FilterMissingRemoved_1 = require("../filter/FilterMissingRemoved");
var SimpleListChannel = (function () {
    function SimpleListChannel(value) {
        if (value === void 0) { value = []; }
        this.state = value;
        this.channel = new observable_1.ProxyChannel();
        this.pipe = new observable_1.Pipe([
            new FilterMissingRemoved_1.FilterMissingRemoved(this.state)
        ]);
    }
    SimpleListChannel.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    SimpleListChannel.prototype.connectFn = function (fn) {
        return this.channel.connectFn(fn);
    };
    SimpleListChannel.prototype.disconnect = function (dispatcher) {
        this.channel.disconnect(dispatcher);
    };
    SimpleListChannel.prototype.dispatch = function (change) {
        change = this.pipe.execute(change);
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return;
        }
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var remove = _a[_i];
            var index = this.state.indexOf(remove);
            this.state.splice(index, 1);
        }
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var insert = _c[_b];
            this.state.push(insert);
        }
        this.channel.dispatch(change);
    };
    SimpleListChannel.prototype.get = function () {
        return this.state;
    };
    return SimpleListChannel;
}());
exports.SimpleListChannel = SimpleListChannel;
//# sourceMappingURL=SimpleListChannel.js.map