import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';
import {TeamUiModel} from '../../models/ui-model/team.ui-model';

export const selectorTeam = createFeatureSelector<State>('team');


export const selectTeam = createSelector(
  selectorTeam,
  (state: State): TeamUiModel[] => state.team
);
