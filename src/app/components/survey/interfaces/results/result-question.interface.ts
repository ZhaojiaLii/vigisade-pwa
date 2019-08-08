export interface ResultQuestion {
  resultQuestionId: number;
  resultQuestionResultId: number;
  resultQuestionTeamMemberId?: number;
  resultQuestionResultNotation: number;
  resultQuestionResultComment: string;
  resultQuestionResultPhoto: string;
  // For display.
  resultQuestionResultQuestionId?: number;
}
