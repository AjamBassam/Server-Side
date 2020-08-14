import * as express from 'express';
import { MongoHelper } from '../mongoHelper';
import { ObjectId } from 'mongodb';
import { env } from '../environment';

export class AccountController {
  public path_delete = "/account/delete";
  public path_update = "/account/update";
  public router = express.Router();

  constructor() {
    this.router.post(this.path_delete, this.deleteAccount);
    this.router.get(this.path_update, this.updateAccount);
  }

  public getCollection = (collection: string) => {
    return MongoHelper.client.db(env.DATABASE_NAME).collection(collection);
  }

  public updateAccount = (req: express.Request, res: express.Response) => {

  }

  public deleteAccount = async (req: express.Request, res: express.Response) => {
    const { ownerId } = req.body;
    try {
      await this.getCollection(env.collection_vehicles).deleteMany({ ownerId: ownerId });
      await this.getCollection(env.collection_users).deleteOne({ _id: new ObjectId(ownerId) });

      req.session?.destroy(err => {
        if (err) {
          console.log("Error while logging out.")
        }
        res.clearCookie("sid") // sessionName
        res.status(200).json({ msg: "Log out successfully" })
        console.log("log out successfully");
      })

    } catch (err) {
      res.status(401).json({ msg: err.toString() });
      console.log(`Error: ${err}`);
    }
  }
}