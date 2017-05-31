import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

@Injectable()
export class APIService extends Http {
	

  constructor (backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = this.getToken();
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${token}`);
      options.headers.append('Content-Type', 'application/json');
    } else {
    // we have to add the token to the url object
      url.headers.set('Authorization', `Bearer ${token}`);
      url.headers.append('Content-Type', 'application/json');
    }
    return super.request(url, options);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

}