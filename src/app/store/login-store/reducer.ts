import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.login, (state, {payload}) => ({
    ...state,
    isLoading: true,
    isLoader: false,
    login: payload,
    error: null,
  })),
  on(featureActions.loginSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoader: true
  })),
  on(featureActions.loginFailure, (state, {payload}) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    error: payload,
    login: null
  })),
  on(featureActions.leaveLogin, (state) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    login: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
