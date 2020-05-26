import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  { routingComponents } from '../app-routing.module'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './../../material/material.module';
import { UniqueEmailValidatorDirective } from '../directives/unique-email-validator.directive';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule

  ],exports:[UniqueEmailValidatorDirective],
  providers:[
  	UserService
  ],
  declarations: [routingComponents, UniqueEmailValidatorDirective]
})
export class UserModule { }
