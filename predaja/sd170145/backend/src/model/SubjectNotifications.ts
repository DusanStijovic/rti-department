import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SubjectNotifModel = new Schema({
    connectedSubject:{
        type: [String], 
        required: true
    },
    title: {
        type: String,
        required: false
    },
    dateCreation: {
        type: Date,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    materials: {
        type: [String],
        required: false
    }

});

export default mongoose.model('SubjectNotif', SubjectNotifModel, 'SubjectNotif');


