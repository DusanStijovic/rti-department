export class Student {
    username: string;
    password: string;
    index: string;
    studyType: string;
    firstName: string;
    lastName: string;
    status: string;
    type: string;

    constructor(student: Student) {
        this.firstName = student.firstName;
        this.lastName = student.lastName;
        this.index = student.index;
        this.password = student.password;
        this.status = student.password;
        this.studyType = student.studyType;
        this.type = student.type;
        this.username = student.type;
        this.status = student.status;
    }
}