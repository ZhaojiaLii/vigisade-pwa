import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DangerousState } from './dangerous.states';

export const getDangerousState = createFeatureSelector<DangerousState>('dangerous');

export const getDangerousSituationHistory = createSelector(
  getDangerousState,
  (state: DangerousState) => {
    if (state.dangerousHistory) {
      return state.dangerousHistory;
    }
  }
);

