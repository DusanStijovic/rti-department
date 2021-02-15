import express, { request, response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authentification = require('./services/Authentication')
import loginController = require('./controllers/LoginController')
import mongoose, { connect, mongo } from 'mongoose';
import { Authorization } from './services/Authorization';
import seed from './Seed/seed';
import NotificationService from './services/NotificationService';
import EmployeeProjectService from './services/EmployeeProjectService';
import OfferedProjectService from './services/OfferedProjectService';
import { Student } from './model/Student';
import UserService from './services/UserService';
import SubjectService from './services/SubjectService';
import multer from 'multer';
import fs from 'fs';
var path = require('path');


const app = express();
app.use(cors());

app.use(bodyParser.json());

var StudentWorkStorage = multer.diskStorage({
    destination: async function (request, file, cb) {
        let subject = request.params.subject;
        let subjectMat = request.params.materials;
        let name = request.params.student;
        let dir = __dirname + `/predmetiSacuvaniFajlovi/${subject}/${subjectMat}/${name}`;
        console.log(dir);
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
            }
            cb(null, dir);
        });

    },
    filename: function (request, file, cb) {

        console.log(file);
        cb(null, file.originalname);
    },

});

var SlikeZaposlenih = multer.diskStorage({
    destination: async function (request, file, cb) {
        let id = request.params.id;
        let dir = __dirname + `/slikeZaposlenih`;
        console.log(dir);
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
            }
            cb(null, dir);
        });

    },
    filename: function (request, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});


var StudentMaterialsStorage = multer.diskStorage({
    destination: async function (request, file, cb) {
        let subject = request.params.subject;
        let subjectMat = request.params.materials;

        let dir = __dirname + `/predmetiSacuvaniFajlovi/${subject}/${subjectMat}`;
        console.log(dir);
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
            }
            cb(null, dir);
        });

    },
    filename: function (request, file, cb) {

        console.log(file);
        cb(null, file.originalname);
    },

});
var uploadStudentWork = multer({
    storage: StudentWorkStorage,

    // fileFilter: (request, file, cb) => {
    //     var ext = path.extname(file.originalname);
    //     if (ext !== '.zip' && ext !== '.7z') {
    //         return cb(new Error('Only zip and 7z are allowed'));
    //     }
    //     cb(null, true)
    // }
}).single('file');


var uploadStudentMaterials = multer({
    storage: StudentMaterialsStorage,

    // fileFilter: (request, file, cb) => {
    //     var ext = path.extname(file.originalname);
    //     if (ext !== '.zip' && ext !== '.7z') {
    //         return cb(new Error('Only zip and 7z are allowed'));
    //     }
    //     cb(null, true)
    // }
}).array('file');



var uploudSlikaZaposlenog = multer({
    storage: SlikeZaposlenih

}).single('slika');



mongoose.connect('mongodb://localhost:27017/RTI_Katedra')
    .then(() => { console.log("Konektovan na bazu"); })
    .catch(() => {
        console.log("Nije moguce da se konektuje");
        process.exit();
    });
const connection = mongoose.connection;
connection.once('open', () => {
    //console.log('mongo connected');
});

const router = express.Router();


seed(connection);


router.route('/slikeZaposlenih').post(authentification.checkIfAuthenticated, (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    //console.log("CAO");
    try {
        //console.log(request.body);
        uploudSlikaZaposlenog(request, response, function (err: any) {
            if (err) {
                console.log("ssssss" + err);
                response.status(409).json({ error: err })
            }
            //console.log("ssssss" + request.file);
            console.log("aaaaaaaaaa" + err);
            response.end("Slika is uploaded successfully!");
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Greska' });
    }
})

router.route('/predmetiSacuvaniFajlovi/:subject/:materials').post(authentification.checkIfAuthenticated, (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log(request.body);
        uploadStudentMaterials(request, response, function (err: any) {
            if (err) {
                console.log("ssssss" + err);
                response.status(409).json({ error: err })
            }
            //console.log("ssssss" + request.file);
            console.log("aaaaaaaaaa" + err);
            response.end("File is uploaded successfully!");
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Greska' });
    }
})


router.route('/predmetiSacuvaniFajlovi/:subject/:materials/:student').post(authentification.checkIfAuthenticated, (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log(request.body);
        uploadStudentWork(request, response, function (err: any) {
            if (err) {
                console.log("ssssss" + err);
                response.status(409).json({ error: err })
            }
            //console.log("ssssss" + request.file);
            console.log("aaaaaaaaaa" + err);
            response.end("File is uploaded successfully!");
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Greska' });
    }
})


router.route('/login').post(loginController.login);

// router.route('/proba').get(authentification.checkIfAuthenticated, (request, response) => {
//     //console.log("ULAZIMO")
//     if (!Authorization.isEmployee(request)) response.json({ 'isOk': false });
//     //console.log("Prosli proveru");
//     response.json({ 'isOk': true });
// });


//Notifications
router.route('/notificationTypes').get((request, response) => {
    NotificationService.getNotificationsTypes()
        .then(((notTypes: any) => {
            console.log(notTypes);
            response.json(NotificationService.extraxtNotificationType(notTypes));
        }))
        .catch((err: any) => {
            response.status(500).send();
            ////console.log(err);
        });
});


router.route('/notificationTypesWithId').get((request, response) => {
    NotificationService.getNotificationsTypesWithId()
        .then(((notTypes: any) => {
            console.log(notTypes);
            response.json(notTypes);
        }))
        .catch((err: any) => {
            response.status(500).send();
            ////console.log(err);
        });
});

router.route('/notification/:notificationType').get((request, response) => {

    NotificationService.getNotifications(request.params['notificationType'])
        .then((notification: any) => {
            ////console.log(notification);
            response.json(notification);
        }).catch((err: any) => {
            response.status(500).send();
        });
});

router.route('/updateNotificationType').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        await NotificationService.updateNotification(request.body.id, request.body.newName);
        response.json({ message: "Uspesno promenjeno obavestenje" })
    } catch (error) {
        response.status(409).json({ error: error });
    }
})

router.route('/deleteNotifType').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        await NotificationService.deleteNotifType(request.body.id);
        response.json({ message: "Uspesno obrisan tip obavestenja" })
    } catch (error) {
        response.status(409).json({ error: "Greska" });
    }
})


router.route('/addNotifType').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        await NotificationService.addNotifType(request.body.name);
        response.json({ message: "Uspesno dodato obavestenje" })
    } catch (error) {
        if (!error) error = "Greska";
        response.status(409).json({ error: error });
    }
})


router.route('/addNotif').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        await NotificationService.addNotif(request.body.notification);
        response.json({ message: "Uspesno dodato obavestenje" })
    } catch (error) {
        response.status(409).json({ error: "Greska" });
    }
})

//Projects
router.route('/employeeProjects').get((request, response) => {
    EmployeeProjectService.getAllEmployeeProjects().then((projects: any) => {
        ////console.log(projects);
        response.json(projects);
    }).catch((err: any) => {
        response.status(500).send();
    });
})

router.route('/makeEmployeeProject').post(authentification.checkIfAuthenticated, (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    EmployeeProjectService.makeEmployeeProject(request.body.project).then((projects: any) => {
        ////console.log(projects);
        response.json({ message: 'Uspesno dodat projekat' });
    }).catch((err: any) => {
        response.status(500).json({ error: err });
    });
})



router.route('/offeredProjects').get((request, response) => {
    OfferedProjectService.getAllOfferedProject().then((offeredProjects: any) => {
        ////console.log(offeredProjects);
        response.json(offeredProjects);
    }).catch((err: any) => {
        response.status(500).send();
    });
})

router.route('/makeOfferedProjects').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log(request.body.project);
        await OfferedProjectService.makeOfferedProject(request.body.project);
        response.json({ message: 'Uspesno dodat projekat' });
    } catch (error) {
        //console.log(error);
        response.status(505).json({ error: error });
    }

});


//RegistrationFromHomePage
router.route("/registerStudent").post((request, response) => {
    UserService.saveStudent(request.body.student).then((message) => {
        ////console.log("asdfg" + message);
        response.status(200).json(message);
    }
    ).catch((err) => {
        ////console.log("DDDDD" + err);
        response.status(504).json(err);
    });
    let student = new Student(request.body.student);
    ////console.log("Student: " + JSON.stringify(student));
})

//Change password first time login
router.route("/changePassword").post(async (request, response) => {
    try {
        let username = request.body.userName;
        let oldPassword = request.body.oldPassword;
        let newPassword = request.body.newPassword;
        ////console.log(request.body);
        if (!newPassword || newPassword.length == 0) throw "Nova lozinka ne sme biti prazna"
        //console.log(oldPassword);
        await UserService.checkIfPasswordRight(oldPassword, username);
        //console.log("OVDE SAM1")
        let a = await UserService.updatePassword(username, newPassword);
        //console.log("OVDE SAM2")
        //console.log("PROMENA" + a);
        response.status(200).send();
    } catch (error) {
        //console.log("GRESKA JE " + error);
        response.status(500).json(error);
    }
});




//List of Employees
router.route("/employeeList/:status").get((request, response) => {
    UserService.getEmployeesList(request.params.status).then(async (employees: any) => {
        let employeeBack = new Array<any>();
        for (let employee of employees) {
            ////console.log(employee.username);
            let subjects = await UserService.getEmployeeAsignedSubjcect(employee.username);
            let help = new Array<String>();
            for (const subject of subjects) {
                help.push(subject.subject);
            }
            employeeBack.push({
                employee: employee,
                subjects: help
            });
        }
        response.json(employeeBack);
    });

});



router.route("/employee/:id").get((request, response) => {
    let id = request.params.id;
    ////console.log(id);
    UserService.getEmployee(id).then(async (employee: any) => {
        let subjects = await UserService.getEmployeeAsignedSubjcect(employee.username)
        let help = new Array<String>();
        for (const subject of subjects) {
            help.push(subject.subject);
        }
        response.json({
            employee: employee,
            subjects: help
        });
    }).catch((err: any) => { response.status(500).json() });

})


router.route('/getAllSubjects/:odsek').get(async (request, response) => {
    try {
        let odsek = request.params.odsek;
        //console.log(odsek);
        let subjects = await SubjectService.getAllSubjectsBaseInfo(odsek);
        //console.log(subjects);
        response.json(subjects);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.route('/getGeneralInfo/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    try {
        let id = request.params.id;
        let subject = await SubjectService.getSubjectGeneralInfo(id);
        //console.log(subject);
        response.json(subject);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.route('/getGeneralInfoByObjectId/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    try {
        let id = request.params.id;
        let subject = await SubjectService.getGeneralInfoByObjectId(id);
        //console.log(subject);
        response.json(subject);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.route('/getNotifications/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    try {
        let id = request.params.id;
        let subjectNot = await SubjectService.getSubjectNotifications(id);
        //console.log(subjectNot);
        response.json(subjectNot)
    } catch (error) {
        response.status(500).json(error);
    }
})


router.route('/getLectureMaterials/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    let result = await SubjectService.getLectureSubjectMaterials(request.params.id);
    //console.log("OVDE\n");
    //console.log(result);
    response.json(result);
})


router.route('/getExerciseMaterials/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    let result = await SubjectService.getExerciseSubjectMaterials(request.params.id);
    //console.log(result);
    response.json(result);
})


router.route('/getExamMaterials/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    let result = await SubjectService.getExamSubjectMaterials(request.params.id);
    //console.log(result);
    response.json(result);
})

router.route('/getExamSolutionMaterials/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    let result = await SubjectService.getSubjectExamSolutionsMaterials(request.params.id);
    //console.log(result);
    response.json(result);
})

router.route('/getExamTextMaterials/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    try {
        let result = await SubjectService.getSubjectExamTextMaterials(request.params.id);
        //console.log(result);
        response.json(result);
    } catch {
        response.status(502).json({ error: 'greska' });
    }
})



router.route('/getSubjectLabMaterials/:id').get(authentification.checkIfAuthenticated, async (request: any, response: any) => {
    let result = await SubjectService.getSubjectLabMaterials(request.params.id);
    response.json(result);
});

// router.route('/getSubjectLabMaterials/:id').get(authentification.checkIfAuthenticated, async (request: any, response: any) => {
//     let result = await SubjectService.getSubjectLabMaterials(request.params.id);
//     response.json(result);
// });



router.route('/getSubjectApplication/:id').get(authentification.checkIfAuthenticated, async (request: any, response: any) => {
    let result = await SubjectService.getSubjectApplication(request.params.id);
    response.json(result);
});

router.route('/getSubjectProject/:id').get(authentification.checkIfAuthenticated, async (request: any, response: any) => {
    try {
        let result = await SubjectService.getSubjectProject(request.params.id);
        //console.log(result.project.projects.projectMaterials)
        response.json(result);
    } catch {
        response.status(502).json({ error: 'greska' });
    }
});

router.route('/getLabProjectExamFlag/:id').get(authentification.checkIfAuthenticated, async (request: any, response: any) => {
    try {
        let result = await SubjectService.getLabProjectExamFlag(request.params.id);
        //console.log(result)
        response.json(result);
    } catch (err) {
        response.status(502).json({ error: err });
    }
});

router.route('/getStudentSubject/:id').get(authentification.checkIfAuthenticated, async (request: any, response: any) => {
    try {
        let result = await SubjectService.getStudentSubject(request.params.id);
        response.json({ subjects: result });
    } catch (err) {
        response.status(502).json({ error: err });
    }
});

router.route('/applyStudentToSubject').post(authentification.checkIfAuthenticated, async (request: any, response: any) => {
    try {
        await SubjectService.applyStudentToSubject(request.body.username, request.body.subject);
        response.status(200).json({ message: 'Student je uspesno prijavljen na predmet' });

    } catch (err) {
        //console.log(err);
        response.status(502).json({ error: err });
    }
});

router.route('/applyStudentToSpisak').post(authentification.checkIfAuthenticated, async (request: any, response: any) => {
    try {
        await SubjectService.applyStudentToSpisak(request.body.spisakID, request.body.studentID, request.body.fileLink);
        response.status(200).json({ message: 'Student je uspesno prijavljen na spisak' });
    } catch (err) {
        //console.log(err);
        response.status(502).json({ error: err });
    }
});

router.route('/getStudentSpisakApplication/:studentID').get(authentification.checkIfAuthenticated, async (request: any, response: any) => {
    try {
        let result = await SubjectService.getStudentSpisakApplication(request.params.studentID);
        console.log(result);
        response.json({ body: result });
    } catch (error) {
        response.status(502).json({ error: error });
    }
});

router.route('/predmetiSacuvaniFajlovi/:subject/:materials/:name').get(authentification.checkIfAuthenticated, function (request, response, next) {
    //console.log("ULAZIM");
    var filePath = __dirname + "/predmetiSacuvaniFajlovi/" + request.params.subject + "/" + request.params.materials + "/" + request.params.name;
    //console.log(filePath)
    response.download(filePath);

});


router.route('/predmetiSacuvaniFajlovi/:subject/spiskovi/:username/:fileName').get(authentification.checkIfAuthenticated, function (request, response, next) {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    //console.log("ULAZIM");
    var filePath = __dirname + "/predmetiSacuvaniFajlovi/" + request.params.subject + "/spiskovi/" + request.params.username + "/" + request.params.fileName;
    //console.log(filePath)
    response.download(filePath);

});


router.route('/slikeZaposlenih/:id').get(authentification.checkIfAuthenticated, function (request, response, next) {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    //console.log("ULAZIM");
    var filePath = __dirname + "/slikeZaposlenih/" + request.params.id;
    //console.log(filePath)
    response.download(filePath);
});


//Admin routes
router.route('/getAllStudents/:status').get(async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getAllStudents(request.params.status);
        response.json({ students: result });
    } catch (error) {
        response.status(420).json(error);
    }


});

router.route('/removeStudent').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.removeStudent(request.body.studentId);
        response.json({ message: 'Student uspesno obrisan' });
    } catch (error) {
        response.status(420).json(error);
    }
});


router.route('/getStudent/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getStudent(request.params.id);
        response.json({ student: result });
    } catch (error) {
        response.status(420).json(error);
    }
})

router.route('/updateStudent').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.updateStudent(request.body);
        response.json({ message: result });
    } catch (error) {
        response.status(420).json({ error: error });
    }
})


router.route('/registrujZaposlenog').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.dodajZaposlenog(request.body.zaposlen);
        response.json({ message: result });
    } catch (error) {
        response.status(420).json({ error: error });
    }
})

router.route('/employeesUsername/:status').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getEmployeesUsername(request.params.status);
        console.log(result);
        response.json(result);
    } catch (error) {
        response.status(420).json({ error: error });
    }
})

router.route('/getEmployeNamebyUserName/:username').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getEmployeNamebyUserName(request.params.username);
        console.log(result);
        response.json(result);
    } catch (error) {
        response.status(420).json({ error: error });
    }
})


router.route('/getAllTeachersUserName/:status').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getAllTeachersUserName(request.params.status);
        console.log(result);
        response.json(result);
    } catch (error) {
        response.status(420).json({ error: error });
    }
})

router.route('/obrisiZaposlenog').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("EMPLOYEE " + request.body.employeeId)
        let result = await UserService.removeEmployee(request.body.employeeId);
        console.log(result);
        response.json({ result });
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
})


router.route('/changeEmployee').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("EMPLOYEE " + request.body.employee)
        let result = await UserService.changeEmployee(request.body.employee);
        console.log(result);
        response.json({ result });
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
})

router.route('/getAllSubjectsAllOdsek').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getAllSubjectsAllOdsek();
        console.log(result);
        response.json(result);
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
})

router.route('/applySelectedStudents').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("EMPLOYEE " + request.body.employee)
        let result = await UserService.applySelectedStudents(request.body.students, request.body.subjects);
        console.log(result);
        response.json({ message: result });
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
})

router.route('/getAllApplys').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getAllApplys();
        console.log(result);
        response.json(result);
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        response.status(420).json({ error: error });
    }
})
router.route('/employeeID1/:username').get(authentification.checkIfAuthenticated, async (request, response) => {

    console.log("CAO ovde sam");
    if (!Authorization.isEmployee(request)) {
        response.status(500).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getEmployeeId(request.params.username);
        //console.log("RESa" + result);
        response.json(result._id);
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }

        //console.log("GRES" + error);
        response.status(400).json({ error: error });
    }
});

router.route("/employeeSubjects/:username").get(authentification.checkIfAuthenticated, async (request, response) => {
    console.log(request.params.username);
    if (!Authorization.isEmployee(request)) {
        response.status(420).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await UserService.getEmployeeSubject(request.params.username);
        console.log("RESa" + result);
        response.json(result);
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        console.log("GRES" + error);
        response.status(422).json({ error: error });
    }
})

router.route('/createSubjectNotif').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("EMPLOYEE " + request.body.employee)
        let result = await SubjectService.createNotif(request.body.subjectNotif, request.body.choosenSubject);
        console.log(result);
        response.json({ message: result });
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/getNotificationsAllSubject').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("EMPLOYEE " + request.body.employee)
        let result = await SubjectService.getNotificationsAllSubjectateNotif();
        console.log(result);
        response.json(result);
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/deleteSubjectNotif').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("EMPLOYEE " + request.body.employee)
        let result = await SubjectService.deleteSubjectNotif(request.body.id);
        console.log(result);
        response.json({ message: result });
    } catch (error) {
        if (!error) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/getSubjectNotif/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("Predmet obavestenje " + request.params.id);
        let result = await SubjectService.getSubjectNotif(request.params.id);
        console.log(result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/deleteNotifMaterials/').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("Predmet obavestenje " + request);
        const path = `${__dirname}/predmetiSacuvaniFajlovi/all/information_materials/${request.body.name}`;
        fs.unlinkSync(path);
        response.json({ message: "Dodat uspesno obrisan" });
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/updateSubjectNotif').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("Predmet obavestenje " + request.params.id);
        console.log(request.body);
        let result = await SubjectService.updateSubjectNotif(request.body);
        console.log(result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/getSubjectAssigmentPlan/:subject').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.getSubjectAssigmentPlan(request.params.subject);
        console.log(result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/updateAssigmentPlan').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.updateAssigmentPlan(request.body);
        console.log(result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/updateSubjectGeneralInfo').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.updateSubjectGeneralInfo(request.body);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/deleteSubject').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.deleteSubject(request.body.id);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/createSubjectLectureMaterials').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.createSubjectLectureMaterials(request.body.matinfo, request.body.id);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/createSubjectExerciseMaterials').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.createSubjectExerciseMaterials(request.body.matinfo, request.body.id);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

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


router.route('/createSubjectIspitniZadaciMaterials').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.createSubjectIspitniZadaciMaterials(request.body.matinfo, request.body.id);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/createSubjectIspitnaResenjaMaterials').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.createSubjectIspitnaResenjaMaterials(request.body.matinfo, request.body.id);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/deleteSubjectMaterials').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.deleteSubjectMaterials(request.body.name, request.body.id, request.body.type);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})


router.route('/azurirajRedosled').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.azurirajRedosled(request.body.materials, request.body.id, request.body.type);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/azurirajProjekteMaterials').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.azurirajProjekteMaterials(request.body.materials, request.body.subject_id, request.body.project_id);
        console.log("AZURIRANJE" + JSON.stringify(request.body));
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/azurirajLabMaterials').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let result = await SubjectService.azurirajLabMaterials(request.body.materials, request.body.subject_id, request.body.lab_id);
        console.log("AZURIRANJE" + JSON.stringify(request.body));
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})
router.route('/azurirajInformacijeOProjektu').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = await SubjectService.azurirajInformacijeOProjektu(request.body.subject_id, request.body.project);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/dodajSubjectProjekat').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = await SubjectService.dodajSubjectProjekat(request.body.id, request.body.project);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/azurirajOpsteInformacijeOLabu').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = await SubjectService.azurirajOpsteInformacijeOLabu(request.body.subject_id, request.body.info);
        console.log("AAA" + request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/azurirajLabInfo').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("LAB" + JSON.stringify(request.body));
        let result = await SubjectService.azurirajLabInfo(request.body.subject_id, request.body.lab_id, request.body.info);
        console.log("AAA" + request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/obrisiLab').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = await SubjectService.obrisiLab(request.body.subject_id, request.body.lab_id);
        console.log("AAA" + request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/obrisiProjekat').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = await SubjectService.obrisiProjekat(request.body.subject_id, request.body.project_id);
        console.log("AAA" + request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/addSubjectLab').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("PROJEKAT" + request.body);
        let result = await SubjectService.addSubjectLab(request.body.subject_id, request.body.lab);
        console.log(request.body);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/getShowProjects/:id/:type').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("OBBBBBB" + request.params.id);
        let result = await SubjectService.getShowProjects(request.params.id, request.params.type);
        console.log("STA JE OVO" + result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/createSubject').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("OBBBBBB" + request.params.id);
        let result = await SubjectService.createSubject(request.body.subjectInfo);
        console.log("STA JE OVO" + result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/mappSubject').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("OBBBBBB" + request.params.id);
        let result = await SubjectService.mappSubject(request.body.subjectMappingInfo);
        console.log("STA JE OVO" + result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/azurirajPrikaz').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        let subject_id = request.body.subject_id;
        let new_value = request.body.new_value;
        let type = request.body.type;

        let result = await SubjectService.azurirajPrikaz(subject_id, new_value, type);
        console.log("STA JE OVO" + result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/getAllSubjectAllApplications/:id').get(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        console.log("OBBBBBB" + request.params.id);
        let result = await SubjectService.getAllSubjectAllApplications(request.params.id);
        console.log("STA JE OVO" + result);
        response.json(result.subjectApply);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/getAllSpisakApplication').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("OBBBBBB" + request.params.id);
        let result = await SubjectService.getAllSpisakApplication(request.body.subject_id, request.body.spisak_id);
        //console.log("STA JE OVO" + result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/napraviSpisak').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("OBBBBBB" + request.params.id);
        let result = await SubjectService.napraviSpisak(request.body.subject_id, request.body.subjectApply);
        //console.log("STA JE OVO" + result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})

router.route('/zatvoriSpisak').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request) && !Authorization.isEmployee(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("OBBBBBB" + request.params.id);
        let result = await SubjectService.zatvoriSpisak(request.body.id, request.body.subject_id);
        //console.log("STA JE OVO" + result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})




router.route('/createNewStudents').post(authentification.checkIfAuthenticated, async (request, response) => {
    if (!Authorization.isAdmin(request)) {
        response.status(409).json({ error: "Niste autorizovani" });
        return;
    }
    try {
        //console.log("OBBBBBB" + request.params.id);
        let result = await UserService.createNewStudents(request.body.students);
        //console.log("STA JE OVO" + result);
        response.json(result);
    } catch (error) {
        if (!error || error == {}) {
            error = "Unkown error";
        }
        console.log(error);
        response.status(420).json({ error: error });
    }
})
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.setHeader('Access-Control-Allow-Methods', 'POST');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));