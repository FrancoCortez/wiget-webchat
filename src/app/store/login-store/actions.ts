import {createAction, props} from '@ngrx/store';
import {MessageDto} from '../../models/message/message.dto';

export const login = createAction('[login] Login init webchat', props<{ payload: MessageDto }>());
export const loginSuccess = createAction('[loginSuccess] Login success webchat');
export const loginFailure = createAction('[loginFailure] Login failed webchat', props<{ payload: any }>());

export const leaveLogin = createAction('[leaveLogin] leave login');

export const loadLogin = createAction('[loadLogin] load login', props<{ payload: any }>());

export const loginState = createAction('[loginState] login state', props<{ payload: boolean }>());
export const loginButtonEnabled = createAction('[loginButtonEnabled] login button enabled', props<{ payload: boolean }>());
