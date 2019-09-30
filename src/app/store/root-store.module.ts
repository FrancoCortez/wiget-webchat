import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ConfigStoreModule} from './config-store';
import {InitWebChatStoreModule} from './init-web-chat-store';
import {LoginStoreModule} from './login-store';
import {TeamStoreModule} from './team-store';
import {RouterStoreModule} from './router-store';
import {ConversationStoreModule} from './conversation-store';

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
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule {
}
