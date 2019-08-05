import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';
import { getAreas, getDirections } from '../../../store/data/data.selectors';
import { User } from '../interfaces/user';
import { Area } from '../../shared/interfaces/area.interface';
import { Direction } from '../../shared/interfaces/direction.interface';

export const getProfileState = createFeatureSelector<ProfileState>('profile');

export const getUser = createSelector(
  getProfileState,
  (state: ProfileState) => state.user,
);

export const getUserDirection = createSelector(
  getUser,
  getDirections,
  (user: User, directions: Direction[]) => {
    if (!user || !user.directionId || !directions || !directions.length) {
      return null;
    }

    return directions.find(direction => direction.id === user.directionId);
  }
);

export const getUserArea = createSelector(
  getUser,
  getAreas,
  (user: User, areas: Area[]) => {
    if (!user || !user.areaId || !areas || !areas.length) {
      return null;
    }

    return areas.find(area => area.id === user.areaId);
  },
);
