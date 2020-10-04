"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Channels_1 = require("../../Channels");
var IdentityAdapter_1 = require("../../identify/IdentityAdapter");
var SimpleChange_1 = require("../../change/SimpleChange");
var QueryBuilder_1 = require("../query/QueryBuilder");
var IdentifiableRepository = (function () {
    function IdentifiableRepository() {
        this.source = Channels_1.Channels.createUniqueList(new IdentityAdapter_1.IdentityAdapter());
    }
    IdentifiableRepository.prototype.query = function () {
        return new QueryBuilder_1.QueryBuilder(this.source);
    };
    IdentifiableRepository.prototype.get = function () {
        return this.source.get();
    };
    IdentifiableRepository.prototype.connect = function (dispatcher) {
        return this.source.connect(dispatcher);
    };
    IdentifiableRepository.prototype.connectFn = function (fn) {
        return this.source.connectFn(fn);
    };
    IdentifiableRepository.prototype.disconnect = function (dispatcher) {
        this.source.disconnect(dispatcher);
    };
    IdentifiableRepository.prototype.insert = function (item) {
        this.insertAll([item]);
    };
    IdentifiableRepository.prototype.insertAll = function (items) {
        this.change(items, []);
    };
    IdentifiableRepository.prototype.remove = function (item) {
        this.removeAll([item]);
    };
    IdentifiableRepository.prototype.removeAll = function (items) {
        this.change([], items);
    };
    IdentifiableRepository.prototype.setAll = function (items) {
        this.change(items, this.source.get());
    };
    IdentifiableRepository.prototype.clear = function () {
        this.change([], this.source.get());
    };
    IdentifiableRepository.prototype.change = function (insert, remove) {
        this.source.dispatch(new SimpleChange_1.SimpleChange(insert, remove));
    };
    return IdentifiableRepository;
}());
exports.IdentifiableRepository = IdentifiableRepository;
//# sourceMappingURL=IdentifiableRepository.js.map