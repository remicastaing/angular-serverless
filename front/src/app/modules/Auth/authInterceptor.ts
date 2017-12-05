import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map} from 'rxjs/operators';

import { SetCurrentUserAction } from './user.actions';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.getToken();
        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(clonedRequest);
    }

    getToken() {
        return localStorage.getItem('auth_token');
    }
}




@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                return event;
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    localStorage.removeItem('auth_token');
                    // this.ngRedux.dispatch(UserActions.setCurrentUser(null));
                    console.log('logout!!!!');
                    this.router.navigate(['home']);
                }
            }
        }));
    }
}
