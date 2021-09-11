import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';

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

  applications: any[]=[
    {
      applicationId:1,
      userId :'201'
    },
    {
      applicationId:5,
      userId :'281'
    },
    {
      applicationId:2,
      userId :'211'
    },
    
  ]

  ActionType: string;
  CourseName: string;
  File:any;
  LearnerName: string;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
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

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      content: 'Are you sure you want to delete this?',
      dialog_title: 'Delete Confirmation',
      color: 'red'
    };
    dialogConfig.width = '25%';

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
  
  constructor() { }

  ngOnInit(): void {
  }

}
