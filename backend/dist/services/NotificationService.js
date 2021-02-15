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
const Notification_1 = require("../model/Notification");
class NotificationService {
    static getNotificationsTypes() {
        return Notification_1.NotificatonType.find({}).select({ "_id": 0, "__v": 0 }).exec();
    }
    static getNotificationsTypesWithId() {
        return Notification_1.NotificatonType.find({}).select({ "__v": 0 }).exec();
    }
    static updateNotification(id, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            let old = yield Notification_1.NotificatonType.findOne({ $and: [{ typeName: newName }, { _id: { $ne: id } }] }).exec();
            if (old != null) {
                throw "Vec postoji obavestenje sa datim imenom";
            }
            let type = yield Notification_1.NotificatonType.findOne({ _id: id }).exec();
            type = type.typeName;
            console.log(type);
            console.log(newName);
            yield Notification_1.Notification.updateMany({ notificationType: type }, {
                notificationType: newName
            });
            yield Notification_1.NotificatonType.updateMany({ typeName: type }, { typeName: newName });
        });
    }
    static addNotifType(name) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(name);
            let type = yield Notification_1.NotificatonType.findOne({ typeName: name }).exec();
            if (type != null) {
                throw "Vec postoji tip sa datim imenom";
            }
            yield Notification_1.NotificatonType.create({
                typeName: name
            });
        });
    }
    static getNotifications(notType) {
        let query;
        //console.log(notType);
        if (notType == 'sva') {
            query = Notification_1.Notification.find({});
        }
        else
            query = Notification_1.Notification.find({ 'notificationType': notType });
        return query.select({ "_id": 0, "__v": 0 }).exec();
    }
    static extraxtNotificationType(notType) {
        let notifTypes = new Array();
        for (const oneType of notType) {
            notifTypes.push(oneType.typeName);
        }
        return notifTypes;
    }
    static deleteNotifType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let type = yield Notification_1.NotificatonType.findOne({ _id: id }).exec();
            type = type.typeName;
            yield Notification_1.Notification.deleteMany({ notificationType: type }).exec();
            yield Notification_1.NotificatonType.deleteOne({ _id: id }).exec();
        });
    }
    static addNotif(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Notification_1.Notification.create({
                title: notification.title,
                content: notification.content,
                readMore: notification.readMore,
                notificationType: notification.notificationType,
                dateCreation: new Date()
            });
        });
    }
}
exports.default = NotificationService;
//# sourceMappingURL=NotificationService.js.map