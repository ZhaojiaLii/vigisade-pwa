import { createAction, props } from '@ngrx/store';
import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import {User} from '../../profile/interfaces/user';
import { ATraiterSearch } from '../../a-traiter/interfaces/a-traiter.search';

export const loadCorrection = createAction(
    '[correction] Load Correction',
);

export const loadCorrectionSuccess = createAction(
    '[correction] Load Correction Success',
    props<{ correctiveAction: Correction[] }>(),
);

export const loadCorrectionFail = createAction(
    '[correction] Load Correction fail',
    props<{ error: any }>(),
);

export const createCorrection = createAction(
  '[correction] Create Correction',
  props<{ createCorrectionPayload: CreateCorrection }>(),
);

export const createCorrectionSuccess = createAction(
  '[correction] Create Correction Success',
  props<{ status: number }>(),
);

export const createCorrectionFail = createAction(
  '[correction] Create Correction fail',
  props<{ error: any }>(),
);

export const updateCorrection = createAction(
  '[correction] Update Correction',
  props<{ updateCorrectionPayload: UpdateCorrection }>(),
);

export const updateCorrectionSuccess = createAction(
  '[correction] Update Correction Success',
  props<{ status: number }>(),
);

export const updateCorrectionFail = createAction(
  '[correction] Update Correction fail',
  props<{ error: any }>(),
);

export const loadAllUsers = createAction(
  '[All Users] Load All Users',
);

export const loadAllUsersSuccess = createAction(
  '[All Users] Load All Users success',
  props<{ users: User[] }>(),
);

export const loadAllUsersFail = createAction(
  '[All Users] Load All Users fail',
  props<{ error: any }>(),
);
export const setATraiterSearch = createAction(
  '[Survey] Set A traiter search',
  props<{searchParams: ATraiterSearch}>(),
);

export const isFromHomepage = createAction(
  '[Navigate] From Homepage click A traiter',
);

export const isFromMenu = createAction(
  '[Navigate] From Menu click A traiter',
);
