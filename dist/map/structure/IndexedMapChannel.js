"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@wildebeest/observable");
var ChangeAdapter_1 = require("../../change/ChangeAdapter");
var FromMapEntryAdaper_1 = require("../adapter/FromMapEntryAdaper");
var ToMapEntryAdapter_1 = require("../adapter/ToMapEntryAdapter");
var SimpleMapChannel_1 = require("./SimpleMapChannel");
var IndexedMapChannel = (function () {
    function IndexedMapChannel(adapter) {
        var _this = this;
        this.toEntryAdapter = new ChangeAdapter_1.ChangeAdapter(new ToMapEntryAdapter_1.ToMapEntryAdapter(adapter));
        this.fromEntryAdapter = new ChangeAdapter_1.ChangeAdapter(new FromMapEntryAdaper_1.FromMapEntryAdapter());
        this.mapChannel = new SimpleMapChannel_1.SimpleMapChannel();
        this.channel = new observable_1.ProxyChannel();
        this.mapChannel.connectFn(function (item) {
            _this.channel.dispatch(_this.fromEntryAdapter.adapt(item));
        });
    }
    IndexedMapChannel.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    IndexedMapChannel.prototype.connectFn = function (fn) {
        return this.channel.connectFn(fn);
    };
    IndexedMapChannel.prototype.disconnect = function (dispatcher) {
        this.channel.disconnect(dispatcher);
    };
    IndexedMapChannel.prototype.dispatch = function (change) {
        this.mapChannel.dispatch(this.toEntryAdapter.adapt(change));
    };
    IndexedMapChannel.prototype.get = function () {
        return this.mapChannel.get();
    };
    return IndexedMapChannel;
}());
exports.IndexedMapChannel = IndexedMapChannel;
//# sourceMappingURL=IndexedMapChannel.js.map