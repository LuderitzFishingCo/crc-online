import { User } from './../../interfaces/index';
import { MainService } from './../../services/main/main.service';
import { TeacherService } from './../../services/teacher/teacher.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetCurrentPathParams } from 'src/app/services/main/helpers/url-reader-helper';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showCourseSubmenu: boolean = false;
  showLessonSubmenu: boolean = false;
  showLessonSlotSubmenu: boolean = false;
  showQuizSubmenu: boolean = false;
  showQuestionSubmenu: boolean = false;
  user: any[ ] = [];
  LogoPath: string;
  SystemNamePath: string;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService, private service: MainService) { 
  
    this.LogoPath = '/assets/images/crc-logo.jpg',
    this.SystemNamePath = '/assets/images/crc-learning.jpeg'
    GetCurrentPathParams(this.route).subscribe(params => {
        console.log(params['id']);
        var userid = params['id'];
        this.service.GetUser(userid).subscribe(x=>{
          x.forEach(y=>{
            this.user.push({
              User_ID: y['User_ID'],
              First_Name: y['First_Name'],
              Last_Name: y['Last_Name']
            })
          });
        })
      });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'learners-grade',
  templateUrl: './learners-grade.html',
  styleUrls: ['./teacher.component.scss']
})
export class LearnersGrade implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'learners-grade',
  templateUrl: './generate-certificate.html',
  styleUrls: ['./teacher.component.scss']
})
export class GenerateCertifcate implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}


@Component({
  selector: 'teacher-nav',
  templateUrl: './teacher-nav.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherNav implements OnInit {
 
  LogoPath: string;
  SystemNamePath: string;
  constructor() { 
    this.LogoPath = '/assets/images/crc-logo.jpg',
    this.SystemNamePath = '/assets/images/crc-learning.jpeg'
  }
  ngOnInit(): void {
  }

}