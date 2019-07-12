import { createAction, props } from '@ngrx/store';
import { LoginPayload } from '../interfaces/login-payload.interface';

export const login = createAction(
  '[Login] Login',
  props<LoginPayload>(),
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ token: string }>(),
);

export const loginFail = createAction(
  '[Login] Login fail',
  props<{ error: any }>(),
);

export const setToken = createAction(
  '[Login] Set Token',
  props<{ token: string}>(),
);
