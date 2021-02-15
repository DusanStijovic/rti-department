"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SubjectMappingModel = new Schema({
    subject_id: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    mapped_subject_id: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model("SubjectMapping", SubjectMappingModel, "SubjectMapping");
//# sourceMappingURL=SubjectMapping.js.map