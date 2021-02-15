

import mongoose, { connect } from 'mongoose';
import {  Student } from '../model/Student';



const students = [

    {
        username: "sd170145d@student.etf.rs",
        index: "2017/0145",
        studyType: "d",
        firstName: "Dusan",
        lastName: "Stijovic",
        status: "aktivan"
    }
];


async function seedStudents() {
    for (let s of students) {
        let student = new Student(s);
        await student.save()
    }
}


export { seedStudents };