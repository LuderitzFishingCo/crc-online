import { LearnerService } from './../../../services/learner/learner.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AdministratorService } from './../../../services/administrator/administrator.service';
import { MainService } from './../../../services/main/main.service';
import { Church, Teaching_Level, Course, TeacherApplication, CourseInstance, Teacher, TeacherInformation, CourseInstanceLearner } from './../../../interfaces/index';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { openDialog } from '../../../services/main/helpers/dialog-helper';
import { CourseType } from 'src/app/interfaces';
import {MatTableDataSource} from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import { TeacherService } from './../../../services/teacher/teacher.service';
import {MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-learner-course',
  templateUrl: './learner-course.component.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LearnerCourseComponent implements OnInit {

  courses:any[]=[];
  users: any[]=[];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService,private service: MainService, private learnerservice: LearnerService) { 
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log('Learners user id: '+params['learner_id'])
      var userid = params['learner_id'];
      this.service.GetUser(userid).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          this.users.push({
            User_ID: y['User_ID'],
            First_Name: y['First_Name'],
            Last_Name: y['Last_Name'],
            Phone_Number: y['Phone_Number'],
            Gender: y['Gender'],
            Department: y['Department'],
            City: y['City'],
            Country: y['Country'],
            Email_Address: y['Email_Address'],
            Date_of_Birth: y['Date_of_Birth']
          })
        });
      })
      this.learnerservice.GetLearnerCourses(userid).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          console.log(y)
          this.courses.push({
            Course_ID: y['Course_ID'],
            Course_Instance_ID: y['Course_Instance_ID'],
            Course_Name: y['Course_Name'],
            Course_Description: y['Course_Description'],
            Course_Code: y['Course_Code'],
            Start_Date: y['Start_Date'],
            End_Date: y['End_Date'],
          })
        });
      })
    });
  }

  ngOnInit(): void {
  }

}
@Component({
  selector: 'learner-lessons',
  templateUrl: './learner-lessons.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LearnerLessons implements OnInit {

  users: any[]=[];
  lessons: any []=[];
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService,private service: MainService, private learnerservice: LearnerService) {
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['learner_id'])
      var userid = params['learner_id'];
      console.log(params['course_instance_id'])
      var course_instance_id = params['course_instance_id']
      this.service.GetUser(userid).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          this.users.push({
            User_ID: y['User_ID'],
            First_Name: y['First_Name'],
            Last_Name: y['Last_Name'],
            Phone_Number: y['Phone_Number'],
            Gender: y['Gender'],
            Department: y['Department'],
            City: y['City'],
            Country: y['Country'],
            Email_Address: y['Email_Address'],
            Date_of_Birth: y['Date_of_Birth']
          })
        });
      })
      this.learnerservice.GetCourseInstanceLessons(course_instance_id).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          this.lessons.push({
            Lesson_ID: y['Lesson_ID'],
            Lesson_Name: y['Lesson_Name'],
            Lesson_Number: y['Lesson_Number'],
            Lesson_Date: y['Lesson_Date'],
            Lesson_Start: y['Lesson_Start'],
            Lesson_End: y['Lesson_End'],
            Course_Name: y['Course_Name']
           })
        });
      })
    });
   }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'learner-lesson',
  templateUrl: './learner-lesson.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LearnerLesson implements OnInit {
  users: any[]=[];
  lesson: any[] = [];
  quizzes: any[]=[];
  constructor( private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService,private service: MainService, private learnerservice: LearnerService) {
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id'])
      console.log(params['lesson_id'])
      this.service.GetUser(params['id']).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          this.users.push({
            User_ID: y['User_ID'],
            First_Name: y['First_Name'],
            Last_Name: y['Last_Name'],
            Phone_Number: y['Phone_Number'],
            Gender: y['Gender'],
            Department: y['Department'],
            City: y['City'],
            Country: y['Country'],
            Email_Address: y['Email_Address'],
            Date_of_Birth: y['Date_of_Birth']
          })
        });
      })
      this.learnerservice.GetLesson(params['lesson_id']).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          this.lesson.push({
            Lesson_ID: y['Lesson_ID'],
            Lesson_Name: y['Lesson_Name'],
            Lesson_Number: y['Lesson_Number'],
            Lesson_Description: y['Lesson_Description'],
            Lesson_Start: y['Lesson_Start'],
            Lesson_End: y['Lesson_End'],
            Course_Name: y['Course_Name']
           })
        });
      })
      this.learnerservice.GetLessonQuizzes(params['lesson_id']).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          console.log(y)
          this.quizzes.push({
            Quiz_ID: y['Quiz_ID'],
            Due_Date: y['Due_Date'],
            Quiz_Name: y['Quiz_Name'],
            Weight: y['Weight']
          })
        })
      })
    });
   }

  ngOnInit(): void {
  }
  
  openRatingDialog(): void{
    const dialogRef = this.dialog.open(LessonRatingComponent, {
      data: {}
    })
  }

}


@Component({
  selector: 'lesson-rating',
  templateUrl: './lesson-rating.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LessonRatingComponent implements OnInit {
  showFiller = false;

  constructor() { }

  ngOnInit(): void {

  }

}

@Component({
  selector: 'learner-grade',
  templateUrl: './learner-grade.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LearnerGrade implements OnInit {
  showFiller = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  openLeaderDialog(): void{
    const dialogRef = this.dialog.open(Leaderboard, {
      data: {}
    })
  }

}


@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.html',
  styleUrls: ['./learner-course.component.scss']
})
export class Leaderboard implements OnInit {
  showFiller = false;
  constructor() { }
  ngOnInit(): void {  }
}

@Component({
  selector: 'complete-quiz',
  templateUrl: './complete-quiz.html',
  styleUrls: ['./learner-course.component.scss']
})
export class CompleteQuiz implements OnInit {
  showFiller = false;
  quizzes: any[]=[];
  questions: any[]=[];
  users: any[]=[];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService,private service: MainService, private learnerservice: LearnerService) { 
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log('Learners user id: '+params['learner_id'])
      var userid = params['learner_id'];
      this.service.GetUser(userid).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          this.users.push({
            User_ID: y['User_ID'],
            First_Name: y['First_Name'],
            Last_Name: y['Last_Name'],
            Phone_Number: y['Phone_Number'],
            Gender: y['Gender'],
            Department: y['Department'],
            City: y['City'],
            Country: y['Country'],
            Email_Address: y['Email_Address'],
            Date_of_Birth: y['Date_of_Birth']
          })
        });
      })
      this.learnerservice.GetLessonQuiz(params['quiz_id']).subscribe(x=>{
        x.forEach(y=>{
          this.quizzes.push({
            Quiz_ID: y['Quiz_ID'],
            Due_Date: y['Due_Date'],
            Quiz_Name: y['Quiz_Name'],
            Weight: y['Weight']
          })
        })
      })
      this.learnerservice.GetQuizQuestions(params['quiz_id']).subscribe(x=>{
        x.forEach(y=>{
          this.questions.push({
            Quiz_ID: y['Quiz_ID'],
            Question_Asked: y['Question_Asked']
          })
        })
      })
    });
  }  
  
  submitAnswer(f: NgForm){
    console.log(f)
  }
  ngOnInit(): void {  }
}


