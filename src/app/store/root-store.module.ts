import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ConfigStoreModule} from './config-store';
import {InitWebChatState, InitWebChatStoreModule} from './init-web-chat-store';
import {LoginState, LoginStoreModule} from './login-store';
import {TeamState, TeamStoreModule} from './team-store';
import {RouterState, RouterStoreModule} from './router-store';
import {ConversationAction, ConversationSelector, ConversationState, ConversationStoreModule} from './conversation-store';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[cleanConversation] clean conversation') {
      console.log('entre al cleanr')
      state.conversation = ConversationState.initialState;
      state.initWebChat = InitWebChatState.initialState;
      state.login = LoginState.initialState;
      state.router = RouterState.initialState;
      state.team = TeamState.initialState;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigStoreModule,
    InitWebChatStoreModule,
    LoginStoreModule,
    TeamStoreModule,
    RouterStoreModule,
    ConversationStoreModule,
    StoreModule.forRoot( {}  ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states,
      logOnly: false
    })
  ]
})
export class RootStoreModule {
}
