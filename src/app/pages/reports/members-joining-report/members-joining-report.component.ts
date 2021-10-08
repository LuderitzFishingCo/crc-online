import { AdministratorService } from './../../../services/administrator/administrator.service';
import { MainService } from './../../../services/main/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-joining-report',
  templateUrl: './members-joining-report.component.html',
  styleUrls: ['./members-joining-report.component.scss']
})
export class MembersJoiningReportComponent implements OnInit {

  users: any[] = [];
  constructor(private service: AdministratorService) {
    this.service.GetUsers().subscribe(x=>{
      x.forEach(y=>{
        this.users.push({
          User_ID:y['User_ID'],
          First_Name: y['First_Name'],
          Last_Name: y['Last_Name']
        })
      })
    })
   }

  ngOnInit(): void {
  }



}
