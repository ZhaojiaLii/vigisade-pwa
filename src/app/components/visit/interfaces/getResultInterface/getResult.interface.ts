import { Question } from './question.interface';
import { TeamMember } from '../team-member.interface';

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
  questions: Question[];
  teamMembers: TeamMember[];
  bestPracticeDone: boolean;
  bestPracticeComment: string;
  bestPracticePhoto: string;
}
