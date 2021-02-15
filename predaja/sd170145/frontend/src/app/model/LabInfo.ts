import SubjectMaterialsInfo from "./SubjectMaterialsInfo";

export default class LabInfo{
    _id: string;
    labName: string;
    description:string;
    materials: SubjectMaterialsInfo[]
}