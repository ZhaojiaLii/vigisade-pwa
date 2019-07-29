import { Action, createReducer, on } from '@ngrx/store';
import { surveyInitialState, SurveyState } from './survey.state';
import { createResultSuccess, loadSurveysSuccess, selectSurveyCategory, setLoadingState, updateResult, updateResultFail, updateResultSuccess } from './survey.actions';

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
  on(createResultSuccess, (state, {status}) => ({...state, status})),
  on(updateResult, state => state),
  on(updateResultSuccess, (state, {status}) => ({...state, status})),
  on(updateResultFail, state => state),
  on(setLoadingState, (state, {loading}) => ({
    ...state,
    layout: {
      ...state.layout,
      loading,
    }
  })),
);

export function surveyReducer(state: SurveyState | undefined, action: Action) {
  return createSurveyReducer(state, action);
}

