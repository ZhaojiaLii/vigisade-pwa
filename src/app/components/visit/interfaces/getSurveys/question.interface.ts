import { SurveyQuestionTranslation } from './surveyQuestionTranslation.interface';

export interface Question {
  surveyQuestionId: number;
  surveyQuestionOrdonnancement: number;
  surveyQuestionType: string;
  surveyQuestionCategoryId: number;
  surveyQuestionTranslation: SurveyQuestionTranslation;
}
