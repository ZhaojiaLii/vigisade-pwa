import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './data.state';
import { Direction } from '../../components/shared/interfaces/direction.interface';
import { Area } from '../../components/shared/interfaces/area.interface';

export const getDataState = createFeatureSelector<DataState>('data');

export const getDirections = createSelector(
  getDataState,
  (state: DataState) => state.direction,
);

export const getAreas = createSelector(
  getDirections,
  (directions: Direction[]) => {
    const areas = [];
    directions.map(direction => {
      if (direction.area[0]) {
        areas.push(direction.area);
      }
    });
    return areas;
  }
);

export const getEntities = createSelector(
  getAreas,
  (areas: Area[]) => {
    const entities = [];
    areas.map(area => {
      // @ts-ignore
      for (const childArea of area) {
        if (childArea.entity) {
          entities.push(childArea.entity);
        }
      }
    });
    return entities;
  },
);

export const getTypeDangerousSituations = createSelector(
  getDataState,
  (state: DataState) => state.typeDangerousSituations,
);

export const getHeader = createSelector(
  getDataState,
  (state: DataState) => state.header,
);

