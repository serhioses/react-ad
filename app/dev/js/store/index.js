import * as redux from 'redux';
import thunk from 'redux-thunk';

import { userReducer, reffererReducer, loadingStateReducer, photographReducer } from '@app-reducers';

export default (function () {
  let store;

  return function configure (initialState = {}) {
    let reducer;

    if (store) {
      return store;
    }

    reducer = redux.combineReducers({
      profile: userReducer,
      refferer: reffererReducer,
      loadingState: loadingStateReducer,
      photographs: photographReducer,
    });

    store = redux.createStore(reducer, initialState, redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
  };
}());
