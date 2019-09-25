export interface State {
  login: boolean;
  widget: boolean;
  config: boolean;
}

export const initialState: State = {
  login: true,
  widget: false,
  config: false
};
