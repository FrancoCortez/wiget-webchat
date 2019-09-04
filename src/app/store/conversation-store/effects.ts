import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {MessageService} from '../../services/message.service';
import { LoginAction, RootStoreState, RouterAction} from '../index';

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
  getMessage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.getMessage),
    mergeMap(() => this.messageService.getMessage()
      .pipe(
        map(message => {
          this.store.dispatch(featureActions.addMessage({payload: message}));
          return featureActions.getMessageSuccess();
        }),
        catchError(error => of(featureActions.getMessageFailure({payload: error})))
      ))
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

  constructor(private actions$: Actions,
              private readonly store: Store<RootStoreState.AppState>,
              private readonly messageService: MessageService) {
  }


}
