/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OauthButtonsComponent } from './oauth-buttons.component';

describe('OauthButtonsComponent', () => {
  let component: OauthButtonsComponent;
  let fixture: ComponentFixture<OauthButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// 'use strict';

// import {OauthButtonsController} from './index';

// describe('Controller: OauthButtonsController', function() {

//   var controller, $window;

//   beforeEach(() => {
//     angular.module('test', [])
//       .controller('OauthButtonsController', OauthButtonsController);
//   });
//   // load the controller's module
//   beforeEach(angular.mock.module('test'));

//   // Initialize the controller and a mock $window
//   beforeEach(inject(function($controller) {
//     $window = {
//       location: {}
//     };

//     controller = $controller('OauthButtonsController', {
//       $window: $window
//     });
//   }));

//   it('should attach loginOauth', function() {
//     expect(controller.loginOauth).to.be.a('function');
//   });
// });