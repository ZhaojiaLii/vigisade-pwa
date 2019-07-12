import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey } from '../interfaces/survey.interface';

/**
 * getSurvey state
 */
export interface SurveyState {
  survey: Survey | null;
  results: GetResults | null;
  result: GetResult | null;
  createResult: CreateResult | null;
  updateResult: UpdateResult | null;
}

export const surveyInitialState = {
  survey: null,
  results: null,
  result: null,
  createResult: null,
  updateResult: null
};
