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
const Employe_1 = require("../model/Employe");
const Subject_1 = __importDefault(require("../model/Subject"));
const StudentSubject_1 = __importDefault(require("..//model/StudentSubject"));
const Assignment_1 = require("../model/Assignment");
const SubjectSpisakApply_1 = __importDefault(require("../model/SubjectSpisakApply"));
const mongodb_1 = require("mongodb");
const SubjectNotifications_1 = __importDefault(require("../model/SubjectNotifications"));
const SubjectMapping_1 = __importDefault(require("../model/SubjectMapping"));
const fs_1 = __importDefault(require("fs"));
const fse = require('fs-extra');
var path = require('path');
class SubjectService {
    static getAllSubjectsBaseInfo(odsek) {
        return __awaiter(this, void 0, void 0, function* () {
            ////console.log(odsek);
            let allSemesters = new Array();
            for (let i = 0; i <= 8; i++) {
                let current = yield Subject_1.default.aggregate([{ $match: { department: odsek, semestar: i } },
                    { $sort: { semestar: 1 } },
                    { $project: { name: 1, id: 1 } }
                ]).exec();
                let help = [];
                for (let one of current) {
                    help.push({
                        _id: one._id,
                        name: one.name,
                        id: one.id,
                        link_id: one.id
                    });
                }
                current = help;
                ////console.log(allSemesters)
                let mappedSubject = yield SubjectMapping_1.default.find({ department: odsek }).exec();
                for (let oneMappedSubject of mappedSubject) {
                    let found = yield Subject_1.default.findOne({
                        id: oneMappedSubject.mapped_subject_id,
                        semestar: i
                    }).exec();
                    if (found) {
                        console.log(current);
                        current.push({
                            _id: found._id,
                            name: found.name,
                            id: oneMappedSubject.subject_id,
                            link_id: found.id
                        });
                        console.log(current);
                    }
                }
                allSemesters.push(current);
            }
            return allSemesters;
        });
    }
    static getSubjectGeneralInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let subjectInfo = yield Subject_1.default.findOne({ id: id }).select({
                type: 1, semestar: 1, name: 1, id: 1,
                weekly: 1, espb: 1, classTime: 1,
                propositions: 1, subjectGoal: 1, haveLab: 1
            }).select({ _id: 0 }).exec();
            let profesorsArray = [];
            let subjectProfesors = yield Assignment_1.Assignment.findOne({ subject: id }).select({ employees: 1 }).select({ _id: 0 }).exec();
            console.log("PROFES" + subjectProfesors);
            if (subjectProfesors != null) {
                console.log(subjectProfesors);
                console.log(id);
                subjectProfesors = subjectProfesors.employees;
                for (const profesor of subjectProfesors) {
                    let oneEmployee = yield Employe_1.Employee.findOne({ username: profesor }).select({ firstName: 1, lastName: 1 }).exec();
                    if (oneEmployee != null) {
                        console.log(oneEmployee);
                        let name = oneEmployee.firstName + " " + oneEmployee.lastName;
                        profesorsArray.push({ idEmployee: oneEmployee._id, employeeName: name });
                    }
                }
            }
            return { generalInfo: subjectInfo, employees: profesorsArray };
        });
    }
    static getGeneralInfoByObjectId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let subjectInfo = yield Subject_1.default.findById(id).select({
                type: 1, semestar: 1, name: 1, id: 1,
                weekly: 1, espb: 1, classTime: 1,
                propositions: 1, subjectGoal: 1, haveLab: 1,
                department: 1
            }).select({ _id: 0 }).exec();
            let profesorsArray = [];
            let subjectProfesors = yield Assignment_1.Assignment.findOne({ subject: id }).select({ employees: 1 }).select({ _id: 0 }).exec();
            console.log("PROFES" + subjectProfesors);
            if (subjectProfesors != null) {
                console.log(subjectProfesors);
                console.log(id);
                subjectProfesors = subjectProfesors.employees;
                for (const profesor of subjectProfesors) {
                    let oneEmployee = yield Employe_1.Employee.findOne({ username: profesor }).select({ firstName: 1, lastName: 1 }).exec();
                    if (oneEmployee != null) {
                        console.log(oneEmployee);
                        let name = oneEmployee.firstName + " " + oneEmployee.lastName;
                        profesorsArray.push({ idEmployee: oneEmployee._id, employeeName: name });
                    }
                }
            }
            return { generalInfo: subjectInfo, employees: profesorsArray };
        });
    }
    static getSubjectNotifications(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(id)
            let notifs = yield SubjectNotifications_1.default.find({ connectedSubject: id }).select({ connectedSubject: 0, _id: 0 }).exec();
            let notif = notifs.sort((a, b) => {
                return -new Date(a.dateCreation).getTime() + new Date(b.dateCreation).getTime();
            });
            return notif.filter((a) => {
                return new Date(a.dateCreation).getTime() <= new Date().getTime();
            });
        });
    }
    static getLectureSubjectMaterials(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Subject_1.default.findOne({ id: id }).select({ lectures: 1 }).select({ _id: 0 }).exec();
            //console.log(result);
            return result.lectures.sort((a, b) => {
                return a.number - b.number;
            });
        });
    }
    static getExerciseSubjectMaterials(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Subject_1.default.findOne({ id: id }).select({ exercises: 1 }).select({ _id: 0 }).exec();
            //console.log(result);
            return result.exercises.sort((a, b) => {
                return a.number - b.number;
            });
        });
    }
    static getSubjectExamTextMaterials(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Subject_1.default.findOne({ id: id }).select({ examMaterials: 1 }).select({ _id: 0 }).exec();
            //console.log(result);
            return result.examMaterials.examExamples.sort((a, b) => {
                return a.number - b.number;
            });
        });
    }
    static getSubjectExamSolutionsMaterials(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Subject_1.default.findOne({ id: id }).select({ examMaterials: 1 }).select({ _id: 0 }).exec();
            //console.log(result);
            return result.examMaterials.examSolutions.sort((a, b) => {
                return a.number - b.number;
            });
        });
    }
    static getExamSubjectMaterials(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Subject_1.default.findOne({ id: id }).select({ examMaterials: 1 }).select({ _id: 0 }).exec();
            //console.log({ examExamples: result.examMaterials.examExamples, examSolutions: result.examMaterials.examSolutions });
            return { examExamples: result.examMaterials.examExamples, examSolutions: result.examMaterials.examSolutions };
        });
    }
    static getSubjectLabMaterials(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Subject_1.default.findOne({ id: id }).select({ lab: 1 }).select({ _id: 0 }).exec();
            console.log("REZ" + result);
            for (let one of result.lab.labs) {
                one.materials = one.materials.sort((a, b) => {
                    return a.number - b.number;
                });
            }
            return result;
        });
    }
    static getSubjectApplication(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Subject_1.default.findOne({ id: id }).select({ subjectApply: 1 }).select({ _id: 0 }).exec();
            //console.log(result);
            return result;
        });
    }
    static getSubjectProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Subject_1.default.findOne({ id: id }).select({ project: 1 }).select({ _id: 1 }).exec();
            //console.log(result);
            for (let one of result.project.projects) {
                one.materials = one.materials.sort((a, b) => {
                    return a.number - b.number;
                });
            }
            return result;
        });
    }
    static getLabProjectExamFlag(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let showLabs = yield Subject_1.default.findOne({ id: id }).select({ lab: 1 }).exec();
            if (showLabs && "lab" in showLabs) {
                showLabs = !showLabs.lab.isHidden;
            }
            else {
                showLabs = false;
            }
            let showProject = yield Subject_1.default.findOne({ id: id }).select({ project: 1 }).exec();
            if (showProject && "project" in showProject) {
                showProject = !showProject.project.isHidden;
            }
            else {
                showProject = false;
            }
            let showExam = yield Subject_1.default.findOne({ id: id }).select({ examMaterials: 1 }).exec();
            if (showExam && "examMaterials" in showExam) {
                showExam = !showExam.examMaterials.isExamExamplesHidden;
            }
            else {
                showExam = false;
            }
            let haveLabs = yield Subject_1.default.findOne({ id: id }).select({ haveLab: 1 }).exec();
            showLabs = showLabs && haveLabs.haveLab;
            let result = {
                showLab: showLabs,
                showProject: showProject,
                showExamExamples: showExam
            };
            return result;
        });
    }
    static getStudentSubject(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(studentId);
            let res = yield StudentSubject_1.default.find({ userId: studentId }).select({ subjectId: 1 }).select({ _id: 0 }).exec();
            let subjects = [];
            res.forEach((element) => {
                subjects.push(element.subjectId);
            });
            //console.log("OVDE SAM predmeti" + subjects);
            return subjects;
        });
    }
    static applyStudentToSubject(username, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            yield StudentSubject_1.default.create({ subjectId: subject, userId: username });
        });
    }
    static applyStudentToSpisak(spisakID, studentID, fileLink) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SubjectSpisakApply_1.default.create({
                studentID: studentID,
                spisakID: spisakID,
                materialLink: fileLink
            });
            yield Subject_1.default.updateOne({ "subjectApply._id": new mongodb_1.ObjectID(spisakID) }, {
                $inc: { "subjectApply.$.currentApply": 1 }
            }).exec();
        });
    }
    static getStudentSpisakApplication(studentID) {
        return __awaiter(this, void 0, void 0, function* () {
            //  console.log(studentID);
            let cursor = yield SubjectSpisakApply_1.default.find().exec();
            //  console.log(cursor);
            let applications = [];
            for (const one of cursor) {
                applications.push(one.spisakID);
            }
            return applications;
        });
    }
    static createNotif(notif, choosen) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SubjectNotifications_1.default.create({
                title: notif.title,
                content: notif.content,
                dateCreation: notif.dateCreation,
                materials: notif.materials,
                connectedSubject: choosen
            });
            /* await Subject.updateOne({ id: subject }, {
                 $push: {
                     notifications: {
                         title: notif.title,
                         content: notif.content,
                         dateCreation: notif.dateCreation,
                         materials: notif.materials
                     }
                 }
             }).exec();*/
            return "Uspesno dodato obavestenje";
        });
    }
    static getNotificationsAllSubjectateNotif() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SubjectNotifications_1.default.find({}).exec();
        });
    }
    static deleteSubjectNotif(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  await Subject.updateOne({
                  "notifications._id": new ObjectID(id)
              }, {
                  $pull: {
                      "notifications": {
                          "_id": new ObjectID(id)
                      }
      
                  }
              }).exec();*/
            yield SubjectNotifications_1.default.findByIdAndDelete(id).exec();
            return "Uspesno obrisano obavestenje";
        });
    }
    static getSubjectNotif(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PREDMET OBAVESTENJE: " + id);
            return yield SubjectNotifications_1.default.findById(id).exec();
        });
    }
    static updateSubjectNotif(notif) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SubjectNotifications_1.default.findByIdAndUpdate(notif._id, {
                title: notif.title,
                content: notif.content,
                dateCreation: notif.dateCreation,
                materials: notif.materials,
                connectedSubject: notif.connectedSubject
            }).exec();
            return "Uspesno azurirano obavestenje";
        });
    }
    static getSubjectAssigmentPlan(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Assignment_1.Assignment.findOne({ subject: subject }).select({ __v: 0 }).exec();
        });
    }
    static updateAssigmentPlan(assignmentPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            let help = yield Assignment_1.Assignment.findOne({ subject: assignmentPlan.subject }).exec();
            if (help) {
                yield Assignment_1.Assignment.updateOne({ subject: assignmentPlan.subject }, assignmentPlan).exec();
            }
            else {
                yield Assignment_1.Assignment.create({
                    employees: assignmentPlan.employees,
                    subject: assignmentPlan.subject,
                    group: assignmentPlan.group
                });
            }
            return "Uspesno azurirano angazovanje na predmetu!";
        });
    }
    static deleteSubject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Assignment_1.Assignment.deleteOne({ subject: id }).exec();
            yield Subject_1.default.deleteOne({ id: id }).exec();
            yield SubjectNotifications_1.default.updateMany({
                connectedSubject: id
            }, {
                $pull: {
                    connectedSubject: id
                }
            }).exec();
            yield SubjectNotifications_1.default.deleteMany({
                connectedSubject: {
                    $size: 0
                }
            });
            //Da l obrisati i spiskove i obavestenja u vezi sa ovim predmetom
            return "Uspesno obrisan predmet!";
        });
    }
    static deleteSubjectMaterials(name, id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield Subject_1.default.findOne({ _id: new mongodb_1.ObjectID(id) }).exec();
            let substr = __dirname.substring(0, __dirname.length - 8);
            const path = `${substr}predmetiSacuvaniFajlovi/${subject.id}/${type}/${name}`;
            console.log(path);
            fs_1.default.unlinkSync(path);
            switch (type) {
                case 'Predavanja':
                    yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id) }, {
                        $pull: {
                            lectures: {
                                link: name
                            }
                        }
                    }).exec();
                    break;
                case 'Vezbe':
                    yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id) }, {
                        $pull: {
                            exercises: {
                                link: name
                            }
                        }
                    }).exec();
                    break;
                case 'Ispitna pitanja':
                    yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id) }, {
                        $pull: {
                            "examMaterials.examExamples": {
                                link: name
                            }
                        }
                    }).exec();
                    break;
                case 'Ispitna resenja':
                    yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id) }, {
                        $pull: {
                            "examMaterials.examSolutions": {
                                link: name
                            }
                        }
                    }).exec();
                    break;
            }
            return "Uspesno obrisan materijal";
        });
    }
    static updateSubjectGeneralInfo(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let notif = body.info;
            let id = body.id;
            let subject = yield Subject_1.default.findOne({ id: notif.id }).exec();
            if (subject != null) {
                throw "Izabrana sifra predmeta je zauzeta";
            }
            subject = yield Subject_1.default.findById(id).exec();
            if (subject.id != notif.id) {
                this.updateReferencesSubject(subject.id, notif.id);
            }
            yield Subject_1.default.findByIdAndUpdate(id, {
                type: notif.type,
                semestar: notif.semestar,
                name: notif.name,
                id: notif.id,
                weekly: {
                    lecture: notif.lecture,
                    exercise: notif.exercise,
                    lab: notif.lab
                },
                espb: notif.espb,
                classTime: notif.classTime,
                propositions: notif.propositions,
                subjectGoal: notif.subjectGoal,
                haveLab: notif.haveLab
            }).exec();
            return "Uspesno azurirane opste informacije o predmetu";
        });
    }
    static createSubjectLectureMaterials(matinfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.findByIdAndUpdate(id, {
                $push: {
                    lectures: matinfo
                }
            }).exec();
            return "Materijal uspesno dodat";
        });
    }
    static createSubjectExerciseMaterials(matinfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.findByIdAndUpdate(id, {
                $push: {
                    exercises: matinfo
                }
            }).exec();
            return "Materijal uspesno dodat";
        });
    }
    static createSubjectIspitniZadaciMaterials(matinfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.findByIdAndUpdate(id, {
                $push: {
                    "examMaterials.examExamples": matinfo
                }
            }).exec();
            return "Materijal uspesno dodat";
        });
    }
    static createSubjectIspitnaResenjaMaterials(matinfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            matinfo.date = Date.now();
            yield Subject_1.default.findByIdAndUpdate(id, {
                $push: {
                    "examMaterials.examSolutions": matinfo
                }
            }).exec();
            return "Materijal uspesno dodat";
        });
    }
    //TO DO 
    static updateReferencesSubject(old_subject_id, new_subject_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield StudentSubject_1.default.updateMany({ subjectId: old_subject_id }, {
                subjectId: new_subject_id
            }).exec();
            yield SubjectNotifications_1.default.updateMany({ connectedSubject: old_subject_id }, {
                "connectedSubject.$[predmet]": new_subject_id
            }, {
                multi: true,
                arrayFilters: [{ predmet: old_subject_id }]
            }).exec();
            yield Assignment_1.Assignment.updateOne({ subject: old_subject_id }, {
                subject: new_subject_id
            }).exec();
            let substr = __dirname.substring(0, __dirname.length - 8);
            const old_path = `${substr}predmetiSacuvaniFajlovi/${old_subject_id}`;
            const new_path = `${substr}predmetiSacuvaniFajlovi/${new_subject_id}`;
            if (fs_1.default.existsSync(old_path)) {
                console.log(old_path);
                //fs.renameSync(old_path, new_path)
                fse.ensureDirSync(new_path);
                fse.copySync(old_path, new_path);
                fse.removeSync(old_path);
            }
        });
    }
    static subjectMaterials(name, id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield Subject_1.default.findOne({ _id: new mongodb_1.ObjectID(id) }).exec();
            let substr = __dirname.substring(0, __dirname.length - 8);
            const path = `${substr}predmetiSacuvaniFajlovi/${subject.id}/${type}/${name}`;
            console.log(path);
            fs_1.default.unlinkSync(path);
            switch (type) {
                case 'Predavanja':
                    yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id) }, {
                        $pull: {
                            lectures: {
                                link: name
                            }
                        }
                    }).exec();
                    break;
                case 'Vezbe':
                    yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id) }, {
                        $pull: {
                            exercises: {
                                link: name
                            }
                        }
                    }).exec();
                    break;
                case 'Ispitna pitanja':
                    yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id) }, {
                        $pull: {
                            "examMaterials.examExamples": {
                                link: name
                            }
                        }
                    }).exec();
                    break;
                case 'Ispitna resenja':
                    yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id) }, {
                        $pull: {
                            "examMaterials.examSolutions": {
                                link: name
                            }
                        }
                    }).exec();
                    break;
            }
            return "Uspesno obrisan materijal";
        });
    }
    static azurirajProjekteMaterials(materials, subject_id, project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield Subject_1.default.findOne({ _id: new mongodb_1.ObjectID(subject_id) }).exec();
            let substr = __dirname.substring(0, __dirname.length - 8);
            const path = `${substr}predmetiSacuvaniFajlovi/${subject.id}/projekti`;
            let oneProject = subject.project.projects.find((one) => {
                return one._id == project_id;
            });
            for (let oneProjectMaterials of oneProject.materials) {
                let ok = materials.find((one) => {
                    return one.link == oneProjectMaterials.link;
                });
                if (!ok) {
                    let temp = `${path}/${oneProjectMaterials.link}`;
                    console.log(path);
                    fs_1.default.unlinkSync(temp);
                }
            }
            let a = yield Subject_1.default.updateOne({
                _id: new mongodb_1.ObjectID(subject_id),
                'project.projects._id': project_id
            }, {
                'project.projects.$.materials': materials
            }).exec();
            console.log("PRORO" + a);
            return "Uspesno azurirano";
        });
    }
    static azurirajLabMaterials(materials, subject_id, lab_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield Subject_1.default.findOne({ _id: new mongodb_1.ObjectID(subject_id) }).exec();
            let substr = __dirname.substring(0, __dirname.length - 8);
            const path = `${substr}predmetiSacuvaniFajlovi/${subject.id}/labovi`;
            let oneProject = subject.lab.labs.find((one) => {
                return one._id == lab_id;
            });
            for (let oneLabMaterials of oneProject.materials) {
                let ok = materials.find((one) => {
                    return one.link == oneLabMaterials.link;
                });
                if (!ok) {
                    let temp = `${path}/${oneLabMaterials.link}`;
                    console.log(path);
                    fs_1.default.unlinkSync(temp);
                }
            }
            let a = yield Subject_1.default.updateOne({
                _id: new mongodb_1.ObjectID(subject_id),
                'lab.labs._id': lab_id
            }, {
                'lab.labs.$.materials': materials
            }).exec();
            console.log("PRORO" + a);
            return "Uspesno azurirano";
        });
    }
    static azurirajRedosled(materials, id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const info of materials) {
                switch (type) {
                    case 'Predavanja':
                        yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id), "lectures.link": info.link }, {
                            "lectures.$.number": info.number
                        }).exec();
                        break;
                    case 'Vezbe':
                        yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id), "exercises.link": info.link }, {
                            "exercises.$.number": info.number
                        }).exec();
                        break;
                    case 'Ispitna pitanja':
                        yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id), "examMaterials.examExamples.link": info.link }, {
                            "examMaterials.examExamples.$.number": info.number
                        }).exec();
                        break;
                    case 'Ispitna resenja':
                        yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(id), "examMaterials.examSolutions.link": info.link }, {
                            "examMaterials.examSolutions.$.number": info.number
                        }).exec();
                        break;
                }
            }
            return "Uspesno azuriran redosled prikaza";
        });
    }
    static getAllSubjectAllApplications(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Subject_1.default.findById(id).select({ subjectApply: 1 }).select({ _id: 0 }).exec();
        });
    }
    static zatvoriSpisak(id, subject_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PRO" + id + " aa" + subject_id);
            let result = yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(subject_id), "subjectApply._id": new mongodb_1.ObjectID(id) }, {
                "subjectApply.$.open": false
            }).exec();
            console.log(result);
            return "Uspesno zatvoren spisak";
        });
    }
    static dodajSubjectProjekat(id, project) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.findByIdAndUpdate(id, {
                $push: {
                    'project.projects': project
                }
            }).exec();
        });
    }
    static azurirajInformacijeOProjektu(subject_id, project) {
        return __awaiter(this, void 0, void 0, function* () {
            let a = yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(subject_id), 'project.projects._id': project._id }, {
                'project.projects.$.info': project.info
            }).exec();
            console.log(a);
            return "Uspesno azurirane informacije o predmetu";
        });
    }
    static getShowProjects(subject_id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type == 'project') {
                let showProject = yield Subject_1.default.findById(subject_id).select({ project: 1 }).exec();
                console.log("VALUE" + showProject.project.isHidden);
                return !showProject.project.isHidden;
            }
            if (type == 'lab') {
                let showLab = yield Subject_1.default.findById(subject_id).select({ lab: 1 }).exec();
                console.log("VALUE" + showLab.lab.isHidden);
                return !showLab.lab.isHidden;
            }
            if (type == 'primeri ispita') {
                let showExamMaterials = yield Subject_1.default.findById(subject_id).select({ examMaterials: 1 }).exec();
                console.log("VALUE" + showExamMaterials.examMaterials.isExamExamplesHidden);
                return !showExamMaterials.examMaterials.isExamExamplesHidden;
            }
        });
    }
    static azurirajPrikaz(subject_id, new_value, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type == 'project') {
                yield Subject_1.default.findByIdAndUpdate(subject_id, { 'project.isHidden': !new_value }).exec();
                return "Uspesno azurirano";
            }
            if (type == 'lab') {
                console.log(new_value);
                let a = yield Subject_1.default.findByIdAndUpdate(subject_id, { 'lab.isHidden': !new_value }).exec();
                console.log(a);
                return "Uspesno azurirano";
            }
            if (type == 'primeri ispita') {
                console.log(new_value);
                let a = yield Subject_1.default.findByIdAndUpdate(subject_id, { 'examMaterials.isExamExamplesHidden': !new_value }).exec();
                console.log("NADJENO" + a);
                return "Uspesno azurirano";
            }
        });
    }
    static addSubjectLab(id, lab) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.findByIdAndUpdate(id, {
                $push: {
                    'lab.labs': lab
                }
            }).exec();
        });
    }
    static azurirajOpsteInformacijeOLabu(id, info) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.findByIdAndUpdate(id, {
                'lab.count': info.labNumber,
                'lab.info': info.labInfo
            }).exec();
            return "Uspesno azurirano";
        });
    }
    static obrisiLab(subject_id, lab_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.updateOne({
                _id: new mongodb_1.ObjectID(subject_id),
            }, {
                $pull: {
                    'lab.labs': {
                        _id: lab_id
                    }
                }
            }).exec();
        });
    }
    static obrisiProjekat(subject_id, project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.updateOne({
                _id: new mongodb_1.ObjectID(subject_id),
            }, {
                $pull: {
                    'project.projects': {
                        _id: project_id
                    }
                }
            }).exec();
        });
    }
    static azurirajLabInfo(subject_id, lab_id, info) {
        return __awaiter(this, void 0, void 0, function* () {
            let a = yield Subject_1.default.updateOne({
                _id: new mongodb_1.ObjectID(subject_id),
                'lab.labs._id': lab_id
            }, {
                'lab.labs.$.description': info.labInfo
            }).exec();
            return "Uspesno azurirano";
        });
    }
    static getAllSpisakApplication(subject_id, spisak_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let a = yield SubjectSpisakApply_1.default.find({ spisakID: new mongodb_1.ObjectID(spisak_id) }).exec();
            console.log("PRIJAVLJENI STUDENTI" + a);
            return a;
        });
    }
    static napraviSpisak(subject_id, subjectApply) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Subject_1.default.updateOne({ _id: new mongodb_1.ObjectID(subject_id) }, {
                $push: {
                    'subjectApply': subjectApply
                }
            }).exec();
            return "Spisak uspesno napravljen";
        });
    }
    static createSubject(subjectInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(JSON.stringify(subjectInfo));
            Subject_1.default.create({
                type: subjectInfo.type,
                semestar: subjectInfo.semestar,
                name: subjectInfo.name,
                id: subjectInfo.id,
                weekly: subjectInfo.weekly,
                espb: subjectInfo.espb,
                classTime: subjectInfo.classTime,
                proposotion: subjectInfo.proposition,
                subjectGoal: subjectInfo.subjetGoal,
                haveLab: subjectInfo.haveLab,
                department: subjectInfo.department,
                project: {
                    isHidden: false,
                    info: '',
                    projects: []
                },
                lab: {
                    idHidden: false,
                    count: 0,
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
            });
            return "Uspesno kreiran predmet";
        });
    }
    static mappSubject(subjectMappingInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield Subject_1.default.findOne({ id: subjectMappingInfo.mapped_subject_id }).exec();
            if (subject.department == subjectMappingInfo.department) {
                return "Predmet vec postoji na izabranom odseku";
            }
            SubjectMapping_1.default.create(subjectMappingInfo);
            return "Uspesno mapiran predmet";
        });
    }
}
exports.default = SubjectService;
// let subjects = await UserService.getEmployeeAsignedSubjcect(username);
// let result = [];
// for (const one of subjects) {
//     let application = await this.getSubjectApplication(one.subject);
//     result.push({ id: one.subject, spiskovi: application });
// }
// console.log("PROVERA" + subjects);
// return result;
// for (const subject of choosen) {
//     await Subject.updateOne({ id: subject }, {
//         $push: {
//             notifications: {
//                 title: notif.title,
//                 content: notif.content,
//                 dateCreation: notif.dateCreation,
//                 materials: notif.materials
//             }
//         }
//     }).exec();
// }
//# sourceMappingURL=SubjectService.js.map