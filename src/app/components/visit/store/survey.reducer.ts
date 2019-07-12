import { Action, createReducer, on } from '@ngrx/store';
import { surveyInitialState, SurveyState } from './survey.state';
import { createResult, createResultFail, createResultSuccess, loadResult, loadResultFail, loadHistorySuccess, loadResultSuccess, loadSurveySuccess, updateResult, updateResultFail, updateResultSuccess } from './survey.actions';

export const createSurveyReducer = createReducer(
  surveyInitialState,
  on(loadSurveySuccess, (state, {survey}) => ({...state, survey})),
  on(loadHistorySuccess, (state, {history}) => ({...state, history})),
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

