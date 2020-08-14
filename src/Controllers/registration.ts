import * as express from 'express';
import { MongoHelper } from '../mongoHelper';
import { env } from '../environment';

export class RegistrationController {
  public path_register = '/register';
  public router = express.Router();

  constructor() {
    this.router.post(this.path_register, this.registerMiddleware, this.register);
  }

  public getCollection = () => {
    return MongoHelper.client.db(env.DATABASE_NAME).collection(env.collection_users);
  }

  public registerMiddleware = (req: express.Request, res: express.Response, next: any) => {
    if (!req.session?.user) {
      next();
    }
    else {
      res.status(401).json({ msg: "You can't sign up. Logout first!" });
      console.log("You can't sign up. Logout first!")
    }
  }

  public register = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      if (email && password && firstName && lastName) {

        await this.getCollection().findOne({ "email": email })
          .then(async result => {
            if (!result) {
              const user = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
              }
              await this.getCollection().insertOne(user);
              res.status(200).json(user)
              console.log("Account created");

            } else throw new Error("Email is already exist")
          })

      } else throw new Error("Missing some field")

    } catch (err) {
      res.status(403).json({ msg: err.toString() });
      console.log(`Error: ${err}`);
    }
  }
}