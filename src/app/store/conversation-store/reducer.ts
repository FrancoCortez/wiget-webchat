import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.addMessage, (state, {payload}) => ({
    ...state,
    isLoading: true,
    isLoader: false,
    conversation: [...state.conversation , payload ]
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
