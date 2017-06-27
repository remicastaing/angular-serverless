import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { User } from './user.model';
import 'rxjs/add/operator/map';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class UserService {

  constructor(private api: APIService, private apollo: Apollo) {

  }

  getMe2() {
    return this.api.get('/api/users/me').map((_res) => {
      const res = _res.json();
      return new User(res.id, res.name, res.email, res.role);
    });
  }

  getMe() {
    console.log("get me through graphql")

    return this.apollo.use('auth').watchQuery<UserQueryResponse>({ query: getMeQuery })
      .map((data) => {
        console.log(data.data);
        return new User(data.data.me.id, data.data.me.name, data.data.me.email, data.data.me.role);
      });
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
  me
  id;
  name;
  email;
  role;
};
