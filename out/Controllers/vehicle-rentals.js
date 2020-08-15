"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRentalsController = void 0;
var express = require("express");
var mongoHelper_1 = require("../mongoHelper");
var environment_1 = require("../environment");
var VehicleRentalsController = /** @class */ (function () {
    function VehicleRentalsController() {
        var _this = this;
        this.path_vehicleRentals = environment_1.env.VEHICLE_RENTALS + "/:" + environment_1.env.DATE_RANGE;
        this.router = express.Router();
        this.getCollection = function () {
            return mongoHelper_1.MongoHelper.client.db(environment_1.env.DATABASE_NAME).collection(environment_1.env.collection_vehicles);
        };
        this.getVehicleList = function (req, res) {
            var location = req.params.location;
            var dateRange = req.params.dateRange;
            try {
                _this.getCollection().find({}).toArray(function (err, data) {
                    if (err)
                        throw err;
                    res.status(200).json(data);
                });
            }
            catch (err) {
                res.status(400).json({ msg: "Get vehicle failed" });
                console.log(err);
            }
        };
        this.router.get(this.path_vehicleRentals, this.getVehicleList);
    }
    return VehicleRentalsController;
}());
exports.VehicleRentalsController = VehicleRentalsController;
//# sourceMappingURL=vehicle-rentals.js.map