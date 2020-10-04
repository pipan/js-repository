"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Channels_1 = require("../../Channels");
var IdentityAdapter_1 = require("../../identify/IdentityAdapter");
var SimpleChange_1 = require("../../change/SimpleChange");
var QueryBuilder_1 = require("../query/QueryBuilder");
var KeyIdentityAdapter_1 = require("../../identify/KeyIdentityAdapter");
var SimpleRepository = (function () {
    function SimpleRepository(source, identityIndex) {
        this.source = source;
        this.identityIndex = identityIndex;
    }
    SimpleRepository.createIdentifiable = function () {
        return new SimpleRepository(Channels_1.Channels.createUniqueList(new IdentityAdapter_1.IdentityAdapter()), 'identify');
    };
    SimpleRepository.fromKeyProperty = function (key) {
        return new SimpleRepository(Channels_1.Channels.createUniqueList(new KeyIdentityAdapter_1.KeyIdentityAdapter(key)), key);
    };
    SimpleRepository.prototype.query = function () {
        return new QueryBuilder_1.QueryBuilder(this.source, this.identityIndex);
    };
    SimpleRepository.prototype.get = function () {
        return this.source.get();
    };
    SimpleRepository.prototype.connect = function (dispatcher) {
        return this.source.connect(dispatcher);
    };
    SimpleRepository.prototype.connectFn = function (fn) {
        return this.source.connectFn(fn);
    };
    SimpleRepository.prototype.disconnect = function (dispatcher) {
        this.source.disconnect(dispatcher);
    };
    SimpleRepository.prototype.insert = function (item) {
        this.insertAll([item]);
    };
    SimpleRepository.prototype.insertAll = function (items) {
        this.change(items, []);
    };
    SimpleRepository.prototype.remove = function (item) {
        this.removeAll([item]);
    };
    SimpleRepository.prototype.removeAll = function (items) {
        this.change([], items);
    };
    SimpleRepository.prototype.setAll = function (items) {
        this.change(items, this.source.get());
    };
    SimpleRepository.prototype.clear = function () {
        this.change([], this.source.get());
    };
    SimpleRepository.prototype.change = function (insert, remove) {
        this.source.dispatch(new SimpleChange_1.SimpleChange(insert, remove));
    };
    return SimpleRepository;
}());
exports.SimpleRepository = SimpleRepository;
//# sourceMappingURL=SimpleRepository.js.map