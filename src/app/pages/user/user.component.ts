import { MainService } from './../../services/main/main.service';
import { Church, Teaching_Level } from './../../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showCourseSubmenu: boolean = false;
  showLessonSubmenu: boolean = false;
  showLessonSlotSubmenu: boolean = false;
  showQuizSubmenu: boolean = false;
  showQuestionSubmenu: boolean = false;

  loginGroup: FormGroup = this.fb.group({
    Email_Address: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    Password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
  });
  UserImagePath: string;

  constructor(private fb: FormBuilder) {
    this.UserImagePath = '/assets/images/login-user.jpeg'

   }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'apply-teacher',
  templateUrl: './apply-teacher.html',
  styleUrls: ['./user.component.scss']
})
export class ApplyTeacher implements OnInit {
  observeChurches: Observable<Church[]> = this.service.getChurches();
  churchData: Church[] = [];
  observeLevels: Observable<Teaching_Level[]> = this.service.getTeachingLevels();
  levelData: Teaching_Level[] = [];
  constructor(private fb: FormBuilder, private service: MainService) { }

  ngOnInit(): void {
    this.observeChurches.subscribe(data => {
      this.churchData = data;
      console.log(this.churchData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.observeLevels.subscribe(data => {
      this.levelData = data;
      console.log(this.levelData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

}

@Component({
  selector: 'user-nav',
  templateUrl: './user-nav.html',
  styleUrls: ['./user.component.scss']
})
export class UserNav implements OnInit {
  LogoPath: string;
  SystemNamePath: string;
  constructor() { 
    this.LogoPath = '/assets/images/crc-logo.jpg',
    this.SystemNamePath = '/assets/images/crc-learning.jpeg'
  }

  ngOnInit(): void {  }

  
  //Navbar dropdown elements
  questionDropdown(){
    this.sideNavContentToggle('questionDropdownContent');
  }

  quizDropdown(){
    this.sideNavContentToggle('quizDropdownContent');
  }

  lessonSlotDropdown(){
    this.sideNavContentToggle('lessonSlotDropdownContent');
  }
  roleDropdown(){
    this.sideNavContentToggle('roleDropdownContent');
  }

  lessonDropdown(){
    this.sideNavContentToggle('lessonDropdownContent');
  }

profileDropdown(){
  const dropdownElement = document.getElementById("profileDropdownContent");
  const sidenav = document.getElementById("sidenav");
  if(sidenav!.style.width=="80px"){
    sidenav!.style.width="200px";
  }
  if(dropdownElement!.style.display=="none"){
    dropdownElement!.style.display="block"
  }else{
    dropdownElement!.style.display="none"
  }
}
//Navbar collapsable functionality
courseDropdown(){

  const dropdownElement = document.getElementById("courseDropdownContent");
  const sidenav = document.getElementById("sidenav");
  if(sidenav!.style.width=="80px"){
    sidenav!.style.width="200px";
  }

  if(dropdownElement!.style.display=="none"){
    dropdownElement!.style.display="block"
  }else{
    dropdownElement!.style.display="none"
  }
}

  sidenavCollapsing(){
    const sidenav = document.getElementById("sidenav");
    let elementIds:string[]=[
      "courseDropdownContent",
      "profileDropdownContent",
      "lessonDropdownContent",
      "lessonSlotDropdownContent",
      "questionDropdownContent"
    ];

    elementIds.forEach(element => {
      var t = document.getElementById(element);
      if(t!.style.display=="block"){
        t!.style.display="none"
      }
    });

    
    if(sidenav!.style.width=="200px"){
      sidenav!.style.width="80px";
    }else{
      sidenav!.style.width="200px";
    }
  }

  sideNavContentToggle(elementId:string){
    const dropdownElement = document.getElementById(elementId);
    const sidenav = document.getElementById("sidenav");
    if(sidenav!.style.width=="80px"){
      sidenav!.style.width="200px";
    }
    if(dropdownElement!.style.display=="none"){
      dropdownElement!.style.display="block"
    }else{
      dropdownElement!.style.display="none"
    }
  }



}
