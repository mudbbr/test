import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Injectable} from '@angular/core';
@Injectable()
export class LoginResolver {

  constructor(private router: Router, private authService: AuthService) {}

  resolve(): void {
    if  (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

}
