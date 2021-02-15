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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEmployees = void 0;
const Employe_1 = require("../model/Employe");
const employees = [
    {
        username: "duca@etf.bg.ac.rs",
        firstName: "Dusan",
        lastName: "Stijovic",
        address: "Vojvode Petra Petrovica 15, Petrovgrad",
        phoneNumber: "065/44-30-121",
        page: "www.google.com",
        bio: "Ja sam vaga u horoskopu.",
        title: "redovni profesor",
        roomNumber: 16,
        status: "aktivan",
    }
];
function seedEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let e of employees) {
            let employee = new Employe_1.Employee(e);
            yield employee.save();
        }
    });
}
exports.seedEmployees = seedEmployees;
//# sourceMappingURL=Employee.js.map