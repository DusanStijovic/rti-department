class Assignment {
    subject: string;
    group: SubjectGroup[];
    employees: string[];
    _id: string;
}

class SubjectGroup {
    name: string;
    employees: string[];
    _id: string;
}

export { Assignment, SubjectGroup };