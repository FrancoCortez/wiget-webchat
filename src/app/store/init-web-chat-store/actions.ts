import {createAction, props} from '@ngrx/store';

export const open = createAction('[open] open-webchat', props<{ payload: boolean }>());
export const openSuccess = createAction('[openSuccess] open-webchat succcess');
export const openFailure = createAction('[openFailure] open-webchat feailure', props<{ payload: any }>());
