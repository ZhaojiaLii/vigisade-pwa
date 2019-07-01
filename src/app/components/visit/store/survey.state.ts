import { Survey } from '../interfaces/getSurveyInterface/survey.interface';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

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

/**
 *  CreateResult state
 */
export interface CreateResultState {
  createResult: CreateResult | null;
}

export const createResultInitialState = {
  createResult: null
};

/**
 *  UpdateResult state
 */
export interface UpdateResultState {
  createResult: UpdateResult | null;
}

export const updateResultInitialState = {
  createResult: null
};
