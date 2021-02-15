import mongoose, { mongo } from 'mongoose';


const Schema = mongoose.Schema;


const EmployeeProjectModel = new Schema({
    title: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    authors: {
        type: Array,
        required: true
    },
    readMore: {
        type: String,
        required: true
    }
});


export default mongoose.model("EmployeeProject", EmployeeProjectModel, "EmployeeProject");