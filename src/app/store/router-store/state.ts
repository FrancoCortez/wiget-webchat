export interface State {
  login: boolean;
  widget: boolean;
  config: boolean;
  button: boolean;
  finish: boolean;

  firstButton: boolean;
  firstLogin: boolean;
}

export const initialState: State = {
  login: false,
  widget: false,
  config: false,
  button: false,
  finish: false,
  firstButton: false,
  firstLogin: false
};
