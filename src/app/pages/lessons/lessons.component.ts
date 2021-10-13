import { LessonSlot, Course, CourseInstance, LessonInstance } from './../../interfaces/index';
import { HttpErrorResponse, HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './../../services/main/main.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  
  LessonDate: any;
  selected:number = 0;
  slots:LessonSlot[]=[ ]
  teacher_id: any;
  lessonData: Lesson[] = [];
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice:TeacherService) { 

    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['teacher_id']);
      console.log(params['ActionType']);
      this.teacher_id = params['teacher_id']
    });
  }

  ngOnInit(): void {

    this.teacherServiceervice.GetLessons().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.lessonData.push({
          Lesson_Name:y['Lesson_Name'],
          Lesson_Description:y['Lesson_Description'],
          Lesson_Number:0,
          Lesson_ID:y['Lesson_ID']
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
  selected:number = 0;
  slots:LessonSlot[]=[ ]
  lesson_slot: any[]=[];
  teacher_id: any;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice:TeacherService) {
    this.ActionType = "Create";
    this.LessonDate = "";   


    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['teacher_id']);
      console.log(params['ActionType']);
      console.log(params['lesson_slot_id']);

      this.ActionType = params['ActionType'];
      this.teacher_id = params['teacher_id'];
      if(this.ActionType != 'Create'){
        this.selected=Number(params['lesson_slot_id'])
        this.teacherServiceervice.GetLessonSlot(params['lesson_slot_id']).subscribe(x=>{
          console.log(x)
          x.forEach(y=>{
            this.lesson_slot.push({
              Lesson_Slot_ID: y['Lesson_Slot_ID'],
              Lesson_Date: y['Lesson_Date'],
              Lesson_Start: y['Lesson_Start'],
              Lesson_End: y['Lesson_End']
            })
          })
        })
      }
      if(this.ActionType != 'Create'){
        this.teacherServiceervice.GetLessonSlots().subscribe(x=> {
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


    let chosen_date =  new Date(f.value['Date']);
    let lesson_date = chosen_date.toLocaleDateString()
    let lesson_start = new Date(lesson_date + ' '+ f.value['StartTime'])
    let lesson_end = new Date(lesson_date + ' '+f.value['EndTime'])
    let data:LessonSlot= {
      Lesson_Slot_ID:this.selected,
      Lesson_Start: lesson_start,
      Lesson_End: lesson_end
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
          this.router.navigateByUrl(`/Teacher/${this.teacher_id}/ViewLessonSlots/${this.teacher_id}`);

        }
      });
  }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    this.selected=value;
}


}

@Component({
  selector: 'app-create-lesson',
  templateUrl: './lesson.html',
  styleUrls: ['./lessons.component.scss']
})
export class CreateLessonComponent implements OnInit {
  progress: number = 0;
  message: string  = "";
  @Output() public onUploadFinished = new EventEmitter();
  ActionType: string;
  LessonDate: any;
  selected:number = 0;
  lessons:Lesson[]=[];
  slots: any[]=[];
  courses: any[] = [];
  teacher_id: any;
  lesson: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice:TeacherService, private http: HttpClient) {
    this.ActionType = "Create";
    this.LessonDate = "";   
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log('User: '+params['teacher_id']);
      console.log('Action: '+params['ActionType']);
      this.ActionType = params['ActionType'];
      this.teacher_id = params['teacher_id']
      if(this.ActionType != 'Create'){
        this.selected=params['lesson_id']
        this.teacherServiceervice.GetLesson(params['lesson_id']).subscribe(x=>{
          console.log(x)
          x.forEach(y=>{
            this.lesson.push({
              Lesson_ID: y['Lesson_ID'],
              Lesson_Name: y['Lesson_Name'],
              Lesson_Description: y['Lesson_Description'],
              Lesson_Number: y['Lesson_Number']
            })
          })
        })
      }
    });
  }

  ngOnInit(): void {
    
  }
  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:60000/api/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / 100);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
  uploadFiles(g: NgForm){
    console.log('Files: '+  g.value['File'])
  }

  onSubmit(f: NgForm) {

    let data:Lesson = {
      Lesson_ID:  Number(this.selected),
      Lesson_Name: f.value['LessonName'],
      Lesson_Description: f.value['MeetingLink'],
      Lesson_Number: Number(f.value['LessonNumber']),
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
          this.router.navigateByUrl(`/Teacher/${this.teacher_id}/ViewLessons/${this.teacher_id}`);

        }
      });
  }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    //f.controls['StartTime'].setValue(this.slots[+value]['StartTime'])

    let i = 0;
    for (let index = 0; index < this.lessons.length; index++) {
      if(this.lessons[index].Lesson_ID == +value) {
        i=index;
        break;
      }
      
    }
  let ln:string = <string>this.lessons[i]['Lesson_Name'];
  console.log(this.lessons);
  let ld:string = <string>this.lessons[i]['Lesson_Description'];
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
  slots:any[]=[];
  courses: CourseInstance[]=[];
  selected2: number=0;
  selected1: number=0;
  teacher_id: any;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private teacherServiceervice : TeacherService) {
    this.ActionType = "Create";
    this.LessonName = "";
    this.Lesson = "";

    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['teacher_id']);
      this.teacher_id = params['teacher_id']
    });
      this.teacherServiceervice.GetLessons().subscribe(x=> {
        console.log(x)
        x.forEach(y=>{
          this.lessons.push({
            Lesson_Name:y['Lesson_Name'],
            Lesson_Description:y['Lesson_Description'],
            Lesson_Number:0,
            Lesson_ID:y['Lesson_ID']
          });
        });
        
      });
      this.teacherServiceervice.GetLessonSlots().subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          this.slots.push({
            Lesson_Slot_ID: y['Lesson_Slot_ID'],
            Lesson_Date: y['Lesson_Date'],
            Lesson_Start: y['Lesson_Start'],
            Lesson_End: y['Lesson_End']
          })
        })
      })
      this.teacherServiceervice.GetCourseInstances().subscribe(x=> {
        x.forEach(y=>{
          this.courses.push({
            Course_Instance_ID: y['Course_Instance_ID'],
            Course_ID:y['Course_Name'],
            Course_Instance_Start_Date:y['Course_Instance_Start_Date'],
            Course_Instance_End_Date:y['Course_Instance_End_Date']
          });
        });        
      });
  }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {

    let data:LessonInstance = {
      Lesson_Instance_ID: 0,
      Lesson_ID: Number(f.value['Lesson']),
      Course_Instance_ID: Number(f.value['Course']),
      Lesson_Slot_ID: Number(f.value['LessonSlot'])
    };
    console.log(data)
    openDialog(this.dialog,'Are you sure you want to assign this ?','Assign',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
      if(<boolean>res){
        if(this.ActionType == 'Create'){
          this.teacherServiceervice.CreateLessonInstance(data).subscribe(x=> 
            openDialog(this.dialog,'Assigned successfully','Lesson instance '+this.ActionType+'d successfully',this.ActionType =='Delete'? 'red':'green').subscribe());
            this.router.navigateByUrl(`Teacher/${this.teacher_id}/ViewLessonInstances`)
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

  observeSlots: Observable<Course[]> = this.teacherServiceervice.GetLessonSlots();
  slots:any[]=[  ]
  teacher_id: any;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice:TeacherService) {
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log('Teacher user id:'+params['teacher_id']);
      this.teacher_id = params['teacher_id']
    });
  }
  ngOnInit(): void {
    this.observeSlots.subscribe(data => {
      this.slots =data;
      console.log(this.slots)
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
  
}