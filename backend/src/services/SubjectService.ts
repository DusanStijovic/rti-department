import { Employee } from "../model/Employe";
import { Student } from "../model/Student";
import Subject from "../model/Subject";
import StudentSubject from "..//model/StudentSubject";
import { Assignment } from "../model/Assignment";
import SubjectSpisakApply from "../model/SubjectSpisakApply";
import { ObjectID } from 'mongodb';
import SubjectNotifications from "../model/SubjectNotifications";
import UserService from "./UserService";
import SubjectMapping from "../model/SubjectMapping";
import fs from 'fs';
const fse = require('fs-extra')
var path = require('path');



export default class SubjectService {

    static async getAllSubjectsBaseInfo(odsek: string) {
        ////console.log(odsek);
        let allSemesters = new Array<any>();
        for (let i = 0; i <= 8; i++) {
            let current = await Subject.aggregate(
                [{ $match: { department: odsek, semestar: i } },
                { $sort: { semestar: 1 } },
                { $project: { name: 1, id: 1 } }
                ]
            ).exec();
            let help = [];
            for (let one of current) {
                help.push({
                    _id: one._id,
                    name: one.name,
                    id: one.id,
                    link_id: one.id
                })
            }
            current = help
            ////console.log(allSemesters)
            let mappedSubject = await SubjectMapping.find({ department: odsek }).exec();
            for (let oneMappedSubject of mappedSubject) {
                let found = await Subject.findOne({
                    id: oneMappedSubject.mapped_subject_id,
                    semestar: i
                }).exec();
                if (found) {
                    console.log(current)
                    current.push({
                        _id: found._id,
                        name: found.name,
                        id: oneMappedSubject.subject_id,
                        link_id: found.id
                    })
                    console.log(current)
                }
            }
            allSemesters.push(current);
        }



        return allSemesters;
    }

    static async getSubjectGeneralInfo(id: string) {
        let subjectInfo = await Subject.findOne({ id: id }).select(
            {
                type: 1, semestar: 1, name: 1, id: 1,
                weekly: 1, espb: 1, classTime: 1,
                propositions: 1, subjectGoal: 1, haveLab: 1
            }
        ).select({ _id: 0 }).exec();
        let profesorsArray: Array<{ idEmployee: string, employeeName: string }> = [];
        let subjectProfesors = await Assignment.findOne({ subject: id }).select({ employees: 1 }).select({ _id: 0 }).exec();
        console.log("PROFES" + subjectProfesors);
        if (subjectProfesors != null) {
            console.log(subjectProfesors);
            console.log(id);
            subjectProfesors = subjectProfesors.employees;
            for (const profesor of subjectProfesors) {
                let oneEmployee = await Employee.findOne({ username: profesor }).select({ firstName: 1, lastName: 1 }).exec();
                if (oneEmployee != null) {
                    console.log(oneEmployee);
                    let name = oneEmployee.firstName + " " + oneEmployee.lastName;
                    profesorsArray.push({ idEmployee: oneEmployee._id, employeeName: name });
                }
            }
        }

        return { generalInfo: subjectInfo, employees: profesorsArray };
    }

    static async getGeneralInfoByObjectId(id: string) {
        let subjectInfo = await Subject.findById(id).select(
            {
                type: 1, semestar: 1, name: 1, id: 1,
                weekly: 1, espb: 1, classTime: 1,
                propositions: 1, subjectGoal: 1, haveLab: 1,
                department: 1
            }
        ).select({ _id: 0 }).exec();
        let profesorsArray: Array<{ idEmployee: string, employeeName: string }> = [];
        let subjectProfesors = await Assignment.findOne({ subject: id }).select({ employees: 1 }).select({ _id: 0 }).exec();
        console.log("PROFES" + subjectProfesors);
        if (subjectProfesors != null) {
            console.log(subjectProfesors);
            console.log(id);
            subjectProfesors = subjectProfesors.employees;
            for (const profesor of subjectProfesors) {
                let oneEmployee = await Employee.findOne({ username: profesor }).select({ firstName: 1, lastName: 1 }).exec();
                if (oneEmployee != null) {
                    console.log(oneEmployee);
                    let name = oneEmployee.firstName + " " + oneEmployee.lastName;
                    profesorsArray.push({ idEmployee: oneEmployee._id, employeeName: name });
                }
            }
        }

        return { generalInfo: subjectInfo, employees: profesorsArray };
    }




    static async getSubjectNotifications(id: string) {
        //console.log(id)
        let notifs = await SubjectNotifications.find({ connectedSubject: id }).select({ connectedSubject: 0, _id: 0 }).exec();
        let notif = notifs.sort((a: any, b: any) => {
            return - new Date(a.dateCreation).getTime() + new Date(b.dateCreation).getTime();
        });
        return notif.filter((a: any) => {
            return new Date(a.dateCreation).getTime() <= new Date().getTime();
        })
    }


    static async getLectureSubjectMaterials(id: string) {
        let result = await Subject.findOne({ id: id }).select({ lectures: 1 }).select({ _id: 0 }).exec();
        //console.log(result);
        return result.lectures.sort((a: any, b: any) => {
            return a.number - b.number;
        });
    }

    static async getExerciseSubjectMaterials(id: string) {
        let result = await Subject.findOne({ id: id }).select({ exercises: 1 }).select({ _id: 0 }).exec();
        //console.log(result);
        return result.exercises.sort((a: any, b: any) => {
            return a.number - b.number;
        });
    }

    static async getSubjectExamTextMaterials(id: string) {
        let result = await Subject.findOne({ id: id }).select({ examMaterials: 1 }).select({ _id: 0 }).exec();
        //console.log(result);
        return result.examMaterials.examExamples.sort((a: any, b: any) => {
            return a.number - b.number;
        });
    }

    static async getSubjectExamSolutionsMaterials(id: string) {
        let result = await Subject.findOne({ id: id }).select({ examMaterials: 1 }).select({ _id: 0 }).exec();
        //console.log(result);
        return result.examMaterials.examSolutions.sort((a: any, b: any) => {
            return a.number - b.number;
        });
    }


    static async getExamSubjectMaterials(id: string) {
        let result = await Subject.findOne({ id: id }).select({ examMaterials: 1 }).select({ _id: 0 }).exec();
        //console.log({ examExamples: result.examMaterials.examExamples, examSolutions: result.examMaterials.examSolutions });
        return { examExamples: result.examMaterials.examExamples, examSolutions: result.examMaterials.examSolutions };
    }


    static async getSubjectLabMaterials(id: string) {
        let result = await Subject.findOne({ id: id }).select({ lab: 1 }).select({ _id: 0 }).exec();
        console.log("REZ" + result);
        for (let one of result.lab.labs) {
            one.materials = one.materials.sort((a: any, b: any) => {
                return a.number - b.number;
            });
        }
        return result;
    }

    static async getSubjectApplication(id: string) {
        let result = await Subject.findOne({ id: id }).select({ subjectApply: 1 }).select({ _id: 0 }).exec();
        //console.log(result);
        return result;
    }

    static async getSubjectProject(id: string) {
        let result = await Subject.findOne({ id: id }).select({ project: 1 }).select({ _id: 1 }).exec();
        //console.log(result);
        for (let one of result.project.projects) {
            one.materials = one.materials.sort((a: any, b: any) => {
                return a.number - b.number;
            });
        }
        return result;
    }

    static async getLabProjectExamFlag(id: string) {

        let showLabs = await Subject.findOne({ id: id }).select({ lab: 1 }).exec();
        if (showLabs && "lab" in showLabs) {
            showLabs = !showLabs.lab.isHidden;
        } else {
            showLabs = false;
        }

        let showProject = await Subject.findOne({ id: id }).select({ project: 1 }).exec();
        if (showProject && "project" in showProject) {
            showProject = !showProject.project.isHidden;
        } else {
            showProject = false;
        }
        let showExam = await Subject.findOne({ id: id }).select({ examMaterials: 1 }).exec();
        if (showExam && "examMaterials" in showExam) {
            showExam = !showExam.examMaterials.isExamExamplesHidden;
        } else {
            showExam = false;
        }

        let haveLabs = await Subject.findOne({ id: id }).select({ haveLab: 1 }).exec();
        showLabs = showLabs && haveLabs.haveLab;


        let result = {
            showLab: showLabs,
            showProject: showProject,
            showExamExamples: showExam
        }
        return result;
    }

    static async getStudentSubject(studentId: string) {
        //console.log(studentId);
        let res = await StudentSubject.find({ userId: studentId }).select({ subjectId: 1 }).select({ _id: 0 }).exec();
        let subjects: string[] = [];
        res.forEach((element: { subjectId: string; }) => {
            subjects.push(element.subjectId);
        });
        //console.log("OVDE SAM predmeti" + subjects);
        return subjects;
    }

    static async applyStudentToSubject(username: string, subject: string) {
        await StudentSubject.create({ subjectId: subject, userId: username });
    }

    static async applyStudentToSpisak(spisakID: string, studentID: string, fileLink: string) {
        await SubjectSpisakApply.create({
            studentID: studentID,
            spisakID: spisakID,
            materialLink: fileLink
        });

        await Subject.updateOne({ "subjectApply._id": new ObjectID(spisakID) }, {
            $inc: { "subjectApply.$.currentApply": 1 }
        }).exec();
    }

    static async getStudentSpisakApplication(studentID: string) {
        //  console.log(studentID);
        let cursor = await SubjectSpisakApply.find().exec();
        //  console.log(cursor);
        let applications = [];
        for (const one of cursor) {
            applications.push(one.spisakID);
        }
        return applications;
    }

    static async createNotif(notif: any, choosen: string[]) {

        await SubjectNotifications.create({
            title: notif.title,
            content: notif.content,
            dateCreation: notif.dateCreation,
            materials: notif.materials,
            connectedSubject: choosen

        })
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
    }

    static async getNotificationsAllSubjectateNotif() {
        return await SubjectNotifications.find({}).exec();
    }

    static async deleteSubjectNotif(id: string) {
        /*  await Subject.updateOne({
              "notifications._id": new ObjectID(id)
          }, {
              $pull: {
                  "notifications": {
                      "_id": new ObjectID(id)
                  }
  
              }
          }).exec();*/
        await SubjectNotifications.findByIdAndDelete(id).exec();
        return "Uspesno obrisano obavestenje";
    }

    static async getSubjectNotif(id: string) {
        console.log("PREDMET OBAVESTENJE: " + id);
        return await SubjectNotifications.findById(id).exec();
    }


    static async updateSubjectNotif(notif: any) {
        await SubjectNotifications.findByIdAndUpdate(notif._id, {
            title: notif.title,
            content: notif.content,
            dateCreation: notif.dateCreation,
            materials: notif.materials,
            connectedSubject: notif.connectedSubject
        }).exec();
        return "Uspesno azurirano obavestenje";
    }

    static async getSubjectAssigmentPlan(subject: string) {
        return await Assignment.findOne({ subject: subject }).select({ __v: 0 }).exec();
    }

    static async updateAssigmentPlan(assignmentPlan: any) {

        let help = await Assignment.findOne({ subject: assignmentPlan.subject }).exec();
        if (help) {
            await Assignment.updateOne({ subject: assignmentPlan.subject }, assignmentPlan).exec();
        } else {
            await Assignment.create({
                employees: assignmentPlan.employees,
                subject: assignmentPlan.subject,
                group: assignmentPlan.group
            })
        }
        return "Uspesno azurirano angazovanje na predmetu!";
    }

    static async deleteSubject(id: string) {
        await Assignment.deleteOne({ subject: id }).exec();
        await Subject.deleteOne({ id: id }).exec();
        await SubjectNotifications.updateMany({
            connectedSubject: id
        }, {
            $pull: {
                connectedSubject: id
            }
        }
        ).exec();
        await SubjectNotifications.deleteMany({
            connectedSubject: {
                $size: 0
            }
        })
        //Da l obrisati i spiskove i obavestenja u vezi sa ovim predmetom
        return "Uspesno obrisan predmet!";
    }

    static async deleteSubjectMaterials(name: any, id: string, type: string) {
        let subject = await Subject.findOne({ _id: new ObjectID(id) }).exec();
        let substr = __dirname.substring(0, __dirname.length - 8);
        const path = `${substr}predmetiSacuvaniFajlovi/${subject.id}/${type}/${name}`;
        console.log(path);
        fs.unlinkSync(path);
        switch (type) {
            case 'Predavanja':
                await Subject.updateOne({ _id: new ObjectID(id) },
                    {
                        $pull: {
                            lectures: {
                                link: name
                            }
                        }
                    }
                ).exec()
                break;

            case 'Vezbe':
                await Subject.updateOne({ _id: new ObjectID(id) },
                    {
                        $pull: {
                            exercises: {
                                link: name
                            }
                        }
                    }
                ).exec()
                break;


            case 'Ispitna pitanja':
                await Subject.updateOne({ _id: new ObjectID(id) },
                    {
                        $pull: {
                            "examMaterials.examExamples": {
                                link: name
                            }
                        }
                    }
                ).exec()
                break;


            case 'Ispitna resenja':
                await Subject.updateOne({ _id: new ObjectID(id) },
                    {
                        $pull: {
                            "examMaterials.examSolutions": {
                                link: name
                            }
                        }
                    }
                ).exec()
                break;

        }

        return "Uspesno obrisan materijal";
    }

    static async updateSubjectGeneralInfo(body: any) {
        let notif = body.info;
        let id = body.id;
        let subject = await Subject.findOne({ id: notif.id }).exec();
        if (subject != null) {
            throw "Izabrana sifra predmeta je zauzeta";
        }
        subject = await Subject.findById(id).exec();
        if (subject.id != notif.id) {
            this.updateReferencesSubject(subject.id, notif.id);
        }
        await Subject.findByIdAndUpdate(id, {
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
    }

    static async createSubjectLectureMaterials(matinfo: any, id: string) {
        await Subject.findByIdAndUpdate(id, {
            $push: {
                lectures: matinfo
            }
        }).exec();
        return "Materijal uspesno dodat";
    }
    static async createSubjectExerciseMaterials(matinfo: any, id: string) {
        await Subject.findByIdAndUpdate(id, {
            $push: {
                exercises: matinfo
            }
        }).exec();
        return "Materijal uspesno dodat";
    }



    static async createSubjectIspitniZadaciMaterials(matinfo: any, id: string) {
        await Subject.findByIdAndUpdate(id, {
            $push: {
                "examMaterials.examExamples": matinfo
            }
        }).exec();
        return "Materijal uspesno dodat";
    }
    static async createSubjectIspitnaResenjaMaterials(matinfo: any, id: string) {
        matinfo.date = Date.now();
        await Subject.findByIdAndUpdate(id, {
            $push: {
                "examMaterials.examSolutions": matinfo
            }
        }).exec();
        return "Materijal uspesno dodat";
    }


    //TO DO 
    static async updateReferencesSubject(old_subject_id: string, new_subject_id: string) {

        await StudentSubject.updateMany({ subjectId: old_subject_id }, {
            subjectId: new_subject_id
        }).exec();

        await SubjectNotifications.updateMany({ connectedSubject: old_subject_id }, {
            "connectedSubject.$[predmet]": new_subject_id
        }, {
            multi: true,
            arrayFilters: [{ predmet: old_subject_id }]
        }).exec();

        await Assignment.updateOne({ subject: old_subject_id }, {
            subject: new_subject_id
        }).exec();

        let substr = __dirname.substring(0, __dirname.length - 8);
        const old_path = `${substr}predmetiSacuvaniFajlovi/${old_subject_id}`;
        const new_path = `${substr}predmetiSacuvaniFajlovi/${new_subject_id}`;
        if (fs.existsSync(old_path)) {
            console.log(old_path);
            //fs.renameSync(old_path, new_path)
            fse.ensureDirSync(new_path);
            fse.copySync(old_path, new_path)
            fse.removeSync(old_path);
        }
    }
    static async subjectMaterials(name: any, id: string, type: string) {
        let subject = await Subject.findOne({ _id: new ObjectID(id) }).exec();
        let substr = __dirname.substring(0, __dirname.length - 8);
        const path = `${substr}predmetiSacuvaniFajlovi/${subject.id}/${type}/${name}`;
        console.log(path);
        fs.unlinkSync(path);
        switch (type) {
            case 'Predavanja':
                await Subject.updateOne({ _id: new ObjectID(id) },
                    {
                        $pull: {
                            lectures: {
                                link: name
                            }
                        }
                    }
                ).exec()
                break;

            case 'Vezbe':
                await Subject.updateOne({ _id: new ObjectID(id) },
                    {
                        $pull: {
                            exercises: {
                                link: name
                            }
                        }
                    }
                ).exec()
                break;


            case 'Ispitna pitanja':
                await Subject.updateOne({ _id: new ObjectID(id) },
                    {
                        $pull: {
                            "examMaterials.examExamples": {
                                link: name
                            }
                        }
                    }
                ).exec()
                break;


            case 'Ispitna resenja':
                await Subject.updateOne({ _id: new ObjectID(id) },
                    {
                        $pull: {
                            "examMaterials.examSolutions": {
                                link: name
                            }
                        }
                    }
                ).exec()
                break;

        }

        return "Uspesno obrisan materijal";
    }



    static async azurirajProjekteMaterials(materials: any, subject_id: string, project_id: string) {
        let subject = await Subject.findOne({ _id: new ObjectID(subject_id) }).exec();
        let substr = __dirname.substring(0, __dirname.length - 8);
        const path = `${substr}predmetiSacuvaniFajlovi/${subject.id}/projekti`;

        let oneProject = subject.project.projects.find((one) => {
            return one._id == project_id;
        })

        for (let oneProjectMaterials of oneProject.materials) {
            let ok = materials.find((one) => {
                return one.link == oneProjectMaterials.link
            })
            if (!ok) {
                let temp = `${path}/${oneProjectMaterials.link}`
                console.log(path);
                fs.unlinkSync(temp);
            }
        }


        let a = await Subject.updateOne({
            _id: new ObjectID(subject_id),
            'project.projects._id': project_id
        }, {
            'project.projects.$.materials': materials
        }).exec()
        console.log("PRORO" + a)
        return "Uspesno azurirano"
    }


    static async azurirajLabMaterials(materials: any, subject_id: string, lab_id: string) {

        let subject = await Subject.findOne({ _id: new ObjectID(subject_id) }).exec();
        let substr = __dirname.substring(0, __dirname.length - 8);
        const path = `${substr}predmetiSacuvaniFajlovi/${subject.id}/labovi`;

        let oneProject = subject.lab.labs.find((one) => {
            return one._id == lab_id;
        })

        for (let oneLabMaterials of oneProject.materials) {
            let ok = materials.find((one) => {
                return one.link == oneLabMaterials.link
            })
            if (!ok) {
                let temp = `${path}/${oneLabMaterials.link}`
                console.log(path);
                fs.unlinkSync(temp);
            }
        }






        let a = await Subject.updateOne({
            _id: new ObjectID(subject_id),
            'lab.labs._id': lab_id
        }, {
            'lab.labs.$.materials': materials
        }).exec()
        console.log("PRORO" + a)
        return "Uspesno azurirano"
    }



    static async azurirajRedosled(materials: any, id: string, type: string) {
        for (const info of materials) {
            switch (type) {
                case 'Predavanja':
                    await Subject.updateOne({ _id: new ObjectID(id), "lectures.link": info.link },
                        {
                            "lectures.$.number": info.number
                        }
                    ).exec()
                    break;

                case 'Vezbe':
                    await Subject.updateOne({ _id: new ObjectID(id), "exercises.link": info.link },
                        {
                            "exercises.$.number": info.number
                        }
                    ).exec()
                    break;


                case 'Ispitna pitanja':
                    await Subject.updateOne({ _id: new ObjectID(id), "examMaterials.examExamples.link": info.link },
                        {
                            "examMaterials.examExamples.$.number": info.number
                        }
                    ).exec()
                    break;


                case 'Ispitna resenja':
                    await Subject.updateOne({ _id: new ObjectID(id), "examMaterials.examSolutions.link": info.link },
                        {
                            "examMaterials.examSolutions.$.number": info.number
                        }
                    ).exec()
                    break;

            }

        }
        return "Uspesno azuriran redosled prikaza";
    }

    static async getAllSubjectAllApplications(id: string) {
        return await Subject.findById(id).select({ subjectApply: 1 }).select({ _id: 0 }).exec();
    }

    static async zatvoriSpisak(id: string, subject_id: string) {
        console.log("PRO" + id + " aa" + subject_id);
        let result = await Subject.updateOne({ _id: new ObjectID(subject_id), "subjectApply._id": new ObjectID(id) }, {
            "subjectApply.$.open": false
        }).exec();
        console.log(result);
        return "Uspesno zatvoren spisak";
    }


    static async dodajSubjectProjekat(id: string, project: any) {
        await Subject.findByIdAndUpdate(id, {
            $push: {
                'project.projects': project
            }
        }).exec()
    }

    static async azurirajInformacijeOProjektu(subject_id: string, project: any) {
        let a = await Subject.updateOne({ _id: new ObjectID(subject_id), 'project.projects._id': project._id }, {
            'project.projects.$.info': project.info
        }).exec()
        console.log(a);
        return "Uspesno azurirane informacije o predmetu"
    }


    static async getShowProjects(subject_id: string, type: string) {
        if (type == 'project') {
            let showProject = await Subject.findById(subject_id).select({ project: 1 }).exec();
            console.log("VALUE" + showProject.project.isHidden)
            return !showProject.project.isHidden
        }

        if (type == 'lab') {
            let showLab = await Subject.findById(subject_id).select({ lab: 1 }).exec();
            console.log("VALUE" + showLab.lab.isHidden)
            return !showLab.lab.isHidden
        }

        if (type == 'primeri ispita') {
            let showExamMaterials = await Subject.findById(subject_id).select({ examMaterials: 1 }).exec();
            console.log("VALUE" + showExamMaterials.examMaterials.isExamExamplesHidden)
            return !showExamMaterials.examMaterials.isExamExamplesHidden
        }
    }




    static async azurirajPrikaz(subject_id: string, new_value: string, type: string) {
        if (type == 'project') {
            await Subject.findByIdAndUpdate(subject_id, { 'project.isHidden': !new_value }).exec()
            return "Uspesno azurirano"
        }
        if (type == 'lab') {
            console.log(new_value);
            let a = await Subject.findByIdAndUpdate(subject_id, { 'lab.isHidden': !new_value }).exec()
            console.log(a);
            return "Uspesno azurirano"
        }
        if (type == 'primeri ispita') {
            console.log(new_value);
            let a = await Subject.findByIdAndUpdate(subject_id, { 'examMaterials.isExamExamplesHidden': !new_value }).exec()
            console.log("NADJENO" + a);
            return "Uspesno azurirano"
        }
    }


    static async addSubjectLab(id: string, lab: any) {
        await Subject.findByIdAndUpdate(id, {
            $push: {
                'lab.labs': lab
            }
        }).exec()
    }



    static async azurirajOpsteInformacijeOLabu(id: string, info: any) {
        await Subject.findByIdAndUpdate(id, {
            'lab.count': info.labNumber,
            'lab.info': info.labInfo
        }).exec()
        return "Uspesno azurirano";
    }

    static async obrisiLab(subject_id: string, lab_id: string) {

        await Subject.updateOne({
            _id: new ObjectID(subject_id),
        }, {
            $pull: {
                'lab.labs': {
                    _id: lab_id
                }
            }
        }).exec();
    }

    static async obrisiProjekat(subject_id: string, project_id: string) {
        await Subject.updateOne({
            _id: new ObjectID(subject_id),
        }, {
            $pull: {
                'project.projects': {
                    _id: project_id
                }
            }
        }).exec();
    }

    static async azurirajLabInfo(subject_id: string, lab_id: string, info: any) {

        let a = await Subject.updateOne({
            _id: new ObjectID(subject_id),
            'lab.labs._id': lab_id
        }, {
            'lab.labs.$.description': info.labInfo
        }).exec()
        return "Uspesno azurirano";

    }

    static async getAllSpisakApplication(subject_id: string, spisak_id: string) {
        let a = await SubjectSpisakApply.find({ spisakID: new ObjectID(spisak_id) }).exec();
        console.log("PRIJAVLJENI STUDENTI" + a);
        return a;
    }

    static async napraviSpisak(subject_id: string, subjectApply: string) {
        await Subject.updateOne({ _id: new ObjectID(subject_id) },
            {
                $push: {
                    'subjectApply': subjectApply
                }
            }
        ).exec();
        return "Spisak uspesno napravljen";
    }



    static async createSubject(subjectInfo: any) {
        console.log(JSON.stringify(subjectInfo))
        Subject.create({
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
        })
        return "Uspesno kreiran predmet"
    }

    static async mappSubject(subjectMappingInfo: any) {
        let subject = await Subject.findOne({ id: subjectMappingInfo.mapped_subject_id }).exec();
        if (subject.department == subjectMappingInfo.department) {
            return "Predmet vec postoji na izabranom odseku";
        }
        SubjectMapping.create(subjectMappingInfo);
        return "Uspesno mapiran predmet";
    }

}



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