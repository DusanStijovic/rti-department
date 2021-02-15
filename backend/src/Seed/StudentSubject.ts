import StudentSubject from "../model/StudentSubject";
import  studentSubject from "../model/StudentSubject";


const studentSubjects = [

]



async function seedStudentSubject(){
    for (const subject of studentSubjects) {
        let newSubject = new StudentSubject(subject);
        await newSubject.save();
    }
}

export {seedStudentSubject};