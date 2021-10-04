import { Component, OnInit } from '@angular/core';
import { Gender, Church, Location, Department, User } from '../../../interfaces/index';
import { Observable } from 'rxjs';
import { AdministratorService } from './../../../services/administrator/administrator.service';
import { MainService } from './../../../services/main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

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

  observeGenders: Observable<Gender[]> = this.service.getGenders();
  genderData: Gender[] = [];
  observeChurches: Observable<Church[]> = this.service.getChurches();
  churchData: Church[] = [];
  observeLocations: Observable<Location[]> = this.service.getLocations();
  locationData: Location[] = [];
  observeDepartments: Observable<Department[]> = this.service.getDepartments();
  departmentData: Department[] = [];
  UserImagePath: string;
  LocationImagePath: string;
  user: any[ ] = [];


  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: MainService, private adminservice: AdministratorService) { 
    this.UserImagePath = '/assets/images/login-user.jpeg'
    this.LocationImagePath='/assets/images/Location.jpeg'
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
    this.observeGenders.subscribe(data => {
      this.genderData = data;
      console.log(this.genderData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.observeChurches.subscribe(data => {
      this.churchData = data;
      console.log(this.churchData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.observeLocations.subscribe(data => {
      this.locationData = data;
      console.log(this.locationData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.observeDepartments.subscribe(data => {
      this.departmentData = data;
      console.log(this.departmentData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
  

  nextUpdateButtonOnClick(){
    var registrationFormLabel = document.getElementById("FormLabel")!.innerHTML;

    switch(registrationFormLabel){
      case "Personal Details":
        document.getElementById("FormLabel")!.innerHTML="Location Details";
        document.getElementById("userImage")!.style.display="none";
        document.getElementById("locationImage")!.style.display="block";
        document.getElementById("userPersonalDetailsForm")!.style.display="none";
        document.getElementById("userLocationDetailsForm")!.style.display="block";
        document.getElementById("btnPrevious")!.style.display="inline";
        break;

      case "Location Details":
        document.getElementById("FormLabel")!.innerHTML="I am in CRC...";
        document.getElementById("locationImage")!.style.display="none";
        document.getElementById("userLocationDetailsForm")!.style.display="none";
        document.getElementById("userChurchForm")!.style.display="block";
        document.getElementById("btnNextUpdate")!.innerHTML="Update";
        //Update should be made here
        break;

      case "I am in CRC...":
        document.getElementById("mainHeading")!.innerHTML="Updated Profile";
        document.getElementById("FormLabel")!.innerHTML="Updated details";
        document.getElementById("userChurchForm")!.style.display="none";
        document.getElementById("ConfirmUpdateDetails")!.style.display="block";
        document.getElementById("btnNextUpdate")!.innerHTML="OK";
        document.getElementById("userImage")!.style.display="block";
        document.getElementById("btnCancel")!.style.display="none";
        break;

      /*
      case "Updated details":
        This should take the user back to user home screen
       */
    }
  }
  previousButtonOnClick(){
    var registrationFormLabel = document.getElementById("FormLabel")!.innerHTML;
    switch(registrationFormLabel){
        case"Updated details":
        document.getElementById("mainHeading")!.innerHTML="Update Profile";
        document.getElementById("userImage")!.style.display="none";
        document.getElementById("FormLabel")!.innerHTML="I am in CRC...";
        document.getElementById("locationImage")!.style.display="none";
        document.getElementById("ConfirmUpdateDetails")!.style.display="none";
        document.getElementById("userChurchForm")!.style.display="block";
        document.getElementById("btnNextUpdate")!.innerHTML="Update";
        document.getElementById("btnCancel")!.style.display="block";
        break;

        case"I am in CRC...":
        document.getElementById("FormLabel")!.innerHTML="Location Details";
        document.getElementById("locationImage")!.style.display="block";
        document.getElementById("userChurchForm")!.style.display="none";
        document.getElementById("userLocationDetailsForm")!.style.display="block";
        document.getElementById("btnNextUpdate")!.innerHTML="Next";
        break;

        case"Location Details":
        document.getElementById("FormLabel")!.innerHTML="Personal Details";
        document.getElementById("locationImage")!.style.display="none";
        document.getElementById("userImage")!.style.display="block";
        document.getElementById("userLocationDetailsForm")!.style.display="none";
        document.getElementById("userPersonalDetailsForm")!.style.display="block";
        document.getElementById("btnPrevious")!.style.display="none";
        break;
    }

  }


}


@Component({
  selector: 'delete-profile',
  templateUrl: './delete-profile.html',
  styleUrls: ['./profile.component.scss']
})
export class DeleteProfile implements OnInit {


  UserImagePath: string;
  LocationImagePath: string;

  constructor(private service: MainService) { 
    this.UserImagePath = '/assets/images/login-user.jpeg'
    this.LocationImagePath='/assets/images/Location.jpeg'

  }

  ngOnInit(): void {
  }

}
