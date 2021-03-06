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
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {OnlyNumberDirective} from "../validation/directives/only-number.directive";
import {OnlyTextDirective} from "../validation/directives/only-text.directive";
import {OnlyTextNumberDirective} from "../validation/directives/only-text-number.directive";
import {OnlyRutDirective} from "../validation/directives/only-rut.directive";
import { SocialMediaComponent } from './social-media/social-media.component';
import { HeaderFinishComponent } from './header-finish/header-finish.component';
import { StarFinishComponent } from './star-finish/star-finish.component';
import { ContentFinishComponent } from './content-finish/content-finish.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    TriggerButtonComponent,
    TeamComponent,
    HeaderComponent,
    WidgetCaptionComponent,
    HeaderWidgetComponent,
    InputSendComponent,
    OnlyNumberDirective,
    OnlyTextDirective,
    OnlyTextNumberDirective,
    OnlyRutDirective,
    SocialMediaComponent,
    HeaderFinishComponent,
    StarFinishComponent,
    ContentFinishComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PickerModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    TriggerButtonComponent,
    TeamComponent,
    HeaderComponent,
    WidgetCaptionComponent,
    HeaderWidgetComponent,
    InputSendComponent,
    OnlyNumberDirective,
    OnlyTextDirective,
    OnlyTextNumberDirective,
    OnlyRutDirective,
    SocialMediaComponent,
    HeaderFinishComponent,
    StarFinishComponent,
    ContentFinishComponent,
  ]
})
export class ComponentsModule {
}
