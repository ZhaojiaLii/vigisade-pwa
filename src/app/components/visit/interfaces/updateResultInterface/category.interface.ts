import { Question } from './question.interface';


export interface Category {
  title: string;
  questions: Question[];
}
