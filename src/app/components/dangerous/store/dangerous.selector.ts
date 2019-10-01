import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DangerousState } from './dangerous.states';
import { DangerousSituationHistory } from '../interfaces/dangerous-situation-history.interface';
import { DangerousSearch } from '../../history-dangerous/interfaces/dangerous-search.interface';
import * as moment from 'moment';

export const getDangerousState = createFeatureSelector<DangerousState>('dangerous');

export const getDangerousSituationHistory = createSelector(
  getDangerousState,
  (state: DangerousState) => {
    if (state && state.dangerousHistory) {
      return state.dangerousHistory;
    }
  }
);

export const getSearchParams = createSelector(
  getDangerousState,
  (state: DangerousState) => state.search,
);

export const getFilteredDangerous = createSelector(
  getDangerousSituationHistory,
  getSearchParams,
  (histories: DangerousSituationHistory[], searchParams: DangerousSearch) => {
    if (!histories || !searchParams) {
      return histories;
    }
    return histories.filter(history => {
      return (
          !searchParams.startDate
          || history.DangerousSituationDate.slice(0, 10) >= moment(searchParams.startDate).format('YYYY-MM-DD')
        )
        && (
          !searchParams.endDate
          || history.DangerousSituationDate.slice(0, 10) <= moment(searchParams.endDate).format('YYYY-MM-DD')
        )
        && (
          !searchParams.areaId
          || history.DangerousSituationArea === Number(searchParams.areaId)
        )
        && (
          !searchParams.entityId
          || history.DangerousSituationEntity === Number(searchParams.entityId)
        )
        && (
          !searchParams.userId
          || history.DangerousSituationUser === Number(searchParams.userId)
        );
    });
  }
);

export const getFilteredDangerousByDate = createSelector(
  getFilteredDangerous,
  (histories: DangerousSituationHistory[]) => {
    if (histories.length !== undefined) {
      const unfreezeHistory = histories.slice();
      unfreezeHistory.sort((a, b) => {
        const dateA = a.DangerousSituationDate;
        const dateB = b.DangerousSituationDate;
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
      return unfreezeHistory;
    } else {
      return [];
    }
  }
);

