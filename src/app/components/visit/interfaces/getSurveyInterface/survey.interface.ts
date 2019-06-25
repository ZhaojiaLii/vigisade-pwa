import { Category } from './category.interface';

export interface Survey {
  email: string;
  direction: string;
  group?: string;  // equipe
  categories: Category[]; // rubrique
  bestPracticeLabel: string;
  bestPracticeHelp: string;
}
