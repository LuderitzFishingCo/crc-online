import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../services/teacher/teacher.service';
import { GetCurrentPathParams } from '../../services/main/helpers/url-reader-helper';
import {LineChartComponent} from '../../pages/reports/line-chart/line-chart.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  selectedReport:number = -1;
  t:string='xxxxxx';
  constructor(private router: Router, private route: ActivatedRoute, private ts: TeacherService) { 
    // GetCurrentPathParams(this.route).subscribe(params => {
    //   this.selectedReport = +params['id'];
    //   console.log(params['id'])
    //   if (this.selectedReport != -1) {
    //     this.ts.GetReportData().subscribe(x => {
    //       // x.forEach(y => {
    //       //   this.bank.push({
    //       //     QuestionBankID: y['question_Bank_ID'],
    //       //     QuestionBankCategoryID: y['question_Bank_Category_ID'],
    //       //     QuestionBankName:'',
    //       //     CourseInstanceID:0,
    //       //   });
    //       // });

    //     });
    //   }
    // });
  }

  ngOnInit(): void {
  }

}
