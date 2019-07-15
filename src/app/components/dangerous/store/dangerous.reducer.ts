import { Action, createReducer, on } from '@ngrx/store';
import { dangerousInitialState, DangerousState } from './dangerous.states';
import {
  createDangerous,
  createDangerousFail,
  createDangerousSuccess,
  loadDangerousType,
  loadDangerousTypeFail,
  loadDangerousTypeSuccess
} from './dangerous.action';

export const createDangerousReducer = createReducer(
  dangerousInitialState,
  on(createDangerous, state => state),
  on(createDangerousSuccess, (state, {status}) => ({...state, status})),
  on(createDangerousFail, state => state),
  on(loadDangerousType, state => state),
  on(loadDangerousTypeSuccess, (state, {dangerousType}) => ({...state, dangerousType})),
  on(loadDangerousTypeFail, state => state),
);

export function dangerousReducer(state: DangerousState | undefined, action: Action) {
  return createDangerousReducer(state, action);
}
