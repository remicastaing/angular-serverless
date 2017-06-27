'use strict';

import dynamodb from '../common/dynamodb';
import { User } from './user.model';
import { ErrorResponse, ValidResponse } from '../common/response';

export const get = (event, context, callback) => {

  const id = event.pathParameters.id;

  User.findUserById(id).then((user) => {
    callback(null, ValidResponse(user.forFrontEnd()))
  })
    .catch((error) => {
      callback(null, ErrorResponse(error))
    });
};

export const me = (event, context, callback) => {

  const id = event.requestContext.authorizer.principalId;
  User.findUserById(id).then((user) => {
    callback(null, ValidResponse(user.forFrontEnd()))
  })
    .catch((error) => {
      callback(null, ErrorResponse(error))
    });
};
