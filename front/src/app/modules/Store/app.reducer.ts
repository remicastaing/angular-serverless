

import {
    Reducer,
    combineReducers
} from 'redux';


import { UserReducer, IUserState } from '../Auth/user.reducer';

export * from '../Auth/user.reducer';



export interface IAppState {
    currentUser: IUserState;
}

export const appInitialState = {
    currentUser: null,
};


export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
    currentUser: UserReducer
});
