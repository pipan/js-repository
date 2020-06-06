"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleListChannel_1 = require("./SimpleListChannel");
var OrderedListChannel = (function (_super) {
    __extends(OrderedListChannel, _super);
    function OrderedListChannel(compare, value) {
        if (value === void 0) { value = []; }
        var _this = _super.call(this, value) || this;
        _this.compare = compare;
        _this.state.sort(function (a, b) {
            return _this.compare.compare(a, b);
        });
        return _this;
    }
    OrderedListChannel.prototype.dispatch = function (change) {
        change = this.pipe.execute(change);
        if (change.inserted().length === 0 && change.removed().length === 0) {
            return;
        }
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var toRemove = _a[_i];
            var index = this.state.indexOf(toRemove);
            this.state.splice(index, 1);
        }
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var toInsert = _c[_b];
            var index = this.getInsertIndex(this.state, toInsert);
            if (index === -1) {
                this.state.push(toInsert);
            }
            else {
                this.state.splice(index, 0, toInsert);
            }
        }
        this.channel.dispatch(change);
    };
    OrderedListChannel.prototype.getInsertIndex = function (data, toInsert) {
        var index = 0;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            if (this.compare.compare(toInsert, item) < 0) {
                return index;
            }
            index++;
        }
        return -1;
    };
    return OrderedListChannel;
}(SimpleListChannel_1.SimpleListChannel));
exports.OrderedListChannel = OrderedListChannel;
//# sourceMappingURL=OrderedListChannel.js.map