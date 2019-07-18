import { createAction, props } from '@ngrx/store';
import { Header } from '../../interfaces/header.interface';
import { DataApi } from '../../interfaces/api/data-api.interface';

export const loadData = createAction('[Data] Load data');

export const loadDataSuccess = createAction(
  '[Data] Load data Success',
  props<{data: DataApi}>(),
);

export const loadDataFail = createAction(
  '[Data] Load data Fail',
  props<{ error: any }>(),
);

export const loadHeader = createAction('[Data] Load Header');

export const loadHeaderSuccess = createAction(
  '[Data] Load Header Success',
  props<{ header: Header }>(),
);

export const loadHeaderFail = createAction(
  '[Data] Load Header Fail',
  props<{ error: any }>(),
);
