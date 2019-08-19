import {ConfigUiModel} from '../../models/ui-model/config.ui-model';

export interface State {
  isLoading: boolean;
  isLoader: boolean;
  config?: ConfigUiModel;
  error?: any;
}


export const initialState: State = {
  isLoader: false,
  isLoading: false,
  config: {
    input: [
      { placeholder: 'Ingrese su Nombre', label: 'Nombre', validation: false, required: true }
    ],
    button: { label: 'Ingresar', enabled: false }
  }
};


