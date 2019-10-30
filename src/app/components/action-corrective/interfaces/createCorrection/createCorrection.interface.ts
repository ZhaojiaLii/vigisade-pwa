export interface CreateCorrection {
  id: number;
  user_id: number;
  survey_id: number;
  category_id: number;
  question_id: number;
  result_id: number;
  status: string;
  comment_question: string;
  image: string;
  type_dangerous_id: number;
}
