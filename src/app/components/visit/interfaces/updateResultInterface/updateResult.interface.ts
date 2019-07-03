import { Category } from './category.interface';
import { TeamMembers } from './teamMembers.interface';
import { BestPractice } from './bestPractice.interface';


export interface UpdateResult {
  email: string;
  direction: string;
  area: string;
  entity: string;
  date: string;
  place: string;
  client: string;
  validated: boolean;
  teamMembers?: TeamMembers[];
  categories: Category[];
  bestPractice: BestPractice[];
}
