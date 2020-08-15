"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
var express = require("express");
var mongoHelper_1 = require("../mongoHelper");
var environment_1 = require("../environment");
var RegistrationController = /** @class */ (function () {
    function RegistrationController() {
        var _this = this;
        this.path_register = '/register';
        this.router = express.Router();
        this.getCollection = function () {
            return mongoHelper_1.MongoHelper.client.db(environment_1.env.DATABASE_NAME).collection(environment_1.env.collection_users);
        };
        this.registerMiddleware = function (req, res, next) {
            var _a;
            if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.user)) {
                next();
            }
            else {
                res.status(401).json({ msg: "You can't sign up. Logout first!" });
                console.log("You can't sign up. Logout first!");
            }
        };
        this.register = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email_1, password_1, firstName_1, lastName_1, err_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, email_1 = _a.email, password_1 = _a.password, firstName_1 = _a.firstName, lastName_1 = _a.lastName;
                        if (!(email_1 && password_1 && firstName_1 && lastName_1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCollection().findOne({ "email": email_1 })
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var user;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!!result) return [3 /*break*/, 2];
                                            user = {
                                                email: email_1,
                                                password: password_1,
                                                firstName: firstName_1,
                                                lastName: lastName_1
                                            };
                                            return [4 /*yield*/, this.getCollection().insertOne(user)];
                                        case 1:
                                            _a.sent();
                                            res.status(200).json(user);
                                            console.log("Account created");
                                            return [3 /*break*/, 3];
                                        case 2: throw new Error("Email is already exist");
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error("Missing some field");
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        res.status(403).json({ msg: err_1.toString() });
                        console.log("Error: " + err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.router.post(this.path_register, this.registerMiddleware, this.register);
    }
    return RegistrationController;
}());
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.js.map