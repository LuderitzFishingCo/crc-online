import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lesson, TimeSlot, User,QuestionBank } from './../../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  GetReportData(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetData`).pipe(map=>map);
  }
  server = 'http://localhost:60000/api/App';
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    })
  }
  constructor(private http: HttpClient) {
   }

  public GetLessonSlot(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetLessonSlots`).pipe(map=>map);
  }

  public CreateLessonSlot(timeSlot: TimeSlot) {
      console.log(`${this.server}/CreateLessonSlot`)
      console.log(this.httpOptions)
    return this.http.post<TimeSlot>(`${this.server}/CreateLessonSlot`, timeSlot, this.httpOptions);
  }

  public UpdateLessonSlot(timeSlot: TimeSlot) {
    return this.http.put<TimeSlot>(`${this.server}/UpdateLessonSlot`, timeSlot, this.httpOptions);
  }

  public DeleteLessonSlot(id: number) {
    return this.http.delete<TimeSlot>(`${this.server}/DeleteLessonSlot/${id}`);
  }
  //lesson slot
    public GetLesson(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetLessons`).pipe(map=>map);
  }

  public CreateLesson(lesson:Lesson ) {
    return this.http.post<Lesson>(`${this.server}/CreateLesson`, lesson, this.httpOptions);
  }

  public UpdateLesson(lesson:Lesson) {
    return this.http.put<Lesson>(`${this.server}/UpdateLesson`, lesson, this.httpOptions);
  }

  public DeleteLesson(id: number) {
    return this.http.delete<Lesson>(`${this.server}/DeleteLesson/${id}`);
  }
  //question bank
    public GetQuestionBank(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetQuestionBanks`).pipe(map=>map);
  }

  public CreateQuestionBank(QuestionBank:QuestionBank ) {
    return this.http.post<QuestionBank>(`${this.server}/CreateQuestionBank`, QuestionBank, this.httpOptions);
  }

  public UpdateQuestionBank(QuestionBank:QuestionBank) {
    return this.http.put<QuestionBank>(`${this.server}/UpdateQuestionBank`, QuestionBank, this.httpOptions);
  }

  public DeleteQuestionBank(id: number) {
    return this.http.delete<QuestionBank>(`${this.server}/DeleteQuestionBank/${id}`);
  }
}