import {TeamUiModel} from '../../models/ui-model/team.ui-model';

export interface State {
  isLoading: boolean;
  isLoader: boolean;
  team?: TeamUiModel[];
  error?: any;
}

export const initialState: State = {
  isLoader: false,
  isLoading: false
};
