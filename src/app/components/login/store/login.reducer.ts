import { loginInitialState } from './login.state';
import { login, loginFail, loginSuccess } from './login.actions';
import { createReducer, on } from '@ngrx/store';

export const loginReducer = createReducer(
  loginInitialState,
  on(login, state => state),
  on(loginSuccess, (state, {token}) => ({...state, token})),
  // on(loginFail, state => ({...state, token: 'test for login'})),
  on(loginFail, state => state),
);
