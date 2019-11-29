import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  ConfigSelector,
  InitWebChatAction,
  InitWebChatSelector,
  LoginAction,
  LoginSelector,
  RootStoreState
} from '../../store';
import {InputComponent} from '../../components/input/input.component';
import {FormGroup} from '@angular/forms';
import {LoginDto} from '../../models/login/login.dto';
import {filter, map} from 'rxjs/operators';
import {MessageDto} from '../../models/message/message.dto';
import {v4 as uuid} from 'uuid';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Subscription} from "rxjs";
import {ConfigUiModel} from "../../models/ui-model/config.ui-model";
import {InitTypeEnum} from "../../models/utils/init-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
  animations: [
    trigger('enterAnimationEnter', [
      transition(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ]),
    trigger('enterAnimationFade', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ]),
  ],
})
export class LoginComponent implements OnInit, OnDestroy {

  public hidden = false;
  @ViewChild(InputComponent, {static: false}) inputComponentReferent;

  form: FormGroup;
  headerColor: string;
  idUser: string;
  teamHidden = true;
  loading = false;

  selectIsOpen: Subscription = new Subscription();
  selectIdUser: Subscription = new Subscription();
  selectConfig: Subscription = new Subscription();
  selectLoading: Subscription = new Subscription();
  config?: ConfigUiModel;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnDestroy(): void {
    this.selectIsOpen.unsubscribe();
    this.selectIdUser.unsubscribe();
    this.selectConfig.unsubscribe();
    this.selectLoading.unsubscribe();
    this.store.dispatch(LoginAction.loginState({payload: false}));
  }

  ngOnInit() {
    console.log('init login')
    this.selectLoading = this.store.pipe(select(LoginSelector.selectButtonLoginEnabled)).subscribe(resp => this.loading = resp);
    this.selectIdUser = this.store.pipe(select(InitWebChatSelector.selectIdUser)).subscribe(resp => this.idUser = resp);
    this.selectIsOpen = this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        this.hidden = !resp;
      });
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig))
      .pipe(filter(fill => fill.caption !== undefined))
      .subscribe(resp => {
        this.headerColor = resp.caption.headerBackgroundColor;
        this.teamHidden = resp.showTeam;
        console.log(`Entre al resp ${resp}` );
        this.config = resp;
      });
  }

  public login() {
    this.store.dispatch(LoginAction.loginState({payload: true}));
    this.form = this.inputComponentReferent.form;
    if(this.config.initType === InitTypeEnum.START_CHAT_WITH_WELCOME){
      this.store.dispatch(LoginAction.loginButtonEnabled({payload: false}));
      this.store.pipe(select(LoginSelector.selectLogin)).subscribe(resp => {
        this.store.dispatch(LoginAction.login({payload: resp}));
      });
    } else {
      this.loginSubmit();
    }
  }

  public toggleClose() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }

  public loginSubmit() {
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
            content: '',
            idUser: this.idUser
          };
          input.forEach(row => {
            message.content += `\n ${row.label}: ${this.form.controls[row.id].value}`;
          });
          this.store.dispatch(LoginAction.loginButtonEnabled({payload: false}));
          this.store.dispatch(LoginAction.login({payload: message}));
        });
    }
  }

}
