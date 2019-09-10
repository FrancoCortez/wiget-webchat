import {createSelector} from '@ngrx/store';
import {State} from './state';
import {AppState} from '../root-state';

const selectInitWebChatState = (state: AppState) => state.initWebChat;

export const selectIsOpen = createSelector(
  selectInitWebChatState,
  (state: State): boolean => {
    if (state !== undefined && state !== null) {
      return state.open;
    }
    return state.open;
  }
);
