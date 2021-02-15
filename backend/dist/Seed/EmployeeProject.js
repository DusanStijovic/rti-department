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
const EmployeeProjects = [
    {
        title: 'Big Data Pipeline - Podaci kao osnova za razvoj AI aplikacija',
        description: '/',
        authors: ['', '', ''],
        readMore: 'https://www.etf.bg.ac.rs/#gsc.tab=0'
    },
    {
        title: 'Razvoj network and service reporting system softverske platforme',
        description: '/',
        authors: ['', '', ''],
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Novel oil pipeline leakage detection system-NOPiLDeS',
        description: 'Novel oil pipeline leakage detection system-NOPiLDeS-Program saradnje nauke i privrede -Fond za inovacionu delatnost',
        authors: ['', '', ''],
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Razvoj network and service reporting system softverske platforme',
        description: '',
        authors: ['', '', ''],
        readMore: 'https://www.etf.bg.ac.rs/#gsc.tab=0'
    }
];
function seedEmployeeProject() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const one of EmployeeProjects) {
            let newEmployeeProject = new EmployeeProjects_1.default(one);
            yield newEmployeeProject.save();
        }
    });
}
exports.default = seedEmployeeProject;
//# sourceMappingURL=EmployeeProject.js.map