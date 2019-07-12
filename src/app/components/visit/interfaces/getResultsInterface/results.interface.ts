import { TeamMember } from '../getResultInterface/teamMember.interface';

export interface Results {
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
  // questions: Question[];
  teamMembers: TeamMember[];
  bestPracticeDone: boolean;
  bestPracticeComment: string;
  bestPracticePhoto: string;
}
