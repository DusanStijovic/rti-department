import { NumberValueAccessor } from "@angular/forms";

export class SubjectGeneralInfo {
    type: string
    semestar: number;
    name: string;
    id: string;
    weekly: {
        lecture: number;
        exercise: Number;
        lab: number;
    };
    espb: number;
    classTime: string[];
    propositions: string;
    subjectGoal: string;
    haveLab: boolean;
    department: string;
}