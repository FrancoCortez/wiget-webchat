import {MessageDto} from '../../models/message/message.dto';

export interface State {
  isLoading: boolean;
  isLoader: boolean;
  error?: any;
  conversation?: MessageDto[];
}


export const initialState: State = {
  isLoader: false,
  isLoading: false,
  conversation: []
};


