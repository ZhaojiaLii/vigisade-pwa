import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';
import { getAreas, getDirections, getEntities } from '../../../store/data/data.selectors';
import { User } from '../interfaces/user';
import { Direction } from '../../shared/interfaces/direction.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';

export const getProfileState = createFeatureSelector<ProfileState>('profile');

export const getUser = createSelector(
  getProfileState,
  (state: ProfileState) => state.user,
);

export const getUserDirection = createSelector(
  getUser,
  getDirections,
  (user: User, directions: Direction[]) => {
    if (!user) {
      return null;
    }

    return directions.find(direction => direction.id === user.directionId);
  },
);

export const getUserArea = createSelector(
  getUser,
  getAreas,
  (user: User, areas: Area[]) => {
    if (!user) {
      return null;
    }

    return areas.find(area => area.id === user.areaId);
  },
);

export const getUserEntity = createSelector(
  getUser,
  getEntities,
  (user: User, entities: Entity[]) => {
    if (!user) {
      return null;
    }

    return entities.find(entity => entity.id === user.entityId);
  },
);
