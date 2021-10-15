import { observable, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AdministratorService} from './../../../services/administrator/administrator.service';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Label } from 'ng2-charts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {

   LogoPath = '/assets/images/crc-logo.jpg'
  users: any[] = [];

  columnDefs: ColDef[] =[
    {field: 'Name', sortable: true, filter: true},
    {field: 'Last Name', sortable: true, filter: true},
    {field: 'User Role', sortable: true, filter: true},
    {field: 'Date Joined', sortable: true, filter: true},
    {field: 'Country', sortable: true, filter: true},
    {field: 'City/Town', sortable: true, filter: true},
    {field: 'Phone Number', sortable: true, filter: true},
    {field: 'Email Address', sortable: true, filter: true}

  ];

  rowData: Observable<any[]>;

  constructor(private service: AdministratorService) {
    this.rowData = this.service.GetUsers();
    this.service.GetUsers().subscribe(x=>{
      x.forEach(y=>{
        this.users.push({
          User_ID:y['User_ID'],
          First_Name: y['First_Name'],
          Last_Name: y['Last_Name'],
          User_Role: y['User_Role'],
          Location: y['Location'],
          Country: y['Country'],
          User_Join_Date: y['User_Join_Date'],
          Phone_Number: y['Phone_Number'],
          Email_Address: y['Email_Address']

        })
      })
    })
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
    doc.text('CRC System - User Report', (pageWidth / 2) - 60, 15);
    doc.text(this.getDateCreated(), (pageWidth / 3) - 25, 20)
    doc.setFontSize(14);
    autoTable(doc, {html:'#userReportTable'});
    doc.save('UserReport.pdf');
  }

}
