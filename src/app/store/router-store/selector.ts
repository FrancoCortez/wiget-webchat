import {createSelector} from '@ngrx/store';
import {State} from './state';
import {AppState} from '../root-state';

// export const selectorRouter = createFeatureSelector<AppState , State>('router');
const selector = (state: AppState) => state.router;

export const selectLoginOpen = createSelector(
  selector,
  (state: State): boolean => state.login
);
export const selectWidgetOpen = createSelector(
  selector,
  (state: State): boolean => state.widget
);
export const selectConfigOpen = createSelector(
  selector,
  (state: State): boolean => state.config
);
export const selectButtonOpen = createSelector(
  selector,
  (state: State): boolean => state.button
);

export const selectFinish = createSelector(
  selector,
  (state: State): boolean => state.finish
);

export const selectFirstPage = createSelector(
  selector,
  (state: State): any => {
    return {button: state.firstButton, login: state.firstLogin}
  }
);

export const selectFirstLoginState = createSelector(
  selector,
  (state: State): boolean => {
    return (state.login || state.button);
  }
);
