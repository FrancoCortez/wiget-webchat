import {MessageDto} from '../../models/message/message.dto';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';

export interface State {
  isLoading: boolean;
  isLoader: boolean;
  error?: any;
  conversation?: MessageUiModel[];
}


export const initialState: State = {
  isLoader: false,
  isLoading: false,
  conversation: []
};


