import { Component, OnInit } from '@angular/core';
import { Course, CourseInstance } from './../../../../interfaces/index';
import { AdministratorService } from './../../../../services/administrator/administrator.service';
import { MainService } from './../../../../services/main/main.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { openDialog } from '../../../../services/main/helpers/dialog-helper';
import { CourseType } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-course-instance',
  templateUrl: './course-instance.component.html',
  styleUrls: ['./course-instance.component.scss']
})
export class CourseInstanceComponent implements OnInit {

  observeCourses: Observable<Course[]> = this.service.getCourses();
  courseData: Course[] = [];


  ActionType: string;
  CourseName: string;
  File:any;
  LearnerName: string;
  selected:number = 0;
  courseinstances: CourseInstance[]=[];
  admin_id: any;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: MainService, private adminservice: AdministratorService) {
    
    this.ActionType = "Create";
    this.File = null;
    this.CourseName = "";
    this.LearnerName = "";
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['admin_id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];
      this.admin_id = params['admin_id']
    });
  }

  ngOnInit(): void {


    this.adminservice.GetCourseInstances().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.courseinstances.push({
          Course_Instance_ID:y['Course_Instance_ID'],
          Course_Instance_End_Date:y['Course_Instance_End_Date'],
          Course_Instance_Start_Date:y['Course_Instance_Start_Date'],
          Course_ID:y['Course_ID']
        });
      });
      
    });

    this.observeCourses.subscribe(data => {
      this.courseData = data;
      console.log(this.courseData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  btnCancelClick(){

  }

  onSubmit(f: NgForm) {

    console.log(f.value["CourseType"])

    let data: CourseInstance = {
      Course_Instance_ID: 0,
      Course_ID: Number( f.value['CourseID']),
      Course_Instance_Start_Date: f.value['StartDate'],
      Course_Instance_End_Date: f.value['EndDate']      
    }
    console.log(data);
      openDialog(this.dialog,'Are you sure you want to '+this.ActionType+' this ?',this.ActionType+' course instance ',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
        if(<boolean>res){
          if(this.ActionType == 'Create'){
            this.adminservice.CreateCourseInstance(data).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Course  '+this.ActionType+'d successfully',this.ActionType =='Delete'? 'red':'green').subscribe());
          }else{
            this.adminservice.DeleteCourseInstance(this.selected).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Course  '+this.ActionType+'d successfully','red')
              .subscribe());
          }
          this.router.navigateByUrl(`/Administrator/${this.admin_id}/ViewCourses`);

        }
      });

  }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    this.selected = value;
  }
 
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
