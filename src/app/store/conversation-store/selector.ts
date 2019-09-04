import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {AppState} from '../root-state';

// export const selectorMessage = createFeatureSelector<AppState , State>('conversation');

const selector =  (state: AppState) => state.conversation;

export const selectConversations = createSelector(
  selector,
  (state: State): MessageUiModel[] => state.conversation
);
