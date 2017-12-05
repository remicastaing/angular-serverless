import { Injectable, Inject } from '@angular/core';
import { User } from './user.model';

import gql from 'graphql-tag';

import { GraphqlService } from '../../modules/graphql/graphql.service';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as UserActions from './user.actions';

@Injectable()
export class UserService {

  constructor(private graphql: GraphqlService,  private store: Store<fromRoot.State>) {
  }

  getMe() {

    return this.graphql.authFetch({query: getMeQuery})
    .then((data) => {
        const user = new User(data.data.me.id, data.data.me.name, data.data.me.email, data.data.me.role);
        this.store.dispatch(new UserActions.SetCurrentUserAction(user));
        return user;
      });
  }

  logout() {
    this.store.dispatch(new UserActions.RemoveCurrentUserAction);

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
