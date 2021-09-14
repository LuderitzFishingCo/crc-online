import { User } from '../../../interfaces/index';
import { Router } from '@angular/router';
import { MainService } from './../../../services/main/main.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup = this.fb.group({
    Email_Address: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    Password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
  });
  UserImagePath: string;
  constructor(private fb: FormBuilder, private service: MainService, private router: Router,private snack: MatSnackBar) {
    this.UserImagePath = '/assets/images/login-user.jpeg'

   }

  ngOnInit(): void {
  }
  login(): void{
    var test = this.loginGroup.value;
    this.service.Login(this.loginGroup.value).subscribe(res => {
    console.log(res)
    this.router.navigateByUrl('/User');
    }, (error: HttpErrorResponse) => {
      if (error.status === 404) {
        this.snack.open('Invalid credentials.', 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000
        });
        this.loginGroup.reset();
        return;
      }
      this.snack.open('An error occured on our servers. Try again later.', 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 3000
      });
      this.loginGroup.reset();
  });
}

}

@Component({
  selector: 'login-nav',
  templateUrl: './login-nav.html',
  styleUrls: ['./login.component.scss']
})
export class LoginNav implements OnInit {
 
  LogoPath: string;
  SystemNamePath: string;
  constructor() { 
    this.LogoPath = '/assets/images/crc-logo.jpg',
    this.SystemNamePath = '/assets/images/crc-learning.jpeg'
  }
  ngOnInit(): void {
  }

}
