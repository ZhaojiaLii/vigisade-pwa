import { TeamMember } from './team-member.interface';
import { ResultQuestion } from '../../history/interfaces/result-question.interface';

export interface Result {
  id: number;
  surveyId: number;
  userId: number;
  directionId: number;
  areaId: number;
  entityId: number;
  date: string;
  place: string;
  client: string;
  status: boolean;
  teamMembers: TeamMember[];
  questions?: ResultQuestion[];
  bestPracticeDone: boolean;
  bestPracticeComment: string;
  bestPracticePhoto: string;
}
