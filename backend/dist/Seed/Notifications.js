"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAllNotification = void 0;
const Notification_1 = require("../model/Notification");
const NotificationTypes = [
    { typeName: 'Obavestenja o konferencijama' },
    { typeName: 'Pozivi za takmicenja' },
    { typeName: 'Ponude za praksu' },
    { typeName: 'Ponude za posao' }
];
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
];
function seedNotificationsTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let oneType of NotificationTypes) {
            let newType = new Notification_1.NotificatonType(oneType);
            yield newType.save();
        }
    });
}
function seedNotifications() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let oneNotification of Notifications) {
            let newNotification = new Notification_1.Notification(oneNotification);
            yield newNotification.save();
        }
    });
}
function seedAllNotification() {
    seedNotificationsTypes();
    seedNotifications();
}
exports.seedAllNotification = seedAllNotification;
//# sourceMappingURL=Notifications.js.map