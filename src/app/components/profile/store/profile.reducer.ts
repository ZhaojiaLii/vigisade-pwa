import { createReducer, on } from '@ngrx/store';
import { profileInitialState } from './profile.state';
import { getUser, getUserFail, getUserSuccess } from './profile.action';


export const profileGetUserReducer = createReducer(
  profileInitialState,
  on(getUser, state => state),
  on(getUserSuccess, state => ({...state, user: state.getUser})),
  on(getUserFail, (state => state)),
);

