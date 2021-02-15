
import OfferedProject from '../model/OfferedProject';

export default class OfferedProjectService {

    static getAllOfferedProject() {
        return OfferedProject.find({}).select({ "_id": 0, "__v": 0 }).exec();
    }

    static async makeOfferedProject(notification: any) {
        if (!notification.title || !notification.type || !notification.description || !notification.readMore) throw "Morate unesti sva polja";
        await OfferedProject.create({
            title: notification.title,
            type: notification.type,
            description: notification.description,
            readMore: notification.readMore
        })
    }
}