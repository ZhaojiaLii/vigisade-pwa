import {Correction} from './correction.interface';

export interface GetCorrection {
  id: number;
  correction: Correction[];
}
