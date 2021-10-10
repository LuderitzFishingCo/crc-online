import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AdministratorService } from './../../services/administrator/administrator.service';
import { MainService } from './../../services/main/main.service';
import { Church, Teaching_Level, Course, TeacherApplication, CourseInstance, Teacher, TeacherInformation, CourseInstanceLearner } from './../../interfaces/index';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCurrentPathParams, GetCurrentRouteParams } from '../../services/main/helpers/url-reader-helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../sub-components/modal/modal.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { openDialog } from '../../services/main/helpers/dialog-helper';
import { CourseType } from 'src/app/interfaces';
import {MatTableDataSource} from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import { TeacherService } from './../../services/teacher/teacher.service';
import {MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  observeCourses: Observable<Course[]> = this.service.getRegisterCourses();
  courseData: any[] = [];
  user: any[]=[];
  slides = [
    {'image': '../../assets/images/courses/bible-hd.jpg'}, 
    {'image': '../../assets/images/courses/open-bible.jpg'},
    {'image': '../../assets/images/courses/llama.jpg'}, 
    {'image': '../../assets/images/courses/snail.jpg'},
    {'image': '../../assets/images/courses/possum.jpg'}
  ];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService,private service: MainService) { 
    
    GetCurrentPathParams(this.route).subscribe(params => {
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
    this.service.getRegisterCourses().subscribe(x=>{
      console.log(x)
      x.forEach(y=>{
        this.courseData.push({
          Course_ID: y['Course_ID'],
          Start_Date: y['Course_Instance_Start_Date'],
          End_Date: y['Courses_Instance_End_Date'],
          Course_Name: y['Course_Name']
        })
      });
    })


    this.observeCourses.subscribe(data => {
      this.courseData = data;
      console.log(this.courseData);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

}
@Component({
  selector: 'search-course',
  templateUrl: './search-course.html',
  styleUrls: ['./courses.component.scss']
})
export class SearchCourse implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'sermon',
  templateUrl: './sermon.html',
  styleUrls: ['./courses.component.scss']
})
export class SermonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


@Component({
  selector: 'register-course',
  templateUrl: './register-course.html',
  styleUrls: ['./courses.component.scss']
})
export class RegisterCourse implements OnInit {

  user: any[] = []; 
  courses: any[]=[];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,private teacherServiceervice: TeacherService,private service: MainService,) { 
    
    GetCurrentPathParams(this.route).subscribe(params => {
      console.log(params['user_id']);
      console.log(params['course_id']);
      var courseid = params['course_id']
      var userid = params['user_id'];
      this.service.GetUser(userid).subscribe(x=>{
        console.log(x)
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
      this.service.GetCourse(courseid).subscribe(x=>{
        console.log(x)
        x.forEach(y=>{
          this.courses.push({
            Course_ID: y['Course_ID'],
            Course_Name: y['Course_Name'],
            Course_Description: y['Course_Description'],
            Course_Code: y['Course_Code'],
            Start_Date: y['Start_Date'],
            End_Date: y['End_Date'],
          })
        });
      })
    });
  }
  ngOnInit(): void {
  }

  registerForCourse(f: NgForm){
    console.log(f.value["CourseType"])

    let data: CourseInstanceLearner = {
      Course_Instance_ID: Number( f.value['CourseID']),
      Learner_ID: f.value['Learner_ID'],
      Payment_Amount: f.value['PaymentAmount']      
    }
    this.service.RegisterForCourse(data).subscribe(x=> openDialog(this.dialog,'Registered successfully','Course  registered successfully','green').subscribe());
 
  }

}

@Component({
  selector: 'pay-course',
  templateUrl: './pay-course.html',
  styleUrls: ['./courses.component.scss']
})
export class PayCourse implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}