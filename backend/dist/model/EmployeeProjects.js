"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const EmployeeProjectModel = new Schema({
    title: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    authors: {
        type: Array,
        required: true
    },
    readMore: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model("EmployeeProject", EmployeeProjectModel, "EmployeeProject");
//# sourceMappingURL=EmployeeProjects.js.map