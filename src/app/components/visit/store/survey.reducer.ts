import { Action, createReducer, on } from '@ngrx/store';
import { surveyInitialState, SurveyState } from './survey.state';
import { createResult, createResultFail, createResultSuccess, getResult, getResultFail, getResults, getResultsFail, getResultsSuccess, getResultSuccess, getSurvey, getSurveyFail, getSurveySuccess, updateResult, updateResultFail, updateResultSuccess } from './survey.actions';

export const createSurveyReducer = createReducer(
  surveyInitialState,
  on(getSurvey, state => state),
  on(getSurveySuccess, (state, {survey}) => ({...state, survey})),
  on(getSurveyFail, state => state),
  on(getResults, state => state),
  on(getResultsSuccess, (state, {results}) => ({...state, results})),
  on(getResultsFail, (state => state)),
  on(getResult,  state => state),
  on(getResultSuccess, (state, {result}) => ({...state, result})),
  on(getResultFail, state => state),
  on(createResult, state => state),
  on(createResultSuccess, (state, {status}) => ({...state, status})),
  on(createResultFail, state => state),
  on(updateResult, state => state),
  on(updateResultSuccess, (state, {status}) => ({...state, status})),
  on(updateResultFail, state => state),
);

export function surveyReducer(state: SurveyState | undefined, action: Action) {
  return createSurveyReducer(state, action);
}
