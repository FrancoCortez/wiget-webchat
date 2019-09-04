import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from './actions';
import {initialState, State} from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.sendMessage, (state, {message}) => ({
    ...state,
    isLoading: true,
    isLoader: false
  })),
  on(featureActions.sendMessageSuccess, (state, {payload}) => ({
    ...state,
    isLoading: false,
    isLoader: true,
    // conversation: [...state.conversation , payload ]
  })),
  on(featureActions.sendMessageFailure, (state, {payload}) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    error: payload
  })),
  on(featureActions.addMessage, (state, {payload}) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    conversation: [...state.conversation, payload]
  })),
  on(featureActions.cleanConversation, (state) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    conversation: []
  })),
  on(featureActions.leaveChat, (state) => ({
    ...state,
    isLoading: false,
    isLoader: false,
  })),
  on(featureActions.leaveChatSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoader: false,
  })),
  on(featureActions.leaveChatFailure, (state, {payload}) => ({
    ...state,
    isLoading: false,
    isLoader: false,
    error: payload
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
