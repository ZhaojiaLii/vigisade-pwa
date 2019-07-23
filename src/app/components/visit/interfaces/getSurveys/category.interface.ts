import { Question } from './question.interface';
import { SurveyCategoryTitleTranslation } from './surveyCategoryTitleTranslation.interface';

export interface Category {
  surveyCategoryId: number;
  surveyCategoryOrdonnancement: number;
  surveyCategoryTitleTranslation: SurveyCategoryTitleTranslation;
  surveyQuestion: Question[];
}
