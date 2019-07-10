import { User } from '../interfaces/user';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[GetUser] Gets User data',
);

export const loadUserSuccess = createAction(
  '[GetUser] Gets User data Success',
  props<{ user: User }>(),
);

export const loadUserFail = createAction(
  '[GetUser] Gets User data Fail',
  props<{ error: any }>(),
);
