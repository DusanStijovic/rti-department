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
exports.seedAllAssignments = void 0;
const Assignment_1 = require("../model/Assignment");
const assignments = [
    {
        subject: "13S111P1",
        group: [
            {
                name: "Predavanje1",
                employees: ["duca@etf.bg.ac.rs"]
            },
            {
                name: "Predavanje2",
                employees: ["duca@etf.bg.ac.rs"]
            },
            {
                name: "Vezbe1",
                employees: ["duca@etf.bg.ac.rs"]
            }
        ],
        employees: ["duca@etf.bg.ac.rs"],
    },
    {
        subject: "13E112OS2",
        group: [
            {
                name: "Predavanje1",
                employees: ["duca@etf.bg.ac.rs"]
            },
            {
                name: "Vezbe1",
                employees: ["duca@etf.bg.ac.rs"]
            }
        ],
        employees: ["duca@etf.bg.ac.rs"],
    },
    {
        subject: "13S111АSP",
        group: [
            {
                name: "Predavanje1",
                employees: ["duca@etf.bg.ac.rs"]
            },
            {
                name: "Predavanje2",
                employees: ["duca@etf.bg.ac.rs"]
            }
        ],
        employees: ["duca@etf.bg.ac.rs"],
    },
];
function seedAssignments() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let a of assignments) {
            let assignment = new Assignment_1.Assignment(a);
            try {
                yield assignment.save();
            }
            catch (error) {
            }
        }
    });
}
function seedAllAssignments() {
    seedAssignments();
}
exports.seedAllAssignments = seedAllAssignments;
//# sourceMappingURL=Assignment.js.map