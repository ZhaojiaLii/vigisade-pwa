import { createAction, props } from '@ngrx/store';
import { LoginPayload } from '../interfaces/login-payload.interface';

export const login = createAction(
  '[Login] Login',
  props<LoginPayload>(),
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ token: string, spinnerEnable: boolean }>(),
);

export const loginFail = createAction(
  '[Login] Login fail',
  props<{ error: any, spinnerEnable: boolean}>(),
);

export const setToken = createAction(
  '[Login] Set Token',
  props<{ token: string, spinnerEnable: boolean}>(),
);

export const setSpinnerEnable = createAction(
  '[SpinnerEnable] Set SpinnerEnable',
  props<{ spinnerEnable: boolean }>(),
);
