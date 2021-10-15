import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.scss']
})
export class ProgressReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  barChartOptions: ChartOptions = {
    responsive: true,

  };
  barChartLabels: Label[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  barChartType: Chart.ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: Chart.ChartDataSets[] = [
    { data: [30, 37, 60, 40, 40, 40], label: 'Series A' }
  ];

  getDateCreated(){
    let today = new Date().toLocaleDateString();
    return today;}

    downloadPDF() {
      const doc = new jsPDF();

      const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();


      const newCanvas =   document.querySelector('#CourseProgressChart') as HTMLCanvasElement;

      const newCanvasImg = newCanvas.toDataURL('image/png', 1.0);

      // Creates pdf

      doc.setFontSize(30);
      doc.text('CRC System - Course Progress Report', (pageWidth / 2) - 60, 15);
      doc.text(this.getDateCreated(), (pageWidth / 3) - 25, 20)
      doc.setFontSize(14);
      doc.addImage(newCanvasImg, 'PNG', 25, 25, 160, 150);
      doc.save('TeacherApplicationReport.pdf');
    }

}
