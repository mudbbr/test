import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {MatButtonModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports:  [
    BrowserAnimationsModule,
    FormsModule,
    AuthRoutingModule,
    MatInputModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule

  ]
})
export class AuthModule {}
