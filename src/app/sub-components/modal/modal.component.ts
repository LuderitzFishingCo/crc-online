import { Component, OnInit, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  content:String;
  dialog_title:string;
  color:string;
  showCancel:boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) data:any) {
    
    this.content = data.content;
    this.dialog_title = data.dialog_title;
    this.color = data.color;
   }
  ngOnInit(): void {
  }

}
