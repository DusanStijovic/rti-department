import { seedAllAssignments } from './Assignment'
import seedEmployeeProject from './EmployeeProject';
import { seedAllNotification } from './Notifications';
import seedOfferedProject from './OfferedProject';
import { seedStudentSubject } from './StudentSubject';
import { seedAllSubjects } from './Subject';
import { seedUsers } from './User'
import { seedStudents } from './Students'
import { seedEmployees } from './Employee'

import { seedSubjectNotif } from './SubjectNotifSeed'

function seed(connection: any): void {
    const clearDB = async () => {
        for (const key of Object.keys(connection.collections)) {
            await connection.collections[key].deleteMany({});
        }
        seedUsers();
        seedEmployees();
        seedStudents();
        seedAllAssignments();
        seedAllNotification();
        seedEmployeeProject();
        seedOfferedProject();
        seedAllSubjects();
        seedStudentSubject();
        seedSubjectNotif();
    }
    clearDB();
}

export default seed;

