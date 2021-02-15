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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authentification = require("./services/Authentication");
const loginController = require("./controllers/LoginController");
const mongoose_1 = __importDefault(require("mongoose"));
const Authorization_1 = require("./services/Authorization");
const seed_1 = __importDefault(require("./Seed/seed"));
const NotificationService_1 = __importDefault(require("./services/NotificationService"));
const EmployeeProjectService_1 = __importDefault(require("./services/EmployeeProjectService"));
const OfferedProjectService_1 = __importDefault(require("./services/OfferedProjectService"));
const Student_1 = require("./model/Student");
const UserService_1 = __importDefault(require("./services/UserService"));
const SubjectService_1 = __importDefault(require("./services/SubjectService"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
var path = require('path');
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
var StudentWorkStorage = multer_1.default.diskStorage({
    destination: function (request, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = request.params.subject;
            let subjectMat = request.params.materials;
            let name = request.params.student;
            let dir = __dirname + `/predmetiSacuvaniFajlovi/${subject}/${subjectMat}/${name}`;
            console.log(dir);
            fs_1.default.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    console.log(err);
                }
                cb(null, dir);
            });
        });
    },
    filename: function (request, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});
var SlikeZaposlenih = multer_1.default.diskStorage({
    destination: function (request, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = request.params.id;
            let dir = __dirname + `/slikeZaposlenih`;
            console.log(dir);
            fs_1.default.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    console.log(err);
                }
                cb(null, dir);
            });
        });
    },
    filename: function (request, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});
var StudentMaterialsStorage = multer_1.default.diskStorage({
    destination: function (request, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = request.params.subject;
            let subjectMat = request.params.materials;
            let dir = __dirname + `/predmetiSacuvaniFajlovi/${subject}/${subjectMat}`;
            console.log(dir);
            fs_1.default.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    console.log(err);
                }
                cb(null, dir);
            });
        });
    },
    filename: function (request, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});
var uploadStudentWork = multer_1.default({
    storage: StudentWorkStorage,
}).single('file');
var uploadStudentMaterials = multer_1.default({
    storage: StudentMaterialsStorage,
}).array('file');
var uploudSlikaZaposlenog = multer_1.default({
    storage: SlikeZaposlenih
}).single('slika');
mongoose_1.default.connect('mongodb://localhost:27017/RTI_Katedra')
    .then(() => { console.log("Konektovan na bazu"); })
    .catch(() => {
    console.log("Nije moguce da se konektuje");
    process.exit();
});
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    //console.log('mongo connected');
});
const router = express_1.default.Router();
seed_1.default(connection);
router.route('/slikeZaposlenih').post(authentification.checkIfAuthenticated, (request, response) => {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    //console.log("CAO");
    try {
        //console.log(request.body);
        uploudSlikaZaposlenog(request, response, function (err) {
            if (err) {
                console.log("ssssss" + err);
                response.status(409).json({ error: err });
            }
            //console.log("ssssss" + request.file);
            console.log("aaaaaaaaaa" + err);
            response.end("Slika is uploaded successfully!");
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Greska' });
    }
});
router.route('/predmetiSacuvaniFajlovi/:subject/:materials').post(authentification.checkIfAuthenticated, (request, response) => {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log(request.body);
        uploadStudentMaterials(request, response, function (err) {
            if (err) {
                console.log("ssssss" + err);
                response.status(409).json({ error: err });
            }
            //console.log("ssssss" + request.file);
            console.log("aaaaaaaaaa" + err);
            response.end("File is uploaded successfully!");
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Greska' });
    }
});
router.route('/predmetiSacuvaniFajlovi/:subject/:materials/:student').post(authentification.checkIfAuthenticated, (request, response) => {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log(request.body);
        uploadStudentWork(request, response, function (err) {
            if (err) {
                console.log("ssssss" + err);
                response.status(409).json({ error: err });
            }
            //console.log("ssssss" + request.file);
            console.log("aaaaaaaaaa" + err);
            response.end("File is uploaded successfully!");
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Greska' });
    }
});
router.route('/login').post(loginController.login);
// router.route('/proba').get(authentification.checkIfAuthenticated, (request, response) => {
//     //console.log("ULAZIMO")
//     if (!Authorization.isEmployee(request)) response.json({ 'isOk': false });
//     //console.log("Prosli proveru");
//     response.json({ 'isOk': true });
// });
//Notifications
router.route('/notificationTypes').get((request, response) => {
    NotificationService_1.default.getNotificationsTypes()
        .then(((notTypes) => {
        console.log(notTypes);
        response.json(NotificationService_1.default.extraxtNotificationType(notTypes));
    }))
        .catch((err) => {
        response.status(500).send();
        ////console.log(err);
    });
});
router.route('/notificationTypesWithId').get((request, response) => {
    NotificationService_1.default.getNotificationsTypesWithId()
        .then(((notTypes) => {
        console.log(notTypes);
        response.json(notTypes);
    }))
        .catch((err) => {
        response.status(500).send();
        ////console.log(err);
    });
});
router.route('/notification/:notificationType').get((request, response) => {
    NotificationService_1.default.getNotifications(request.params['notificationType'])
        .then((notification) => {
        ////console.log(notification);
        response.json(notification);
    }).catch((err) => {
        response.status(500).send();
    });
});
router.route('/updateNotificationType').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        yield NotificationService_1.default.updateNotification(request.body.id, request.body.newName);
        response.json({ message: "Uspesno promenjeno obavestenje" });
    }
    catch (error) {
        response.status(409).json({ error: error });
    }
}));
router.route('/deleteNotifType').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        yield NotificationService_1.default.deleteNotifType(request.body.id);
        response.json({ message: "Uspesno obrisan tip obavestenja" });
    }
    catch (error) {
        response.status(409).json({ error: "Greska" });
    }
}));
router.route('/addNotifType').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        yield NotificationService_1.default.addNotifType(request.body.name);
        response.json({ message: "Uspesno dodato obavestenje" });
    }
    catch (error) {
        if (!error)
            error = "Greska";
        response.status(409).json({ error: error });
    }
}));
router.route('/addNotif').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        yield NotificationService_1.default.addNotif(request.body.notification);
        response.json({ message: "Uspesno dodato obavestenje" });
    }
    catch (error) {
        response.status(409).json({ error: "Greska" });
    }
}));
//Projects
router.route('/employeeProjects').get((request, response) => {
    EmployeeProjectService_1.default.getAllEmployeeProjects().then((projects) => {
        ////console.log(projects);
        response.json(projects);
    }).catch((err) => {
        response.status(500).send();
    });
});
router.route('/makeEmployeeProject').post(authentification.checkIfAuthenticated, (request, response) => {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    EmployeeProjectService_1.default.makeEmployeeProject(request.body.project).then((projects) => {
        ////console.log(projects);
        response.json({ message: 'Uspesno dodat projekat' });
    }).catch((err) => {
        response.status(500).json({ error: err });
    });
});
router.route('/offeredProjects').get((request, response) => {
    OfferedProjectService_1.default.getAllOfferedProject().then((offeredProjects) => {
        ////console.log(offeredProjects);
        response.json(offeredProjects);
    }).catch((err) => {
        response.status(500).send();
    });
});
router.route('/makeOfferedProjects').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log(request.body.project);
        yield OfferedProjectService_1.default.makeOfferedProject(request.body.project);
        response.json({ message: 'Uspesno dodat projekat' });
    }
    catch (error) {
        //console.log(error);
        response.status(505).json({ error: error });
    }
}));
//RegistrationFromHomePage
router.route("/registerStudent").post((request, response) => {
    UserService_1.default.saveStudent(request.body.student).then((message) => {
        ////console.log("asdfg" + message);
        response.status(200).json(message);
    }).catch((err) => {
        ////console.log("DDDDD" + err);
        response.status(504).json(err);
    });
    let student = new Student_1.Student(request.body.student);
    ////console.log("Student: " + JSON.stringify(student));
});
//Change password first time login
router.route("/changePassword").post((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let username = request.body.userName;
        let oldPassword = request.body.oldPassword;
        let newPassword = request.body.newPassword;
        ////console.log(request.body);
        if (!newPassword || newPassword.length == 0)
            throw "Nova lozinka ne sme biti prazna";
        //console.log(oldPassword);
        yield UserService_1.default.checkIfPasswordRight(oldPassword, username);
        //console.log("OVDE SAM1")
        let a = yield UserService_1.default.updatePassword(username, newPassword);
        //console.log("OVDE SAM2")
        //console.log("PROMENA" + a);
        response.status(200).send();
    }
    catch (error) {
        //console.log("GRESKA JE " + error);
        response.status(500).json(error);
    }
}));
//List of Employees
router.route("/employeeList/:status").get((request, response) => {
    UserService_1.default.getEmployeesList(request.params.status).then((employees) => __awaiter(void 0, void 0, void 0, function* () {
        let employeeBack = new Array();
        for (let employee of employees) {
            ////console.log(employee.username);
            let subjects = yield UserService_1.default.getEmployeeAsignedSubjcect(employee.username);
            let help = new Array();
            for (const subject of subjects) {
                help.push(subject.subject);
            }
            employeeBack.push({
                employee: employee,
                subjects: help
            });
        }
        response.json(employeeBack);
    }));
});
router.route("/employee/:id").get((request, response) => {
    let id = request.params.id;
    ////console.log(id);
    UserService_1.default.getEmployee(id).then((employee) => __awaiter(void 0, void 0, void 0, function* () {
        let subjects = yield UserService_1.default.getEmployeeAsignedSubjcect(employee.username);
        let help = new Array();
        for (const subject of subjects) {
            help.push(subject.subject);
        }
        response.json({
            employee: employee,
            subjects: help
        });
    })).catch((err) => { response.status(500).json(); });
});
router.route('/getAllSubjects/:odsek').get((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let odsek = request.params.odsek;
        //console.log(odsek);
        let subjects = yield SubjectService_1.default.getAllSubjectsBaseInfo(odsek);
        //console.log(subjects);
        response.json(subjects);
    }
    catch (error) {
        response.status(500).json(error);
    }
}));
router.route('/getGeneralInfo/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = request.params.id;
        let subject = yield SubjectService_1.default.getSubjectGeneralInfo(id);
        //console.log(subject);
        response.json(subject);
    }
    catch (error) {
        response.status(500).json(error);
    }
}));
router.route('/getGeneralInfoByObjectId/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = request.params.id;
        let subject = yield SubjectService_1.default.getGeneralInfoByObjectId(id);
        //console.log(subject);
        response.json(subject);
    }
    catch (error) {
        response.status(500).json(error);
    }
}));
router.route('/getNotifications/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = request.params.id;
        let subjectNot = yield SubjectService_1.default.getSubjectNotifications(id);
        //console.log(subjectNot);
        response.json(subjectNot);
    }
    catch (error) {
        response.status(500).json(error);
    }
}));
router.route('/getLectureMaterials/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield SubjectService_1.default.getLectureSubjectMaterials(request.params.id);
    //console.log("OVDE\n");
    //console.log(result);
    response.json(result);
}));
router.route('/getExerciseMaterials/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield SubjectService_1.default.getExerciseSubjectMaterials(request.params.id);
    //console.log(result);
    response.json(result);
}));
router.route('/getExamMaterials/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield SubjectService_1.default.getExamSubjectMaterials(request.params.id);
    //console.log(result);
    response.json(result);
}));
router.route('/getExamSolutionMaterials/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield SubjectService_1.default.getSubjectExamSolutionsMaterials(request.params.id);
    //console.log(result);
    response.json(result);
}));
router.route('/getExamTextMaterials/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield SubjectService_1.default.getSubjectExamTextMaterials(request.params.id);
        //console.log(result);
        response.json(result);
    }
    catch (_a) {
        response.status(502).json({ error: 'greska' });
    }
}));
router.route('/getSubjectLabMaterials/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield SubjectService_1.default.getSubjectLabMaterials(request.params.id);
    response.json(result);
}));
// router.route('/getSubjectLabMaterials/:id').get(authentification.checkIfAuthenticated, async (request: any, response: any) => {
//     let result = await SubjectService.getSubjectLabMaterials(request.params.id);
//     response.json(result);
// });
router.route('/getSubjectApplication/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield SubjectService_1.default.getSubjectApplication(request.params.id);
    response.json(result);
}));
router.route('/getSubjectProject/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield SubjectService_1.default.getSubjectProject(request.params.id);
        //console.log(result.project.projects.projectMaterials)
        response.json(result);
    }
    catch (_b) {
        response.status(502).json({ error: 'greska' });
    }
}));
router.route('/getLabProjectExamFlag/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield SubjectService_1.default.getLabProjectExamFlag(request.params.id);
        //console.log(result)
        response.json(result);
    }
    catch (err) {
        response.status(502).json({ error: err });
    }
}));
router.route('/getStudentSubject/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield SubjectService_1.default.getStudentSubject(request.params.id);
        response.json({ subjects: result });
    }
    catch (err) {
        response.status(502).json({ error: err });
    }
}));
router.route('/applyStudentToSubject').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield SubjectService_1.default.applyStudentToSubject(request.body.username, request.body.subject);
        response.status(200).json({ message: 'Student je uspesno prijavljen na predmet' });
    }
    catch (err) {
        //console.log(err);
        response.status(502).json({ error: err });
    }
}));
router.route('/applyStudentToSpisak').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield SubjectService_1.default.applyStudentToSpisak(request.body.spisakID, request.body.studentID, request.body.fileLink);
        response.status(200).json({ message: 'Student je uspesno prijavljen na spisak' });
    }
    catch (err) {
        //console.log(err);
        response.status(502).json({ error: err });
    }
}));
router.route('/getStudentSpisakApplication/:studentID').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield SubjectService_1.default.getStudentSpisakApplication(request.params.studentID);
        console.log(result);
        response.json({ body: result });
    }
    catch (error) {
        response.status(502).json({ error: error });
    }
}));
router.route('/predmetiSacuvaniFajlovi/:subject/:materials/:name').get(authentification.checkIfAuthenticated, function (request, response, next) {
    //console.log("ULAZIM");
    var filePath = __dirname + "/predmetiSacuvaniFajlovi/" + request.params.subject + "/" + request.params.materials + "/" + request.params.name;
    //console.log(filePath)
    response.download(filePath);
});
router.route('/predmetiSacuvaniFajlovi/:subject/spiskovi/:username/:fileName').get(authentification.checkIfAuthenticated, function (request, response, next) {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    //console.log("ULAZIM");
    var filePath = __dirname + "/predmetiSacuvaniFajlovi/" + request.params.subject + "/spiskovi/" + request.params.username + "/" + request.params.fileName;
    //console.log(filePath)
    response.download(filePath);
});
router.route('/slikeZaposlenih/:id').get(authentification.checkIfAuthenticated, function (request, response, next) {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    //console.log("ULAZIM");
    var filePath = __dirname + "/slikeZaposlenih/" + request.params.id;
    //console.log(filePath)
    response.download(filePath);
});
//Admin routes
router.route('/getAllStudents/:status').get((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getAllStudents(request.params.status);
        response.json({ students: result });
    }
    catch (error) {
        response.status(420).json(error);
    }
}));
router.route('/removeStudent').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.removeStudent(request.body.studentId);
        response.json({ message: 'Student uspesno obrisan' });
    }
    catch (error) {
        response.status(420).json(error);
    }
}));
router.route('/getStudent/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getStudent(request.params.id);
        response.json({ student: result });
    }
    catch (error) {
        response.status(420).json(error);
    }
}));
router.route('/updateStudent').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.updateStudent(request.body);
        response.json({ message: result });
    }
    catch (error) {
        response.status(420).json({ error: error });
    }
}));
router.route('/registrujZaposlenog').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.dodajZaposlenog(request.body.zaposlen);
        response.json({ message: result });
    }
    catch (error) {
        response.status(420).json({ error: error });
    }
}));
router.route('/employeesUsername/:status').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getEmployeesUsername(request.params.status);
        console.log(result);
        response.json(result);
    }
    catch (error) {
        response.status(420).json({ error: error });
    }
}));
router.route('/getEmployeNamebyUserName/:username').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getEmployeNamebyUserName(request.params.username);
        console.log(result);
        response.json(result);
    }
    catch (error) {
        response.status(420).json({ error: error });
    }
}));
router.route('/getAllTeachersUserName/:status').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getAllTeachersUserName(request.params.status);
        console.log(result);
        response.json(result);
    }
    catch (error) {
        response.status(420).json({ error: error });
    }
}));
router.route('/obrisiZaposlenog').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("EMPLOYEE " + request.body.employeeId);
        let result = yield UserService_1.default.removeEmployee(request.body.employeeId);
        console.log(result);
        response.json({ result });
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
}));
router.route('/changeEmployee').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("EMPLOYEE " + request.body.employee);
        let result = yield UserService_1.default.changeEmployee(request.body.employee);
        console.log(result);
        response.json({ result });
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
}));
router.route('/getAllSubjectsAllOdsek').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getAllSubjectsAllOdsek();
        console.log(result);
        response.json(result);
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
}));
router.route('/applySelectedStudents').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("EMPLOYEE " + request.body.employee)
        let result = yield UserService_1.default.applySelectedStudents(request.body.students, request.body.subjects);
        console.log(result);
        response.json({ message: result });
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
}));
router.route('/getAllApplys').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getAllApplys();
        console.log(result);
        response.json(result);
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
}));
router.route('/employeeID1/:username').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("CAO ovde sam");
    if (!Authorization_1.Authorization.isEmployee(request)) {
        response.status(500).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getEmployeeId(request.params.username);
        //console.log("RESa" + result);
        response.json(result._id);
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        //console.log("GRES" + error);
        response.status(400).json({ error: error });
    }
}));
router.route("/employeeSubjects/:username").get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.params.username);
    if (!Authorization_1.Authorization.isEmployee(request)) {
        response.status(420).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield UserService_1.default.getEmployeeSubject(request.params.username);
        console.log("RESa" + result);
        response.json(result);
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        console.log("GRES" + error);
        response.status(422).json({ error: error });
    }
}));
router.route('/createSubjectNotif').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("EMPLOYEE " + request.body.employee)
        let result = yield SubjectService_1.default.createNotif(request.body.subjectNotif, request.body.choosenSubject);
        console.log(result);
        response.json({ message: result });
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/getNotificationsAllSubject').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("EMPLOYEE " + request.body.employee)
        let result = yield SubjectService_1.default.getNotificationsAllSubjectateNotif();
        console.log(result);
        response.json(result);
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/deleteSubjectNotif').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("EMPLOYEE " + request.body.employee)
        let result = yield SubjectService_1.default.deleteSubjectNotif(request.body.id);
        console.log(result);
        response.json({ message: result });
    }
    catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/getSubjectNotif/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("Predmet obavestenje " + request.params.id);
        let result = yield SubjectService_1.default.getSubjectNotif(request.params.id);
        console.log(result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/deleteNotifMaterials/').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("Predmet obavestenje " + request);
        const path = `${__dirname}/predmetiSacuvaniFajlovi/all/information_materials/${request.body.name}`;
        fs_1.default.unlinkSync(path);
        response.json({ message: "Dodat uspesno obrisan" });
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/updateSubjectNotif').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("Predmet obavestenje " + request.params.id);
        console.log(request.body);
        let result = yield SubjectService_1.default.updateSubjectNotif(request.body);
        console.log(result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/getSubjectAssigmentPlan/:subject').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.getSubjectAssigmentPlan(request.params.subject);
        console.log(result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/updateAssigmentPlan').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.updateAssigmentPlan(request.body);
        console.log(result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/updateSubjectGeneralInfo').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.updateSubjectGeneralInfo(request.body);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/deleteSubject').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.deleteSubject(request.body.id);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/createSubjectLectureMaterials').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.createSubjectLectureMaterials(request.body.matinfo, request.body.id);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/createSubjectExerciseMaterials').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.createSubjectExerciseMaterials(request.body.matinfo, request.body.id);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
// router.route('/createSubjectProjekti').post(authentification.checkIfAuthenticated, async (request, response) => {
//     if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
//         response.status(409).json({ error: "Niste autorizovani" });
//         return;
//     }
//     try {
//         let result = await SubjectService.createSubjectProjekti(request.body.matinfo, request.body.id);
//         console.log(request.body);
//         response.json(result);
//     } catch (error) {
//         if (!error || error == {}) {
//             error = "Unkown error";
//         }
//         console.log(error);
//         response.status(420).json({ error: error });
//     }
// })
router.route('/createSubjectIspitniZadaciMaterials').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.createSubjectIspitniZadaciMaterials(request.body.matinfo, request.body.id);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/createSubjectIspitnaResenjaMaterials').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.createSubjectIspitnaResenjaMaterials(request.body.matinfo, request.body.id);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/deleteSubjectMaterials').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.deleteSubjectMaterials(request.body.name, request.body.id, request.body.type);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/azurirajRedosled').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.azurirajRedosled(request.body.materials, request.body.id, request.body.type);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/azurirajProjekteMaterials').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.azurirajProjekteMaterials(request.body.materials, request.body.subject_id, request.body.project_id);
        console.log("AZURIRANJE" + JSON.stringify(request.body));
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/azurirajLabMaterials').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = yield SubjectService_1.default.azurirajLabMaterials(request.body.materials, request.body.subject_id, request.body.lab_id);
        console.log("AZURIRANJE" + JSON.stringify(request.body));
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/azurirajInformacijeOProjektu').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = yield SubjectService_1.default.azurirajInformacijeOProjektu(request.body.subject_id, request.body.project);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/dodajSubjectProjekat').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = yield SubjectService_1.default.dodajSubjectProjekat(request.body.id, request.body.project);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/azurirajOpsteInformacijeOLabu').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = yield SubjectService_1.default.azurirajOpsteInformacijeOLabu(request.body.subject_id, request.body.info);
        console.log("AAA" + request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/azurirajLabInfo').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("LAB" + JSON.stringify(request.body));
        let result = yield SubjectService_1.default.azurirajLabInfo(request.body.subject_id, request.body.lab_id, request.body.info);
        console.log("AAA" + request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/obrisiLab').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = yield SubjectService_1.default.obrisiLab(request.body.subject_id, request.body.lab_id);
        console.log("AAA" + request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/obrisiProjekat').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = yield SubjectService_1.default.obrisiProjekat(request.body.subject_id, request.body.project_id);
        console.log("AAA" + request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/addSubjectLab').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = yield SubjectService_1.default.addSubjectLab(request.body.subject_id, request.body.lab);
        console.log(request.body);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/getShowProjects/:id/:type').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("OBBBBBB" + request.params.id);
        let result = yield SubjectService_1.default.getShowProjects(request.params.id, request.params.type);
        console.log("STA JE OVO" + result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/createSubject').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("OBBBBBB" + request.params.id);
        let result = yield SubjectService_1.default.createSubject(request.body.subjectInfo);
        console.log("STA JE OVO" + result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/mappSubject').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("OBBBBBB" + request.params.id);
        let result = yield SubjectService_1.default.mappSubject(request.body.subjectMappingInfo);
        console.log("STA JE OVO" + result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/azurirajPrikaz').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let subject_id = request.body.subject_id;
        let new_value = request.body.new_value;
        let type = request.body.type;
        let result = yield SubjectService_1.default.azurirajPrikaz(subject_id, new_value, type);
        console.log("STA JE OVO" + result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/getAllSubjectAllApplications/:id').get(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("OBBBBBB" + request.params.id);
        let result = yield SubjectService_1.default.getAllSubjectAllApplications(request.params.id);
        console.log("STA JE OVO" + result);
        response.json(result.subjectApply);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/getAllSpisakApplication').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("OBBBBBB" + request.params.id);
        let result = yield SubjectService_1.default.getAllSpisakApplication(request.body.subject_id, request.body.spisak_id);
        //console.log("STA JE OVO" + result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/napraviSpisak').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("OBBBBBB" + request.params.id);
        let result = yield SubjectService_1.default.napraviSpisak(request.body.subject_id, request.body.subjectApply);
        //console.log("STA JE OVO" + result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/zatvoriSpisak').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request) && !Authorization_1.Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("OBBBBBB" + request.params.id);
        let result = yield SubjectService_1.default.zatvoriSpisak(request.body.id, request.body.subject_id);
        //console.log("STA JE OVO" + result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
router.route('/createNewStudents').post(authentification.checkIfAuthenticated, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Authorization_1.Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("OBBBBBB" + request.params.id);
        let result = yield UserService_1.default.createNewStudents(request.body.students);
        //console.log("STA JE OVO" + result);
        response.json(result);
    }
    catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
}));
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.setHeader('Access-Control-Allow-Methods', 'POST');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/', router);
app.listen(4000, () => console.log('Express server running on port 4000'));
//# sourceMappingURL=server.js.map