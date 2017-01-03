import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  constructor() {
    super();

    // Set the default 'Content-Type' header
    this.headers.set('Content-Type', 'application/json');
    if (localStorage.getItem('auth_token')) {
			let authToken = localStorage.getItem('auth_token');
    	this.headers.append('Authorization', `Bearer ${authToken}`);
    }

  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };