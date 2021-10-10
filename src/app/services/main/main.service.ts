import { CourseType, User_Role, Teaching_Level, TeacherApplication, TeacherApplicationStatus, Learner,
          Quiz, LessonInstanceQuiz, CourseInstanceLearner, CourseInstance } from './../../interfaces/index';
import { Announcement, User, Course, UserLogin, Church, Location, Department, Gender } from '../../interfaces/index';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  server = 'http://localhost:60000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  constructor(private http: HttpClient) { }


  public getGenders(): Observable<Gender[]>{
    return this.http.get<Gender[]>(`${this.server}Home/GetGenders`).pipe(map(res => res));
  }
  public getChurches(): Observable<Church[]>{
    return this.http.get<Church[]>(`${this.server}Home/GetChurches`).pipe(map(res => res));
  }

  public getUser(id: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.server}User/GetUser/${id}`).pipe(map(res => res));
  }

  public getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(`${this.server}Home/GetLocations`).pipe(map(res => res));
  }

  public getDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(`${this.server}Home/GetDepartments`).pipe(map(res => res));
  }
  public getCoursTypes(): Observable<CourseType[]>{
    return this.http.get<CourseType[]>(`${this.server}Home/GetCourseTypes`).pipe(map(res => res));
  }
  public getUserRoles(): Observable<User_Role[]>{
    return this.http.get<User_Role[]>(`${this.server}Home/GetUserRoles`).pipe(map(res => res));
  }

  public getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.server}Home/GetCourses`).pipe(map(res => res));
  }
  public getTeachingLevels(): Observable<Teaching_Level[]>{
    return this.http.get<Teaching_Level[]>(`${this.server}Home/GetTeachingLevel`).pipe(map(res => res));
  }
  public getTeacherApplication(): Observable<TeacherApplication[]>{
    return this.http.get<TeacherApplication[]>(`${this.server}Home/GetTeacherApplication`).pipe(map(res => res));
  }
  public getTeacherApplicationStatus(): Observable<TeacherApplicationStatus[]>{
    return this.http.get<TeacherApplicationStatus[]>(`${this.server}Home/GetTeacherApplicationStatus`).pipe(map(res => res));
  }
  public getLearner(): Observable<Learner[]>{
    return this.http.get<Learner[]>(`${this.server}Home/GetLearner`).pipe(map(res => res));
  }
  public getQuiz(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${this.server}Home/GetQuiz`).pipe(map(res => res));
  }
  public getLessonInstanceQuiz(): Observable<LessonInstanceQuiz[]>{
    return this.http.get<LessonInstanceQuiz[]>(`${this.server}Home/GetLessonInstanceQuiz`).pipe(map(res => res));
  }
  public getCourseInstanceLearner(): Observable<CourseInstanceLearner[]>{
    return this.http.get<CourseInstanceLearner[]>(`${this.server}Home/GetCourseInstanceLearner`).pipe(map(res => res));
  }
  public getCourseInstance(): Observable<CourseInstance[]>{
    return this.http.get<CourseInstance[]>(`${this.server}Home/GetCourseInstance`).pipe(map(res => res));
  }



  public ApplyAsTeacher(TeacherApplication: TeacherApplication){
    return this.http.post<TeacherApplication>(`${this.server}User/ApplyAsTeacher`, TeacherApplication, this.httpOptions);
  }


  public Login(userLogin: UserLogin) {
    console.log(userLogin.Email_Address)
    return this.http.post<User>(`${this.server}User/LoginUser`, userLogin, this.httpOptions).pipe(map(res=>res));
  }

  public Register(user: User) {
    console.log(user)
    user.Password_ID =1;
    return this.http.post<User>(`${this.server}User/Register`, user, this.httpOptions);
  }

  public AddLocation(location: Location){
    return this.http.post<Location>(`${this.server}User/AddLocation`,location,this.httpOptions);
  }
  public getAnnouncements(): Observable<Announcement[]>{
    return this.http.get<Announcement[]>(`${this.server}Learner/GetAnnouncements`).pipe(map(res => res));
  }
  public getRegisterCourses(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}Learner/GetCourseInstances`).pipe(map(res=>res));
  }

  public GetUser(id: Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}User/GetUser/${id}`).pipe(map=>map);
  }
  public GetUserRole(id: Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}User/GetUserRole/${id}`).pipe(map=>map);
  }
  public GetCourse(id: Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}User/GetCourse/${id}`).pipe(map=>map);
  }

  public SendCode(email: String): Observable<any[]>{
    console.log(email)
    return this.http.post<any>(`${this.server}User/ResetPassword`, email, this.httpOptions);
  }

  public UpdateQuiz(User:User) {
    return this.http.put<User>(`${this.server}/User/UpdateUser`, User, this.httpOptions);
  }

  public DeleteQuiz(id: number) {
    return this.http.delete<User>(`${this.server}/User/DeleteUser/${id}`);
  }


  public RegisterForCourse(CourseInstanceLearner: CourseInstanceLearner){
    return this.http.post<Location>(`${this.server}User/RegisterCourse`,CourseInstanceLearner,this.httpOptions);
  }

}
