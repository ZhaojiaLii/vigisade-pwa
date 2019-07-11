import { Question } from './question.interface';

export interface GetResult {
  id: number;
  surveyId: number;
  userId: number;
  directionId: number;
  zoneId: number;
  entityId: number;
  date: string;
  place: string;
  client: string;
  questions: Question[];
  // teamMembers: TeamMember[];
  bestPracticeDone: boolean;
  bestPracticeComment: string;
  bestPracticePhoto: string;
}
