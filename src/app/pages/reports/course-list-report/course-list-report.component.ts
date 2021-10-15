import { LearnerService } from './../../../services/learner/learner.service';
import { MainService } from './../../../services/main/main.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetCurrentPathParams } from 'src/app/services/main/helpers/url-reader-helper';
import { GetCurrentRouteParams } from 'src/app/services/main/helpers/url-reader-helper';

@Component({
  selector: 'app-course-list-report',
  templateUrl: './course-list-report.component.html',
  styleUrls: ['./course-list-report.component.scss']
})
export class CourseListReportComponent implements OnInit {

  user: any[ ] = [];

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private learnerServiceervice: LearnerService, private service: MainService) {
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['id']);
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
      });

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
      });
    });
   }


  ngOnInit(): void {
  }

}
