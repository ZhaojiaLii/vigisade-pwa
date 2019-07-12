import { Action, createReducer, on } from '@ngrx/store';
import { surveyInitialState, SurveyState } from './survey.state';
import {
  createResult,
  createResultFail,
  createResultSuccess,
  loadResult,
  loadResultFail,
  loadResults,
  loadResultsFail,
  loadResultsSuccess,
  loadResultSuccess,
  loadSurvey,
  loadSurveyFail,
  loadSurveySuccess,
  updateResult,
  updateResultFail,
  updateResultSuccess
} from './survey.actions';

export const createSurveyReducer = createReducer(
  surveyInitialState,
  on(loadSurvey, state => ({...state})),
  on(loadSurveySuccess, (state, {survey}) => ({...state, survey})),
  on(loadSurveyFail, state => ({...state})),
  on(loadResults, state => state),
  on(loadResultsSuccess, (state, {results}) => ({...state, results})),
  on(loadResultsFail, (state => state)),
  on(loadResult,  state => state),
  on(loadResultSuccess, (state, {result}) => ({...state, result})),
  on(loadResultFail, state => state),
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

