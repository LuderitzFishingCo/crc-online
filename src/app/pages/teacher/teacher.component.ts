import { Component, OnInit } from '@angular/core';

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


  constructor() { }

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