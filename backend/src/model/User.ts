import mongoose from 'mongoose';


const Schema = mongoose.Schema;



const UserModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    firstLogin: {
        type: String,
        required: true,
        default: "yes"
    }
});








const User = mongoose.model("User", UserModel, "User");

export { User}