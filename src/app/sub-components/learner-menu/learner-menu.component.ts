import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learner-menu',
  templateUrl: './learner-menu.component.html',
  styleUrls: ['./learner-menu.component.scss']
})
export class LearnerMenuComponent implements OnInit {
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
