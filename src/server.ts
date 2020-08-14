import { App } from "./app";
import { RegistrationController } from "./Controllers/registration";
import { VehicleRentalsController } from "./Controllers/vehicle-rentals";
import { AuthController } from "./Controllers/authentication";
import { ListYourVehicleController } from "./Controllers/list-your-vehicle";
import { VehicleController } from "./Controllers/vehicleController";
import { AccountController } from "./Controllers/account";
import { env } from "./environment";

const app = new App(
  [
    new RegistrationController(),
    new AuthController(),
    new ListYourVehicleController(),
    new VehicleRentalsController(),
    new VehicleController(),
    new AccountController(),
  ],
  env.PORT,
);

app.start();