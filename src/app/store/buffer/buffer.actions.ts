import { createAction, props } from '@ngrx/store';
import { Result } from '../../components/survey/interfaces/results/result.interface';

export const delayResultCreation = createAction(
  '[Buffer] Delay result creation',
  props<{ result: Result }>(),
);

export const addResultToBuffer = createAction(
  '[Buffer] Add result to buffer',
  props<{ result: Result }>(),
);
