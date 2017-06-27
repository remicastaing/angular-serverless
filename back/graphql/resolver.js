'use strict';


import { merge } from 'lodash';
import { thingsResolvers } from '../things/things.resolver';

//
// Merge all of the resolver objects together
export const resolvers = merge( thingsResolvers );