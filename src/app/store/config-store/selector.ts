import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';
import {ConfigUiModel} from '../../models/ui-model/config.ui-model';

export const selectorConfig = createFeatureSelector<State>('config');


export const selectConfig = createSelector(
  selectorConfig,
  (state: State): ConfigUiModel => state.config
);
