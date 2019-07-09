import {Action, createReducer, on} from '@ngrx/store';
import {correctionInitialState, CorrectionState} from './correction.states';
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

export const createCorrectionReducer = createReducer(
  correctionInitialState,
  on(getCorrection, state => state),
  on(getCorrectionSuccess, (state, {correction}) => ({...state, correction})),
  on(getCorrectionFail, state => state),
  on(createCorrection, state => state),
  on(createCorrectionSuccess, (state, {status}) => ({...state, status})),
  on(createCorrectionFail, state => state),
  on(updateCorrection, state => state),
  on(updateCorrectionSuccess, (state, {status}) => ({...state, status})),
  on(updateCorrectionFail, state => state),
);

export function correctionReducer(state: CorrectionState | undefined, action: Action) {
  return createCorrectionReducer(state, action);
}
