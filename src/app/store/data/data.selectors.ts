import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './data.state';

export const getDataState = createFeatureSelector<DataState>('data');

export const getDirections = createSelector(
  getDataState,
  (state: DataState) => state.directions,
);

export const getAreas = createSelector(
  getDataState,
  (state: DataState) => state.areas,
);

export const getEntities = createSelector(
  getDataState,
  (state: DataState) => state.entities,
);

export const getHeader = createSelector(
  getDataState,
  (state: DataState) => state.header,
);
