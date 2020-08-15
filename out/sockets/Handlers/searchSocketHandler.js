"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSocketHandler = void 0;
var events_1 = require("../core/events");
var mongoHelper_1 = require("../../mongoHelper");
var SearchSocketHandler = /** @class */ (function () {
    function SearchSocketHandler() {
        this.getCollection = function (collectionName) {
            return mongoHelper_1.MongoHelper.client.db("MyLifeProject").collection(collectionName);
        };
    }
    SearchSocketHandler.prototype.handle = function (s) {
        var _this = this;
        s.on(events_1.Events.MOTORCYCLE_LIST, function (data) {
            console.log(data);
            var collection = _this.getCollection("motorcycles");
            collection.find({}).toArray(function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
                s.emit(events_1.Events.MOTORCYCLE_LIST, data);
            });
        });
    };
    return SearchSocketHandler;
}());
exports.SearchSocketHandler = SearchSocketHandler;
//# sourceMappingURL=searchSocketHandler.js.map