import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Injectable()
export class AuthGuard implements CanActivate {


    private currentUser: Observable<User>;

    constructor(private router: Router, private store: Store<fromRoot.State>) {
        this.currentUser = store.select(fromRoot.getCurrentUser);
    }

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
