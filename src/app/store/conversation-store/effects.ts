import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, delay, filter, map, mergeMap} from 'rxjs/operators';
import {Action, select, Store} from '@ngrx/store';
import {MessageService} from '../../services/message.service';
import {
  ConfigSelector,
  ConversationAction,
  ConversationSelector,
  InitWebChatAction,
  LoginAction,
  RootStoreState,
  RouterAction,
  RouterSelector
} from '../index';
import {InitTypeEnum} from "../../models/utils/init-type.enum";

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
  audio = null;
  audioEnabled: boolean;
  getMessage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.getMessage),
    mergeMap(() => this.messageService.getMessage()
      .pipe(
        map(message => {
          const sub = this.store.pipe(select(ConversationSelector.selectLastConversation)).subscribe(resp => {
            if (resp !== undefined) {
              if (message.id !== resp.id) {
                this.store.dispatch(featureActions.addAgentMessage({payload: message.agentName}));
                this.store.dispatch(featureActions.addMessage({payload: message}));
                if (this.audioEnabled) {
                  this.audio.load();
                  this.audio.play();
                }
              }
            } else {
              this.store.dispatch(featureActions.addAgentMessage({payload: message.agentName}));
              this.store.dispatch(featureActions.addMessage({payload: message}));
              if (this.audioEnabled) {
                this.audio.load();
                this.audio.play();
              }
            }
          });
          sub.unsubscribe();
          return featureActions.getMessageSuccess();
        }),
        catchError(error => of(featureActions.getMessageFailure({payload: error})))
      ))
    )
  );

  getLeaveAgentChat$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.getMessage),
    mergeMap(() => this.messageService.getLeaveAgentChat()
      .pipe(
        delay(5000),
        map(() => {
          this.store.dispatch(ConversationAction.leaveChat());
          return featureActions.getMessageSuccess();
        }),
        catchError(error => of(featureActions.getMessageFailure({payload: error})))
      ))
    )
  );
  private firstPageElection: any;
  leaveChat$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.leaveChat),
    mergeMap(() => this.messageService.leaveChat()
      .pipe(
        map((message) => {
          // if (this.firstPageElection.button) {
          //   this.store.dispatch(RouterAction.buttonLogin());
          // } else if (this.firstPageElection.login) {
          //   this.store.dispatch(RouterAction.loginOpen());
          // }
          this.store.dispatch(RouterAction.finish());
          this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => {
            if(resp.initType !== InitTypeEnum.START_CHAT_WITH_WELCOME){
              this.store.dispatch(LoginAction.leaveLogin());
              localStorage.removeItem('state');
              localStorage.clear();
            }
          });
          this.store.dispatch(featureActions.cleanConversation());
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

  constructor(private actions$: Actions,
              private readonly store: Store<RootStoreState.AppState>,
              private readonly messageService: MessageService) {
    this.audio = new Audio('https://cdn.chattigo.com/assets/legacy/sounds/Rhea.mp3');
    this.store.pipe(select(ConversationSelector.selectChatSound)).subscribe(resp => this.audioEnabled = resp.soundActive);
    this.store.pipe(select(RouterSelector.selectFirstPage)).subscribe(resp => this.firstPageElection = resp);
  }


}
