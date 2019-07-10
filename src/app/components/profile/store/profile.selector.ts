import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

export const getProfileState = createFeatureSelector<ProfileState>('profile');

export const getUser = createSelector(
  getProfileState,
  (state: ProfileState) => state.user,
);

