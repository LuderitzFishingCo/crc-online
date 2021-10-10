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
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.scss']
})
export class LearnerComponent implements OnInit {
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showCourseSubmenu: boolean = false;
  showLessonSubmenu: boolean = false;
  showLessonSlotSubmenu: boolean = false;
  showQuizSubmenu: boolean = false;
  showQuestionSubmenu: boolean = false;

  
  LogoPath: string;
  SystemNamePath: string;

  user: any[]=[];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService, private service: MainService) { 
    
    this.LogoPath = '/assets/images/crc-logo.jpg',
    this.SystemNamePath = '/assets/images/crc-learning.jpeg'
    
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      var userid = params['id'];
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
  selector: 'learner-home',
  templateUrl: './learner-home.html',
  styleUrls: ['./learner.component.scss']
})
export class LearnerHome implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}