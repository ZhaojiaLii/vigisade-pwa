import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';
import { getAreas } from '../../../store/data/data.selectors';
import { User } from '../interfaces/user';
import { Area } from '../../shared/interfaces/area.interface';

export const getProfileState = createFeatureSelector<ProfileState>('profile');

export const getUser = createSelector(
  getProfileState,
  (state: ProfileState) => state.user,
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
