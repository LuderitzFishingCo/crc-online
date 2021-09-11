import { Announcement, User, Course, UserLogin, Church, Locations, Department, Genders } from '../../interfaces/index';
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

  
  public getGenders(): Observable<Genders[]>{
    return this.http.get<Genders[]>(`${this.server}Home/GetGenders`).pipe(map(res => res));
  }
  public getChurches(): Observable<Church[]>{
    return this.http.get<Church[]>(`${this.server}Home/GetChurches`).pipe(map(res => res));
  }

  public getUser(id: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.server}User/GetUser/${id}`).pipe(map(res => res));
  }

  public getLocations(): Observable<Locations[]>{
    return this.http.get<Locations[]>(`${this.server}Home/GetLocations`).pipe(map(res => res));
  }
  public getDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(`${this.server}Home/GetDepartments`).pipe(map(res => res));
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
