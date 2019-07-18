import { createAction, props } from '@ngrx/store';
import { Survey } from '../interfaces/survey.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

export const loadSurveys = createAction('[Survey] Load Surveys');
export const loadSurveysSuccess = createAction(
  '[Survey] Gets surveys Success',
  props<{surveys: Survey[]}>(),
);
export const loadSurveysFail = createAction(
  '[Survey] Gets surveys Fail',
  props<{error: any}>(),
);

export const selectSurveyCategory = createAction(
  '[Survey] Select Survey Category',
  props<{id: number}>(),
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

