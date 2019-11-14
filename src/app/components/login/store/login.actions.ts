import { createAction, props } from '@ngrx/store';
import { LoginPayload } from '../interfaces/login-payload.interface';
import { PasswordUpdate } from '../interfaces/passwordUpdate.interface';

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

export const loginWait = createAction(
  '[Login] Login wait',
);

export const setToken = createAction(
  '[Login] Set Token',
  props<{ token: string, spinnerEnable: boolean}>(),
);

export const setSpinnerEnable = createAction(
  '[SpinnerEnable] Set SpinnerEnable',
  props<{ spinnerEnable: boolean }>(),
);

export const googleLogin = createAction(
  '[Google account login] Login with Google',
  props<LoginPayload>(),
);

export const googleLoginSuccess = createAction(
  '[Google account login] Login with Google Succeed',
  props<{ token: string, spinnerEnable: boolean }>(),
);

export const googleLoginFail = createAction(
  '[Google account login] Login with Google Fail',
  props<{ error: any, spinnerEnable: boolean}>(),
);

export const askUpdatePassword = createAction(
  '[Password] ask update password',
  props<PasswordUpdate>(),
);

export const askUpdatePasswordSuccess = createAction(
  '[Password] ask update password success',
);

export const askUpdatePasswordFail = createAction(
  '[Password] ask update password fail',
  props<{error: any}>(),
);
