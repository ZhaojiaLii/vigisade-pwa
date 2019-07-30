import { createAction, props } from '@ngrx/store';
import { ResultDraft } from '../../components/visit/interfaces/result-draft.interface';

export const setResultDraft = createAction(
  '[Survey] Set result draft',
  props<{draft: ResultDraft}>(),
);
