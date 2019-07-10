import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CorrectionState } from './correction.states';

export const getCorrectionState = createFeatureSelector<CorrectionState>('correction');

export const getCorrection = createSelector(
  getCorrectionState,
  (state: CorrectionState) => state.correction,
);
