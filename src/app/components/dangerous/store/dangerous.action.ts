import { createAction, props } from '@ngrx/store';
import { DangerousSituation } from '../interfaces/dangerous-situation.interface';

export const createDangerousSituation = createAction(
  '[dangerous] Create Dangerous Situation',
  props<{ dangerousSituation: DangerousSituation }>(),
);

export const createDangerousSituationSuccess = createAction(
  '[dangerous] Create Dangerous Situation Success',
);

export const createDangerousSituationFail = createAction(
  '[dangerous] Create Dangerous Situation Fail',
  props<{ error: any }>(),
);
