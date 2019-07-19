import { TeamMember } from './team-member.interface';
import { ResultQuestion } from '../../../history/interfaces/result-question.interface';

export interface Result {
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
  resultTeamMember: TeamMember[];
  resultQuestion?: ResultQuestion[];
  resultBestPracticeDone: boolean;
  resultBestPracticeComment: string;
  resultBestPracticePhoto: string;
}
