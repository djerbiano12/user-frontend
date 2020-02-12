import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthentificationService } from "../../authentification.service";
import { EncrDecrService } from "../encr-decr-service.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthentificationService,
              private EncrDecr: EncrDecrService) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

     const body = new HttpParams()
      .set('username', this.loginForm.controls.email.value)
      .set('password', this.EncrDecr.set('123456$#@$^@1ERF', this.loginForm.controls.password.value))
      .set('grant_type', 'password');
    this.authService.login(body).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      this.authService.connected = true;
      this.router.navigate(['users']);
    }, error => {
      this.invalidLogin = true;
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}