import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ComponentsModule} from '../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class PagesModule {
}
