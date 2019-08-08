import { createAction, props } from '@ngrx/store';
import { ResultDraft } from '../../components/survey/interfaces/results/result-draft.interface';

export const setResultDraft = createAction(
  '[Survey] Set result draft',
  props<{draft: ResultDraft}>(),
);
