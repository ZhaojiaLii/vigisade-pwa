import { initialProfileState, ProfileState } from './profile.state';
import { loadUserSuccess, updateUserSuccess, } from './profile.action';
import { Action, createReducer, on } from '@ngrx/store';

export const createProfileReducer = createReducer(
  initialProfileState,
  on(loadUserSuccess, (state, {user}) => ({...state, user})),
  on(updateUserSuccess, (state, {updatedFields}) => ({
    ...state,
    user: {...state.user, ...updatedFields},
  })),
);

export function profileReducer(state: ProfileState | undefined, action: Action) {
  return createProfileReducer(state, action);
}
