import { createAction, props } from '@ngrx/store';
import { Survey } from '../interfaces/survey.interface';

export const getSurvey = createAction('[Survey] Gets Survey data');

export const getSurveySuccess = createAction(
  '[Survey] Gets survey Success',
  props<{survey: Survey}>(),
);

export const getSurveyFail = createAction(
  '[Survey] Gets survey Fail',
  props<{error: any}>(),
);
