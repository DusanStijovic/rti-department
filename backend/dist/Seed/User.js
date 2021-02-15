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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const User_1 = require("../model/User");
const users = [
    {
        username: "admin@admin",
        password: "KQyBCqM0at7erRkOZAQqPA==",
        type: "admin"
    },
    {
        username: "duca@etf.bg.ac.rs",
        password: "M6dBYzajlDXvJeJnnw2J1g==",
        type: "zaposlen"
    },
    {
        username: "sd170145d@student.etf.rs",
        password: "6a+eaRS7TGAd3xDIJUX2lg==",
        type: "student"
    }
];
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let u of users) {
            let user = new User_1.User(u);
            yield user.save();
        }
    });
}
exports.seedUsers = seedUsers;
//# sourceMappingURL=User.js.map