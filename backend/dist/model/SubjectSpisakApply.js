"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SubjectSpisakApplyModel = new Schema({
    studentID: {
        type: String,
        required: true
    },
    spisakID: {
        type: String,
        required: true,
    },
    materialLink: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.default.model('SubjectSpisakApply', SubjectSpisakApplyModel, 'SubjectSpisakApply');
//# sourceMappingURL=SubjectSpisakApply.js.map