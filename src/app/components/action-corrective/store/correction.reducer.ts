import {Action, createReducer, on} from '@ngrx/store';
import {correctionInitialState, CorrectionState} from './correction.states';
import {
  createCorrection,
  createCorrectionFail,
  createCorrectionSuccess,
  loadCorrection,
  loadCorrectionFail,
  loadCorrectionSuccess, setATraiterSearch,
  updateCorrection,
  updateCorrectionFail,
  updateCorrectionSuccess
} from './correction.actions';

export const createCorrectionReducer = createReducer(
  correctionInitialState,
  on(loadCorrection, state => state),
  on(loadCorrectionSuccess, (state, {correctiveAction}) => ({...state, correctiveAction})),
  on(loadCorrectionFail, state => state),
  on(createCorrection, state => state),
  on(createCorrectionSuccess, (state, {status}) => ({...state, status})),
  on(createCorrectionFail, state => state),
  on(updateCorrection, state => state),
  on(updateCorrectionSuccess, (state, {status}) => ({...state, status})),
  on(updateCorrectionFail, state => state),
  on(setATraiterSearch, (state, {searchParams}) => ({...state, search: searchParams})),
);

export function correctionReducer(state: CorrectionState | undefined, action: Action) {
  return createCorrectionReducer(state, action);
}
