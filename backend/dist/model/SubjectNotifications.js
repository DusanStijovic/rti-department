"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SubjectNotifModel = new Schema({
    connectedSubject: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: false
    },
    dateCreation: {
        type: Date,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    materials: {
        type: [String],
        required: false
    }
});
exports.default = mongoose_1.default.model('SubjectNotif', SubjectNotifModel, 'SubjectNotif');
//# sourceMappingURL=SubjectNotifications.js.map