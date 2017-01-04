import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class APIService extends Http {
	

  constructor (backend: XHRBackend, options: RequestOptions, private _router: Router) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('auth_token');
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
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: APIService) {
    // we have to pass APIService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        this._router.navigate(['/login']);
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}

export function APIServiceFactory(backend: XHRBackend, options: RequestOptions,  _router: Router) {
        return new APIService(backend, options, _router);
      }

export const APIServiceProvider ={
      provide: APIService,
      useFactory: APIServiceFactory,
      deps: [XHRBackend, RequestOptions, Router]
    }