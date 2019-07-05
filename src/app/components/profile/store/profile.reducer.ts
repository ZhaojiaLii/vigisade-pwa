import { profileInitialState, ProfileState } from './profile.state';
import { getUser, getUserFail, getUserSuccess } from './profile.action';
import { Action, createReducer, on } from '@ngrx/store';

export const createProfileReducer = createReducer(
  profileInitialState,
  on(getUser, state => state),
  on(getUserSuccess, (state, {user}) => ({...state, user})),
  on(getUserFail, (state => state)),
);

export function profileReducer(state: ProfileState | undefined, action: Action) {
  return createProfileReducer(state, action);
}
