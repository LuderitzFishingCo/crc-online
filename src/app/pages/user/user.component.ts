import { MainService } from './../../services/main/main.service';
import { Church } from './../../interfaces/index';
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
  constructor(private fb: FormBuilder, private service: MainService) { }

  ngOnInit(): void {
    this.observeChurches.subscribe(data => {
      this.churchData = data;
      console.log(this.churchData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

}
