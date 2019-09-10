import {Component, HostListener, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigAction, RootStoreState, RouterSelector} from './store';
import {ConfigUiModel} from './models/ui-model/config.ui-model';
import {InputUiModel} from './models/ui-model/input.ui-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loginOpen = true;
  public widgetOpen = false;
  public configOpen = false;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit(): void {
    // this.store.dispatch(RouterAction.loginOpen);

    // El join se hace con el userId
    // El mscdn es el USERID
    // El id es ramdom
    // El contenido son todos los parametros como primer mensaje
    this.store.pipe(select(RouterSelector.selectLoginOpen)).subscribe(resp => this.loginOpen = resp);
    this.store.pipe(select(RouterSelector.selectWidgetOpen)).subscribe(resp => this.widgetOpen = resp);
    this.store.pipe(select(RouterSelector.selectConfigOpen)).subscribe(resp => this.configOpen = resp);
    const setting: any = {
      header_text: 'Web Chat', // Configure
      header_status: 'En linea', // Configure
      agent_name_enabled: true, // TODO NEW
      // TODO NEW
      // logo: 'https://cdn.chattigo.com/assets/img/isotipo-grey.svg', // Configure
      logo: 'https://www.santotomas.cl/wp-content/themes/institucional/images/logos/logo-st.svg',
      // TODO NEW
      caption_title: 'Inicia una conversación', // Configure
      // TODO NEW
      caption_title_color: '#424243', // Configure
      // TODO NEW
      caption_subtitle: 'El equipo usualmente responde en pocas horas.', // Configure
      // TODO NEW
      caption_subtitle_color: '#424243', // Configure
      // Configure
      // tslint:disable-next-line:max-line-length
      welcome_text: 'Bienvenido al servicio de web chat de nuestra página.',
      subtitle_text: 'SUBTITULO DE PRUEBA', // Configure
      message_placeholder: 'Escriba un mensaje...',
      // Configure
      login_fields: [
        'Nombre',
        /* {
          label: 'Email',
          // TODO NEW
          placeholder: 'Ingrese su correo',
          required: false,
          validation: (value) => {
            // tslint:disable-next-line:max-line-length
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(value)) {
              throw new Error('El valor de Email debe ser un correo electrónico válido');
            }
          }
        },
        {label: 'RUT', required: true} */
      ],
      send_color: '#cb1e74',
      header_background_color: '#004f45',  // Configure
      header_font_color: '#ffffff',  // Configure
      locale: 'es',
      name_field: 'Nombre', // Configure
      user_field: 'RUT', // Configure
      // TODO NEW
      button_enabled: true, // Configure
      button_login_color: 'white', // Configure
      button_login_bg: '#004f45', // Configure
      login_text: 'Iniciar sesión', // Configure
      field_font_color: '#424243', // Configure
      welcome_color: '#ffffff', // Configure
      subtitle_color: '#ffffff', // Configure
      preserve_history: false, // Configure
      bg_menu: '#1f1f1f', // Configure
      geo_active: true, // Configure
    };

    const configUi: ConfigUiModel = {
      button: {
        enabled: setting.button_enabled,
        label: setting.login_text,
        // colorText: setting.button_login_color,
        colorText: `${setting.button_login_color}`,
        // colorButtonBg: setting.button_login_bg
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
        linkColor: `#004f45`,
      },
      preserveHistory: setting.preserve_history,
      geoActive: setting.geo_active,
      bgMenu: setting.bg_menu
    };
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

        input.validation = row.validation;
        input.placeholder = (row.placeholder === undefined || row.placeholder === null) ? row.label : row.placeholder;
      }
      formInput.push(input);
    });
    configUi.input = formInput;
    this.store.dispatch(ConfigAction.loadConfig({payload: configUi}));
  }


}
