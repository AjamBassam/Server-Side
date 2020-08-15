"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = exports.ILocation = exports.VehicleModel = void 0;
var VehicleModel = /** @class */ (function () {
    function VehicleModel() {
        this._id = undefined;
        this.location = undefined;
        this.date = undefined;
        this.price = undefined;
        this.ownerId = undefined;
    }
    return VehicleModel;
}());
exports.VehicleModel = VehicleModel;
var ILocation = /** @class */ (function () {
    function ILocation() {
        this.city = undefined;
        this.latitude = undefined;
        this.longitude = undefined;
    }
    return ILocation;
}());
exports.ILocation = ILocation;
;
exports.Vehicle = new VehicleModel();
//# sourceMappingURL=vehicleModel.js.map