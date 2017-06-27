import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { APIService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService} from './user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuthService {

  public isLoggedIn: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  public currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private api: APIService, private router: Router, private userService: UserService) {

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

    return this.api
      .post(
      '/api/auth/local',
      JSON.stringify({ email, password })
      )
      .map(res => res.json())
      .map((res) => {
        localStorage.setItem('auth_token', res.token);
        this.getCurrentUser();
        this.isLoggedIn.next(true);
        return true;
      });
  }

  getCurrentUser() {
    return this.userService
      .getMe()
      .subscribe((res) => {
        this.currentUser.next(res);
      },
      (res) => {
        this.logout();
      });
  }


  logout() {
    localStorage.removeItem('auth_token');
    this.isLoggedIn.next(false);
    this.currentUser.next(null);
    this.router.navigate(['home']);
  }

  createUser(name, email, password) {
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
        return true;
      });
  }

  changePassword(oldPassword, newPassword) {
    return this.currentUser
      .flatMap(
      user => {
        return this.api
          .put(`/api/users/${user.id}/password`,
          JSON.stringify({ oldPassword, newPassword }))
          .map(res => res.json());
      });
  }

  hasRole(role: string) {
    return this.currentUser
      .map(
      u => u.role === role);
  }

  isAdmin() {
    return this.currentUser
      .map(
      u => u.role === 'admin');
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  getFacebookID() {
    return this.api
      .get('/api/auth/facebook')
      .map((_res) => {
        const res = _res.json();
        return res.client_id;
      });
  }
}
