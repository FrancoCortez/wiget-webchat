import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ConfigAction, RootStoreState} from './store';
import {ConfigUiModel} from './models/ui-model/config.ui-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit(): void {
    const configUi: ConfigUiModel = {
      button: {
        enabled: false,
        label: 'Ingresar'
      },
      input: [
        {required: true, placeholder: 'Ingrese su nombre', label: 'Nombre', validation: false, id: '1'},
        {required: false, placeholder: 'Ingrese su Correo', label: 'Correo', validation: false, id: '1'},
      ]
    };

    this.store.dispatch(ConfigAction.loadConfig({payload: configUi}));
  }

}
