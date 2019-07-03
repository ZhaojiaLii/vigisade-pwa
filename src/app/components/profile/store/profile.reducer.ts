import { profileInitialState } from './profile.state';
import { getUser, getUserFail, getUserSuccess } from './profile.action';
import { createReducer, on } from '@ngrx/store';


export const profileGetUserReducer = createReducer(
  profileInitialState,
  on(getUser, state => state),
  on(getUserSuccess, (state, {user}) => ({...state, user})),
  on(getUserFail, (state => state)),
);

