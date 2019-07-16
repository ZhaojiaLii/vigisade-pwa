import { createAction, props } from '@ngrx/store';
import { CreateDangerousSituation } from '../interfaces/create-dangerous-situation.interface';

export const createDangerousSituation = createAction(
  '[dangerous] Create Dangerous Situation',
  props<{ dangerousSituation: CreateDangerousSituation }>(),
);

export const createDangerousSituationSuccess = createAction(
  '[dangerous] Create Dangerous Situation Success',
);

export const createDangerousSituationFail = createAction(
  '[dangerous] Create Dangerous Situation Fail',
  props<{ error: any }>(),
);
