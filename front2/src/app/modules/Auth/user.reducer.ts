import { createSelector } from 'reselect';
import {User} from './user.model';

import * as user from './user.actions';


export interface State {
  currentUser: User;
}

export const initialState: State = {
  currentUser: null,
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.SET_CURRENT_USER: {
        return {
          currentUser: action.payload,
        };

    }

    case user.REMOVE_CURRENT_USER: {
        return {
            currentUser: null,
        };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getUserState = (state): State => {
  return state;
};

export const getCurrentUser = createSelector(
  getUserState,
  (state: State) => state.currentUser);
