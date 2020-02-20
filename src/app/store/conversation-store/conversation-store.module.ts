import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducer';
import {ConversationStoreEffects} from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('conversation', reducer),
    EffectsModule.forFeature([ConversationStoreEffects])
  ]
})
export class ConversationStoreModule {
}
