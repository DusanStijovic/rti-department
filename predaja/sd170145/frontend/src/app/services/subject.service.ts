import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';

import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import SubjectApplication from '../model/SubjectApplication';

import User from '../model/User';
import { ShareLoginDataService } from './share-login-data.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private sharelogin: ShareLoginDataService) { }

  ngOnInit(): void {
    this.sharelogin.currentLoginUser.subscribe((user) => { this.logInUser = user; })
  }


  getAllSubjects(odsek: string) {
    return this.http.get(`${environment.api}/getAllSubjects/${odsek}`).pipe(shareReplay());
  }

  getGeneralSubjectInfo(subjectId: string) {
    return this.http.get(`${environment.api}/getGeneralInfo/${subjectId}`).pipe(shareReplay());
  }

  getGeneralSubjectInfoByObjectId(subjectId: string) {
    return this.http.get(`${environment.api}/getGeneralInfoByObjectId/${subjectId}`).pipe(shareReplay());
  }

  getAllNotificationsSubject(id: string) {
    return this.http.get(`${environment.api}/getNotifications/${id}`).pipe(shareReplay());
  }

  getAllSubjectLectureMaterials(id: string) {
    return this.http.get(`${environment.api}/getLectureMaterials/${id}`).pipe(shareReplay());
  }
  getAllSubjectExerciseMaterials(id: string) {
    return this.http.get(`${environment.api}/getExerciseMaterials/${id}`).pipe(shareReplay());
  }

  getAllSubjectExamMaterials(id: string) {
    return this.http.get(`${environment.api}/getExamMaterials/${id}`).pipe(shareReplay());
  }

  getAllSubjectExamSolutionMaterials(id: string) {
    return this.http.get(`${environment.api}/getExamSolutionMaterials/${id}`).pipe(shareReplay());
  }
  getAllSubjectExamTextMaterials(id: string) {
    return this.http.get(`${environment.api}/getExamTextMaterials/${id}`).pipe(shareReplay());
  }


  getAllSubjectLabMaterials(id: string) {
    return this.http.get(`${environment.api}/getSubjectLabMaterials/${id}`).pipe(shareReplay());
  }

  getAllSubjectApplications(id: string) {
    return this.http.get(`${environment.api}/getSubjectApplication/${id}`).pipe(shareReplay());
  }

  getAllSubjectProject(id: string) {
    return this.http.get(`${environment.api}/getSubjectProject/${id}`).pipe(shareReplay());
  }

  getLabProjectExamFlag(id: string) {
    return this.http.get(`${environment.api}/getLabProjectExamFlag/${id}`).pipe(shareReplay());
  }

  getAllStudentSubject(student: string) {
    return this.http.get(`${environment.api}/getStudentSubject/${student}`).pipe(shareReplay());
  }


  applyStudentToSubject(username: string, subjectId: string) {
    return this.http.post(`${environment.api}/applyStudentToSubject`, { username: username, subject: subjectId }).pipe(shareReplay());
  }

  applyStudentToSpisak(spisakID: string, studentID: string, fileLink: string) {
    return this.http.post(`${environment.api}/applyStudentToSpisak`, {
      spisakID: spisakID,
      studentID: studentID,
      fileLink: fileLink
    }).pipe(shareReplay());
  }

  getAllStudentSpisakApplication(studentID: string) {
    return this.http.get(`${environment.api}/getStudentSpisakApplication/${studentID}`).pipe(shareReplay());
  }

  getAllSubjectsAllOdsek() {
    return this.http.get(`${environment.api}/getAllSubjectsAllOdsek`).pipe(shareReplay());
  }


  createSubjectNotif(notif: any) {
    return this.http.post(`${environment.api}/createSubjectNotif`, notif).pipe(shareReplay());
  }

  getAllNotifications() {
    return this.http.get(`${environment.api}/getNotificationsAllSubject/`).pipe(shareReplay());
  }

  deleteSubjectNotif(id: string) {
    return this.http.post(`${environment.api}/deleteSubjectNotif/`, { id: id }).pipe(shareReplay());
  }

  getSubjectNotif(id: string) {
    return this.http.get(`${environment.api}/getSubjectNotif/${id}`).pipe(shareReplay());
  }

  deleteNotifMaterials(name: string) {
    return this.http.post(`${environment.api}/deleteNotifMaterials/`, { name: name }).pipe(shareReplay());
  }

  updateSubjectNotif(subjectNotif: any) {
    return this.http.post(`${environment.api}/updateSubjectNotif/`, subjectNotif).pipe(shareReplay());
  }

  getSubjectAssigmentPlan(subject: string) {
    return this.http.get(`${environment.api}/getSubjectAssigmentPlan/${subject}`).pipe(shareReplay());
  }
  updateAssigmentPlan(subjectPlan: any) {
    return this.http.post(`${environment.api}/updateAssigmentPlan/`, subjectPlan).pipe(shareReplay());
  }

  deleteSubject(id: string) {
    return this.http.post(`${environment.api}/deleteSubject/`, { id: id }).pipe(shareReplay());
  }

  updateSubjectGeneralInfo(info: any, id: string) {
    return this.http.post(`${environment.api}/updateSubjectGeneralInfo/`, { info: info, id: id }).pipe(shareReplay());
  }

  createSubjectLectureMaterials(matinfo: any, id: string) {
    return this.http.post(`${environment.api}/createSubjectLectureMaterials/`, { matinfo: matinfo, id: id }).pipe(shareReplay());
  }

  createSubjectProjekti(matinfo: any, id: string) {
    return this.http.post(`${environment.api}/createSubjectProjekti/`, { matinfo: matinfo, id: id }).pipe(shareReplay());
  }

  createSubjectExerciseMaterials(matinfo: any, id: string) {
    return this.http.post(`${environment.api}/createSubjectExerciseMaterials/`, { matinfo: matinfo, id: id }).pipe(shareReplay());
  }


  createSubjectIspitniZadaciMaterials(matinfo: any, id: string) {
    return this.http.post(`${environment.api}/createSubjectIspitniZadaciMaterials/`, { matinfo: matinfo, id: id }).pipe(shareReplay());
  }

  createSubjectIspitnaResenjaMaterials(matinfo: any, id: string) {
    return this.http.post(`${environment.api}/createSubjectIspitnaResenjaMaterials/`, { matinfo: matinfo, id: id }).pipe(shareReplay());
  }


  azurirajRedosled(materials: any, id: string, type: string) {
    return this.http.post(`${environment.api}/azurirajRedosled/`, { materials: materials, id: id, type: type }).pipe(shareReplay());
  }

  deleteSubjectMaterials(matinfo: any, id: string, type: string) {
    return this.http.post(`${environment.api}/deleteSubjectMaterials/`, { name: matinfo, id: id, type: type }).pipe(shareReplay());
  }

  getAllSubjectAllApplications(id: string) {
    return this.http.get(`${environment.api}/getAllSubjectAllApplications/${id}`).pipe(shareReplay());
  }

  zatvoriSpisak(id: string, subject_id: string) {
    return this.http.post(`${environment.api}/zatvoriSpisak/`, { id: id, subject_id: subject_id }).pipe(shareReplay());
  }

  azurirajProjekteMaterials(materials: any, subject_id: string, project_id: string) {
    return this.http.post(`${environment.api}/azurirajProjekteMaterials/`, { materials: materials, subject_id: subject_id, project_id: project_id }).pipe(shareReplay());
  }




  azurirajLabMaterials(materials: any, subject_id: string, lab_id: string) {
    return this.http.post(`${environment.api}/azurirajLabMaterials/`, { materials: materials, subject_id: subject_id, lab_id: lab_id }).pipe(shareReplay());
  }


  dodajProjekat(id: string, project: any) {
    return this.http.post(`${environment.api}/dodajSubjectProjekat/`, { id: id, project: project }).pipe(shareReplay());
  }

  azurirajInformacijeOProjektu(subject_id: any, project: any) {
    return this.http.post(`${environment.api}/azurirajInformacijeOProjektu/`, { subject_id: subject_id, project: project }).pipe(shareReplay());
  }
  getShow(subject_id: string, type: string) {
    return this.http.get(`${environment.api}/getShowProjects/${subject_id}/${type}`).pipe(shareReplay());
  }
  azurirajPrikaz(subject_id: string, new_value: boolean, type: string) {
    return this.http.post(`${environment.api}/azurirajPrikaz`, {
      subject_id: subject_id,
      new_value: new_value,
      type: type
    }).pipe(shareReplay());
  }

  addSubjectLab(subject_id: string, lab: any) {

    return this.http.post(`${environment.api}/addSubjectLab`, {
      subject_id: subject_id,
      lab: lab
    }).pipe(shareReplay());
  }

  azurirajOpsteInformacijeOLabu(subject_id: string, info: any) {
    return this.http.post(`${environment.api}/azurirajOpsteInformacijeOLabu`, {
      subject_id: subject_id,
      info: info
    }).pipe(shareReplay());
  }



  azurirajLabInfo(subject_id: string, lab_id: string, info: any) {
    return this.http.post(`${environment.api}/azurirajLabInfo`, {
      subject_id: subject_id,
      lab_id: lab_id,
      info: info
    }).pipe(shareReplay());
  }

  obrisiLab(subject_id: string, lab_id: string) {
    return this.http.post(`${environment.api}/obrisiLab`, {
      subject_id: subject_id,
      lab_id: lab_id
    }).pipe(shareReplay());
  }



  obrisiProjekat(subject_id: string, project_id: string) {
    return this.http.post(`${environment.api}/obrisiProjekat`, {
      subject_id: subject_id,
      project_id: project_id
    }).pipe(shareReplay());
  }


  getAllSpisakApplication(subject_id: string, spisak_id: string) {
    return this.http.post(`${environment.api}/getAllSpisakApplication`, {
      subject_id: subject_id,
      spisak_id: spisak_id
    }).pipe(shareReplay());
  }

  napraviSpisak(subject_id: string, subjectApply: SubjectApplication) {
    return this.http.post(`${environment.api}/napraviSpisak`, {
      subject_id: subject_id,
      subjectApply: subjectApply
    }).pipe(shareReplay());
  }


  createSubject(subjectInfo: any) {
    return this.http.post(`${environment.api}/createSubject`, {
      subjectInfo: subjectInfo
    }).pipe(shareReplay());
  }

  mappSubject(subjectMappingInfo: any) {
    return this.http.post(`${environment.api}/mappSubject`, {
      subjectMappingInfo: subjectMappingInfo
    }).pipe(shareReplay());
  }

  //TO DO
  deleteSubjectMapping(subjectMappingInfo: any) {
    return this.http.post(`${environment.api}/deleteSubjectMapping`, {
      subjectMappingInfo: subjectMappingInfo
    }).pipe(shareReplay());
  }

  logInUser: User;
  subscribe: Subscription;
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
