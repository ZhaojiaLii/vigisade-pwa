import { createAction, props } from '@ngrx/store';
import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';

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

