import { loginInitialState, LoginState } from './login.state';
import {
  askUpdatePassword,
  askUpdatePasswordFail,
  askUpdatePasswordSuccess,
  googleLogin,
  googleLoginFail,
  googleLoginSuccess,
  login,
  loginFail,
  loginSuccess,
  loginWait,
  setSpinnerEnable,
  setToken, updatePassword, updatePasswordFail, updatePasswordSuccess,
} from './login.actions';
import { Action, createReducer, on } from '@ngrx/store';

const createLoginReducer = createReducer(
  loginInitialState,
  on(login, (state, {}) => ({...state, spinnerEnable: true})),
  on(loginSuccess, setToken, (state, {token}) => ({...state, token, spinnerEnable: false})),
  on(loginFail, (state, {error}) => ({...state, error, spinnerEnable: false})),
  on(googleLogin, (state, {}) => ({...state, spinnerEnable: true})),
  on(googleLoginSuccess, setToken, (state, {token}) => ({...state, token, spinnerEnable: false})),
  on(googleLoginFail, (state, {error}) => ({...state, error, spinnerEnable: false})),
  on(loginWait, setSpinnerEnable, (state) => ({...state, spinnerEnable: false})),
  on(askUpdatePassword, (state, {}) => ({...state})),
  on(askUpdatePasswordSuccess, (state, {username}) => ({...state, username})),
  on(askUpdatePasswordFail, (state, {error}) => ({...state, error})),
  on(updatePassword, (state, {}) => ({...state})),
  on(updatePasswordSuccess, (state, {success}) => ({...state, success})),
  on(updatePasswordFail, (state, {error}) => ({...state, error})),
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return createLoginReducer(state, action);
}
