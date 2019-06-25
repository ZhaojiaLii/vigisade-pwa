import { Category } from './category.interface';

export interface Survey {
  title: string;
  categories: Category[];
  bestPracticeLabel: string;
  bestPracticeHelp: string;
}
