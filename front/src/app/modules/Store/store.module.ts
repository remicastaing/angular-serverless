import { NgModule } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';

import { rootReducer, IAppState, appInitialState } from './app.reducer';


@NgModule({
  imports: [NgReduxModule],
  providers: [],
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    apollo: Apollo
  ) {

    store.configureStore(
      rootReducer,
      appInitialState,
      [createLogger()],
      devTools.isEnabled() ? [devTools.enhancer()] : []);

  }
}
