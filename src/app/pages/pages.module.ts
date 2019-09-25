import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ComponentsModule} from '../components/components.module';
import {WidgetConfigComponent} from './widget-config/widget-config.component';
import {WidgetChatComponent} from './widget-chat/widget-chat.component';
import {ContainerWidgetComponent} from './container-widget/container-widget.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidateHtmlPipe} from '../validation/validate-html.pipe';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';

@NgModule({
  declarations: [
    LoginComponent,
    WidgetConfigComponent,
    WidgetChatComponent,
    ContainerWidgetComponent,
    ValidateHtmlPipe
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    PickerModule,
    EmojiModule
  ],
  exports: [
    LoginComponent,
    WidgetConfigComponent,
    ContainerWidgetComponent,
    ValidateHtmlPipe
  ]
})
export class PagesModule {
}
