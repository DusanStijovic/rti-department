import { Date } from "mongoose";
import SubjectNotifications from "../model/SubjectNotifications";


const notifications = [
    {
        title: 'Kolokvijum 1',
        dateCreation: '2020-09-09',
        content: 'Prvi kolokvijum ce se odrzati sledece nedelje, spremite se',
        materials: [],
        connectedSubject: ['13S111P1']
    },
    {
        title: 'Kolokvijum 2',
        dateCreation: Date.now(),
        content: 'Prvi kolokvijum ce se odrzati sledece nedelje, spremite se',
        materials: [],
        connectedSubject: ['13S111P1']
    },
    {
        title: 'Kolokvijum 3',
        dateCreation: Date.now(),
        content: 'Prvi kolokvijum ce se odrzati sledece nedelje, spremite se',
        materials: [],
        connectedSubject: ['13S111P1']
    },
    {
        title: 'Odbrana projekta',
        dateCreation: Date.now(),
        content: 'Prvi kolokvijum ce se odrzati sledece nedelje, spremite se',
        materials: [],
        connectedSubject: ['13S111P1']
    },
]


export async function seedSubjectNotif() {
    for (const notif of notifications) {
        await SubjectNotifications.create(notif);
    }
}