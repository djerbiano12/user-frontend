import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserService } from "../user.service";
import { EncrDecrService } from "../encr-decr-service.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, 
              private EncrDecr: EncrDecrService) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.canConnect(this.loginForm.controls.email.value, this.EncrDecr.set('123456$#@$^@1ERF', this.loginForm.controls.password.value))
    .subscribe((value) => { if(value == true){ this.router.navigate(['user']); } else {this.invalidLogin = true;}});
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}