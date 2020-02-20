import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducer';
import {LoginStoreEffects} from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('login', reducer),
    EffectsModule.forFeature([LoginStoreEffects])
  ]
})
export class LoginStoreModule {
}
