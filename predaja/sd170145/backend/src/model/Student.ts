import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const StudentModel = new Schema({
    username: {
        type: String,
        required: true
    },
    index: {
        type: String,
        required: true
    },
    studyType: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
});




const Student = mongoose.model("Student", StudentModel, "Student");

export {Student }