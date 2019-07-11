import { createAction, props } from '@ngrx/store';
import { Survey } from '../interfaces/survey.interface';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

export const loadSurvey = createAction('[Survey] Load Survey');
export const loadSurveySuccess = createAction(
  '[Survey] Gets survey Success',
  props<{survey: Survey}>(),
);
export const loadSurveyFail = createAction(
  '[Survey] Gets survey Fail',
  props<{error: any}>(),
);

/***
 * get histories(results) from server (GET: api/survey/history)
 */
export const getResults = createAction(
  '[Survey] Get Results',
);

export const getResultsSuccess = createAction(
  '[Survey] Get Results Success',
  props<{results: GetResults}>(),
);

export const getResultsFail = createAction(
  '[Survey] Get Results Fail',
  props<{error: any}>(),
);

/***
 * get one single history(result) detail (GET: api/survey/history/{id})
 */
export const loadResult = createAction(
  '[Survey] Get One Result',
  props<{id: number}>(),
);

export const loadResultSuccess = createAction(
  '[Survey] Get One Result Success',
  props<{result: GetResult}>(),
);

export const loadResultFail = createAction(
  '[Survey] Get One Result Fail',
  props<{error: any}>(),
);

/***
 * create a result data (POST: api/survey/create)
 */
export const createResult = createAction(
    '[Survey] Create a Result',
    props<{createResultPayload: CreateResult}>()
);

export const createResultSuccess = createAction(
  '[Survey] Create a Result Success',
  props<{status: number}>(),
);

export const createResultFail = createAction(
  '[Survey] Create a Result Fail',
  props<{error: any}>(),
);

/***
 * update a result data (POST: api/survey/update)
 */
export const updateResult = createAction(
    '[Survey] Update a Result',
    props<{updateResultPayload: UpdateResult}>()
);

export const updateResultSuccess = createAction(
  '[Survey] Update a Result Success',
  props<{status: number}>(),
);

export const updateResultFail = createAction(
  '[Survey] Update a Result Fail',
  props<{error: any}>(),
);

export const openMenu = createAction(
  '[Menu] Open Menu',
);
