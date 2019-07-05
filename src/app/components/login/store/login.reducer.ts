import { loginInitialState, LoginState } from './login.state';
import { login, loginFail, loginSuccess } from './login.actions';
import { Action, createReducer, on } from '@ngrx/store';

const createLoginReducer = createReducer(
  loginInitialState,
  on(login, state => state),
  on(loginSuccess, (state, {token}) => ({...state, token})),
  on(loginFail, state => state),
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return createLoginReducer(state, action);
}
