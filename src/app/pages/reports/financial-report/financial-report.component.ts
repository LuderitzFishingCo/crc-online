import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent implements OnInit {
  lineChartData: Chart.ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Line 1' },
    { data: [12, 45, 67, 69, 12, 67], label: 'Line 2' },
    { data: [12, 30, 20, 80, 15, 19], label: 'Line 3' },
  ];

  lineChartLabels: Label[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  lineChartOptions = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor() { }

  ngOnInit(): void {
  }
  getDateCreated(){
    let today = new Date().toLocaleDateString();
    return today;}

    downloadPDF() {
      const doc = new jsPDF();

      const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();


      const newCanvas =   document.querySelector('#FinancialOverviewGraph') as HTMLCanvasElement;

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
