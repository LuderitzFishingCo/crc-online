import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {
  server = 'http://localhost:60000/api/Learner';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  public GetLearnerQuizzes(user_id: Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetLearnerQuiz/${user_id}`).pipe(map=>map);
  }

  public GetLearnerCourses(user_id: Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetLearnerCourses/${user_id}`).pipe(map=>map);
  }

  public GetCourseInstanceLessons(course_instance_id: Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetCourseInstanceLessons/${course_instance_id}`).pipe(map=>map);
  }

  
}
