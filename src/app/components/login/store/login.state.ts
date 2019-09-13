export interface LoginState {
  token: string | null;
  loginError: any;
  spinnerEnable: boolean;
}

export const loginInitialState = {
  token: null,
  loginError: null,
  spinnerEnable: false,
};
