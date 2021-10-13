import { AdministratorService } from './../../services/administrator/administrator.service';
import { MainService } from './../../services/main/main.service';
import { Church, Teaching_Level, Course, TeacherApplication, CourseInstance, Teacher, TeacherInformation } from './../../interfaces/index';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { openDialog } from '../../services/main/helpers/dialog-helper';
import { CourseType } from 'src/app/interfaces';
import {MatTableDataSource} from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import { TeacherService } from './../../services/teacher/teacher.service';
import {MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = false;
  showProfileSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showCourseSubmenu: boolean = false;

  UserImagePath: string;
  user: any[]=[];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService, private service: MainService) {
    this.UserImagePath = '/assets/images/login-user.jpeg'

    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['user_id']);
      var userid = params['user_id'];
      this.service.GetUser(userid).subscribe(x=>{
        console.log(x)
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

@Component({
  selector: 'apply-teacher',
  templateUrl: './apply-teacher.html',
  styleUrls: ['./user.component.scss']
})
export class ApplyTeacher implements OnInit {
  observeChurches: Observable<Church[]> = this.service.getChurches();
  churchData: Church[] = [];
  observeLevels: Observable<Teaching_Level[]> = this.service.getTeachingLevels();
  levelData: Teaching_Level[] = [];
  selected:number = 0;
  ActionType: string;
  user: any[] = [];
  userid: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private service: MainService, private adminservice: AdministratorService, private dialog: MatDialog) {
    this.ActionType = "Create";
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
     this.userid = params['id'];
      this.service.GetUser(this.userid).subscribe(x=>{
        console.log(x)
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
    this.observeChurches.subscribe(data => {
      this.churchData = data;
      console.log(this.churchData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.observeLevels.subscribe(data => {
      this.levelData = data;
      console.log(this.levelData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  
  onSubmit(f: NgForm) {

    var today = new Date();
    let data: TeacherApplication = {
      Teacher_Application_ID: this.selected,
      Teacher_Application_Status_ID: 3,
      Teaching_Level_ID: Number(f.value['TeachingLevel']),
      Application_Date: today,
      Application_Message: f.value["ApplicationMessage"],
      User_ID: Number(this.userid),
    }
    console.log(data);
      openDialog(this.dialog,'Are you sure you want to submit this application to be a teacher?',' Teacher application ',this.ActionType =='Delete'? 'red':'green').subscribe(res => {
        if(<boolean>res){
            this.service.ApplyAsTeacher(data).subscribe(x=> openDialog(this.dialog,'Application submittd successfully','Application submitted successfully',this.ActionType =='Delete'? 'red':'green').subscribe());
          
          this.router.navigateByUrl(`/User/${this.userid}`);

        }
      });

  }

}

@Component({
  selector: 'user-nav',
  templateUrl: './user-nav.html',
  styleUrls: ['./user.component.scss']
})
export class UserNav implements OnInit {
  LogoPath: string;
  SystemNamePath: string;
  constructor() { 
    this.LogoPath = '/assets/images/crc-logo.jpg',
    this.SystemNamePath = '/assets/images/crc-learning.jpeg'
  }

  ngOnInit(): void {  }

  
  //Navbar dropdown elements
  questionDropdown(){
    this.sideNavContentToggle('questionDropdownContent');
  }

  quizDropdown(){
    this.sideNavContentToggle('quizDropdownContent');
  }

  lessonSlotDropdown(){
    this.sideNavContentToggle('lessonSlotDropdownContent');
  }
  roleDropdown(){
    this.sideNavContentToggle('roleDropdownContent');
  }

  lessonDropdown(){
    this.sideNavContentToggle('lessonDropdownContent');
  }

profileDropdown(){
  const dropdownElement = document.getElementById("profileDropdownContent");
  const sidenav = document.getElementById("sidenav");
  if(sidenav!.style.width=="80px"){
    sidenav!.style.width="200px";
  }
  if(dropdownElement!.style.display=="none"){
    dropdownElement!.style.display="block"
  }else{
    dropdownElement!.style.display="none"
  }
}
//Navbar collapsable functionality
courseDropdown(){

  const dropdownElement = document.getElementById("courseDropdownContent");
  const sidenav = document.getElementById("sidenav");
  if(sidenav!.style.width=="80px"){
    sidenav!.style.width="200px";
  }

  if(dropdownElement!.style.display=="none"){
    dropdownElement!.style.display="block"
  }else{
    dropdownElement!.style.display="none"
  }
}

  sidenavCollapsing(){
    const sidenav = document.getElementById("sidenav");
    let elementIds:string[]=[
      "courseDropdownContent",
      "profileDropdownContent",
      "lessonDropdownContent",
      "lessonSlotDropdownContent",
      "questionDropdownContent"
    ];

    elementIds.forEach(element => {
      var t = document.getElementById(element);
      if(t!.style.display=="block"){
        t!.style.display="none"
      }
    });

    
    if(sidenav!.style.width=="200px"){
      sidenav!.style.width="80px";
    }else{
      sidenav!.style.width="200px";
    }
  }

  sideNavContentToggle(elementId:string){
    const dropdownElement = document.getElementById(elementId);
    const sidenav = document.getElementById("sidenav");
    if(sidenav!.style.width=="80px"){
      sidenav!.style.width="200px";
    }
    if(dropdownElement!.style.display=="none"){
      dropdownElement!.style.display="block"
    }else{
      dropdownElement!.style.display="none"
    }
  }



}
