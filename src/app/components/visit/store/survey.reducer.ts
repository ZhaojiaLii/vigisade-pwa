import { createReducer, on } from '@ngrx/store';
import { getResultInitialState, getResultsInitialState, surveyInitialState } from './survey.state';
import { getResult, getResultFail, getResults, getResultsFail, getResultsSuccess, getResultSuccess, getSurvey, getSurveyFail, getSurveySuccess } from './survey.actions';

export const surveyReducer = createReducer(
  surveyInitialState,
  on(getSurvey, state => state),
  on(getSurveySuccess, (state, {survey}) => ({...state, survey})),
  on(getSurveyFail, state => state),
);

export const getResultsReducer = createReducer(
  getResultsInitialState,
  on(getResults, state => state),
  on(getResultsSuccess, (state, {results}) => ({...state, results})),
  on(getResultsFail, (state => state)),
);

export const getResultReducer = createReducer(
  getResultInitialState,
  on(getResult,  state => state),
  on(getResultSuccess, (state, {result}) => ({...state, result})),
  on(getResultFail, state => state),
);
