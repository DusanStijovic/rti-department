"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const StudentSubjectModel = new Schema({
    userId: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        require: true
    }
});
const StudentSubject = mongoose_1.default.model("StudentSubject", StudentSubjectModel, "StudentSubject");
exports.default = StudentSubject;
//# sourceMappingURL=StudentSubject.js.map