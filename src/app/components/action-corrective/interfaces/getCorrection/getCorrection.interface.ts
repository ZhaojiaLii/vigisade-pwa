import {Correction} from './correction.interface';

export interface GetCorrection {
  user_id: number;
  Correction: Correction[];
}
