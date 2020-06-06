"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdentityAdapter = (function () {
    function IdentityAdapter() {
    }
    IdentityAdapter.prototype.adapt = function (item) {
        return item.identify();
    };
    return IdentityAdapter;
}());
exports.IdentityAdapter = IdentityAdapter;
//# sourceMappingURL=IdentityAdapter.js.map