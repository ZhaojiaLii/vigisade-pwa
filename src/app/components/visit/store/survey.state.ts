import { Result } from '../interfaces/create/result.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey } from '../interfaces/getSurveys/survey.interface';

/**
 * getSurvey state
 */
export interface SurveyState {
  surveys: Survey[];
  createResult: Result | null;
  updateResult: UpdateResult | null;
  layout: {
    selectedCategory: number | null;
    loading: boolean;
  };
}

export const surveyInitialState: SurveyState = {
  surveys: null,
  createResult: null,
  updateResult: null,
  layout: {
    selectedCategory: null,
    loading: false,
  },
};
