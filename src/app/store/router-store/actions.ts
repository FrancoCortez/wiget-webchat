import {createAction, props} from '@ngrx/store';

export const loginOpen = createAction('[loginOpen] login open');
export const widgetOpen = createAction('[widgetOpen] widget open');
export const configOpen = createAction('[configOpen] config open');
export const buttonLogin = createAction('[buttonLogin] button open');
export const finish = createAction('[finish] finish');


export const loadRouter = createAction('[loadRouter] load router', props<{ payload: any }>());


export const initFirstLogin = createAction('[initFirstLogin] Init first login');
export const initFirstButton = createAction('[initFirstButton] Init first button');
