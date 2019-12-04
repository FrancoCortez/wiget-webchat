import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.starPreserve, (state, {payload}) => ({
     ...state,
    starPreserve: payload
  })),
  on(featureActions.loginPreserve, (state, {payload}) => ({
    ...state,
    loginPreserve: [...state.loginPreserve, payload]
  })),
  on(featureActions.starPreserveClean, (state) => ({
    ...state,
    starPreserve: null
  })),
  on(featureActions.loginPreserveClean, (state) => ({
    ...state,
    loginPreserve: []
  })),
  on(featureActions.chatPreserve, (state, {payload}) => ({
    ...state,
    chatPreserve: payload
  })),
  on(featureActions.chatPreserveClean, (state) => ({
    ...state,
    chatPreserve: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
