import { Component, OnInit } from '@angular/core';
import { Gender, Church, Locations, Department, User } from '../../../interfaces/index';
import { Observable } from 'rxjs';
import { MainService } from './../../../services/main/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  observeGenders: Observable<Gender[]> = this.service.getGenders();
  genderData: Gender[] = [];
  observeChurches: Observable<Church[]> = this.service.getChurches();
  churchData: Church[] = [];
  observeLocations: Observable<Locations[]> = this.service.getLocations();
  locationData: Locations[] = [];
  observeDepartments: Observable<Department[]> = this.service.getDepartments();
  departmentData: Department[] = [];
  UserImagePath: string;
  LocationImagePath: string;

  constructor(private service: MainService) { 
    this.UserImagePath = '/assets/images/login-user.jpeg'
    this.LocationImagePath='/assets/images/Location.jpeg'

  }

  ngOnInit(): void {
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
