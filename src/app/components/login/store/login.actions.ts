import { createAction, props } from '@ngrx/store';
import { LoginPayload } from '../interfaces/login-payload.interface';
import { AskUpdatePassword } from '../interfaces/askUpdatePassword.interface';
import { UpdatePassword } from '../interfaces/updatePassword.interface';

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
  props<AskUpdatePassword>(),
);

export const askUpdatePasswordSuccess = createAction(
  '[Password] ask update password success',
  props<{ username: string }>(),
);

export const askUpdatePasswordFail = createAction(
  '[Password] ask update password fail',
  props<{error: any}>(),
);

export const updatePassword = createAction(
  '[Password] update password',
  props<UpdatePassword>(),
);

export const updatePasswordSuccess = createAction(
  '[Password] update password success',
  props<{success: boolean}>(),
);

export const updatePasswordFail = createAction(
  '[Password] update password fail',
  props<{error: any}>(),
);
