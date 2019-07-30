import { SurveyQuestionTranslation } from '../../visit/interfaces/getSurveys/surveyQuestionTranslation.interface';

export interface SurveyQuestion {
  surveyQuestionCategoryId: number;
  surveyQuestionId: number;
  surveyQuestionOrdonnancement: number;
  surveyQuestionTranslation: SurveyQuestionTranslation;
  surveyQuestionType: string;
}
