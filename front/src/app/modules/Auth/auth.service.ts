import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/map';
import { NgRedux } from '@angular-redux/store';
import { IAppState, getCurrentUser } from '../Store/app.reducer';
import { HttpClient } from '@angular/common/http';

interface AuthResponse {
  token: string;
}

interface FBIDResponse {
  client_id: string;
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private store: NgRedux<IAppState>) {

    if (!!localStorage.getItem('auth_token')) {
      this.getCurrentUser();
    }

  }

  login(email, password) {

    return this.http
      .post(
      '/api/auth/local',
      JSON.stringify({ email, password })
      )
      .map(res => {
        localStorage.setItem('auth_token', res['token']);
        this.getCurrentUser();
        return true;
      });
  }

  private getCurrentUser() {
    return this.userService
      .getMe()
      .then((res) => {
      },
      (res) => {
        this.logout();
      });
  }


  logout() {
    localStorage.removeItem('auth_token');
    this.userService.logout();
    this.router.navigate(['home']);
  }

  createUser(name, email, password) {
    return this.http
      .post<AuthResponse>(
      '/api/users/',
      JSON.stringify({
        name: name,
        email: email,
        password: password
      }))
      .map((res) => {
        localStorage.setItem('auth_token', res.token);
        this.getCurrentUser();
        return true;
      });
  }

  changePassword(oldPassword, newPassword) {

    const user = getCurrentUser(this.store.getState());

    return this.http
      .put(`/api/users/${user.id}/password`,
      JSON.stringify({ oldPassword, newPassword }));

  }

  getToken() {
    return localStorage.getItem('auth_token');
  }



  getFacebookID() {
    return this.http
      .get<FBIDResponse>('/api/auth/facebook')
      .map((res) => {
        return res.client_id;
      });
  }

  createFBUser(token, redirect_uri) {
    return this.http
      .get<AuthResponse>(`/api/auth/facebook?code=${token}&redirect_uri=${redirect_uri}`)
      .map((res) => {
        localStorage.setItem('auth_token', res.token);
        this.getCurrentUser();
        return true;
      });



  }
}
