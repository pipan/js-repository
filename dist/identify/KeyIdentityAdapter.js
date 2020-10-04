"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyIdentityAdapter = (function () {
    function KeyIdentityAdapter(key) {
        this.key = key;
    }
    KeyIdentityAdapter.prototype.adapt = function (item) {
        return item[this.key];
    };
    return KeyIdentityAdapter;
}());
exports.KeyIdentityAdapter = KeyIdentityAdapter;
//# sourceMappingURL=KeyIdentityAdapter.js.map