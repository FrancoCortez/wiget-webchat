import {ConfigState} from './config-store';
import {InitWebChatState} from './init-web-chat-store';

export interface AppState {
  config: ConfigState.State;
  initWebChat: InitWebChatState.State;
}
