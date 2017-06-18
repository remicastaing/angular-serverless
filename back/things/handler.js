'use strict';

import {things} from './things.model';
import { ErrorResponse, ValidResponse } from '../common/response';


export const get = (event, context, callback) => {

  callback(null, ValidResponse(things));

};
