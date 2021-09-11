import { ReportsComponent } from './pages/reports/reports.component';
import { UserRoleComponent } from './pages/administrator/user-role/user-role.component';
import { CourseComponent } from './pages/administrator/course/course.component';
import { AdministratorComponent, AdminHome, ApplicationComponent, PaymentComponent, AssignTeacher } from './pages/administrator/administrator.component';
import { QuizComponent, AssignQuizComponent } from './pages/lessons/quiz/quiz.component';
import { QuestionComponent, QuestionBankComponent, QuestionsComponent } from './pages/lessons/question/question.component';
import { CreateLessonSlotComponent, CreateLessonComponent, AssignLessonSlotComponent } from './pages/lessons/lessons.component';
import { TeacherComponent, LearnersGrade, GenerateCertifcate } from './pages/teacher/teacher.component';
import { LearnerCourseComponent, LearnerGrade } from './pages/learner/learner-course/learner-course.component';
import { LearnerComponent, LearnerHome } from './pages/learner/learner.component';
import { Sermon } from './interfaces/index';
import { CoursesComponent, SearchCourse, SermonComponent, RegisterCourse, PayCourse } from './pages/courses/courses.component';
import { ProfileComponent, DeleteProfile } from './pages/user/profile/profile.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { UserComponent, ApplyTeacher } from './pages/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'Registration', component: RegistrationComponent},
  {path:'', component: LoginComponent},
  {path:'RegisterCourse', component: RegisterCourse},
  {path:'PayCourse', component: PayCourse},
  {path:'User', component: UserComponent, children:[
    {path:'UpdateProfile', component: ProfileComponent},
    {path:'DeleteProfile', component: DeleteProfile},
    {path:'Courses', component: CoursesComponent},
    {path:'SearchCourse', component: SearchCourse},
    {path:'Sermon', component: SermonComponent},
    {path:'ApplyTeacher', component: ApplyTeacher},
  ]},

  {path:'ResetPassword', component: ResetPasswordComponent},
  {path:'Learner', component: LearnerComponent, children:[
    {path:'', component: LearnerHome},
    {path:'Courses', component: LearnerCourseComponent},
    {path:'Grade', component: LearnerGrade},
  ]},
  {path:'Teacher', component: TeacherComponent, children:[    
    {path:'LessonSlot/:ActionType', component: CreateLessonSlotComponent},
    {path:'Lesson/:ActionType', component: CreateLessonComponent},
    {path:'AssignLesson/:ActionType', component: AssignLessonSlotComponent},
    {path:'Question/:ActionType', component: QuestionComponent},
    {path:'QuestionBank/:ActionType', component: QuestionBankComponent},
    {path:'Questions/:ActionTypes', component: QuestionsComponent},
    {path:'Quiz/:ActionType', component: QuizComponent},
    {path:'AssignQuiz', component: AssignQuizComponent},
    {path:'LearnersGrade', component: LearnersGrade},
    {path:'GenerateCertificate', component: GenerateCertifcate},
    {path:'LessonSlot/:ActionType/:id', component: CreateLessonSlotComponent},
    {path:'CreateLesson/:ActionType/:id', component: CreateLessonComponent},
    {path:'AssignLesson/:ActionType/:id', component: AssignLessonSlotComponent},
    {path:'Question/:ActionType/:id', component: QuestionComponent},
    {path:'QuestionBank/:ActionType/:id', component: QuestionBankComponent},
    {path:'Question/:ActionTypes/:id', component: QuestionsComponent},
    {path:'Quiz/:ActionType/:id', component: QuizComponent},
  ]},
  {path:'Administrator', component: AdministratorComponent, children:[
    {path: '', component: AdminHome},
    {path: 'Applications', component: ApplicationComponent},
    {path: 'Payment', component: PaymentComponent},
    {path: 'Course/:ActionType', component: CourseComponent},
    {path: 'AssignTeacher', component: AssignTeacher},
    {path: 'UserRole/:ActionType', component: UserRoleComponent},
    {path: 'Reports', component: ReportsComponent},
    { path: 'Report/:id', component: ReportsComponent },

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }