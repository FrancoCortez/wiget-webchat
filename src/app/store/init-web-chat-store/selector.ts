import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';
import {AppState} from '../root-state';

// export const selectInitWebChatState = createFeatureSelector<State>('init-web-chat');

const selectInitWebChatState =  (state: AppState) => state.initWebChat;

export const selectIsOpen = createSelector(
  selectInitWebChatState,
  (state: State): boolean => state.open
);
