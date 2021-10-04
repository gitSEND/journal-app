import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducers';

const reducers = combineReducers({
  auth: authReducer,
});

export const store = createStore(reducers);
