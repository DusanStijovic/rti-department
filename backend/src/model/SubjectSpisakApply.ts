import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const SubjectSpisakApplyModel = new Schema({
    studentID: {
        type: String,
        required: true
    },
    spisakID: {
        type: String,
        required: true,
    },
    materialLink: {
        type: String,
        required: false
    }
})

export default mongoose.model('SubjectSpisakApply', SubjectSpisakApplyModel, 'SubjectSpisakApply');

