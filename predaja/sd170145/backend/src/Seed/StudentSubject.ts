import StudentSubject from "../model/StudentSubject";
import  studentSubject from "../model/StudentSubject";


const studentSubjects = [
    {
        userId: "bb124578m@student.etf.rs",
        subjectId: "13E112OS2"
    }, 
    {
        userId: "bb124578m@student.etf.rs",
        subjectId: "13S111P1"
    }, 
    {
        userId: "bb124578m@student.etf.rs",
        subjectId: "13S111АSP"
    }, 

]



async function seedStudentSubject(){
    for (const subject of studentSubjects) {
        let newSubject = new StudentSubject(subject);
        await newSubject.save();
    }
}

export {seedStudentSubject};