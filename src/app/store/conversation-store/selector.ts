import {createSelector} from '@ngrx/store';
import {State} from './state';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {AppState} from '../root-state';
import {ClientConfigDto} from '../../models/message/client-config.dto';

// export const selectorMessage = createFeatureSelector<AppState , State>('conversation');

const selector = (state: AppState) => state.conversation;

export const selectConversations = createSelector(
  selector,
  (state: State): MessageUiModel[] => state.conversation
);

export const selectChatSound = createSelector(
  selector,
  (state: State): ClientConfigDto => state.config
);

export const selectAgentName = createSelector(
  selector,
  (state: State): string => state.agentName
);
