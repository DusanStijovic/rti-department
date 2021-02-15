"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAuthenticated = exports.getSecurityToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const expressJwt = require('express-jwt');
const RSA_PUBLIC_KEY = fs.readFileSync('src/demos/public.key');
const RSA_PRIVATE_KEY = fs.readFileSync('src/demos/private.key');
function getSecurityToken(user) {
    const token = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        subject: JSON.stringify(user)
    });
    return token;
}
exports.getSecurityToken = getSecurityToken;
const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['RS256']
});
exports.checkIfAuthenticated = checkIfAuthenticated;
//# sourceMappingURL=Authentication.js.map