import { Question } from './question.interface';

export interface Category {
  category_title: string;
  questions: Question[];
}
