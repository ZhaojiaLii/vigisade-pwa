import { Category } from './category.interface';
import { BestPracticeType } from './best-practice-type.interface';
import { BestPractice } from './best-practice.interface';

export interface Survey {
  surveyId: number;
  surveyAreaId: number;
  surveyDirectionId: number;
  surveyTeam: string;
  surveyCategories: Category[];
  typeBestPractice: BestPracticeType[];
  bestPracticeTranslation: BestPractice;
}

export const TEAM_MODE_TEAM = 'Equipe';
export const TEAM_MODE_MANAGER = 'Responsable';
export const TEAM_MODE_NO = 'Aucun';

export const TEAM_MODE = {
  team: TEAM_MODE_TEAM,
  manager: TEAM_MODE_MANAGER,
  no: TEAM_MODE_NO,
};
