'use strict';

import { User } from '../users/user.model';
import { ErrorResponse, ValidResponse } from '../common/response';
import _ from 'lodash';

export const local = (event, context, callback) => {


  const data = JSON.parse(event.body);

  var email = data.email;
  var password = data.password;


  User.findUserByEmail(email)
    .then((users) => _.filter(users, 'local')[0].checkPassword(password))
    .then(function (user) {
      callback(null, ValidResponse({ token: user.token(18000) }));
    })
    .catch(function (error) {
      callback(null, ErrorResponse({ message: error.message }));
    })


};

