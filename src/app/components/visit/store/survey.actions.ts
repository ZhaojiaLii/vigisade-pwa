import { createAction, props } from '@ngrx/store';
import { Survey } from '../interfaces/getSurveyInterface/survey.interface';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

/***
 * get survey data (GET: api/survey/)
 */
export const getSurvey = createAction('[Survey] Gets Survey data');

export const getSurveySuccess = createAction(
  '[Survey] Gets survey Success',
  props<{survey: Survey}>(),
);

export const getSurveyFail = createAction(
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
export const getResult = createAction('[Survey] Get One Result');

export const getResultSuccess = createAction(
  '[Survey] Get One Result Success',
  props<{result: GetResult}>(),
);

export const getResultFail = createAction(
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
