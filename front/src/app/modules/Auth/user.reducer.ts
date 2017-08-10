import { Action } from 'redux';
import { User } from './user.model';
import * as UserActions from './user.actions';
import { createSelector } from 'reselect';

export interface IUserState {
  currentUser: User;
}

const initialState: IUserState = {
  currentUser: null
};

export const UserReducer =
  function (state: IUserState = initialState, action: Action): IUserState {
    switch (action.type) {
      case UserActions.SET_CURRENT_USER:
        const user: User = (<UserActions.SetCurrentUserAction>action).user;
        return {
          currentUser: user
        };
      default:
        return state;
    }
  };

export const getUserState = (state): IUserState => state.currentUser;

export const getCurrentUser = createSelector(
  getUserState,
  (state: IUserState) => state.currentUser);
