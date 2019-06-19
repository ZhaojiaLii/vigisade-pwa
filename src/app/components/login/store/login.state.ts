
export interface LoginState {
    token: string|null;
    loginError: any;
}

export const loginInitialState = {
    token: null,
    loginError: null,
};
