import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {


  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email, password) {

    return this.http
      .post(
        '/api/auth/local', 
        JSON.stringify({ email, password })
      )
      .map(res => res.json())
      .map((res) => {
        console.log(res);
        localStorage.setItem('auth_token', res.token);
        this.loggedIn = true;
      });
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  createUser(){

  }

  changePassword(){

  }

  getCurrentUser(){

  }

  hasRole(){

  }

  isAdmin(){

  }

  getToken(){
  	return localStorage.getItem('auth_token');
  }
}
