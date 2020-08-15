"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHandler = void 0;
var socketIo = require("socket.io");
var customSocket_1 = require("./customSocket");
var searchSocketHandler_1 = require("../Handlers/searchSocketHandler");
var SocketHandler = /** @class */ (function () {
    function SocketHandler(server) {
        this.io = socketIo(server);
        this.searchSocketHandler = new searchSocketHandler_1.SearchSocketHandler();
        this.connect();
    }
    SocketHandler.prototype.connect = function () {
        var _this = this;
        this.io.on("connection", function (s) {
            console.log("Socket " + s.id + " connected");
            _this.handlers(s, new customSocket_1.CustomSocket(s));
        });
    };
    SocketHandler.prototype.handlers = function (s, cs) {
        this.searchSocketHandler.handle(cs);
        this.disconnet(s);
    };
    SocketHandler.prototype.disconnet = function (s) {
        s.on("disconnect", function () {
            console.log("socket user disconnected " + s.id);
        });
    };
    return SocketHandler;
}());
exports.SocketHandler = SocketHandler;
//# sourceMappingURL=socketHandler.js.map