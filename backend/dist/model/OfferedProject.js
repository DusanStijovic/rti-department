"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const OfferedProjectModel = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    readMore: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model("OfferedProject", OfferedProjectModel, "Offered");
//# sourceMappingURL=OfferedProject.js.map