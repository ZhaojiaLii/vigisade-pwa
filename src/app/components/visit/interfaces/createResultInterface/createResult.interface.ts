import { Category } from './category.interface';
import { TeamMembers } from './teamMembers.interface';


export interface CreateResult {
  email: string;
  direction: string;
  area: string;
  entity: string;
  date: string;
  place: string;  // lieu
  client: string;
  validated: boolean;
  teamMembers?: TeamMembers[];
  categories: Category[];
  bestPracticeDone: boolean;
  bestPracticeComment: string;
  bestPracticePhoto: string;
}
