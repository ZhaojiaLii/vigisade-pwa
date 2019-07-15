import { CreateDangerous } from '../interfaces/createDangerous.interface';
import { GetDangerousType } from '../interfaces/getDangerousType.interface';

export interface DangerousState {
  createDangerous: CreateDangerous | null;
  dangerousType: GetDangerousType | null;
}

export const dangerousInitialState = {
  createDangerous: null,
  dangerousType: null,
};
