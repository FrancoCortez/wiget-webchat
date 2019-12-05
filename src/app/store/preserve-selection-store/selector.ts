import {createSelector} from '@ngrx/store';

import {State} from './state';
import {AppState} from '../root-state';
import {StarPreserveDto} from "../../models/preserve-selection/star-preserve.dto";
import {LoginPreserveDto} from "../../models/preserve-selection/login-preserve.dto";
import {ChatPreserveDto} from "../../models/preserve-selection/chat-preserve.dto";

const selector = (state: AppState) => state.preserveSelection;

export const selectPreserveStar = createSelector(
  selector,
  (state: State): StarPreserveDto => {
    return state.starPreserve
  }
);

export const selectPreserveLogin = createSelector(
  selector,
  (state: State): LoginPreserveDto[] => state.loginPreserve
);

export const selectPreserveChat = createSelector(
  selector,
  (state: State): ChatPreserveDto => state.chatPreserve
);
