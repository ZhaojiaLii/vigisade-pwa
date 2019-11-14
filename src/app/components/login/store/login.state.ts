export interface LoginState {
  token: string | null;
  googleToken: string | null;
  loginError: any;
  spinnerEnable: boolean;
  username: string | null;
}

export const loginInitialState = {
  token: null,
  googleToken: null,
  loginError: null,
  spinnerEnable: false,
  username: null,
};
