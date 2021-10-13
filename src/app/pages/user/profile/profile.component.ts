import { Title } from './../../../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { Gender, Church, Location, Department, User } from '../../../interfaces/index';
import { Observable } from 'rxjs';
import { AdministratorService } from './../../../services/administrator/administrator.service';
import { MainService } from './../../../services/main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

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
  updated_user: any;

  UserRegistrationForm: FormGroup = this.fb.group({
    First_Name:['',Validators.required],
    Last_Name:['',Validators.required],
    Gender_Id:['',Validators.required],
    Date_of_Birth:['',Validators.required],
    Department_ID:['',Validators.required],
    Phone_Number:['',Validators.required],
    Church_ID: ['',Validators.required],
    Location_ID:['',Validators.required],
    Email_Address: ['', Validators.email],
  });

  observeGenders: Observable<Gender[]> = this.service.getGenders();
  genderData: Gender[] = [];
  observeChurches: Observable<Church[]> = this.service.getChurches();
  churchData: Church[] = [];
  observeLocations: Observable<Location[]> = this.service.getLocations();
  locationData: Location[] = [];
  observeDepartments: Observable<Department[]> = this.service.getDepartments();
  departmentData: Department[] = [];
  observeTitles: Observable<Title[]> = this.service.getTitles();
  TitleData: Title[] = [];
  UserImagePath: string;
  LocationImagePath: string;
  user: any[ ] = [];
  user_id: number = 0;


  constructor(private fb: FormBuilder,private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private service: MainService, private adminservice: AdministratorService) { 
    this.UserImagePath = '/assets/images/login-user.jpeg'
    this.LocationImagePath='/assets/images/Location.jpeg'
    this.ActionType = "Create";
    this.File = null;
    this.CourseName = "";
    this.LearnerName = "";
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log('Action: '+params['ActionType']);
      this.ActionType = params['ActionType'];
      if(params['teacher_id']){
        this.user_id = params['teacher_id'];
      }else if(params['id']){
        this.user_id = params['id']
      }
    this.service.GetUser(this.user_id).subscribe(x=>{
      x.forEach(y=>{
        this.user.push({
          User_ID: y['User_ID'],
          First_Name: y['First_Name'],
          Last_Name: y['Last_Name'],
          Phone_Number: y['Phone_Number'],
          Gender_ID: y['Gender_ID'],
          Gender: y['Gender'],
          Department_ID: y['Department_ID'],
          Department: y['Department'],
          Location_ID: y['Location_ID'],
          City: y['City'],
          Country: y['Country'],
          Email_Address: y['Email_Address'],
          Date_of_Birth: y['Date_of_Birth'],
          Church_ID: y['Church_ID']
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

    this.observeTitles.subscribe(data => {
      this.TitleData = data;
      console.log(this.TitleData);
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
        //Update should be made here
        break;

      case "I am in CRC...":
        this.router.navigateByUrl(``)
        console.log('Should display updated details page')
        document.getElementById("FormLabel")!.innerHTML="Updated details";
        document.getElementById("userChurchForm")!.style.display="none";
        document.getElementById("ConfirmUpdateDetails")!.style.display="block";
        document.getElementById("btnNextUpdate")!.style.display="none";
        document.getElementById("userImage")!.style.display="block";
        document.getElementById("btnCancel")!.style.display="none";
        document.getElementById("btnUpdateUser")!.style.display="block";
        break;
  
    }
  }
  previousButtonOnClick(){
    var registrationFormLabel = document.getElementById("FormLabel")!.innerHTML;
    switch(registrationFormLabel){
        case"Updated details":
        document.getElementById("userImage")!.style.display="none";
        document.getElementById("FormLabel")!.innerHTML="I am in CRC...";
        document.getElementById("locationImage")!.style.display="none";
        document.getElementById("ConfirmUpdateDetails")!.style.display="none";
        document.getElementById("userChurchForm")!.style.display="block";
        document.getElementById("btnNextUpdate")!.style.display="block";
        document.getElementById("btnCancel")!.style.display="block";
        document.getElementById("btnUpdateUser")!.style.display="none";
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
  UpdateUser(){

   

    console.log('Updating user: ' + this.user_id);
    console.log('\n New First Name:'+this.UserRegistrationForm.value.First_Name);

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
