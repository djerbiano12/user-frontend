import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDisplayComponent } from './user/user-display/user-display.component';
import { LoginComponent } from './user/login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AuthentificationGuard } from './authentification-guard';

const routes: Routes = [
  {path: 'create_user', canActivate: [AuthentificationGuard], component: UserCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', canActivate: [AuthentificationGuard], component: UserListComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthentificationGuard]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, UserCreateComponent, UserListComponent, UserDisplayComponent]
