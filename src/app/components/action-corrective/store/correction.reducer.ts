import { Action, createReducer, on } from '@ngrx/store';
import { allUsersInitialState, AllUsersState, correctionInitialState, CorrectionState } from './correction.states';
import {
  createCorrection,
  createCorrectionFail,
  createCorrectionSuccess, isFromActionCorrective, isFromActionCorrectiveNavigated,
  isFromHomepage, isFromHomepageNavigated,
  loadAllUsers,
  loadAllUsersFail,
  loadAllUsersSuccess,
  loadCorrection,
  loadCorrectionFail,
  loadCorrectionSuccess,
  setATraiterSearch,
  updateCorrection,
  updateCorrectionFail,
  updateCorrectionSuccess,
} from './correction.actions';

export const createCorrectionReducer = createReducer(
  correctionInitialState,
  on(loadCorrection, state => state),
  on(loadCorrectionSuccess, (state, {correctiveAction}) => ({...state, correctiveAction})),
  on(loadCorrectionFail, state => state),
  on(createCorrection, state => state),
  on(createCorrectionSuccess, (state, {status}) => ({...state, status})),
  on(createCorrectionFail, state => state),
  on(updateCorrection, state => state),
  on(updateCorrectionSuccess, (state, {status}) => ({...state, status})),
  on(updateCorrectionFail, state => state),
  on(setATraiterSearch, (state, {searchParams}) => ({...state, search: searchParams})),
  on(isFromHomepage, (state) => ({...state, fromHomepage: true})),
  on(isFromHomepageNavigated, (state) => ({...state, fromHomepage: false})),
  on(isFromActionCorrective, (state) => ({...state, fromActionCorrective: true})),
  on(isFromActionCorrectiveNavigated, (state) => ({...state, fromActionCorrective: false})),
);

export const createAllUsersReducer = createReducer(
  allUsersInitialState,
  on(loadAllUsers, state => state),
  on(loadAllUsersSuccess, (state, {users}) => ({...state, users})),
  on(loadAllUsersFail, state => state),
);

export function correctionReducer(state: CorrectionState | undefined, action: Action) {
  return createCorrectionReducer(state, action);
}

export function allUsersReducer(state: AllUsersState | undefined, action: Action) {
  return createAllUsersReducer(state, action);
}
