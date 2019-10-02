import {createSelector} from '@ngrx/store';
import {State} from './state';
import {AppState} from '../root-state';

const selectInitWebChatState = (state: AppState) => state.initWebChat;

export const selectIsOpen = createSelector(
  selectInitWebChatState,
  (state: State): boolean => state.open
);

export const selectIsTrigger = createSelector(
  selectInitWebChatState,
  (state: State): boolean => state.trigger
);

export const selectIdUser = createSelector(
  selectInitWebChatState,
  (state: State): string => state.idUser
);
