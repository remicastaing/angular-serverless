import { createSelector } from 'reselect';


import * as child from './child.actions';


export interface State {
  children: [any];
}

export const initialState: State = {
  children: [null],
};

export function reducer(state = initialState, action: child.Actions): State {
  switch (action.type) {




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

export const getChildrenState = (state): State => {
  return state.currentUser;
};

export const getChildren = createSelector(
  getChildrenState,
  (state: State) => state.children);
