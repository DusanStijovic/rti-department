import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const SubjectStudentApplyModel = new Schema({
  studentId:{
      type: String,
      required: true
  }, 
  subjectId: {
      type:String, 
      required: true,
  }, 
  materialLink: {
      type: String,
      required: false
  }
})

export default mongoose.model('SubjectStudentApply', SubjectStudentApplyModel, 'SubjectStudentApply');

