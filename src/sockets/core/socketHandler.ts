import * as http from "http";
import * as socketIo from "socket.io";
import { CustomSocket } from "./customSocket";
import { SearchSocketHandler } from "../Handlers/searchSocketHandler";
import { AuthSocketHandler } from "../Handlers/authSocketHandler";
import { UserModel, User } from "../../models/userModel";
import { Console } from "console";
import { Events } from "./events";

export class SocketHandler {
  public authSocketHandler: AuthSocketHandler;
  public searchSocketHandler: SearchSocketHandler;

  public io: socketIo.Server;

  constructor(server: http.Server) {
    this.io = socketIo(server);

    this.searchSocketHandler = new SearchSocketHandler();

    this.connect();
  }

  public connect() {
    this.io.on("connection", (s: socketIo.Socket) => {
      console.log(`Socket ${s.id} connected`);
      this.handlers(s, new CustomSocket(s));
    })
  }

  public handlers(s: socketIo.Socket, cs: CustomSocket) {

    this.searchSocketHandler.handle(cs);
    this.disconnet(s);
  }

  public disconnet(s: socketIo.Socket){
    s.on("disconnect", ()=>{
      console.log(`socket user disconnected ${s.id}`);
    })
  }
}