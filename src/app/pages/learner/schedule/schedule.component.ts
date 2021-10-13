import { LearnerService } from './../../../services/learner/learner.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  lessons: any[] = [];
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important
    events:  [ this.lessons,
      { title: 'event 1', date: '2021-10-27' },
    ]
  };
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(private httpClient: HttpClient,private learnerservice: LearnerService) { 
    this.learnerservice.GetCourseInstanceLessons(1).subscribe(x=>{
      x.forEach(y=>{
        this.lessons.push({
          title: y['Lesson_Name'],
          date: y['Lesson_Date'],
        })
        console.log(this.lessons)
      });
    })
  }

  ngOnInit(){
     
      }

}
