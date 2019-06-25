import { Survey } from '../interfaces/getSurveyInterface/survey.interface';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';

/**
 * getSurvey state
 */
export interface SurveyState {
  survey: Survey | null;
}

export const surveyInitialState = {
  survey: null,
};

/**
 * GetResults state
 */
export interface GetResultsState {
  getResults: GetResults | null;
}

export const getResultsInitialState = {
  getResults: null
};

/**
 *  GetResult state
 */
export interface GetResultState {
  getResult: GetResult | null;
}

export const getResultInitialState = {
  getResult: null
};

