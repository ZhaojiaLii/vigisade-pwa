import { initialProfileState, ProfileState } from './profile.state';
import { loadUser, loadUserFail, loadUserSuccess } from './profile.action';
import { Action, createReducer, on } from '@ngrx/store';

export const createProfileReducer = createReducer(
  initialProfileState,
  on(loadUser, state => state),
  on(loadUserSuccess, (state, {user}) => ({...state, user})),
  on(loadUserFail, (state => state)),
);

export function profileReducer(state: ProfileState | undefined, action: Action) {
  return createProfileReducer(state, action);
}
