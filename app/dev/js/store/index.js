import * as redux from 'redux';
import thunk from 'redux-thunk';

import { userReducer, reffererReducer } from '@app-reducers/auth';
import { photographsReducer, photographReducer } from '@app-reducers/photograph';
import { filtersReducer } from '@app-reducers/filters';

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
      photographs: photographsReducer,
      currentPhotograph: photographReducer,
      filters: filtersReducer,
    });

    store = redux.createStore(reducer, initialState, redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
  };
}());
