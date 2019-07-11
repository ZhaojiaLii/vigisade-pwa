import { createAction, props } from '@ngrx/store';
import { Direction } from '../../components/shared/interfaces/direction.interface';
import { Area } from '../../components/shared/interfaces/area.interface';
import { Entity } from '../../components/shared/interfaces/entity.interface';
import { Header } from '../../interfaces/header.interface';

export const loadData = createAction('[Data] Load data');

export const loadDataSuccess = createAction(
  '[Data] Load data Success',
  props<{ directions: Direction[], areas: Area[], entities: Entity[] }>(),
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
