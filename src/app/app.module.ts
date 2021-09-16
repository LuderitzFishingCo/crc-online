import { LessonRating, QuestionBankCategory } from './interfaces/index';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent, ApplyTeacher, UserNav } from './pages/user/user.component';
import { LearnerComponent, LearnerHome } from './pages/learner/learner.component';
import { SubComponentsComponent } from './sub-components/sub-components.component';
import { NavbarComponent } from './sub-components/navbar/navbar.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatTableModule } from '@angular/material/table';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { LoginComponent, LoginNav } from './pages/user/login/login.component';
import { ProfileComponent, DeleteProfile } from './pages/user/profile/profile.component';
import { UserMenuComponent } from './sub-components/user-menu/user-menu.component';
import { CoursesComponent, SearchCourse, SermonComponent, RegisterCourse, PayCourse } from './pages/courses/courses.component';
import { LearnerMenuComponent } from './sub-components/learner-menu/learner-menu.component';
import { LearnerCourseComponent, LearnerLesson, LearnerLessons, LessonRatingComponent, Leaderboard, LearnerGrade } from './pages/learner/learner-course/learner-course.component';
import { TeacherComponent, LearnersGrade, GenerateCertifcate, TeacherNav } from './pages/teacher/teacher.component';
import { LessonsComponent, CreateLessonSlotComponent, CreateLessonComponent, AssignLessonSlotComponent, ViewLessonSlots } from './pages/lessons/lessons.component';
import { ModalComponent } from './sub-components/modal/modal.component';
import { QuestionComponent, QuestionBankComponent, QuestionsComponent, ViewQuestionBank } from './pages/lessons/question/question.component';
import { QuizComponent, AssignQuizComponent } from './pages/lessons/quiz/quiz.component';
import { AdministratorComponent, ApplicationComponent, PaymentComponent, AssignTeacher } from './pages/administrator/administrator.component';
import { CourseComponent, ViewCourses } from './pages/administrator/course/course.component';
import { UserRoleComponent } from './pages/administrator/user-role/user-role.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LineChartComponent } from './pages/reports/line-chart/line-chart.component';
import { BarChartComponent } from './pages/reports/bar-chart/bar-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LearnerComponent,
    SubComponentsComponent,
    NavbarComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    LoginComponent,
    ProfileComponent,
    DeleteProfile,
    UserMenuComponent,
    CoursesComponent,
    SearchCourse,
    SermonComponent,
    RegisterCourse,
    PayCourse,
    ApplyTeacher,
    LearnerMenuComponent,
    LearnerHome,
    LearnerCourseComponent,
    LearnerLesson,
    LearnerLessons,
    LessonRatingComponent,
    Leaderboard,
    LearnerGrade,
    TeacherComponent,
    LessonsComponent,
    ModalComponent,
    CreateLessonSlotComponent,
    CreateLessonComponent,
    AssignLessonSlotComponent,
    QuestionComponent,
    QuestionBankComponent,
    QuestionsComponent,
    QuizComponent,
    AssignQuizComponent,
    LearnersGrade,
    GenerateCertifcate,
    AdministratorComponent,
    ApplicationComponent,
    PaymentComponent,
    CourseComponent,
    AssignTeacher,
    UserRoleComponent,
    ReportsComponent,
    LineChartComponent,
    BarChartComponent,
    UserNav,
    LoginNav,
    TeacherNav,
    ViewLessonSlots,
    ViewCourses,
    ViewQuestionBank
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRippleModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCheckboxModule,
    MatCarouselModule.forRoot(),
    MatTableModule,
    ChartsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
