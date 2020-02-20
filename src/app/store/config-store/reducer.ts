import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.loadConfig, (state, {payload}) => ({
    ...state,
    isLoading: true,
    isLoader: false,
    config: payload,
    error: null,
  })),
  on(featureActions.updateInputConfig, (state, {payload}) => ({
    ...state,
    isLoading: true,
    isLoader: false,
    config: payload,
    error: null,
  })),
  on(featureActions.initType, (state, {payload}) => ({
    ...state,
    isLoading: true,
    isLoader: false,
    config: payload,
    error: null,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
