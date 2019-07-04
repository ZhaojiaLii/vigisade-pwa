import {createReducer, on} from '@ngrx/store';
import {
  createCorrectionInitialState,
  getCorrectionInitialState,
  updateCorrectionInitialState
} from './correction.states';
import {
  createCorrection,
  createCorrectionFail,
  createCorrectionSuccess,
  getCorrection,
  getCorrectionFail,
  getCorrectionSuccess,
  updateCorrection,
  updateCorrectionFail,
  updateCorrectionSuccess
} from './correction.actions';

export const getCorrectionReducer = createReducer(
  getCorrectionInitialState,
  on(getCorrection, state => state),
  on(getCorrectionSuccess, (state, {correction}) => ({...state, correction})),
  on(getCorrectionFail, state => state),
);

export const updateCorrectionReducer = createReducer(
  updateCorrectionInitialState,
  on(updateCorrection, state => state),
  on(updateCorrectionSuccess, (state, {status}) => ({...state, status})),
  on(updateCorrectionFail, state => state),
);

export const createCorrectionReducer = createReducer(
  createCorrectionInitialState,
  on(createCorrection, state => state),
  on(createCorrectionSuccess, (state, {status}) => ({...state, status})),
  on(createCorrectionFail, state => state),
);

