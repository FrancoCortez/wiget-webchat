import {createAction, props} from '@ngrx/store';

export const open = createAction('[open] open-webchat', props<{ payload: boolean }>());
export const openSuccess = createAction('[openSuccess] open-webchat succcess');
export const openFailure = createAction('[openFailure] open-webchat feailure', props<{ payload: any }>());

export const loadInitWeb = createAction('[loadInitWeb] load init web', props<{ payload: any }>());

export const triggerInit = createAction('[triggerInit] trigger init', props<{ payload: boolean }>());
export const loadIdUser = createAction('[loadIdUser] load id user', props<{ payload: string }>());
