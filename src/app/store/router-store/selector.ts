import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';

export const selectorRouter = createFeatureSelector<State>('router');


export const selectLoginOpen = createSelector(
  selectorRouter,
  (state: State): boolean => state.login
);
export const selectWidgetOpen = createSelector(
  selectorRouter,
  (state: State): boolean => state.widget
);
export const selectConfigOpen = createSelector(
  selectorRouter,
  (state: State): boolean => state.config
);
