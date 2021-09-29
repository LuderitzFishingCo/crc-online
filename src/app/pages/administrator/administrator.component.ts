import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { Course, CourseInstance, Teacher, TeacherInformation } from './../../interfaces/index';
import { AdministratorService } from './../../services/administrator/administrator.service';
import { MainService } from './../../services/main/main.service';
import { openDialog } from '../../services/main/helpers/dialog-helper';
import { CourseType } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showCourseSubmenu: boolean = false;
  showLessonSubmenu: boolean = false;
  showLessonSlotSubmenu: boolean = false;
  showQuizSubmenu: boolean = false;
  showQuestionSubmenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'administrator-home',
  templateUrl: './administrator-home.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdminHome implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}


@Component({
  selector: 'app-application',
  templateUrl: './assess-application.html',
  styleUrls: ['./administrator.component.scss']
})
export class ApplicationComponent implements OnInit {

  applications: any[]=[  ]

  ActionType: string;
  CourseName: string;
  File:any;
  LearnerName: string;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: AdministratorService) {
    this.ActionType = "Create";
    this.File = null;
    this.CourseName = "";
    this.LearnerName = "";

    this.service.GetPendingTeacherApplications().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.applications.push({
          Teacher_Application_ID:y['Teacher_Application_ID'],
          First_Name:y['First_Name'],
          Last_Name:y['Last_Name'],
          Application_Date: y['Application_Date'],
          Application_Message: y['Application_Message'],
          Teaching_Level: y['Teaching_Level'],
          User_ID: y['User_ID']
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


  acceptApplication(id: number) {
    console.log(id)
    this.service.AcceptApplication(id).subscribe(x=>openDialog(this.dialog,this.ActionType+'Application accepted','Course  '+this.ActionType+'d successfully','red').subscribe());
  }

  declineApplication(id: number){
    console.log(id)
    this.service.DeclineApplication(id).subscribe(x=>openDialog(this.dialog,this.ActionType+'Application deleted','Course  '+this.ActionType+'d successfully','red').subscribe());
    } 

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-payment',
  templateUrl: './capture-payment.html',
  styleUrls: ['./administrator.component.scss']
})
export class PaymentComponent implements OnInit {
  
  topColumn: string[] = ['position'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource:PeriodicElement[] = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}


@Component({
  selector: 'app-assign-teacher',
  templateUrl: './assign-teacher.html',
  styleUrls: ['./administrator.component.scss']
})
export class AssignTeacher implements OnInit {
  
  ActionType: string;
  CourseName: string;
  File:any;
  LearnerName: string;
  selected:number = 0;
  courseinstances: any[]=[];
  teachers: any[] =[];
  // teachers: TeacherInformation[] =[ ];
  teacher: Teacher[] = [];

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
    this.adminservice.GetCourseInstances().subscribe(x=> {
      console.log(x)
      x.forEach(y=>{
        this.courseinstances.push({
          Course_Instance_ID:y['Course_Instance_ID'],
          Course_Name: y['Course_Name'],
          Course_Instance_End_Date:y['Course_Instance_End_Date'],
          Course_Instance_Start_Date:y['Course_Instance_Start_Date'],
        });
      });
    });
    this.adminservice.GetTeachers().subscribe(x=>{
      console.log(x)
      x.forEach(y=>{
        this.teachers.push({
          User_ID:y['User_ID'],
          First_Name:y['First_Name'],
          Last_Name:y['Last_Name'],
        });
      });
    });
  }

  onSubmit(f: NgForm) {

    let data: CourseInstance = {
      Course_Instance_ID: 0,
      Course_ID: Number( f.value['CourseID']),
      Course_Instance_Start_Date: f.value['StartDate'],
      Course_Instance_End_Date: f.value['EndDate']      
    }
    console.log(data);
    console.log('Deleting from Course ID'+this.selected)
      openDialog(this.dialog,'Are you sure you want to '+this.ActionType+' this ?',this.ActionType+' lesson ',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
        if(<boolean>res){
          if(this.ActionType == 'Create'){
            this.adminservice.CreateCourseInstance(data).subscribe(x=> 
              openDialog(this.dialog,this.ActionType+'d successfully','Course  '+this.ActionType+'d successfully',this.ActionType =='Delete'? 'red':'green').subscribe());
          }else{
            this.adminservice.DeleteCourseInstance(this.selected).subscribe(x=> 
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
