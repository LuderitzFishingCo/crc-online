import { QuestionBankCategory, Lesson ,Course, CourseInstance, Teacher, TeacherInformation} from './../../../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { openDialog } from '../../../services/main/helpers/dialog-helper';
import { QuestionBank, Question } from '../../../interfaces';
import { TeacherService } from '../../../services/teacher/teacher.service';
import {MatTableModule} from '@angular/material/table';
import { AdministratorService } from '../../../services/administrator/administrator.service';
import { MainService } from '../../../services/main/main.service';
import { CourseType } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questions: any[]=[];
  constructor(private router: Router, private route: ActivatedRoute,private service: TeacherService) {
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      var id = params['id'];
      this.service.GetQuizQuestions(id).subscribe(x=>{
        x.forEach(y=>{
          this.questions.push({
            Quiz_ID: y['Quiz_ID'],
            Quiz_Name: y['Quiz_Name'],
            Question: y['Question'],
            Answer: y['Answer'],
            Due_Date: y['Due_Date']
          })
        });
      })
    });
   }
  questionBankData: QuestionBank[] = [];
  questionData: Question[] = [];

  ngOnInit(): void {
    this.service.GetQuestionBank().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.questionBankData.push({
          Question_Bank_ID: y['question_Bank_ID'],
          Question_Bank_Category_ID: y['question_Bank_Category_ID'],
          Question_Bank_Name:y['question_Bank_Name'],
        });
      });
    });
    this.service.GetQuestions().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.questionData.push({
          Question_ID: y['question_ID'],
          Question_Bank_ID: y['question_Bank_ID'],
          Question_Asked:y['question_Asked'],
          Answer:y['answer'],

        });
      });
    });
  
  }

}

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionBankComponent implements OnInit {

  ActionType: string;
  CategoryName: string = '';
  QuestionBankName: any;
  selected: number = 0;
  bank: QuestionBank[] = [
    {
      Question_Bank_ID: 0,
      Question_Bank_Category_ID: 0,
    Question_Bank_Name: ''
    }
  ]
  bankcategory: QuestionBankCategory[] = [  ]

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private teacherServiceervice: TeacherService) {
    this.ActionType = "Create";
    this.QuestionBankName = "";


    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];

      
      this.teacherServiceervice.GetQuestionBankCategory().subscribe(x => {
        x.forEach(y => {
          this.bankcategory.push({
            Question_Bank_Category_ID: y['question_Bank_Category_ID'],
            Question_Bank_Category_Name:y['question_Bank_Category_Name'],
          });
        });

      });
      if (this.ActionType != 'Create') {
        this.teacherServiceervice.GetQuestionBank().subscribe(x => {
          x.forEach(y => {
            this.bank.push({
              Question_Bank_ID: y['question_Bank_ID'],
              Question_Bank_Category_ID: y['question_Bank_Category_ID'],
              Question_Bank_Name:y['question_Bank_Name'],
            });
          });

        });
      }
    });
  }

  ngOnInit(): void {

  }

  onSubmit(f: NgForm) {

    let data: QuestionBank = {
      Question_Bank_ID: Number(this.selected),
      Question_Bank_Name: f.value['Question_Bank_Name'],
      Question_Bank_Category_ID: Number(f.value['Question_Bank_Category_ID'])
    };

    console.log(data)
    openDialog(this.dialog, 'Are you sure you want to ' + this.ActionType + ' this slot?', this.ActionType + ' Question Bank', this.ActionType == 'Delete' ? 'red' : 'green').subscribe(res => {
      if (<boolean>res) {
        if (this.ActionType == 'Create') {
          this.teacherServiceervice.CreateQuestionBank(data).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Question Bank ' + this.ActionType + 'd successfully', this.ActionType == 'Delete' ? 'red' : 'green').subscribe());
        }
        else if (this.ActionType == 'Update') {
          this.teacherServiceervice.UpdateQuestionBank(data).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Question Bank ' + this.ActionType + 'd successfully', 'green')
              .subscribe());
        } else {
          this.teacherServiceervice.DeleteQuestionBank(this.selected).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Question Bank ' + this.ActionType + 'd successfully', 'red')
              .subscribe());
        }

      }
    });
  }

  onOptionsSelected(value: number) {
    console.log("the selected value is " + value);
    //f.controls['StartTime'].setValue(this.slots[+value]['StartTime'])

  //  let st: string = <string>this.slots[+value]['StartTime'];
    //let ed: string = <string>this.slots[+value]['EndTime'];

    //f.controls['StartTime'].setValue(st.split('T')[1]);
   // f.controls['EndTime'].setValue(ed.split('T')[1]);
   // f.controls['Date'].setValue(ed.split('T')[0]);
    this.selected = value;


  }

}
@Component({
  selector: 'app-questions',
  templateUrl: './question.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionsComponent implements OnInit {

  ActionType: string;
  Answer: string;
  QbName: string;
  selected: number = 0;
  questionselected: number = 0;
  question: Question[] = [];


  bank: QuestionBank[] = [
    {
      Question_Bank_ID: 0,
      Question_Bank_Category_ID: 0,
    Question_Bank_Name: ''
    }
  ]

  Question: string;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: TeacherService) {
    this.ActionType = "Create";
    this.Answer = "";
    this.Question = "";
    this.QbName = "";
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];

        this.service.GetQuestionBank().subscribe(x => {
          x.forEach(y => {
            this.bank.push({
              Question_Bank_ID: y['question_Bank_ID'],
              Question_Bank_Category_ID: y['question_Bank_Category_ID'],
              Question_Bank_Name:y['question_Bank_Name'],
            });
          });

        });
        this.service.GetQuestions().subscribe(x=> {
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
    });
  }

  ngOnInit(): void {
    
  }
  onSubmit(f: NgForm){
    
    let data: Question = {
      Question_ID: Number(this.questionselected),
      Question_Bank_ID: Number(f.value['Question_Bank_ID']),
      Question_Asked: f.value['Question_Asked'],
      Answer: f.value['Answer']
    };

    console.log(data)
    openDialog(this.dialog, 'Are you sure you want to ' + this.ActionType + ' this question?', this.ActionType + ' Question', this.ActionType == 'Delete' ? 'red' : 'green').subscribe(res => {
      if (<boolean>res) {
        if (this.ActionType == 'Create') {
          this.service.CreateQuestion(data).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Question ' + this.ActionType + 'd successfully', this.ActionType == 'Delete' ? 'red' : 'green').subscribe());
        }
        else if (this.ActionType == 'Update') {
          this.service.UpdateQuestion(data).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Question ' + this.ActionType + 'd successfully', 'green')
              .subscribe());
        } else {
          this.service.DeleteQuestion(this.selected).subscribe(x =>
            openDialog(this.dialog, this.ActionType + 'd successfully', 'Question ' + this.ActionType + 'd successfully', 'red')
              .subscribe());
        }

      }
    });
  }

    onOptionsSelected(value: number) {
      console.log("the selected value is " + value);
      this.selected = value;
    }
    onQuestionSelected(value: number) {
      console.log("the selected value is " + value);
      this.questionselected = value;
    }


}

@Component({
  selector: 'view-question-bank',
  templateUrl: './view-question-bank.html',
  styleUrls: ['./question.component.scss']
})
export class ViewQuestionBank implements OnInit {
  user: any[ ] = [];

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService, private service: MainService) {

    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      var userid = params['id'];
      this.service.GetUser(userid).subscribe(x=>{
        x.forEach(y=>{
          this.user.push({
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
    });
   }
  questionBankData: QuestionBank[] = [];

  ngOnInit(): void {
    this.teacherServiceervice.GetQuestionBank().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.questionBankData.push({
          Question_Bank_ID: y['question_Bank_ID'],
          Question_Bank_Category_ID: y['question_Bank_Category_ID'],
          Question_Bank_Name:y['question_Bank_Name'],
        });
      });
      
    });
  }



}