"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var FilterMissingRemoved_1 = require("../filter/FilterMissingRemoved");
var FilterDuplicateInsert_1 = require("../filter/FilterDuplicateInsert");
var FilterDuplicateValue_1 = require("../filter/FilterDuplicateValue");
var CreateRemoveEventForReplace_1 = require("../filter/CreateRemoveEventForReplace");
var CorrectRemovedValue_1 = require("../filter/CorrectRemovedValue");
var SimpleMapChannel = (function () {
    function SimpleMapChannel() {
        this.channel = new observable_1.ProxyChannel();
        this.state = new Map();
        this.pipe = new observable_1.Pipe([
            new FilterMissingRemoved_1.FilterMissingRemoved(this.state),
            new CorrectRemovedValue_1.CorrectRemovedValue(this.state),
            new FilterDuplicateInsert_1.FilterDuplicateInsert(),
            new FilterDuplicateValue_1.FilterDuplicateValue(this.state),
            new CreateRemoveEventForReplace_1.CreateRemoveEventForReplace(this.state)
        ]);
    }
    SimpleMapChannel.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    SimpleMapChannel.prototype.connectFn = function (fn) {
        return this.channel.connectFn(fn);
    };
    SimpleMapChannel.prototype.disconnect = function (dispatcher) {
        this.channel.disconnect(dispatcher);
    };
    SimpleMapChannel.prototype.dispatch = function (change) {
        change = this.pipe.execute(change);
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return;
        }
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var toRemove = _a[_i];
            this.state.delete(toRemove.getKey());
        }
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var toInsert = _c[_b];
            this.state.set(toInsert.getKey(), toInsert.getValue());
        }
        this.channel.dispatch(change);
    };
    SimpleMapChannel.prototype.get = function () {
        return this.state;
    };
    return SimpleMapChannel;
}());
exports.SimpleMapChannel = SimpleMapChannel;
//# sourceMappingURL=SimpleMapChannel.js.map