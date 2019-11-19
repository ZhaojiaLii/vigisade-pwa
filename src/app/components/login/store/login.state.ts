export interface LoginState {
  token: string | null;
  googleToken: string | null;
  loginError: any;
  spinnerEnable: boolean;
  username: string | null;
  success: boolean;
}

export const loginInitialState = {
  token: null,
  googleToken: null,
  loginError: null,
  spinnerEnable: false,
  username: null,
  success: false,
};
