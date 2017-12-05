import { Action } from '@ngrx/store';
import { User } from '../modules/Auth';


export const SET_CURRENT_USER = '[User] Set Current';
export const REMOVE_CURRENT_USER = '[User] Remove Current';


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SetCurrentUserAction implements Action {
  readonly type = SET_CURRENT_USER;

  constructor(public payload: User) { }
}

export class RemoveCurrentUserAction implements Action {
  readonly type = REMOVE_CURRENT_USER;

}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SetCurrentUserAction
  | RemoveCurrentUserAction;
