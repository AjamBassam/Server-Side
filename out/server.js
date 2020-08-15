"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var registration_1 = require("./Controllers/registration");
var vehicle_rentals_1 = require("./Controllers/vehicle-rentals");
var authentication_1 = require("./Controllers/authentication");
var list_your_vehicle_1 = require("./Controllers/list-your-vehicle");
var vehicleController_1 = require("./Controllers/vehicleController");
var account_1 = require("./Controllers/account");
var environment_1 = require("./environment");
var app = new app_1.App([
    new registration_1.RegistrationController(),
    new authentication_1.AuthController(),
    new list_your_vehicle_1.ListYourVehicleController(),
    new vehicle_rentals_1.VehicleRentalsController(),
    new vehicleController_1.VehicleController(),
    new account_1.AccountController(),
], environment_1.env.PORT);
app.start();
//# sourceMappingURL=server.js.map