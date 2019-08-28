import {ConfigState} from './config-store';
import {InitWebChatState} from './init-web-chat-store';
import {LoginState} from './login-store';
import {TeamState} from './team-store';

export interface AppState {
  config: ConfigState.State;
  initWebChat: InitWebChatState.State;
  login: LoginState.State;
  team: TeamState.State;
}
