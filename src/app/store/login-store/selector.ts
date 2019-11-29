import {createSelector} from '@ngrx/store';
import {State} from './state';
import {LoginDto} from '../../models/login/login.dto';
import {AppState} from '../root-state';

// export const selectorLogin = createFeatureSelector<AppState , State>('login');

const selector = (state: AppState) => state.login;

export const selectLogin = createSelector(
  selector,
  (state: State): any => state.login
);

export const loginState = createSelector(
  selector,
  (state: State): boolean => state.isLoginState
);

export const selectButtonLoginEnabled = createSelector(
  selector,
  (state: State): boolean => state.buttonEnabled
);
