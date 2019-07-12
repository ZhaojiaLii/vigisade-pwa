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

export const Results = createSelector(
  getResultState,
  (state: SurveyState) => state.results,
);

export const getResults = createSelector(
  Results,
  (results: GetResults) => {
    return results ? results.results : null;
  }
);

export const getTeamMembers = createSelector(
  getResult,
  (result: GetResult) => {
    return result ? result.teamMembers : null;
  }
);

export const getResultsCount = createSelector(
  Results,
  (results: GetResults) => {
    return results ? results.results.length : 0;
  }
);
