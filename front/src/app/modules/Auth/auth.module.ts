import { NgModule, ModuleWithProviders }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import {AuthService} from './auth.service';
import {APIService} from './api.service';
import {AuthAPIService} from './authAPI.service';
import {UserService} from './user.service';
import { OauthButtonsComponent} from './oauth-buttons/oauth-buttons.component';

import {AuthGuard} from './auth.guard';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ OauthButtonsComponent ],
  exports:      [ OauthButtonsComponent ],
  providers:    [ AuthGuard  ]
})
export class AuthModule {
	static forRoot(): ModuleWithProviders {
	    return {
	      ngModule: AuthModule,
	      providers: [AuthService, APIService, AuthAPIService, UserService]
	    }
	  }
 }

export const authComponents = [OauthButtonsComponent];


export {AuthService, APIService, AuthAPIService, UserService, AuthGuard, OauthButtonsComponent}; 