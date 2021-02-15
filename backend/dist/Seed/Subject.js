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
exports.seedAllSubjects = void 0;
const Subject_1 = __importDefault(require("../model/Subject"));
const subjects = [
    {
        type: "obavezni",
        semestar: 1,
        department: 'si',
        name: "Algoritmi",
        id: "13S111АSP",
        weekly: {
            lecture: 3,
            exercise: 2,
            lab: 0
        },
        espb: 5,
        classTime: ["Ponedeljak 8", "Sreda 10"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove programiranja.",
        haveLab: false,
        project: {
            isHidden: true,
            info: "Projekat Crazy Snake - zmijica kao na nokiji",
            projects: [
                {
                    info: "Prvi domaci",
                    examinationProcess: 'Provera da li su studenti sami radili',
                    materials: []
                },
                {
                    info: "Drugi domaci",
                    examinationProcess: 'Provera da li su studenti sami radili',
                    materials: []
                }
            ]
        },
        lab: {
            isHidden: false,
            count: 3,
            info: '',
            labs: []
        },
        examMaterials: {
            examExamples: [],
            examSolutions: [],
            isExamExamplesHidden: false
        },
        lectures: [],
        exercises: [],
        subjectApply: []
    },
    {
        type: "obavezni",
        semestar: 1,
        department: 'si',
        name: "Programiranje 1",
        id: "13S111P1",
        weekly: {
            lecture: 3,
            exercise: 2,
            lab: 0
        },
        espb: 5,
        classTime: ["Ponedeljak 8", "Sreda 10"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove programiranja.",
        haveLab: false,
        project: {
            isHidden: true,
            info: "Projekat Crazy Snake - zmijica kao na nokiji",
            projects: [
                {
                    _id: "601961311dfca5099d0af461",
                    info: "Prvi domaci",
                    examinationProcess: 'Provera da li su studenti sami radili',
                    materials: []
                }
            ]
        },
        lab: {
            isHidden: false,
            count: 3,
            info: "Lab se radi u paviljonu.",
            labs: [{
                    _id: "601961311dfca5099d0af462",
                    labName: 'Prva lab vezbe',
                    description: "Prva lab vezba zahteva poznavanje gradiva od 10-120 strane",
                    materials: []
                }, {
                    _id: "601961311dfca5099d0af463",
                    description: "Druga lab vezba zahteva poznavanje gradiva od 120-220 strane",
                    materials: []
                }, {
                    _id: "601961311dfca5099d0af464",
                    description: "Treca lab vezba zahteva poznavanje gradiva od 220-260 strane",
                    materials: []
                }],
        },
        examMaterials: {
            examExamples: [],
            examSolutions: [],
            isExamExamplesHidden: false
        },
        lectures: [],
        exercises: [],
        subjectApply: [{
                currentApply: 2,
                maxApply: 20,
                name: "Prijava za odbranu prvog domaceg",
                time: '2021-01-22 08:00',
                place: 'P26',
                deadline: "2021-02-17",
                uploadFileNedded: true
            },
            {
                currentApply: 2,
                maxApply: -1,
                time: '2021-01-22 08:00',
                place: 'P25',
                name: "Prijava za odbranu drugog domaceg",
                deadline: "2021-02-17",
                uploadFileNedded: false
            },
            {
                currentApply: 20,
                maxApply: 20,
                time: '2021-01-22 08:00',
                place: '70',
                name: "Prijava za odbranu treceg domaceg",
                deadline: "2021-02-17",
                uploadFileNedded: false
            },
            {
                currentApply: 2,
                maxApply: -1,
                time: '2021-01-22 08:00',
                place: '26b',
                name: "Prijava za odbranu cetvrtog domaceg",
                deadline: "2021-01-15",
                uploadFileNedded: true
            },
        ]
    },
    {
        type: "obavezni",
        semestar: 2,
        name: "Verovatnoca i statistik",
        id: "11S084VS",
        department: 'si',
        weekly: {
            lecture: 3,
            exercise: 2,
            lab: 0
        },
        espb: 5,
        classTime: ["Ponedeljak 18", "Sreda 14"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove matematike 2.",
        haveLab: false,
        examMaterials: {
            examExamples: [],
            examSolutions: [],
            isExamExamplesHidden: false
        },
        lectures: [],
        exercises: [],
        subjectApply: [],
        project: {
            isHidden: false,
            info: '',
            projects: []
        },
        lab: {
            isHidden: false,
            count: 3,
            info: "Lab se radi u paviljonu.",
            labs: []
        }
    },
    {
        type: "izborni",
        semestar: 4,
        name: "Programiranje internet aplikacija",
        id: "11S444PIA",
        department: 'si',
        weekly: {
            lecture: 2,
            exercise: 2,
            lab: 1
        },
        espb: 6,
        classTime: ["Ponedeljak 8", "Sreda 10"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove veb programiranja.",
        haveLab: true,
        lab: {
            isHidden: false,
            count: 3,
            info: "Lab se radi u paviljonu.",
            labs: [{
                    labName: 'Prva lab vezbe',
                    description: "Prva lab vezba zahteva poznavanje gradiva od 10-120 strane",
                    materials: []
                }, {
                    description: "Druga lab vezba zahteva poznavanje gradiva od 120-220 strane",
                    materials: [],
                }, {
                    description: "Treca lab vezba zahteva poznavanje gradiva od 220-260 strane",
                    materials: []
                }]
        },
        project: {
            isHidden: true,
            info: "Projekat Crazy Snake - zmijica kao na nokiji",
            projects: [
                {
                    info: "Prvi domaci",
                    examinationProcess: 'Provera da li su studenti sami radili',
                    materials: []
                }
            ]
        },
        examMaterials: {
            examExamples: [],
            examSolutions: [],
            isExamExamplesHidden: false
        },
        lectures: [],
        exercises: [],
        subjectApply: [],
    },
    {
        type: "obavezni",
        semestar: 4,
        id: "11R112SS",
        name: "Sistemski softver",
        department: 'rti',
        weekly: {
            lecture: 2,
            exercise: 2,
            lab: 1
        },
        espb: 6,
        classTime: ["Ponedeljak 8", "Sreda 10"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove",
        haveLab: false,
        project: {
            isHidden: true,
            info: "Projekat Crazy Snake - zmijica kao na nokiji",
            projects: [
                {
                    info: "Prvi domaci",
                    examinationProcess: 'Provera da li su studenti sami radili',
                    materials: []
                }
            ]
        },
        examMaterials: {
            examExamples: [],
            examSolutions: [],
            isExamExamplesHidden: false
        },
        lectures: [],
        exercises: [],
        subjectApply: [],
        lab: {
            isHidden: false,
            count: 3,
            info: "Lab se radi u paviljonu.",
            labs: []
        }
    },
    {
        type: "obavezni",
        semestar: 4,
        id: "13E112OS2",
        name: "OS2",
        department: 'oo',
        weekly: {
            lecture: 2,
            exercise: 2,
            lab: 1
        },
        espb: 6,
        classTime: ["Ponedeljak 8", "Sreda 10"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove ",
        haveLab: false,
        project: {
            isHidden: true,
            info: "Projekat Crazy Snake - zmijica kao na nokiji",
            projects: [
                {
                    info: "Prvi domaci",
                    examinationProcess: 'Provera da li su studenti sami radili',
                    materials: []
                }
            ]
        },
        examMaterials: {
            examExamples: [],
            examSolutions: [],
            isExamExamplesHidden: false
        },
        lectures: [],
        exercises: [],
        subjectApply: [],
        lab: {
            isHidden: false,
            count: 3,
            info: "Lab se radi u paviljonu.",
            labs: []
        }
    },
    {
        odsek: 'master',
        type: "obavezni",
        semestar: 2,
        name: "OLED",
        id: "11OLED111",
        department: 'master',
        weekly: {
            lecture: 2,
            exercise: 2,
            lab: 0
        },
        espb: 6,
        classTime: ["Ponedeljak 18", "Sreda 14"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove.",
        haveLab: false,
        examMaterials: {
            examExamples: [],
            examSolutions: [],
            isExamExamplesHidden: false
        },
        lectures: [],
        exercises: [],
        subjectApply: [],
        lab: {
            isHidden: false,
            count: 3,
            info: "Lab se radi u paviljonu.",
            labs: []
        },
        project: {
            isHidden: true,
            info: "Projekat Crazy Snake - zmijica kao na nokiji",
            projects: [
                {
                    info: "Prvi domaci",
                    examinationProcess: 'Provera da li su studenti sami radili',
                    materials: []
                }
            ]
        },
    },
    {
        odsek: 'master',
        type: "obavezni",
        semestar: 1,
        name: "LCD ",
        id: "11LCD111",
        department: 'master',
        weekly: {
            lecture: 2,
            exercise: 2,
            lab: 0
        },
        espb: 6,
        classTime: ["Ponedeljak 18", "Sreda 14"],
        propositions: "Propozicije su okacene na oglasnoj tabli u holu fakulteta.",
        subjectGoal: "Cilj je nauciti osnove.",
        haveLab: false,
        examMaterials: {
            examExamples: [],
            examSolutions: [],
            isExamExamplesHidden: false
        },
        lectures: [],
        exercises: [],
        subjectApply: [],
        lab: {
            isHidden: false,
            count: 3,
            info: "Lab se radi u paviljonu.",
            labs: []
        },
        project: {
            isHidden: true,
            info: "Projekat Crazy Snake - zmijica kao na nokiji",
            projects: [
                {
                    info: "Prvi domaci",
                    examinationProcess: 'Provera da li su studenti sami radili',
                    materials: []
                }
            ]
        },
    },
];
function seedAllSubjects() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let s of subjects) {
            let subject = new Subject_1.default(s);
            yield subject.save();
        }
    });
}
exports.seedAllSubjects = seedAllSubjects;
//# sourceMappingURL=Subject.js.map