'use strict';

import { User } from './user.model';
import { ErrorResponse, ValidResponse } from '../common/response';

export const password = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const id = event.pathParameters.id;
  const oldPassword = data.oldPassword;
  const newPassword = data.newPassword;

  User.findUserById(id)
    .then((user) => {
      return user.checkPassword(oldPassword)
    })
    .then((user) => {
      return user.updatePassword(newPassword)
    })
    .then(function (user) {
      callback(null, ValidResponse({ message: 'Your password has been succesfully updated.' }));
    })
    .catch(function (error) {
      callback(null, ErrorResponse({ message: error.message }));
    })
};