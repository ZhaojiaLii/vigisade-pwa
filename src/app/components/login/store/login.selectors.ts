import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.state';

/**
 * Gets the Login state.
 */
export const getLoginState = createFeatureSelector<LoginState>('login');

/**
 * Gets the authentication token which allow access to all endpoints for 24h.
 */
export const getToken = createSelector(
  getLoginState,
  (state: LoginState) => {
    return state.token;
  },
);

export const getGoogleToken = createSelector(
  getLoginState,
  (state: LoginState) => {
    return state.googleToken;
  },
);

export const getSpinnerEnable = createSelector(
  getLoginState,
  (state: LoginState) => {
    return state.spinnerEnable;
  },
);
