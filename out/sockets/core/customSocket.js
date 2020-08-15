"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSocket = void 0;
var CustomSocket = /** @class */ (function () {
    function CustomSocket(s) {
        this.s = s;
    }
    CustomSocket.prototype.on = function (eventName, data) {
        this.s.on(eventName, data);
    };
    CustomSocket.prototype.emit = function (eventName, data) {
        this.s.emit(eventName, data);
    };
    return CustomSocket;
}());
exports.CustomSocket = CustomSocket;
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
//# sourceMappingURL=customSocket.js.map