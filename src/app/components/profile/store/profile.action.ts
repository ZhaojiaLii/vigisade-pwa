import { createAction, props } from '@ngrx/store';
import { GetUser } from '../interfaces/getUser';

export const getUser = createAction(
  '[GetUser] Gets User data'
);

export const getUserSuccess = createAction(
  '[GetUser] Gets User data Success',
  props<{user: GetUser}>(),
  );

export const getUserFail = createAction(
  '[GetUser] Gets User data Fail',
  props<{error: any}>(),
);
