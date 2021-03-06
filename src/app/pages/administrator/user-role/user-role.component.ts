import { MainService } from './../../../services/main/main.service';
import { User_Role } from './../../../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { openDialog } from '../../../services/main/helpers/dialog-helper';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  observeUserRoles: Observable<User_Role[]> = this.service.getUserRoles();
  userRoleData: User_Role[] = [];

  ActionType: string;
  CourseName: string;
  File:any;
  LearnerName: string;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: MainService) {
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
    this.observeUserRoles.subscribe(data => {
      this.userRoleData = data;
      console.log(this.userRoleData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  btnCancelClick(){

  }

  onSubmit(f: NgForm) {

    this.delay(2000).then(() => {
      console.log(f.value); 
      console.log(f.valid);
      this.openDialog();
    })



  }

  openDialog() {

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

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
