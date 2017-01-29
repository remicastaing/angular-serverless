import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import {AuthService} from './auth.service';
import {APIService} from './api.service';
import {AuthAPIService} from './authAPI.service';
import {UserService} from './user.service';
import {AuthGuard} from './auth.guard';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [  ],
  exports:      [ ],
  providers:    [ AuthService, APIService, AuthAPIService, UserService, AuthGuard  ]
})
export class AuthModule { }