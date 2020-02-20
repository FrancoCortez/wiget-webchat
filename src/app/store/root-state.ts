import {ConfigState} from './config-store';
import {InitWebChatState} from './init-web-chat-store';
import {LoginState} from './login-store';
import {TeamState} from './team-store';
import {RouterState} from './router-store';
import {ConversationState} from './conversation-store';
import {PreserveSelectionState} from './preserve-selection-store';

export interface AppState {
  config: ConfigState.State;
  conversation: ConversationState.State;
  initWebChat: InitWebChatState.State;
  login: LoginState.State;
  router: RouterState.State;
  team: TeamState.State;
  preserveSelection: PreserveSelectionState.State;
}
