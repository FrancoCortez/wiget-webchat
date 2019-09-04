import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {ButtonComponent} from './button/button.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TriggerButtonComponent} from './trigger-button/trigger-button.component';
import {TeamComponent} from './team/team.component';
import {HeaderComponent} from './header/header.component';
import {WidgetCaptionComponent} from './widget-caption/widget-caption.component';
import {HeaderWidgetComponent} from './header-widget/header-widget.component';
import {InputSendComponent} from './input-send/input-send.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    TriggerButtonComponent,
    TeamComponent,
    HeaderComponent,
    WidgetCaptionComponent,
    HeaderWidgetComponent,
    InputSendComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    TriggerButtonComponent,
    TeamComponent,
    HeaderComponent,
    WidgetCaptionComponent,
    HeaderWidgetComponent,
    InputSendComponent
  ]
})
export class ComponentsModule {
}
