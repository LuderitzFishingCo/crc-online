import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lesson, TimeSlot, User, QuestionBank, Question, Quiz, LessonSlot, LessonInstance, QuizQuestion } from './../../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  GetReportData(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetData`).pipe(map=>map);
  }
  server = 'http://localhost:60000/api/App';
  teacherserver = 'http://localhost:60000/api/Teacher';
  adminserver = 'http://localhost:60000/api/Admin';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    })
  }
  constructor(private http: HttpClient) {
   }

  public GetLessonSlot(): Observable<any[]>{
    return this.http.get<any[]>(`${this.teacherserver}/GetLessonSlots`).pipe(map=>map);
  }

  public CreateLessonSlot(timeSlot: LessonSlot) {
      console.log(`${this.server}/CreateLessonSlot`)
      console.log(this.httpOptions)
    return this.http.post<LessonSlot>(`${this.server}/CreateLessonSlot`, timeSlot, this.httpOptions);
  }

  public CreateLessonInstance(lessonInstance: LessonInstance){
    return this.http.post<LessonInstance>(`${this.teacherserver}/CreateLessonInstance`, lessonInstance, this.httpOptions)
  }
  public UpdateLessonSlot(timeSlot: LessonSlot) {
    return this.http.put<LessonSlot>(`${this.server}/UpdateLessonSlot`, timeSlot, this.httpOptions);
  }

  public DeleteLessonSlot(id: number) {
    return this.http.delete<LessonSlot  >(`${this.server}/DeleteLessonSlot/${id}`);
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

  public GetQuestionBankCategory(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetQuestionBankCategories`).pipe(map=>map);
  }

  public GetQuestions(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetQuestions`).pipe(map=>map);
  }

  
  public CreateQuestion(Question:Question ) {
    return this.http.post<Question>(`${this.server}/CreateQuestion`, Question, this.httpOptions);
  }

  public UpdateQuestion(Question:Question) {
    return this.http.put<Question>(`${this.server}/UpdateQuestion`, Question, this.httpOptions);
  }

  public DeleteQuestion(id: number) {
    return this.http.delete<Question>(`${this.server}/DeleteQuestion/${id}`);
  }

  public GetQuiz(): Observable<any[]>{
    return this.http.get<any[]>(`${this.server}/GetQuestions`).pipe(map=>map);
  }

  
  public CreateQuiz(Quiz:Quiz ) {
    return this.http.post<Quiz>(`${this.teacherserver}/CreateQuiz`, Quiz, this.httpOptions);
  }

  public UpdateQuiz(Quiz:Quiz) {
    return this.http.put<Quiz>(`${this.server}/UpdateQuiz`, Quiz, this.httpOptions);
  }

  public DeleteQuiz(id: number) {
    return this.http.delete<Quiz>(`${this.server}/DeleteQuiz/${id}`);
  }
  public GetQuizzes(): Observable<any[]>{
    return this.http.get<any[]>(`${this.teacherserver}/GetQuizzes`).pipe(map=>map);
  }

  
  public GetCourseInstances(): Observable<any[]>{
    return this.http.get<any[]>(`${this.adminserver}/GetCourseInstances`).pipe(map=>map);
  }

  public GetCourses(): Observable<any[]>{
    return this.http.get<any[]>(`${this.adminserver}/GetCourses`).pipe(map=>map);
  }

  public CreateQuizQuestion(QuizQuestion:QuizQuestion ) {
    return this.http.post<Quiz>(`${this.teacherserver}/CreateQuizQuestion`, QuizQuestion, this.httpOptions);
  }

  public GetQuizQuestions(id: Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.teacherserver}/GetQuizQuestions/${id}`).pipe(map=>map);
  }


}
