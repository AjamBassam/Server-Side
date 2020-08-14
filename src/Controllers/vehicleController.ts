import * as express from 'express';
import { MongoHelper } from '../mongoHelper';
import { ObjectId } from 'mongodb';
import { IVehicle } from '../models/vehicleModel';
import { env } from '../environment';

export class VehicleController {
  public path_vehicle = `${env.VEHICLE}/:${env.ID}`;
  public path_favorite = env.FAVORITES;
  public router = express.Router();

  constructor() {
    this.router.get(this.path_vehicle, this.getVehicle);
    this.router.post(this.path_favorite, this.updateFavorite);
  }

  public getCollection = (collection: string) => {
    return MongoHelper.client.db(env.DATABASE_NAME).collection(collection);
  }

  public updateFavorite = (req: express.Request, res: express.Response) => {
    try {
      const { _id: vehicleId } = req.body;
      const userId = req.session?.user._id;
      if (userId) {
        let objectUserId = { _id: new ObjectId(userId) };
        let newData = { favorites: vehicleId };

        this.getCollection(env.collection_users).updateOne(objectUserId, { $pull: newData },
          (error, result) => {
            if (error) throw new Error("while removing");
            if (result.modifiedCount == 1) {
              res.status(200).json({ msg: false });
              console.log(`unfavorite ${vehicleId}`);
            } else {
              this.getCollection(env.collection_users).updateOne(objectUserId, { $push: newData },
                (error) => {
                  if (error) throw new Error("while adding");
                  res.status(200).json({ msg: true });
                  console.log(`favorite ${vehicleId}`);
                }
              )
            }
          }
        )
      } else throw new Error("you have to connect first");

    } catch (err) {
      res.status(403).json({ msg: err.toString() });
      console.log(`Error: ${err}`);
    }
  }

  public getVehicle = async (req: express.Request, res: express.Response) => {
    try {
      await this.getCollection(env.collection_vehicles).findOne({ _id: new ObjectId(req.params.id) })
        .then((result: IVehicle) => {
          res.status(200).json(result);
        });
    } catch (err) {
      res.status(500).json({ msg: "Vehicle not found" });
      console.log(`Vehicle not found: ${err}`);
    }
  }
}