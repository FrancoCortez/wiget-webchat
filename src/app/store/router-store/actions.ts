import {createAction, props} from '@ngrx/store';

export const loginOpen = createAction('[loginOpen] login open');
export const widgetOpen = createAction('[widgetOpen] widget open');
export const configOpen = createAction('[configOpen] config open');


export const loadRouter = createAction('[loadRouter] load router', props<{ payload: any }>());
