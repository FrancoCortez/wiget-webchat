import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';

export const selectInitWebChatState = createFeatureSelector<State>('init-web-chat');


export const selectIsOpen = createSelector(
  selectInitWebChatState,
  (state: State): boolean => state.open
);
