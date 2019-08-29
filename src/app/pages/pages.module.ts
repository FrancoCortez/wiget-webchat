import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ComponentsModule} from '../components/components.module';
import {WidgetConfigComponent} from './widget-config/widget-config.component';
import {WidgetChatComponent} from './widget-chat/widget-chat.component';
import {ContainerWidgetComponent} from './container-widget/container-widget.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    WidgetConfigComponent,
    WidgetChatComponent,
    ContainerWidgetComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    WidgetConfigComponent,
    ContainerWidgetComponent
  ]
})
export class PagesModule {
}
