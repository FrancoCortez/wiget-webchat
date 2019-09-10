import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action, select, Store} from '@ngrx/store';
import {MessageService} from '../../services/message.service';
import {ConversationSelector, LoginAction, RootStoreState, RouterAction} from '../index';

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
          this.store.dispatch(RouterAction.loginOpen());
          this.store.dispatch(LoginAction.leaveLogin());
          this.store.dispatch(featureActions.cleanConversation());
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

  constructor(private actions$: Actions,
              private readonly store: Store<RootStoreState.AppState>,
              private readonly messageService: MessageService) {
    this.audio = new Audio('assets/audio/Rhea.mp3');
    this.store.pipe(select(ConversationSelector.selectChatSound)).subscribe(resp => this.audioEnabled = resp.soundActive);
  }


}
