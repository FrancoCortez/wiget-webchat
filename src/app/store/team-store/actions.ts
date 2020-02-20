import {createAction, props} from '@ngrx/store';
import {TeamUiModel} from '../../models/ui-model/team.ui-model';

export const team = createAction('[team] team call', props<{ payload: TeamUiModel[] }>());
export const teamSuccess = createAction('[teamSuccess] team call success');
export const teamFailure = createAction('[teamFailure] team call failed', props<{ payload: any }>());
