import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of, Subscription} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {ConversationAction, InitWebChatAction, LoginAction, RootStoreState, RouterAction} from '../index';
import {LoginService} from '../../services/login.service';
import {InitTypeEnum} from "../../models/utils/init-type.enum";

@Injectable()
export class ConfigStoreEffects {

  selectFirstLoginState: Subscription = new Subscription();

  loadConfig$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.loadConfig),
    mergeMap(action => of(action)
      .pipe(
        map(login => {
          if (login.payload.preserveHistory) {
            const stateLocal = localStorage.getItem('state');
            if (stateLocal !== null) {
              const state = JSON.parse(stateLocal);
              if (login.payload.did === state.config.config.did) {
                this.store.dispatch(InitWebChatAction.triggerInit({payload: true}));
                this.store.dispatch(ConversationAction.loadMessages({payload: state.conversation}));;
                this.store.dispatch(LoginAction.loadLogin({payload: state.login}));
                this.store.dispatch(InitWebChatAction.loadInitWeb({payload: state.initWebChat}));
                if (state.login.login !== null) {
                  if (state.login.login.msisdn !== null) {
                    this.store.dispatch(RouterAction.loadRouter({payload: state.router}));
                    this.loginService.reconnect(state.login.login.msisdn);
                  }
                }
              }
              this.selectFirstLoginState.unsubscribe();
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
