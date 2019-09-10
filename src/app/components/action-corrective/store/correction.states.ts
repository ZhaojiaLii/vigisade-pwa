import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import { ATraiterSearch } from '../../a-traiter/interfaces/a-traiter.search';
import {User} from '../../profile/interfaces/user';

/**
 * get correction state
 */
export interface CorrectionState {
  correctiveAction: Correction[] | null;
  createCorrection: CreateCorrection | null;
  updateCorrection: UpdateCorrection | null;
  search: ATraiterSearch;
  fromHomepage: boolean;
}

export const correctionInitialState = {
  correctiveAction: null,
  createCorrection: null,
  updateCorrection: null,
  search: null,
  fromHomepage: false,
};

export interface AllUsersState {
  users: User[] | null;
}

export const allUsersInitialState = {
  users: null
};

