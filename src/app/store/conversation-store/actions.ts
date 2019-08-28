import {createAction, props} from '@ngrx/store';
import {MessageDto} from '../../models/message/message.dto';

export const sendMessage = createAction('[sendMessage] send message', props<{ payload: MessageDto }>());
export const sendMessageSuccess = createAction('[sendMessageSuccess] send message success', props< {payload: MessageDto} > ());
export const sendMessageFailure = createAction('[sendMessageFailure] send message failure', props<{ payload: any }>());

export const receivesMessage = createAction('[receivesMessage] receives message', props<{payload: MessageDto}>());
export const receivesMessageSuccess = createAction('[receivesMessageSuccess] receives message success', props<{payload: MessageDto}>());
export const receivesMessageFailure = createAction('[receivesMessageFailure] receives message failure', props<{payload: any}>());
