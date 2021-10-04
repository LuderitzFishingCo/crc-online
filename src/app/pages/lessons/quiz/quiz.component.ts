import { Lesson, TimeSlot, Quiz, LessonSlot, LessonInstance, LessonInstanceQuiz, QuizQuestion } from './../../../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { TeacherService } from '../../../services/teacher/teacher.service';
import { openDialog } from '../../../services/main/helpers/dialog-helper';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  ActionType: string;
  Answer: string;
  QbName: string;
  lessons:Lesson[]=[];
  quizzes: Quiz[]=[];
  Question: string;
  selected: any;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private service:TeacherService) {
    this.ActionType = "Create";
    this.Answer = "";
    this.Question = "";
    this.QbName = "";

    this.service.GetLesson().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.lessons.push({
          Lesson_Name:y['lesson_Name'],
          Lesson_Description:y['lesson_Description'],
          Lesson_Number:0,
          Lesson_ID:y['lesson_ID']
        });
      });
    });

    
    this.service.GetQuizzes().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.quizzes.push({
          Quiz_ID:y['Quiz_ID'],
          Quiz_Name:y['Quiz_Name'],
          Due_Date:y['Due_Date'],
          Lesson_ID:y['lesson_ID'],
          Weight:y['Weight']
        });
      });
    });

    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];
    });
  }

  ngOnInit(): void {
  }

  btnCancelClick(){

  }

  onSubmit(f: NgForm){
    
    let data: Quiz = {
      Quiz_ID: 0,
      Lesson_ID: Number(f.value['Lesson']),
      Quiz_Name: f.value['QuizName'],
      Due_Date: (f.value['DueDate']),
      Weight: f.value['Weight'],
    };

    console.log(data)
    openDialog(this.dialog, 'Are you sure you want to ' + this.ActionType + ' this quiz?', this.ActionType + ' Question', this.ActionType == 'Delete' ? 'red' : 'green').subscribe(res => {
      if (<boolean>res) {
        if (this.ActionType == 'Create') {
          this.service.CreateQuiz(data).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Quiz ' + this.ActionType + 'd successfully', this.ActionType == 'Delete' ? 'red' : 'green').subscribe());
        }
        else if (this.ActionType == 'Update') {
          this.service.UpdateQuiz(data).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Quiz ' + this.ActionType + 'd successfully', 'green')
              .subscribe());
        } else {
          this.service.DeleteQuiz(this.selected).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Quiz ' + this.ActionType + 'd successfully', 'red')
              .subscribe());
        }

      }
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onOptionsSelected(value:string,f: NgForm){
    console.log("the selected value is " + value);
 
    this.selected=value;


}


}


@Component({
  selector: 'app-assign-lesson-slot',
  templateUrl: './assign-quiz.html',
  styleUrls: ['./quiz.component.scss']
})
export class AssignQuizComponent implements OnInit {

  ActionType: string;
  LessonName: string;
  Lesson: string;
  lessons:Lesson[]=[];
  slots:LessonSlot[]=[];
  quizzes: Quiz[]=[];
  selected2: number=0;
  selected1: number=0;
  lessonquiz: LessonInstanceQuiz[]=[];
  question: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private teacherServiceervice : TeacherService) {
    this.ActionType = "Create";
    this.LessonName = "";
    this.Lesson = "";

      this.teacherServiceervice.GetLesson().subscribe(x=> {
        console.log(x)
        x.forEach(y=>{
          this.lessons.push({
            Lesson_Name:y['lesson_Name'],
            Lesson_Description:y['lesson_Description'],
            Lesson_Number:0,
            Lesson_ID:y['lesson_ID']
          });
        });
        
      });
    this.teacherServiceervice.GetQuizzes().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.quizzes.push({
          Quiz_ID:y['Quiz_ID'],
          Quiz_Name:y['Quiz_Name'],
          Due_Date:y['Due_Date'],
          Lesson_ID:y['lesson_ID'],
          Weight:y['Weight']
        });
      });
    });

    this.teacherServiceervice.GetQuestions().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.question.push({
          Question_ID: y['question_ID'],
          Question_Bank_ID: y['question_Bank_ID'],
          Question_Asked:y['question_Asked'],
          Answer:y['answer'],
        });
      });
    });
  }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {

    let data: QuizQuestion = {
      Question_ID:Number(f.value['Question_ID']),
      Quiz_ID: Number(f.value['Quiz_ID']),
    };
    console.log
    this.teacherServiceervice.CreateQuizQuestion(data).subscribe(x=>openDialog(this.dialog,this.ActionType+'Question added to ','Course  '+this.ActionType+'d successfully','red').subscribe());


  }


  onOptionsSelected(f: NgForm){
    this.selected1=+f.value['Lesson'];
    this.selected2=+f.value['LessonSlot'];
}

}

@Component({
  selector: 'view-quiz',
  templateUrl: './view-quizes.html',
  styleUrls: ['./quiz.component.scss']
})
export class ViewQuizzes implements OnInit {


  quizzes:Quiz[]=[  ]

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice:TeacherService) {


    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
        this.teacherServiceervice.GetQuizzes().subscribe(x=> {
          x.forEach(y=>{
            this.quizzes.push({
              Quiz_ID:y['Quiz_ID'],
              Quiz_Name:y['Quiz_Name'],
              Lesson_ID: y['Lesson'],
              Due_Date:y['Due_Date'],
              Weight:y['Weight']
            });
          });
        });
        console.log(this.quizzes)
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
