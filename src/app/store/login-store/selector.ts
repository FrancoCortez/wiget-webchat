import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './state';
import {LoginDto} from '../../models/login/login.dto';

export const selectorLogin = createFeatureSelector<State>('login');


export const selectLogin = createSelector(
  selectorLogin,
  (state: State): LoginDto => state.login
);
