import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducer';
import {ConfigStoreEffects} from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('config', reducer),
    EffectsModule.forFeature([ConfigStoreEffects])
  ]
})
export class ConfigStoreModule {
}
