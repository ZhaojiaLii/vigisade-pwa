import { Category } from './category.interface';
import { TypeBestPractice } from './typeBestPractice.interface';
import { BestPracticeTranslation } from './bestPracticeTranslation.interface';

export interface Survey {
  surveyId: number;
  surveyDirectionId: number;
  surveyTeam: string;
  surveyCategories: Category[];
  typeBestPractice: TypeBestPractice[];
  bestPracticeTranslation: BestPracticeTranslation[];
}
