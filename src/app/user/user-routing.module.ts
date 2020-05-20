import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { AuthentificationGuard } from '../authentification-guard';


const routes: Routes = [
  {path: 'user/edit/:id', canActivate: [AuthentificationGuard], component: UserCreateComponent},
  {path: 'user/display/:id', canActivate: [AuthentificationGuard], component: UserDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }