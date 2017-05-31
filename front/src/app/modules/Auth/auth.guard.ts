import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router : Router) {}

  canActivate() {
  	this.authService.isLoggedIn.subscribe(
  		res => {
  			if (!res) {
  				this.router.navigate(['home']);
  			}
  	})
    return this.authService.isLoggedIn;
  }
}