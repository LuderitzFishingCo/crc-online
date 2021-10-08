import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  lineChartData: Chart.ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Line 1' },
    { data: [12, 45, 67, 69, 12, 67], label: 'Line 2' },
    { data: [12, 30, 20, 80, 15, 19], label: 'Line 3' },
  ];

  //lineChartLabels: MyLabels[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  lineChartOptions = {
    responsive: true,
  };
}
