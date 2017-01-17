import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {UserService} from './user.service';
import {User} from './user.model';
import {APIService} from './api.service';

import { Observable }     from 'rxjs/Observable';
import { BehaviorSubject }     from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public isLoggedIn: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  public currentUser : BehaviorSubject<User>= new BehaviorSubject(null);

  constructor(private api: APIService, private http: Http, private userService: UserService) {
    
    console.log('construct');

    if (!!localStorage.getItem('auth_token')) {
      this.isLoggedIn.next(true);
      this.getCurrentUser();
    } else {
      this.isLoggedIn.next(false);
      this.currentUser.next(null);
    }
    
  }

  login(email, password) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        '/api/auth/local', 
        JSON.stringify({ email, password }),
        options
      )
      .map(res => res.json())
      .map((res) => {
        localStorage.setItem('auth_token', res.token);
        this.getCurrentUser();
        this.isLoggedIn.next(true);
      });
  }

  getCurrentUser(){
    this.userService.getMe().subscribe((res) => {
      this.currentUser.next(res);
      });
  }

  
  logout() {
    localStorage.removeItem('auth_token');
    this.isLoggedIn.next(false);
    this.currentUser.next(null);
  }

  createUser(name, email, password){
    return this.api
      .post(
        '/api/users/', 
        JSON.stringify({
        name: name,
        email: email,
        password: password
      }))
      .map(res => res.json())
      .map((res) => {
        localStorage.setItem('auth_token', res.token);
        this.getCurrentUser();
        this.isLoggedIn.next(true);
      });
  }

  changePassword(){

  }

  hasRole(){

  }

  isAdmin(){

  }

  getToken(){
  	return localStorage.getItem('auth_token');
  }
}
