export interface State {
  login: boolean;
  widget: boolean;
  config: boolean;
  button: boolean;

  firstButton: boolean;
  firstLogin: boolean;
}

export const initialState: State = {
  login: false,
  widget: false,
  config: false,
  button: false,
  firstButton: false,
  firstLogin: false
};
