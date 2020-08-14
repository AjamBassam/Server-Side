import { CustomSocket } from "../core/customSocket";
import { Events } from "../core/events";
import { User, IMember } from "../../models/userModel";
import { MongoHelper } from "../../mongoHelper";
import { IUser } from "../../Interfaces/Iuser";

export class AuthSocketHandler {

  constructor() { };

  public handle(s: CustomSocket) {
    s.on(Events.LOGIN, (data: IMember) => {
      let currentMember: IMember = {
        email: data.email,
        password: data.password,
      }

      this.getAccess(s, currentMember);
    })
  }

  public getCollection = (collectionName: string) => {
    return MongoHelper.client.db("MyLifeProject").collection(collectionName);
  }

  public async getAccess(s: CustomSocket, currentMember: IMember) {
    try {
      let collection = this.getCollection("users");
      let user = await collection.findOne({ member: currentMember });

      if (user != null) {
        console.log("Login success");
        this.setUser(user);
        s.emit(Events.LOGIN, User);

      }
      else throw new Error("");

    } catch (e) {
      console.log("Login failed");
      s.emit(Events.LOGIN, { msg: "Login failed" });
    }
  }

  public setUser(user: IUser) {
    User.member = { email: user.member.email, password: user.member.password };
    User.firstName = user.firstName;
    User.lastName = user.lastName;
    User.connected = true;
    User.profilePic = user.profilePic;
    User.mobile = user.mobile;
    console.log(User)
  }

}