import { TeamMember } from './teamMember.interface';
import { Category } from './category.interface';
import { BestPractice } from './bestPractice.interface';

export interface GetResult {
  mail: string;
  id: number;
  direction: string;
  area: string;
  entity: string;
  date: string;
  place: string;
  client: string;
  teamMembers: TeamMember[];
  categories: Category[];
  bestPractice: BestPractice[];
}
