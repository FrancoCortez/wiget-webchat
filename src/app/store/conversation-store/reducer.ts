import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';
import {sendMessage} from './actions';

const featureReducer = createReducer(
  initialState,
  on(featureActions.receivesMessage, (state, {payload}) => ({
    ...state,
    isLoading: true,
    isLoader: false,
    conversation: [...state.conversation , payload ]
  })),
  on(featureActions.receivesMessageSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoader: true,
  })),
  on(featureActions.receivesMessageFailure, (state, {payload}) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    error: payload,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
