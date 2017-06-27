import { mergeTypes } from 'merge-graphql-schemas';
import Users from '../users/user.schema.js';
import Things from '../things/things.schema.js';

export const schema =  mergeTypes([Users, Things]);