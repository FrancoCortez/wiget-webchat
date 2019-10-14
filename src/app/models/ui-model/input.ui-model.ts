export interface InputUiModel {
  id?: string;
  label?: string;
  validation?: any;
  placeholder?: string;
  required?: boolean;
  userField?: boolean;
  nameField?: boolean;
  fontColor?: string;
  errorText?: string[];
  choices?: string[];
  soloText?: boolean;
  soloNumber?: boolean;
  soloTextAndNumber?: boolean;
  max?: any;
  min?: any;
  defaultValidation?: any[];
}
