"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authentification = require("../services/Authentication");
const UserService_1 = __importDefault(require("../services/UserService"));
mongoose_1.default.connect('mongodb://localhost:27017/RTI_Katedra');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo connected');
});
function checkUserNamePattern(userName) {
    let regExpStudent = /^[a-z]{2}[0-9]{6}[dmp]@student\.etf\.rs$/;
    let check = regExpStudent.test(userName);
    let regExprEmployee = /^[a-z][a-z_]*@etf\.bg\.ac\.rs$/;
    let check2 = regExprEmployee.test(userName);
    let regAdmin = /^admin@admin$/;
    let check3 = regAdmin.test(userName);
    console.log("provera" + userName);
    return check || check2 || check3;
}
function login(request, response) {
    const username = request.body.username, password = request.body.password;
    console.log("SSS" + password);
    if (!checkUserNamePattern(username)) {
        response.status(510).json({
            errorMessage: 'Korisnicko ime nije u dobrom formatu'
        });
    }
    else {
        UserService_1.default.getUser(username, password).then((user) => {
            console.log("UALZM OVDE");
            console.log(user);
            if (user) {
                const token = authentification.getSecurityToken(user);
                response.status(200).json({
                    idToken: token,
                    user: user
                });
            }
            else {
                response.status(510).json({
                    errorMessage: 'Korisnicko ime ili lozinka nisu ispravni'
                });
            }
        });
    }
}
exports.login = login;
//# sourceMappingURL=LoginController.js.map