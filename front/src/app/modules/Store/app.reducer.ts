import { ApolloClient } from 'apollo-client';

import {
    Reducer,
    combineReducers
} from 'redux';


import { UserReducer, IUserState } from '../Auth/user.reducer';

export * from '../Auth/user.reducer';



const apollo = new ApolloClient();


export interface IAppState {
    currentUser: IUserState;
    apollo?: any;
}

export const appInitialState = {
    currentUser: null,
    apollo: null
};


export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
    currentUser: UserReducer,
    apollo: apollo.reducer()
});
