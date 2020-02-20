import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.open, (state, {payload}) => ({
    ...state,
    open: payload
  })),
  on(featureActions.openSuccess, (state) => ({
    ...state,
  })),
  on(featureActions.openFailure, (state, {payload}) => ({
    ...state,
    error: payload,
  })),
  on(featureActions.loadInitWeb, (state, {payload}) => ({
    ...state,
    open: payload.open
  })),
  on(featureActions.triggerInit, (state, {payload}) => ({
    ...state,
    trigger: payload
  })),
  on(featureActions.loadIdUser, (state, {payload}) => ({
    ...state,
    idUser: payload
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
