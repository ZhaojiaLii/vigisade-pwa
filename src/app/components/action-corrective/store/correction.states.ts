/**
 * get correction state
 */
import {GetCorrection} from '../interfaces/getCorrection/getCorrection.interface';
import {UpdateCorrection} from '../interfaces/updateCorrection/updateCorrection.interface';
import {CreateCorrection} from '../interfaces/createCorrection/createCorrection.interface';

export interface GetCorrectionState {
  correction: GetCorrection | null;
}

export const getCorrectionInitialState = {
  correction: null,
};

/**
 *  Create correction state
 */
export interface CreateCorrectionState {
  createCorrection: CreateCorrection | null;
}

export const createCorrectionInitialState = {
  createCorrection: null
};
/**
 *  Update correction state
 */
export interface UpdateCorrectionState {
  updateCorrection: UpdateCorrection | null;
}

export const updateCorrectionInitialState = {
  updateCorrection: null
};
