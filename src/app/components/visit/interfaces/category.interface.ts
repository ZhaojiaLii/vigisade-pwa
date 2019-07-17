import { Question } from './question.interface';

export interface Category {
  id: number;
  title: string;
  questions: Question[];
}
