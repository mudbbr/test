import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginResolver} from './login/login-resolver.service';

const authRoutes: Routes = [
  {path:  '', component: LoginComponent, resolve: [LoginResolver]}
];

@NgModule({
  imports:  [
    RouterModule.forChild(authRoutes)
  ],
  exports:  [RouterModule]
})
export class AuthRoutingModule {

}
