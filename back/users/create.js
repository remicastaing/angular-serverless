'use strict';

import { User } from './user.model';
import { ErrorResponse, ValidResponse } from '../common/response';

export const create = (event, context, callback) => {

  const userData = JSON.parse(event.body);
  const verifyCallback = 'http://' + event.headers.Host +  '/api/users/confirm'

  User.createLocalUser(userData)
    .then(function (user) {
      user.sendEmailVerification(verifyCallback);
      callback(null, ValidResponse({ token: user.token(18000) }));
    })
    .catch(function (error) {
      callback(null, ErrorResponse({ message: error.message }));
    })

};
