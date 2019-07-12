import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey } from '../interfaces/survey.interface';
import { Result } from '../interfaces/result.interface';

/**
 * getSurvey state
 */
export interface SurveyState {
  survey: Survey | null;
  history: Result[] | null;
  result: GetResult | null;
  createResult: CreateResult | null;
  updateResult: UpdateResult | null;
}

export const surveyInitialState = {
  survey: null,
  history: null,
  result: null,
  createResult: null,
  updateResult: null
};
