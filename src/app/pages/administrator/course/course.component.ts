import { AdministratorService } from './../../../services/administrator/administrator.service';
import { Course } from './../../../interfaces/index';
import { MainService } from './../../../services/main/main.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { openDialog } from '../../../services/main/helpers/dialog-helper';
import { CourseType } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  observeCourseTypes: Observable<CourseType[]> = this.service.getCoursTypes();
  courseTypeData: CourseType[] = [];

  observeCourses: Observable<Course[]> = this.service.getCourses();
  courseData: Course[] = [];


  ActionType: string;
  CourseName: string;
  File:any;
  LearnerName: string;
  selected:number = 0;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: MainService, private adminservice: AdministratorService) {
    
    this.ActionType = "Create";
    this.File = null;
    this.CourseName = "";
    this.LearnerName = "";
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];
    });
  }

  ngOnInit(): void {
    this.observeCourseTypes.subscribe(data => {
      this.courseTypeData = data;
      console.log(this.courseTypeData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
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
    let data: Course = {
      Course_ID: this.selected,
      Course_Description: f.value["CourseDescription"],
      Course_Name: f.value["CourseName"],
      Course_Type_ID: Number(f.value["CourseType"]),
      Course_Code: 'PUT IN AN INPUT',
      Course_Picture: f.value["CourseDescription"]
    }
    console.log(data);
    console.log('Deleting from Course ID'+this.selected)
      openDialog(this.dialog,'Are you sure you want to '+this.ActionType+' this ?',this.ActionType+' lesson ',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
        if(<boolean>res){
          if(this.ActionType == 'Create'){
            this.adminservice.CreateCourse(data).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Course  '+this.ActionType+'d successfully',this.ActionType =='Delete'? 'red':'green').subscribe());
          }
          else if(this.ActionType == 'Update'){
            this.adminservice.UpdateCourse(data).subscribe(x=> 
            openDialog(this.dialog,this.ActionType+'d successfully','Course  '+this.ActionType+'d successfully','green').subscribe());
          }else{
            this.adminservice.DeleteCourse(this.selected).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Course  '+this.ActionType+'d successfully','red')
              .subscribe());
          }
          this.router.navigateByUrl('/Administrator/ViewCourses');

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


@Component({
  selector: 'view-courses',
  styleUrls: ['./course.component.scss'],
  templateUrl: 'view-courses.html',animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewCourses implements OnInit {

  observeCourses: Observable<Course[]> = this.service.getCourses();
  courseData: Course[] = [];

  columnsToDisplay : string[] = ['Name', 'Course Type'];
  expandedElement: Course | null | undefined;

  constructor(public dialog: MatDialog, private service: MainService) {  

   }
  
  ngOnInit(): void {


    this.observeCourses.subscribe(data => {
      this.courseData = data;
      console.log(this.courseData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
}