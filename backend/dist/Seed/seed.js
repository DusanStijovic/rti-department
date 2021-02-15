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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Assignment_1 = require("./Assignment");
const EmployeeProject_1 = __importDefault(require("./EmployeeProject"));
const Notifications_1 = require("./Notifications");
const OfferedProject_1 = __importDefault(require("./OfferedProject"));
const StudentSubject_1 = require("./StudentSubject");
const Subject_1 = require("./Subject");
const User_1 = require("./User");
const Students_1 = require("./Students");
const Employee_1 = require("./Employee");
const SubjectNotifSeed_1 = require("./SubjectNotifSeed");
function seed(connection) {
    const clearDB = () => __awaiter(this, void 0, void 0, function* () {
        for (const key of Object.keys(connection.collections)) {
            yield connection.collections[key].deleteMany({});
        }
        User_1.seedUsers();
        Employee_1.seedEmployees();
        Students_1.seedStudents();
        Assignment_1.seedAllAssignments();
        Notifications_1.seedAllNotification();
        EmployeeProject_1.default();
        OfferedProject_1.default();
        Subject_1.seedAllSubjects();
        StudentSubject_1.seedStudentSubject();
        SubjectNotifSeed_1.seedSubjectNotif();
    });
    clearDB();
}
exports.default = seed;
//# sourceMappingURL=seed.js.map