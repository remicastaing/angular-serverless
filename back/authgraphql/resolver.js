'use strict';


import { merge } from 'lodash';
import { thingsResolvers } from '../things/things.resolver';
import { userResolver } from '../users/user.resolver';

//
// Merge all of the resolver objects together
export const resolvers = merge( userResolver, thingsResolvers );