import {InputUiModel} from "./input.ui-model";

export interface ButtonOptionUiModel {
  label?: string;
  enabled?: boolean;
  colorText?: string;
  colorButtonBg?: string;
  input?: InputUiModel[];
}
