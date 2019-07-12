import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SurveyState } from './survey.state';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';

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

export const getHistory = createSelector(
  getResultState,
  (state: SurveyState) => state.history,
);

export const getTeamMembers = createSelector(
  getResult,
  (result: GetResult) => {
    return result ? result.teamMembers : null;
  }
);
