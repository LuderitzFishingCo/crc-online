import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../sub-components/modal/modal.component';
import { TeacherService } from '../../services/teacher/teacher.service';
import { TimeSlot, Lesson } from '../../interfaces';
import { Time } from '@angular/common';
import { Observable } from 'rxjs';
import { openDialog } from '../../services/main/helpers/dialog-helper';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'create-lesson-slot',
  templateUrl: './lesson-slots.html',
  styleUrls: ['./lessons.component.scss']
})
export class CreateLessonSlotComponent implements OnInit {

  ActionType: string;
  LessonDate: any;
  selected:any;
  slots:TimeSlot[]=[
    { 
      TimeSlotID:-1, 
      StartTime:"Select item",
      EndTime:null
    }
  ]

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice:TeacherService) {
    this.ActionType = "Create";
    this.LessonDate = "";   


    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];
      if(this.ActionType != 'Create'){
        this.teacherServiceervice.GetLessonSlot().subscribe(x=> {
          x.forEach(y=>{
            this.slots.push({
              TimeSlotID:y['time_Slot_ID'],
              StartTime:y['start_Time'],
              EndTime:y['end_Time']
            });
          });
          
        });
      }
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(f: NgForm) {

    let data:TimeSlot= {
      TimeSlotID:this.selected,
      StartTime: new Date(f.value['Date']+' '+f.value['EndTime']),
      EndTime: new Date(f.value['Date']+' '+f.value['StartTime'])
    };


 
      openDialog(this.dialog,'Are you sure you want to '+this.ActionType+' this slot?',this.ActionType+' lesson slot',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
        if(<boolean>res){
          if(this.ActionType == 'Create'){
            this.teacherServiceervice.CreateLessonSlot(data).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Lesson slot '+this.ActionType+'d successfully',this.ActionType =='Delete'? 'red':'green').subscribe());
          }
          else if(this.ActionType == 'Update'){
            this.teacherServiceervice.UpdateLessonSlot(data).subscribe(x=> 
            openDialog(this.dialog,this.ActionType+'d successfully','Lesson slot '+this.ActionType+'d successfully','green')
            .subscribe());
          }else{
            this.teacherServiceervice.DeleteLessonSlot(this.selected).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Lesson slot '+this.ActionType+'d successfully','red')
              .subscribe());
          }

        }
      });
  }

  onOptionsSelected(value:string,f: NgForm){
    console.log("the selected value is " + value);
    //f.controls['StartTime'].setValue(this.slots[+value]['StartTime'])

  let st:string = <string>this.slots[+value]['StartTime'];
  let ed:string = <string>this.slots[+value]['EndTime'];

    f.controls['StartTime'].setValue(st.split('T')[1]);
    f.controls['EndTime'].setValue(ed.split('T')[1]);
    f.controls['Date'].setValue(ed.split('T')[0]);
    this.selected=value;


}


}

@Component({
  selector: 'app-create-lesson',
  templateUrl: './lesson.html',
  styleUrls: ['./lessons.component.scss']
})
export class CreateLessonComponent implements OnInit {

  ActionType: string;
  LessonDate: any;
  selected:number = 0;
  slots:Lesson[]=[
  ]

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice:TeacherService) {
    this.ActionType = "Create";
    this.LessonDate = "";   


    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];
      if(this.ActionType != 'Create'){
        this.teacherServiceervice.GetLesson().subscribe(x=> {
          console.log(x)
          x.forEach(y=>{
            this.slots.push({
              Lesson_Name:y['lesson_Name'],
              Lesson_Description:y['lesson_Description'],
              Lesson_Number:0,
              Lesson_ID:y['lesson_ID']
            });
          });
          
        });
      }
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(f: NgForm) {

    let data:Lesson = {
      Lesson_ID:this.selected,
      Lesson_Name: f.value['LessonName'],
      Lesson_Description: f.value['MeetingLink'],
      Lesson_Number: 0,
    };


 console.log(data);
      openDialog(this.dialog,'Are you sure you want to '+this.ActionType+' this ?',this.ActionType+' lesson ',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
        if(<boolean>res){
          if(this.ActionType == 'Create'){
            this.teacherServiceervice.CreateLesson(data).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Lesson  '+this.ActionType+'d successfully',this.ActionType =='Delete'? 'red':'green').subscribe());
          }
          else if(this.ActionType == 'Update'){
            this.teacherServiceervice.UpdateLesson(data).subscribe(x=> 
            openDialog(this.dialog,this.ActionType+'d successfully','Lesson  '+this.ActionType+'d successfully','green')
            .subscribe());
          }else{
            this.teacherServiceervice.DeleteLesson(this.selected).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Lesson  '+this.ActionType+'d successfully','red')
              .subscribe());
          }

        }
      });
  }

  onOptionsSelected(value:string,f: NgForm){
    console.log("the selected value is " + value);
    //f.controls['StartTime'].setValue(this.slots[+value]['StartTime'])

    let i = 0;
    for (let index = 0; index < this.slots.length; index++) {
      if(this.slots[index].Lesson_ID == +value) {
        i=index;
        break;
      }
      
    }
  let ln:string = <string>this.slots[i]['Lesson_Name'];
  console.log(this.slots);
  let ld:string = <string>this.slots[i]['Lesson_Description'];
console.log(ld);
console.log(ln);

    f.controls['MeetingLink'].setValue(ld);
    f.controls['LessonName'].setValue(ln);
    this.selected=+value;


}

}

@Component({
  selector: 'app-assign-lesson-slot',
  templateUrl: './assign-lesson.html',
  styleUrls: ['./lessons.component.scss']
})
export class AssignLessonSlotComponent implements OnInit {

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
            TimeSlotID:y['time_Slot_ID'],
            StartTime:y['start_Time'],
            EndTime:y['end_Time']
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

