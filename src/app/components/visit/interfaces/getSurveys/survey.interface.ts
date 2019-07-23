import { Category } from './category.interface';
import { TypeBestPractice } from './typeBestPractice.interface';
import { BestPracticeTranslation } from './bestPracticeTranslation.interface';

export interface Survey {
  surveyId: number;
  surveyDirectionId: number;
  surveyTeam: string;
  surveyCategories: Category[];
  typeBestPractice: TypeBestPractice[];
  bestPracticeTranslation: BestPracticeTranslation;
}

export const TEAM_MODE_TEAM = 'Equipe';
export const TEAM_MODE_MANAGER = 'Responsable';
export const TEAM_MODE_NO = 'Aucun';

export const TEAM_MODE = {
  team: TEAM_MODE_TEAM,
  manager: TEAM_MODE_MANAGER,
  no: TEAM_MODE_NO,
};
