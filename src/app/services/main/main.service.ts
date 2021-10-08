import { CourseType, User_Role, Teaching_Level } from './../../interfaces/index';
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

  public getUser(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}User/GetUser/${id}`).pipe(map(res => res));
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
  public getRegisterCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.server}Learner/GetCourseInstances`).pipe(map(res=>res));
  }

}
