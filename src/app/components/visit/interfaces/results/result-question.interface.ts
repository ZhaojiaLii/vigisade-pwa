export interface ResultQuestion {
  resultQuestionId: number;
  resultQuestionResultId: number;
  resultQuestionTeamMemberId?: number;
  resultQuestionResultNotation: string;
  resultQuestionResultComment: string;
  resultQuestionResultPhoto: string;
  // For display.
  resultQuestionResultQuestionId?: number;
}
