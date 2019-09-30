import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';
import {Action, select, Store} from '@ngrx/store';
import {MessageService} from '../../services/message.service';
import {
  ConfigSelector,
  ConversationSelector,
  InitWebChatAction,
  LoginAction,
  RootStoreState,
  RouterAction, RouterSelector
} from '../index';

@Injectable()
export class ConversationStoreEffects {
  sendMessage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.sendMessage),
    mergeMap(action => {
      return this.messageService.sendMessage(action.message.messageUi, action.message.messageDto)
        .pipe(
          map(message => {
            this.store.dispatch(featureActions.addMessage({payload: message}));
            return featureActions.sendMessageSuccess({payload: message});
          }),
          catchError(error => of(featureActions.sendMessageFailure({payload: error})))
        );
    })
    )
  );

  leaveChat$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.leaveChat),
    mergeMap(() => this.messageService.leaveChat()
      .pipe(
        map((message) => {
          if(this.firstPageElection.button) {
            console.log(this.firstPageElection.button);
            this.store.dispatch(RouterAction.buttonLogin());
          } else if (this.firstPageElection.login) {
            console.log(this.firstPageElection.login);
            this.store.dispatch(RouterAction.loginOpen());
          }
          this.store.dispatch(LoginAction.leaveLogin());
          this.store.dispatch(featureActions.cleanConversation());
          localStorage.removeItem('state');
          localStorage.clear();
          this.store.dispatch(InitWebChatAction.triggerInit({payload: true}));
          this.store.pipe(select(ConfigSelector.selectConfig), filter(fill => ((fill.preserveHistory !== undefined || fill.preserveHistory !== null)) && fill.preserveHistory))
            .subscribe(resp => {
              this.store.subscribe(state => {
                localStorage.setItem('state', JSON.stringify(state));
              });
            });
          return featureActions.leaveChatSuccess();
        }),
        catchError(error => of(featureActions.leaveChatFailure({payload: error})))
      ))
    )
  );
  audio = null;
  audioEnabled: boolean;
  getMessage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.getMessage),
    mergeMap(() => this.messageService.getMessage()
      .pipe(
        map(message => {
          this.store.dispatch(featureActions.addAgentMessage({payload: message.agentName}));
          this.store.dispatch(featureActions.addMessage({payload: message}));
          if (this.audioEnabled) {
            this.audio.load();
            this.audio.play();
          }
          return featureActions.getMessageSuccess();
        }),
        catchError(error => of(featureActions.getMessageFailure({payload: error})))
      ))
    )
  );
  private firstPageElection: any;
  constructor(private actions$: Actions,
              private readonly store: Store<RootStoreState.AppState>,
              private readonly messageService: MessageService) {
    this.audio = new Audio('assets/audio/Rhea.mp3');
    this.store.pipe(select(ConversationSelector.selectChatSound)).subscribe(resp => this.audioEnabled = resp.soundActive);
    this.store.pipe(select(RouterSelector.selectFirstPage)).subscribe(resp => this.firstPageElection = resp);
  }


}
