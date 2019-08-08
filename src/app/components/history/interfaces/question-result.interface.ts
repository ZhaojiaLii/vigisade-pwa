import { Question } from '../../survey/interfaces/getSurveys/question.interface';
import { ResultQuestion } from '../../survey/interfaces/results/result-question.interface';
import { TeamMember } from '../../survey/interfaces/getSurveys/team-member.interface';

export interface QuestionResult {
  question: Question;
  result: ResultQuestion;
  teamMember: TeamMember;
}
