import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-course-registration-report',
  templateUrl: './course-registration-report.component.html',
  styleUrls: ['./course-registration-report.component.scss']
})
export class CourseRegistrationReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  barChartType: Chart.ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: Chart.ChartDataSets[] = [
    { data: [30, 37, 60, 40, 40, 40], label: 'Series A' },

  ];

}
