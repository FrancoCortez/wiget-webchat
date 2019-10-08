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
import {HttpClientModule} from '@angular/common/http';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {SocketConnect} from './client/socket.connect';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { OnlyNumberDirective } from './validation/directives/only-number.directive';
import { OnlyTextDirective } from './validation/directives/only-text.directive';
import { OnlyTextNumberDirective } from './validation/directives/only-text-number.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RootStoreModule,
    PagesModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PickerModule,
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: true,
      features: {
        pause: false, // start/pause recording of dispatched actions
        lock: false, // lock/unlock dispatching actions and side effects
        persist: false, // persist states on page reloading
        export: false, // export history of actions in a file
        import: false, // import history of actions from a file
        jump: false, // jump back and forth (time travelling)
        skip: false, // skip (cancel) actions
        reorder: false, // drag and drop actions in the history list
        dispatch: false, // dispatch custom actions or action creators
        test: true // generate tests for the selected actions
      },
    })
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}, SocketConnect
  ],
  exports: [
    OnlyNumberDirective
  ],
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
