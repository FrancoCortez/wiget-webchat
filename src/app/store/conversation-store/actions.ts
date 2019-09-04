import {createAction, props} from '@ngrx/store';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {MessageDto} from '../../models/message/message.dto';

// tslint:disable-next-line:max-line-length
export const sendMessage = createAction('[sendMessage] send message', props<{ message: { messageUi: MessageUiModel, messageDto: MessageDto } }>());
export const sendMessageSuccess = createAction('[sendMessage] send message success', props<{ payload: MessageUiModel }>());
export const sendMessageFailure = createAction('[sendMessage] send message failure', props<{ payload: any }>());

export const addMessage = createAction('[addMessage] add message', props<{ payload: MessageUiModel }>());

export const getMessage = createAction('[getMessage] get message');
export const getMessageSuccess = createAction('[getMessageSuccess] get message success');
export const getMessageFailure = createAction('[getMessageFailure] get message failure', props<{ payload: MessageUiModel }>());

export const leaveChat = createAction('[leaveChat] leave chat');
export const leaveChatSuccess = createAction('[leaveChatSuccess] leave chat success');
export const leaveChatFailure = createAction('[leaveChatFailure] leave chat failure', props<{ payload: any }>());

export const cleanConversation = createAction('[cleanConversation] clean conversation');
