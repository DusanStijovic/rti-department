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
const OfferedProject_1 = __importDefault(require("../model/OfferedProject"));
const offeredProjects = [
    {
        title: 'Simulator iz ORT2',
        type: 'Predlog za izradu diplomskog rada',
        description: 'Simulator za potrebe izrade laboratorijskij mrezi iz orta2',
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Informacioni sistem za banka',
        type: 'Predlog za izradu projekta',
        description: 'Informacioni sistem za inostranu banku',
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Aplikacija za pracanje zdravlja na androidu',
        type: 'Predlog za izradu projekta',
        description: '/',
        readMore: 'https://www.etf.bg.ac.rs/#gsc.tab=0'
    },
    {
        title: 'Prevodila za programski jezik MikroJava',
        type: 'Predlog za izradu diplomskog rada',
        description: 'Nadogradnja domaceg zadatka iz programskih prevodioca 1',
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Internet aplikacija za potrebe rada fakulteta',
        type: 'Predlog za izradu master rada',
        description: 'Internet aplikacia koja ce se koristi za potrebe rada fakulteta',
        readMore: 'https://www.etf.bg.ac.rs/#gsc.tab=0'
    },
];
function seedOfferedProject() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const one of offeredProjects) {
            let newOfferedProject = new OfferedProject_1.default(one);
            yield newOfferedProject.save();
        }
    });
}
exports.default = seedOfferedProject;
//# sourceMappingURL=OfferedProject.js.map