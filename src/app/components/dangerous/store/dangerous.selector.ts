import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DangerousState } from './dangerous.states';
import { DangerousSituationHistory } from '../interfaces/dangerous-situation-history.interface';
import { DangerousSearch } from '../../history-dangerous/interfaces/dangerous-search.interface';
import * as moment from 'moment';

export const getDangerousState = createFeatureSelector<DangerousState>('dangerous');

export const getDangerousSituationHistory = createSelector(
  getDangerousState,
  (state: DangerousState) => {
    if (state.dangerousHistory) {
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
          !searchParams.responsible
          || history.DangerousSituationUser === Number(searchParams.responsible)
        );
    });
  }
);

