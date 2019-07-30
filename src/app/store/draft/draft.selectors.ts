import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DraftState } from './draft.state';

export const getDraftState = createFeatureSelector<DraftState>('draft');

export const getSurveyDraft = createSelector(
  getDraftState,
  (state: DraftState) => state.survey,
);
