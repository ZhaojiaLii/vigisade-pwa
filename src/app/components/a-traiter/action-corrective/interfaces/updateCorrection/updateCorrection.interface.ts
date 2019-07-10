export interface UpdateCorrection {
  id: number;
  user_id: number;
  survey_id: number;
  category_id: number;
  question_id: number;
  dateControl: string;
  place: string;
  status: string;
  // comment: string;
  // photo: string;
}
