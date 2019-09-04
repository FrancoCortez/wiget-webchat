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

const config: SocketIoConfig = {
  url: 'https://kops.chattigo.com',
  options: {path: '/webchat/socket.io/', query: 'did=demoChattigo@WC', transports: ['websocket']}
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
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('app-root', el);
  }
}
