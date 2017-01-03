import { Injectable } from '@angular/core';
import {User} from './user.model';
import {APIService} from './api.service';

@Injectable()
export class UserService {

  constructor(private http: APIService) { 

  }

  getMe() {
    return this.http.get('/api/users/me').map((res) => {
      console.log(res);
      return res.json();
    } );
  }



}
