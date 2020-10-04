"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListQueryResult_1 = require("./ListQueryResult");
var Channels_1 = require("../../Channels");
var PropertyEqualsFilter_1 = require("../filter/PropertyEqualsFilter");
var Comparables_1 = require("../../Comparables");
var PropertyQueryResult_1 = require("./PropertyQueryResult");
var observable_1 = require("@wildebeest/observable");
var MapQueryResult_1 = require("./MapQueryResult");
var ObjectPropertyAdapter_1 = require("../adapter/ObjectPropertyAdapter");
var QueryBuilder = (function () {
    function QueryBuilder(source, propertyIndexName) {
        this.source = source;
        this.filters = [];
        this.indexName = 'identify';
        this.propertyIndexName = propertyIndexName;
        this.operations = new Map();
        this.operations.set('=', function (key, value) {
            return new PropertyEqualsFilter_1.PropertyEqualsFilter(key, value);
        });
    }
    QueryBuilder.prototype.filter = function (propertyName, operation, value) {
        if (!this.operations.has(operation)) {
            throw "Filter cannot be build, operations is not recognized: " + operation;
        }
        this.filters.push(this.operations.get(operation)(propertyName, value));
        return this;
    };
    QueryBuilder.prototype.orderBy = function (propertyName, direction) {
        if (direction === void 0) { direction = 'asc'; }
        this.orderKey = propertyName;
        this.orderDirection = direction;
        return this;
    };
    QueryBuilder.prototype.indexBy = function (propertyName) {
        this.indexName = propertyName;
        return this;
    };
    QueryBuilder.prototype.list = function () {
        var channel;
        if (this.orderKey) {
            channel = Channels_1.Channels.createOrderedList(Comparables_1.Comparables.property(this.orderKey, this.orderDirection));
        }
        else {
            channel = Channels_1.Channels.createList();
        }
        return new ListQueryResult_1.ListQueryResult(this.source, channel, new observable_1.Pipe(this.filters));
    };
    QueryBuilder.prototype.property = function (identityValue) {
        return new PropertyQueryResult_1.PropertyQueryResult(this.source, new observable_1.Pipe([
            new PropertyEqualsFilter_1.PropertyEqualsFilter(this.propertyIndexName, identityValue)
        ]));
    };
    QueryBuilder.prototype.map = function () {
        return new MapQueryResult_1.MapQueryResult(this.source, Channels_1.Channels.createIndexedMap(new ObjectPropertyAdapter_1.ObjectPropertyAdapter(this.indexName)), new observable_1.Pipe(this.filters));
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map