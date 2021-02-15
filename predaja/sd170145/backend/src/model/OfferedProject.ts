import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const OfferedProjectModel = new Schema({
    title:{
        type: String, 
        required: true
    }, 
    type: {
        type: String, 
        required: true
    }, 
    description:{
        type: String, 
        required: true
    },
    readMore:{
        type: String, 
        required: true
    }
});

export default mongoose.model("OfferedProject", OfferedProjectModel, "Offered" )