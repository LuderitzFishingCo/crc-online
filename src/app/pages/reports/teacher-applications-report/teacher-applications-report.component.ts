import { Component, OnInit } from '@angular/core';
import { AdministratorService} from './../../../services/administrator/administrator.service';
import { ColDef } from 'ag-grid-community';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-applications-report',
  templateUrl: './teacher-applications-report.component.html',
  styleUrls: ['./teacher-applications-report.component.scss']
})
export class TeacherApplicationsReportComponent implements OnInit {
  teacherApplications: any[] = [];

  columnDefs: ColDef[] =[
    {field: 'First Name', sortable: true, filter: true},
    {field: 'Last Name', sortable: true, filter: true},
    {field: 'Application Status', sortable: true, filter: true},
    {field: 'Teaching Level', sortable: true, filter: true},
    {field: 'Application Date', sortable: true, filter: true}


  ];

  rowData: Observable<any[]>;

  constructor(private service: AdministratorService) {
    this.rowData = this.service.GetTeacherApplications();
    this.service.GetTeacherApplications().subscribe(
      x=>{
        x.forEach(y=>{
          this.teacherApplications.push({
            First_Name: y['First_Name'],
            Last_Name: y['Last_Name'],
            Application_Status: y['Application_Status'],
            Teaching_Level: y['Teaching_Level'],
            Application_Date: y['Application_Date'],
          })
        })
      }
    )
   }

  ngOnInit(): void {
  }
  getDateCreated(){
    let today = new Date().toLocaleDateString();
    return today;
  }

  downloadPDF() {
    const doc = new jsPDF();

    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();


    //const newCanvas =   document.querySelector('#avgChart') as HTMLCanvasElement;

    //const newCanvasImg = newCanvas.toDataURL('image/png', 1.0);

    // Creates pdf

    doc.setFontSize(30);
    doc.text('CRC System - Teacher Applications Report', (pageWidth / 2) - 60, 15);
    doc.text(this.getDateCreated(), (pageWidth / 3) - 25, 20)
    doc.setFontSize(14);
    autoTable(doc, {html:'#TeacherApplicationsTable'});
    doc.save('TeacherApplicationReport.pdf');
  }
}
