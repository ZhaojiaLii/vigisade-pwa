import { createReducer, on } from '@ngrx/store';
import { surveyInitialState } from './survey.state';
import { getSurvey, getSurveyFail, getSurveySuccess } from './survey.actions';

export const surveyReducer = createReducer(
  surveyInitialState,
  on(getSurvey, state => state),
  on(getSurveySuccess, (state, {survey}) => ({...state, survey})),
  on(getSurveyFail, state => state),
);
