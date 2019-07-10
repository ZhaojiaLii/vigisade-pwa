import { createAction, props } from '@ngrx/store';
import { GetCorrection } from '../interfaces/getCorrection/getCorrection.interface';
import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';

export const getCorrection = createAction(
    '[correction] Get Correction',
);

export const getCorrectionSuccess = createAction(
    '[correction] Get Correction Success',
    props<{ correction: GetCorrection }>(),
);

export const getCorrectionFail = createAction(
    '[correction] Get Correction fail',
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

