import { getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lesson, TimeSlot, User, QuestionBank, Course, CourseInstance, User_Role } from './../../interfaces/index';


@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  server = 'http://localhost:60000/api/Admin';
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    })
  }
  constructor(private http: HttpClient) {
   }



  public CreateCourse(course: Course ) {
    return this.http.post<Course>(`${this.server}/CreateCourse`, course, this.httpOptions);
  }

  public UpdateCourse(course: Course ) {
    return this.http.post<Course>(`${this.server}/UpdateCourse`, course, this.httpOptions);
  }

  public DeleteCourse(id: number ) {
    return this.http.delete<Course>(`${this.server}/DeleteCourse/${id}`);
  }

  public GetUsers():Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetUsers`).pipe(map=>map);}

  public getUserRoles(): Observable<User_Role[]>{
      return this.http.get<User_Role[]>(`${this.server}Home/GetUserRoles`).pipe(map => map);
    }

  public GetCourseInstances(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetCourseInstances`).pipe(map=>map);
  }

  public GetTeachers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetTeachers`).pipe(map=>map);
  }
  public GetPendingTeacherApplications(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetPendingTeacherApplications`).pipe(map=>map);
  }
  public GetTeacherApplications(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetTeacherApplications`).pipe(map=>map);
  }
  public GetTeacherApplication(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetTeacherApplication/${id}`).pipe(map=>map);
  }
  public CreateCourseInstance(courseinst: CourseInstance ) {
    return this.http.post<Course>(`${this.server}/CreateCourseInstance`, courseinst, this.httpOptions);
  }
  public DeleteCourseInstance(id: number ) {
    return this.http.delete<Course>(`${this.server}/DeleteCourseInstance/${id}`);
  }

  public AcceptApplication(id: number ) {
    console.log(id)
    return this.http.post(`${this.server}/AcceptTeacher`, id, this.httpOptions);
  }
  public DeclineApplication(id: number ) {
    return this.http.post<Course>(`${this.server}/DeclineTeacher`, id, this.httpOptions);
  }
}
