import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DangerousState } from './dangerous.states';

export const getDangerousTypeState = createFeatureSelector<DangerousState>('dangerous');

export const getDangerousType = createSelector(
  getDangerousTypeState,
  (state: DangerousState) => state.dangerousType,
);
