
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

/**
 * Gets the Profile GET state.
 */
export const GetUserState = createFeatureSelector<ProfileState>('getUser');

/**
 * Gets the user information
 */

export const getUserInfo = createSelector(
  GetUserState,
  (state: ProfileState) => {
    return state.user;
  }
);

