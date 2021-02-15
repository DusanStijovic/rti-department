import e from "express";
import { Notification, NotificatonType } from "../model/Notification";

export default class NotificationService {
    static getNotificationsTypes() {
        return NotificatonType.find({}).select({ "_id": 0, "__v": 0 }).exec();
    }

    static getNotificationsTypesWithId() {
        return NotificatonType.find({}).select({ "__v": 0 }).exec();
    }

    static async updateNotification(id: string, newName: string) {
        let old = await NotificatonType.findOne({ $and: [{ typeName: newName }, { _id: { $ne: id } }] }).exec();
        if (old != null) {
            throw "Vec postoji obavestenje sa datim imenom";
        }
        let type = await NotificatonType.findOne({ _id: id }).exec();
        type = type.typeName;


        console.log(type);
        console.log(newName);
        await Notification.updateMany({ notificationType: type }, {
            notificationType: newName
        });

        await NotificatonType.updateMany({ typeName: type },
            { typeName: newName })

    }

    static async addNotifType(name: string) {
        console.log(name);
        let type = await NotificatonType.findOne({ typeName: name }).exec();
        if (type != null) {
            throw "Vec postoji tip sa datim imenom";
        }
        await NotificatonType.create({
            typeName: name
        })

    }
    static getNotifications(notType: string) {
        let query: any;
        //console.log(notType);
        if (notType == 'sva') {
            query = Notification.find({});
        }
        else
            query = Notification.find({ 'notificationType': notType });
        return query.select({ "_id": 0, "__v": 0 }).exec();
    }



    static extraxtNotificationType(notType: any) {
        let notifTypes = new Array<string>();
        for (const oneType of notType) {
            notifTypes.push(oneType.typeName);
        }
        return notifTypes;
    }


    static async deleteNotifType(id: string) {
        let type = await NotificatonType.findOne({ _id: id }).exec();
        type = type.typeName;
        await Notification.deleteMany({ notificationType: type }).exec();
        await NotificatonType.deleteOne({ _id: id }).exec();
    }

    static async addNotif(notification: any) {
        await Notification.create({
            title: notification.title,
            content: notification.content,
            readMore: notification.readMore,
            notificationType: notification.notificationType,
            dateCreation: new Date()
        });
    }
}

