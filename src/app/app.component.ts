import {Component, Input, OnInit} from '@angular/core';
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
import {ButtonOptionUiModel} from './models/ui-model/button-option.ui-model';
import {ConfigService} from './services/config.service';
import {SocialMediaUiModel} from "./models/ui-model/social-media.ui-model";
import {InitTypeEnum} from "./models/utils/init-type.enum";
import {FinishUiModel} from "./models/ui-model/finish.ui-model";


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
              private readonly configService: ConfigService) {
    this.store.pipe(select(InitWebChatSelector.selectIsTrigger)).subscribe(resp => this.triggerHidden = resp);
    this.store.pipe(select(InitWebChatSelector.selectIsOpen)).subscribe(resp => this.toggles = resp);
  }

  ngOnInit(): void {
    console.log('Version: 1.0.2');
    if (this.remote) {
      this.initConfigRemote();
    } else {
      this.initConfigLocal();
    }
    this.init();
  }

  private getLocalStorage () {
    const stateLocal = localStorage.getItem('state');
    if (stateLocal !== null) {
      const state = JSON.parse(stateLocal);
      this.configUi.initType =  state.config.config.initType;
    }
  }

  @Input() public init = () => {
    this.store.pipe(select(ConfigSelector.selectConfig),
      delay(1000),
      filter(fill => ((fill.preserveHistory !== undefined || fill.preserveHistory !== null)) && fill.preserveHistory)
    )
      .subscribe(resp => {
        this.store.subscribe(state => {
          localStorage.setItem('state', JSON.stringify(state));
        });
      });
    this.store.dispatch(InitWebChatAction.triggerInit({payload: true}));
  };
  @Input() public toggle = () => {
    this.store.dispatch(InitWebChatAction.triggerInit({payload: true}));
    this.store.dispatch(InitWebChatAction.open({payload: !this.toggles}));

  };
  @Input() public visibilityWC = (show: boolean) => {
    this.store.dispatch(InitWebChatAction.triggerInit({payload: show}));
    this.store.dispatch(InitWebChatAction.open({payload: show}));
  };
  @Input() public expandChat = () => {
    this.store.dispatch(InitWebChatAction.triggerInit({payload: true}));
    this.store.dispatch(InitWebChatAction.open({payload: true}));
  };


  @Input() public collapseChat = () => {
    this.store.dispatch(InitWebChatAction.triggerInit({payload: true}));
    this.store.dispatch(InitWebChatAction.open({payload: false}));
  };
  @Input() public logout = () => {
    this.store.dispatch(ConversationAction.leaveChat());
  };
  @Input() public startChat = (data: any) => {
    this.assignamentTypeInitWidget(InitTypeEnum.START_CHAT);
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
  };

  @Input() public startChatWithWelcome = (data: any) => {
    this.assignamentTypeInitWidget(InitTypeEnum.START_CHAT_WITH_WELCOME);
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
    this.store.dispatch(LoginAction.loginTemp({payload: message}));
    this.expandChat();
  };

  @Input() public initChatWithAgent = (data: any) => {
    if(data != null && !isNaN(data)) {
      this.store.dispatch(InitWebChatAction.loadIdUser({payload: data}));
    }
      this.store.dispatch(RouterAction.loginOpen());
      this.store.dispatch(ConversationAction.leaveChat());
      this.init();
      this.expandChat();

  };

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
      resp = JSON.parse('{\n' +
        '  "header_text": "Toulouse Lautrec",\n' +
        '  "header_status": "En linea",\n' +
        '  "agent_name_enabled": true,\n' +
        '  "team_enabled": true,\n' +
        '  "logo": "https://cdn.chattigo.com/assets/img/isotipo-grey.svg",\n' +
        '  "caption_title": "Inicia una conversación",\n' +
        '  "caption_title_color": "#424243",\n' +
        '  "caption_subtitle": "Estaremos gustosos de atender tus dudas o consultas.",\n' +
        '  "caption_subtitle_color": "#424243",\n' +
        '  "welcome_text": "Bienvenido al Chat de Toulouse Lautrec",\n' +
        '  "message_placeholder": "Escriba un mensaje...",\n' +
        '  "send_color": "#cb1e74",\n' +
        '  "header_background_color": "#ef426f",\n' +
        '  "header_background_gradient": "#440099",\n' +
        '  "header_font_color": "#ffffff",\n' +
        '  "locale": "es",\n' +
        '  "user_field": [\n' +
        '    "Teléfono"\n' +
        '  ],\n' +
        '  "name_field": [\n' +
        '    "Nombre"\n' +
        '  ],\n' +
        '  "button_enabled": true,\n' +
        '  "button_login_color": "white",\n' +
        '  "button_login_bg": "#ef426f",\n' +
        '  "login_text": "Iniciar sesión",\n' +
        '  "field_font_color": "#424243",\n' +
        '  "welcome_color": "#ffffff",\n' +
        '  "subtitle_color": "#ffffff",\n' +
        '  "preserve_history": true,\n' +
        '  "bg_menu": "#1f1f1f",\n' +
        '  "geo_active": true,\n' +
        '  "init_button_prefer": [\n' +
        '    {\n' +
        '      "button_bg": "#ef426f",\n' +
        '      "button_color": "#ffffff",\n' +
        '      "button_text": "Carreras Profesionales",\n' +
        '      "button_enabled": true,\n' +
        '      "button_login_field": [\n' +
        '        {\n' +
        '          "label": "Nombre",\n' +
        '          "placeholder": "Ingresa tu nombre",\n' +
        '          "required": true,\n' +
        '          "type": "text"\n' +
        '        },\n' +
        '        {\n' +
        '          "label": "Teléfono",\n' +
        '          "placeholder": "Ingresa tu teléfono",\n' +
        '          "required": true,\n' +
        '          "type": "number",\n' +
        '          "max": 10\n' +
        '        },\n' +
        '        {\n' +
        '          "label": "Email",\n' +
        '          "placeholder": "Ingresa tu correo",\n' +
        '          "required": true,\n' +
        '          "defaultValidation": [\n' +
        '            "email"\n' +
        '          ]\n' +
        '        },\n' +
        '        {\n' +
        '          "label": "DNI",\n' +
        '          "placeholder": "Ingresa tu DNI",\n' +
        '          "required": true,\n' +
        '          "type": "number"\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "button_bg": "#ef426f",\n' +
        '      "button_color": "#ffffff",\n' +
        '      "button_text": "Cursos y Diplomados",\n' +
        '      "button_enabled": true,\n' +
        '      "button_login_field": [\n' +
        '        {\n' +
        '          "label": "Nombre",\n' +
        '          "placeholder": "Ingresa el nombre",\n' +
        '          "required": true,\n' +
        '          "type": "text"\n' +
        '        },\n' +
        '        {\n' +
        '          "label": "Teléfono",\n' +
        '          "placeholder": "Ingresa tu número de teléfono",\n' +
        '          "required": true,\n' +
        '          "type": "number",\n' +
        '          "max": 11\n' +
        '        },\n' +
        '        {\n' +
        '          "label": "Email",\n' +
        '          "placeholder": "Ingrese su correo",\n' +
        '          "required": true,\n' +
        '          "defaultValidation": [\n' +
        '            "email"\n' +
        '          ]\n' +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      "button_bg": "#ef426f",\n' +
        '      "button_color": "#ffffff",\n' +
        '      "button_text": "Atención al Estudiante",\n' +
        '      "button_enabled": true,\n' +
        '      "button_login_field": [\n' +
        '        {\n' +
        '          "label": "Nombre",\n' +
        '          "placeholder": "Ingresa el nombre",\n' +
        '          "required": true,\n' +
        '          "type": "text"\n' +
        '        },\n' +
        '        {\n' +
        '          "label": "Teléfono",\n' +
        '          "placeholder": "Ingresa tu número de teléfono",\n' +
        '          "required": true,\n' +
        '          "type": "number",\n' +
        '          "max": 11\n' +
        '        },\n' +
        '        {\n' +
        '          "label": "Email",\n' +
        '          "placeholder": "Ingrese su correo",\n' +
        '          "required": true,\n' +
        '          "defaultValidation": [\n' +
        '            "email"\n' +
        '          ]\n' +
        '        },\n' +
        '        {\n' +
        '          "label": "Mensaje",\n' +
        '          "placeholder": "Ingrese su primer mensaje mensaje",\n' +
        '          "required": true\n' +
        '        }\n' +
        '      ]\n' +
        '    }\n' +
        '  ],\n' +
        '  "trigger_color": "#440099",\n' +
        '  "trigger_gradient": "#ef426f",\n' +
        '  "finish": {\n' +
        '    "header": {\n' +
        '      "title": "Gracias por contactarte con nosotros",\n' +
        '      "subtitle": "Mantente en contacto a través de nuestra redes sociales",\n' +
        '      "colorTitle": "#ffffff",\n' +
        '      "colorSubtitle": "#ffffff",\n' +
        '      "logo": "https://cdn.chattigo.com/assets/img/isotipo-grey.svg"\n' +
        '    },\n' +
        '    "socialMedia": [\n' +
        '      {\n' +
        '        "social": "FACEBOOK",\n' +
        '        "url": "https://google.com"\n' +
        '      },\n' +
        '      {\n' +
        '        "social": "TWITTER",\n' +
        '        "url": "https://google.com"\n' +
        '      }\n' +
        '    ],\n' +
        '    "content": {\n' +
        '      "mainText": "Evalúa la conversación",\n' +
        '      "star": false,\n' +
        '      "startText": "Calificaste la atención con 4 estrellas"\n' +
        '    },\n' +
        '    "button": {\n' +
        '      "text": "Volver Al Inicio",\n' +
        '      "boderColor": "#440099"\n' +
        '    }\n' +
        '  }\n' +
        '}');
      this.generateConfig(resp);
    });
  }


  private generateConfig(setting: any) {
    let degTriggerGradient = [100, 10, 100];
    if(setting.trigger_gradient === null || setting.trigger_gradient === '' || setting.trigger_gradient === undefined) degTriggerGradient = [140, 40, 200];
    let degHeaderGradient = [140, 10, 100];
    if(setting.header_background_gradient === null || setting.header_background_gradient === '' ||  setting.header_background_gradient === undefined) degHeaderGradient = [140, 40, 200];
    setting.trigger_gradient = (setting.trigger_gradient === null || setting.trigger_gradient === '' || setting.trigger_gradient === undefined) ? '#000' : setting.trigger_gradient;
    setting.header_background_gradient = (setting.header_background_gradient === null || setting.header_background_gradient === '' || setting.header_background_gradient === undefined) ? '#000' : setting.header_background_gradient;
    this.configUi = {
      did: this.did,
      showTeam: setting.team_enabled,
      trigger: {
        src: setting.trigger_image,
        // tslint:disable-next-line:max-line-length
        backgroundColor: (setting.trigger_color === undefined || setting.trigger_color === null || setting.trigger_color === '') ? `linear-gradient(140deg, ${setting.button_login_bg} 40%, #000 200%)` :  `linear-gradient(${degTriggerGradient[0]}deg, ${setting.trigger_color} ${degTriggerGradient[1]}%, ${setting.trigger_gradient} ${degTriggerGradient[2]}%)`,
      },
      button: {
        // tslint:disable-next-line:max-line-length
        enabled: (setting.button_enabled === undefined || setting.button_enabled == null || setting.button_enabled === '') ? true : setting.button_enabled,
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
        headerBackgroundColor: `url(https://cdn.chattigo.com/assets/img/logo-wing.svg), linear-gradient(${degTriggerGradient[0]}deg, ${setting.header_background_color} ${degTriggerGradient[1]}%, ${setting.header_background_gradient} ${degTriggerGradient[2]}%)`,
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
      question: setting.question,
    };
    this.assignametFinish(setting);
    this.configInput(setting);
    this.getLocalStorage();
    this.store.dispatch(ConfigAction.loadConfig({payload: this.configUi}));
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
      this.store.dispatch(RouterAction.initFirstButton());
      this.store.dispatch(RouterAction.buttonLogin());
      //TODO Temp para probar nueva pagina
      //this.store.dispatch(RouterAction.finish());
    } else {
      const formInput: InputUiModel[] = [];
      if(setting.login_fields != undefined) {
        setting.login_fields.forEach(row => {
          formInput.push(this.assignmentInput(row, setting));
        });
      }
      this.configUi.input = formInput;
      this.store.dispatch(RouterAction.initFirstLogin());
      this.store.dispatch(RouterAction.loginOpen());
      //TODO Temp para probar nueva pagina
      //this.store.dispatch(RouterAction.finish());
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
      input.min = row.min;
      input.max = row.max;
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

  private createMediaSocial (setting: any) {
    const socialMediaList: SocialMediaUiModel[] = [];
    if(setting.finish != undefined && setting.finish.socialMedia.length > 0) {
      setting.finish.socialMedia.forEach(media => {
        const socialMediaObj: SocialMediaUiModel = {
          icon: `icon-social-${media.social.toLowerCase()}`,
          url: media.url
        };
        socialMediaList.push(socialMediaObj);
      });
    }
    this.configUi.finish.socialMedia = socialMediaList;

  }

  private defaultFinishObject (setting: any) {
    setting.finish = {
      header: {
        title: null,
        subtitle: null,
        logo: null,
        colorTitle: null,
        colorSubtitle: null,

      },
      content: {
        mainText: null,
        star: null,
      },
      button: {
        borderColor: null,
        text: null,
      },
      socialMedia: []
    };
    return setting;
  }

  private assignametFinish (setting: any) {
    if(setting.finish === undefined) {
      setting = this.defaultFinishObject(setting);
    }
    this.configUi.finish = {
      header: {
        title: setting.finish.header.title || 'Gracias por contactarte con nosotros' ,
        subtitle: setting.finish.header.subtitle || 'Mantente en contacto a través de nuestras redes sociales',
        logo: setting.finish.header.logo || setting.logo,
        titleColor: setting.finish.header.colorTitle || setting.welcome_color,
        subtitleColor: setting.finish.header.colorSubtitle || setting.subtitle_color
      },
      content: {
        buttonBorderColor: setting.finish.button.borderColor || setting.button_login_bg,
        buttonText: setting.finish.button.text || 'Volver Al Inicio',
        titleMessage: setting.finish.content.mainText || 'Evalúa la conversación',
        star: setting.finish.content.star || false
      }
    };
    this.createMediaSocial(setting);
  }


  private assignamentTypeInitWidget(init: InitTypeEnum) {
    this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => {
      resp.initType = init;
      this.store.dispatch(ConfigAction.initType({payload: resp}));
    })
  }
}
