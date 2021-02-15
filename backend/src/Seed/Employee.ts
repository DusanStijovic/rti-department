import mongoose, { connect } from 'mongoose';
import {Employee } from '../model/Employe';






const employees = [
    {
        username: "duca@etf.bg.ac.rs",
        firstName: "Dusan",
        lastName: "Stijovic",
        address: "Vojvode Petra Petrovica 15, Petrovgrad",
        phoneNumber: "065/44-30-121",
        page: "www.google.com",
        bio: "Ja sam vaga u horoskopu.",
        title: "redovni profesor",
        roomNumber: 16,
        status: "aktivan",

    }
];


async function seedEmployees() {
    for (let e of employees) {
        let employee = new Employee(e);
        await employee.save();
    }
}

export { seedEmployees };