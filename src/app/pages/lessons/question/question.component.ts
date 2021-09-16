import { QuestionBankCategory, Lesson } from './../../../interfaces/index';
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


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private service: TeacherService) { }
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
  selected: any;
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
      Question_Bank_ID: 0 || f.value['Question_Bank_ID'],
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

  Question: string;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    this.ActionType = "Create";
    this.Answer = "";
    this.Question = "";
    this.QbName = "";
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

  onSubmit(f: NgForm) {

    this.delay(2000).then(() => {
      console.log(f.value); 
      console.log(f.valid);
      this.openDialog();
    })



  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      content: 'Are you sure you want to delete this?',
      dialog_title: 'Delete Confirmation',
      color: 'red'
    };
    dialogConfig.width = '25%';

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

@Component({
  selector: 'view-question-bank',
  templateUrl: './view-question-bank.html',
  styleUrls: ['./question.component.scss']
})
export class ViewQuestionBank implements OnInit {

  constructor(private service: TeacherService) { }
  questionBankData: QuestionBank[] = [];

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
  }

}