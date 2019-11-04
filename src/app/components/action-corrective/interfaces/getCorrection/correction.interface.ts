export interface Correction {
  id: number;
  survey_id: number;
  category_id: number;
  question_id: number;
  result_id: number;
  resultUserfirstName: string;
  resultUserlastName: string;
  result_question_id: string;
  status: string;
  comment_question: string;
  image: string;
  user_id: number;
  date: string;
  type_dangerous_id: number;
  dangerous_situation_image: string;
  dangerous_situation_comment: string;
}
