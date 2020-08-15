"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserModel = void 0;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.email = undefined;
        this.password = undefined;
        this.firstName = undefined;
        this.lastName = undefined;
        this.connected = undefined;
        this.profilePic = undefined;
        this.mobile = undefined;
        this.favorites = undefined;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
;
exports.User = new UserModel();
//# sourceMappingURL=userModel.js.map