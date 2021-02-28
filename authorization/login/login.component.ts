import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ThemeService } from '../../services/theme.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  pageTitle: string;
  errorMsg: string;

  constructor(
    private _formBuilder: FormBuilder
    , private authService: AuthService
    , private themeService: ThemeService
    , private titleService: Title
  ) {
    this.pageTitle = 'Login | Dynamic Services and API Demo for MEF17 Conference';
    titleService.setTitle(this.pageTitle);
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.themeService.get().then(
      resp => { console.log(resp); },
      err => { console.log(err); }
    );
  }

  logIn() {
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;
    this.authService.logIn(username, password);
  }

}
