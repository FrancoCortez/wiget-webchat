import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {ButtonComponent} from './button/button.component';
import {ReactiveFormsModule} from '@angular/forms';
import { TriggerButtonComponent } from './trigger-button/trigger-button.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    TriggerButtonComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    TriggerButtonComponent,
    TeamComponent
  ]
})
export class ComponentsModule {
}
