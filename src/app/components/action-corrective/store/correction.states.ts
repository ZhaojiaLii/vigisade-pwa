import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';

/**
 * get correction state
 */
export interface CorrectionState {
  correctiveAction: Correction[] | null;
  createCorrection: CreateCorrection | null;
  updateCorrection: UpdateCorrection | null;
}

export const correctionInitialState = {
  correctiveAction: null,
  createCorrection: null,
  updateCorrection: null,
};
