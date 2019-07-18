import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './data.state';
import { Direction } from '../../components/shared/interfaces/direction.interface';
import { Area } from '../../components/shared/interfaces/area.interface';

export const getDataState = createFeatureSelector<DataState>('data');

export const getDirections = createSelector(
  getDataState,
  (state: DataState) => state.directions,
);

export const getAreas = createSelector(
  getDirections,
  (state: Direction) => state.areas,
);

export const getEntities = createSelector(
  getAreas,
  (state: Area) => state.entities,
);

export const getTypeDangerousSituations = createSelector(
  getDataState,
  (state: DataState) => state.dangerousTypes,
);

export const getHeader = createSelector(
  getDataState,
  (state: DataState) => state.header,
);

