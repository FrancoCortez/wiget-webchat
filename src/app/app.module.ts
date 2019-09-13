import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RootStoreModule} from './store';
import {createCustomElement} from '@angular/elements';
import {APP_BASE_HREF} from '@angular/common';
import {PagesModule} from './pages/pages.module';
import {ComponentsModule} from './components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {HttpClientModule} from '@angular/common/http';
import {PickerModule} from '@ctrl/ngx-emoji-mart';

const config: SocketIoConfig = {
  url: 'https://k8s-dev.chattigo.com',
  options: {path: '/webchat/socket.io/', query: 'did=santotomas@WC', transports: ['websocket']}
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootStoreModule,
    PagesModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    PickerModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  exports: [],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('app-widget-root', el);
  }
}
