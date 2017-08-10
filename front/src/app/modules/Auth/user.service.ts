import { Injectable, Inject } from '@angular/core';
import { User } from './user.model';
import 'rxjs/add/operator/map';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { UserActions } from './user.actions';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../Store/app.reducer';

@Injectable()
export class UserService {

  constructor(private apollo: Apollo, private ngRedux: NgRedux<IAppState>) {
  }

  getMe() {
    return this.apollo.use('auth').watchQuery<UserQueryResponse>({ fetchPolicy : 'network-only', query: getMeQuery })
      .map((data) => {
        const user = new User(data.data.me.id, data.data.me.name, data.data.me.email, data.data.me.role);
        this.ngRedux.dispatch(UserActions.setCurrentUser(user));
        return user;
      });
  }

  logout() {
    this.ngRedux.dispatch(UserActions.setCurrentUser(null));
  }

}


const getMeQuery = gql`
  {
    me
    {
      id
      name
      email
      role
    }
  }`;

interface UserQueryResponse {
  id;
  name;
  email;
  role;
  me;
}
