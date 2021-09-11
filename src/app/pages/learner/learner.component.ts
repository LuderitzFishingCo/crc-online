import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.scss']
})
export class LearnerComponent implements OnInit {
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
  selector: 'learner-home',
  templateUrl: './learner-home.html',
  styleUrls: ['./learner.component.scss']
})
export class LearnerHome implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}