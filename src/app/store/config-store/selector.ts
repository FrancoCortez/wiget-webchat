import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';
import {ConfigUiModel} from '../../models/ui-model/config.ui-model';
import {AppState} from '../root-state';

// export const selectorConfig = createFeatureSelector<AppState , State>('config');

const selector =  (state: AppState) => state.config;


export const selectConfig = createSelector(
  selector,
  (state: State): ConfigUiModel => state.config
);
