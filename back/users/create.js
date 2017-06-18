'use strict';

import { User } from './user.model';
import { ErrorResponse, ValidResponse } from '../common/response';


export const create = (event, context, callback) => {

  const data = JSON.parse(event.body);

  var user;

  try {
    user = new User(null, data.name, data.email, data.password);
  } catch (error) {
    return callback(null, ErrorResponse({ message: error.message }));
  }

  user.create()
    .then(function (user) {
      callback(null, ValidResponse({ token: user.token(18000) }));
    })
    .catch(function (error) {
      callback(null, ErrorResponse({ message: error.message }));
    })

};
