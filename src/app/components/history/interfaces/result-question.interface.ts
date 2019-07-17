import { Question } from '../../visit/interfaces/question.interface';

export interface ResultQuestion {
  id: number;
  questionId: number;
  notation: string;
  comment: string;
  photo: string;
  // For display.
  question?: Question;
}
