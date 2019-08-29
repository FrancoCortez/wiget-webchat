import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';

export const selectorMessage = createFeatureSelector<State>('conversation');


export const selectConversations = createSelector(
  selectorMessage,
  (state: State): MessageUiModel[] => state.conversation
);
