import { TeamMembers } from './teamMembers.interface';
import { Question } from './question.interface';


export interface CreateResult {
  resultId: number;
  resultSurveyId: number;
  resultUserId: number;
  resultDirectionId: number;
  resultAreaId: number;
  resultEntityId: number;
  resultDate: string;
  resultPlace: string;
  resultClient: string;
  resultValidated: boolean;
  resultTeamMember?: TeamMembers[];
  question: Question[];
  resultBestPracticeDone: string;
  resultBestPracticeComment: string;
  resultBestPracticePhoto: string;
}
