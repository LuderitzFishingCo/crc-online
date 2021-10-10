import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AdministratorService } from './../../../services/administrator/administrator.service';
import { MainService } from './../../../services/main/main.service';
import { Church, Teaching_Level, Course, TeacherApplication, CourseInstance, Teacher, TeacherInformation, CourseInstanceLearner } from './../../../interfaces/index';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { openDialog } from '../../../services/main/helpers/dialog-helper';
import { CourseType } from 'src/app/interfaces';
import {MatTableDataSource} from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import { TeacherService } from './../../../services/teacher/teacher.service';
import {MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-learner-course',
  templateUrl: './learner-course.component.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LearnerCourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
@Component({
  selector: 'learner-lessons',
  templateUrl: './learner-lessons.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LearnerLessons implements OnInit {

  user: any[]=[];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService,private service: MainService) { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'learner-lesson',
  templateUrl: './learner-lesson.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LearnerLesson implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  openRatingDialog(): void{
    const dialogRef = this.dialog.open(LessonRatingComponent, {
      data: {}
    })
  }

}


@Component({
  selector: 'lesson-rating',
  templateUrl: './lesson-rating.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LessonRatingComponent implements OnInit {
  showFiller = false;

  constructor() { }

  ngOnInit(): void {

  }

}

@Component({
  selector: 'learner-grade',
  templateUrl: './learner-grade.html',
  styleUrls: ['./learner-course.component.scss']
})
export class LearnerGrade implements OnInit {
  showFiller = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  openLeaderDialog(): void{
    const dialogRef = this.dialog.open(Leaderboard, {
      data: {}
    })
  }

}


@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.html',
  styleUrls: ['./learner-course.component.scss']
})
export class Leaderboard implements OnInit {
  showFiller = false;
  constructor() { }
  ngOnInit(): void {  }
}

