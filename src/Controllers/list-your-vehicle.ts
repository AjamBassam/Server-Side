import { ILocation } from './../models/vehicleModel';
import * as express from 'express';
import { MongoHelper } from '../mongoHelper';
import { IVehicle } from "../models/vehicleModel";
import { env } from '../environment';

export class ListYourVehicleController {
  public path_listYourVehicle = env.LIST_YOUR_VEHICLE;
  public router = express.Router();

  constructor() {
    this.router.post(this.path_listYourVehicle, this.listYourVehicle_Middleware, this.listYourVehicle);
  }

  public getCollection = (collectionName: string) => {
    return MongoHelper.client.db(env.DATABASE_NAME).collection(collectionName);
  }

  public listYourVehicle_Middleware = (req: express.Request, res: express.Response, next: any) => {
    if (req.session?.user) {
      next();
    } else {
      res.status(401).json({ msg: "Failed. Login first!" });
      console.log("Failed. Login first!")
    }
  }

  public listYourVehicle = async (req: express.Request, res: express.Response) => {
    try {
      const { ownerId, date, location, price } = req.body;
      console.log(req.body)
      if (ownerId && date && location && price) {
        const vehicle: IVehicle = {
          location: location,
          date: date,
          price: price,
          ownerId: ownerId
        }
        await this.getCollection(env.collection_vehicles).insertOne(vehicle)
          .then(() => {
            res.status(200).json({ msg: "Vehicle added" });
            console.log("Vehicle added");
          }).catch(() => {
            throw new Error("error while adding a new vehicle")
          })

      } else throw new Error("Missing some field")

    } catch (err) {
      res.status(403).json({ msg: err.toString() });
      console.log(`Error: ${err}`);
    }
  }
}