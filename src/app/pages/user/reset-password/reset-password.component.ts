import { MainService } from './../../../services/main/main.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'enter-email',
  templateUrl: './enter-email.html',
  styleUrls: ['./reset-password.component.scss']
})
export class EnterEmail implements OnInit {

  constructor(private service: MainService, private router: Router ) { }

  ngOnInit(): void {
  }

  sendCode(f: NgForm){
    console.log(f.value['Email_Address'])
   var email = String(f.value['Email_Address'])
    this.service.SendCode(email).subscribe();
    this.router.navigateByUrl(`/ResetPassword`);
  }

}
