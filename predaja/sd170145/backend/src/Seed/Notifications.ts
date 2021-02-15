
import mongoose, { connect } from 'mongoose';
import { Notification, NotificatonType } from '../model/Notification';


const NotificationTypes = [
    { typeName: 'Obavestenja o konferencijama' },
    { typeName: 'Pozivi za takmicenja' },
    { typeName: 'Ponude za praksu' },
    { typeName: 'Ponude za posao' }
]

const Notifications = [
    {
        title: 'Hash code',
        content: 'Poznato Takmicenje koje organizuje Google, pridruzite nam se!',
        readMore: 'https://hashcode.withgoogle.com/',
        notificationType: 'Pozivi za takmicenja'
    },
    {
        title: 'Bubble Cup',
        content: 'Poznato Takmicenje koje organizuje Microsoft, pridruzite nam se!',
        readMore: 'https://www.bubblecup.org/',
        notificationType: 'Pozivi za takmicenja'
    },
    {
        title: 'Hash code',
        content: 'Poznato Takmicenje koje organizuje Google, pridruzite nam se!',
        readMore: 'https://hashcode.withgoogle.com/',
        notificationType: 'Pozivi za takmicenja'
    },
    {
        title: 'Sinergia',
        content: 'Sinergija je jedna od najvećih i najuticajnjijih godišnjih\
         konferencija posvećena digitalnoj transformaciji, informaciono-komunikacionim\
          tehnologijama i njihovoj poslovnoj primeni u regionu Jugoistočne Evrope, koja se ove \
          godine održava dvadeseti put za redom.',
        readMore: 'https://sinergija.live/Home/About',
        notificationType: 'Obavestenja o konferencijama'
    }, {
        title: 'Telfor',
        content: 'Telekomunikacioni forum TELFOR je INTERNACIONALNI godišnji\
         skup stručnjaka koji rade u oblastima telekomunikacija i informacionih tehnologija.',
        readMore: 'https://www.telfor.rs/',
        notificationType: 'Obavestenja o konferencijama',
        dateCreation: new Date("2020-09-09T15:21:18.808Z")
    },
    {
        title: 'RT-RK',
        content: 'U saradnji sa fakultetima u Novom Sadu i Beogradu nudimo mogućnost stipendirane izrade BSc ili  MSc rada.',
        readMore: 'https://rt-rk.talentlyft.com/jobs/student-scholarship-cbF',
        notificationType: 'Ponude za praksu'
    }

]




async function seedNotificationsTypes() {
    for (let oneType of NotificationTypes) {
        let newType = new NotificatonType(oneType);
        await newType.save();
    }
}


async function seedNotifications() {
    for (let oneNotification of Notifications) {
        let newNotification = new Notification(oneNotification);
        await newNotification.save()
    }
}

function seedAllNotification(): void {
    seedNotificationsTypes();
    seedNotifications();

}


export { seedAllNotification }

