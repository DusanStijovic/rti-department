import { BrowserModule } from '@angular/platform-browser';
import { Input, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './PagesPart/nav-bar/nav-bar.component';
import { TranslatePipe } from './translate/translate.pipe';
import { TRANSLATION_PROVIDERS } from './translate/translations';
import { TranslateService } from './translate/translate.service';
import { LoginComponent } from './HomePage/login/login.component';
import { DepartmentImageSlideComponent } from './HomePage/department-image-slide/department-image-slide.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/HttpInterceptor';
import { NotAutorizedAccessComponent } from './not-autorized-access/not-autorized-access.component'
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './RegisterPage/register/register.component';
import { RegisterStudentComponent } from './RegisterPage/register-student/register-student.component';
import { RegisterEmployeeComponent } from './RegisterPage/register-employee/register-employee.component';
import { KontaktComponent } from './ContactPage/kontakt/kontakt.component';
import { ScienceComponent } from './SciencePage/science/science.component';
import { ResearchComponent } from './SciencePage/research/research.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './ContactPage/google-map/google-map.component';
import { ResearchInfoCardComponent } from './SciencePage/research-info-card/research-info-card.component';
import { ContactInfoComponent } from './ContactPage/contact-info/contact-info.component';
import { InformationComponent } from './InformationPage/information/information.component';
import { SideBarComponent } from './PagesPart/side-bar/side-bar.component';
import { InformationCardComponent } from './InformationPage/information-card/information-card.component';
import { EmployeeProjectComponent } from './SciencePage/done-project/done-project.component';
import { EmployeeProjectCardComponent } from './SciencePage/done-project-card/employee-project-card.component';
import { OfferedProjectComponent } from './ProjectPage/offered-project/offered-project.component';
import { OfferedProjectCardComponent } from './ProjectPage/offered-project-card/offered-project-card.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { EmployeeListComponent } from './EmployePage/employee-list/employee-list.component';
import { EmployeeCardInfoComponent } from './EmployePage/employee-card-info/employee-card-info.component';
import { EmployeeDetailedInfoComponent } from './EmployePage/employee-detailed-info/employee-detailed-info.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ErrorPageComponent } from './PagesPart/error-page/error-page.component';
import { FirstLoginComponent } from './HomePage/first-login/first-login.component';
import { EncrDecrService } from './services/encr-decr.service';
import { ShowSubjectsComponent } from './SubjectPage/show-subjects/show-subjects.component';
import { SubjectComponent } from './SubjectPage/subject/subject.component';
import { SemestarComponent } from './SubjectPage/semestar/semestar.component';
import { SubjectDetailedInfoComponent } from './SubjectPage/subject-detailed-info/subject-detailed-info.component';
import { FooterComponent } from './PagesPart/footer/footer.component';
import { ShoInfoSubjectComponent } from './SubjectPage/sho-info-subject/sho-info-subject.component';
import { ShoMaterialsSubjectComponent } from './SubjectPage/sho-materials-subject/sho-materials-subject.component';
import { ShoLabSubjectComponent } from './SubjectPage/sho-lab-subject/sho-lab-subject.component';
import { ShoProjectSubjectComponent } from './SubjectPage/sho-project-subject/sho-project-subject.component';
import { ShowSubjectNotificationComponent } from './SubjectPage/show-subject-notification/show-subject-notification.component';
import { SubjectApplicationsComponent } from './SubjectPage/subject-applications/subject-applications.component';
import { SubjectInformationCardComponent } from './SubjectPage/subject-information-card/subject-information-card.component';
import { SubjectMaterialsTableComponent } from './SubjectPage/subject-materials-table/subject-materials-table.component';
import { OneLabInfoComponent } from './SubjectPage/one-lab-info/one-lab-info.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { EmployeeHomePageComponent } from './EmployeeHome/employee-home-page/employee-home-page.component';
import { AdminHomePageComponent } from './AdminHome/admin-home-page/admin-home-page.component';
import { RegisterEMployeeComponent } from './AdminHome/register-employee/register-employee.component';
import { ListaStudenataComponent } from './AdminHome/lista-studenata/lista-studenata.component';
import { AzurirajStudentaComponent } from './AdminHome/azuriraj-studenta/azuriraj-studenta.component';
import { TipoviObavestenjaComponent } from './AdminHome/tipovi-obavestenja/tipovi-obavestenja.component';
import { DodajObavestenjeComponent } from './AdminHome/dodaj-obavestenje/dodaj-obavestenje.component';
import { DodajNovoObavestenjeKojeSeNudiComponent } from './AdminHome/dodaj-novo-obavestenje-koje-se-nudi/dodaj-novo-obavestenje-koje-se-nudi.component';
import { DodajProjekatOdradjenComponent } from './AdminHome/dodaj-projekat-odradjen/dodaj-projekat-odradjen.component';
import { AzurirajZaposlenogComponent } from './AdminHome/azuriraj-zaposlenog/azuriraj-zaposlenog.component';
import { ListazaposlenihComponent } from './AdminHome/listazaposlenih/listazaposlenih.component';
import { PrijaviStudentaNaPredmetComponent } from './AdminHome/prijavi-studenta-na-predmet/prijavi-studenta-na-predmet.component';
import { AzuriranjeInformacijaComponent } from './EmployeeHome/azuriranje-informacija/azuriranje-informacija.component';
import { VestiOPredmetimaComponent } from './EmployeeHome/vesti-opredmetima/vesti-opredmetima.component';
import { DodajVestOPredmetuComponent } from './EmployeeHome/dodaj-vest-opredmetu/dodaj-vest-opredmetu.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AzurirajObavestenjeComponent } from './EmployeeHome/azuriraj-obavestenje/azuriraj-obavestenje.component';
import { ChangeSubjectNotificationsComponent } from './EmployeeHome/change-subject-notifications/change-subject-notifications.component';
import { MakeAssignmentPlanComponent } from './AdminHome/make-assignment-plan/make-assignment-plan.component';
import { AzurirajPredmetComponent } from './SubjectEdit/azuriraj-predmet/azuriraj-predmet.component';
import { IzmeniOpsteInformacijeOPredmetuComponent } from './SubjectEdit/izmeni-opste-informacije-opredmetu/izmeni-opste-informacije-opredmetu.component';
import { ObrisiPredmeteComponent } from './AdminHome/obrisi-predmete/obrisi-predmete.component';
import { AuthGuardEmployee } from './services/auth-gard-employee';
import { AuthGuardAdmin } from './services/auth-gard-admin';
import { UredjivanjeMaterjalaPredmetComponent } from './SubjectEdit/uredjivanje-materjala-predmet/uredjivanje-materjala-predmet.component';
import { PregledajSpiskoveComponent } from './SubjectEdit/pregledaj-spiskove/pregledaj-spiskove.component';
import { PregledSpiskaComponent } from './SubjectEdit/pregled-spiska/pregled-spiska.component';
import { AzurirajProjekteComponent } from './SubjectEdit/azuriraj-projekte/azuriraj-projekte.component';
import { AzurirajLaboveComponent } from './SubjectEdit/azuriraj-labove/azuriraj-labove.component';
import { DodajPredmetComponent } from './AdminHome/dodaj-predmet/dodaj-predmet.component';
import { CenterBarComponent } from './PagesPart/center-bar/center-bar.component';
import { AzurirajProjekteTableComponent } from './SubjectEdit/azuriraj-projekte-table/azuriraj-projekte-table.component';
import { AzurirajLaboveTableComponent } from './SubjectEdit/azuriraj-labove-table/azuriraj-labove-table.component';
import { NapraviSpisakComponent } from './SubjectEdit/napravi-spisak/napravi-spisak.component';
import { AuthGuardStudent } from './services/auth-student';
import { ReadCSVStudentsComponent } from './AdminHome/read-csvstudents/read-csvstudents.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TranslatePipe,
    LoginComponent,
    DepartmentImageSlideComponent,
    HomePageComponent,
    NotAutorizedAccessComponent,
    RegisterComponent,
    RegisterStudentComponent,
    RegisterEmployeeComponent,
    KontaktComponent,
    ContactInfoComponent,
    ScienceComponent,
    ResearchComponent,
    GoogleMapComponent,
    ResearchInfoCardComponent,
    InformationComponent,
    SideBarComponent,
    InformationCardComponent,
    EmployeeProjectComponent,
    EmployeeProjectCardComponent,
    OfferedProjectComponent,
    OfferedProjectCardComponent,
    StudentHomePageComponent,
    EmployeeListComponent,
    EmployeeCardInfoComponent,
    EmployeeDetailedInfoComponent,
    ErrorPageComponent,
    FirstLoginComponent,
    ShowSubjectsComponent,
    SubjectComponent,
    SemestarComponent,
    SubjectDetailedInfoComponent,
    FooterComponent,
    ShoInfoSubjectComponent,
    ShoMaterialsSubjectComponent,
    ShoLabSubjectComponent,
    ShoProjectSubjectComponent,
    ShowSubjectNotificationComponent,
    SubjectApplicationsComponent,
    SubjectInformationCardComponent,
    SubjectMaterialsTableComponent,
    OneLabInfoComponent,
    EmployeeHomePageComponent,
    AdminHomePageComponent,
    RegisterEMployeeComponent,
    ListaStudenataComponent,
    AzurirajStudentaComponent,
    TipoviObavestenjaComponent,
    DodajObavestenjeComponent,
    DodajNovoObavestenjeKojeSeNudiComponent,
    DodajProjekatOdradjenComponent,
    AzurirajZaposlenogComponent,
    ListazaposlenihComponent,
    PrijaviStudentaNaPredmetComponent,
    AzuriranjeInformacijaComponent,
    VestiOPredmetimaComponent,
    DodajVestOPredmetuComponent,
    AzurirajObavestenjeComponent,
    ChangeSubjectNotificationsComponent,
    MakeAssignmentPlanComponent,
    AzurirajPredmetComponent,
    IzmeniOpsteInformacijeOPredmetuComponent,
    ObrisiPredmeteComponent,
    UredjivanjeMaterjalaPredmetComponent,
    PregledajSpiskoveComponent,
    PregledSpiskaComponent,
    AzurirajProjekteComponent,
    AzurirajLaboveComponent,
    DodajPredmetComponent,
    CenterBarComponent,
    AzurirajProjekteTableComponent,
    AzurirajLaboveTableComponent,
    NapraviSpisakComponent,
    ReadCSVStudentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FileUploadModule,
    CKEditorModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyANzs8KdMSzNry4FEIJDoj0AGEnChgHVn4' })
  ],
  providers: [
    TRANSLATION_PROVIDERS, TranslateService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    EncrDecrService,
    AuthGuardEmployee,
    AuthGuardAdmin,
    AuthGuardStudent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
