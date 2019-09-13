export interface State {
  isLoading: boolean;
  isLoader: boolean;
  open: boolean;
  trigger: boolean;
  error?: any;
}


export const initialState: State = {
  isLoader: false,
  isLoading: false,
  open: false,
  trigger: false,
};


