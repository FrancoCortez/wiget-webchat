import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, delay, map, mergeMap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {RouterAction} from '../router-store';
import {ConversationAction, LoginAction, RootStoreState} from '../index';
import {LoginService} from '../../services/login.service';

@Injectable()
export class LoginStoreEffects {

  login$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.login),
    mergeMap(action => this.login.login(action.payload)
      .pipe(
        map(map => {
          this.store.dispatch(ConversationAction.getMessage());
        }),
        delay(3000),
        map((send) => {
          this.store.dispatch(RouterAction.widgetOpen());
          this.store.dispatch(LoginAction.loginButtonEnabled({payload: true}))
          return featureActions.loginSuccess();
        }),
        catchError(error => of(featureActions.loginFailure({payload: error})))
      ))
    )
  );

  constructor(private actions$: Actions,
              private readonly store: Store<RootStoreState.AppState>,
              private readonly login: LoginService) {
  }


}
