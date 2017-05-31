import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthAPIService extends Http {
  

  constructor (backend: XHRBackend, options: RequestOptions, private auth : AuthService) {
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
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: AuthAPIService) {
    // we have to pass APIService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        
        this.auth.logout();

        return Observable.empty();

      }
      return Observable.throw(res);
    };
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

}

// export function AuthAPIServiceFactory(backend: XHRBackend, options: RequestOptions,   auth : AuthService) {
//         return new AuthAPIService(backend, options, auth);
//       }

// export const AuthAPIServiceProvider ={
//       provide: AuthAPIService,
//       useFactory: AuthAPIServiceFactory,
//       deps: [XHRBackend, RequestOptions, AuthAPIService]
//     }