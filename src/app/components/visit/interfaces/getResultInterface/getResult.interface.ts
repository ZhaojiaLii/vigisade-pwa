import { ResultQuestion } from '../../../history/interfaces/result-question.interface';
import { TeamMember } from '../getSurveys/team-member.interface';

export interface GetResult {
  id: number;
  surveyId: number;
  userId: number;
  directionId: number;
  areaId: number;
  entityId: number;
  date: string;
  place: string;
  client: string;
  questions: ResultQuestion[];
  teamMembers: TeamMember[];
  bestPracticeDone: boolean;
  bestPracticeComment: string;
  bestPracticePhoto: string;
}
