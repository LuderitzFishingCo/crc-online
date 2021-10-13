import { Title } from './../../../interfaces/index';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MainService } from './../../../services/main/main.service';
import { Gender, Church, Location, Department, User } from '../../../interfaces/index';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { openDialog } from '../../../services/main/helpers/dialog-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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

  UserRegistrationForm: FormGroup = this.fb.group({
    First_Name:['',Validators.required],
    Last_Name:['',Validators.required],
    Gender_Id:['',Validators.required],
    Date_of_Birth:['',Validators.required],
    Department_ID:['',Validators.required],
    Phone_Number:['',Validators.required],
    Church_ID: ['',Validators.required],
    Location_ID:['',Validators.required],
    Title_ID: ['', Validators.required],
    Email_Address: ['', Validators.email],
    Username:['',Validators.required],
    Password:['',Validators.required]
  });


  constructor(private service: MainService, private fb: FormBuilder, public dialog: MatDialog,private snack: MatSnackBar, private router: Router) {
    
    this.UserImagePath = '/assets/images/user-profile.jpeg',
    this.LocationImagePath='/assets/images/crc-learning.jpeg'
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

  nextRegisterButtonOnClick(){
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
        break;

      case "I am in CRC...":
        document.getElementById("FormLabel")!.innerHTML="Login Details";
        document.getElementById("userChurchForm")!.style.display="none";
        document.getElementById("userLoginDetailsForm")!.style.display="block";
        document.getElementById("btnNextRegister")!.style.display="none";
        document.getElementById("btnRegister")!.style.display="block";

        break;

      /*
      case "Login Details":
        This is where user has to be registered;
       */
    }
  }
  previousButtonOnClick(){
    var registrationFormLabel = document.getElementById("FormLabel")!.innerHTML;
    switch(registrationFormLabel){
        case"Login Details":
        document.getElementById("FormLabel")!.innerHTML="I am in CRC...";
        document.getElementById("locationImage")!.style.display="none";
        document.getElementById("userLoginDetailsForm")!.style.display="none";
        document.getElementById("userChurchForm")!.style.display="block";
        document.getElementById("btnNextRegister")!.innerHTML="Next";
        break;

        case"I am in CRC...":
        document.getElementById("FormLabel")!.innerHTML="Location Details";
        document.getElementById("locationImage")!.style.display="block";
        document.getElementById("userChurchForm")!.style.display="none";
        document.getElementById("userLocationDetailsForm")!.style.display="block";
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

  addLocationButtonOnClick(){
    document.getElementById("userAddLocationForm")!.style.display="block";
  }
  addLocation(f: NgForm){
    let data: Location = {
      Location_ID: 0,
      City: f.value['City'],
      Country: f.value['Country']
    }
    console.log(data)
    openDialog(this.dialog,'Are you sure you want to add this location?',' location ','green').subscribe(res=>{
      
    this.service.AddLocation(data).subscribe(x=> 
      openDialog(this.dialog,'Added successfully','Locaion added successfully','green').subscribe());
    });

    document.getElementById("userAddLocationForm")!.style.display="none";
  }

  register(){
    var today = new Date();
    let data: User = {
      User_id: 0,
      Department_ID: Number(this.UserRegistrationForm.value.Department_ID),
      Location_ID:  Number(this.UserRegistrationForm.value.Location_ID),
      Church_ID: Number(this.UserRegistrationForm.value.Church_ID),
      Gender_ID: Number(this.UserRegistrationForm.value.Gender_Id),
      Title_ID: Number(this.UserRegistrationForm.value.Title_ID),
      User_Role_ID: 2,
      First_Name: this.UserRegistrationForm.value.First_Name,
      Last_Name: this.UserRegistrationForm.value.Last_Name,
      Date_of_Birth: this.UserRegistrationForm.value.Date_of_Birth,
      Phone_Number: this.UserRegistrationForm.value.Phone_Number,
      Username: this.UserRegistrationForm.value.Username,
      Email_Address: this.UserRegistrationForm.value.Email_Address,
      Password: this.UserRegistrationForm.value.Password,
      User_Join_Date: today
    }
    console.log(data)
    this.service.Register(data).subscribe(res => {
      this.snack.open('Successful registration', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000
      });
    }, (error: HttpErrorResponse) => {
      if (error.status === 403) {
        this.snack.open('This user has already been registered.', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000
        });
      }
      this.snack.open('An error occurred on our servers, try again', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000
      });
    })
    this.router.navigateByUrl(`/`);
  }

}
