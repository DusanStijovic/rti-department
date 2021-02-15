import mongoose from 'mongoose';


const Schema = mongoose.Schema;



const EmployeeModel = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    page: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: Number,
        required: false,
        default: ''
    },
    status: {
        type: String,
        required: true,
    },
    pictureUrl: {
        type: String,
        required: false
    }

});


const Employee = mongoose.model("Employee", EmployeeModel, "Employee");



export { Employee }