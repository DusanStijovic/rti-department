"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const EmployeeModel = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    page: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: Number,
        required: false,
        default: ''
    },
    status: {
        type: String,
        required: true,
    },
    pictureUrl: {
        type: String,
        required: false
    }
});
const Employee = mongoose_1.default.model("Employee", EmployeeModel, "Employee");
exports.Employee = Employee;
//# sourceMappingURL=Employe.js.map