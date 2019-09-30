import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {ConversationAction, InitWebChatAction, LoginAction, RootStoreState, RouterAction} from '../index';
import {LoginService} from '../../services/login.service';

@Injectable()
export class ConfigStoreEffects {
  loadConfig$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.loadConfig),
    mergeMap(action => of(action)
      .pipe(
        map(login => {
          if (login.payload.preserveHistory) {
            this.store.dispatch(InitWebChatAction.triggerInit({payload: true}));
            const stateLocal = localStorage.getItem('state');
            if (stateLocal !== null) {
              const state = JSON.parse(stateLocal);
              this.store.dispatch(ConversationAction.loadMessages({payload: state.conversation}));
              this.store.dispatch(LoginAction.loadLogin({payload: state.login}));
              this.store.dispatch(InitWebChatAction.loadInitWeb({payload: state.initWebChat}));
              this.store.dispatch(RouterAction.loadRouter({payload: state.router}));
              if (state.login.login !== null) {
                if (state.login.login.msisdn !== null) {
                  this.loginService.reconnect(state.login.login.msisdn);
                }
              }
            }
          }
          return featureActions.loadConfigSuccess();
        }),
        catchError(error => of(featureActions.loadConfigFailure({payload: error})))
      ))
    )
  );

  constructor(private actions$: Actions,
              private readonly store: Store<RootStoreState.AppState>,
              private readonly loginService: LoginService) {
  }

}
