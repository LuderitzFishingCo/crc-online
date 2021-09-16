import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lesson, TimeSlot, User, QuestionBank, Course } from './../../interfaces/index';


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
}
