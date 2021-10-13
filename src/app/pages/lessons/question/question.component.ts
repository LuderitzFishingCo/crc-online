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
      console.log(params['teacher_id']);
      var id = params['teacher_id'];
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
    this.service.GetQuestionBanks().subscribe(x=> {
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
  qb_id: any;
  banks: any[]=[];
  bank: QuestionBank[] = [
    {
      Question_Bank_ID: 0,
      Question_Bank_Category_ID: 0,
    Question_Bank_Name: ''
    }
  ]
  bankcategory: QuestionBankCategory[] = [  ]
  teacher_id: any;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private teacherServiceervice: TeacherService) {
    this.ActionType = "Create";
    this.QuestionBankName = "";


    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['teacher_id']);
      console.log(params['qb_id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];
      this.teacher_id = params['teacher_id'];
      this.qb_id = params['qb_id'];
      
      this.teacherServiceervice.GetQuestionBankCategory().subscribe(x => {
        x.forEach(y => {
          this.bankcategory.push({
            Question_Bank_Category_ID: y['question_Bank_Category_ID'],
            Question_Bank_Category_Name:y['question_Bank_Category_Name'],
          });
        });

      });
      if (this.ActionType != 'Create') {
        
        this.teacherServiceervice.GetQuestionBank(this.qb_id).subscribe(x => {
          this.selected = this.qb_id;
          x.forEach(y => {
            this.banks.push({
              Question_Bank_ID: y['Question_Bank_ID'],
              Question_Bank_Category_ID: y['Question_Bank_Category_ID'],
              Question_Bank_Name:y['Question_Bank_Name'],
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
      this.router.navigateByUrl(`Teacher/${this.teacher_id}/ViewQuestionBanks/${this.teacher_id}`)
    });
  }

  onOptionsSelected(value: number) {
    console.log("the selected value is " + value);
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
  question: any[] = [];
  questions: any[]=[];


  banks: any[] =[];
  

  Question: string;
  teacher_id: any;
  qb_id: any;
  bank: any[]=[];
  question_id: any;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: TeacherService) {
    this.ActionType = "Create";
    this.Answer = "";
    this.Question = "";
    this.QbName = "";
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log('User:'+params['teacher_id']);
      this.teacher_id = params['teacher_id'];
      console.log('Action: '+params['ActionType']);
      this.ActionType = params['ActionType'];
      console.log('Question Bank: '+params['qb_id']);
      this.qb_id = params['qb_id'];
      console.log('Question: '+params['question_id']);
      this.question_id = params['question_id'];
      this.service.GetQuestionBank(this.qb_id).subscribe(x => {
        x.forEach(y => {
          this.bank.push({
            Question_Bank_ID: y['Question_Bank_ID'],
            Question_Bank_Category_ID: y['Question_Bank_Category_ID'],
            Question_Bank_Name:y['Question_Bank_Name'],
          });
        });

      });
        this.service.GetQuestionBanks().subscribe(x => {
          x.forEach(y => {
            this.banks.push({
              Question_Bank_ID: y['question_Bank_ID'],
              Question_Bank_Category_ID: y['question_Bank_Category_ID'],
              Question_Bank_Name:y['question_Bank_Name'],
            });
          });

        });
        this.service.GetQuestions().subscribe(x=> {
          console.log(x)
          x.forEach(y=>{
            this.questions.push({
              Question_ID: y['question_ID'],
              Question_Bank_ID: y['question_Bank_ID'],
              Question_Asked:y['question_Asked'],
              Answer:y['answer'],
            });
          });
        });
        if (this.ActionType != 'Create') {
        
          this.service.GetQuestion(this.question_id).subscribe(x => {
            this.selected = this.question_id;
            x.forEach(y => {
              this.question.push({
                Question_ID: y['Question_ID'],
                Answer: y['Answer'],
                Question_Asked:y['Question_Asked'],
              });
            });
  
          });
        }

    });
  }

  ngOnInit(): void {
    
  }
  onSubmit(f: NgForm){
    
    let data: Question = {
      Question_ID: Number(this.selected),
      Question_Bank_ID: Number(this.qb_id),
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
        this.router.navigateByUrl(`Teacher/${this.teacher_id}/ViewQuestionBanks/${this.teacher_id}`)
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
  user_id: any;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService, private service: MainService) {

    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['teacher_id']);
      this.user_id = params['teacher_id'];
      this.service.GetUser(this.user_id).subscribe(x=>{
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
    this.teacherServiceervice.GetQuestionBanks().subscribe(x=> {
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

@Component({
  selector: 'view-question-bank-question',
  templateUrl: './view-question-bank-question.html',
  styleUrls: ['./question.component.scss']
})
export class ViewQuestionBankQuestions implements OnInit {
  user: any[ ] = [];
  questionBankData: any[] = [];
  questions: any[] = [];
  user_id: any;
  qb_id: any;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService, private service: MainService) {

    GetCurrentPathParams(this.route).subscribe(params => {

      console.log(params['qb_id']);
      console.log(params['teacher_id'])
      this.qb_id = params['qb_id'];
      this.user_id = params['teacher_id']
      this.teacherServiceervice.GetQuestionBank(this.qb_id).subscribe(x=> {
        console.log(x)
        x.forEach(y=>{
          this.questionBankData.push({
            Question_Bank_ID: y['Question_Bank_ID'],
            Question_Bank_Category: y['Question_Bank_Category'],
            Question_Bank:y['Question_Bank_Name'],
          });
        });
        
      });
      this.teacherServiceervice.GetQuestionBankQuestions(this.qb_id).subscribe(x=> {
        console.log(x)
        x.forEach(y=>{
          this.questions.push({
            Question_ID: y['Question_ID'],
            Question: y['Question'],
            Answer: y['Answer'],
            Question_Bank:y['Question_Bank'],
          });
        });
        
      });
      this.service.GetUser(this.qb_id).subscribe(x=>{
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

  ngOnInit(): void {
    
  }



}