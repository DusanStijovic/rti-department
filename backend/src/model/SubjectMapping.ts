import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const SubjectMappingModel = new Schema({
    subject_id: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    mapped_subject_id: {
        type: String,
        required: true
    }

});

export default mongoose.model("SubjectMapping", SubjectMappingModel, "SubjectMapping")