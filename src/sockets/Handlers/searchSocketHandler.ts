import { CustomSocket } from "../core/customSocket";
import { Events } from "../core/events";
import { MongoHelper } from "../../mongoHelper";

export class SearchSocketHandler {

  public constructor() { }

  public getCollection = (collectionName: string) => {
    return MongoHelper.client.db("MyLifeProject").collection(collectionName);
  }

  public handle(s: CustomSocket) {
    s.on(Events.MOTORCYCLE_LIST, (data: string) => {
      console.log(data);
      const collection = this.getCollection("motorcycles");
      collection.find({}).toArray((err, data) => {
        if (err) {
          throw err;
        }
        console.log(data);
        s.emit(Events.MOTORCYCLE_LIST, data);
      })
    })
  }

}