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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSubjectNotif = void 0;
const SubjectNotifications_1 = __importDefault(require("../model/SubjectNotifications"));
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
];
function seedSubjectNotif() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const notif of notifications) {
            yield SubjectNotifications_1.default.create(notif);
        }
    });
}
exports.seedSubjectNotif = seedSubjectNotif;
//# sourceMappingURL=SubjectNotifSeed.js.map