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
    return directions.reduce((areas, direction) => [...areas, ...direction.area], []);
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

export const getDangerousSituationTypes = createSelector(
  getDataState,
  (state: DataState) => state.typeDangerousSituations,
);

export const getHeader = createSelector(
  getDataState,
  (state: DataState) => state.header,
);

