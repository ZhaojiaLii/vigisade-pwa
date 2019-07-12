import { loginInitialState, LoginState } from './login.state';
import { loginSuccess, setToken } from './login.actions';
import { Action, createReducer, on } from '@ngrx/store';

const createLoginReducer = createReducer(
  loginInitialState,
  on(loginSuccess, setToken, (state, {token}) => ({...state, token})),
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return createLoginReducer(state, action);
}
