import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey } from '../interfaces/getSurveys/survey.interface';

/**
 * getSurvey state
 */
export interface SurveyState {
  surveys: Survey[];
  createResult: CreateResult | null;
  updateResult: UpdateResult | null;
  layout: {
    selectedCategory: number | null;
  };
}

export const surveyInitialState: SurveyState = {
  surveys: [],
  createResult: null,
  updateResult: null,
  layout: {
    selectedCategory: null,
  },
};
