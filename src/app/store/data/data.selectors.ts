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
        for (const areaChild of direction.area) {
          areas.push(areaChild);
        }
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
      if (area.entity) {
        for (const entityChild of area.entity) {
          entities.push(entityChild);
        }
      }
    });
    return entities;
  },
);

export const getTypeDangerousSituations = createSelector(
  getDataState,
  (state: DataState) => state.typeDangerousSituations[0],
);

export const getHeader = createSelector(
  getDataState,
  (state: DataState) => state.header,
);

