import { loginInitialState, LoginState } from './login.state';
import {
  googleLogin,
  googleLoginFail,
  googleLoginSuccess,
  login,
  loginFail,
  loginSuccess,
  setSpinnerEnable,
  setToken
} from './login.actions';
import { Action, createReducer, on } from '@ngrx/store';

const createLoginReducer = createReducer(
  loginInitialState,
  on(login, setSpinnerEnable, (state, {}) => ({...state, spinnerEnable: true})),
  on(loginSuccess, setToken, (state, {token}) => ({...state, token, spinnerEnable: false})),
  on(loginFail, (state, {error}) => ({...state, error, spinnerEnable: false})),
  on(googleLogin, (state, {}) => ({...state, spinnerEnable: true})),
  on(googleLoginSuccess, setToken, (state, {token}) => ({...state, token, spinnerEnable: false})),
  on(googleLoginFail, (state, {error}) => ({...state, error, spinnerEnable: false})),
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return createLoginReducer(state, action);
}
