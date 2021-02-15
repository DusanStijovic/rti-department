import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const AssignmentModel = new Schema({
    subject: {
        type: String,
        required: true
    },
    group: {
        type: [{
            name: {
                type: String,
                required: true
            },
            employees: {
                type: Array,
                required: true
            }
        }],
        required: true
    },
    employees: {
        type: Array,
        required: true
    }
});

const Assignment = mongoose.model("Assignment", AssignmentModel, "Assignment");

export { Assignment }