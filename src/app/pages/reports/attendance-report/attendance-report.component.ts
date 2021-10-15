import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

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
