import * as mongodb from "mongodb";

export class MongoHelper {
  public static client: mongodb.MongoClient;

  public static connect(url: string) {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, (err: mongodb.MongoError, client: mongodb.MongoClient) => {
        if (err) {
          reject(err);
        } else {
          MongoHelper.client = client;
          resolve(client);
        }
      })
    })
  }
}