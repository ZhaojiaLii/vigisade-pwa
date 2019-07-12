import { TeamMember } from './team-member.interface';

export interface Result {
  id: number;
  surveyId: number;
  userId: number;
  directionId: number;
  zoneId: number;
  entityId: number;
  date: string;
  place: string;
  client: string;
  status: boolean;
  teamMembers: TeamMember[];
  bestPracticeDone: boolean;
  bestPracticeComment: string;
  bestPracticePhoto: string;
}
