import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducer';
import {InitWebChatStoreEffects} from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('init-web-chat', reducer),
    EffectsModule.forFeature([InitWebChatStoreEffects])
  ]
})
export class InitWebChatStoreModule {
}
