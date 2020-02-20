import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.team, (state, {payload}) => ({
    ...state,
    isLoading: true,
    isLoader: false,
    team: payload,
    error: null,
  })),
  on(featureActions.teamSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoader: true,
  })),
  on(featureActions.teamFailure, (state, {payload}) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    error: payload,
    team: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
