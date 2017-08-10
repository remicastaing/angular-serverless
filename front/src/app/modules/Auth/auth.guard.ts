import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Injectable()
export class AuthGuard implements CanActivate {

    @select(['currentUser', 'currentUser']) currentUser: Observable<any>;

    constructor(private router: Router) { }

    canActivate() {
        return this.currentUser.map(
            res => {
                if (res) {
                    return true;
                } else {
                    this.router.navigate(['home']);
                }
            });
    }
}
