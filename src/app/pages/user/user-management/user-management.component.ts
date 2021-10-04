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
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  ActionType: string;
  CourseName: string;
  File:any;
  LearnerName: string;
  selected:number = 0;
  user: any;
  
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: MainService, private adminservice: AdministratorService) {
    this.ActionType = "Create";
    this.File = null;
    this.CourseName = "";
    this.LearnerName = ""; 
  
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
      console.log(params['ActionType']);
      this.ActionType = params['ActionType'];

      var userid = params['id'];
    this.service.GetUser(userid).subscribe(x=>{
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
