import { ResultTeamMember } from './result-team-member.interface';
import { ResultQuestion } from './result-question.interface';


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
  resultTeamMember?: ResultTeamMember[];
  resultQuestion: ResultQuestion[];
  resultBestPracticeDone: string;
  resultBestPracticeComment: string;
  resultBestPracticePhoto: string;
}
