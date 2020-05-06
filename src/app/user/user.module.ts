import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  { routingComponents } from '../app-routing.module'
import {MatTableModule} from '@angular/material/table';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ],providers:[
  	UserService
  ],
  declarations: [routingComponents]
})
export class UserModule { }
