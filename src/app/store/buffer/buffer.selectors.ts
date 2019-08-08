import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BufferState } from './buffer.state';

export const getBufferState = createFeatureSelector<BufferState>('buffer');

export const getBufferResults = createSelector(
  getBufferState,
  state => state.surveyResults
);
