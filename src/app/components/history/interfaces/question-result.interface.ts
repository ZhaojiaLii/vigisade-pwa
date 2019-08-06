import { Question } from '../../visit/interfaces/getSurveys/question.interface';
import { ResultQuestion } from '../../visit/interfaces/results/result-question.interface';
import { TeamMember } from '../../visit/interfaces/getSurveys/team-member.interface';

export interface QuestionResult {
  question: Question;
  result: ResultQuestion;
  teamMember: TeamMember;
}
