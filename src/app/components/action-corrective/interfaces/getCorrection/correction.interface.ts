export interface Correction {
  id: number;
  survey_id: number;
  category_id: number;
  question_id: number;
  result_id: number;
  status: string;
  comment_question: string;
  image: string;
  user_id: number;
}
