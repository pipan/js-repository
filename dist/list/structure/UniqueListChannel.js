"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleListChannel_1 = require("./SimpleListChannel");
var ChangeAdapter_1 = require("../../change/ChangeAdapter");
var ToMapEntryAdapter_1 = require("../../map/adapter/ToMapEntryAdapter");
var FromMapEntryAdaper_1 = require("../../map/adapter/FromMapEntryAdaper");
var SimpleMapChannel_1 = require("../../map/structure/SimpleMapChannel");
var SimpleChange_1 = require("../../change/SimpleChange");
var UniqueListChannel = (function () {
    function UniqueListChannel(adapter, value) {
        var _this = this;
        if (value === void 0) { value = []; }
        this.listChannel = new SimpleListChannel_1.SimpleListChannel();
        this.mapChannel = new SimpleMapChannel_1.SimpleMapChannel();
        this.toEntryAdapter = new ChangeAdapter_1.ChangeAdapter(new ToMapEntryAdapter_1.ToMapEntryAdapter(adapter));
        this.fromEntryAdapter = new ChangeAdapter_1.ChangeAdapter(new FromMapEntryAdaper_1.FromMapEntryAdapter());
        this.mapChannel.connectFn(function (change) {
            _this.listChannel.dispatch(_this.fromEntryAdapter.adapt(change));
        });
        this.dispatch(new SimpleChange_1.SimpleChange(value, []));
    }
    UniqueListChannel.prototype.connect = function (dispatcher) {
        return this.listChannel.connect(dispatcher);
    };
    UniqueListChannel.prototype.connectFn = function (fn) {
        return this.listChannel.connectFn(fn);
    };
    UniqueListChannel.prototype.disconnect = function (dispatcher) {
        this.listChannel.disconnect(dispatcher);
    };
    UniqueListChannel.prototype.dispatch = function (change) {
        this.mapChannel.dispatch(this.toEntryAdapter.adapt(change));
    };
    UniqueListChannel.prototype.get = function () {
        return this.listChannel.get();
    };
    return UniqueListChannel;
}());
exports.UniqueListChannel = UniqueListChannel;
//# sourceMappingURL=UniqueListChannel.js.map