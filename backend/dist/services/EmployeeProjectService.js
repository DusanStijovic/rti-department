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
const EmployeeProjects_1 = __importDefault(require("../model/EmployeeProjects"));
class EmployeeProjectService {
    static getAllEmployeeProjects() {
        return EmployeeProjects_1.default.find({}).select({ "_id": 0, "__v": 0 }).exec();
    }
    static makeEmployeeProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!project.title || !project.readMore || !project.description)
                throw "Morate popuniti polja";
            yield EmployeeProjects_1.default.create({
                title: project.title,
                readMore: project.readMore,
                description: project.description,
                authors: project.authors
            });
        });
    }
}
exports.default = EmployeeProjectService;
//# sourceMappingURL=EmployeeProjectService.js.map