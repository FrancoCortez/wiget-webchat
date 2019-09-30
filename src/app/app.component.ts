import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  ConfigAction,
  ConfigSelector,
  ConversationAction,
  InitWebChatAction,
  InitWebChatSelector,
  LoginAction,
  RootStoreState,
  RouterAction,
  RouterSelector
} from './store';
import {ConfigUiModel} from './models/ui-model/config.ui-model';
import {InputUiModel} from './models/ui-model/input.ui-model';
import {filter} from 'rxjs/operators';
import {MessageDto} from './models/message/message.dto';
import {v4 as uuid} from 'uuid';
import {buttonLogin} from "./store/router-store/actions";
import {ButtonOptionUiModel} from "./models/ui-model/button-option.ui-model";


@Component({
  selector: 'app-widget-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @Input() setting: any;
  toggles = false;
  @Input() did: string;
  triggerHiden = false;
  configUi: ConfigUiModel;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
    this.store.pipe(select(InitWebChatSelector.selectIsTrigger)).subscribe(resp => this.triggerHiden = resp);
    this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        this.toggles = resp;
      });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    const reviver = (key, value) => {
      if (typeof value === 'string'
        && value.indexOf('function ') === 0) {
        const functionTemplate = `(${value})`;
        return eval(functionTemplate);
      }
      return value;
    };
    const setting = JSON.parse(this.setting, reviver);
    this.configUi = {
      did: this.did,
      showTeam: setting.team_enabled,
      button: {
        enabled: setting.button_enabled,
        label: setting.login_text,
        colorText: `${setting.button_login_color}`,
        colorButtonBg: `linear-gradient(140deg, ${setting.button_login_bg} 40%, #000 200%)`
      },
      header: {
        title: setting.welcome_text,
        subtitle: setting.subtitle_text,
        logo: setting.logo,
        titleColor: `${setting.welcome_color}`,
        subtitleColor: `${setting.subtitle_color}`,
      },
      caption: {
        caption: setting.header_status,
        title: setting.header_text,
        // tslint:disable-next-line:max-line-length
        headerBackgroundColor: `url(https://cdn.chattigo.com/assets/img/logo-wing.svg), linear-gradient(140deg, ${setting.header_background_color} 40%, #000 200%)`,
        headerFontColor: `${setting.header_font_color}`,
        agentNameEnabled: setting.agent_name_enabled,
      },
      captionLogin: {
        title: setting.caption_title,
        caption: setting.caption_subtitle,
        titleColor: `${setting.caption_title_color}`,
        captionColor: `${setting.caption_subtitle_color}`
      },
      messageSend: {
        messagePlaceholder: setting.message_placeholder,
        sendButtonColor: setting.send_color
      },
      configPanel: {
        switchColor: `linear-gradient(140deg, ${setting.button_login_bg} 40%, #000 200%)`,
        linkColor: `linear-gradient(140deg, ${setting.button_login_bg} 40%, #000 200%)`,
      },
      preserveHistory: setting.preserve_history,
      geoActive: setting.geo_active,
      bgMenu: setting.bg_menu,
    };


    if(setting.init_button_prefer !== undefined && setting.init_button_prefer !== null ) {
      const buttonConfigLogin: ButtonOptionUiModel[] = [];
      setting.init_button_prefer.forEach(button => {
          const obj: ButtonOptionUiModel = {
            // colorButtonBg: button.button_bg,
            colorButtonBg: `linear-gradient(140deg, ${button.button_bg} 40%, #000 200%)`,
            colorText: button.button_color,
            label: button.button_text,
            enabled: button.button_enabled
          };
        const formInput: InputUiModel[] = [];
          button.button_login_field.forEach(row => {
            const input: InputUiModel = {};
            input.fontColor = setting.field_font_color;
            if (typeof row === 'string') {
              (row === setting.user_field) ? input.userField = true : input.userField = false;
              (row === setting.name_field) ? input.nameField = true : input.nameField = false;
              input.label = row;
              input.required = false;
              input.placeholder = row;
            } else {
              (row.label === setting.user_field) ? input.userField = true : input.userField = false;
              (row.label === setting.name_field) ? input.nameField = true : input.nameField = false;
              input.label = row.label;
              input.required = (row.required === undefined) ? false : row.required;
              input.choices = row.choices;
              input.validation = row.validation;
              input.placeholder = (row.placeholder === undefined || row.placeholder === null) ? row.label : row.placeholder;
            }
            formInput.push(input);
          });
          obj.input = formInput;
          buttonConfigLogin.push(obj);
      });
      this.configUi.buttonPrefer = buttonConfigLogin;
      this.store.dispatch(RouterAction.initFirstButton());
      this.store.dispatch(RouterAction.buttonLogin());
    } else {
      const formInput: InputUiModel[] = [];
      setting.login_fields.forEach(row => {
        const input: InputUiModel = {};
        input.fontColor = setting.field_font_color;
        if (typeof row === 'string') {
          (row === setting.user_field) ? input.userField = true : input.userField = false;
          (row === setting.name_field) ? input.nameField = true : input.nameField = false;
          input.label = row;
          input.required = false;
          input.placeholder = row;
        } else {
          (row.label === setting.user_field) ? input.userField = true : input.userField = false;
          (row.label === setting.name_field) ? input.nameField = true : input.nameField = false;
          input.label = row.label;
          input.required = (row.required === undefined) ? false : row.required;
          input.choices = row.choices;
          input.validation = row.validation;
          input.placeholder = (row.placeholder === undefined || row.placeholder === null) ? row.label : row.placeholder;
        }
        formInput.push(input);
      });
      this.configUi.input = formInput;
      this.store.dispatch(RouterAction.initFirstLogin());
      this.store.dispatch(RouterAction.loginOpen());
    }
    // this.configUi.input = formInput;
    this.store.dispatch(ConfigAction.loadConfig({payload: this.configUi}));
  }

  @Input() public init = () => {
    this.store.pipe(select(ConfigSelector.selectConfig), filter(fill => ((fill.preserveHistory !== undefined || fill.preserveHistory !== null)) && fill.preserveHistory))
      .subscribe(resp => {
        this.store.subscribe(state => {
          localStorage.setItem('state', JSON.stringify(state));
        });
      });
    // this.store.dispatch(InitWebChatAction.open({payload: true}));
    this.store.dispatch(InitWebChatAction.triggerInit({payload: true}));
  };
  @Input() public toggle = () => {
    this.store.dispatch(InitWebChatAction.open({payload: !this.toggles}));
  };
  @Input() public visibilityWC = (show: boolean) => {
    this.store.dispatch(InitWebChatAction.triggerInit({payload: show}));
    this.store.dispatch(InitWebChatAction.open({payload: show}));
  };
  @Input() public expandChat = () => {
    this.store.dispatch(InitWebChatAction.open({payload: true}));
  };

  @Input() public collapseChat = () => {
    this.store.dispatch(InitWebChatAction.open({payload: false}));
  };
  @Input() public logout = () => {
    this.store.dispatch(ConversationAction.leaveChat());
  };
  @Input() public startChat = (data: any) => {
    const message: MessageDto = {
      msisdn: (data.msisdn === undefined || data.msisdn === null || data.msisdn === '') ? uuid() : data.msisdn,
      isAttachment: false,
      type: 'text',
      id: uuid(),
      name: (data.name === undefined || data.name === null || data.name === '') ? 'Anonimo' : data.name,
      attachment: null,
      timestamp: new Date(),
      content: data.content,
      idUser: data.idUser
    };
    message.content = `\n Nombre: ${message.name} \n ${data.content}`;
    this.store.dispatch(LoginAction.login({payload: message}));
    this.expandChat();
  }

  @Input() public initChatWithAgent = (data: string) => {
    this.store.dispatch(InitWebChatAction.loadIdUser({payload: data}));
    this.init();
    this.expandChat();
  }

}
