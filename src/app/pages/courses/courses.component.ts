import { MainService } from './../../services/main/main.service';
import { Course } from './../../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  observeCourses: Observable<Course[]> = this.service.getCourses();
  courseData: Course[] = [];
  slides = [
    {'image': '../../assets/images/courses/bible-hd.jpg'}, 
    {'image': '../../assets/images/courses/open-bible.jpg'},
    {'image': '../../assets/images/courses/llama.jpg'}, 
    {'image': '../../assets/images/courses/snail.jpg'},
    {'image': '../../assets/images/courses/possum.jpg'}
  ];
  constructor(private service: MainService) { }

  ngOnInit(): void {
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

  constructor() { }

  ngOnInit(): void {
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