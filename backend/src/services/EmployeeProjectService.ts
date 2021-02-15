import EmployeeProject from "../model/EmployeeProjects";

export default class EmployeeProjectService {

  static getAllEmployeeProjects() {
    return EmployeeProject.find({}).select({ "_id": 0, "__v": 0 }).exec();
  }

  static async makeEmployeeProject(project: any) {
    if (!project.title || !project.readMore || !project.description) throw "Morate popuniti polja";
    await EmployeeProject.create({
      title: project.title,
      readMore: project.readMore,
      description: project.description,
      authors: project.authors
    })
  }
}