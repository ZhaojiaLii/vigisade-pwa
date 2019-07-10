import {GetCorrection} from '../interfaces/getCorrection/getCorrection.interface';
import {UpdateCorrection} from '../interfaces/updateCorrection/updateCorrection.interface';
import {CreateCorrection} from '../interfaces/createCorrection/createCorrection.interface';

/**
 * get correction state
 */
export interface CorrectionState {
  correction: GetCorrection | null;
  createCorrection: CreateCorrection | null;
  updateCorrection: UpdateCorrection | null;
}

export const correctionInitialState = {
  correction: null,
  createCorrection: null,
  updateCorrection: null,
};
