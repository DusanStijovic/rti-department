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
const Assignment_1 = require("../model/Assignment");
const User_1 = require("../model/User");
const Student_1 = require("../model/Student");
const Employe_1 = require("../model/Employe");
const SubjectSpisakApply_1 = __importDefault(require("../model/SubjectSpisakApply"));
const Subject_1 = __importDefault(require("../model/Subject"));
const StudentSubject_1 = __importDefault(require("../model/StudentSubject"));
const mongodb_1 = require("mongodb");
const fs_1 = __importDefault(require("fs"));
var path = require('path');
class UserService {
    static checkIfIndexExists(index) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = yield Student_1.Student.findOne({ index: index }).exec();
            if (student)
                return true;
            else
                false;
        });
    }
    static extractIndex(username) {
        let regex = /^[a-z]{2}([0-9]{2})([0-9]{4})(d|m|p)@student\.etf\.rs$/;
        let match = regex.exec(username);
        if (!match)
            return null;
        return "20" + match[1] + "/" + match[2];
    }
    static extractNivoStudija(username) {
        let regex = /^[a-z]{2}([0-9]{2})([0-9]{4})(d|m|p)@student\.etf\.rs$/;
        let match = regex.exec(username);
        if (!match)
            return null;
        return match[3];
    }
    static createNewStudents(students) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = '';
            let errorMessage = false;
            for (let student of students) {
                try {
                    errorMessage = yield this.checkIfUserExist(student.username);
                    if (errorMessage)
                        throw `Student sa datim korisnickim imenom(${student.username}) vec postoji\n`;
                    let password = student.password;
                    yield User_1.User.create({
                        username: student.username,
                        password: password,
                        firstLogin: "yes",
                        type: "student"
                    });
                    yield Student_1.Student.create({
                        username: student.username,
                        index: this.extractIndex(student.username),
                        studyType: this.extractNivoStudija(student.username),
                        firstName: student.firstName,
                        lastName: student.lastName,
                        status: 'aktivan'
                    });
                    message += `Student sa korisnickim imenom(${student.username}) uspesno registrovan\n`;
                }
                catch (error) {
                    message += error;
                    message += "\n";
                }
            }
            return message;
        });
    }
    static saveStudent(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = "";
            try {
                let errorMessage = this.checkIfEmptyStudentField(user);
                if (errorMessage)
                    throw "Prazna polja";
                errorMessage = !this.checkIfStudentIndexRightFormat(user.index);
                if (errorMessage)
                    throw "Index nije u dobrom formatu";
                errorMessage = yield this.checkIfIndexExists(user.index);
                if (errorMessage)
                    throw "Index vec postoji";
                let username = this.makeStudentUserName(user);
                errorMessage = yield this.checkIfUserExist(username);
                if (errorMessage)
                    throw "Student sa datim korisnickim imenom vec postoji";
                let password = user.password;
                yield User_1.User.create({
                    username: username,
                    password: password,
                    firstLogin: "yes",
                    type: "student"
                });
                yield Student_1.Student.create({
                    username: username,
                    index: user.index,
                    studyType: user.studyType,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    status: 'aktivan'
                });
                return username;
            }
            catch (error) {
                //console.log("Greska je" + error);
                throw error;
            }
        });
    }
    static checkIfStudentIndexRightFormat(index) {
        let regExpStudent = /^[0-9]{4}\/[0-9]{4}$/;
        console.log(index);
        let check = regExpStudent.test(index);
        console.log(check);
        return check;
    }
    static checkIfEmptyStudentField(user) {
        if (!user.password)
            return true;
        if (!user.index)
            return true;
        if (!user.firstName)
            return true;
        if (!user.lastName)
            return true;
    }
    static makeStudentUserName(user) {
        let index = "" + user.lastName.toLowerCase().charAt(0) + user.firstName.toLowerCase().charAt(0) + user.index.substr(2, 2) + user.index.substr(5);
        //console.log("Index je : " + index);
        return index + user.studyType + "@student.etf.rs";
    }
    static checkIfUserExist(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield Student_1.Student.findOne({ "username": userName }).exec();
            //console.log(user);
            if (user == null)
                return false;
            else
                return true;
        });
    }
    static getUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(username);
            // console.log(password);
            let userRet = null;
            userRet = yield User_1.User.findOne({ "username": username, "password": password }).select({ "_id": 0, "__v": 0 }).exec();
            if (!userRet)
                return userRet;
            let temp = null;
            switch (userRet.type) {
                case 'student':
                    temp = yield Student_1.Student.findOne({ "username": username, status: 'aktivan' }).exec();
                    if (temp)
                        return userRet;
                    else
                        return null;
                    break;
                case 'zaposlen':
                    temp = yield Employe_1.Employee.findOne({ "username": username, status: 'aktivan' }).exec();
                    if (temp)
                        return userRet;
                    else
                        return null;
                    break;
                case 'admin':
                    return userRet;
            }
        });
    }
    static getEmployeesList(status) {
        if (status == 'all') {
            return Employe_1.Employee.find({}).select({ "__v": 0 }).exec();
        }
        if (status == 'aktivan') {
            return Employe_1.Employee.find({ status: status }).select({ "__v": 0 }).exec();
        }
    }
    static getEmployeeAsignedSubjcect(username) {
        //console.log("provera" + username);
        return Assignment_1.Assignment.find({
            employees: username
        }).select({ "subject": 1 }).select({ "_id": 0 }).exec();
    }
    static getEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield Employe_1.Employee.aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectID(id)
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
        });
    }
    static checkIfPasswordRight(password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let isOK = null != (yield User_1.User.findOne({ password: password, username: username }).exec());
            if (!isOK)
                throw "Stara lozinka nije ispravna";
        });
    }
    static updatePassword(userName, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.updateOne({ username: userName }, { password: newPassword, firstLogin: "no" }).exec();
        });
    }
    static getAllStudents(status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status == 'all') {
                return yield Student_1.Student.find().select({ username: 1 }).exec();
            }
            if (status == 'aktivan') {
                return yield Student_1.Student.find({ status: 'aktivan' }).select({ username: 1 }).exec();
            }
        });
    }
    static removeStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Student_1.Student.deleteOne({ username: studentId });
            yield User_1.User.deleteOne({ username: studentId });
            yield StudentSubject_1.default.deleteOne({ studentId: studentId });
            yield SubjectSpisakApply_1.default.deleteOne({ studentID: studentId });
        });
    }
    static getStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield Student_1.Student.aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectID(id)
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
        });
    }
    static updateReferencesStudent(old_username, new_username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield StudentSubject_1.default.updateMany({ userId: old_username }, {
                userId: new_username
            }).exec();
            yield SubjectSpisakApply_1.default.updateMany({ studenID: old_username }, {
                studentID: new_username
            }).exec();
        });
    }
    //TO TO
    static updateReferencesEmployee(old_username, new_username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Assignment_1.Assignment.updateMany({ employees: old_username }, { 'employees.$': new_username }).exec();
            yield Assignment_1.Assignment.updateMany({}, { 'group.$[g].employees.$[e]': new_username }, {
                multi: true,
                arrayFilters: [{ "g.employees": old_username }, { 'e': old_username }]
            }).exec();
        });
    }
    static updateStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = student.student;
            let id = student.id;
            let errorMessage = "";
            try {
                let errorMessage = this.checkIfEmptyStudentField(user);
                if (errorMessage)
                    throw "Prazna polja";
                errorMessage = !this.checkIfStudentIndexRightFormat(user.index);
                if (errorMessage)
                    throw "Index nije u dobrom formatu";
                let username = this.makeStudentUserName(user);
                errorMessage = yield this.checkIfUserExist(username);
                let st = yield Student_1.Student.findOne({ _id: id }).select({ username: 1, index: 1 }).exec();
                if (st.username === username)
                    errorMessage = false;
                if (errorMessage)
                    throw "Studen sa datim korisnickim imenom vec postoji";
                errorMessage = yield this.checkIfIndexExists(user.index);
                if (st.index == user.index)
                    errorMessage = false;
                if (errorMessage)
                    throw "Index vec postoji";
                let password = user.password;
                let temp = yield Student_1.Student.findOne({ _id: id }).exec();
                console.log(temp);
                temp = temp.username;
                yield this.updateReferencesStudent(temp, username);
                yield User_1.User.updateOne({ username: temp }, {
                    username: username,
                    password: password,
                    type: "student"
                });
                yield Student_1.Student.updateOne({ username: temp }, {
                    username: username,
                    index: user.index,
                    studyType: user.studyType,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    status: user.status
                });
                return "Student uspesno izmenjen, korisnicko ime: " + username;
            }
            catch (error) {
                //console.log("Greska je" + error);
                throw error;
            }
        });
    }
    static makeEmployeeUserName(userName) {
        return `${userName}@etf.bg.ac.rs`;
    }
    static checkPhone(phone) {
        let phoneRegex = /^[0-9]{3}\/[0-9]{6,}$/;
        if (!phoneRegex.test(phone)) {
            throw "Broj telefona nije u dobrom formatu xxx/xxxxxx...";
        }
    }
    static dodajZaposlenog(zaposlen) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = UserService.makeEmployeeUserName(zaposlen.username);
            let user = yield User_1.User.findOne({ username: name }).exec();
            console.log(user);
            if (user != null) {
                throw `Korisnik sa datim korisnickim imenom vec postoji`;
            }
            //UserService.checkPhone(zaposlen.phoneNumber);
            console.log(zaposlen);
            yield User_1.User.create({
                username: name,
                password: zaposlen.password,
                type: "zaposlen",
                firstLogin: 'yes'
            });
            yield Employe_1.Employee.create({
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
        });
    }
    static getEmployeesUsername(status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status == 'all') {
                return yield Employe_1.Employee.find({}).select({ username: 1 }).exec();
            }
            if (status == 'aktivan') {
                return yield Employe_1.Employee.find({ status: status }).select({ username: 1 }).exec();
            }
        });
    }
    static getAllTeachersUserName(status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status == 'all') {
                return yield Employe_1.Employee.find({
                    title: {
                        $in: ["redovni profesor", "vandredni profesor", "docent", "asistent", "saradnik u nastavi"]
                    }
                }).select({ username: 1 }).exec();
            }
            if (status == 'aktivan') {
                return yield Employe_1.Employee.find({
                    title: {
                        $in: ["redovni profesor", "vandredni profesor", "docent", "asistent", "saradnik u nastavi"]
                    },
                    status: status
                }).select({ username: 1 }).exec();
            }
        });
    }
    static removeEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let assignments = yield Assignment_1.Assignment.find({ employees: id }).exec();
            if (assignments.length != 0) {
                throw "Nastavnik je angazovan na nekom predmetu, ne mozete ga obrisati";
            }
            console.log("ID:" + id);
            yield User_1.User.deleteOne({ username: id }).exec();
            yield Employe_1.Employee.deleteOne({ username: id }).exec();
            return "Zaposlen uspesno obrisan";
        });
    }
    static checkIfEmployeeExist(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let emplpoyee = yield Employe_1.Employee.find({ username: username }).select({ username: 1 }).exec();
            return emplpoyee == null ? true : false;
        });
    }
    static changeEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            let temp = yield Employe_1.Employee.findOne({ _id: employee._id }).exec();
            console.log("TEMP :" + temp);
            //this.makeEmployeeUserName(employee.username);
            let name = employee.username;
            let errorMessage = yield this.checkIfUserExist(name);
            if (temp.username == name)
                errorMessage = false;
            if (errorMessage)
                throw "Korisnik sa datim korisnickim imenom vec postoji";
            if (temp.pictureUrl && temp.pictureUrl != '' && temp.pictureUrl != employee.pictureUrl) {
                let substr = __dirname.substring(0, __dirname.length - 8);
                const path = `${substr}slikeZaposlenih/${temp.pictureUrl}`;
                console.log(path);
                fs_1.default.unlinkSync(path);
            }
            yield this.updateReferencesEmployee(temp.username, name);
            yield User_1.User.updateOne({ username: temp.username }, {
                username: name,
                password: employee.password,
                type: "zaposlen",
            }).exec();
            yield Employe_1.Employee.updateOne({
                username: temp.username
            }, {
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
        });
    }
    static getAllSubjectsAllOdsek() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Subject_1.default.find({}).select({ id: 1 }).select({ _id: 1 }).exec();
        });
    }
    static applySelectedStudents(students, subjects) {
        return __awaiter(this, void 0, void 0, function* () {
            let fleg = false;
            for (const student of students) {
                for (const subject of subjects) {
                    let found = yield StudentSubject_1.default.findOne({ userId: student, subjectId: subject }).exec();
                    console.log("NADJENO" + found);
                    if (found == null) {
                        console.log("NIJE NADJEN");
                        yield StudentSubject_1.default.create({
                            userId: student,
                            subjectId: subject
                        });
                    }
                    else {
                        fleg = true;
                    }
                }
            }
            if (fleg) {
                return "Selektovani studenti su uspesno prijavljeni na predmete, neki su vec bili prijavljeni";
            }
            else {
                return "Selektovani studenti su uspesno prijavljeni na predmete";
            }
        });
    }
    static getAllApplys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield StudentSubject_1.default.find({}).select({ _id: 0 }).exec();
        });
    }
    static getEmployeeId(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Employe_1.Employee.findOne({ username: username }).select({ _id: 1 }).exec();
        });
    }
    static getEmployeeSubject(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let a = yield Assignment_1.Assignment.find({ employees: username }).select({ subject: 1 }).exec();
            let help = [];
            console.log(a);
            for (const one of a) {
                console.log(one);
                let a2 = yield Subject_1.default.findOne({ id: one.subject }).select({ _id: 1 }).exec();
                console.log(a2);
                help.push({
                    subject: one.subject,
                    _id: a2._id
                });
            }
            return help;
        });
    }
    static getEmployeNamebyUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield Employe_1.Employee.findOne({ username: username }).select({ firstName: 1, lastName: 1 }).exec();
            return employee.firstName + " " + employee.lastName;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map