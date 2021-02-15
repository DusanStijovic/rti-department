import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const StudentSubjectModel = new Schema({
    userId: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        require: true
    }
});


const StudentSubject = mongoose.model("StudentSubject", StudentSubjectModel,"StudentSubject");
export default StudentSubject;