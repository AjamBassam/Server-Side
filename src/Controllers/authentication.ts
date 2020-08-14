import { ObjectId } from 'mongodb';
import { IUser } from '../models/userModel';
import * as express from 'express';
import { MongoHelper } from '../mongoHelper';
import { env } from '../environment';

export class AuthController {
  public path_ = '/user';
  public path_login = '/login';
  public path_logout = '/logout';
  public router = express.Router();

  constructor() {
    this.router.post(this.path_, this.sendCurrentUser);
    this.router.post(this.path_login, this.loginMiddleware, this.login);
    this.router.post(this.path_logout, this.logoutMiddleware, this.logout);
  }

  public getCollection = () => {
    return MongoHelper.client.db(env.DATABASE_NAME).collection(env.collection_users);
  }

  public sendCurrentUser = async (req: express.Request, res: express.Response) => {
    // console.log(req.session)
    if (req.session?.user) {
      await this.getCollection().findOne({ _id: new ObjectId(req.session.user._id) })
      .then((result: IUser)=>{
        req.session!.user = result;
        res.status(200).json(result);
      })
    } else {
      res.status(200).json({ msg: "No user connected yet" });
      console.log("No user connected yet")
    }
  }

  public logoutMiddleware = (req: express.Request, res: express.Response, next: any) => {
    if (req.session?.user) {
      next();
    }
    else {
      res.status(401).json({ msg: "You can't logout, you need to login first!" });
      console.log("You cant logout, you need to login first!")
    }
  }

  public loginMiddleware = (req: express.Request, res: express.Response, next: any) => {
    if (!req.session?.user) {
      next();
    }
    else {
      res.status(401).json({ msg: "You are already logged in!" });
      console.log("You are already logged in!")
    }
  }

  public login = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        await this.getCollection().findOne({ "email": email, "password": password })
          .then((result: IUser) => {
            if (result) {
              req.session!.user = result;
              res.status(200).json(result);
              console.log("login succes");
            } else throw new Error("Login failed - user not found");
          })
      } else throw new Error("missing some fields (login)");

    } catch (err) {
      res.status(401).json({ msg: err.toString() });
      console.log(`Error: ${err}`);
    }
  }

  public logout = (req: express.Request, res: express.Response) => {
    req.session?.destroy(err => {
      if (err) {
        console.log("Error while logging out.")
      }
      res.clearCookie(env.SESSION_NAME) // sessionName
      res.status(200).json({ msg: "Log out successfully" })
      console.log("log out successfully");
    })
  }
}
