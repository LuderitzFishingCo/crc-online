import { Component, OnInit } from '@angular/core';
import { AdministratorService } from './../../../services/administrator/administrator.service';
import { MainService } from './../../../services/main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


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
      
    });
   }

  ngOnInit(): void {
  }

}
