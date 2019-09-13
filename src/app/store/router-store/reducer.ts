import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.loginOpen, (state) => ({
    ...state,
    login: true,
    widget: false,
    config: false
  })),
  on(featureActions.widgetOpen, (state) => ({
    ...state,
    login: false,
    widget: true,
    config: false
  })),
  on(featureActions.configOpen, (state) => ({
    ...state,
    login: false,
    widget: false,
    config: true
  })),
  on(featureActions.loadRouter, (state, {payload}) => ({
    ...state,
    login: payload.login,
    widget: payload.widget,
    config: payload.config
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
