import {Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, InitWebChatAction, InitWebChatSelector, LoginAction, RootStoreState} from '../../store';
import {InputComponent} from '../../components/input/input.component';
import {FormGroup} from '@angular/forms';
import {LoginDto} from '../../models/login/login.dto';
import {map} from 'rxjs/operators';
import {MessageDto} from '../../models/message/message.dto';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  public hidden = false;
  @ViewChild(InputComponent, {static: false}) inputComponentReferent;

  form: FormGroup;
  headerColor: string;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        this.hidden = !resp;
      });
    this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => {
      this.headerColor = resp.caption.headerBackgroundColor;
    });
  }

  public login() {
    this.store.dispatch(LoginAction.loginState({payload: true}));
    this.form = this.inputComponentReferent.form;
    if (this.form.valid) {
      this.store.pipe(select(ConfigSelector.selectConfig))
        .pipe(map(input => input.input))
        .subscribe(input => {
          const login: LoginDto = {};
          input.forEach(row => {
            if (row.nameField) {
              const value = this.form.controls[row.id].value;
              if (login.name === undefined || login.name === '' || login.name === null) {
                login.name = value;
              } else {
                login.name = login.name + ' ' + value;
              }
            }
            if (row.userField) {
              const value = this.form.controls[row.id].value;
              if (login.user === undefined || login.user === '' || login.user === null) {
                login.user = value;
              } else {
                login.user = login.user + '-' + value;
              }
            }
          });
          login.valid = this.form.valid;
          const message: MessageDto = {
            msisdn: (login.user === undefined || login.user === null || login.user === '') ? uuid() : login.user,
            isAttachment: false,
            type: 'text',
            id: uuid(),
            name: (login.name === undefined || login.name === null || login.name === '') ? 'Anonimo' : login.name,
            attachment: null,
            timestamp: new Date(),
            content: ''
          };
          input.forEach(row => {
            message.content += `\n ${row.label}: ${this.form.controls[row.id].value}`;
          });
          this.store.dispatch(LoginAction.login({payload: message}));
        });
    }
  }

  public toggleClose() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }

}
