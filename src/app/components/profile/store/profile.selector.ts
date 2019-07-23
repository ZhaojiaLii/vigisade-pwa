import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';
import { getDirections } from '../../../store/data/data.selectors';
import { User } from '../interfaces/user';
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
    if (!user) {
      return null;
    }

    return directions.find(direction => direction.id === user.directionId);
  },
);

export const getUserEntities = createSelector(
  getUserDirection,
  (direction: Direction) => {
    if (!direction) {
      return null;
    }

    return direction.area.reduce((entities, area) => {
      return [...entities, ...area.entity];
    }, []);
  },
);
