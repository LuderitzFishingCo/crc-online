import { Lesson, TimeSlot, Quiz } from './../../../interfaces/index';
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
      Lesson_ID: Number(f.value['LessonID']),
      DueDate: (f.value['DueDate']),
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

  openDialog() {

    openDialog(this.dialog,'Are you sure you want to '+this.ActionType+' this ?',this.ActionType+'',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
      if(<boolean>res){
        if(this.ActionType == 'Create'){
            openDialog(this.dialog,this.ActionType+'d successfully',' '+this.ActionType+'d successfully',this.ActionType =='Create'? 'red':'green').subscribe();
        }
        else if(this.ActionType == 'Update'){
          openDialog(this.dialog,this.ActionType+'d successfully',' '+this.ActionType+'d successfully','green')
          .subscribe();
        }else{
            openDialog(this.dialog,this.ActionType+'d successfully',' '+this.ActionType+'d successfully','red')
            .subscribe();
        }

      }
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
  slots:TimeSlot[]=[];
  selected2: number=0;
  selected1: number=0;


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

      this.teacherServiceervice.GetLessonSlot().subscribe(x=> {
        x.forEach(y=>{
          this.slots.push({
            Time_Slot_ID:y['time_Slot_ID'],
            Start_Time:y['start_Time'],
            End_Time:y['end_Time']
          });
        });
        
      });
  }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {
    openDialog(this.dialog,'Are you sure you want to '+this.ActionType+' this ?',this.ActionType+'',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
      if(<boolean>res){
        if(this.ActionType == 'Create'){
            openDialog(this.dialog,this.ActionType+'d successfully',' '+this.ActionType+'d successfully',this.ActionType =='Create'? 'red':'green').subscribe();
        }
        else if(this.ActionType == 'Update'){
          openDialog(this.dialog,this.ActionType+'d successfully',' '+this.ActionType+'d successfully','green')
          .subscribe();
        }else{
            openDialog(this.dialog,this.ActionType+'d successfully',' '+this.ActionType+'d successfully','red')
            .subscribe();
        }

      }
    });

  }


  onOptionsSelected(f: NgForm){
    this.selected1=+f.value['Lesson'];
    this.selected2=+f.value['LessonSlot'];
}

}
