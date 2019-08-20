import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import { ATraiterSearch } from '../../a-traiter/interfaces/a-traiter.search';

/**
 * get correction state
 */
export interface CorrectionState {
  correctiveAction: Correction[] | null;
  createCorrection: CreateCorrection | null;
  updateCorrection: UpdateCorrection | null;
  search: ATraiterSearch;
}

export const correctionInitialState = {
  correctiveAction: null,
  createCorrection: null,
  updateCorrection: null,
  search: null,
};
