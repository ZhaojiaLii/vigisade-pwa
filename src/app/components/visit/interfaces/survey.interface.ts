import { Category } from './category.interface';

export interface Survey {
  id: number;
  title: string;
  directionId: number;
  categories: Category[];
  bestPracticeLabel: string;
  bestPracticeHelp: string;
}
