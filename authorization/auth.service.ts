import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';



@Injectable()
export class AuthService {
  constructor(private http: Http, private router: Router) {}

  isAuthenticated() {
    return localStorage.getItem('currentUser') !== null;
  }

  logIn(email: string, password: string) {
    if  (localStorage.getItem('currentUser') !== null) {
      this.router.navigate(['/home']);
    }else {
      this.http.post('/auth/login', {username:  email, password:  password})
        .subscribe(
          (response) => {
            localStorage.setItem('currentUser', encodeURIComponent(JSON.stringify(response['_body'])));
            this.router.navigate(['/home']);
          },
          (error) => { console.log(error); }
        );
    }
  }

  logOut()  {
    this.http.post('/auth/logout', {})
      .subscribe(
        (response) => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/']);
        },
        (error) => { console.log(error); }
      );
  }

  getUser() {
    return JSON.parse(JSON.parse(decodeURIComponent(localStorage.getItem('currentUser'))));
  }



}
