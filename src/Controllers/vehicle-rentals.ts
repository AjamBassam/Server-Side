import * as express from 'express';
import { MongoHelper } from '../mongoHelper';
import { env } from '../environment';

export class VehicleRentalsController {
  public path_vehicleRentals = `${env.VEHICLE_RENTALS}/:${env.DATE_RANGE}`;
  public router = express.Router();

  constructor() {
    this.router.get(this.path_vehicleRentals, this.getVehicleList);
  }

  public getCollection = () => {
    return MongoHelper.client.db(env.DATABASE_NAME).collection(env.collection_vehicles);
  }

  public getVehicleList = (req: express.Request, res: express.Response) => {
    const location = req.params.location;
    const dateRange = req.params.dateRange;
    try {
      this.getCollection().find({}).toArray((err, data) => {
        if (err) throw err;

        res.status(200).json(data);
      })
    } catch (err) {
      res.status(400).json({ msg: "Get vehicle failed" });
      console.log(err);
    }
  }
}
