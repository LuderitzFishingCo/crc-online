import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

