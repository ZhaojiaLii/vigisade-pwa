import { createAction, props } from '@ngrx/store';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { HistorySearch } from '../interfaces/history-search.interface';
import { Result } from '../../visit/interfaces/results/result.interface';


export const loadHistory = createAction('[Survey] Load History');
export const loadHistorySuccess = createAction(
  '[Survey] Load History Success',
  props<{history: GetResult}>(),
);
export const loadHistoryFail = createAction(
  '[Survey] Load History Fail',
  props<{error: any}>(),
);

export const setHistorySearch = createAction(
  '[Survey] Set History search',
  props<{searchParams: HistorySearch}>(),
);

export const selectResult = createAction(
  '[Survey] Select a result',
  props<{id: number}>(),
);

export const loadResult = createAction(
  '[Survey] Get One Result',
  props<{id: number}>(),
);

export const loadResultSuccess = createAction(
  '[Survey] Get One Result Success',
  props<{result: Result}>(),
);

export const loadResultFail = createAction(
  '[Survey] Get One Result Fail',
  props<{error: any}>(),
);

export const selectCategory = createAction(
  '[Survey] Select a category for result',
  props<{id: number}>(),
);

export const goToNextCategory = createAction(
  '[History] Go to next category',
);
