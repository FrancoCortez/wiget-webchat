import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {ClientConfigDto} from '../../models/message/client-config.dto';

export interface State {
  isLoading: boolean;
  isLoader: boolean;
  error?: any;
  conversation?: MessageUiModel[];
  config: ClientConfigDto;
  agentName?: string;
}

export const initialState: State = {
  isLoader: false,
  isLoading: false,
  conversation: [],
  config: {soundActive: true},
  agentName: '',
};


