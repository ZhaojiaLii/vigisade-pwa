import { createAction, props } from '@ngrx/store';
import { DangerousSituationPayload } from '../interfaces/create/dangerous-situation.interface';
import { DangerousSituationHistory } from '../interfaces/dangerous-situation-history.interface';
import { DangerousSearch } from '../../history-dangerous/interfaces/dangerous-search.interface';

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

export const loadHistoryDangerous = createAction(
  '[dangerous] Load History of Situation Dangerous',
);

export const loadHistoryDangerousSuccess = createAction(
  '[dangerous] Load History of Situation Dangerous Success',
  props<{ dangerousHistory: DangerousSituationHistory[] }>(),
);

export const loadHistoryDangerousFail = createAction(
  '[dangerous] Load History of Situation Dangerous Failed',
  props<{ error: any }>(),
);

export const setDangerousSearch = createAction(
  '[dangerous] Set a dangerous situation search',
  props<{searchParams: DangerousSearch}>(),
);
