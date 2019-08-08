import { Category } from './category.interface';
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
  teamMembers?: {member: string}[];
  categories: Category[];
  bestPractice: BestPractice[];
}
