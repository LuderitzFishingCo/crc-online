import { ScheduleComponent } from './pages/learner/schedule/schedule.component';
import { UserManagementComponent } from './pages/user/user-management/user-management.component';
import { CourseInstanceComponent } from './pages/administrator/course/course-instance/course-instance.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AttendanceReportComponent } from './pages/reports/attendance-report/attendance-report.component';
import { CourseListReportComponent } from './pages/reports/course-list-report/course-list-report.component';
import { CourseMarksReportComponent } from './pages/reports/course-marks-report/course-marks-report.component';
import { CourseReportComponent } from './pages/reports/course-report/course-report.component';
import { FinancialReportComponent } from './pages/reports/financial-report/financial-report.component';
import { LeaderboardReportComponent } from './pages/reports/leaderboard-report/leaderboard-report.component';
import { MembersJoiningReportComponent } from './pages/reports/members-joining-report/members-joining-report.component';
import { ProgressReportComponent } from './pages/reports/progress-report/progress-report.component';
import { QuaterlyReportComponent } from './pages/reports/quaterly-report/quaterly-report.component';
import { TeacherApplicationsReportComponent } from './pages/reports/teacher-applications-report/teacher-applications-report.component';
import { UserReportComponent } from './pages/reports/user-report/user-report.component';
import { UserRoleComponent } from './pages/administrator/user-role/user-role.component';
import { CourseComponent, ViewCourses } from './pages/administrator/course/course.component';
import { AdministratorComponent, AdminHome, ApplicationComponent, PaymentComponent, AssignTeacher, ViewTeachers } from './pages/administrator/administrator.component';
import { QuizComponent, AssignQuizComponent, ViewQuizzes, ViewQuiz } from './pages/lessons/quiz/quiz.component';
import { QuestionComponent, QuestionBankComponent, QuestionsComponent, ViewQuestionBank, ViewQuestionBankQuestions } from './pages/lessons/question/question.component';
import { CreateLessonSlotComponent, CreateLessonComponent, AssignLessonSlotComponent, ViewLessonSlots, LessonsComponent } from './pages/lessons/lessons.component';
import { TeacherComponent, LearnersGrade, GenerateCertifcate } from './pages/teacher/teacher.component';
import { LearnerCourseComponent, LearnerGrade, LearnerLesson, LearnerLessons } from './pages/learner/learner-course/learner-course.component';
import { LearnerComponent, LearnerHome } from './pages/learner/learner.component';
import { Sermon } from './interfaces/index';
import { CoursesComponent, SearchCourse, SermonComponent, RegisterCourse, PayCourse } from './pages/courses/courses.component';
import { ProfileComponent, DeleteProfile } from './pages/user/profile/profile.component';
import { ResetPasswordComponent, EnterEmail } from './pages/user/reset-password/reset-password.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { UserComponent, ApplyTeacher } from './pages/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'Registration', component: RegistrationComponent},
  {path:'Login', component: LoginComponent},
  {path:'User/:user_id', component: UserComponent, children:[
    {path:'Courses/:id', component: CoursesComponent},
    {path:'SearchCourse', component: SearchCourse},
    {path:'Sermon', component: SermonComponent},
    {path:'ApplyTeacher/:id', component: ApplyTeacher},
    {path:'RegisterCourse/:user_id/:course_id', component: RegisterCourse},
    {path:'PayCourse', component: PayCourse},
    {path: 'Profile/:ActionType/:id', component: ProfileComponent}
  ]},
  {path:'EnterEmail', component: EnterEmail},
  {path:'ResetPassword', component: ResetPasswordComponent},
  {path:'Learner/:id', component: LearnerComponent, children:[
    {path:'', component: LearnerHome},
    {path:'Courses', component: LearnerCourseComponent},
    {path:'Lessons/:learner_id', component: LearnerLessons},
    {path:'Lesson/:id', component: LearnerLesson},
    {path:'Grade', component: LearnerGrade},
    {path:'RegisterCourse', component: RegisterCourse},
    {path:'PayCourse', component: PayCourse},
    {path: 'Profile/:ActionType/:id', component: ProfileComponent},
    {path: 'Schedule', component: ScheduleComponent}
  ]},
  {path:'Teacher/:id', component: TeacherComponent, children:[
    {path:'LessonSlot/:ActionType', component: CreateLessonSlotComponent},
    {path:'Lesson/:ActionType/:teacher_id', component: CreateLessonComponent},
    {path:'AssignLesson', component: AssignLessonSlotComponent},
    {path:'ViewQuizzes/:teacher_id', component: ViewQuizzes},
    {path:'ViewQuestionBank/:teacher_id', component: ViewQuestionBank},
    {path:'QuestionBank/:ActionType/:teacher_id', component: QuestionBankComponent},
    {path:'Questions/:ActionType/:teacher_id', component: QuestionsComponent},
    {path:'Quiz/:ActionType/:teacher_id', component: QuizComponent},
    {path:'AssignQuiz/:teacher_id', component: AssignQuizComponent},
    {path:'LearnersGrade', component: LearnersGrade},
    {path:'GenerateCertificate', component: GenerateCertifcate},
    {path:'LessonSlot/:ActionType/:teacher_id', component: CreateLessonSlotComponent},
    {path:'CreateLesson/:ActionType/:teacher_id', component: CreateLessonComponent},
    {path:'AssignLesson/:teacher_id', component: AssignLessonSlotComponent},
    {path:'Question/:ActionType/:teacher_id', component: QuestionComponent},
    {path:'QuestionBank/:ActionType/:teacher_id', component: QuestionBankComponent},
    {path:'Question/:teacher_id', component: QuestionsComponent},
    {path:'Quiz/:ActionType/:teacher_id', component: QuizComponent},
    {path:'ViewLessonSlot/:teacher_id', component: ViewLessonSlots},
    {path:'AssignQuiz/:teacher_id', component: AssignQuizComponent},
    {path:'ViewLessons/:teacher_id', component: LessonsComponent},
    {path:'ViewLessonSlots/:teacher_id', component: ViewLessonSlots},
    {path: 'Profile/:ActionType/:teacher_id', component: ProfileComponent},
    {path: 'ViewQuestionBankQuestions/:qb_id', component: ViewQuestionBankQuestions},
    {path: 'ViewQuiz/:quiz_id', component: ViewQuiz}


  ]},
  {path:'Administrator/:id', component: AdministratorComponent, children:[
    {path: '', component: AdminHome},
    {path: 'Applications/:admin_id', component: ApplicationComponent},
    {path: 'Payment', component: PaymentComponent},
    {path: 'ViewCourses', component: ViewCourses},
    {path: 'Course/:ActionType/:admin_id', component: CourseComponent},
    {path: 'AssignTeacher/:admin_id', component: AssignTeacher},
    {path: 'Reports', component: ReportsComponent},
    {path: 'Report/:id', component: ReportsComponent },
    {path:'CourseInstance/:ActionType/:admin_id', component: CourseInstanceComponent},
    {path:'ViewTeachers', component: ViewTeachers},
    {path: 'Profile/:ActionType/:id', component: ProfileComponent}
  ]},
  {path: 'AttendanceReport', component: AttendanceReportComponent},
  {path: 'CourseListReport', component: CourseListReportComponent},
  {path: 'CourseMarksReport', component: CourseMarksReportComponent},
  {path: 'CourseReport', component: CourseReportComponent},
  {path: 'FinancialReport', component: FinancialReportComponent},
  {path: 'LeaderboardReport', component: LeaderboardReportComponent},
  {path: 'MembersJoinedReport', component: MembersJoiningReportComponent},
  {path: 'ProgressReport', component: ProgressReportComponent},
  {path: 'QuaterlyReport', component: QuaterlyReportComponent},
  {path: 'TeacherApplicationReport', component: TeacherApplicationsReportComponent},
  {path: 'UserReport', component: UserReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
