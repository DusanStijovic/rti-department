
import mongoose, { connect } from 'mongoose';
import { Assignment } from '../model/Assignment';

const assignments = [
    {
        subject: "13S111P1",
        group: [
            {
                name: "Predavanje1",
                employees: ["duca@etf.bg.ac.rs"]
            },
            {
                name: "Predavanje2",
                employees: ["duca@etf.bg.ac.rs"]
            },
            {
                name: "Vezbe1",
                employees: ["duca@etf.bg.ac.rs"]
            }
        ],
        employees: [ "duca@etf.bg.ac.rs"],
    },
    {
        subject: "13E112OS2",

        group: [
            {
                name: "Predavanje1",
                employees: ["duca@etf.bg.ac.rs"]
            },
            {
                name: "Vezbe1",
                employees: ["duca@etf.bg.ac.rs"]
            }
        ],
        employees: ["duca@etf.bg.ac.rs"],
    },
    {
        subject: "13S111АSP",

        group: [
            {
                name: "Predavanje1",
                employees: ["duca@etf.bg.ac.rs"]
            },
            {
                name: "Predavanje2",
                employees: ["duca@etf.bg.ac.rs"]
            }
        ],
        employees: [ "duca@etf.bg.ac.rs"],
    },
];

async function seedAssignments() {
    for (let a of assignments) {
        let assignment = new Assignment(a);
        try {
            await assignment.save();
        } catch (error) {
        }

    }
}

function seedAllAssignments(): void {
    seedAssignments();

}

export { seedAllAssignments }