import { createAction, props } from '@ngrx/store';
import { CreateDangerous } from '../interfaces/createDangerous.interface';
import { GetDangerousType } from '../interfaces/getDangerousType.interface';

export const createDangerous = createAction(
  '[dangerous] Create Dangerous Situation',
  props<{dangerousPayload: CreateDangerous}>(),
);

export const createDangerousSuccess = createAction(
  '[dangerous] Create Dangerous Situation Success',
  props<{status: number}>(),
);

export const createDangerousFail = createAction(
  '[dangerous] Create Dangerous Situation Fail',
  props<{error: any}>(),
);

export const loadDangerousType = createAction(
  '[dangerous] Get Dangerous Situation Type',
);

export const loadDangerousTypeSuccess = createAction(
  '[dangerous] Get Dangerous Situation Type Success',
  props<{dangerousType: GetDangerousType}>(),
);

export const loadDangerousTypeFail = createAction(
  '[dangerous] Get Dangerous Situation Type Fail',
  props<{error: any}>(),
);
