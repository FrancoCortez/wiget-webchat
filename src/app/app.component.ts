import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  ConfigAction,
  ConfigSelector,
  ConversationAction,
  InitWebChatAction,
  InitWebChatSelector,
  LoginAction,
  RootStoreState,
  RouterAction
} from './store';
import {ConfigUiModel} from './models/ui-model/config.ui-model';
import {InputUiModel} from './models/ui-model/input.ui-model';
import {delay, filter} from 'rxjs/operators';
import {MessageDto} from './models/message/message.dto';
import {v4 as uuid} from 'uuid';
import {ButtonOptionUiModel} from "./models/ui-model/button-option.ui-model";
import {ConfigService} from "./services/config.service";


@Component({
  selector: 'app-widget-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() setting: any;
  toggles = false;
  @Input() did: string;
  triggerHidden = false;
  configUi: ConfigUiModel;

  @Input() remote: boolean;

  constructor(private readonly store: Store<RootStoreState.AppState>,
              private readonly configService: ConfigService,
              private cd: ChangeDetectorRef) {
    this.store.pipe(select(InitWebChatSelector.selectIsTrigger)).subscribe(resp => this.triggerHidden = resp);
    this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        this.toggles = resp;
      });
  }

  ngOnInit(): void {
    if (this.remote) {
      this.initConfigRemote();
    } else {
      this.initConfigLocal();
    }
  }

  @Input() public init = () => {
    this.store.pipe(select(ConfigSelector.selectConfig),
      delay(1000),
      filter(fill => ((fill.preserveHistory !== undefined || fill.preserveHistory !== null)) && fill.preserveHistory),
    )
      .subscribe(resp => {
        this.store.subscribe(state => {
          localStorage.setItem('state', JSON.stringify(state));
        });
      });
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
    this.store.dispatch(RouterAction.loginOpen());
    this.store.dispatch(ConversationAction.leaveChat());
    this.init();
    this.expandChat();
  }

  /**
   * LocalConfig
   */
  private initConfigLocal() {
    const reviver = (key, value) => {
      if (typeof value === 'string'
        && value.indexOf('function ') === 0) {
        const functionTemplate = `(${value})`;
        return eval(functionTemplate);
      }
      return value;
    };
    const setting = JSON.parse(this.setting, reviver);
    this.generateConfig(setting);
  }

  /**
   * Remote config
   */
  private initConfigRemote() {
    this.configService.getConfig(this.did).subscribe(resp => {
      resp = JSON.parse('{ \n' +
        '   "agent_name_enabled":false,\n' +
        '   "bg_menu":"#1f1f1f",\n' +
        '   "button_enabled":true,\n' +
        '   "button_login_bg":"#c1012a",\n' +
        '   "button_login_color":"white",\n' +
        '   "caption_subtitle":"Estaremos gustosos de atender tus dudasconsultas.",\n' +
        '   "caption_subtitle_color":"#424243",\n' +
        '   "caption_title":"Inicia una conversación",\n' +
        '   "caption_title_color":"#424243",\n' +
        '   "field_font_color":"#424243",\n' +
        '   "geo_active":true,\n' +
        '   "header_background_color":"#c1012a",\n' +
        '   "header_font_color":"#ffffff",\n' +
        '   "header_status":"En linea",\n' +
        '   "header_text":"AFP Habitat",\n' +
        '   "init_button_prefer":[ \n' +
        '      { \n' +
        '         "button_bg":"#c1012a",\n' +
        '         "button_color":"#ffffff",\n' +
        '         "button_enabled":true,\n' +
        '         "button_login_field":[ \n' +
        '            { \n' +
        '               "label":"Nombre",\n' +
        '               "placeholder":"Ingrese su nombre",\n' +
        '               "required":true\n' +
        '            },\n' +
        '           { \n' +
        '               "label":"(DNI o Carnet de extrangeria) o RUC",\n' +
        '               "placeholder":"CD/DNI",\n' +
        '               "required":true\n' +
        '            }\n' +
        '         ],\n' +
        '         "button_text":"Personas"\n' +
        '      },\n' +
        '      { \n' +
        '         "button_bg":"#c1012a",\n' +
        '         "button_color":"#ffffff",\n' +
        '         "button_enabled":true,\n' +
        '         "button_login_field":[ \n' +
        '            { \n' +
        '               "label":"Nombre",\n' +
        '               "placeholder":"Ingrese el nombre de la empresa",\n' +
        '               "required":true,\n' +
        '               "min": {"value": 3, "message":"Mensaje de prueba de min value 3"},\n' +
        '               "max": {"value": 30, "message":"Mensaje de prueba de max value 30"},\n' +
        '               "defaultValidation": ["text"]\n' +
        '            },\n' +
        '            { \n' +
        '               "label":"Ruc",\n' +
        '               "placeholder":"Ingrese el RUC de la empresa",\n' +
        '               "required":true,\n' +
        '               "min": {"value": 3, "message":"Mensaje de prueba de min value 3"},\n' +
        '               "max": {"value": 30, "message":"Mensaje de prueba de max value 30"},\n' +
        '               "defaultValidation": ["rut"]\n' +
        '            }\n' +
        '         ],\n' +
        '         "button_text":"Empresa"\n' +
        '      }\n' +
        '   ],\n' +
        '   "locale":"es",\n' +
        '   "login_text":"Iniciar sesión",\n' +
        '   "logo":"https://media.licdn.com/dms/image/C4D0BAQGLbj7ukxdRbQ/company-logo_200_200/0?e=2159024400&v=beta&t=5kKwP6K_Bd89lEHYa57va1-T3EgbBri-eYLGrN26h7g",\n' +
        '   "message_placeholder":"Escriba un mensaje...",\n' +
        '   "preserve_history":true,\n' +
        '   "send_color":"#cb1e74",\n' +
        '   "subtitle_color":"#ffffff",\n' +
        '   "team_enabled":false,\n' +
        '   "user_field":[ \n' +
        '      "(DNI o Carnet de extrangeria) o RUC",\n' +
        '      "Ruc"\n' +
        '   ],\n' +
        '   "name_field":[ \n' +
        '      "Nombre"\n' +
        '   ],\n' +
        '   "welcome_color":"#ffffff",\n' +
        '   "welcome_text":"Bienvenido al chat de AFP Habitat"\n' +
        '}');
      this.generateConfig(resp);
    });
  }

  private generateConfig(setting: any) {
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
      question: setting.question
    };
    this.configInput(setting);
    this.store.dispatch(ConfigAction.loadConfig({payload: this.configUi}));
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  private configInput(setting: any) {
    if (setting.init_button_prefer !== undefined && setting.init_button_prefer !== null) {
      const buttonConfigLogin: ButtonOptionUiModel[] = [];
      setting.init_button_prefer.forEach(button => {
        const obj: ButtonOptionUiModel = {
          colorButtonBg: `linear-gradient(140deg, ${button.button_bg} 40%, #000 200%)`,
          colorText: button.button_color,
          label: button.button_text,
          enabled: button.button_enabled
        };
        const formInput: InputUiModel[] = [];
        button.button_login_field.forEach(row => {
          formInput.push(this.assignmentInput(row, setting));
        });
        obj.input = formInput;
        buttonConfigLogin.push(obj);
      });
      this.configUi.buttonPrefer = buttonConfigLogin;
      // this.store.dispatch(RouterAction.initFirstButton());
      //this.store.dispatch(RouterAction.buttonLogin());
      //TODO Temp para probar nueva pagina
      //this.store.dispatch(RouterAction.configOpen());
      this.store.dispatch(RouterAction.finish());
    } else {
      const formInput: InputUiModel[] = [];
      setting.login_fields.forEach(row => {
        formInput.push(this.assignmentInput(row, setting));
      });
      this.configUi.input = formInput;
      this.store.dispatch(RouterAction.initFirstLogin());
      this.store.dispatch(RouterAction.loginOpen());
      //TODO Temp para probar nueva pagina
      this.store.dispatch(RouterAction.configOpen());
    }
  }

  private assignmentInput(row: any, setting: any): InputUiModel {
    const input: InputUiModel = {};
    input.fontColor = setting.field_font_color;
    if (typeof row === 'string') {
      if (setting.user_field instanceof Array) {
        setting.user_field.forEach(field => {
          if (row === field) input.userField = true;
        });
      } else {
        if (row === setting.user_field) input.userField = true;
      }
      if (setting.user_name instanceof Array) {
        setting.user_name.forEach(field => {
          if (row === field) input.nameField = true;
        });
      } else {
        if (row === setting.name_field) input.nameField = true;
      }
      input.label = row;
      input.required = false;
      input.placeholder = row;
      input.soloTextAndNumber = false;
      input.soloNumber = false;
      input.soloText = false;
      input.defaultValidation = [];
    } else {
      if (setting.user_field instanceof Array) {
        setting.user_field.forEach(field => {
          if (row.label === field) input.userField = true;
        });
      } else {
        if (row.label === setting.user_field) input.userField = true;
      }
      if (setting.name_field instanceof Array) {
        setting.name_field.forEach(field => {
          if (row.label === field) input.nameField = true;
        });
      } else {
        if (row.label === setting.name_field) input.nameField = true;
      }
      input.label = row.label;
      input.required = (row.required === undefined) ? false : row.required;
      input.choices = row.choices;
      input.validation = row.validation;
      input.placeholder = (row.placeholder === undefined || row.placeholder === null) ? row.label : row.placeholder;
      input.defaultValidation = (row.defaultValidation === undefined || row.defaultValidation === null) ? [] : row.defaultValidation
      const typeText = (row.type === undefined || row.type === null) ? null : row.type;
      switch (typeText) {
        case 'text': {
          input.soloText = true;
          break;
        }
        case 'number': {
          input.soloNumber = true;
          break;
        }
        case 'text_number': {
          input.soloTextAndNumber = true;
          break;
        }
        default: {
          input.soloTextAndNumber = false;
          input.soloNumber = false;
          input.soloText = false;
        }
      }
    }
    return input;
  }
}
