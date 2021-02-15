import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeProjectComponent } from './SciencePage/done-project/done-project.component';
import { EmployeeDetailedInfoComponent } from './EmployePage/employee-detailed-info/employee-detailed-info.component';
import { EmployeeListComponent } from './EmployePage/employee-list/employee-list.component';
import { ErrorPageComponent } from './PagesPart/error-page/error-page.component';
import { FirstLoginComponent } from './HomePage/first-login/first-login.component';
import { InformationComponent } from './InformationPage/information/information.component';
import { KontaktComponent } from './ContactPage/kontakt/kontakt.component';
import { NotAutorizedAccessComponent } from './not-autorized-access/not-autorized-access.component';
import { OfferedProjectComponent } from './ProjectPage/offered-project/offered-project.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { RegisterStudentComponent } from './RegisterPage/register-student/register-student.component';
import { RegisterComponent } from './RegisterPage/register/register.component';
import { ResearchComponent } from './SciencePage/research/research.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { ShowSubjectsComponent } from './SubjectPage/show-subjects/show-subjects.component';
import { ShoInfoSubjectComponent } from './SubjectPage/sho-info-subject/sho-info-subject.component';
import { ShoMaterialsSubjectComponent } from './SubjectPage/sho-materials-subject/sho-materials-subject.component';
import { ShoLabSubjectComponent } from './SubjectPage/sho-lab-subject/sho-lab-subject.component';
import { ShoProjectSubjectComponent } from './SubjectPage/sho-project-subject/sho-project-subject.component';
import { SubjectDetailedInfoComponent } from './SubjectPage/subject-detailed-info/subject-detailed-info.component';
import { ShowSubjectNotificationComponent } from './SubjectPage/show-subject-notification/show-subject-notification.component';
import { SubjectApplicationsComponent } from './SubjectPage/subject-applications/subject-applications.component';
import { EmployeeHomePageComponent } from './EmployeeHome/employee-home-page/employee-home-page.component';
import { AdminHomePageComponent } from './AdminHome/admin-home-page/admin-home-page.component';
import { RegisterEMployeeComponent } from './AdminHome/register-employee/register-employee.component';
import { ListaStudenataComponent } from './AdminHome/lista-studenata/lista-studenata.component';
import { AzurirajStudentaComponent } from './AdminHome/azuriraj-studenta/azuriraj-studenta.component';
import { TipoviObavestenjaComponent } from './AdminHome/tipovi-obavestenja/tipovi-obavestenja.component';
import { DodajObavestenjeComponent } from './AdminHome/dodaj-obavestenje/dodaj-obavestenje.component';
import { DodajNovoObavestenjeKojeSeNudiComponent } from './AdminHome/dodaj-novo-obavestenje-koje-se-nudi/dodaj-novo-obavestenje-koje-se-nudi.component';
import { DodajProjekatOdradjenComponent } from './AdminHome/dodaj-projekat-odradjen/dodaj-projekat-odradjen.component';
import { ListazaposlenihComponent } from './AdminHome/listazaposlenih/listazaposlenih.component';
import { AzurirajZaposlenogComponent } from './AdminHome/azuriraj-zaposlenog/azuriraj-zaposlenog.component';
import { PrijaviStudentaNaPredmetComponent } from './AdminHome/prijavi-studenta-na-predmet/prijavi-studenta-na-predmet.component';
import { AzuriranjeInformacijaComponent } from './EmployeeHome/azuriranje-informacija/azuriranje-informacija.component';
import { DodajVestOPredmetuComponent } from './EmployeeHome/dodaj-vest-opredmetu/dodaj-vest-opredmetu.component';
import { VestiOPredmetimaComponent } from './EmployeeHome/vesti-opredmetima/vesti-opredmetima.component';
import { AzurirajObavestenjeComponent } from './EmployeeHome/azuriraj-obavestenje/azuriraj-obavestenje.component';
import { ChangeSubjectNotificationsComponent } from './EmployeeHome/change-subject-notifications/change-subject-notifications.component';
import { MakeAssignmentPlanComponent } from './AdminHome/make-assignment-plan/make-assignment-plan.component';
import { AzurirajPredmetComponent } from './SubjectEdit/azuriraj-predmet/azuriraj-predmet.component';
import { IzmeniOpsteInformacijeOPredmetuComponent } from './SubjectEdit/izmeni-opste-informacije-opredmetu/izmeni-opste-informacije-opredmetu.component';
import { ObrisiPredmeteComponent } from './AdminHome/obrisi-predmete/obrisi-predmete.component';
import { AuthGuardAdmin } from './services/auth-gard-admin';
import { AuthGuardEmployee } from './services/auth-gard-employee';
import { UredjivanjeMaterjalaPredmetComponent } from './SubjectEdit/uredjivanje-materjala-predmet/uredjivanje-materjala-predmet.component';
import { PregledajSpiskoveComponent } from './SubjectEdit/pregledaj-spiskove/pregledaj-spiskove.component';
import { PregledSpiskaComponent } from './SubjectEdit/pregled-spiska/pregled-spiska.component';
import { AzurirajProjekteComponent } from './SubjectEdit/azuriraj-projekte/azuriraj-projekte.component';
import { AzurirajLaboveComponent } from './SubjectEdit/azuriraj-labove/azuriraj-labove.component';
import { NapraviSpisakComponent } from './SubjectEdit/napravi-spisak/napravi-spisak.component';
import { DodajPredmetComponent } from './AdminHome/dodaj-predmet/dodaj-predmet.component';
import { AuthGuardStudent } from './services/auth-student';
import { ReadCSVStudentsComponent } from './AdminHome/read-csvstudents/read-csvstudents.component';

const routes: Routes = [
  { path: 'register', component: RegisterStudentComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'istrazivanja', component: ResearchComponent },
  { path: '', pathMatch: 'full', redirectTo: '/pocetna' },
  { path: 'pocetna', component: HomePageComponent },
  { path: 'obavestenja', component: InformationComponent },
  { path: 'NotAutorizedAccess', component: InformationComponent },
  { path: 'uradjeniprojekti', component: EmployeeProjectComponent },
  { path: 'projekti', component: OfferedProjectComponent },
  { path: 'pocetnaStudent', component: StudentHomePageComponent },
  { path: 'listaZaposlenih', component: EmployeeListComponent },
  { path: 'listaZaposlenih/zaposlen/:id', component: EmployeeDetailedInfoComponent },
  { path: 'errorPage', component: ErrorPageComponent },
  { path: 'firstLogin', component: FirstLoginComponent },
  { path: 'predmeti/:odsek', component: ShowSubjectsComponent },
  {
    path: 'predmet/:id/Obavestenja', component: SubjectDetailedInfoComponent, canActivate: [AuthGuardStudent],
    children: [
      { path: '', component: ShowSubjectNotificationComponent, canActivate: [AuthGuardStudent], }
    ]
  },
  {
    path: 'predmet/:id/O predmetu', component: SubjectDetailedInfoComponent, canActivate: [AuthGuardStudent],
    children: [
      { path: '', component: ShoInfoSubjectComponent, canActivate: [AuthGuardStudent], }
    ]
  },
  {
    path: 'predmet/:id/Laboratorija', component: SubjectDetailedInfoComponent, canActivate: [AuthGuardStudent],
    children: [
      { path: '', component: ShoLabSubjectComponent, canActivate: [AuthGuardStudent], }
    ]
  },
  {
    path: 'predmet/:id/Projekat', component: SubjectDetailedInfoComponent, canActivate: [AuthGuardStudent],
    children: [
      { path: '', component: ShoProjectSubjectComponent, canActivate: [AuthGuardStudent], }
    ]
  },
  {
    path: 'predmet/:id/Spiskovi', component: SubjectDetailedInfoComponent, canActivate: [AuthGuardStudent],
    children: [
      { path: '', component: SubjectApplicationsComponent, canActivate: [AuthGuardStudent] }
    ]
  },
  {
    path: 'predmet/:id/:matName', component: SubjectDetailedInfoComponent, canActivate: [AuthGuardStudent],
    children: [
      { path: '', component: ShoMaterialsSubjectComponent, canActivate: [AuthGuardStudent] }
    ]
  },
  { path: 'studentHomePage', component: StudentHomePageComponent, canActivate: [AuthGuardStudent] },
  { path: 'employeeHomePage', component: EmployeeHomePageComponent, canActivate: [AuthGuardEmployee] },
  { path: 'adminHomePage', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin] },
  {
    path: 'adminHomePage/registruj studente', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: RegisterStudentComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/registruj zaposlenog', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: RegisterEMployeeComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/azuriraj-obrisi studente', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: ListaStudenataComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/azuriraj-obrisi studente/urediStudenta/:id', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: AzurirajStudentaComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/readCSVstudents', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: ReadCSVStudentsComponent, canActivate: [AuthGuardAdmin] }
    ]
  },

  {
    path: 'adminHomePage/dodaj tip obavestenja', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: TipoviObavestenjaComponent, canActivate: [AuthGuardAdmin] }
    ]
  },

  {
    path: 'adminHomePage/dodaj novo obavestenje', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: DodajObavestenjeComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/dodaj novi projekat koji se nudi', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: DodajNovoObavestenjeKojeSeNudiComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/dodaj novi projekat koji je odradjen', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: DodajProjekatOdradjenComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/azuriraj-obrisi zaposlene', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: ListazaposlenihComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/azuriraj-obrisi zaposlene/urediZaposlenog/:id', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: AzurirajZaposlenogComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/prijavi studenta na predmer', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: PrijaviStudentaNaPredmetComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'employeeHomePage/Izmeni opste informacije', component: EmployeeHomePageComponent, canActivate: [AuthGuardEmployee],
    children: [
      { path: '', component: AzuriranjeInformacijaComponent, canActivate: [AuthGuardEmployee] }
    ]
  },
  {
    path: 'employeeHomePage/Postavi obavestenje', component: EmployeeHomePageComponent,
    children: [
      { path: '', component: DodajVestOPredmetuComponent, canActivate: [AuthGuardEmployee] }
    ]
  },
  {
    path: 'employeeHomePage/izmeni-obrisi obavestenje', component: EmployeeHomePageComponent,
    children: [
      { path: '', component: VestiOPredmetimaComponent, canActivate: [AuthGuardEmployee] }
    ]
  },
  {
    path: 'employeeHomePage/izmeni-obrisi obavestenje/:id', component: EmployeeHomePageComponent,
    children: [
      { path: '', component: ChangeSubjectNotificationsComponent, canActivate: [AuthGuardEmployee] }
    ]
  },
  {
    path: 'adminHomePage/pravljenje plana angazovanja', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: MakeAssignmentPlanComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/obrisi predmete', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: ObrisiPredmeteComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'adminHomePage/dodaj novi predmet', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: DodajPredmetComponent, canActivate: [AuthGuardAdmin] }
    ]
  },
  {
    path: 'employeeHomePage/podesavanja predmeta', component: EmployeeHomePageComponent, canActivate: [AuthGuardEmployee],
    children: [
      {
        path: '', component: AzurirajPredmetComponent, children: [
          { path: 'opste/:id', component: IzmeniOpsteInformacijeOPredmetuComponent, canActivate: [AuthGuardEmployee] },
          { path: 'materijali/:tipMaterijala/:id', component: UredjivanjeMaterjalaPredmetComponent, canActivate: [AuthGuardEmployee] },
          { path: 'projekti/:id', component: AzurirajProjekteComponent, canActivate: [AuthGuardEmployee] },
          { path: 'labovi/:id', component: AzurirajLaboveComponent, canActivate: [AuthGuardEmployee] },
          { path: 'spiskovi/:id', component: PregledajSpiskoveComponent, canActivate: [AuthGuardEmployee] },
          { path: 'spiskoviKreiraj/:id', component: NapraviSpisakComponent, canActivate: [AuthGuardEmployee] },
          { path: 'spiskovi/:id/:spisak', component: PregledSpiskaComponent, canActivate: [AuthGuardEmployee] },
        ], canActivate: [AuthGuardEmployee]
      }
    ]
  },

  {
    path: 'adminHomePage/azuriraj predmete', component: AdminHomePageComponent, canActivate: [AuthGuardAdmin],
    children: [
      {
        path: '', component: AzurirajPredmetComponent, children: [
          { path: 'opste/:id', component: IzmeniOpsteInformacijeOPredmetuComponent, canActivate: [AuthGuardAdmin] },
          { path: 'materijali/:tipMaterijala/:id', component: UredjivanjeMaterjalaPredmetComponent },
          { path: 'projekti/:id', component: AzurirajProjekteComponent, canActivate: [AuthGuardAdmin] },
          { path: 'labovi/:id', component: AzurirajLaboveComponent, canActivate: [AuthGuardAdmin] },
          { path: 'spiskovi/:id', component: PregledajSpiskoveComponent, canActivate: [AuthGuardAdmin] },
          { path: 'spiskoviKreiraj/:id', component: NapraviSpisakComponent, canActivate: [AuthGuardAdmin] },
          { path: 'spiskovi/:id/:spisak', component: PregledSpiskaComponent, canActivate: [AuthGuardAdmin] },
        ], canActivate: [AuthGuardAdmin]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
