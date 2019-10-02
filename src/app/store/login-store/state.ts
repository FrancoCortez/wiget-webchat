import {LoginDto} from '../../models/login/login.dto';

export interface State {
  isLoading: boolean;
  isLoader: boolean;
  isLoginState: boolean;
  login?: LoginDto;
  error?: any;
}

export const initialState: State = {
  isLoader: false,
  isLoading: false,
  isLoginState: false,
};