import { LessonSlot } from './../../interfaces/index';
import { HttpErrorResponse } from '@angular/common/http';
import { MainService } from './../../services/main/main.service';
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

  
  lessonData: Lesson[] = [];
  constructor(private service: TeacherService) { }

  ngOnInit(): void {

    this.service.GetLesson().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.lessonData.push({
          Lesson_Name:y['lesson_Name'],
          Lesson_Description:y['lesson_Description'],
          Lesson_Number:0,
          Lesson_ID:y['lesson_ID']
        });
      });
      
    });
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
  slots:LessonSlot[]=[ ]

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
              Lesson_Slot_ID:y['lesson_Slot_ID'],
              Lesson_Start:y['lesson_start'],
              Lesson_End:y['lesson_End']
            });
          });
          
        });
      }
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(f: NgForm) {


    let lesson_date = f.value['Date'];
    let data:LessonSlot= {
      Lesson_Slot_ID:0 || this.selected,
      Lesson_Start: lesson_date+f.value['StartTime'],
      Lesson_End: lesson_date+f.value['EndTime']
    };


    console.log(data)
 
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
          this.router.navigateByUrl('/Teacher/ViewLessonSlots');

        }
      });
  }

  onOptionsSelected(value:string,f: NgForm){
    console.log("the selected value is " + value);
    //f.controls['StartTime'].setValue(this.slots[+value]['StartTime'])

  // let st:string = <string>this.slots[+value]['Lesson_Start'];
  // let ed:Date = <Date>this.slots[+value]['Lesson_End'];

  //   f.controls['StartTime'].setValue(st.split('T')[1]);
  //   f.controls['EndTime'].setValue(ed.split('T')[1]);
  //   f.controls['Date'].setValue(ed.split('T')[0]);
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
      Lesson_ID:0 || f.value['LessonID'],
      Lesson_Name: f.value['LessonName'],
      Lesson_Description: f.value['MeetingLink'],
      Lesson_Number: 0,
    };


 console.log(data);
 console.log('Selected: '+this.selected)
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
          this.router.navigateByUrl('/ViewLessons');


        }
      });
  }

  onOptionsSelected(value:number){
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
//console.log(ld);
//console.log(ln);

    // f.controls['MeetingLink'].setValue(ld);
    // f.controls['LessonName'].setValue(ln);
    this.selected =+value;


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

@Component({
  selector: 'view-lesson-slot',
  templateUrl: './view-lesson-slot.html',
  styleUrls: ['./lessons.component.scss']
})
export class ViewLessonSlots implements OnInit {

  slots:LessonSlot[]=[  ]

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice:TeacherService) {


    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
        this.teacherServiceervice.GetLessonSlot().subscribe(x=> {
          x.forEach(y=>{
            this.slots.push({
              Lesson_Slot_ID:y['lesson_Slot_ID'],
              Lesson_Start:y['lesson_Start'],
              Lesson_End:y['lesson_End']
            });
          });
        });
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}