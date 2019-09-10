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
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
