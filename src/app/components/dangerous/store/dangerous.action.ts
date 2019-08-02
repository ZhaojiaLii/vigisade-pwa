import { createAction, props } from '@ngrx/store';
import { DangerousSituationPayload } from '../interfaces/create/dangerous-situation.interface';

export const createDangerousSituation = createAction(
  '[dangerous] Create Dangerous Situation',
  props<{ dangerousSituation: DangerousSituationPayload }>(),
);

export const createDangerousSituationSuccess = createAction(
  '[dangerous] Create Dangerous Situation Success',
);

export const createDangerousSituationFail = createAction(
  '[dangerous] Create Dangerous Situation Fail',
  props<{ error: any; dangerousSituation: DangerousSituationPayload; }>(),
);

export const setLoadingState = createAction(
  '[dangerous] Set loading state',
  props<{ loading: boolean }>(),
);
