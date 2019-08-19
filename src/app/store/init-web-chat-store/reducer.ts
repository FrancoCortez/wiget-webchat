import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.open, (state, {payload}) => ({
    ...state,
    isLoading: true,
    isLoader: false,
    open: payload.valueOf()
  })),
  on(featureActions.openSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoader: true,
  })),
  on(featureActions.openFailure, (state, {payload}) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    error: payload,
    open: false
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
