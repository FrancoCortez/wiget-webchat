import {createAction, props} from '@ngrx/store';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';

export const addMessage = createAction('[addMessage] add message', props<{ payload: MessageUiModel }>());
