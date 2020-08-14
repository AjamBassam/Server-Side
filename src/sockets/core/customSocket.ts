import * as socketIo from "socket.io";

export class CustomSocket {

  public s: socketIo.Socket;

  constructor(s: socketIo.Socket) {
    this.s = s;
  }

  public on(eventName: any, data: any){
    this.s.on(eventName, data);
  }

  public emit(eventName: string, data:any){
    this.s.emit(eventName, data);
  }

}




















// this.io.on("connection", (socket: socketIo.Socket) => {
//   this.socket = socket;
//   console.log("a user connected : " + socket.id);

//   // socket.emit("message", "hellofromserver " + socket.id);

//   // socket.on("searchMotorcycles", (data) => {
//   //   console.log("test event");
//   //   console.log(data);
//   // })

//   socket.on("disconnect", () => {
//     console.log("socket disconnected : " + socket.id);
//   })
// })