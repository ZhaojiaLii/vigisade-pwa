import {State} from '../../../store/app.state';
import {createSelector} from '@ngrx/store';
import {LoginState} from './login.state';

/**
 * Gets the Login state.
 */
export const getLoginState = (state: State) => state.login;

/**
 * Gets the authentication token which allow access to all endpoints for 24h.
 */
export const getToken = createSelector(
    getLoginState,
    (state: LoginState) => state.token,
);
