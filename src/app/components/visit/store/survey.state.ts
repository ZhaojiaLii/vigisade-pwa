import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey } from '../interfaces/survey.interface';

/**
 * getSurvey state
 */
export interface SurveyState {
  surveys: Survey[];
  createResult: CreateResult | null;
  updateResult: UpdateResult | null;
}

export const surveyInitialState: SurveyState = {
  surveys: [],
  createResult: null,
  updateResult: null,
};
