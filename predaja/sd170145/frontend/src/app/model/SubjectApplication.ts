import { Data } from "@angular/router";

export default class SubjectApplication{
    currentApply: number;
    maxApply: number;
    name: string;
    time: Date;
    place: string;
    deadline: Date;
    _id: string;
    uploadFileNedded: boolean;
    open: true;
    isOpen: boolean;
}