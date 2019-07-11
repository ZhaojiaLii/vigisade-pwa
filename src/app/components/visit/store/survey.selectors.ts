import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SurveyState } from './survey.state';

export const getSurveyState = createFeatureSelector<SurveyState>('survey');

export const getSurvey = createSelector(
  getSurveyState,
  (state: SurveyState) => state.survey,
);

export const getResultState = createFeatureSelector<SurveyState>('survey');

export const getResult = createSelector(
  getResultState,
  (state: SurveyState) => state.result,
);
