import { Action, createReducer, on } from '@ngrx/store';
import { surveyInitialState, SurveyState } from './survey.state';
import { createResult, createResultFail, createResultSuccess, loadSurveysSuccess, selectSurveyCategory, updateResult, updateResultFail, updateResultSuccess } from './survey.actions';

export const createSurveyReducer = createReducer(
  surveyInitialState,
  on(loadSurveysSuccess, (state, {surveys}) => ({...state, surveys})),
  on(selectSurveyCategory, (state, {id}) => ({
    ...state,
    layout: {
      ...state.layout,
      selectedCategory: id,
    },
  })),
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

