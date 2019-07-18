import { User } from '../interfaces/user';
import { createAction, props } from '@ngrx/store';
import { UpdateUser } from '../interfaces/updateUser.interface';

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

export const updateUser = createAction(
  '[UpdateUser] Update user data',
  props<{updateUserPayload: UpdateUser}>(),
);

export const updateUserSuccess = createAction(
  '[UpdateUser] Update user data Success',
  props<{status: string}>(),
);

export const updateUserFail = createAction(
  '[GetUser] Update User data Fail',
  props<{ error: any }>(),
);
