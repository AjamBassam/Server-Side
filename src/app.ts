import * as express from "express";
import * as session from "express-session";
import * as bodyParser from 'body-parser';
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as http from "http";
import { MongoHelper } from "./mongoHelper";
import *as mongoose from "mongoose";
import { SocketHandler } from "./sockets/core/socketHandler";
import { env } from "./environment";
import path = require("path");

export class App {

  public port: number;
  public app: express.Application;
  public server: http.Server;

  public constructor(controllers: any[], port: number) {
    this.port = port
    this.app = express();
    this.server = new http.Server(this.app);

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    // const socketHandler = new SocketHandler(this.server);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.app.use(cors({
      origin: [env.CLIENT_URL, env.IP_URL],
      credentials: true
    }))

    this.app.use(express.static(path.join(__dirname, "../src/public")));
    this.app.use(session({
      name: env.SESSION_NAME,
      resave: false,
      secret: env.SESSION_SECRET,
      saveUninitialized: false,
      cookie: {
        maxAge: env.MAX_AGE,
        sameSite: true,
        secure: false // true in production environnement - false in dev env
      }
    }))
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }

  public start() {
    this.server.listen(this.port);

    this.server.on("listening", async () => {
      console.log(`Server started on port ${this.port}`);
      try {
        await MongoHelper.connect(env.MONGO_URI);
        console.info("connected to mongo.");

      } catch (err) {
        console.error(err);
      }
    });
  }
}
