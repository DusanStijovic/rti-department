import SubjectStudentApply from "../model/SubjectStudentApply";
import { Assignment } from "../model/Assignment";
import { User } from "../model/User";
import { Student } from "../model/Student";
import { Employee } from "../model/Employe";
import SubjectSpisakApply from "../model/SubjectSpisakApply";
import Subject from "../model/Subject";
import StudentSubject from "../model/StudentSubject";
import { ObjectID } from 'mongodb';
import fs from 'fs';
import e from "express";
var path = require('path');



export default class UserService {


    static async checkIfIndexExists(index: string) {
        let student = await Student.findOne({ index: index }).exec();
        if (student) return true;
        else false;
    }

    static extractIndex(username: string) {
        let regex = /^[a-z]{2}([0-9]{2})([0-9]{4})(d|m|p)@student\.etf\.rs$/
        let match = regex.exec(username);
        if (!match) return null;
        return "20" + match[1] + "/" + match[2];
    }
    static extractNivoStudija(username: string) {
        let regex = /^[a-z]{2}([0-9]{2})([0-9]{4})(d|m|p)@student\.etf\.rs$/
        let match = regex.exec(username);
        if (!match) return null;
        return match[3];
    }


    static async createNewStudents(students: any) {
        let message = '';
        let errorMessage = false;
        for (let student of students) {
            try {

                errorMessage = await this.checkIfUserExist(student.username);

                if (errorMessage) throw `Student sa datim korisnickim imenom(${student.username}) vec postoji\n`;

                let password = student.password;
                await User.create({
                    username: student.username,
                    password: password,
                    firstLogin: "yes",
                    type: "student"
                });
                await Student.create({
                    username: student.username,
                    index: this.extractIndex(student.username),
                    studyType: this.extractNivoStudija(student.username),
                    firstName: student.firstName,
                    lastName: student.lastName,
                    status: 'aktivan'
                });
                message += `Student sa korisnickim imenom(${student.username}) uspesno registrovan\n`
            } catch (error) {
                message += error;
                message += "\n";
            }

        }
        return message;
    }

    static async saveStudent(user: any) {
        let errorMessage = "";
        try {
            let errorMessage = this.checkIfEmptyStudentField(user);
            if (errorMessage) throw "Prazna polja";

            errorMessage = !this.checkIfStudentIndexRightFormat(user.index);
            if (errorMessage) throw "Index nije u dobrom formatu";

            errorMessage = await this.checkIfIndexExists(user.index);
            if (errorMessage) throw "Index vec postoji";

            let username = this.makeStudentUserName(user);
            errorMessage = await this.checkIfUserExist(username);

            if (errorMessage) throw "Student sa datim korisnickim imenom vec postoji";


            let password = user.password;
            await User.create({
                username: username,
                password: password,
                firstLogin: "yes",
                type: "student"
            });
            await Student.create({
                username: username,
                index: user.index,
                studyType: user.studyType,
                firstName: user.firstName,
                lastName: user.lastName,
                status: 'aktivan'
            });
            return username;
        } catch (error) {
            //console.log("Greska je" + error);
            throw error;
        }


    }

    static checkIfStudentIndexRightFormat(index: string): boolean {
        let regExpStudent: RegExp = /^[0-9]{4}\/[0-9]{4}$/;
        console.log(index)
        let check = regExpStudent.test(index);
        console.log(check)
        return check;
    }

    static checkIfEmptyStudentField(user: any): boolean {
        if (!user.password) return true;
        if (!user.index) return true;
        if (!user.firstName) return true;
        if (!user.lastName) return true;
    }

    static makeStudentUserName(user: any) {
        let index = "" + user.lastName.toLowerCase().charAt(0) + user.firstName.toLowerCase().charAt(0) + user.index.substr(2, 2) + user.index.substr(5);
        //console.log("Index je : " + index);
        return index + user.studyType + "@student.etf.rs";
    }

    static async checkIfUserExist(userName: string) {
        let user = await Student.findOne({ "username": userName }).exec();
        //console.log(user);
        if (user == null) return false;
        else return true;
    }

    static async getUser(username: string, password: string) {
        //console.log(username);
        // console.log(password);
        let userRet = null
        userRet = await User.findOne({ "username": username, "password": password }).select({ "_id": 0, "__v": 0 }).exec();
        if (!userRet) return userRet;
        let temp = null;
        switch (userRet.type) {
            case 'student':
                temp = await Student.findOne({ "username": username, status: 'aktivan' }).exec();
                if (temp) return userRet
                else return null;
                break;

            case 'zaposlen':
                temp = await Employee.findOne({ "username": username, status: 'aktivan' }).exec();
                if (temp) return userRet
                else return null;
                break;
            case 'admin':
                return userRet;
        }

    }

    static getEmployeesList(status: string): any {
        if (status == 'all') {
            return Employee.find({}).select({ "__v": 0 }).exec()
        }
        if (status == 'aktivan') {
            return Employee.find({ status: status }).select({ "__v": 0 }).exec()
        }

    }

    static getEmployeeAsignedSubjcect(username: string) {
        //console.log("provera" + username);
        return Assignment.find({
            employees: username
        }).select({ "subject": 1 }).select({ "_id": 0 }).exec();
    }

    static async getEmployee(id: string) {

        let employee = await Employee.aggregate([
            {
                $match: {
                    _id: new ObjectID(id)
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "username",
                    foreignField: "username",
                    as: "user"
                }
            },

            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"] } }
            },
            { $project: { user: 0, } }
        ]).exec();
        console.log(employee);
        return employee[0];

    }



    static async checkIfPasswordRight(password: string, username: string) {
        let isOK = null != await User.findOne({ password: password, username: username }).exec();
        if (!isOK) throw "Stara lozinka nije ispravna"
    }

    static async updatePassword(userName: string, newPassword: string) {
        return await User.updateOne({ username: userName }, { password: newPassword, firstLogin: "no" }).exec();
    }


    static async getAllStudents(status: string) {
        if (status == 'all') {
            return await Student.find().select({ username: 1 }).exec();
        }
        if (status == 'aktivan') {
            return await Student.find({ status: 'aktivan' }).select({ username: 1 }).exec();
        }


    }

    static async removeStudent(studentId: string) {
        await Student.deleteOne({ username: studentId });
        await User.deleteOne({ username: studentId });
        await StudentSubject.deleteOne({ studentId: studentId });
        await SubjectSpisakApply.deleteOne({ studentID: studentId });
    }

    static async getStudent(id: string) {
        let employee = await Student.aggregate([
            {
                $match: {
                    _id: new ObjectID(id)
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "username",
                    foreignField: "username",
                    as: "user"
                }
            },

            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"] } }
            },
            { $project: { user: 0, } }
        ]).exec();
        console.log(employee);
        return employee[0];
    }


    static async updateReferencesStudent(old_username: string, new_username: string) {
        await StudentSubject.updateMany({ userId: old_username }, {
            userId: new_username
        }).exec();

        await SubjectSpisakApply.updateMany({ studenID: old_username }, {
            studentID: new_username
        }).exec();
    }

    //TO TO
    static async updateReferencesEmployee(old_username: string, new_username: string) {
        await Assignment.updateMany({ employees: old_username },
            { 'employees.$': new_username }
        ).exec();

        await Assignment.updateMany({},
            { 'group.$[g].employees.$[e]': new_username },
            {
                multi: true,
                arrayFilters: [{ "g.employees": old_username }, { 'e': old_username }]
            }
        ).exec();
    }

  

    static async updateStudent(student: any) {
        let user = student.student;
        let id = student.id;
        let errorMessage = "";
        try {
            let errorMessage = this.checkIfEmptyStudentField(user);
            if (errorMessage) throw "Prazna polja";

            errorMessage = !this.checkIfStudentIndexRightFormat(user.index);
            if (errorMessage) throw "Index nije u dobrom formatu";





            let username = this.makeStudentUserName(user);
            errorMessage = await this.checkIfUserExist(username);
            let st = await Student.findOne({ _id: id }).select({ username: 1, index: 1 }).exec();

            if (st.username === username) errorMessage = false;
            if (errorMessage) throw "Studen sa datim korisnickim imenom vec postoji";

            errorMessage = await this.checkIfIndexExists(user.index);
            if (st.index == user.index) errorMessage = false;
            if (errorMessage) throw "Index vec postoji";




            let password = user.password;
            let temp = await Student.findOne({ _id: id }).exec();
            console.log(temp);
            temp = temp.username;
            await this.updateReferencesStudent(temp, username);
            await User.updateOne({ username: temp }, {
                username: username,
                password: password,
                type: "student"
            });
            await Student.updateOne({ username: temp }, {
                username: username,
                index: user.index,
                studyType: user.studyType,
                firstName: user.firstName,
                lastName: user.lastName,
                status: user.status
            });
            return "Student uspesno izmenjen, korisnicko ime: " + username;
        } catch (error) {
            //console.log("Greska je" + error);
            throw error;
        }

    }

    static makeEmployeeUserName(userName: string) {
        return `${userName}@etf.bg.ac.rs`;
    }

    static checkPhone(phone: string) {
        let phoneRegex = /^[0-9]{3}\/[0-9]{6,}$/;
        if (!phoneRegex.test(phone)) {
            throw "Broj telefona nije u dobrom formatu xxx/xxxxxx...";
        }
    }



    static async dodajZaposlenog(zaposlen: any) {
        let name = UserService.makeEmployeeUserName(zaposlen.username);
        let user = await User.findOne({ username: name }).exec();
        console.log(user);
        if (user != null) {
            throw `Korisnik sa datim korisnickim imenom vec postoji`
        }
        //UserService.checkPhone(zaposlen.phoneNumber);

        console.log(zaposlen);
        await User.create({
            username: name,
            password: zaposlen.password,
            type: "zaposlen",
            firstLogin: 'yes'
        });


        await Employee.create({
            username: name,
            firstName: zaposlen.firstName,
            lastName: zaposlen.lastName,
            address: zaposlen.address,
            phoneNumber: zaposlen.phoneNumber,
            page: zaposlen.page,
            bio: zaposlen.bio,
            title: zaposlen.title,
            roomNumber: zaposlen.roomNumber,
            status: "aktivan",
            pictureUrl: zaposlen.pictureUrl

        });

        // type: zaposlen.type,

        return `Zaposlen sa korisnickim imenom ${name} uspesno registrovan`;

    }

    static async getEmployeesUsername(status: string) {
        if (status == 'all') {
            return await Employee.find({}).select({ username: 1 }).exec();
        }
        if (status == 'aktivan') {
            return await Employee.find({ status: status }).select({ username: 1 }).exec();
        }
    }

    static async getAllTeachersUserName(status: string) {
        if (status == 'all') {

            return await Employee.find({
                title: {
                    $in: ["redovni profesor", "vandredni profesor", "docent", "asistent", "saradnik u nastavi"]
                }
            }).select({ username: 1 }).exec();
        }
        if (status == 'aktivan') {

            return await Employee.find({
                title: {
                    $in: ["redovni profesor", "vandredni profesor", "docent", "asistent", "saradnik u nastavi"]
                },
                status: status
            }).select({ username: 1 }).exec();
        }

    }

    static async removeEmployee(id: string) {
        let assignments = await Assignment.find({ employees: id }).exec();
        if (assignments.length != 0) {
            throw "Nastavnik je angazovan na nekom predmetu, ne mozete ga obrisati";
        }
        console.log("ID:" + id);
        await User.deleteOne({ username: id }).exec();
        await Employee.deleteOne({ username: id }).exec();
        return "Zaposlen uspesno obrisan";
    }

    static async checkIfEmployeeExist(username: string) {
        let emplpoyee = await Employee.find({ username: username }).select({ username: 1 }).exec();
        return emplpoyee == null ? true : false;
    }


    static async changeEmployee(employee: any) {
        let temp = await Employee.findOne({ _id: employee._id }).exec();
        console.log("TEMP :" + temp);
        //this.makeEmployeeUserName(employee.username);
        let name = employee.username;
        let errorMessage = await this.checkIfUserExist(name);
        if (temp.username == name) errorMessage = false;

        if (errorMessage) throw "Korisnik sa datim korisnickim imenom vec postoji";

        if (temp.pictureUrl && temp.pictureUrl != '' && temp.pictureUrl != employee.pictureUrl) {
            let substr = __dirname.substring(0, __dirname.length - 8);
            const path = `${substr}slikeZaposlenih/${temp.pictureUrl}`;
            console.log(path);
            fs.unlinkSync(path);
        }

        await this.updateReferencesEmployee(temp.username, name);
        await User.updateOne({ username: temp.username }, {
            username: name,
            password: employee.password,
            type: "zaposlen",
        }).exec();

        await Employee.updateOne({
            username: temp.username
        },
            {
                username: name,
                firstName: employee.firstName,
                lastName: employee.lastName,
                address: employee.address,
                phoneNumber: employee.phoneNumber,
                page: employee.page,
                bio: employee.bio,
                title: employee.title,
                roomNumber: employee.roomNumber,
                status: employee.status,
                pictureUrl: employee.pictureUrl
            }).exec();

        // type: employee.type,
        console.log("SLika:" + employee.pictureUrl);
        return "Uspesno izmenjen zaposlenm, username: " + name;

    }


    static async getAllSubjectsAllOdsek() {
        return await Subject.find({}).select({ id: 1 }).select({ _id: 1 }).exec();
    }



    static async applySelectedStudents(students: string[], subjects: string[]) {
        let fleg: boolean = false;
        for (const student of students) {
            for (const subject of subjects) {
                let found = await StudentSubject.findOne({ userId: student, subjectId: subject }).exec();
                console.log("NADJENO" + found);
                if (found == null) {
                    console.log("NIJE NADJEN")
                    await StudentSubject.create({
                        userId: student,
                        subjectId: subject
                    })
                } else {
                    fleg = true;
                }
            }
        }
        if (fleg) {
            return "Selektovani studenti su uspesno prijavljeni na predmete, neki su vec bili prijavljeni";
        } else {
            return "Selektovani studenti su uspesno prijavljeni na predmete";
        }
    }


    static async getAllApplys() {
        return await StudentSubject.find({}).select({ _id: 0 }).exec();
    }

    static async getEmployeeId(username: string) {
        return await Employee.findOne({ username: username }).select({ _id: 1 }).exec();
    }

    static async getEmployeeSubject(username: string) {
        let a = await Assignment.find({ employees: username }).select({ subject: 1 }).exec();
        let help = [];
        console.log(a);
        for (const one of a) {
            console.log(one);
            let a2 = await Subject.findOne({ id: one.subject }).select({ _id: 1 }).exec();
            console.log(a2);
            help.push({
                subject: one.subject,
                _id: a2._id
            });
        }
        return help;
    }

    static async getEmployeNamebyUserName(username: string) {
        let employee = await Employee.findOne({ username: username }).select({ firstName: 1, lastName: 1 }).exec();
        return employee.firstName + " " + employee.lastName;
    }
}