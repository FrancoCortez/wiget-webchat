import {createAction, props} from '@ngrx/store';
import {LoginDto} from '../../models/login/login.dto';
import {MessageDto} from '../../models/message/message.dto';

export const login = createAction('[login] Login init webchat', props<{ payload: MessageDto }>());
export const loginSuccess = createAction('[loginSuccess] Login success webchat');
export const loginFailure = createAction('[loginFailure] Login failed webchat', props<{ payload: any }>());
