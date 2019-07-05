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
  getResults: GetResults | null;
  getResult: GetResult | null;
  createResult: CreateResult | null;
  updateResult: UpdateResult | null;
}

export const surveyInitialState = {
  survey: null,
  getResults: null,
  getResult: null,
  createResult: null,
  updateResult: null
};
