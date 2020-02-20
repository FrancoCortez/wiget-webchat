import {createSelector} from '@ngrx/store';
import {State} from './state';
import {TeamUiModel} from '../../models/ui-model/team.ui-model';
import {AppState} from '../root-state';

// export const selectorTeam = createFeatureSelector<AppState , State>('team');

const selector = (state: AppState) => state.team;

export const selectTeam = createSelector(
  selector,
  (state: State): TeamUiModel[] => state.team
);
