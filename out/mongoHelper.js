"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoHelper = void 0;
var mongodb = require("mongodb");
var MongoHelper = /** @class */ (function () {
    function MongoHelper() {
    }
    MongoHelper.connect = function (url) {
        return new Promise(function (resolve, reject) {
            mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
                if (err) {
                    reject(err);
                }
                else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    };
    return MongoHelper;
}());
exports.MongoHelper = MongoHelper;
//# sourceMappingURL=mongoHelper.js.map